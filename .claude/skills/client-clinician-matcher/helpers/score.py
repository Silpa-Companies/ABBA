#!/usr/bin/env python3
"""Rank clinicians against a client profile.

Usage:
    python3 score.py [--in PATH] [--top N]

Reads a JSON object from --in (default /tmp/profiles.json), shape:
    {"client": <client_obj>, "clinicians": <list-or-envelope>}

Prints ONLY a JSON array of the top N (default 5) clinicians to stdout.
This script does no network I/O — see helpers/fetch_profiles.py for that.
"""
import argparse
import json
import sys
from datetime import datetime, timedelta
from typing import Any

# Diagnosis area -> (client severity field, clinician specialty/bio keywords)
DIAGNOSIS_AREA_MAP: dict[str, dict[str, Any]] = {
    "communication": {
        "level_field": "communication_level",
        "keywords": [
            "naturalistic teaching", "naturalistic",
            "early language development", "early language",
            "language development", "milieu teaching",
        ],
    },
    "social": {
        "level_field": "social_interaction_level",
        "keywords": [
            "social skills", "peer-mediated", "peer mediated",
            "play-based", "play based", "rapport-building",
            "rapport building", "social programming",
        ],
    },
    "sensory": {
        "level_field": "sensory_level",
        "keywords": [
            "sensory processing", "sensory integration",
            "adapt environment", "adapt environments",
            "adapt teaching", "adapted teaching",
            "environmental adaptation",
        ],
    },
}

# Loose tokens for rule 5 — picks up clinicians working in the right area
# even when they don't use the exact approach phrases above.
DIAGNOSIS_AREA_LOOSE: dict[str, list[str]] = {
    "communication": ["communication", "speech", "language", "verbal"],
    "social": ["social", "peer", "family", "interaction", "behavior"],
    "sensory": ["sensory", "regulation", "integration", "occupational"],
}

# Max points per rule.
W_DIAGNOSIS = 100.0
W_MODALITY  = 40.0
W_LANGUAGE  = 20.0
W_AVAIL     = 15.0
W_EXPERT    = 10.0

# Severity multipliers for client levels 1..3 (0 = not a problem area).
SEVERITY_MULT = {1: 0.33, 2: 0.66, 3: 1.0}


def _norm_modality(m: Any) -> str:
    """Normalize modality strings. 'virtual' and 'telehealth' are equivalent."""
    if not m:
        return ""
    s = str(m).strip().lower().replace("-", "_").replace(" ", "_")
    if s in {"virtual", "online", "telehealth", "remote"}:
        return "telehealth"
    return s


def _client_modalities(client: dict) -> set[str]:
    m = client.get("preferred_modality")
    if isinstance(m, list):
        return {_norm_modality(x) for x in m if x}
    if m:
        return {_norm_modality(m)}
    return set()


def _clinician_modalities(clinician: dict) -> set[str]:
    m = clinician.get("preferred_modality")
    if isinstance(m, list):
        return {_norm_modality(x) for x in m if x}
    if m:
        return {_norm_modality(m)}
    return set()


def _client_languages(client: dict) -> set[str]:
    out = set()
    if client.get("preferred_language"):
        out.add(str(client["preferred_language"]).strip().lower())
    if isinstance(client.get("languages"), list):
        out.update(str(l).strip().lower() for l in client["languages"] if l)
    return out


def _clinician_languages(clinician: dict) -> set[str]:
    langs = clinician.get("languages") or []
    if isinstance(langs, str):
        langs = [langs]
    return {str(l).strip().lower() for l in langs if l}


def _client_active_areas(client: dict) -> dict[str, float]:
    """Returns {area: severity_multiplier} for each area with level > 0."""
    out: dict[str, float] = {}
    for area, cfg in DIAGNOSIS_AREA_MAP.items():
        lvl = client.get(cfg["level_field"])
        try:
            lvl_int = int(lvl) if lvl is not None else 0
        except (TypeError, ValueError):
            lvl_int = 0
        if lvl_int > 0:
            out[area] = SEVERITY_MULT.get(min(lvl_int, 3), 1.0)
    return out


def _clinician_text(clinician: dict) -> str:
    """All text we'll match against (specialties + bio), lowercased."""
    parts: list[str] = []
    specs = clinician.get("specialties") or []
    if isinstance(specs, str):
        specs = [specs]
    parts.extend(str(s) for s in specs)
    if clinician.get("bio"):
        parts.append(str(clinician["bio"]))
    return " ".join(parts).lower()


def score_diagnosis(client: dict, clinician: dict) -> tuple[float, list[str]]:
    areas = _client_active_areas(client)
    if not areas:
        return 0.0, []
    text = _clinician_text(clinician)
    matched_weight = 0.0
    total_weight = 0.0
    reasons: list[str] = []
    for area, sev in areas.items():
        total_weight += sev
        kws = DIAGNOSIS_AREA_MAP[area]["keywords"]
        hit = next((kw for kw in kws if kw in text), None)
        if hit:
            matched_weight += sev
            sev_label = "severe" if sev >= 0.9 else "moderate" if sev >= 0.5 else "mild"
            reasons.append(f"specialty in {hit} matches {sev_label} {area} needs")
    if total_weight == 0:
        return 0.0, reasons
    return W_DIAGNOSIS * (matched_weight / total_weight), reasons


def _parse_city_region(loc: str) -> tuple[str, str]:
    """'San Diego, California' -> ('san diego', 'california')."""
    if not loc:
        return "", ""
    parts = [p.strip().lower() for p in str(loc).split(",")]
    if len(parts) == 1:
        return parts[0], ""
    return parts[0], parts[-1]


def score_modality(client: dict, clinician: dict) -> tuple[float, list[str]]:
    c_mods = _client_modalities(client)
    k_mods = _clinician_modalities(clinician)
    if not c_mods or not k_mods:
        return W_MODALITY * 0.5, []
    overlap = c_mods & k_mods
    if not overlap:
        return 0.0, [f"modality mismatch (client wants {', '.join(sorted(c_mods))})"]
    reasons = [f"shared modality: {', '.join(sorted(overlap))}"]
    base = W_MODALITY * 0.7  # 28/40 for any overlap
    if "telehealth" in overlap:
        return W_MODALITY, reasons
    # In-person / hybrid only: add a location-proximity bonus (up to 12/40).
    c_city, c_reg = _parse_city_region(client.get("location") or "")
    k_city, k_reg = _parse_city_region(clinician.get("location") or "")
    bonus = 0.0
    if c_city and c_city == k_city:
        bonus = W_MODALITY * 0.3
        reasons.append(f"same city ({c_city.title()})")
    elif c_reg and c_reg == k_reg:
        bonus = W_MODALITY * 0.15
        reasons.append(f"same state ({c_reg.title()})")
    else:
        reasons.append("different location")
    return base + bonus, reasons


def score_languages(client: dict, clinician: dict) -> tuple[float, list[str]]:
    c_langs = _client_languages(client)
    k_langs = _clinician_languages(clinician)
    if not c_langs:
        return W_LANGUAGE * 0.5, []
    overlap = c_langs & k_langs
    if not overlap:
        return 0.0, [f"no shared language (client speaks {', '.join(sorted(c_langs))})"]
    ratio = len(overlap) / max(1, len(c_langs))
    return W_LANGUAGE * min(1.0, ratio), [f"shares {', '.join(sorted(overlap)).title()}"]


def _parse_iso(ts: str) -> datetime | None:
    if not ts:
        return None
    s = str(ts).strip()
    if s.endswith("Z"):
        s = s[:-1] + "+00:00"
    try:
        return datetime.fromisoformat(s)
    except ValueError:
        return None


def score_availability(client: dict, clinician: dict) -> tuple[float, list[str]]:
    c_slots_raw = client.get("available_time_slots") or []
    k_slots_raw = clinician.get("available_time_slots") or []
    if not c_slots_raw or not k_slots_raw:
        return W_AVAIL * 0.5, []
    c_slots = [t for t in (_parse_iso(s) for s in c_slots_raw) if t]
    k_slots = [t for t in (_parse_iso(s) for s in k_slots_raw) if t]
    if not c_slots or not k_slots:
        return W_AVAIL * 0.5, []
    tolerance = timedelta(hours=2)
    matches = 0
    for cs in c_slots:
        nearest = min((abs(cs - ks) for ks in k_slots), default=timedelta.max)
        if nearest <= tolerance:
            matches += 1
    if matches == 0:
        # Soft credit based on nearest gap so "close-but-not-overlapping"
        # ranks above "weeks apart".
        min_gap = min(abs(cs - ks) for cs in c_slots for ks in k_slots)
        days = min_gap.total_seconds() / 86400.0
        partial = W_AVAIL * 0.5 * max(0.0, 1.0 - min(days, 30.0) / 30.0)
        return partial, [f"nearest slot ~{days:.0f} day(s) apart"]
    ratio = matches / max(1, len(c_slots))
    return W_AVAIL * min(1.0, ratio), [f"{matches} overlapping slot(s)"]


def score_expertise(client: dict, clinician: dict) -> tuple[float, list[str]]:
    """Looser match between clinician text and active diagnosis areas."""
    areas = _client_active_areas(client)
    if not areas:
        return 0.0, []
    text = _clinician_text(clinician)
    matched = 0.0
    total = 0.0
    hits: list[str] = []
    for area, sev in areas.items():
        total += sev
        loose = DIAGNOSIS_AREA_LOOSE.get(area, [])
        if any(kw in text for kw in loose):
            matched += sev
            hits.append(area)
    if total == 0 or matched == 0:
        return 0.0, []
    reasons = [f"works in {', '.join(hits)} domain"] if hits else []
    return W_EXPERT * (matched / total), reasons


def _make_match_reason(diag_r, mod_r, lang_r, avail_r, exp_r) -> str:
    """Combine reasons into a single short sentence."""
    parts: list[str] = []
    if diag_r:
        parts.append("; ".join(diag_r))
    if mod_r:
        parts.append("; ".join(mod_r))
    if lang_r:
        parts.append("; ".join(lang_r))
    if avail_r:
        parts.append("; ".join(avail_r))
    if exp_r and not diag_r:
        parts.append("; ".join(exp_r))
    if not parts:
        return "No strong match on any rule."
    sentence = ". ".join(p[0].upper() + p[1:] if p else p for p in parts)
    if not sentence.endswith("."):
        sentence += "."
    return sentence


def score_clinician(client: dict, clinician: dict) -> dict:
    d, dr = score_diagnosis(client, clinician)
    m, mr = score_modality(client, clinician)
    l, lr = score_languages(client, clinician)
    a, ar = score_availability(client, clinician)
    e, er = score_expertise(client, clinician)
    total = d + m + l + a + e
    name = f"{clinician.get('first_name', '')} {clinician.get('last_name', '')}".strip()
    if not name:
        name = clinician.get("name", "Unnamed")
    return {
        "id": clinician.get("id", "<unknown>"),
        "name": name,
        "score": round(total, 2),
        "match_reason": _make_match_reason(dr, mr, lr, ar, er),
        "_diag": d,
        "_other": m + l + a + e,
    }


def rank(client: dict, clinicians: list[dict], top: int = 5) -> list[dict]:
    scored = [score_clinician(client, c) for c in clinicians]
    scored.sort(
        key=lambda x: (-x["score"], -x["_diag"], -x["_other"], str(x["name"]).lower())
    )
    top_n = scored[:top]
    for entry in top_n:
        entry.pop("_diag", None)
        entry.pop("_other", None)
    return top_n


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--in", dest="in_path", default="/tmp/profiles.json")
    p.add_argument("--top", type=int, default=5)
    args = p.parse_args()

    try:
        with open(args.in_path) as f:
            payload = json.load(f)
    except FileNotFoundError:
        raise SystemExit(f"No such file: {args.in_path} (run fetch_profiles.py first)")
    except json.JSONDecodeError as e:
        raise SystemExit(f"Invalid JSON in {args.in_path}: {e}")
    if not isinstance(payload, dict) or "client" not in payload or "clinicians" not in payload:
        raise SystemExit(f'{args.in_path} must be a JSON object with "client" and "clinicians" keys')

    client = payload["client"]
    clinicians = payload["clinicians"]

    # Unwrap common envelopes.
    if isinstance(clinicians, dict):
        for k in ("clinicians", "results", "data", "items"):
            if k in clinicians and isinstance(clinicians[k], list):
                clinicians = clinicians[k]
                break
    if isinstance(client, dict) and "data" in client and isinstance(client["data"], dict):
        client = client["data"]
    if isinstance(client, dict) and "client" in client and isinstance(client["client"], dict):
        client = client["client"]

    if not isinstance(clinicians, list):
        raise SystemExit(f"Expected a list of clinicians, got {type(clinicians).__name__}")
    if not isinstance(client, dict):
        raise SystemExit(f"Expected a client object, got {type(client).__name__}")

    result = rank(client, clinicians, top=args.top)
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())

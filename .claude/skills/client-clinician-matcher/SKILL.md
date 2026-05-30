---
name: client-clinician-matcher
description: Match a client to their best-fit clinicians by fetching profiles from the local clinician/client API and ranking clinicians using a weighted, diagnosis-first comparison. Use this skill whenever the user wants to find, match, recommend, or rank clinicians for a specific client (typically given by a client UUID), or whenever they mention matching a patient to providers, finding the best clinician fit, or sorting clinicians by suitability for a given client. Returns the top 5 matches as JSON.
---

# Client–Clinician Matcher

Matches one client to their best-fit clinicians by fetching profiles from the local API and scoring with a weighted, diagnosis-first comparison.

## Run it

The user provides a client UUID. The endpoints are NOT hardcoded — they're in `references/config.json`, regenerated at every skill upload from the developer's tunnel URL.

### Step 1: load the endpoint URLs

```bash
cat references/config.json
```

It contains:

```json
{
  "clinicians_url": "https://<host>/api/clinicians/",
  "client_url_template": "https://<host>/api/clients/{uuid}/"
}
```

Substitute the client UUID into `{uuid}` in `client_url_template`.

### Step 2: fetch the JSON

`helpers/fetch_profiles.py` only does the HTTP calls. It saves `{"client": ..., "clinicians": ...}` to `/tmp/profiles.json` (the container's tmpfs) and prints the path:

```bash
python3 helpers/fetch_profiles.py \
  --client-url     "<resolved client_url_template>" \
  --clinicians-url "<clinicians_url>"
```

### Step 3: score it

`helpers/score.py` does no network I/O — it reads `/tmp/profiles.json` and prints the ranked top-5 JSON array:

```bash
python3 helpers/score.py
```

The API may wrap the clinician list as `{"clinicians": [...]}`; `score.py` unwraps that automatically. If either endpoint is unreachable, surface the underlying error from `fetch_profiles.py`; don't fabricate data. `/tmp/profiles.json` is throwaway — the container is wiped at session end.

## Expected API schemas

### Client
```json
{
  "id": "21893327-6337-4d52-bec9-c818ab97a9e4",
  "first_name": "Eric", "last_name": "Yan",
  "communication_level": 2,        // 0-3, 0 = no problem
  "social_interaction_level": 3,
  "sensory_level": 1,
  "available_time_slots": ["2026-05-15T03:00:00.000Z", ...],
  "location": "Austin, Texas",
  "preferred_language": "English", // single string
  "preferred_modality": "telehealth" // single string
}
```

### Clinician
```json
{
  "id": "81ba219a-...",
  "first_name": "Sarah", "last_name": "Johnson",
  "bio": "Experienced therapist specializing in autism...",
  "specialties": ["Applied Behavior Analysis", "Early intervention"],
  "available_time_slots": ["2026-06-01T02:00:00.000Z", ...],
  "location": "Boston, Massachusetts",
  "languages": ["English"],
  "preferred_modality": ["in_person"]
}
```

## Scoring rules

See `references/scoring_rules.md` for the full rule definitions; quick summary:

| Priority | Rule | Max points |
|---|------|------|
| 1 | Specialty/bio matches the client's diagnosis areas, weighted by per-area severity level (0–3) | 100 |
| 2 | Modality match; for in-person/hybrid-only overlap, also location proximity | 40 |
| 3 | Language overlap | 20 |
| 4 | Available-time-slot overlap | 15 |
| 5 | Looser specialty/bio touch on diagnosis areas | 10 |

The diagnosis area → specialty keyword maps live at the top of `helpers/score.py` as `DIAGNOSIS_AREA_MAP`. They cover the three areas the user specified:

- **Communication** (`communication_level` > 0) → `naturalistic teaching`, `early language development`
- **Social interaction** (`social_interaction_level` > 0) → `social skills`, `peer-mediated`, `play-based`, `rapport-building`
- **Sensory** (`sensory_level` > 0) → `sensory processing`, `sensory integration`, `adapt environments`, `adapt teaching conditions`

Severity scales linearly: level 0 = ignored (not a problem area for this client), 1 = mild (×0.33), 2 = moderate (×0.66), 3 = severe (×1.0).

The score is normalized over the client's actual problem areas, so a clinician who covers all of them earns the full 100, regardless of how many areas the client has.

## Return the top 5

`score.py` already prints exactly this shape — pass its stdout through unchanged:

```json
[
  {
    "id": "81ba219a-6b36-4143-aaea-749b747814a0",
    "name": "Sarah Johnson",
    "score": 87.4,
    "match_reason": "Specialty matches severe communication needs; both prefer in-person and located in same city; shares English with client."
  }
]
```

- `id` — clinician UUID (the API's `id` field)
- `name` — first_name + " " + last_name
- `score` — total weighted score (rounded to 2 decimals)
- `match_reason` — one short sentence summarizing the strongest reasons. The scorer builds this from the rules that actually contributed; pass the JSON through unchanged.

Present the result as a fenced JSON code block. Don't wrap it in an envelope unless asked.

If fewer than 5 clinicians exist, return what's available and say so. If none score above 0 on diagnosis match, still return the top 5 by total score but warn the user that no clinician's specialties match the client's diagnosis areas.

## Edge cases

- **Empty clinician list** → return `[]` with a note.
- **Client has no diagnosis areas** (all three levels are 0) → diagnosis-match rule scores 0 for everyone; ranking falls back to the other rules. Mention this in the response.
- **Ties** → break by diagnosis-match score, then by total of the other components, then alphabetically. Deterministic on re-run.
- **Network failure** → report the error, don't invent results.

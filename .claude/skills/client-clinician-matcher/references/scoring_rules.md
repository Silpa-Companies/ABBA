# Scoring rules reference

The weighted rules that `helpers/score.py` implements, in the same priority order the user specified (most → least important).

## Why a weighted sum

The user described the rules as "from most important to least important." A weighted sum with strictly decreasing per-rule maxes preserves that priority while letting a clinician with a strong secondary match still edge out one with a weak primary match. The first tiebreaker is always the diagnosis-match component, so when total scores tie, the clinician with stronger diagnosis alignment wins.

## Rule 1 — Diagnosis ↔ specialty (max 100)

The most important rule. The client schema has three integer severity levels (0–3):

- `communication_level`
- `social_interaction_level`
- `sensory_level`

A level of `0` means the client has no problem in that area, so it's ignored. For each area with level > 0, the clinician's `specialties` list and `bio` are searched for matching approach keywords:

| Area | Approach keywords |
|------|-------------------|
| Communication | `naturalistic teaching`, `early language development` |
| Social | `social skills`, `peer-mediated`, `play-based`, `rapport-building` |
| Sensory | `sensory processing`, `sensory integration`, `adapt environments`, `adapt teaching` |

Each matched area is weighted by severity:

| Level | Multiplier |
|-------|-----------|
| 1 (mild) | 0.33 |
| 2 (moderate) | 0.66 |
| 3 (severe) | 1.0 |

Score formula:

```
W_DIAGNOSIS * (sum of matched-area severities) / (sum of all active-area severities)
```

So a client with severe communication + mild sensory gets more credit for a clinician who matches communication than one who matches sensory. A clinician who matches every active area earns the full 100, regardless of how many areas there are.

If the client has no active areas (all three levels are 0), the rule scores 0 for everyone and ranking falls back to the other rules.

## Rule 2 — Modality + location (max 40)

Modality fields can be a single string (client uses `"in_person"`, `"telehealth"`, or `"hybrid"`) or a list (clinician uses a list). The scorer treats both shapes the same. `"virtual"`, `"online"`, and `"telehealth"` are normalized to the same token.

Scoring is built in two parts:

1. **Modality overlap** — any overlap scores a baseline of 28/40 (70%). No overlap → 0.
2. **Location bonus** (up to 12/40) — applies only when the overlap is **in-person or hybrid only**, i.e. neither side accepts telehealth as a common option. Parses `"City, State"` from `location` and awards:
   - 12 pts (30% of max) for same city
   - 6 pts (15% of max) for same state only
   - 0 pts for different state

If telehealth is among the overlap, location is irrelevant and the rule scores the full 40.

If either side has no modality info, the rule scores 20/40 (half credit) — absence of data shouldn't punish as hard as a known mismatch.

## Rule 3 — Languages (max 20)

The client has `preferred_language` (single string); the clinician has `languages` (list). Score:

```
min(1.0, overlap_count / max(1, client_language_count)) * 20
```

In practice that means the rule is full credit if the clinician speaks the client's preferred language, zero otherwise. The formula is written more generally so it generalizes if the client schema ever becomes a list.

If the client has no language preference, the rule scores 10/20 (half credit).

## Rule 4 — Availability (max 15)

Both sides have `available_time_slots` as a list of ISO-8601 datetime strings. The scorer:

1. Parses both lists to `datetime` objects.
2. For each client slot, finds the nearest clinician slot. If within 2 hours, counts it as a match.
3. Final score = `(matches / client_slot_count) * 15`.

If zero slots match, the rule gives partial credit based on how close the nearest available slot is (full credit at same time, fading to zero at 30+ days). This makes "almost matches" rank above "completely different week".

If either side has no availability data, gives 7.5/15 (half credit).

## Rule 5 — Expertise ↔ diagnosis (max 10)

A looser, broader pass than rule 1: instead of requiring specific approach phrases, checks whether the clinician's specialty/bio mentions general tokens for each active area:

| Area | Loose tokens |
|------|-------------|
| Communication | `communication`, `speech`, `language`, `verbal` |
| Social | `social`, `peer`, `family`, `interaction`, `behavior` |
| Sensory | `sensory`, `regulation`, `integration`, `occupational` |

Same weighting math as rule 1, capped at 10 points. Catches clinicians who clearly work in the right domain even when they don't use the exact rule-1 approach phrases.

## Tiebreakers

Deterministic:

1. Higher diagnosis-match score wins.
2. Then higher sum of the other four components.
3. Then alphabetical by name.

## Tunable knobs

These all live at the top of `score.py`:

- `DIAGNOSIS_AREA_MAP` — strict approach keywords for rule 1
- `DIAGNOSIS_AREA_LOOSE` — broad tokens for rule 5
- `SEVERITY_MULT` — multipliers per level (currently 1→0.33, 2→0.66, 3→1.0)
- `W_DIAGNOSIS`, `W_MODALITY`, `W_LANGUAGE`, `W_AVAIL`, `W_EXPERT` — max points per rule

The weights match the user's stated priority order; the keyword maps are the most likely thing to need extending if new specialties show up in the real data.

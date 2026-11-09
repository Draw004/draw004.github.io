# Carrowmont FRE Batch 3D — Ask Carrowmont MVP Resolution Completion

## Purpose
Complete the Batch 3 MVP resolution contract for the five already-approved Ask Carrowmont journeys. This release does not add new journeys. It strengthens the answer returned after deterministic calculations so the public experience resolves a situation rather than merely displaying calculator outputs.

## Scope
Supported journeys remain exactly:
1. Debt vs savings
2. Car affordability
3. Mortgage prepay vs invest
4. Emergency fund adequacy
5. Running short before payday

Each resolved journey now returns, in this order:
- Carrowmont's view — an answer-first recommendation
- Why that view follows from the deterministic model
- Confidence / boundary note
- Diagnosis
- Important numbers
- Paths compared
- What could change the answer
- Practical next steps
- Expandable deterministic engine trace and assumptions

## Architecture boundary
- AI/conversational routing does not calculate financial outputs.
- Existing deterministic Carrowmont engines remain authoritative.
- No new public calculator, URL, search entry or tool-directory card is added.
- Unsupported questions continue to receive the transparent not-yet-available bridge response.
- No login, persistence, network AI/API call or financial-data transmission is introduced.

## Journey resolution rules
### Debt vs savings
Emergency resilience is checked before the rate comparison. When a first cash buffer is missing, resilience takes precedence. When a buffer exists, contractual debt APR is compared with the user-entered return assumption while explicitly preserving investment uncertainty.

### Car affordability
The recommendation uses the existing Car Affordability classification, including cash room, stress case, borrowing health and emergency runway. It never treats the loan payment alone as affordability.

### Mortgage prepay vs invest
The recommendation follows the existing common-horizon comparison. Mortgage savings are deterministic model outputs; investment return remains an assumption, not a forecast.

### Emergency fund adequacy
The recommendation follows deterministic runway and the user's chosen target. Carrowmont does not turn the 3–6 month context into a universal rule.

### Running short before payday
The recommendation follows deterministic monthly cash-flow room. It prioritizes essential obligations and identifies adjustable outgo before suggesting additional debt.

## Product boundary
Batch 3D closes the quality gap inside Batch 3. It does not implement Batch 4's full guided-GUI program, Batch 5 Money Priorities, Batch 9 formal Trust Contract, Batch 11 homepage transformation or Batch 12 wider resolution library.

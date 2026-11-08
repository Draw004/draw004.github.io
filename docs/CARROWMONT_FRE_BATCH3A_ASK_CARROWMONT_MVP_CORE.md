# Carrowmont Financial Resolution Engine — Batch 3A
## Ask Carrowmont MVP deterministic journey core

Batch 3A starts the roadmap's Ask Carrowmont MVP without changing the homepage or publishing a chatbot UI yet. It adds a private deterministic journey orchestrator that can recognize and resolve five controlled household-money journeys using existing tested Carrowmont engines.

## Controlled journeys
1. Debt vs savings
2. Car affordability
3. Mortgage prepay vs invest
4. Emergency fund adequacy
5. Running short before payday

## Operating rules
- Ask only for facts required by the selected journey.
- Return no more than three missing questions at a time.
- Existing Carrowmont engines remain authoritative for calculations.
- The orchestrator may classify, sequence, compare and explain; it does not invent financial mathematics.
- Every resolved answer returns an engine trace containing the deterministic inputs and outputs used.
- Return assumptions separately from calculations.
- No financial inputs are persisted and no network call is made.
- No public Ask Carrowmont URL, homepage promotion, login, dashboard, bank feed or account profile is added in Batch 3A.

## Result contract
A resolved journey returns:
- situation
- diagnosis
- important numbers
- alternatives
- practical next steps
- assumptions
- deterministic engine trace

This is deliberately narrower than the later guided GUI and homepage transformation batches.

# Carrowmont FRE Batch 5 — Money Priorities

## Purpose
Batch 5 turns the locked FRE priority framework into an explainable household-money assessment inside Ask Carrowmont. It does not replace the detailed calculators and it does not create a composite financial-health score.

The deterministic ordering remains:

**Stabilize → Protect → Reduce → Build → Grow → Optimize**

## Public experience
Money Priorities is the sixth controlled Ask Carrowmont journey, available through the existing `/ask-carrowmont.html` page as **“What should I focus on first?”** No new public URL or Tools Hub card is created.

The journey collects, in progressive groups of no more than three fields:
- monthly take-home income;
- essential and flexible monthly spending;
- required monthly debt payments;
- emergency savings and the user's emergency-fund target;
- debt balance and highest APR;
- an explicit long-term return assumption;
- retirement savings and current retirement contribution;
- one optional financial goal, its current funding, time horizon and monthly contribution.

## Deterministic evidence
The priority engine reuses:
- **Budget & Cash Flow Core** for modeled monthly room;
- **Emergency Fund & Runway Core** for runway and target gap;
- **Goal Planner Core** for goal funding when a goal is entered;
- the locked **FRE Priority Framework** for stage order.

Debt ordering compares the contractual APR entered by the user with the explicit long-term return assumption. Retirement is deliberately screened only for contribution activity in Batch 5; this screen does **not** claim that retirement savings are adequate. The full Retirement Planner remains authoritative for retirement-readiness calculations.

## Output contract
The journey returns:
1. **Carrowmont's view** — the first priority and why;
2. **Your next three moves** — exactly three ranked moves where possible;
3. for each move: impact, rationale, numbers used, assumptions and what could change it;
4. important cross-area numbers;
5. practical next steps;
6. deterministic engine trace and assumptions.

No overall score is used as the primary output.

## Privacy and product boundaries
- no financial inputs are persisted;
- no Ask financial inputs are transmitted to a server;
- no login is required;
- no new public tool is created;
- Tools Hub remains at 23 tools;
- homepage transformation remains reserved for Batch 11;
- broader resolution-library expansion remains reserved for Batch 12.

## Release gate
Publisher → generated PR merge → Automated QA → Multi-Repo Guard → fresh authoritative Source Snapshot.

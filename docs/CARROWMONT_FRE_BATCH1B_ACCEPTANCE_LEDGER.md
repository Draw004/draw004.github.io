# Carrowmont FRE Batch 1B — Acceptance Ledger

Batch 1B closes the four formula-extraction blockers left open by Batch 1A. The goal is not to redesign the calculators or change their assumptions; it is to move their financial mathematics into pure deterministic cores and make those cores callable through the standard FRE adapter boundary.

| ID | Agreed outcome | Implementation owner/file | QA evidence | Status |
|---|---|---|---|---|
| B1B-R1 | Extract Budget & Cash Flow mathematics into a pure deterministic core without changing outputs | `budget-cash-flow-planner/core.js`; UI delegates in `app.js` | Locked monthly-equivalent, reserve, emergency and pay-cycle parity fixtures; existing browser calculation regression remains authoritative | PASS |
| B1B-R2 | Extract Goal Planner mathematics into a pure deterministic core without changing future-cost, funding-gap, contribution-frequency or lump-sum behaviour | `goal-planner/core.js`; UI delegates in `app.js` | Education, weekly-52-period and future-lump parity fixtures | PASS |
| B1B-R3 | Extract Inflation Calculator mathematics into a pure deterministic core without changing future-cost or purchasing-power outputs | `inflation-calculator/core.js`; UI delegates in `app.js` | 5%-for-20-years and zero-inflation identity parity fixtures | PASS |
| B1B-R4 | Extract Retirement Planner mathematics into a pure deterministic core without changing quick or detailed results | `retirement-calculator/core.js`; UI delegates in `app.js` | Locked quick-mode corpus/depletion fixture and detailed expense/income/goal/lifestyle fixture | PASS |
| B1B-R5 | Keep the existing user interfaces, URLs, state, reports, charts and localization behaviour intact while delegating math to the new cores | four existing app files + four existing HTML entry points | Script-order/delegate contract plus full source contract; Publisher browser QA remains required | PASS |
| B1B-R6 | Make the four extracted cores available through the FRE adapter contract without duplicating formulas in the adapter layer | `assets/fre/primary-engine-adapters.js`, `engine-catalog.js` | All four adapters register and produce standard envelopes from the real cores | PASS |
| B1B-R7 | Close the four `EXTRACT_PURE_CORE_BEFORE_FRE` blockers in the engine catalogue only after parity protection exists | `engine-catalog.js`, Engine Registry V3 | Catalogue reports zero extraction blockers; all four are `READY_WITH_ADAPTER` | PASS |
| B1B-R8 | Preserve the 59-region / 48-currency localization baseline and all existing financial assumptions | unchanged locale files; existing tool state contracts | Full source contract; no locale files in release | PASS |
| B1B-R9 | Add no login, storage, network/API call, AI calculation or new financial formula | extracted cores + adapter layer | Pure-core no-DOM/storage/network check; FRE network/storage boundary remains green | PASS |
| B1B-R10 | Preserve Batch 1 continuity and produce a current engine registry | this ledger, Batch 1B implementation record, `CARROWMONT_FRE_ENGINE_REGISTRY_V3.json` | Continuity existence/status checks | PASS |
| B1B-R11 | Package only reviewed files against the exact post-Batch-1A snapshot and require Publisher/QA/Guard before closure | release manifest | Base/new SHA verification + exact overlay source-contract validation before delivery | PASS |

## Parent Batch 1 status

After this release is merged green and a fresh Source Snapshot is produced, **Batch 1 — Financial Resolution Core is complete** at the architecture/core level:

- Batch 1A: deterministic context, routing, priority, scenario, confidence and generic adapter contracts;
- Batch 1B: formula-preserving extraction of Budget, Goal, Inflation and Retirement plus standard primary adapters.

This does **not** mean Ask Carrowmont is public yet. No user-facing AI/Brain UI is introduced in Batch 1.

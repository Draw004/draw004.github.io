# Carrowmont FRE Batch 1A — Acceptance Ledger

Batch 1A is the deterministic orchestration-foundation sub-batch of parent **Batch 1 — Financial Resolution Core**. It does not complete the four calculator-core extractions reserved for Batch 1B.

| ID | Agreed outcome | Implementation owner/file | QA evidence | Status |
|---|---|---|---|---|
| B1A-R1 | Define a canonical guest-first financial-state model with provenance, freshness, estimate and exclude controls | `assets/fre/financial-context.js` | FRE1A context/provenance/exclusion/requirements checks | PASS |
| B1A-R2 | Create a deterministic engine-adapter contract without reimplementing calculator mathematics | `assets/fre/engine-adapters.js`, `assets/fre/engine-catalog.js` | FRE1A catalog/adapter envelope/unknown-engine rejection checks | PASS |
| B1A-R3 | Map plain-language financial problems to controlled intents, priority stages, required facts and engine plans | `assets/fre/intent-router.js` | FRE1A debt-vs-savings/runway/car-affordability routing checks | PASS |
| B1A-R4 | Create a reusable scenario-comparison contract that compares evidence but does not manufacture recommendations | `assets/fre/scenario-comparison.js` | FRE1A metric-winner and cross-currency rejection checks | PASS |
| B1A-R5 | Add explicit assumption and High/Moderate/Low confidence handling | `assets/fre/confidence.js` | FRE1A confidence degradation fixtures | PASS |
| B1A-R6 | Lock the financial-priority hierarchy Stabilize → Protect → Reduce → Build → Grow → Optimize | `assets/fre/priority-framework.js` | FRE1A exact priority-order check | PASS |
| B1A-R7 | Add a deterministic resolution-plan orchestrator that asks for missing facts before engines can run | `assets/fre/core.js` | FRE1A emergency-runway missing-input fixture | PASS |
| B1A-R8 | Keep Batch 1A private to architecture: no visible UI, storage, network connection, login requirement or calculator formula change | FRE assets + unchanged public HTML/calculator engines | FRE1A no-network/no-storage/no-public-page wiring checks; full source contract | PASS |
| B1A-R9 | Preserve the original Batch 1 requirement to extract/wrap Budget, Goal, Inflation and Retirement; do not silently drop it | Batch 1A implementation record and Engine Registry V2 | Registry keeps all four as `EXTRACT_PURE_CORE_BEFORE_FRE`; Batch 1B explicitly next | PASS |
| B1A-R10 | Extend automated deterministic QA and continuity records | `carrowmont-qa/scripts/fre-core-contract.mjs`, `source-contract.mjs`, Batch 1A docs | Exact staged source contract **745 PASS / 0 FAIL** before packaging; exact release overlay revalidated before delivery | PASS |

## Parent Batch 1 status

- **Batch 1A:** complete when this release is merged green and a fresh Source Snapshot is produced.
- **Batch 1B:** still required — formula-preserving extraction/wrapping of Budget & Cash Flow, Goal Planner, Inflation Calculator and Retirement Planner.
- Parent **Batch 1 is not complete** until Batch 1B and its QA gates are complete.

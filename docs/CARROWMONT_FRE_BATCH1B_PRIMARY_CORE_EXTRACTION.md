# Carrowmont FRE Batch 1B — Primary Core Extraction

## Purpose

Batch 1B converts the four remaining UI-coupled primary calculators into reusable deterministic financial engines while preserving the current calculator experience and mathematics. It closes the blockers identified in Batch 0 and preserved explicitly by Batch 1A.

## Authoritative baseline

- Source Snapshot: `carrowmont-source-snapshot - 2026-11-07T035033.054.zip`
- Snapshot SHA-256: `ae5873400f244b0640326b6447fe08631dc88f6b7e7f31a3aec5b6eafab90bf1`
- Snapshot generated: `2026-11-06T22:19:56Z`
- Repositories: 11
- Main-site commit: `180ea11f854f4c9bfb0293f6166897659c7d58eb`
- Budget commit: `02338d5c37ffc496ff9f4fc67b91dd5b001a818e`
- Goal commit: `b80153808c1d730a757f96763a5d8c429b8e3d98`
- Inflation commit: `406aab86c9bab0915c951772fef6e4d0e0b96156`
- Retirement commit: `901ec7cdadc013ca4982f820b4c6f005bca791b6`
- QA commit: `3fa6cdbb44f12bab6e3453abb10035a09fd93ac0`
- Starting source contract: **745 PASS / 0 FAIL**
- Locale catalogue: **58 named countries + Other / International = 59 region profiles; 48 currencies**

## Locked architecture rule

**AI understands, routes, compares and explains. Carrowmont's deterministic engines calculate.**

Batch 1B does not add AI arithmetic. It makes existing Carrowmont mathematics callable without a browser UI.

## Extracted engines

### Budget & Cash Flow

New API: `CarrowmontBudgetCore`

Pure functions cover:

- frequency-to-monthly conversion;
- monthly income / essential / flexible / saving totals;
- irregular reserve requirement;
- remaining cash and savings rate;
- weekly/daily room;
- emergency coverage, target and gap;
- pay-cycle equivalents and room.

The current page still owns form state, local month history, Smart Suggestions, rendering, reports and handoffs. `app.js` delegates calculation to the core.

### Goal Planner

New API: `CarrowmontGoalCore`

Pure functions cover:

- annual growth;
- contribution-period mapping;
- periodic return;
- annuity factor;
- future goal cost;
- projected funding;
- funding gap;
- required/additional recurring contribution;
- future lump-sum timing;
- equivalent lump sum needed today.

The current page continues to own goal templates, field validation/clamping, localization, chart rendering and reports.

### Inflation / Purchasing Power

New API: `CarrowmontInflationCore`

Pure functions cover:

- future inflated value;
- present purchasing-power equivalent;
- cumulative increase;
- purchasing-power remaining/loss;
- lower/base/higher scenario values;
- doubling-time metric.

The current page continues to own input clamping, localized money formatting, chart/report rendering and copy.

### Retirement Planner

New API: `CarrowmontRetirementCore`

Pure functions cover:

- effective periodic returns and contribution schedules;
- category inflation;
- lifestyle phases;
- expense start/end/adjust rules;
- retirement income growth;
- future goal amounts;
- input-state validation;
- required retirement corpus;
- existing-savings and recurring-contribution projection;
- funding gap and required/additional contribution;
- retirement expense/income flows;
- target-funded and current-plan portfolio simulations;
- depletion age and chart data.

The current page continues to own DOM state, mode switching, localization, visual rendering, saved-plan UI, reports and withdrawal handoff.

## FRE primary adapter layer

`/assets/fre/primary-engine-adapters.js` registers these four cores through the generic Batch-1A adapter contract:

- `budget-cash-flow`
- `goal-planner`
- `inflation`
- `retirement`

The adapters contain **no financial formulas**. They invoke a deterministic core and map selected outputs into the standard FRE envelope with engine version, currency, inputs used, metrics, assumptions, warnings and raw engine result.

Invalid retirement inputs remain engine errors and become critical adapter warnings rather than being silently repaired.

## Parity gates

`carrowmont-qa/scripts/fre-primary-core-parity.mjs` locks representative pre-extraction results for:

- mixed monthly/quarterly/annual budget rows, emergency coverage and biweekly pay-cycle conversion;
- approved Goal education fixture;
- Goal weekly 52-period contribution timing;
- Goal biweekly contribution plus future lump sum;
- 5% inflation over 20 years;
- zero-inflation identity;
- approved Retirement quick-mode fixture;
- Retirement detailed mode with general/health/lifestyle inflation, expense end/start rules, pension income, future goals, safety buffer and depletion timing.

Existing Playwright calculation regressions remain an additional production gate, particularly the public UI fixtures for Budget, Goal, Inflation and Retirement.

## What Batch 1B does not change

No intentional change to:

- visible calculator design or content;
- calculation assumptions or formulas;
- chart mathematics;
- PDF/report mathematics;
- shared report standard;
- `carrowmont_plan_context_v1`;
- local budget/retirement storage contracts;
- country/currency keys or locale files;
- 59-region / 48-currency coverage;
- Search, Learn, Research, sitemap, navigation or homepage;
- authentication/login;
- server/database storage;
- analytics;
- external APIs or bank connections;
- workflows.

## Change-impact matrix

| Dimension | Status | Batch 1B treatment |
|---|---|---|
| 1. Product intent / user problem | PASS | Enables deterministic FRE reuse; no public product change |
| 2. Existing engine reuse / formula protection | PASS | Four UI formulas extracted into pure cores with locked parity fixtures |
| 3. Financial reasoning / prioritization | PASS | Batch 1A reasoning remains unchanged; extracted cores supply evidence |
| 4. GUI / information hierarchy | PASS | Existing UI preserved; only local core script load added |
| 5. Plain language / educational clarity | PASS | Existing public copy unchanged |
| 6. Localization / country / currency | PASS | 59 regions / 48 currencies preserved; no locale file modified |
| 7. Responsive / accessibility | PASS | No layout or interaction redesign; Publisher/browser QA still required |
| 8. Privacy / collection / saving | PASS | No new collection, storage, login or network behavior |
| 9. Shared state / cross-tool | PASS | Existing shared state keys untouched |
| 10. Charts / reports / PDF | PASS | Existing rendering/report paths consume the same delegated results |
| 11. Search / URLs / Learn / Research | PASS | No URL/content ownership change |
| 12. QA / fixtures / browser | PASS | Batch 1B parity contract + existing browser regressions |
| 13. Publisher / manifest / base hashes | PASS | Exact release hashes/base hashes required before delivery |
| 14. Continuity docs / latest snapshot | PASS | Ledger, implementation record and Engine Registry V3 included |

## Staged validation before packaging

- Full source contract: **768 PASS / 0 FAIL**
- Batch 1B pure-core parity: included in the full source contract
- JavaScript syntax: all changed runtime and QA modules parse successfully
- Local browser smoke was attempted in the build container but the headless Chromium process did not complete reliably; therefore the existing Publisher browser suite remains the required browser-runtime gate before merge.

## Definition of Done

Batch 1B is complete only when:

1. all four pure cores exist and parse;
2. all four existing UIs load their core before `app.js` and delegate their financial calculations;
3. locked parity fixtures pass;
4. all four primary adapters register and return standard envelopes;
5. engine catalogue reports zero extraction blockers;
6. full source contract remains green;
7. exact release manifest/base/new hashes validate;
8. Publisher is green;
9. generated PRs are merged in the specified order;
10. Automated QA and Multi-Repo Guard are green;
11. a fresh all-green Source Snapshot is produced.

Only then may parent **Batch 1 — Financial Resolution Core** be called complete.

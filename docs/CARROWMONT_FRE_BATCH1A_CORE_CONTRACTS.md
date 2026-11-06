# Carrowmont FRE Batch 1A — Financial Resolution Core Contracts

## Purpose

Batch 1A creates the deterministic, privacy-first contracts that the future Ask Carrowmont experience will use to understand a problem, identify missing facts, select tested calculator engines, compare scenarios, expose assumptions and express confidence. It deliberately does **not** add a chatbot, visible Ask Carrowmont UI, account/login, saved financial profile, bank connection or new financial formula.

## Authoritative baseline

- Source Snapshot: `carrowmont-source-snapshot - 2026-11-07T030123.810.zip`
- Snapshot SHA-256: `66739efada65fdc045664234b39c435f95f5fb20753585e5a3939443bbfb25bb`
- Snapshot generated: `2026-11-06T21:30:32Z`
- Repositories: 11
- Main-site commit: `27f1377c69360a0b3be72b0e66c3e265c386f2cf`
- QA commit: `886fb07197eb31d0440b2f738e24d21b1b1fa740`
- Starting source contract: **724 PASS / 0 FAIL**
- Locale catalogue: **58 named countries + Other / International = 59 region profiles; 48 currencies**

## Core rule

**AI understands, routes, compares and explains. Carrowmont's deterministic engines calculate.**

No future narrative layer may replace a tested engine result with its own arithmetic. If an explanation and engine output disagree, the engine result wins and the explanation must be corrected.

## New runtime contracts

### 1. `financial-context.js`

Canonical guest-first financial context. Facts are stored by stable dot paths and carry:

- value;
- origin: user / calculated / inferred / imported;
- `lastUpdated` freshness;
- estimate flag;
- user exclusion flag;
- unit;
- optional source-engine attribution.

Batch 1A persistence is explicitly **none**. The module does not write localStorage, sessionStorage, IndexedDB or any server.

### 2. `engine-catalog.js`

Runtime catalogue of the 22 engines identified in Batch 0. It preserves the four known extraction blockers:

- Budget & Cash Flow;
- Goal Planner;
- Inflation Calculator;
- Retirement Planner.

A route cannot pretend these engines are ready until Batch 1B completes the extraction/wrapper work.

### 3. `engine-adapters.js`

Defines the standard adapter boundary around tested calculator cores. Every adapter must:

- identify its engine;
- state required/optional inputs;
- invoke a deterministic synchronous core in the current Batch-1 contract;
- return a standard envelope with inputs used, assumptions, warnings, currency and metrics;
- reject missing inputs and unregistered engines rather than guessing.

The adapter layer contains no financial formulas.

### 4. `intent-router.js`

Controlled intent/routing model for high-value financial problems. Routes identify:

- the intent;
- financial-priority stage;
- required financial facts;
- deterministic engines needed;
- readiness status.

Current controlled intents include emergency runway, debt vs savings, car affordability, home affordability, mortgage prepay vs invest, debt payoff, retirement readiness, goal funding, loan cost, inflation impact and recurring investment.

The text classifier is intentionally simple/deterministic in Batch 1A. A future AI language layer may classify richer wording, but it must resolve to these controlled intents/routes before engines run.

### 5. `scenario-comparison.js`

Compares scenario metrics using declared preferences such as lower/higher/target. It reports evidence only; it does not itself declare a financial recommendation. Cross-currency comparison is blocked unless values are first normalized by an approved method.

### 6. `confidence.js`

Produces High / Moderate / Low confidence based on input completeness, estimates, material assumptions, sensitivity and critical engine warnings. Confidence is an explanation of evidence quality, not certainty or a guarantee.

### 7. `priority-framework.js`

Locks the product hierarchy:

1. Stabilize
2. Protect
3. Reduce
4. Build
5. Grow
6. Optimize

This is a prioritization framework, not an automatic command to the user.

### 8. `core.js`

Creates a resolution plan before any engine execution. It:

- resolves the intent;
- obtains the route;
- checks required financial facts;
- asks only for missing facts;
- exposes the engine plan and readiness;
- attaches priority stage and confidence.

If an engine is missing or still UI-coupled, the plan reports that status rather than inventing a result.

## Privacy and safety boundary

Batch 1A:

- has no account/login;
- has no persistence;
- has no analytics addition;
- has no fetch/API call;
- has no bank/investment connection;
- does not move money, trade or submit an application;
- is not wired into a public page;
- does not change existing shared-state keys.

## Existing contracts protected

No change to:

- calculator formulas or deterministic cores;
- charts;
- PDF/report arithmetic or shared report standard;
- `carrowmont_plan_context_v1`;
- country/currency storage keys;
- 59-region / 48-currency localization behavior;
- public URLs, Search, Learn, Research, sitemap or navigation;
- current desktop/mobile UI;
- workflows.

## Batch 1B — mandatory next sub-batch

Batch 1B must extract or wrap the four UI-coupled engines without changing their math:

1. Budget & Cash Flow `calculate()`;
2. Goal Planner `calc()`;
3. Inflation Calculator `compute()`;
4. Retirement Planner `calculatePlan()`.

Each extraction needs parity fixtures against the pre-extraction UI calculation path. Parent Batch 1 remains open until those four parity gates are green.

## Change-impact matrix

| Dimension | Status | Batch 1A treatment |
|---|---|---|
| 1. Product intent / user problem | PASS | Creates the resolution-planning foundation only |
| 2. Existing engine reuse / formula protection | PASS | No formula copied or altered; adapters wrap engines later |
| 3. Financial reasoning / prioritization | PASS | Controlled routes + six-stage priority framework |
| 4. GUI / information hierarchy | N/A | No public UI change in 1A |
| 5. Plain language / educational clarity | PASS | Route labels/reasons are human-readable; no public copy yet |
| 6. Localization / country / currency | PASS | 59-region / 48-currency baseline preserved; scenario currency mismatch blocked |
| 7. Responsive / accessibility | N/A | No visible page introduced |
| 8. Privacy / collection / saving | PASS | In-memory contract only; provenance/exclusion controls; no persistence/network |
| 9. Shared state / cross-tool | PASS | Existing shared state untouched; future context kept separate |
| 10. Charts / reports / PDF | N/A | Untouched |
| 11. Search / URLs / Learn / Research | N/A | Untouched |
| 12. QA / fixtures / browser | PASS | Deterministic FRE contract added to central source contract; browser N/A |
| 13. Publisher / manifest / base hashes | PASS | Exact release manifest/hash verification required before delivery |
| 14. Continuity docs / latest snapshot | PASS | This implementation record + ledger + Engine Registry V2 included |

## Definition of Done for Batch 1A

Batch 1A may be called complete only when:

1. all acceptance-ledger rows are accounted for;
2. deterministic FRE contract checks pass;
3. the full existing source contract remains green;
4. no public page references the FRE scripts;
5. exact release hashes/base hashes validate;
6. Publisher, QA and Guard are green after merge;
7. a fresh Source Snapshot is produced.

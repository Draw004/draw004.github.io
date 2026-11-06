# Carrowmont FRE Batch 0 - Architecture Lock & Engine Inventory

**Status:** COMPLETE - documentation/architecture only; no runtime formulas or UI changed.
**Authoritative baseline:** `carrowmont-source-snapshot - 2026-11-06T022515.173(1).zip`
**Snapshot SHA-256:** `454f98ca53abc9ae79b528bb13fa2150ad12970e66cce46e6f103115aa0fc0a7`
**Main-site commit:** `8eee3bdce9b8aad1147c71ae90b075dee410940e`
**Verified source contract:** **723 PASS / 0 FAIL**
**Repositories:** **11**

## 1. Batch 0 conclusions

- Carrowmont has **9 active primary calculators** in the shared report registry.
- The current codebase exposes **22 financial/research engines or decision modules** relevant to future orchestration.
- **18 are already separated into deterministic core modules** sufficiently to be consumed through a thin adapter (some have dependencies).
- **4 primary engines are still UI-coupled and must be extracted/wrapped without formula changes before the Financial Resolution Engine depends on them:** Goal Planner, Inflation Calculator, Retirement Planner and Budget & Cash Flow Planner.
- All 9 primary calculator repositories use an identical `report-standard.js` (SHA-256 `c39d781b6d83a7919fc705265f24575d05b9ed02e93206d26e05eecaed687510`).
- The shared browser-state contract remains `carrowmont_plan_context_v1` schema v1 with only `locale`, `assumptions` and `housingLoan` roots.
- The authoritative localization layer currently supports **44 region profiles** and **34 currencies**. FRE must consume this layer rather than inventing terminology/currency rules.
- Macro engines (US Debt, Gold, Silver, Market Chain) are **context-only** for the first FRE phases. They must not silently become personal buy/sell or allocation advice engines.
- No existing formula, chart, PDF, locale, URL, navigation, state or QA contract needs to change in Batch 0.

## 2. Protected architecture lock
- Deterministic formulas and their fixtures remain source of truth.
- AI/orchestration may choose and interpret engines but must not duplicate tested formulas in prompts.
- Existing chart methodology/data sources remain unchanged unless explicitly approved.
- Existing shared report/PDF standard remains unchanged and byte-identical across the 9 primary calculator repos.
- CarrowmontLocale remains the authority for country, currency, terminology, pay/contribution-frequency copy and formatting.
- `carrowmont_plan_context_v1` remains backward compatible until a separately versioned state migration is approved.
- Guest-first/no-login core use remains protected.
- Existing public URLs, search ownership, Learn/Research structure, desktop/mobile navigation and typography remain protected.
- Every new FRE journey must reuse engine output and expose assumptions/confidence; narrative cannot override engine results.
- Every release follows Acceptance Ledger + 14-dimension impact matrix + Publisher/Guard + fresh snapshot.

## 3. Engine readiness map

| ID | Engine | Repository | Core status | FRE tier | Primary use |
|---|---|---|---|---|---|
| `recurring-investment` | SIP / Recurring Investment | `sip-calculator` | READY WITH ADAPTER | A | Growth, goal funding and contribution adequacy engine. |
| `goal-planner` | Goal Planner | `goal-planner` | EXTRACT PURE CORE BEFORE FRE | A | Goal trade-off and funding-gap engine. Must be extracted without changing formulas. |
| `financial-independence` | Financial Independence | `financial-independence` | READY WITH ADAPTER | A | Long-term independence and retirement-adjacent planning engine. |
| `inflation` | Inflation / Purchasing Power | `inflation-calculator` | EXTRACT PURE CORE BEFORE FRE | A | Common inflation transformer used by goals, retirement and explanations. |
| `retirement` | Retirement Planner | `retirement-calculator` | EXTRACT PURE CORE BEFORE FRE | A | Primary retirement adequacy engine. Extraction is mandatory before AI orchestration. |
| `budget-cash-flow` | Budget & Cash Flow | `budget-cash-flow-planner` | EXTRACT PURE CORE BEFORE FRE | A | Stabilize/Protect foundation. Highest-value extraction because many FRE decisions depend on cash flow. |
| `mortgage-payoff` | Mortgage / Home Loan Payoff | `mortgage-payoff-calculator` | READY WITH ADAPTER | A | Housing debt engine and source profile for mortgage decision tools. |
| `compound-interest` | Compound Interest | `compound-interest-calculator` | READY WITH ADAPTER | A | Generic deterministic growth engine for savings and scenario comparisons. |
| `loan` | Loan / EMI | `loan-calculator` | READY WITH ADAPTER | A | General borrowing-cost and repayment engine. |
| `debt-payoff` | Debt Payoff | `budget-cash-flow-planner` | READY WITH ADAPTER | A | Reduce-stage debt prioritization and payoff scenario engine. |
| `retirement-withdrawal` | Retirement Withdrawal / Drawdown / SWP | `retirement-calculator` | READY WITH ADAPTER | B | Post-retirement income and longevity engine. |
| `home-affordability` | Home Affordability / Borrowing Power | `draw004.github.io` | READY WITH ADAPTER | A | Core Can-I-afford-a-home decision engine. |
| `rent-vs-buy` | Rent vs Buy | `mortgage-payoff-calculator` | READY WITH ADAPTER | B | Housing choice scenario engine. |
| `mortgage-prepay-vs-invest` | Mortgage Prepay vs Invest | `mortgage-payoff-calculator` | READY WITH ADAPTER DEPENDENCY | A | High-value Resolution Engine journey: pay mortgage or invest. |
| `mortgage-refinance` | Mortgage Refinance / Balance Transfer Break-Even | `mortgage-payoff-calculator` | READY WITH ADAPTER | B | Refinance/transfer decision journey. |
| `mortgage-rate-stress` | Mortgage Rate Rise / Payment Stress | `mortgage-payoff-calculator` | READY WITH ADAPTER | B | Housing resilience/stress journey. |
| `four-percent-stress` | 4% Rule Stress Test | `draw004.github.io` | READY WITH ADAPTER | B | Retirement withdrawal risk/sequence explanation. |
| `fi-number-by-spending` | FI Number by Spending | `draw004.github.io` | READY WITH ADAPTER | B | Fast FI target estimator / supporting explanation engine. |
| `us-debt-interest` | US Debt & Interest Cost | `draw004.github.io` | CONTEXT ONLY READY | C | Research/context only. Must not directly drive personal recommendations without an explicit bridge. |
| `gold-macro-stress` | Gold Under Macro Stress | `draw004.github.io` | CONTEXT ONLY READY | C | Macro education/context only; never a personal buy/sell engine. |
| `silver-macro-stress` | Silver Supply, Demand & Macro Stress | `draw004.github.io` | CONTEXT ONLY READY | C | Macro education/context only. |
| `market-chain-reaction` | Market Chain Reaction Explorer | `draw004.github.io` | CONTEXT ONLY READY | C | Macro relationship education/context, not a personal recommendation engine. |

### The four mandatory extraction targets before broad FRE use

1. **Budget & Cash Flow** - highest priority because Stabilize/Protect decisions depend on it.
2. **Retirement Planner** - calculation is substantial and currently embedded in `app.js`; extract without changing outputs.
3. **Goal Planner** - move `state/calc` mathematics into a pure core with parity fixtures.
4. **Inflation Calculator** - extract the small `compute()` model into a pure core and reuse everywhere inflation transformation is needed.

Extraction means **move/call the same mathematics**, not redesign formulas. Before/after fixture parity must be exact within approved numerical tolerances.

## 4. Canonical FRE adapter contract (design lock for Batch 1)

Every callable engine should be exposed through one orchestration-facing adapter. The adapter is a wrapper, not a second formula implementation.

Required metadata/operations:
- `id`, `version`, `domain`, `sourceRepo`, `sourceFiles`;
- `requiredInputs` and `optionalInputs` with plain-language descriptions;
- `validate(input, context)` using the engine's own validation rules;
- `calculate(input, context)` which calls the deterministic core;
- normalized result object containing `ok`, engine data, warnings, methodology/version and trace metadata;
- currency/locale policy: `none`, `format-only`, `currency-sensitive` or `country-sensitive`;
- assumption list and sensitivity fields where the result materially depends on assumptions;
- no DOM reads/writes, no network calls and no hidden persistence inside the adapter;
- a trace showing which engine/version and user/assumed values produced the result.

## 5. Shared-state lock

`carrowmont_plan_context_v1` (schema 1) remains the cross-tool state boundary. Current allowed roots:
- `locale`
- `assumptions`
- `housingLoan`

Observed shared paths include locale region/currency, compound return/inflation assumptions, possible monthly debt extra, and housing balance/rate/payment/frequency/remaining-period/payoff fields. New FRE profile data must **not** be pushed into this v1 object casually. My Carrowmont will need a separately designed/versioned profile model.

Separate current stores/handoffs that must not be conflated with the future profile:
- `carrowmontMortgageDecisionV1` - explicit mortgage decision profile.
- `carrowmont_retirement_withdrawal_handoff_v1` - retirement-to-withdrawal handoff.

## 6. Localization lock

- 44 current region profiles; 34 current currencies.
- Region selection and currency overrides remain owned by `CarrowmontLocale`.
- FRE receives localized labels/formatters; it must not invent `SIP`, `EMI`, `Home Loan`, `Mortgage`, `fortnightly`, etc.
- Pay frequency and contribution frequency remain independent concepts.
- Cross-tool monetary values transfer only when currency and semantic meaning are compatible.

## 7. Reports/charts lock

- The 9 primary calculator `report-standard.js` files are byte-identical in this baseline.
- FRE does not replace existing reports. Early FRE answers may link to or summarize engine results; a dedicated Resolution Report should be designed later as a separate contract.
- Charts stay selective and must reuse existing Carrowmont visual/methodology patterns. No chart is added merely because data exists.

## 8. Batch 1 handoff

Batch 1 may begin only from this all-green baseline or a newer all-green snapshot. Its first work should be infrastructure, not homepage transformation:
- Create the orchestration/engine-adapter registry skeleton.
- Add adapters for a small set of already-pure Tier-A engines.
- Extract Budget, Retirement, Goal and Inflation into pure deterministic cores with exact parity tests.
- Define the first versioned financial-state model separately from `carrowmont_plan_context_v1`.
- Create intent taxonomy and routing tests without exposing a public chatbot yet.
- Keep all existing pages/calculators functioning unchanged.

## 9. Batch 0 exit evidence

- Exact snapshot SHA verified: PASS.
- 11 repository commits recorded from `SNAPSHOT-MANIFEST.txt`: PASS.
- Engine inventory generated from current source: PASS.
- 9-tool shared report registry confirmed: PASS.
- Shared report-standard byte identity confirmed: PASS.
- Shared state/version/allowed roots confirmed: PASS.
- Locale profile/currency counts confirmed from runtime layer: PASS.
- Source contract re-run on untouched baseline: **723 PASS / 0 FAIL**.
- Runtime/user-visible changes in Batch 0: **NONE**.

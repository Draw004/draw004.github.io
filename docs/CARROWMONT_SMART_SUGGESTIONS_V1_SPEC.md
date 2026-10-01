# Carrowmont Smart Suggestions V1

**Document:** `CARROWMONT_SMART_SUGGESTIONS_V1_SPEC.md`  
**Version:** 1.0  
**Status:** Implementation specification  
**Date:** 2 October 2026  
**Baseline:** `carrowmont-source-snapshot (16).zip`  
**Primary product:** Budget & Cash Flow Planner

## 1. Purpose

Smart Suggestions V1 will turn the Budget & Cash Flow Planner from a tool that mainly reports what the user entered into a tool that also explains what is changing, which changes appear meaningful, and what practical options the user could consider next.

The core rule is:

> **Carrowmont calculates the facts. AI may explain those facts later, but AI must not invent or recalculate the money.**

The first production release will therefore be deterministic, local-first, privacy-first, and fully usable without an external AI service.

## 2. Current baseline

Snapshot 16 captures the following repository commits:

| Repository | Commit |
|---|---|
| `draw004.github.io` | `54b4f4333d311c3c085743b54076f43687cc62ab` |
| `sip-calculator` | `9309d6b6150c6f09e410b7f0b3c79a456c4c3f42` |
| `goal-planner` | `e4f14525d858ed1b1bcffcc1c24b211144915d38` |
| `financial-independence` | `f0abbb8c3be6cf511dabc700713a6300c9b13c84` |
| `inflation-calculator` | `885fb1a09946632dccee1d4f2cb9a3bb686282b5` |
| `retirement-calculator` | `aed436d4b2d016a548ff8fee61cc8743b526d94a` |
| `budget-cash-flow-planner` | `f5cde33912ed6c046d4c3b181e70977229e4b180` |
| `carrowmont-qa` | `97a66b3e7004856139e967262207ca4fc76c1ffc` |

The Budget tool already supports monthly and pay-cycle views, multiple income sources, essential/flexible spending, savings/investments, quarterly/annual reserves, emergency-reserve targets, protected categories, exceptional categories/months, local IndexedDB history, 3/6/12-month comparison, JSON export/restore, deterministic insights, locale-aware display, and PDF reports.

The current deterministic insight logic already identifies cash-flow pressure or free cash flow, emergency-reserve position, flexible-spending deviation from a recent average, one flexible category materially above its recent baseline, savings change, and irregular-bill reserves.

## 3. Why V1 needs a new engine

The current insight logic is useful but still limited. It is embedded directly in `app.js`, relies mainly on a three-month baseline, returns presentation-ready text rather than structured evidence, does not rank opportunities systematically, and does not provide low-disruption/balanced/aggressive scenarios.

Smart Suggestions V1 will separate **analysis** from **presentation** so that the same trusted facts can power the webpage, reports, QA fixtures, and a future optional AI explanation layer.

## 4. Product boundaries

### V1 will do

- Analyze the current month against non-exceptional saved history.
- Use monthly-equivalent values so different frequencies remain comparable.
- Detect meaningful changes rather than reacting to every small fluctuation.
- Respect protected categories.
- Exclude exceptional entries and exceptional months from normal baselines.
- Distinguish flexible-spending opportunities from essential-cost changes.
- Rank the most useful signals.
- Generate up to three primary suggestions.
- Offer Low-disruption, Balanced, and Aggressive adjustment scenarios when reducible flexible-spending opportunities actually exist.
- Connect available monthly amounts to the user's selected planning priority.
- Keep all V1 analysis in the browser/device.
- Continue working without an account or network connection after page load.

### V1 will not do

- Connect to banks, cards, or transaction feeds.
- Read email, identity, address, or account information.
- Send budget history to an AI provider.
- Store an API key in browser JavaScript.
- Recommend reducing essential expenses as a savings action.
- Override a protected category.
- Treat one exceptional month as a normal trend.
- Predict investment returns, debt payoff savings, or retirement outcomes inside the Budget tool.
- Present generated text as individualized financial advice.

## 5. Architecture decision: V1A first, AI later

The current Carrowmont tools are static browser applications. There is no secure application backend in Snapshot 16 for holding an AI provider secret.

Therefore Smart Suggestions will be delivered in two controlled layers:

### V1A - Deterministic Smart Suggestions

This is the first release. All calculations and suggestion generation happen locally in the browser. No AI API is required and no budget data leaves the device because of Smart Suggestions.

### V1B - Optional AI Explanation Layer

This can be added later only after a secure backend/serverless endpoint exists. The AI layer will receive a compact, user-approved summary of already-calculated facts. It will explain and prioritize those facts; it will not be allowed to recalculate or replace them.

This separation preserves Carrowmont's current privacy-first model and avoids exposing an API key in public client code.

## 6. Smart Suggestions V1A analysis model

### 6.1 Data used

The engine may use:

- current monthly income;
- essential expenses;
- flexible expenses;
- planned savings/investments;
- irregular-bill reserves;
- money remaining;
- savings rate;
- emergency-reserve coverage and selected target;
- current planning priority;
- protected/exceptional flags;
- up to the latest 12 saved months;
- saved category values converted to monthly equivalents.

### 6.2 Data excluded from trend baselines

The engine must exclude:

- any month marked `monthExceptional`;
- an expense row marked `exceptional` when calculating that category's normal baseline;
- invalid, missing, or negative entered values after normal input normalization.

Exceptional information remains visible in history; it is simply not treated as normal behavior.

### 6.3 History-quality levels

| Normal saved history | Allowed interpretation |
|---|---|
| 0-2 months | Current-month facts only; no trend claim |
| 3-5 months | Short-term comparison against recent baseline |
| 6-11 months | Short-term plus latest-3-vs-previous-3 trend analysis |
| 12+ months | Short, medium, and latest-6-vs-previous-6 persistence checks using the latest 12 months |

The UI should tell the user how much normal history supports a suggestion. It must not imply a strong trend when history is insufficient.

### 6.4 Category matching

Use the saved row `id` as the preferred tracking key across months. If a historic item cannot be matched by ID, fall back to normalized category name matching for backward compatibility.

No destructive database migration is required for V1A.

## 7. Materiality rules

Smart Suggestions should avoid noise. A change becomes a candidate signal only when it is both relatively meaningful and financially material.

For current-vs-baseline flexible-category review:

- at least three valid non-exceptional historic observations are required;
- current monthly equivalent must be above the baseline;
- relative increase must be at least 12%; and
- absolute increase must be at least 0.5% of current monthly income.

For a six-month trend (latest 3 months vs previous 3):

- at least six valid non-exceptional observations are required;
- latest-three average must be at least 10% above previous-three average; and
- the monthly difference must be at least 0.5% of current monthly income.

For a twelve-month persistence check (latest 6 vs previous 6):

- at least twelve valid non-exceptional observations are required;
- latest-six average must be at least 8% above previous-six average; and
- the monthly difference must be at least 0.5% of current monthly income.

If income is zero or unavailable, the engine may still show factual cash-flow warnings, but it should not create percentage-of-income materiality claims.

## 8. Reduction-candidate rules

A category may become a spending-reduction candidate only when all of the following are true:

1. It is a **flexible** expense.
2. It is not protected.
3. It is not exceptional.
4. It has enough valid history for the claim being made.
5. Its increase satisfies the materiality rules.

Essential expenses may generate an informational signal when they rise materially, but V1A will not propose cutting an essential category.

This means a user can safely mark rent, groceries, medical costs, education, or any personally important category as protected, and the engine will not use it as a reduction source.

## 9. Scenario engine

When at least one valid flexible-spending opportunity exists, the engine may calculate three adjustment scenarios. Every scenario is based only on identified excess above the normal baseline, not an arbitrary percentage of the user's entire budget.

For each eligible category:

- `excess = max(0, current monthly equivalent - normal baseline)`

Suggested monthly adjustment:

| Scenario | Rule |
|---|---|
| Low-disruption | 25% of identified excess, capped at 10% of the current category amount |
| Balanced | 50% of identified excess, capped at 20% of the current category amount |
| Aggressive | 75% of identified excess, capped at 30% of the current category amount |

The total scenario amount is the sum of eligible category adjustments.

The word **Aggressive** describes the size of the adjustment scenario only. It must not imply that the scenario is recommended for the user.

If no legitimate reduction opportunity exists, Carrowmont should not fabricate one. It can instead show positive progress, cash-flow pressure, reserve gaps, or an opportunity to allocate existing surplus.

## 10. User-priority linkage

The existing planning-priority selector will determine how the engine frames available monthly capacity.

| Priority | Smart Suggestions behavior |
|---|---|
| Cash buffer | Show amount that could remain as additional monthly buffer |
| Emergency reserve | Show potential monthly allocation and approximate months to close the current modelled gap when calculable |
| Debt reduction | Show potential additional monthly payment amount only; do not estimate interest saved or payoff date without debt inputs |
| Life goal | Offer the amount as an input for Goal Planner |
| Recurring investment | Offer the amount as an input for SIP / Recurring Investment Calculator |
| Retirement | Offer the amount as an input for Retirement Planner |
| Financial independence | Offer the amount as an input for Financial Independence |

Cross-tool links must not invent outcomes. The destination calculator remains responsible for its own mathematics.

## 11. Suggestion types and ranking

V1A can produce structured signals in these families:

- `cashflow_pressure`
- `free_cashflow`
- `emergency_gap`
- `emergency_target_covered`
- `flexible_total_change`
- `flexible_category_change`
- `persistent_flexible_trend`
- `essential_cost_change`
- `savings_progress`
- `savings_decline`
- `irregular_bill_reserve`
- `pay_cycle_pressure`
- `priority_allocation`

The webpage should normally display **three primary suggestions**. Ranking order should prioritize:

1. cash-flow shortfall or timing pressure;
2. meaningful recurring/persistent changes;
3. flexible-category opportunities;
4. emergency-reserve gap relative to the user's selected target;
5. savings deterioration or progress;
6. surplus allocation to the selected priority;
7. informational reserve reminders.

The engine may retain additional signals for the report or a “See more observations” control, but the main interface should not overwhelm the user.

## 12. Structured suggestion contract

Each suggestion should be generated as data first, then rendered as language. A representative structure is:

```text
id
kind
severity
confidence
historyMonthsUsed
title
evidence[]
currentValue
baselineValue
deltaValue
deltaPercent
eligibleForReduction
protected
scenarioAmounts { low, balanced, aggressive }
priorityDestination
relatedTool
```

The exact JavaScript object can vary during implementation, but the analysis layer must remain independent of HTML rendering.

This contract is important because the same facts can later be used by the webpage, PDF report, automated tests, and optional AI explanation endpoint.

## 13. User experience

The current **Budget Intelligence** section will evolve into **Smart Suggestions** while retaining the statement that the observations are deterministic and educational.

Recommended layout:

1. **Context strip** - “Based on the current month + N normal saved months.”
2. **Top three suggestion cards** - each card contains:
   - what changed;
   - the evidence;
   - why it matters;
   - an optional action amount when appropriate.
3. **Scenario selector** - Low-disruption / Balanced / Aggressive, shown only when reduction candidates exist.
4. **Priority connection** - explains where the scenario amount could be directed based on the user's selected priority.
5. **Why this appears** - concise disclosure of baseline/history used.
6. **Protected-category reassurance** - clearly states that protected categories are excluded from reduction suggestions.

The UI should never use shame-oriented or prescriptive wording. Prefer “could”, “consider”, “review”, and “based on the entries here” rather than “must”, “should”, or “bad spending”.

## 14. PDF report behavior

V1A should use the same deterministic suggestion objects in the Budget PDF rather than maintaining separate report-only logic.

The report should include up to three primary Smart Suggestions and identify the selected scenario only when a scenario exists. It should retain the existing explanation of frequencies, irregular averages, quarterly/annual reserves, protected categories, and exceptional entries.

AI-generated prose will not be placed in the V1A PDF.

## 15. Privacy and network rules

Smart Suggestions V1A must introduce **zero new budget-data network transmission**.

The following remain local:

- raw month history;
- row-level amounts;
- category names;
- notes;
- due dates;
- emergency-reserve entries;
- selected priority.

Existing analytics behavior must not be expanded to include budget amounts, category names, history values, or suggestion evidence.

## 16. Future V1B AI explanation layer

V1B is optional and is not a prerequisite for V1A.

Before V1B can be released, Carrowmont needs a secure backend/serverless endpoint with:

- provider API key stored as a server-side secret;
- request validation;
- rate limiting;
- payload-size limits;
- abuse protection;
- no raw bank/card/transaction identifiers;
- no automatic request when the page loads;
- explicit user action before sending a summarized payload.

The AI request should contain only deterministic facts needed for explanation. Notes, due dates, month notes, raw history arrays, identity data, and financial account identifiers must not be sent.

The AI response must reference locked numeric facts supplied by the deterministic engine. If the AI service fails, the deterministic Smart Suggestions interface must continue to work normally.

## 17. Planned implementation files

### Budget repository

- **New:** `smart-suggestions.js` - pure analysis/scenario engine.
- `app.js` - feeds normalized state/history to the engine and renders returned suggestion objects.
- `index.html` - Smart Suggestions controls/context/scenario UI.
- `styles.css` - responsive styling using the approved Carrowmont UI standard.
- `budget-pdf-renderer.js` - uses structured Smart Suggestions for report output.
- `README.md` - documents V1 behavior and privacy model.

No changes to locale mathematics, report-standard shared registry, or other calculator formulas are required for the initial Smart Suggestions implementation.

### Central QA repository

- deterministic fixtures for Smart Suggestions;
- browser tests for protected and exceptional behavior;
- history sufficiency tests;
- scenario amount tests;
- cross-tool priority-link tests;
- report text tests;
- privacy/network contract test confirming V1A makes no Smart-Suggestions data request.

## 18. Required QA scenarios

The release must cover at least these cases:

1. No saved history: factual current-month suggestions only.
2. Two saved months: no unsupported trend claim.
3. Three normal months: short-term baseline can be used.
4. Exceptional month: excluded from baseline but still visible in history.
5. Exceptional category row: excluded from that category's baseline.
6. Protected flexible category increases sharply: never offered as a reduction source.
7. Essential category increases sharply: informational review only, no reduction scenario.
8. Six normal months: latest-3-vs-previous-3 trend works.
9. Twelve normal months: persistent trend analysis works.
10. Negative free cash flow: cash-flow pressure ranks first.
11. Positive surplus with emergency priority: allocation framing uses emergency-reserve gap.
12. Positive surplus with goal/investment/retirement/FI priority: correct cross-tool destination is shown.
13. Zero income: no divide-by-zero or misleading materiality percentage.
14. Currency/country change: underlying analysis does not change merely because display currency/profile changes.
15. Backup/restore: Smart Suggestions recompute correctly after restored history.
16. PDF: report uses the same top deterministic suggestions as the webpage.
17. Privacy: V1A Smart Suggestions produce no new request containing budget values.

## 19. Release strategy

To reduce regression risk, Smart Suggestions should be shipped in two product batches rather than mixing deterministic analysis and external AI connectivity in one release.

### Batch SS1 - Deterministic Smart Suggestions V1A

- analysis engine;
- three ranked suggestions;
- scenario selector;
- priority linkage;
- PDF integration;
- central QA;
- specification added to `draw004.github.io/docs/`.

Expected repositories affected: `budget-cash-flow-planner`, `carrowmont-qa`, and `draw004.github.io` for the specification document.

### Batch SS2 - Optional AI Explanation V1B

Only after V1A has been live and stable, and only after the backend/privacy architecture is approved.

## 20. Acceptance criteria for V1A

Smart Suggestions V1A is ready only when all of the following are true:

- all financial facts come from deterministic code;
- no protected flexible category is proposed for reduction;
- no essential category is proposed for reduction;
- exceptional months/items do not distort normal baselines;
- trend language respects minimum history requirements;
- scenarios are derived only from evidenced excess;
- top suggestions are deterministic and repeatable for the same inputs;
- zero-history and zero-income states are safe;
- webpage and PDF use the same suggestion facts;
- no new budget-data network transmission occurs;
- source-contract checks pass;
- staged Playwright QA passes;
- live Automated QA passes after merge;
- Multi-Repo Guard passes;
- a new clean Source Snapshot is taken after release.

## 21. Implementation direction

The recommended next action is **Batch SS1: Deterministic Smart Suggestions V1A**.

This gives Carrowmont useful “smart” behavior immediately while keeping the trusted local-first architecture intact. Once SS1 is stable, the AI explanation layer can be evaluated as a separate capability without putting the calculation engine or user privacy at risk.

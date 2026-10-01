# Carrowmont Smart Suggestions SS2

**Document:** `CARROWMONT_SMART_SUGGESTIONS_SS2_SPEC.md`  
**Version:** 1.1  
**Status:** SS2 implementation baseline  
**Date:** 2 October 2026  
**Primary product:** Budget & Cash Flow Planner  
**Implementation baseline:** `carrowmont-source-snapshot (18).zip` — main `3fe5e97c0a3aaa067910cf18ef752d7b61835ddc`, Budget `9e811602b4482dcb7a67d48f2d84e612918c5e4f`, QA `3890355ae9ebcaefc5e264a98a247135c472f891`.

## 1. Purpose

SS2 improves the quality of Carrowmont Smart Suggestions before any external AI service is introduced.

SS1 proved the local deterministic engine, protected-category guardrails, exceptional-history handling, scenario calculations, priority linkage, PDF parity, privacy contract, and automated QA. SS2 now focuses on a harder question:

> **Which observations actually deserve the user's attention, and how can Carrowmont explain the evidence clearly without manufacturing advice?**

The core product rule remains unchanged:

> **Carrowmont calculates and ranks the facts. Any future AI layer may explain those locked facts, but it must not invent or recalculate the money.**

## 2. Release naming decision

The original Smart Suggestions V1 specification described a future batch called SS2 for the optional AI explanation layer. After SS1 was successfully released, the product sequence was deliberately refined.

The revised sequence is:

| Release | Purpose |
|---|---|
| SS1 | Deterministic Smart Suggestions V1A - released |
| SS2 | Deterministic intelligence enhancement - this specification |
| Later V1B / SS3 | Optional AI explanation layer, only after backend and privacy architecture are approved |

This document supersedes the earlier SS2 naming only. The safety, privacy, deterministic-math, and AI-boundary principles from the V1 specification remain in force.

### 2.1 Implementation record

The implementation batch described by this document is **SS2 - Deterministic intelligence enhancement**. The browser engine is versioned as **Smart Suggestions engine version 2.0.0** and is built from Snapshot 18. SS2 remains local-first and introduces **no external AI service** and no new transmission of budget history or row-level financial data.

## 3. Current SS1 capability

The released SS1 engine (`smart-suggestions.js` version 1.0.0) already:

- analyzes up to 12 non-exceptional saved months;
- excludes exceptional months from normal baselines;
- excludes exceptional rows from matching category baselines;
- never uses protected flexible categories as reduction sources;
- never proposes cutting essential categories;
- detects current-vs-recent flexible-spending changes;
- detects 6-month and 12-month persistent flexible-spending increases;
- detects category-level flexible-spending increases;
- detects essential-cost increases as informational signals;
- detects savings progress or decline;
- models Low-disruption, Balanced, and Aggressive scenarios from evidenced excess;
- connects scenario capacity or existing surplus to the selected priority;
- uses the same deterministic facts on screen and in the Budget PDF;
- introduces no Smart-Suggestions network request containing budget data.

SS1 ranking uses fixed signal ranks plus a one-per-family selection rule. This is safe and predictable, but it can be made more selective and more evidence-aware.

## 4. SS2 goals

SS2 will improve six areas:

1. **Trend quality** - distinguish persistent behavior from a short spike.
2. **Ranking quality** - score evidence consistently and show only worthwhile suggestions.
3. **Evidence clarity** - explain what changed, what baseline was used, and why the signal appears.
4. **Scenario quality** - make the scenario breakdown transparent and keep every amount tied to evidenced excess.
5. **Recurring and irregular cost handling** - avoid treating reserve-style or irregular entries like ordinary monthly overspending.
6. **No-action intelligence** - explicitly say when the data does not support a meaningful adjustment.

## 5. Non-goals

SS2 will not:

- connect an external AI provider;
- add an API key to browser code;
- connect to bank, card, email, or transaction feeds;
- upload budget history to a server;
- change the formulas of SIP / Recurring Investment, Goal Planner, Retirement Planner, Financial Independence, or Inflation Calculator;
- estimate investment returns inside the Budget tool;
- estimate debt interest saved or payoff dates without debt-specific inputs;
- create a recommendation merely to fill a third suggestion card;
- convert protected or essential expenses into spending-cut recommendations.

## 6. Deterministic trend model

### 6.1 Normal-history definition

A normal history observation must:

- not be the current month;
- not have `monthExceptional = true`;
- contain a valid non-negative monthly-equivalent value for the metric being analyzed.

Category matching continues to prefer the saved row `id`, with normalized-name fallback for backward compatibility.

### 6.2 History windows

SS2 keeps the existing 3 / 6 / 12-month model but adds consistency checks.

| Valid normal history | Analysis permitted |
|---|---|
| 0-2 months | Current-month facts only; no trend claim |
| 3-5 months | Current month vs recent 3-month baseline; label as Emerging when material |
| 6-11 months | Recent 3 vs previous 3 plus consistency test; can become Established |
| 12+ months | Latest 6 vs previous 6 plus consistency test; can become Established |

The engine uses only the latest 12 normal months for Smart Suggestions.

### 6.3 Materiality thresholds

Existing SS1 materiality thresholds remain the starting point:

- current vs recent baseline: at least 12% relative change and at least 0.5% of current monthly income;
- latest 3 vs previous 3: at least 10% relative change and at least 0.5% of current monthly income;
- latest 6 vs previous 6: at least 8% relative change and at least 0.5% of current monthly income.

If monthly income is zero or unavailable, the engine may still show factual cash-flow observations but must not create percentage-of-income materiality claims.

### 6.4 Consistency tests

A persistent increase should not be declared from averages alone.

For a 6-month comparison:

- the latest-3 average must pass the materiality test against the previous-3 average; and
- at least 2 of the latest 3 monthly values must be at least 5% above the previous-3 average.

For a 12-month comparison:

- the latest-6 average must pass the materiality test against the previous-6 average; and
- at least 4 of the latest 6 monthly values must be at least 5% above the previous-6 average.

The same structure may be used in the opposite direction to identify a meaningful improvement trend.

### 6.5 Confidence language

SS2 will use simple evidence labels rather than numerical confidence percentages.

| Label | Meaning |
|---|---|
| Current | Current-month fact with no history-based trend claim |
| Emerging | Material current/recent change supported by at least 3 normal months |
| Established | Material change passes a 6- or 12-month persistence and consistency test |

The label is descriptive evidence context, not a probability.

## 7. Recurring and irregular cost intelligence

### 7.1 Recurring cost step-up

SS2 may create a `recurring_cost_step_up` signal when a matching non-exceptional expense row shows a stable higher level rather than a one-month spike.

Minimum conditions:

- at least 5 valid matching normal months;
- the latest 2 monthly-equivalent observations are within 2% of each other;
- their average is at least 8% above the previous 3-month average; and
- the absolute increase passes the normal income-based materiality test.

A flexible, unprotected recurring cost can become a reduction candidate. An essential or protected recurring cost remains informational only.

### 7.2 Quarterly, annual, and irregular entries

Rows with `quarterly`, `annual`, or `irregular` frequency must not be described as ordinary monthly overspending simply because the entered amount is large.

For these rows:

- compare monthly-equivalent reserve values;
- use reserve-oriented wording such as "planned reserve changed";
- default to informational treatment;
- do not include the row in a spending-reduction scenario unless a later dedicated rule explicitly establishes it as a flexible recurring commitment rather than a reserve.

This prevents an annual insurance payment or quarterly bill reserve from being presented as a monthly spending spike.

## 8. Internal suggestion scoring

SS2 replaces fixed ranks as the primary selector with a deterministic internal score. The score is never shown to the user.

Signals must first pass their own eligibility/materiality rules. Eligible signals are then scored out of 100:

| Component | Maximum | Purpose |
|---|---:|---|
| Financial impact | 35 | How material the monthly change is relative to income and absolute value |
| Persistence | 25 | How much valid history supports the signal |
| Consistency | 15 | Whether repeated observations support the same direction |
| Actionability | 15 | Whether the user can reasonably act without touching essential/protected entries |
| Priority relevance | 10 | Whether the signal directly supports the user's selected planning priority |

### 8.1 Financial-impact bands

After the minimum 0.5%-of-income materiality gate is met:

- 0.5% to under 1% of income: 10 points;
- 1% to under 2%: 20 points;
- 2% to under 3%: 30 points;
- 3% or more: 35 points.

For signals that do not use an income-relative delta, such as emergency-gap status, the family-specific rule provides its impact points deterministically.

### 8.2 Persistence points

- current-only factual signal: 0;
- 3-5 valid normal months: 8;
- 6-11 valid normal months: 17;
- 12 valid normal months: 25.

### 8.3 Consistency points

- no historical consistency claim: 0;
- Emerging signal: 8;
- Established 6-month signal: 12;
- Established 12-month signal: 15.

### 8.4 Actionability points

- flexible, unprotected, non-exceptional reduction candidate: 15;
- savings / allocation action: 10;
- informational essential or reserve change: 5;
- positive status with no immediate action needed: 3.

### 8.5 Priority relevance points

- directly links available capacity to the selected priority: 10;
- improves general cash-flow capacity but not the selected priority specifically: 5;
- no direct connection: 0.

### 8.6 Selection rules

- `cashflow_pressure` remains an urgency override and must appear first while monthly remaining is negative.
- Other signals are ordered by score, then severity, then absolute monthly impact, then stable signal id.
- A primary card should normally require a score of at least 35, except required factual safety/status messages.
- Show **up to three** primary suggestions, not exactly three.
- Do not show duplicate observations that communicate the same underlying evidence.
- At most two category-level reduction cards may appear in the primary three.
- A lower-ranked positive-progress card should not displace a materially more important pressure/risk card.

## 9. Deduplication rules

SS2 should avoid showing multiple cards that all describe the same spending movement.

Examples:

- If a category-level increase explains most of a flexible-total increase, prefer the category evidence and suppress the weaker total-level card from the primary set.
- If a 12-month persistent flexible trend is present, suppress a weaker 6-month signal for the same metric.
- If a recurring-cost step-up exists for the same category as a generic category increase, show the recurring-cost explanation.
- Suppressed signals may remain in the analysis object for PDF detail or QA, but should not clutter the main interface.

## 10. Positive and no-action states

### 10.1 Improvement signals

SS2 may identify sustained improvement such as:

- persistent flexible spending decline;
- savings increase;
- emergency-reserve target reached;
- cash-flow buffer improvement.

Positive signals rank below active financial pressure and material negative changes.

### 10.2 No meaningful adjustment

If no signal meets the main-card threshold and there is no urgent factual condition, Carrowmont should not manufacture advice.

Recommended wording:

> **No strong adjustable trend stands out right now.** Your recent entries are relatively stable, or there is not yet enough normal history to support a stronger suggestion. Keep saving normal months for a clearer comparison.

The exact message can vary depending on whether the reason is stability or insufficient history.

## 11. Scenario engine enhancement

The existing Low-disruption / Balanced / Aggressive percentages remain unchanged for SS2:

| Scenario | Rule per eligible category |
|---|---|
| Low-disruption | 25% of evidenced excess, capped at 10% of current category amount |
| Balanced | 50% of evidenced excess, capped at 20% of current category amount |
| Aggressive | 75% of evidenced excess, capped at 30% of current category amount |

SS2 adds these rules:

- only reduction candidates that pass SS2 eligibility and ranking-quality checks contribute to scenarios;
- essential, protected, exceptional, quarterly, annual, and irregular reserve-style entries are excluded;
- no category adjustment may exceed its evidenced excess;
- the scenario panel must show the monthly total and 12-month equivalent;
- the user can expand a deterministic breakdown showing which categories contribute to the scenario;
- the breakdown must show baseline, current monthly equivalent, and scenario adjustment for each included category;
- changing Low / Balanced / Aggressive must not change the underlying detected evidence.

The word "Aggressive" continues to describe scenario size only; it is not a recommendation.

## 12. Priority linkage enhancement

SS2 keeps the existing selected-priority behavior and improves explanation quality.

For positive available capacity, show:

- monthly amount;
- 12-month arithmetic equivalent (`monthly amount x 12`);
- selected destination framing;
- link to the relevant Carrowmont tool when appropriate.

Examples:

- **Emergency reserve:** show the modelled reserve gap and approximate months to close it when inputs allow.
- **Debt reduction:** show only additional monthly payment capacity; no interest or payoff estimate.
- **Life goal:** offer the amount as an input to Goal Planner.
- **Recurring investment:** offer the amount as an input to SIP / Recurring Investment Calculator.
- **Retirement:** offer the amount as an input to Retirement Planner.
- **Financial independence:** offer the amount as an input to Financial Independence.

The Budget tool must not calculate the destination tool's outcome.

## 13. User experience

### 13.1 Smart Suggestion card

Each primary card should contain:

1. **Finding** - what changed.
2. **Evidence** - current value and relevant baseline/window.
3. **Evidence label** - Current, Emerging, or Established.
4. **Meaning** - why Carrowmont surfaced it.
5. **Action amount** - only when a legitimate deterministic action exists.
6. **Why am I seeing this?** - expandable explanation of history/window and exclusions.

Do not expose the internal score.

### 13.2 Scenario panel

When scenarios exist, the panel should show:

- selected scenario name;
- monthly capacity;
- 12-month arithmetic equivalent;
- number of included flexible categories;
- expandable category breakdown;
- selected-priority connection.

### 13.3 Protected-category reassurance

Retain a clear statement that protected categories are never used as reduction sources and essential categories are informational only.

### 13.4 Tone

Use neutral, non-shaming language. Prefer:

- "could";
- "consider";
- "review";
- "based on the entries here";
- "appears higher than";
- "the evidence supports".

Avoid:

- "bad spending";
- "you should cut";
- "you must";
- implying certainty that is not supported by the history.

## 14. PDF parity

The Budget PDF must consume the same SS2 analysis and presentation objects as the webpage.

The report should include:

- the same top primary suggestions;
- the same Current / Emerging / Established labels;
- the same baseline and comparison windows;
- the same selected scenario amount;
- the same category breakdown when a scenario exists, space permitting;
- the same selected-priority connection;
- the existing explanation of frequencies, irregular averages, reserves, protected categories, and exceptional entries.

The PDF must not maintain a second independent ranking or scenario engine.

## 15. Privacy and analytics

SS2 remains entirely local-first.

It must introduce:

- no Smart-Suggestions API request;
- no external AI call;
- no transmission of category names, notes, due dates, amounts, history arrays, reserve entries, or priority selection;
- no analytics event containing monetary values or row-level budget details.

A future AI explanation layer remains a separate release and requires explicit architecture approval.

## 16. Structured engine contract

SS2 should extend the existing structured signal contract rather than replacing it.

Recommended additions:

```text
score
confidenceLabel          // Current | Emerging | Established
comparisonWindow         // current-vs-3, latest3-vs-previous3, latest6-vs-previous6
consistencyCount
consistencyRequired
suppressedBy             // signal id when deduplicated from primary UI
reasonCodes[]
scenarioEligible
frequencyClass           // recurring | reserve-style | irregular
```

Scenario breakdown item:

```text
candidateId
name
baselineValue
currentValue
excessValue
adjustmentValue
scenarioKey
historyMonthsUsed
confidenceLabel
```

The exact JavaScript property names may vary, but the same concepts must be represented in deterministic data before presentation text is generated.

## 17. Planned implementation files

### Budget & Cash Flow Planner repository

- `smart-suggestions.js`
  - version bump from 1.0.0;
  - persistence/consistency helpers;
  - recurring-cost and reserve-style classification;
  - deterministic score calculation;
  - deduplication and primary-selection logic;
  - positive/no-action states;
  - scenario breakdown data.
- `app.js`
  - render evidence labels;
  - render "Why am I seeing this?" detail;
  - render scenario breakdown;
  - retain existing priority links and local-only behavior.
- `index.html`
  - semantic containers/buttons for expandable evidence and scenario detail.
- `styles.css`
  - responsive card metadata and details treatment consistent with the shared UI standard.
- `budget-pdf-renderer.js`
  - consume SS2 ranking, evidence labels, and scenario breakdown.
- `README.md`
  - document SS2 behavior, limits, and privacy.

### Central QA repository

- extend `tests/07-smart-suggestions.spec.js`;
- extend PDF parity tests;
- extend source-contract checks for the SS2 version and privacy rules;
- add deterministic fixtures for ranking and deduplication.

### Main repository

- add this specification to `docs/`;
- update the original V1 document or roadmap only if needed to note that the optional AI layer has moved to a later release.

## 18. Required QA scenarios

SS2 must cover at least the following deterministic cases:

1. Zero history: current facts only; no unsupported trend label.
2. Two normal months: no Emerging trend claim.
3. Three normal months: material current-vs-baseline change becomes Emerging.
4. Three normal months with a small change: no main suggestion below materiality threshold.
5. One unmarked spike among otherwise stable months: consistency test prevents Established classification.
6. Six months with 2 of latest 3 consistently above prior baseline: Established increase.
7. Six months with only 1 of latest 3 above prior baseline: not Established.
8. Twelve months with 4 of latest 6 consistently above prior baseline: Established 12-month trend.
9. Twelve months where the average rises because of one large month: consistency test prevents Established classification.
10. Sustained flexible spending decline: positive improvement signal can appear.
11. Protected flexible category rises: no scenario contribution.
12. Essential category rises: informational only; no scenario contribution.
13. Exceptional month excluded from every normal comparison window.
14. Exceptional row excluded from matching category evidence.
15. Monthly recurring cost shows a stable step-up across latest 2 months: recurring-cost signal appears.
16. One-month recurring-cost spike: recurring-cost step-up does not appear.
17. Annual insurance/reserve entry rises: reserve-oriented informational wording, not generic overspending.
18. Quarterly flexible reserve entry: excluded from reduction scenario.
19. Multiple flexible categories qualify: deterministic score orders them consistently.
20. Total flexible trend and category trend describe the same evidence: deduplication prevents redundant primary cards.
21. Only one signal exceeds primary threshold: show one card, not filler cards.
22. No signal exceeds threshold: show stable/no-strong-trend state.
23. Negative free cash flow: cash-flow pressure remains first regardless of other scores.
24. Scenario Low / Balanced / Aggressive arithmetic matches formula and never exceeds evidenced excess.
25. Scenario breakdown sum exactly equals scenario total.
26. Priority Goal / Investment / Retirement / FI links remain correct.
27. Emergency-priority modelled gap uses deterministic arithmetic only.
28. Zero income: no divide-by-zero, percentage-of-income claim, or invalid score.
29. Backup/restore: same restored data reproduces the same primary order and scenario values.
30. Country/currency change: analysis order and raw numeric facts do not change merely because display settings change.
31. PDF: primary suggestions and scenario values match webpage facts.
32. PDF: wrapped evidence text does not cause brittle exact-whitespace QA failures.
33. Mobile: cards, evidence details, and scenario breakdown have no horizontal overflow.
34. Privacy: Smart Suggestions interactions produce no fetch/XHR containing budget data.

## 19. Acceptance criteria

SS2 is ready only when all of the following are true:

- identical input data always produces identical signals, scores, order, and scenario amounts;
- 6- and 12-month Established labels require both materiality and consistency;
- unmarked single-month spikes do not create false Established trends;
- protected, essential, exceptional, and reserve-style exclusions are enforced;
- no scenario amount exceeds evidenced excess;
- primary suggestions are thresholded and not padded with low-value filler;
- redundant primary cards are deterministically suppressed;
- the user can see the evidence window behind every history-based primary suggestion;
- the no-action state is available when appropriate;
- webpage and PDF use the same deterministic result object;
- no new budget-data network transmission occurs;
- JavaScript syntax checks pass;
- source-contract checks pass;
- staged Playwright QA passes in Batch PR Publisher;
- live Automated QA passes after merge;
- Multi-Repo Guard passes;
- a fresh Source Snapshot is taken after successful release.

## 20. Release scope

Expected repositories for the SS2 implementation batch:

1. `budget-cash-flow-planner`
2. `carrowmont-qa`
3. `draw004.github.io` when this specification or roadmap note is included in the release

No changes are expected in the five other calculator repositories unless implementation discovers a genuine shared-contract dependency. Any such expansion must be explicit rather than bundled silently.

## 21. Post-SS2 direction

Only after SS2 is live, stable, and verified should Carrowmont evaluate the optional AI explanation layer.

That later release must use a secure backend/serverless endpoint and receive only a compact, user-approved summary of locked deterministic facts. Raw history, notes, due dates, identity information, and financial-account identifiers must remain outside the AI payload.

The future AI layer should improve explanation and prioritization, not calculation integrity.

## 22. Immediate implementation sequence

1. Add this specification to `draw004.github.io/docs/`.
2. Commit it to `main`.
3. Run a fresh **Carrowmont Source Snapshot**.
4. Use that snapshot as the only SS2 coding baseline.
5. Implement the engine changes first and validate them with deterministic fixtures.
6. Add UI and PDF presentation from the same result object.
7. Extend central QA before packaging the release.
8. Run Batch PR Publisher staged QA.
9. Merge only after green staged QA.
10. Run live Automated QA, Multi-Repo Guard, and a final fresh Source Snapshot.

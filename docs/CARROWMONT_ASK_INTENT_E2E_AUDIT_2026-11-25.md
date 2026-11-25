# Carrowmont Ask / Search End-to-End Intent Audit

Date: 25 November 2026
Baseline: `carrowmont-source-snapshot - 2026-11-25T153826.707.zip`
Purpose: verify not only what Ask/Search display, but what happens after the user clicks and whether the destination matches the financial task.

## Executive conclusion

Ask Carrowmont is useful but not yet aligned enough with Search or ordinary user wording to treat intent routing as mature. The current architecture has two partially independent interpretation layers: SearchCore supplies strong predictive/search matches, while Ask starts a guided journey using a simpler rule router. This can display one best match and then start a different journey.

The clearest example is retirement drawdown:
- Query: `calculate how long will my retirement fund would last?`
- Ask predictive first suggestion: SWP, Retirement Withdrawal & Drawdown Calculator
- Search best match: `/retirement-calculator/withdrawal-calculator.html`
- Ask `Work through this`: Retirement Readiness

This is an architectural inconsistency, not a one-phrase defect.

## Test coverage completed

1. 177-question routing/Search stress corpus using normal, informal, malformed, Indian and international wording.
2. Current 13 guided journeys tested as completed journeys with representative valid inputs.
3. Actual Ask result CTA click events captured for all 13 current journeys.
4. Actual Ask fallback-card click events tested on representative unsupported/misrouted questions.
5. Actual Search result-card click events tested on representative questions, including retirement withdrawal, emergency runway, mortgage prepay-vs-invest, credit-card payoff, loan EMI, inflation and SIP.
6. Search inventory target audit: all 151 indexed public URLs resolve to real local targets; no broken Search fragment destinations found.
7. Ask final CTA target audit including fragment/deep-link validation.
8. Explain-vs-calculate paired-question audit.
9. Result-recommendation vs final-CTA consistency audit.
10. Current automated QA inspected to identify why the mismatch escaped existing tests.

## Routing stress-test results

For the 113 stress questions whose intended task corresponds to one of the 13 current Ask guided journeys:
- Exact intended Ask journey: 54 / 113 (47.8%)
- Different supported Ask journey: 8 / 113
- Unsupported/general fallback: 51 / 113

This is an intentionally adversarial stress corpus, not a production-success estimate. It shows coverage gaps and conflicting rules.

### Current journey exact-match results

| Intent | Exact / tested |
|---|---:|
| Retirement Readiness | 10 / 10 |
| Debt vs Invest | 7 / 9 |
| Lump Sum Priorities | 6 / 7 |
| Emergency Runway | 6 / 12 |
| Car Affordability | 5 / 8 |
| Money Priorities | 4 / 9 |
| Goal Funding | 4 / 8 |
| Home Affordability | 3 / 8 |
| Borrowing Health | 3 / 8 |
| Cash-flow Shortfall | 2 / 10 |
| Debt Payoff | 2 / 8 |
| Credit-card Payoff | 2 / 8 |
| Mortgage Prepay vs Invest | 0 / 8 |

Retirement withdrawal/drawdown is not currently a guided Ask journey. Of 14 withdrawal/runway variants, 11 were routed to another supported journey, usually Retirement Readiness, and 3 were unsupported. Search selected the SWP/Drawdown tool for 13 of those 14 variants.

## Actual click findings

### Confirmed correct Search clicks

Representative Search cards were clicked in the DOM and produced the intended destinations:
- retirement fund longevity -> `/retirement-calculator/withdrawal-calculator.html`
- emergency savings longevity -> `/emergency-fund-runway-calculator.html`
- mortgage prepay vs invest -> `/mortgage-payoff-calculator/prepayment-vs-investing.html`
- credit-card minimum/payment -> `/budget-cash-flow-planner/credit-card-payoff-calculator.html`
- EMI -> `/loan-calculator/`
- SIP growth -> `/sip-calculator/`

All 151 Search-index URLs were checked against the snapshot: 0 missing targets and 0 broken indexed fragment targets.

### Confirmed Ask display/action contradictions

- Retirement withdrawal: predictive suggestion says SWP/Drawdown; `Work through this` opens Retirement Readiness.
- Mortgage prepay vs invest: predictive/Search often identify the specific mortgage comparison, but Ask frequently falls back or gets swallowed by generic Debt vs Invest.
- Credit-card minimum-payment questions: Search finds Credit Card Payoff, while Ask often falls back despite having a Credit Card Payoff journey.
- `Can I take on another EMI?`: Ask falls back to Loan/EMI search rather than Borrowing Health.

### Confirmed broken / misleading final CTA

`Pay debt or invest?` ends with `/budget-cash-flow-planner/#debt-payoff`.
- The base page exists.
- The target page has no `id="debt-payoff"` / named fragment and no hash router for that fragment.
- Result: the user lands on the general Budget & Cash Flow Planner rather than the intended Debt Payoff tool/section.

Correct direct destination should be the real Debt Payoff calculator when debt is the recommended path:
`/budget-cash-flow-planner/debt-payoff-calculator.html`

More importantly, the CTA must be dynamic. A test scenario with 3% debt APR and 9% assumed investment return produced:
- recommendation: `Investing is the stronger modeled path under your return assumption.`
- final CTA: `Explore the detailed Debt Payoff tools`

That is a direct result-to-action contradiction.

## All 13 current journey completion CTAs

All 13 guided journeys were completed with representative valid inputs and their actual final CTA click events were captured. Base destination files exist for all 13. The main issues are semantic/contextual rather than widespread dead URLs:

- Debt vs Invest: actual deep-link defect + static CTA contradicts investing-favored outcome.
- Money Priorities: generic `/tools.html` is valid but does not act on the modeled first priority.
- Lump Sum Priorities: guide link is relevant, but the modeled first action should also expose the corresponding practical tool.
- Retirement Readiness: Retirement Planner is correct, but the result should also offer a sequential Drawdown/SWP action with safe handoff.
- Home Affordability: main tool CTA is correct; secondary Home Buying Upfront Costs guide would improve the next step.
- Remaining current journey CTAs point to appropriate real tools.

## Explain vs calculate problem

Ask currently identifies topic but often does not distinguish the user's action.

Examples:
- `What is an emergency fund?` -> starts Emergency Fund Adequacy (should normally explain/read first).
- `Why do I need an emergency fund?` -> starts calculator journey.
- `What is DTI?` -> starts Borrowing Health.
- `How does credit-card interest work?` -> starts Credit-card Payoff.
- `What is retirement planning?` -> starts Retirement Readiness.

Paired calculation questions such as `Calculate my DTI`, `How much house can I afford?`, and `How long will it take to pay off my credit card?` appropriately belong in guided/tool flows.

Ask therefore needs two-stage interpretation:
1. Topic ownership.
2. User action: explain / calculate / plan / compare.

## Search also needs alignment work

Search is stronger than Ask for many task queries, but is not perfect:
- `What is DTI?` can rank Balance Transfer content above a DTI explainer/tool.
- `What is inflation?` can rank Real Yields rather than a basic inflation explainer.
- several cash-flow-shortfall phrasings return no useful result.
- some mortgage prepay/SIP wording ranks Refinance or generic Mortgage Payoff instead of Prepay vs Invest.
- some goal-funding wording ranks Emergency Runway.

Wave 2 should improve one shared ownership vocabulary rather than patch Ask and Search separately.

## Natural-language benchmark sources used

The corpus/plan was cross-checked against current wording and user needs reflected by:
- CFPB home-affordability and emergency-fund guidance.
- MoneyHelper debt/save/invest and mortgage-overpayment guidance.
- Fidelity and Vanguard retirement-savings longevity/withdrawal guidance.
- Investor.gov goal, compound-growth and savings calculators.
- SEBI Investor EMI, SIP, inflation and retirement calculators.
- Moneysmart emergency-fund and budgeting guidance.
- Reddit/community questions for informal wording such as `how much emergency fund is enough`, `minimum payment`, `pay off debt or invest`, and India-specific EMI/SIP/home-loan language.

These are used for wording/coverage inspiration, not copied content or financial recommendations.

## Why existing QA did not catch this

Current browser QA does several important things:
- resolves journeys;
- confirms final CTA visibility;
- tests a real car-affordability handoff end-to-end;
- clicks a generic Ask fallback card;
- checks Search result cards.

But it does not currently enforce a cross-system rule such as:
`predictive best intent -> Work through this intent -> guided engine -> final CTA -> actual destination`.

It also generally checks that most result CTAs are visible, not that every result CTA matches the modeled recommendation and lands on the correct tool/fragment.

## Recommended correction: Ask Intent Alignment & Coverage Wave 2

### A. Shared intent ownership
Create one reviewed shared ownership definition for Ask and Search containing:
- intent/topic key;
- specificity/priority;
- country terminology and ordinary-language aliases;
- action mode: explain / calculate / plan / compare;
- guided Ask journey if available;
- primary tool;
- primary guide;
- safe fallback.

Specific intents must outrank generic terms. Example: retirement withdrawal/drawdown must outrank generic `retirement`.

### B. Add four guided journeys using existing deterministic engines
Priority Wave 2 additions:
1. Retirement Withdrawal / SWP
2. Loan / EMI Cost
3. Inflation Impact
4. Recurring Investment / SIP

This expands Ask from 13 to 17 guided journeys without inventing new formulas.

### C. Fix natural-language coverage for existing journeys
Priority repairs:
- mortgage/home-loan prepay vs invest/SIP/mutual-fund wording;
- emergency savings longevity/job-loss/no-income wording;
- paycheck-to-paycheck/month-end/salary-finished wording;
- credit-card minimum-payment/months-to-clear/interest wording;
- borrowing-health/another EMI/existing loans wording;
- debt-payoff extra-payment/finish-sooner wording;
- goal funding amount + timeline + monthly-save wording;
- India/UK/US terminology variants.

### D. Make `Work through this` intent-aware
The displayed suggestion and the action must not disagree.

Rules:
- Guided intent available -> `Work through this` starts that exact journey.
- Best match is a tool but no guided journey -> action should become `Open best match` / `Use this tool`, not pretend to start a guided workflow.
- Explain intent -> route to the best Learn guide/Search result rather than force a calculator questionnaire.

### E. Retirement Readiness -> Drawdown handoff
Keep `Open Retirement Planner` and add:
`Test how long this retirement balance may last ->`
`/retirement-calculator/withdrawal-calculator.html`

Use the existing session handoff key `carrowmont_retirement_withdrawal_handoff_v1`, staging values for review rather than silently applying them.

### F. Dynamic result CTAs
- Debt vs Invest: debt result -> Debt Payoff; investing result -> appropriate investing/SIP/compound route; no fixed debt-biased CTA.
- Money Priorities: link the first modeled priority to the corresponding tool, while retaining All Tools as secondary.
- Lump Sum: keep the guide, add a tool matching the first modeled action.
- Home Affordability: keep calculator; add `Home Buying Costs Beyond the Deposit` as secondary education.

### G. Fix actual broken deep link
Replace `/budget-cash-flow-planner/#debt-payoff` with the real destination or implement a deliberate supported hash route. Direct tool destination is preferable.

### H. Permanent end-to-end QA
Add a reviewed 180-250 question corpus including:
- ordinary phrasing;
- poor grammar;
- typos;
- India/US/UK/Australia/Canada terminology;
- explain/calculate/plan/compare pairs;
- mixed-intent questions;
- unsupported questions.

For each applicable fixture, verify:
1. Search recognized ownership.
2. Ask recognized ownership.
3. predictive suggestion ownership.
4. actual `Work through this` action.
5. guided engine used.
6. completed result CTA.
7. actual click destination/path/fragment.
8. handoff values are staged/consumed correctly where applicable.

Also crawl every Search/Ask action URL and validate fragment existence or an explicit hash handler.

## Acceptance targets for Wave 2

- No known case where visible best suggestion and `Work through this` disagree on intent.
- 100% of the reviewed high-confidence fixture set routes to its reviewed owner or deliberate Learn/Search fallback.
- Explanation fixtures do not start a calculator unless the wording explicitly asks to calculate/plan/compare.
- All final journey CTA destinations exist and fragments resolve.
- Result-dependent CTAs agree with the modeled result.
- All 17 guided journeys resolve through existing deterministic engines.
- Search/Ask cross-system consistency test added to the permanent QA pipeline.
- Full historical source and browser QA green before merge.

## Release sequencing

1. Implement shared ownership layer + retirement withdrawal journey.
2. Add Loan/EMI, Inflation, SIP journeys.
3. Expand existing intent wording.
4. Make Work-through action and final CTAs contextual.
5. Add retirement drawdown handoff.
6. Add cross-system click-through QA corpus.
7. Run Publisher -> merge -> QA -> Multi-Repo Guard -> fresh snapshot -> post-development verification.

No new financial formula should be introduced in Wave 2; reuse the existing deterministic engines.

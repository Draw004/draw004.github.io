# Carrowmont Ask Expansion Wave 1 - implementation and handover

**Prepared:** 24 November 2026  
**Historical implementation baseline:** newest all-green snapshot available before this release was `carrowmont-source-snapshot - 2026-11-24T050445.254.zip`. Current code/commit authority must always be taken from `SNAPSHOT-MANIFEST.txt` in the newest all-green snapshot supplied by the owner.  
**Release state:** controlled review release. Do not infer deployment from this document alone. If these changes are present in the newest completed all-green post-merge Source Snapshot, Wave 1 is deployed and the next product phase is Learn Hub 2.0.

## Objective

Make Ask Carrowmont materially more useful without turning it into a generic chatbot or an unbounded financial-advice system. Wave 1 expands the existing guided decision layer from **7 to 13 controlled journeys** by reusing tested deterministic Carrowmont engines, preserving guest-first/privacy-first behavior, and keeping unsupported questions routed to Search/Learn/Tools.

## External benchmark research

This release reviewed current global financial-planning guidance and product patterns before implementation. The research was used to identify durable interaction principles, not to copy another product's wording or design.

Reviewed reference points included:

- MoneyHelper (UK), `Managing your money`: https://www.moneyhelper.org.uk/en/everyday-money/budgeting/beginners-guide-to-managing-your-money
- MoneyHelper, `Get help with financial decisions`: https://www.moneyhelper.org.uk/en/getting-help-and-advice/financial-advisers/guidance-targeted-support-and-advice-explained
- Fidelity, `Financial planning guide: Steps to create a financial plan`: https://www.fidelity.com/learning-center/personal-finance/financial-planning-steps
- Vanguard, `Investment planning for your goals`: https://investor.vanguard.com/investor-resources-education/how-to-invest/investment-planning-for-your-goals
- SEBI Investor, `Financial Goals and Budgeting`: https://investor.sebi.gov.in/moneymatters-budandfinangoal.html
- ASIC Moneysmart (Australia), `Develop an investing plan`: https://moneysmart.gov.au/how-to-invest/develop-an-investing-plan
- Financial Consumer Agency of Canada, `Setting savings and investment goals`: https://www.canada.ca/en/financial-consumer-agency/services/savings-investments/savings-investment-goals.html

### Research-derived design principles

1. **Stability before optimization.** Strong financial-planning flows establish monthly cash flow and resilience before pushing long-term optimization.
2. **Debt and emergency resilience need visible priority.** Expensive debt, required payments and emergency capacity materially affect later goals.
3. **Goals need amount + timeline + assumptions.** Goal planning is more useful when target, time horizon and explicit assumptions are visible instead of hidden.
4. **Guidance is not individualized regulated advice.** Ask must explain modeled trade-offs and route to detailed tools without presenting lender approval, investment recommendations, tax/legal advice or guaranteed outcomes.
5. **Progressive questions reduce overload.** Ask continues to request no more than three missing facts per step rather than displaying a large form.
6. **Use the product's tested engines.** Ask is a deterministic orchestration/explanation layer; it does not invent a second formula set.

These principles fit Carrowmont's existing Protect -> Reduce -> Build -> Grow -> Optimize priority architecture.

## Wave 1 scope

### Existing journeys retained

1. Pay debt or invest?
2. Car affordability
3. Mortgage prepay or invest
4. Emergency fund adequacy
5. Monthly cash-flow shortfall
6. Money priorities
7. Lump-sum priorities

### Six new controlled journeys

#### 8. Borrowing Health

User-facing starter: **Can I take on another payment?**

Engine: `CarrowmontBorrowingHealthCore` / `debt-to-income-borrowing-health`

The journey shows:

- current required debt payments;
- current gross debt-to-income ratio;
- proposed debt-to-income ratio after the new payment;
- simple user-entered income-drop stress ratio;
- current and proposed monthly cash room.

Boundary: this is a planning view, **not lender approval** and not a country-specific lending-rule decision.

#### 9. Home Affordability

User-facing starter: **How much home can I afford?**

Engine: `CarrowmontHomeAffordabilityCore`

The journey uses budget mode and explicitly protects:

- essential spending;
- existing required debt payments;
- user-selected monthly saving/investing;
- user-selected free monthly buffer;
- recurring ownership costs.

It also displays a **+2 percentage-point interest-rate sensitivity** so the user can see how the modeled affordability ceiling changes under a higher-rate scenario. The sensitivity is an illustration, not a rate forecast.

Boundary: result is a planning ceiling, **not lender approval**. One-off buying costs are not automatically invented.

#### 10. Debt Payoff

User-facing starter: **How fast can I pay off this debt?**

Engine: `CarrowmontDebtPayoffCore`

Compares the same debt under:

- required monthly payment only;
- required payment plus the user's extra monthly amount.

Shows modeled payoff months and interest saved where the debt amortizes.

#### 11. Credit Card Payoff

User-facing starter: **How should I pay off this credit card?**

Engine: `CarrowmontCreditCardPayoffCore`

Compares:

- current minimum-payment path;
- user-planned monthly payment;
- optional target payoff time, including the modeled payment needed to reach that target when available.

#### 12. Retirement Readiness

User-facing starter: **Am I on track for retirement?**

Engine: `CarrowmontRetirementCore` in quick mode.

All material assumptions remain explicit:

- current age;
- target retirement age;
- planning age;
- current retirement savings;
- monthly contribution;
- current monthly spending;
- retirement spending percentage;
- inflation assumption;
- pre-retirement return assumption;
- retirement-period return assumption;
- safety buffer.

The result shows modeled required corpus, projected corpus, funding percentage, gap, modeled monthly contribution need and projected depletion age where available. No return or inflation assumption is presented as a forecast.

#### 13. Goal Funding

User-facing starter: **Am I on track for this goal?**

Engine: `CarrowmontGoalCore`

The goal amount is entered in today's money. The journey separates:

- goal amount today;
- inflation-adjusted future goal cost;
- projected savings under the entered contribution/return assumptions;
- funding gap;
- modeled monthly contribution required;
- additional monthly contribution where applicable.

## Start-screen discovery model

The previous flat list is replaced with four compact groups while keeping every starter unique:

1. **Everyday stability** - cash-flow shortfall, emergency runway, borrowing health.
2. **Debt decisions** - debt payoff, credit-card payoff, debt vs invest.
3. **Big goals** - car affordability, home affordability, goal funding, retirement readiness.
4. **Trade-offs** - money priorities, lump-sum priorities, mortgage prepay vs invest.

Desktop uses a two-column group layout; mobile uses one column. There is no duplicate `data-ask-intent` starter, avoiding ambiguous event handling and QA selectors.

## Input-quality guardrails

Wave 1 adds journey-aware validation before a deterministic engine is allowed to run. This prevents a technically parseable but financially meaningless input from being presented as a useful result.

Examples include:

- Borrowing Health requires positive gross and take-home household income.
- Home Affordability requires positive take-home household income.
- Debt Payoff requires a positive debt balance and required payment.
- Credit Card Payoff requires a positive balance, current minimum and planned payment.
- Retirement Readiness requires current age of at least 18, retirement age after current age, plan-through age after retirement, plan-through age no higher than the Retirement Planner's 110-year limit, positive current spending and a positive retirement-spending percentage.
- Goal Funding requires a positive goal amount. Its hint now explicitly asks for the goal cost in today's money and no longer reuses the optional-goal "use 0" copy from Money Priorities.

These are input-validity checks, not financial thresholds or approval rules. They do not introduce lender cutoffs, universal affordability rules or hidden recommendations.

## My Carrowmont boundary

Wave 1 preserves the explicit-save model.

- Saved facts can be reused only when they already have a safe, compatible profile meaning.
- Temporary what-if values remain in the Ask session.
- Scenario-specific values are not silently promoted to durable household facts.
- Safe examples: monthly income, essential spending, aggregate required debt payments, existing retirement savings/contribution, goal amount/timeline/contribution.
- Deliberately not promoted automatically: proposed new borrowing payment, home deposit, home free buffer, home ownership-cost estimate, retirement planning age, retirement lifestyle percentage, a specific credit-card balance, or target payoff months.
- Ask results do not change My Carrowmont until the user explicitly selects **Save this plan to My Carrowmont**.

## What Wave 1 deliberately does not do

- no unrestricted chatbot or generative financial advice;
- no bank/provider connection;
- no real-time rates or lender approval rules;
- no tax/legal recommendations;
- no automatic transactions, payments or investing;
- no hidden currency conversion;
- no public URL or tool-directory count increase;
- no change to core calculator formulas;
- no forced login;
- no auto-save of temporary Ask values;
- no Wave 2 journeys yet (`loan-cost`, `inflation-impact`, `recurring-investment` remain candidates for later review rather than being force-added now).

## Files/components changed

Main site:

- `ask-carrowmont.html`
- `assets/ask/ask-carrowmont.js`
- `assets/ask/ask-carrowmont.css`
- `assets/fre/ask-carrowmont-mvp.js`
- `assets/account/carrowmont-ask-context.js`
- `assets/fre/dashboard-store.js`
- continuity/status/roadmap/standards documents listed in the release manifest

QA:

- existing Ask deterministic/UI/account-aware compatibility contracts;
- Ask public browser suite;
- new Wave 1 release contract;
- central source-contract registration.

## Pre-Publisher verification

The release is not considered deployed until the normal Publisher -> reviewed merge -> deployed QA -> Multi-Repo Guard -> fresh Source Snapshot cycle is complete.

Development verification for the review candidate includes:

- JavaScript syntax checks for modified runtime and QA modules;
- representative deterministic smoke execution of all six new journeys against their real cores;
- full source contract after Wave 1 integration;
- account-context mapping tests;
- start-screen uniqueness/grouping tests;
- backward-compatibility contracts for prior Ask releases;
- browser coverage added for all six new guided journeys; Publisher/deployed browser QA remains the authority for browser execution.

## Release interpretation for a future account

If a future assistant receives an all-green Source Snapshot containing this implementation:

1. verify this implementation is present in the manifest-backed source;
2. rerun current source QA;
3. verify release evidence/green status supplied by the owner;
4. treat **Ask Expansion Wave 1 as complete** when it is present in that newest completed all-green post-merge snapshot;
5. continue with **Learn Hub 2.0**, not Batch 13B or Batch 14.

If this implementation exists only in a Publisher/review bundle and not the newest all-green snapshot, it is **not deployed**.

# Carrowmont Batch 12B-4 - Lump-sum vs Goal Trade-offs

**Review release:** 21 November 2026  
**Baseline snapshot:** `carrowmont-source-snapshot - 2026-11-21T015030.732.zip`  
**Baseline snapshot SHA-256:** `49cc09549c707bcf77d34909118db8544b845718994973cdc53a4cd54be519cc`  
**Baseline Main commit:** `da875604cfa0fb580a55260e93cedf0ea231a71e`  
**Baseline QA commit:** `c97903eb3954ce192b9eda834eb168b1607cec6e`

## Product decision

Batch 12B-4 is implemented as a seventh controlled **Ask Carrowmont** decision journey rather than a new public calculator. The existing Learn guide at `/what-to-do-with-a-lump-sum.html` deep-links into the journey.

This preserves the established public inventory of **23 tool cards and 145 Search URLs** and avoids duplicating the Emergency Fund, Debt Payoff, Goal Planner or Compound Interest engines.

## User question

The journey answers: **If I have a one-off lump sum, what changes if I use the same money for emergency savings, one debt, a defined goal or long-term investing, and what would a transparent priority split look like?**

The user can enter:

- lump-sum amount;
- essential monthly expenses, current emergency savings and emergency target months;
- optional focused debt balance, APR and monthly payment;
- optional goal target, current savings, years away and monthly contribution;
- user-entered long-term return assumption;
- user-entered investment horizon.

Debt-detail questions are skipped when no debt balance is entered. Goal-detail questions are skipped when no goal target is entered.

## Deterministic comparison method

Carrowmont reasons about the decision while existing tested engines perform the calculations:

1. **Emergency savings alternative:** routes the same lump sum through the Emergency Fund logic and shows the change in reserve coverage.
2. **Debt alternative:** applies the lump sum to the entered focused debt and uses the Debt Payoff engine to model remaining balance, payoff timing and interest where the debt is amortizing.
3. **Goal alternative:** applies the lump sum through Goal Planner logic and shows the resulting goal funding position.
4. **Investing alternative:** uses the Compound Interest engine with the user's own return assumption and investment horizon; it is an illustration, not a forecast or guarantee.
5. **Modeled priority split:** closes the emergency target gap first; then allocates to the focused debt only when its entered APR is above the entered long-term return assumption; then addresses the underfunded goal using Goal Planner's deterministic lump-sum requirement; any remainder is shown as long-term investing.

The split is an explainable modeled ordering, not an instruction to follow it. The user sees the alternatives side by side rather than receiving a hidden recommendation.

## Privacy and saved-profile boundary

The one-off lump-sum amount is scenario data and is **not automatically persisted to My Carrowmont**. The Ask account context and explicit-save mapping may reuse/save only compatible planning facts such as emergency target, emergency savings, long-term return assumption and goal fields.

Focused debt scenario fields are not silently reused as a saved debt because an aggregate saved debt balance/highest APR is not necessarily one coherent individual debt. The entered investment horizon is also kept as journey-specific scenario data.

Guest-first behavior and explicit save/update controls remain unchanged.

## Safety and product boundaries

The journey does not:

- fetch or invent live investment returns, lender rates or product offers;
- claim an investment return is guaranteed;
- treat modeled debt-interest savings and uncertain investment growth as equivalent certainty;
- infer taxes, penalties, fees, employer benefits or local product rules not entered by the user;
- automatically move money or recommend a provider;
- silently save the one-off windfall amount.

If debt payment data cannot support a valid amortization, the journey does not fabricate payoff-time or interest-saved claims.

## Discovery and content integration

- Ask Carrowmont exposes a starter: **How should I use a lump sum?**
- Ordinary-language questions about a windfall, bonus or lump sum can route into the controlled journey.
- The existing lump-sum Learn guide links directly to `/ask-carrowmont.html?decision=lump-sum-goal-tradeoffs`.
- A generic query about **lump sum vs monthly investing** is deliberately not hijacked by this broader priority journey.
- No new public URL or sitemap entry is introduced.

## QA contract

Batch 12B-4 QA protects:

- deterministic reuse of Emergency Fund, Debt Payoff, Goal Planner and Compound Interest engines;
- all-in emergency/debt/goal/investing alternatives plus the transparent priority split;
- conditional debt/goal questions;
- debt APR versus assumed return decision boundary;
- no network/storage calls from the comparison engine;
- no silent persistence/reuse of the one-off lump sum or focused debt scenario;
- seventh Ask journey compatibility while preserving the existing six journeys and Money Priorities position;
- Learn deep-link and date reconciliation;
- 23-tool / 145-URL inventory preservation;
- browser coverage for desktop and mobile journey behavior.

## Release acceptance

Do not call Batch 12B-4 deployed until all of the following are true:

1. deterministic source/standards checks are green;
2. Publisher creates exactly Main and QA PRs;
3. human review approves both PRs and they are merged in the normal sequence;
4. deployed Chrome Desktop, Edge Desktop and Mobile Chromium QA are green;
5. Multi-Repo Guard is green;
6. a fresh all-green Source Snapshot is generated and becomes the new baseline.

No `.github/workflows/` file is changed by this release, so temporary PAT **Workflows: Read and write** permission is not required.

# FRE Batch 8B — Selective Save and Update to My Carrowmont

## Purpose
Batch 8B turns the Batch 8A account-continuity foundation into a useful planning workflow. Guests continue to receive complete results. Meaningful planning journeys can be explicitly kept in My Carrowmont so they can be reopened, updated and used as account-backed planning context.

## Owner-approved rules
1. **Ask for account continuity only when there is something meaningful to keep.** Do not turn every calculation into a sign-in prompt.
2. **Calculating is exploration; saving is commitment.** A logged-in user may change assumptions freely without changing the saved My Carrowmont plan.
3. **Existing saved plan:** after a meaningful recalculation, offer `Update My Carrowmont with these changes` or `Keep existing plan`.
4. **No existing saved plan:** offer `Save this plan to My Carrowmont` or `Not now`.
5. The dashboard/account changes only after the user explicitly chooses Save/Update.

## Supported 8B My Carrowmont journeys
### Account-backed planning set
- Budget & Cash Flow
- Emergency Fund & Financial Runway
- Debt Payoff
- Credit Card Payoff
- Loan / EMI
- Mortgage / Home Loan Payoff
- Retirement Planner
- Goal Planner
- Financial Independence
- SIP / Recurring Investment
- Retirement Withdrawal / Drawdown / SWP

### Saved decision scenario
- Car Affordability

## Prompt behavior
- No save card appears merely because a tool page loads.
- The save card appears only after meaningful user-entered or explicitly handed-off planning data produces a usable result.
- Signed-out/new-plan action: `Save this plan to My Carrowmont` / `Not now`.
- Signed-in/existing-plan action: `Update My Carrowmont with these changes` / `Keep existing plan`.
- `Keep existing plan` does not stage or save the experimental calculation; the previously saved account plan remains authoritative.
- Authentication messages contain no financial payload.
- A saved plan is stored as an account scenario snapshot and can be reopened from My Carrowmont.
- Saving the same journey again updates the existing saved scenario instead of silently creating a second active copy for that journey.
- Compatible current-state facts may update the one-glance profile only after explicit Save/Update.
- Hypothetical purchase/borrowing scenarios are not silently reclassified as existing debts.

## My Carrowmont value copy
> Keep your financial plans connected.
>
> Save your retirement, goals, debt, loans and other financial plans, return to them later, update them as life changes, access them across devices and see deeper insights — without starting over each time.
>
> Only the plans you choose to keep become part of My Carrowmont.

## Explicit exclusions
- No automatic saving merely because the user is logged in.
- No save wall before a calculator result.
- No generic prompt on quick utility calculations such as Inflation or Compound Interest in this batch.
- No Premium monitoring, balance-transfer alerts or connected financial accounts.
- Guest Budget month comparisons are session-only; persistent history/progress belongs to My Carrowmont/Batch 8C.
- No progress/off-course engine yet; that remains Batch 8C.
- No calculator-formula changes.

## V3 browser-QA closeout
- Main-site smoke QA now expects the approved `Keep your financial plans connected.` hero.
- Budget browser QA validates session-only month keeping rather than legacy persistent local saving.
- The approved trust sentence appears once in the hero; the lower account note retains only the data-use statement.
- Retirement save/update QA enters a complete meaningful plan independent of country-default monetary examples before asserting the save card.
- These are compatibility/QA closeout changes only; the explicit Save/Update contract and calculator formulas are unchanged.

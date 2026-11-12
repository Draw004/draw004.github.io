# FRE Batch 8C — Plans & Progress Tracking

## Purpose
Batch 8C completes the original Batch 8 progress objective by turning explicitly saved My Carrowmont plans into a simple progress view. The user should be able to see what changed, whether a saved plan is moving in a useful direction, and what they can review next without financial jargon or automatic account monitoring.

## Owner-approved language rule
User-facing progress must be explicit and self-understood. Use plain phrases such as `Improving`, `On track`, `Needs attention`, `Ready to track`, `What changed`, and `What you can do next`. Technical comparison logic stays behind the scenes.

## Core rules
1. **Only saved versions count.** Progress compares plan versions the user explicitly chose to save/update in My Carrowmont.
2. **Unsaved experiments do not change progress.** A calculation remains a working draft until the user chooses `Update My Carrowmont with these changes`.
3. **No live-account inference.** Progress is not based on bank feeds, card feeds, transaction monitoring or background account access.
4. **No new financial formulas.** Batch 8C compares outputs already calculated by the authoritative Carrowmont tools.
5. **First save becomes the starting point.** Until a second version is explicitly saved, My Carrowmont says the plan is `Ready to track` rather than inventing progress.
6. **Limited recent history.** A saved scenario keeps a compact recent history of prior explicitly saved versions inside the existing scenario record; no new database table is required.
7. **Simple corrective next step.** When a saved plan needs review, My Carrowmont suggests opening the relevant existing planner and testing a clear option. It never silently changes the plan.

## Progress coverage
The progress layer can compare the eleven account-backed Batch 8B planning journeys:
- Budget & Cash Flow
- Emergency Fund & Financial Runway
- Debt Payoff
- Credit Card Payoff
- Loan / EMI
- Mortgage / Home Loan Payoff
- Retirement
- Goals
- Financial Independence
- SIP / Recurring Investment
- Retirement Withdrawal / Drawdown

Car Affordability remains a saved decision scenario and is intentionally excluded from the core progress feed because it does not necessarily represent an ongoing financial position.

## Plain-language examples
- `Emergency runway increased by 0.8 months.`
- `Saved debt balance is lower by $4,200.`
- `Modeled payoff is 6 months sooner.`
- `Funding improved by 5 percentage points.`
- `Your saved budget is short by $180 per month.`

Every comparison is explicitly against the previous version the user chose to save.

## Data model
- Continue using `carrowmont_saved_scenarios`.
- On explicit update of an existing journey, preserve a compact snapshot of the previous saved version inside `scenario.progressHistory`.
- Keep only a limited recent history (maximum 12 prior saved versions per journey in this implementation).
- History is exported/deleted with the saved scenario because it lives inside the same owner-protected row.
- No new Supabase table, RLS policy, bank connection or secret is introduced.

## User experience
Authenticated My Carrowmont adds a `Your progress` section before the saved-plan library.

For each supported saved plan it shows:
- a simple status;
- one clear sentence explaining what changed;
- short context using the latest saved values;
- `What you can do next` when review is useful;
- `Open plan` to return to the originating planner.

## Explicit exclusions
- No Premium monitoring or alerts.
- No background rate monitoring.
- No automatic plan updates.
- No transaction tracking.
- No bank/account connections.
- No new public URL.
- No calculator-formula changes.

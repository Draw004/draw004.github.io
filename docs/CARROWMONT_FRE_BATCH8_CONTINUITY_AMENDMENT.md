# Carrowmont FRE — Batch 8 Continuity Amendment

The original roadmap remains authoritative except for one owner-approved product-model change: the Batch 6 `My Carrowmont Dashboard — Guest/Local First` persistence assumption is superseded.

## Revised sequence
Financial Resolution Engine → Money Priorities → useful guest experience → optional account-backed My Carrowmont → selective saved plans → plans/progress tracking → wider intelligence.

## Revised My Carrowmont rule
- Guest access remains unrestricted for calculators and basic financial help.
- My Carrowmont is the optional persistent/account-backed layer.
- The dashboard does not populate for signed-out guests.
- Persistence and cross-device continuity are the reason to use My Carrowmont.
- Only plans the user explicitly chooses to keep become part of My Carrowmont.

## Batch 8 subdivision
- **8A — COMPLETE:** Account Continuity Foundation + homepage My Carrowmont/newsletter placement.
- **8B — COMPLETE:** Selective Save/Update to My Carrowmont across the account-backed planning set, saved scenario reopening, logged-in experiment-vs-commit protection, compact benefit-led hero, and removal of stale guest-persistence messaging where it conflicts with the account-backed model.
- **8C — THIS RELEASE:** Persistent Plans & Progress Tracking using explicitly saved plan versions, plain-language needs-attention detection and simple corrective next steps. No live account monitoring or automatic plan changes.

## Batch 8B continuity rules
- Account-backed planning journeys: Budget & Cash Flow; Emergency Fund & Runway; Debt Payoff; Credit Card Payoff; Loan/EMI; Mortgage/Home Loan; Retirement; Goals; Financial Independence; SIP/Recurring Investment; Retirement Withdrawal/Drawdown.
- Car Affordability remains a saved decision scenario rather than an automatic current-debt fact.
- A save/update prompt appears only after meaningful planning input/result; page load alone never triggers it.
- Logged-in calculation changes are a working draft. They do not replace the saved account plan automatically.
- Existing saved journey: `Update My Carrowmont with these changes` or `Keep existing plan`.
- New saved journey: `Save this plan to My Carrowmont` or `Not now`.
- The same journey updates its existing account scenario rather than silently creating a second active copy.
- Quick utility calculations are not given a generic account prompt in 8B.
- Authentication messages carry no financial payload.
- Saved scenarios can be reopened without re-entering the same assumptions.
- Budget guest month comparisons remain browser-session only; long-term history/progress belongs to the account-backed 8C model.

Batch 9 Trust Contract, Batch 10 Country-Aware Intelligence, Batch 11 Homepage & Product Transformation, Batch 12 Wider Resolution Library and Batch 13 Connected Financial Data remain sequenced later as originally planned.

## Batch 8C continuity rules
- Progress compares only plan versions the user explicitly chose to save/update.
- A first saved version is a starting point and shows `Ready to track`; no trend is invented.
- Unsaved calculations and `Keep existing plan` choices never enter progress history.
- Each existing journey keeps a bounded recent history inside its owner-protected saved-scenario row; no new database table is introduced.
- User-facing progress stays plain: `On track`, `Improving`, `Needs attention`, `Needs review`, `Steady`, or `Ready to track`.
- Needs-attention cards point back to the existing deterministic planner for a corrective scenario; My Carrowmont never changes a plan automatically.
- Car Affordability stays a saved decision scenario and is excluded from the ongoing progress feed.
- Batch 8 is now complete at the foundation level: account continuity (8A), selective save/update (8B), and saved-plan progress tracking (8C).


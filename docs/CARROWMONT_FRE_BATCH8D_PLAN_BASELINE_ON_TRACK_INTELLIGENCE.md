# Carrowmont FRE Batch 8D — Plan Baseline & On-Track Intelligence

## Purpose
Batch 8C could show whether a saved value improved or worsened. Batch 8D adds the more useful question: **Is the saved plan itself on track?**

## User model
My Carrowmont now explains four separate ideas in plain language:

1. **Current details** — the latest account values the user chose to save.
2. **Saved plan** — the target or path the user chose to keep.
3. **What-if calculation** — an experiment that remains separate until the user explicitly updates My Carrowmont.
4. **Progress history** — previous saved versions used to show what changed.

## What changes
- A saved plan keeps a small plan metadata record: plan start, last reviewed date, review cadence, baseline snapshot and a target when the plan has one.
- My Carrowmont shows a primary target status such as `On track`, `Ahead`, `Needs attention`, `Needs review` or `Ready to track`.
- The older 8C trend remains visible separately as `Since last save`, so a plan can be improving while still needing attention.
- `Last reviewed` is shown so Carrowmont never implies that old saved information is current.
- Corrective scenarios use deterministic values already calculated by the underlying tools where available.

## Supported target logic
- Budget & Cash Flow: monthly room at or above break-even.
- Emergency Fund & Runway: saved runway-month target.
- Debt / Credit Card / Loan: saved payoff date derived from the starting plan.
- Mortgage / Home Loan: saved modeled payoff date.
- Retirement / Goal: 100% modeled funding target.
- Financial Independence: saved target age versus modeled FI age.
- SIP / Recurring Investment: saved target amount where one exists.
- Retirement Withdrawal: saved withdrawal horizon where one exists.

## Corrective scenarios
Examples include:
- the monthly budget amount needed to remove a shortfall;
- the emergency-savings amount needed to reach the saved runway target;
- the additional retirement, goal, FI or recurring-investment contribution already calculated by the deterministic planner;
- the number of months a debt/home-loan payoff estimate is later than the saved target;
- the number of months a retirement-withdrawal plan is short of its saved horizon.

These are illustrations based on saved assumptions. Carrowmont never applies a correction automatically. The user opens the underlying planner, reviews the scenario and explicitly chooses whether to update My Carrowmont.

## Architecture boundaries
- No new database table.
- No bank/account connection.
- No live transaction monitoring.
- No new financial formula replaces existing deterministic calculator engines.
- Existing calculator formulas, reports, localization and public URLs remain authoritative.
- Car Affordability remains a saved decision scenario outside ongoing plan-progress intelligence.

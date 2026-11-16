# Carrowmont Financial Resolution Engine — Batch 9B
## Your Financial Plan View & Report

Status: Completed / All green.

## Purpose
Batch 9B turns the signed-in My Carrowmont experience into one coherent financial-plan view instead of requiring the user to interpret separate saved cards on their own. The new view summarizes only information the user explicitly chose to keep and reuses the target-based progress, freshness, Trust Contract and deterministic planning rules already established in Batches 5, 8D and 9.

## Product contract
The consolidated plan must answer four simple questions without creating a second recommendation engine:

1. Where do I stand across the major planning areas?
2. Which saved plans are on track, ahead, stale or need attention?
3. What are the next moves supported by my saved data?
4. Which assumptions and saved sources are behind the summary?

The detailed My Carrowmont dashboard remains available underneath for editing, saved-plan reopening and drill-down.

## Your Financial Plan view
The top of the signed-in dashboard now includes one `Your Financial Plan` section covering:

- Cash flow
- Emergency savings
- Debt and home / loans
- Retirement
- Financial independence
- Goals and investing

Each area shows a plain-language status, conclusion, supporting detail, a route back to the relevant planner, and a collapsed `Where this came from` source trace.

The plan view does not label an area `On track` merely because some values exist. When compatible details are saved but no target-based plan exists, the area is shown as `Ready to track` until the user saves a suitable target plan.

## Status reconciliation
Batch 9B does not invent new plan status logic. Saved-plan status is supplied by `CarrowmontProgress.evaluateAll`, the same target/freshness engine already used by My Carrowmont progress cards.

Cash-flow and emergency-savings summaries reuse the tested Budget & Cash Flow and Emergency Fund deterministic cores against the saved profile values. No formula is duplicated in the 9B view.

## Your next three moves
The plan view shows up to three moves supported by saved information.

Priority order:

1. Corrective actions already produced by target-based saved-plan progress.
2. The existing deterministic Carrowmont Money Priorities framework when the required saved household facts exist.
3. Maintenance/review actions for saved plans that are currently on track.

Carrowmont does not manufacture a third action merely to fill the list. If saved information does not support three clear moves, fewer are shown.

## Important assumptions
The view identifies important forecast-style assumptions already stored in the saved profile or saved-plan inputs, such as return, inflation, withdrawal-rate, APR/rate and contribution step-up assumptions. They are labelled as assumptions, not predictions or guarantees.

## Generate My Carrowmont Plan Report
The new report button generates a standardized PDF from the exact same in-memory plan model used for the screen.

The report contains:

- Overall plan summary and six planning areas
- Next moves and important assumptions
- Saved-source trace and the explicit planning/privacy boundary

The PDF is a planning summary. It is not a bank feed, transaction ledger, tax statement or individualized financial advice.

## Save and privacy boundary
Nothing in Batch 9B changes what is stored. The consolidated view reads:

- the account-backed saved profile; and
- the saved plan/scenario rows the user explicitly chose to keep.

Unsaved calculator what-if results remain outside My Carrowmont until the user explicitly saves or updates a plan.

## Architecture impact
Batch 9B adds a shared consolidated-plan model and report renderer to the main Carrowmont repository. It does not change calculator formulas, Supabase schema, account ownership, OAuth configuration, localization engines or public URLs.

## Exit gate
Batch 9B was eligible for closeout only when:

- the screen and PDF reconcile with the same saved-plan model;
- every area summary can be traced to saved profile facts and/or saved plans;
- target-based statuses continue to come from the existing progress engine;
- next moves use existing deterministic progress/Money Priorities logic;
- unsaved what-if calculations remain excluded; and
- desktop/mobile QA, Publisher validation, Multi-Repo Guard and the new authoritative snapshot are all green.

## Release closeout
Batch 9B passed the full Carrowmont release sequence and is formally closed.

- Batch PR Publisher: PASS
- Automated QA: PASS
- Multi-Repo Guard: PASS
- Authoritative Source Snapshot: `carrowmont-source-snapshot - 2026-11-16T233235.312.zip`
- Snapshot SHA-256: `38891f3dc4251fc236d394dce49d8cbae7bf39e3bad3a77264f573a6ed7f0735`

The 2026-11-12 U.S. Debt reference update was merged and the full QA / Multi-Repo Guard / snapshot sequence was rerun successfully before this closeout snapshot was created. No Batch 9B product logic, formulas, account behavior or storage model changed during closeout.


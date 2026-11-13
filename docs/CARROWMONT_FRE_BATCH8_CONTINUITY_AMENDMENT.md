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
- **8C — COMPLETE:** Persistent Plans & Progress Tracking using explicitly saved plan versions, plain-language change detection and simple next steps. No live account monitoring or automatic plan changes.
- **8D — COMPLETE:** Plan Baseline & On-Track Intelligence. Separates current details, saved target, what-if calculations and progress history; adds plan freshness, target-based status and quantified corrective scenarios where existing deterministic planner outputs support them.
- **8E — COMPLETE:** Product Story & Mobile-First Foundation, including the connected Plan / Keep / Track / Understand journey, one My Carrowmont homepage showcase, PWA foundation and the canonical shared-header lock.
- **8F — THIS RELEASE:** UX Simplification, Routing & Performance Cleanup. Removes remaining public clutter, makes Ask the traffic controller across guided decisions/content/Search, improves Search result reveal, reframes Research as a global-ready library, layers Privacy detail and optimizes the approved hero image delivery.

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

After 8F stabilizes the public experience, the revised roadmap continues with Batch 9 Trust/Plan Transparency, Your Financial Plan, Country-Aware Intelligence, account-aware Ask Carrowmont, the later homepage transformation, the wider Opportunity Engine, optional connected data, and a native-app decision gate.

## Batch 8C continuity rules
- Progress compares only plan versions the user explicitly chose to save/update.
- A first saved version is a starting point and shows `Ready to track`; no trend is invented.
- Unsaved calculations and `Keep existing plan` choices never enter progress history.
- Each existing journey keeps a bounded recent history inside its owner-protected saved-scenario row; no new database table is introduced.
- User-facing progress stays plain: `On track`, `Improving`, `Needs attention`, `Needs review`, `Steady`, or `Ready to track`.
- Needs-attention cards point back to the existing deterministic planner for a corrective scenario; My Carrowmont never changes a plan automatically.
- Car Affordability stays a saved decision scenario and is excluded from the ongoing progress feed.
- Batch 8C completed the saved-version comparison foundation. Batch 8D now adds the missing distinction between change over time and whether the saved plan itself is on track.



## Batch 8D continuity rules
- `Current details` are the latest account values the user chose to save.
- `Saved plan` is the target/path the user chose to keep.
- `What-if calculation` stays separate until the user explicitly updates My Carrowmont.
- `Progress history` contains only prior versions the user explicitly saved.
- A plan can be improving and still need attention; trend and target status are separate.
- My Carrowmont shows when a plan was last reviewed and uses a simple review cadence so old information is not presented as current.
- Target status is based on saved deterministic planner outputs: funding target, runway target, payoff target, FI target age, investment target or withdrawal horizon where supported.
- Corrective text uses values already produced by deterministic Carrowmont engines where available (for example a contribution gap or emergency-fund gap). It never changes the plan automatically.
- For payoff plans where a precise new payment is not already saved, Carrowmont quantifies how far the current payoff estimate is from the saved target and sends the user back to the existing planner to test the payment change.
- No bank connection, transaction monitoring, background financial inference or new financial formula is introduced in 8D.
- Car Affordability remains a saved decision scenario outside the ongoing progress/on-track feed.


## Batch 8E — Product Story & Mobile-First Foundation
- Carrowmont is presented publicly as a planning system powered by calculators, not only as a calculator directory.
- Homepage story is a single connected Plan / Keep / Track / Understand journey; numbered feature cards are not used.
- My Carrowmont has phone-first quick access and an installable web-app foundation.
- The illustrative See Carrowmont in action section is the single homepage My Carrowmont showcase; the duplicate promotional card is removed.
- Carrowmont Money in Real Life is a separate newsletter section after the product preview and before decision-support tools.
- The duplicate four-benefit trust ribbon is removed; the lower Why Carrowmont area is limited to three distinct principles.
- Shared-header rule is locked: the Country/Currency control must reuse the canonical globe SVG + country + middle dot + currency + SVG chevron implementation; page-specific legacy glyph versions are not allowed.
- Installation is an access convenience only; it does not change account storage or introduce offline financial-data caching.
- The later Batch 11 Ask-first homepage transformation remains deferred until Ask Carrowmont is account-aware and dependable.

## Batch 8F — UX Simplification, Routing & Performance Cleanup
- Public product copy follows the rule: say each important idea once, in its strongest location. The redundant homepage `Explore freely` strip is removed while the connected Plan / Keep / Track / Understand journey remains.
- Mobile primary navigation keeps the established label `My Money`; shared Country/Currency remains the locked canonical component from Batch 8E.
- Ask Carrowmont is the traffic controller: supported decisions keep their deterministic guided journeys; other questions surface the best matching Learn, Tool or Research pages and can continue into full Search.
- Ask-to-Search query handoff is private and temporary: the question is passed in same-tab session storage, is consumed once, expires quickly, is not put in the URL and is not stored as search history.
- Search remains the fast direct-retrieval utility. Explicit Search submission shows `Results for ...` and moves the results into view; live typing does not force the viewport to jump.
- Research is framed as a multi-market library without relabelling evidence. Current U.S. studies remain explicitly scoped to the United States.
- Privacy keeps all substantive account/search disclosures but presents common points in short summaries with technical My Carrowmont processing behind an expandable detail control.
- The approved couple hero remains visually unchanged; responsive WebP assets are lighter and load with responsive preload plus eager/high-priority fetching.
- No calculator formula, deterministic engine, saved-plan calculation, Supabase schema, bank connection, native-app behavior or public URL changes in 8F.
- No manual indexing action is required for 8F.


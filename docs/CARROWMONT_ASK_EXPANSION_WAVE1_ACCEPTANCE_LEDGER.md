# Carrowmont Ask Expansion Wave 1 - acceptance ledger

**Prepared:** 24 November 2026  
**State:** pre-Publisher review ledger. Final deployed acceptance requires the standard post-merge green cycle and newest all-green Source Snapshot.

| Area | Acceptance requirement | Pre-Publisher evidence |
|---|---|---|
| Scope | Existing 7 journeys remain and total controlled journeys becomes 13 | Source contract + unique-starter checks |
| Architecture | New journeys reuse existing deterministic engines | Engine trace/source contract |
| Borrowing | Current/proposed/stressed debt load shown; no lender approval claim | Core fixture + copy contract |
| Home | Budget-first affordability preserves savings/buffer and shows higher-rate sensitivity | Core fixture + result contract |
| Debt payoff | Required vs extra-payment payoff comparison uses Debt Payoff core | Core fixture |
| Credit card | Minimum/planned/optional target path uses Credit Card Payoff core | Core fixture |
| Retirement | Quick-mode retirement projection uses explicit lifestyle/inflation/return/buffer inputs | Core fixture |
| Goal funding | Today's goal, future cost, projected savings and gap remain distinct | Core fixture |
| Progressive UX | Maximum 3 missing facts per step remains enforced | Existing + Wave 1 contracts |
| Input guardrails | Required positive values and retirement age relationships are rejected before engine execution; Goal Funding does not reuse optional-goal zero guidance | UI/source/browser contracts |
| Discovery | 13 unique starters are grouped into 4 user-oriented decision sections | UI/source/browser contract |
| Mobile | Decision groups collapse to one column; no horizontal-layout dependency introduced | CSS + Publisher browser QA required |
| Privacy | Ask engine remains network/storage-free; account reuse stays read-only | Source/privacy contracts |
| Saving | Only explicit Save may stage safe reusable facts into My Carrowmont | Store/context contract |
| Account context | Only semantically compatible saved facts are reused | Account-aware unit/source contract |
| Locale | Existing country/currency layer remains authoritative; no silent FX | Existing locale/account contracts |
| Advice boundary | Guidance remains educational/illustrative, with no lender approval or guaranteed-return claims | Result copy + disclaimer |
| Search fallback | Unsupported questions still route to Search/Learn/Tools | Existing fallback contracts |
| Tool handoff | Each new journey links to its matching detailed Carrowmont tool | UI contract |
| SEO/public inventory | No new public URL or tool count | Existing inventory contracts |
| Backward compatibility | Historical Ask release contracts accept newer controlled journeys/cache keys without weakening old behavior | Source contract |
| Continuity | Implementation, rationale, research references, QA, limitations and next phase recorded in repository | This ledger + implementation doc + status docs |
| Browser execution | New journeys are covered in Playwright suite | Added tests; Publisher/deployed run must be green |
| Release close | Publisher -> merge -> QA -> Guard -> Source Snapshot | Pending owner release cycle |

## Final-close rule

Do not label Wave 1 deployed merely because this ledger exists or source QA passes. Deployment is accepted only when the owner reports the normal release sequence green and supplies a fresh all-green Source Snapshot containing these changes. At that point the next product phase is **Learn Hub 2.0**.

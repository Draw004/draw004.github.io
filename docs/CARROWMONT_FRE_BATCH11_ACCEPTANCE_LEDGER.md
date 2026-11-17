# FRE Batch 11 — Requirements & Acceptance Ledger

Status: Stable acceptance contract. Release completion is proven by the all-green gates and authoritative Source Snapshot; this ledger does not require a post-release wording update.

| Requirement | Implementation outcome / acceptance rule |
|---|---|
| Homepage shifts from calculator-first to problem-first | Hero contains the primary real-life money-question entry and Ask call to action. |
| Product promise appears before feature directory | Connected product story and illustrative My Carrowmont outcome appear before the desktop core-tool grid. |
| Free-text homepage question reaches Ask | Same-tab `sessionStorage` handoff is created and consumed by Ask. |
| Question is not exposed in URL | Free text is never appended as a query parameter; Ask landing URL remains `/ask-carrowmont.html`. |
| Handoff is temporary | Payload has a 15-minute maximum age and is removed immediately on read. |
| Browser storage failure does not expose question | Homepage shows an explanatory status and leaves the visitor in place rather than falling back to a URL query. |
| Existing Ask engine remains authoritative | Handoff feeds the existing classifier / controlled Ask journeys; no new engine is introduced. |
| Six established guided decisions remain visible | Debt vs invest, car affordability, mortgage prepay vs invest, emergency runway, cash-flow shortfall and money priorities remain available. |
| Direct-calculator path remains obvious | Homepage displays **Prefer to calculate yourself? Explore Tools**. |
| Nine core homepage tools remain crawler-visible | Existing nine `data-tool-id` cards remain in HTML and locale ordering remains intact. |
| Mobile compact tool launcher remains | Existing mobile quick-tool behavior remains authoritative. |
| My Carrowmont remains optional | Homepage states no account is required; account reuse occurs only later inside Ask under Batch 10B. |
| Saved-plan ownership remains explicit | Homepage/Ask handoff performs no account write; Save / Update remains explicit. |
| Country localization remains intact | Existing country/currency selector, terminology and India discovery behavior remain unchanged. |
| Hero image performance remains intact | Existing responsive preloads/eager hero images remain unchanged; no new homepage network asset is added. |
| SEO/public URLs remain intact | Homepage canonical, sitemap, search inventory and individual tool/Learn/Research URLs remain unchanged. |
| Newsletter / authority / Learn / social content remains available | Existing downstream homepage sections remain present. |
| Mobile navigation remains Home / My Money / Ask / Tools / More | Existing mobile shared runtime remains unchanged. |
| Accessibility | Form has an explicit label, live status message, keyboard-accessible controls and visible focus behavior. |
| Browser QA | Must cover free-text handoff, no-query privacy, guided decisions, hierarchy, mobile geometry and retained tool discovery. |
| Source contract | Must remain all-green with explicit Batch 11 checks plus all historical regressions. |
| Publisher / Automated QA / Multi-Repo Guard / Source Snapshot | These are mandatory release evidence; the master roadmap records the final authoritative snapshot after success. |

## 14-dimension Change-Impact Matrix

| Dimension | Batch 11 impact |
|---|---|
| Formulas / engines | None. Existing deterministic Ask and calculator engines remain authoritative. |
| Inputs | Adds one optional homepage free-text question that is handed to existing Ask. |
| Outputs | No financial output structure changes; public homepage presentation changes. |
| Shared state | Adds one short-lived same-tab session handoff key consumed once by Ask. |
| Account / persistence | No account write; Batch 10B read-only account context still begins only inside Ask. |
| Privacy / consent | Free text stays out of URL and local storage; same-session handoff is removed on read. |
| Localization | Existing country/currency behavior and localized tool ordering/terminology remain authoritative. |
| Reports / PDF | None. |
| Desktop / responsive UI | Major homepage hierarchy/hero change; direct tools and existing sections remain available. |
| Accessibility | Labelled textarea, live validation status, keyboard actions, focus styles and touch-friendly suggestions. |
| Performance | No new homepage network asset; existing hero assets and shared runtime remain. |
| SEO / URLs | No new/removal URL, canonical, sitemap or search inventory change; crawler-visible tool links remain. |
| QA / regression | Adds Batch 11 browser/source checks and updates older homepage contracts only where the intentional product hierarchy evolved. |
| Architecture / rollback | Small homepage presentation + one-time handoff; Ask router, calculators, account model, country intelligence and save contracts are unchanged. |

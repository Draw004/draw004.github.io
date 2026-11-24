# Carrowmont Learn Hub 2.0 - implementation and handover

**Prepared:** 24 November 2026  
**Historical implementation baseline:** newest owner-supplied all-green snapshot before this release was `carrowmont-source-snapshot - 2026-11-24T180325.448.zip`, with `draw004.github.io` at `5df96278e1396e6b7eb59973848ab22158d65261` and `carrowmont-qa` at `0b2de3eadbd7860a10443e13151c37783ed0b39e`. Current code/commit authority must always come from `SNAPSHOT-MANIFEST.txt` inside the newest completed all-green snapshot supplied by the owner.  
**Release state:** controlled review release. Do not infer deployment from this document alone. If these changes are present in the newest completed all-green post-merge Source Snapshot, Learn Hub 2.0 is deployed and the next product phase is **Evergreen Learn Expansion**.

## Objective

Develop Learn to the same product-maturity level as Search without making Learn a duplicate Search page.

Carrowmont Search answers: **“I know roughly what I want - find it.”**

Learn Hub 2.0 answers: **“I want to understand something - help me find the right place to start and what to learn next.”**

The release therefore turns the existing long static Learn directory into a guided educational-discovery experience while preserving the entire static guide library in the source HTML for SEO, no-JavaScript fallback, localization and durable internal linking.

## External benchmark research

Current global financial-education and planning experiences were reviewed before implementation. The research was used to identify durable interaction patterns **without copying another product’s design, wording or proprietary content**.

Reviewed reference points included:

- MoneyHelper (UK), `Managing your money`: https://www.moneyhelper.org.uk/en/everyday-money/budgeting/beginners-guide-to-managing-your-money
- ASIC Moneysmart (Australia), `Develop an investing plan`: https://moneysmart.gov.au/how-to-invest/develop-an-investing-plan
- U.S. Consumer Financial Protection Bureau, `Consumer resources`: https://www.consumerfinance.gov/consumer-tools/
- U.S. Consumer Financial Protection Bureau, `Your Money, Your Goals toolkit`: https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/toolkit/
- Fidelity, `Learn`: https://www.fidelity.com/learning-center/overview
- Fidelity, `Life events`: https://www.fidelity.com/learning-center/life-events/life-events-directory
- Vanguard, `Investment education, resources & guidance`: https://investor.vanguard.com/investor-resources-education
- Vanguard, `Understanding investment goals and goals-based investing`: https://investor.vanguard.com/investor-resources-education/investing-goals
- NerdWallet, `Personal Finance`: https://www.nerdwallet.com/finance

### Research-derived design principles

1. **Offer more than one way into the library.** Strong education hubs let people browse by topic, goal, life situation or question instead of forcing them to know the correct financial term first.
2. **Use situation-first entry points for users who do not know the category name.** Fidelity’s life-event model and CFPB decision guides reinforce the value of starting from the user’s problem rather than the site taxonomy.
3. **Keep a clear planning sequence without pretending it is personalized advice.** MoneyHelper and Moneysmart both emphasize understanding cash flow, debt/resilience and goals before more complex investing decisions. Carrowmont uses this only as educational orientation, not as an individualized mandatory order.
4. **Connect learning to action.** CFPB, Moneysmart and Vanguard frequently link education to worksheets, calculators or goal-setting steps. Carrowmont therefore exposes the existing related tool when a user chooses a topic.
5. **Let people narrow content by the kind of help they need.** Learn Hub 2.0 exposes `Start here`, `Explain`, `Compare` and `Plan & decide`, reusing Carrowmont’s existing semantic-intent metadata rather than adding a second editorial taxonomy.
6. **Keep Search and Learn distinct.** The dedicated Learn search only ranks Learn-library guides. Tools and Research remain available through the full Carrowmont Search.
7. **Do not claim popularity without evidence.** The old `POPULAR PLANNING QUESTIONS` label is replaced with `COMMON PLANNING QUESTIONS` / editorial starting-point language because Carrowmont does not yet use traffic data to prove popularity.
8. **Progressive enhancement protects discoverability.** All static guide links remain in the HTML. JavaScript enhances discovery and hides duplicate visual presentation only after the enhanced hub is ready.

### Patterns deliberately not copied

- no login-gated favorites or saved-article feature;
- no artificial reading-time labels because Carrowmont does not maintain reliable reading-time metadata for every guide;
- no trending/hot-topic claims without analytics evidence;
- no third-party or external search provider;
- no personalized investment recommendations;
- no life-stage assumptions based on age, identity or demographic profiling;
- no new URL merely to support a hub filter.

## Public Learn Hub 2.0 experience

### 1. Revised public framing

The page hero now says:

> **Understand the money question before you act on it**

The copy explains that users can start from their situation, browse a topic, or search the learning library and then move to calculators when they want to test their own numbers.

### 2. Six situation-first starting points

The hub provides six optional educational entry points:

1. **Get my money organised** - budget, cash flow and financial buffer.
2. **Reduce debt and borrowing pressure** - repayment, credit and borrowing choices.
3. **Plan for a home** - affordability, mortgages and housing trade-offs.
4. **Start or improve investing** - foundations, funds and portfolio decisions.
5. **Prepare for retirement or FI** - targets, withdrawals and long horizons.
6. **Understand markets and inflation** - rates, inflation, gold and macro cause-and-effect.

These buttons generate a focused Learn-only query. The UI explicitly says they are educational starting points, **not a required financial order or personalized advice**.

### 3. Dedicated Learn-only search

`Search Learn` uses the existing `CarrowmontSearchCore` ranking, typo correction, aliases and suggestions, but the candidate set is built only from the guide URLs already present in the Learn library.

Important boundaries:

- no tool result can appear inside the Learn result pane;
- no Research page can appear unless it is already intentionally present in the Learn source library;
- the full sitewide Search remains a separate `/search.html` route;
- query words are not sent to an external search provider;
- no URL query state, cookies or new browser-storage persistence is introduced by Learn Hub 2.0.

### 4. Browse by topic

Topic chips are generated from the existing `.category-box` sections. Counts are calculated from the source library at runtime rather than being hard-coded in a second inventory.

The current source library contains **102 unique guide destinations across 11 topic categories**. Some guides appear in more than one source category; the runtime deduplicates by URL while retaining all category memberships.

When a selected category already has an existing Carrowmont tool CTA, the hub displays a compact **Related calculator** link. It reuses the existing category tool destination rather than inventing another route.

### 5. Choose how you want to learn

The hub offers:

- **All guides**
- **Start here**
- **Explain**
- **Compare**
- **Plan & decide**

The classification reuses `semantic_intents` already present in Carrowmont Search data. A cautious title-based fallback is used only for the small number of Learn destinations that intentionally sit in the hub but are not ordinary Search-index guide records.

One guide may belong to more than one style. These are discovery filters, not mutually exclusive editorial labels written onto the source article.

### 6. Common planning questions

The previous `POPULAR PLANNING QUESTIONS` wording is retired. The existing editorial set remains useful as default starting points, but the product now calls them **Common planning questions** / **Editorial starting points** because no analytics-backed popularity claim is being made.

### 7. Desktop and mobile behavior

Desktop:

- two-column discovery layout;
- left situation panel;
- right search/filter/result area;
- two-column result cards;
- result pane has a contained vertical scroller with its scrollbar on the right edge;
- topic counts and related-tool CTA remain visible without forcing the user through the entire library.

Mobile:

- one-column layout;
- situation cards horizontally browseable;
- topic/style chips horizontally browseable;
- results use **normal page scrolling**, not a nested vertical scroll pane;
- no horizontal page overflow is permitted.

### 8. Progressive-enhancement / SEO boundary

The previous static Learn library is **not deleted**.

The page still contains:

- all category headings;
- all 106 category-link occurrences representing 102 unique guide destinations;
- all existing internal links;
- all existing category tool links;
- locale-sensitive source text.

Only after Learn Hub 2.0 successfully initializes does CSS hide the duplicate visual source-library presentation. If JavaScript is unavailable, the original category library remains usable and crawlable.

This release creates **No new public URLs** and does not require sitemap or Search Console indexing changes.

## Localization

Learn Hub 2.0 rebuilds its library labels after `carrowmont:localechange` so localized investment terminology and country/currency examples remain aligned with the underlying static Learn source.

The release does not introduce FX conversion or country-specific legal/investment rules.

## Files/components changed

Main site:

- `learn.html`
- `learn-hub2.css` (new)
- `learn-hub2.js` (new)
- `docs/CARROWMONT_LEARN_HUB2_IMPLEMENTATION.md` (new)
- `docs/CARROWMONT_LEARN_HUB2_ACCEPTANCE_LEDGER.md` (new)
- current status, roadmap, Start Here, new-chat, master-continuity and standards-index documents

QA:

- `scripts/learn-hub2-contract.mjs` (new)
- `scripts/source-contract.mjs`
- legacy contracts whose old Learn-Search wording was intentionally superseded
- `tests/100-learn-hub2.spec.js` (new)
- `tests/77-fre12-ux-search-learn.spec.js` compatibility adjustment so older guides are required to remain in the static source library even when progressive enhancement hides that source block visually

## What Learn Hub 2.0 deliberately does not change

- no calculator formula;
- no Ask journey or Ask calculation;
- no Search page result hierarchy;
- no My Carrowmont account/storage behavior;
- no public URL or sitemap inventory;
- no Learn article body/content rewrite;
- no Research study content;
- no GitHub workflow;
- no connected-financial-data work;
- no native-app work;
- no external query provider or analytics-backed personalization.

## Pre-Publisher verification

Before packaging, this review release was checked against:

- `node --check` on new/changed JavaScript and QA modules: **PASS**;
- full deterministic source contract from the exact staged multi-repo source after Repair 1: **1,603 PASS / 0 FAIL**;
- Development Standards Gate with `learn.html` declared for shared UI, locale, deep-link, return-route, responsive, print, privacy and SEO review: **PASS** (39 pre-existing tracked legacy issues; 1 changed HTML page audited);
- static Learn/source inventory: **102 unique guide destinations retained**, with no public URL, sitemap or search-index inventory change;
- targeted browser coverage is authored for desktop discovery, typo-tolerant Learn-only search, topic filtering/related calculator, situation and learning-style controls, and mobile overflow/scroll behavior.

The local workspace does not contain Playwright, so the full browser matrix is **not** claimed locally. For Repair 1, targeted headless-Chromium DOM/render probes were run against the staged Learn page with its production CSS/JavaScript and local Search data inlined. They verified desktop enhancement, topic/tool routing, legacy hash activation, 390/360 page-width containment and the 1366x640 search-result viewport handoff. Full Playwright execution in Publisher/deployed QA remains mandatory and authoritative.

## Publisher Repair 1 - 17 browser failures fixed as one shared-cause repair

The first Publisher attempt for Learn Hub 2.0 reached **878 browser passes / 17 failures**. The failures clustered around Learn and were not treated as 17 independent defects. Review identified three shared causes:

1. **legacy browser contracts still asserted the old visible static Learn directory and embedded all-site Search UI** even though Learn Hub 2.0 intentionally keeps that directory only as crawlable/no-JS source markup and replaces the embedded global search with guide-only discovery;
2. **mobile grid min-content expansion** allowed the new horizontal situation/topic controls to enlarge the page canvas instead of remaining contained scrollers;
3. **short-laptop search timing** could re-render after submit because the pending input/typeahead timer was not cancelled, which could undo the intended results-into-view handoff.

Repair 1 therefore:

- adds explicit `min-width:0` / bounded-grid containment so 390px and 360px use internal horizontal scrollers without page-level overflow;
- preserves established Learn deep links (`#home-loans`, `#loans-and-debt`, `#market-mechanics`, and `#topic-*`) by activating the corresponding Learn Hub 2.0 topic instead of scrolling users to hidden progressive-enhancement source sections;
- routes the shared `Explore by topic` banner into the enhanced Hub state;
- cancels the pending search-input timer on submit/clear and performs a deterministic results-into-view handoff on short laptop/mobile viewports;
- migrates the affected legacy Playwright contracts to verify their original product requirements through the new Hub UI while still asserting that the static source links remain present for crawlability/no-JS fallback;
- updates the source meta-contracts so they protect the new test/product boundary rather than old selector wording.

Repair 1 targeted Chromium probes produced:

- desktop: enhanced Hub ready, 12 topic controls, 12 initial result cards, right-edge result pane scrollable;
- home topic: correct localized heading, Mortgage Decision Centre related-tool route, Home Affordability guide visible;
- shared topic banner: Retirement activates `#topic-retirement` and the Retirement Hub state;
- legacy `#loans-and-debt`: activates Credit, Loans & Debt with `/loan-calculator/`;
- all eight mapped primary-tool topics resolve to exactly one expected related-tool route; Assets & Investing and Foundation expose no invented tool route;
- 390px: document width contained within viewport, results use normal page scrolling, situation/topic rows use internal horizontal scrolling;
- 360px: same containment behavior;
- 1366x640 search: `how to start investing` returns the beginner investing guide and brings the results heading to roughly 108px from the viewport top.

After Repair 1 the deterministic source contract is **1,603 PASS / 0 FAIL** and the Development Standards Gate is **PASS** with the same 39 pre-existing tracked legacy items and no new standards debt. Publisher Playwright must still rerun green before merge.

## Release interpretation for a future account

If a future assistant receives an all-green Source Snapshot containing this implementation:

1. read `SNAPSHOT-MANIFEST.txt` for exact current commits;
2. rerun the current source QA;
3. verify that `learn.html`, `learn-hub2.js`, `learn-hub2.css`, the Learn Hub 2.0 contract and browser tests are present;
4. treat **Learn Hub 2.0 as complete** only if it is present in the newest completed all-green post-merge snapshot supplied by the owner;
5. continue with **Evergreen Learn Expansion**, beginning with a full content-gap/collision review rather than adding pages for volume.

If this implementation exists only in a Publisher/review bundle, it is **not deployed**.

## Publisher Repair 2 - final same-document hash-navigation false failure

The Repair 1 Publisher rerun reached **895 browser passes / 1 failure**. The remaining failure was isolated to `tests/33-gseo2a-sitewide-search-visibility.spec.js` and was not a Learn product defect. The test loop called the shared `gotoClean()` HTTP-navigation helper with `/learn.html#loans-and-debt` at three viewport widths. After the first load, subsequent iterations could be same-document hash navigations; Playwright correctly returns `null` rather than an HTTP `Response` for a same-document navigation, while `gotoClean()` intentionally requires a non-null HTTP response.

Repair 2 therefore keeps the product assertion intact but separates the two concerns: each viewport first performs a clean HTTP load of `/learn.html` with a harmless QA-only query value, then sets `#loans-and-debt` as a same-document hash and verifies that Learn Hub 2.0 activates the Loans & Debt topic, exposes `/loan-calculator/`, retains the crawlable source links, and remains horizontally overflow-safe. No public product, CSS, Learn Hub logic, URL inventory, calculator, Ask logic, account behavior, reference data or workflow file changes are required for Repair 2.

The exact Publisher artifact for the Repair 1 rerun reported **895 passed / 1 failed**; deterministic source QA remained **1,603 PASS / 0 FAIL** and the Development Standards Gate remained **PASS**. After the Repair 2 QA-contract correction, the full deterministic source suite remains **1,603 PASS / 0 FAIL** and the manifest-aware Development Standards Gate remains **PASS** with 39 pre-existing tracked legacy issues and no new standards debt. Repair 2 must rerun Publisher Playwright green before merge.


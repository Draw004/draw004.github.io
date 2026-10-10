# CARROWMONT TOOLS-HUB1
## All Tools Directory & Homepage Discoverability
### Final Product / Implementation Specification

**Status:** FINAL REV1 — approved direction, ready for protected spec commit  
**Baseline:** Carrowmont Source Snapshot 35  
**Snapshot generated:** 2026-10-10T10:30:14Z  
**Main-site baseline commit:** `60f46551d53bcd9e7d5308fce2964ec19870ec04`  
**Central-QA baseline commit:** `034ba87da64af4853f69d6e94454df2f662224c5`  

---

# 1. Purpose

Carrowmont has grown beyond the original six primary planning calculators. It now also contains public authority/stress/scenario tools that are indexable and useful in their own right:

- 4% Rule Stress Test
- Financial Independence Number by Spending
- US Debt & Interest Cost Calculator
- Gold Under Macro Stress Explorer

These assets are discoverable through the Learn hub and contextual links, but they do not yet have a clear permanent home comparable with the six primary calculators.

TOOLS-HUB1 creates that permanent discovery architecture.

The release must:

1. preserve the identity of the existing six primary planning calculators;
2. add a dedicated `/tools.html` directory containing all current public tools;
3. preserve the existing visual identity of homepage tool cards, including unique tool icons, optional decorative artwork, status badges, typography and card proportions;
4. make homepage core-tool ordering country-aware and demand-led using documented external search-demand evidence rather than a single fixed global order;
5. create a visually prominent **Explore All Tools** entry that remains fixed as the gateway to `/tools.html`;
6. add a compact homepage section for additional authority/scenario tools beyond the core planning grid;
7. make the existing "View all tools" action genuinely open the complete tools directory;
8. establish a scalable taxonomy for future Home & Loans, Debt & Credit, Investing & Retirement Income, Tax, and Macro & Markets tools;
9. preserve Carrowmont's global-first, country-sensitive terminology architecture;
10. strengthen internal discovery without destabilizing existing calculators or SEO infrastructure;
11. prepare the current authority URLs for a deliberate Google Search Console indexing check before the Silver project starts.

This is a **discovery/navigation release**, not a calculation-engine release.

---

# 2. Non-goals

TOOLS-HUB1 must **not**:

- change formulas or calculation logic in any existing calculator;
- merge authority/scenario tools into the six-tool report registry;
- change the six-tool "Continue planning with Carrowmont" PDF recommendation contract;
- change country/currency storage behavior;
- redesign the main Carrowmont visual identity;
- create placeholder pages/cards that pretend future tools are already live;
- add login, payment, account, AI, or saved-tool functionality;
- alter existing public authority-tool URLs;
- replace the Learn hub;
- repeatedly modify sitemap/IndexNow architecture beyond the minimal new `/tools.html` inclusion;
- make Google/Bing indexing a claimed guarantee.

---

# 3. Locked architectural distinction

Carrowmont must distinguish between:

## 3.1 Primary Planning Tools

The six currently live calculators/planners remain the **current primary planning suite**:

1. Budget & Cash Flow Planner
2. SIP / Recurring Investment Calculator
3. Retirement Planner
4. Inflation Calculator
5. Goal Planner
6. Financial Independence Planner

These six remain the canonical six-tool registry used by the established cross-tool report/recommendation architecture unless a future approved architecture change explicitly expands that registry.

Homepage prominence, however, is **not permanently limited to six cards**. The core homepage grid must support future expansion. The first planned addition is the global **Home Loan / Mortgage Prepayment & Early Payoff** tool, localized by country terminology. When that tool is live and approved for homepage promotion, it becomes the seventh real core card without changing the existing report registry merely by being promoted on the homepage.

## 3.2 Authority / Scenario Tools

The additional public tools are separate authority/decision-support assets:

1. 4% Rule Stress Test
2. Financial Independence Number by Spending
3. US Debt & Interest Cost Calculator
4. Gold Under Macro Stress Explorer

They belong in the new all-tools directory and in relevant homepage/internal-link surfaces, but their presence must **not** silently change the six-primary-tool PDF/report contract.

This distinction is mandatory to avoid breaking existing shared report QA.

---

# 4. Global-first / country-sensitive rule

TOOLS-HUB1 must preserve the rules already defined in `CARROWMONT_ARCHITECTURE.md`:

- country and currency are separate concepts;
- country may change terminology and sensible defaults;
- users remain able to override currency where supported;
- terminology should feel natural for the selected country;
- one universal calculation engine should be preferred where the financial problem is universal;
- country-specific mathematical/regulatory behavior should be introduced only when genuinely required.

Examples already established by Carrowmont:

- India: **SIP Calculator**
- Other markets: **Recurring Investment Calculator**

Future examples to follow the same rule:

- India: Home Loan Prepayment / Foreclosure
- United States: Mortgage Prepayment / Early Payoff
- United Kingdom: Mortgage Overpayment
- Australia: Home Loan Extra Repayments

TOOLS-HUB1 does not implement those future Home & Loans tools, but the directory architecture must be able to support them without redesign.

---

# 5. New canonical tools directory

Create:

`https://carrowmont.com/tools.html`

Suggested document title:

**Financial Calculators, Planners & Scenario Tools | Carrowmont**

Suggested meta description:

**Explore Carrowmont financial calculators, planning tools, retirement stress tests and macro scenario explorers. Tool terminology adapts by country where appropriate.**

Suggested H1:

**Financial calculators, planners and scenario tools**

The page should explain, in concise language, that Carrowmont combines practical planning calculators with educational stress/scenario tools.

The page must be:

- public;
- free;
- no-login;
- canonical;
- indexable;
- included in the sitemap;
- linked directly from the homepage;
- linked by the site's "All tools" action;
- responsive at desktop, tablet, 390 px and 360 px;
- compatible with the existing locale controller.

---

# 6. Tools-directory taxonomy

Only categories containing live public tools should render.

Do **not** show empty "Coming soon" categories in V1.

## 6.1 Core Planning Tools

Render the six established primary tools.

### Budget & Cash Flow Planner

Purpose text should focus on budgeting, irregular bills, cash flow and pay-cycle planning.

### SIP / Recurring Investment Calculator

Name and relevant supporting copy must adapt by country using the established Carrowmont terminology rule.

For India:

**SIP Calculator**

For non-India profiles:

**Recurring Investment Calculator**

Do not create separate URLs for the localized names.

### Retirement Planner

Focus on retirement expenses, income, savings and required target/corpus.

### Inflation Calculator

Focus on future cost and purchasing power.

### Goal Planner

Focus on target amount, timing and contribution path.

### Financial Independence Planner

Focus on spending, savings and the broader FI journey.

## 6.2 Planning & Retirement Stress Tests

### 4% Rule Stress Test

Direct URL:

`/4-percent-rule-stress-test.html`

Description should clearly frame it as a withdrawal-rule stress test, not a guarantee.

### Financial Independence Number by Spending

Direct URL:

`/financial-independence-number-by-spending.html`

Description should distinguish it from the full FI Planner: it is a transparent first-pass spending-based target explorer.

## 6.3 Macro & Market Explorers

### US Debt & Interest Cost Calculator

Direct URL:

`/us-debt-interest-cost-calculator.html`

Description should frame it as a scenario tool for debt, refinancing and modeled interest burden, not an official government forecast.

### Gold Under Macro Stress Explorer

Direct URL:

`/gold-macro-stress-explorer.html`

Description should explain competing macro forces without implying a gold-price forecast.

---

# 7. Future taxonomy — reserved architecture, not visible empty UI

The directory structure should be designed so future live tools can be added into categories such as:

- Home & Loans
- Debt & Credit
- Investing & Retirement Income
- Tax
- Macro & Markets

Likely future examples include:

- Mortgage / Home Loan Prepayment & Early Payoff
- Mortgage Prepay vs Invest
- Rent vs Buy
- Mortgage Refinance / Balance Transfer
- Home Affordability
- Credit Card Payoff
- Debt Snowball vs Avalanche
- Retirement Withdrawal / SWP Sustainability
- Silver Supply, Demand & Macro Stress Explorer
- Oil Shock & Inflation Calculator

These names are roadmap examples only. TOOLS-HUB1 must not publish non-existent tools or placeholder cards.

---

# 8. Homepage changes

The homepage must preserve the existing strong card-based visual identity while becoming scalable beyond six core tools.

## 8.1 Core planning grid — visual identity is protected

Keep:

**Plan for what matters**

The currently live six primary tool cards remain in this section. Each core homepage card must retain the established Carrowmont visual language:

- a unique tool icon inside the established soft circular icon tile;
- existing card border/radius/shadow language;
- existing typography and spacing hierarchy;
- `Live`/country badges only where useful;
- optional larger decorative artwork where it improves identity without making every card visually noisy;
- visible CTA without hover.

Do **not** flatten the core grid into generic text-only cards.

The grid must be engineered to support future expansion beyond six. The first planned seventh card is the global **Home Loan / Mortgage Prepayment & Early Payoff** tool once that tool actually exists and passes its own release process. Do not publish a dead or "coming soon" card in TOOLS-HUB1.

Authority/macro scenario tools do not enter this core grid merely because they are live.

## 8.2 Country-demand-led ordering of the real core tools

The core homepage tools must not use one arbitrary fixed order for every country. Their order should follow **documented search demand by the selected Carrowmont country profile**, while preserving a deterministic and accessible experience.

Before production implementation, create and commit a research record conceptually named:

`docs/CARROWMONT_HOMEPAGE_TOOL_DEMAND_MATRIX.md`

For every supported named country profile, record:

- the country code/name;
- the localized search-intent cluster used for each core tool;
- source(s) and research date;
- available monthly search-volume / relative-interest evidence;
- normalized demand score or ordinal rank;
- fallback rule where country-specific evidence is weak;
- final homepage order.

Research must evaluate **intent clusters**, not one literal keyword. Example: the future housing tool may be searched as `home loan prepayment calculator`, `home loan foreclosure calculator`, `mortgage payoff calculator`, `mortgage prepayment calculator`, `mortgage overpayment calculator`, `extra repayments calculator`, or local-language equivalents depending on market.

Preferred evidence hierarchy:

1. country-specific keyword-volume data from reputable SEO/search-demand datasets where available;
2. Google Trends country-level relative interest as a corroborating signal where useful;
3. multiple high-quality local search/finance sites as directional evidence;
4. Carrowmont Google Search Console impressions/clicks later, once enough first-party data exists.

Do not fabricate precise demand where the evidence is weak. When a country lacks reliable comparable data, use a documented regional/global fallback rather than pretending to know a precise ranking.

The demand matrix is a **build-time/static product input**. The public homepage must not call Semrush, Google Trends, Ahrefs or another external ranking API at runtime.

When the user changes Carrowmont country, the card order should update to the approved country ranking using the existing locale state. Changing currency alone must not change the card order.

The ranking should be reviewed periodically (target: every 6–12 months, or sooner when first-party Search Console data materially changes the picture), not on every page load.

## 8.3 Prominent Explore All Tools gateway

**Explore All Tools** is not ranked against calculators. It is a permanent navigation gateway and should remain visually prominent.

When the homepage eventually has seven real core tools, the intended desktop composition is:

- seven real tool cards ordered by country demand;
- **Explore All Tools** fixed as the eighth card, producing a balanced 4 × 2 grid where space permits.

The Explore card should deliberately stand out from calculator cards while still belonging to Carrowmont's visual system. Recommended treatment:

- dedicated **tools/toolbox/grid** icon;
- distinct but restrained background/accent treatment;
- strong title: **Explore All Tools**;
- concise copy explaining that it opens the full Carrowmont tool directory;
- CTA: **Browse all tools →**;
- direct static link to `/tools.html`;
- accessible label that makes clear it is a directory/navigation card, not a calculator.

Before the seventh live core tool exists, TOOLS-HUB1 may render this gateway in a prominent layout that does not create a fake eighth tool or a dead placeholder. The layout must be designed so the later seventh-tool insertion does not require a homepage redesign.

## 8.4 "View all tools" correction

The current homepage action:

`View all tools →`

must change from the same-page `#tools` anchor to:

`/tools.html`

The action must be a real route to the complete tools directory.

## 8.5 New homepage authority/scenario section

Add a compact section immediately after the six-tool planning area and before the next major homepage content block.

Recommended heading:

**Explore more financial tools**

Recommended supporting copy:

**Stress-test important assumptions, explore financial independence targets and understand major macro forces with Carrowmont's decision-support tools.**

Render four compact cards:

1. 4% Rule Stress Test
2. FI Number by Spending
3. US Debt & Interest Cost
4. Gold Under Macro Stress

The section should include a clear action:

**View all Carrowmont tools →**

linking to `/tools.html`.

The new authority/scenario cards should use the existing Carrowmont visual language but remain visually lighter/shorter than the core planner cards so the hierarchy remains obvious. They must not compete visually with the **Explore All Tools** gateway.

---

# 9. Header / footer navigation behavior

## 9.1 Homepage

On the homepage:

- the primary `Tools` navigation target should open `/tools.html`;
- `View all tools` should open `/tools.html`;
- footer `All tools` should open `/tools.html`.

## 9.2 Existing content pages

Avoid a high-risk mass edit of dozens of static pages solely to replace historical `/#tools` links in this release.

Instead:

- update the shared `site.js` navigation enhancement so existing `Tools` / `All tools` links targeting `/#tools` are upgraded at runtime to `/tools.html`;
- the homepage and new tools directory themselves must contain direct static `/tools.html` links so the directory does not depend on JavaScript for discovery;
- existing `/#tools` fallback links remain functional if JavaScript is unavailable because they still lead to the core planning section.

This provides low-churn backward compatibility while improving the user journey across the site.

A later broad static-navigation cleanup may replace legacy source hrefs if justified, but it is not required for TOOLS-HUB1 V1.

---

# 10. Tools-directory UI requirements

The page should use established Carrowmont components and spacing rather than introducing a new design system.

Required elements:

- canonical Carrowmont header;
- locale/currency control;
- concise hero/introduction;
- category headings;
- responsive tool-card grid;
- consistent card title, description and CTA;
- status treatment only where useful; do not clutter every card with "Live" unless it improves clarity;
- no excessive decorative illustration that makes the directory heavy;
- accessible card links;
- clear educational-use footer/disclaimer language consistent with Carrowmont;
- canonical footer.

Cards should be easy to scan and should not rely on color alone to distinguish categories.

---

# 11. Country-aware terminology on `/tools.html`

At minimum, the tools directory must reproduce the established SIP localization behavior.

If selected country is India:

- card title: **SIP Calculator**
- supporting copy may use SIP / step-up SIP terminology naturally.

For other countries:

- card title: **Recurring Investment Calculator**
- supporting copy should use recurring-investment language.

Country and currency must remain independent. Do not require INR merely because the country is India, and do not require India because the currency is INR.

The country selection controls terminology; currency controls monetary display where relevant.

The same selected-country state also controls the approved homepage **tool-order profile** from the demand matrix. Country changes may reorder the real core cards; currency-only changes must not reorder them.

No other existing tool names should be changed unless already supported by the established locale architecture.

---

# 11A. Search-demand research standard for homepage ordering

TOOLS-HUB1 must treat country-demand ordering as a maintained product dataset, not subjective design preference.

For the initial matrix, research all supported named country profiles in the current Carrowmont locale catalogue. Where a local-language term is the dominant search behavior, research that local term even if the current Carrowmont UI is English. Map those searches back to the correct universal Carrowmont tool intent.

For each tool/country combination, use multiple synonyms and intent-equivalent queries where necessary. Do not compare an overly broad keyword for one tool against an overly narrow keyword for another. Record enough evidence that a future maintainer can understand why the ranking was chosen.

The seven-tool future-state ranking scope is:

1. SIP / Recurring Investment Calculator
2. Budget & Cash Flow Planner
3. Retirement Planner
4. Life Goals / Goal Planner
5. Financial Independence Planner
6. Inflation Calculator
7. Home Loan / Mortgage Prepayment & Early Payoff — once live

Until #7 is live, rank only the six real core tools; do not invent demand for a card that cannot be opened.

`Explore All Tools` is always outside this ranking system.

---

# 12. SEO requirements for `/tools.html`

The tools directory must have:

- unique `<title>`;
- unique meta description;
- canonical `https://carrowmont.com/tools.html`;
- one clear H1;
- logical H2 category headings;
- crawlable direct links to all ten current tools;
- Open Graph title/description;
- Twitter metadata consistent with existing main-site patterns;
- structured data where appropriate.

Recommended structured data:

- `CollectionPage` or `WebPage`;
- optional `ItemList` representing current tool URLs.

Do not add schema types that misrepresent financial advice or claim ratings/reviews.

---

# 13. Sitemap and Bing IndexNow

Add:

`https://carrowmont.com/tools.html`

to `sitemap.xml` with an appropriate `lastmod` for the release date.

Do not restructure unrelated sitemap entries.

The existing Carrowmont IndexNow architecture remains the Bing notification mechanism. The release must not create a second competing IndexNow workflow.

After merge/deployment, verify that the normal IndexNow process covers the changed/new URL set.

IndexNow notification is discovery signaling, not a guarantee of indexing.

---

# 14. Google indexing gate before Silver

After TOOLS-HUB1 is live, Pages is green, Automated QA is green, Multi-Repo Guard is green and a fresh Source Snapshot is taken, perform a deliberate Google Search Console check before beginning the Silver implementation.

Inspect:

1. `https://carrowmont.com/4-percent-rule-stress-test.html`
2. `https://carrowmont.com/financial-independence-number-by-spending.html`
3. `https://carrowmont.com/us-debt-interest-cost-calculator.html`
4. `https://carrowmont.com/gold-macro-stress-explorer.html`
5. `https://carrowmont.com/tools.html`

For each URL:

- if Google reports **URL is on Google**, no request is needed;
- if Google reports **URL is not on Google** and no blocking defect exists, use **Request Indexing**;
- if Google reports a technical/indexability problem, diagnose and fix that problem before assuming a simple submission will solve it.

The user has chosen this as a sequencing gate: **do not start Silver implementation until these five URLs have at least been inspected and, where appropriate, indexing has been requested.**

Do not claim that a submission guarantees indexing.

---

# 15. Internal-link strategy

TOOLS-HUB1 should improve discovery without creating link spam.

Required:

- homepage direct link to `/tools.html`;
- `/tools.html` direct links to all ten live tools;
- homepage "Explore more financial tools" direct links to the four authority/scenario tools;
- `/tools.html` link back to Learn for educational guides;
- existing contextual links in Learn/article clusters remain in place;
- authority-tool pages should retain their existing relevant cross-links.

Do not mechanically add all ten tool links to every article body.

---

# 16. Architecture-document update

Update `docs/CARROWMONT_ARCHITECTURE.md` minimally to reflect the live discovery architecture after implementation.

Add/clarify:

- `/tools.html` is the canonical all-tools directory;
- the homepage remains the central discovery layer and supports expansion beyond six core tools without weakening the existing visual card system;
- core homepage tool order is country-aware and demand-led through a documented static demand matrix;
- **Explore All Tools** is a permanent prominent gateway to `/tools.html` and is not part of demand ranking;
- authority/scenario tools are listed separately from the six primary planning tools;
- the six-tool report registry remains unchanged by simply adding authority tools;
- new globally relevant tools should prefer a universal engine with country-sensitive terminology/defaults and optional genuinely country-specific rule modules.

Do not duplicate or rewrite the existing Country/Currency and Localization sections unnecessarily.

---

# 17. Accessibility requirements

The new page and homepage section must satisfy:

- semantic headings in logical order;
- keyboard-accessible links;
- visible focus states;
- no card requiring hover to expose its CTA;
- touch targets consistent with Carrowmont standards;
- no information conveyed only through color;
- descriptive link text;
- correct landmark structure;
- 200% zoom remains usable;
- no horizontal page overflow at 360 px or 390 px.

---

# 18. Responsive requirements

Validate at minimum:

- 1440 px desktop;
- typical laptop width;
- 768 px tablet where practical;
- 390 px mobile;
- 360 px mobile.

Required behavior:

- category/card grids collapse cleanly;
- titles do not clip;
- CTA text does not overflow;
- no horizontal scrollbar;
- no excessively tall empty card whitespace;
- homepage core-tool card identity (unique icons, established card geometry and optional decorative artwork) is preserved;
- country changes produce the approved deterministic core-card order without horizontal overflow;
- currency-only changes do not reorder cards;
- Explore All Tools remains visually distinct and prominent;
- new "Explore more" authority cards remain subordinate to the core planning grid.

---

# 19. Performance / implementation discipline

This is a lightweight static discovery page.

Avoid adding:

- heavy frameworks;
- large new images;
- third-party JavaScript;
- client-side API calls;
- duplicated locale libraries;
- unnecessary animations.

Reuse:

- `carrowmont.css`;
- `locale.js`;
- `site.js`;
- existing header/footer/locale patterns.

The page should remain fast and mostly static.

---

# 20. Privacy / security

TOOLS-HUB1 collects no new user data.

Requirements:

- no login;
- no client secret;
- no third-party tool-directory API;
- no external tracking addition;
- existing Cloudflare analytics / automated-QA RUM isolation remains unchanged;
- no `.github/workflows/*` change is expected for this release.

Because TOOLS-HUB1 should not modify workflow files, the Carrowmont Release Automation token should **not require temporary Workflows: Read and write permission** for this release unless the final implementation scope changes unexpectedly.

---

# 21. Expected implementation files

Expected main-site changes may include:

- `tools.html` — new
- `index.html`
- `carrowmont.css`
- `site.js`
- `sitemap.xml`
- `docs/CARROWMONT_ARCHITECTURE.md`
- `docs/CARROWMONT_HOMEPAGE_TOOL_DEMAND_MATRIX.md` — new research-backed country ordering record
- `docs/CARROWMONT_TOOLS_HUB1_IMPLEMENTATION.md`

Expected central-QA changes may include:

- `tests/12-tools-hub.spec.js` — new
- `scripts/source-contract.mjs`
- related QA helper/fixture files only if genuinely necessary

No calculator repository is expected to change.

Expected release PR count:

**2**

1. `draw004.github.io`
2. `carrowmont-qa`

If the final release manifest unexpectedly touches any of the six calculator repositories, stop and review the scope before Publisher.

---

# 22. Source-contract requirements

Extend the central source contract to validate at least:

1. `tools.html` exists.
2. Canonical URL is correct.
3. Unique title and meta description exist.
4. One H1 exists.
5. All six primary tools are linked.
6. All four current authority/scenario tools are linked.
7. No future/non-existent tool URL is exposed as live.
8. Homepage `View all tools` points to `/tools.html`.
9. Homepage contains the four-card additional-tools section.
10. `sitemap.xml` contains `/tools.html`.
11. Existing four authority URLs remain present in sitemap.
12. Six-tool primary report registry is not expanded accidentally.
13. Architecture document records the new all-tools directory.
14. No `.github/workflows/*` addition is introduced by TOOLS-HUB1.
15. Country/currency separation remains intact.
16. SIP/Recurring Investment localization hook exists on the directory.
17. Demand-matrix documentation exists and covers every supported named country profile or explicitly documented fallback group.
18. Homepage core cards expose stable tool identifiers so country-specific ordering cannot be confused with translated labels.
19. Explore All Tools links directly to `/tools.html` and is excluded from demand ranking.
20. No non-existent seventh-tool placeholder is exposed as live.
21. Country-specific ordering data are local/static; no external ranking API is called by the homepage.

---

# 23. Dedicated browser QA

Create a dedicated Playwright suite conceptually:

`tests/12-tools-hub.spec.js`

The suite should validate the live browser behavior, not only source strings.

## 23.1 Page load and structure

- `/tools.html` returns successfully.
- no browser console error from the new page;
- H1 and category headings render;
- all ten live tool cards/links exist;
- category order is stable;
- no empty future category renders.

## 23.2 Navigation

- homepage "View all tools" opens `/tools.html`;
- homepage new-section CTA opens `/tools.html`;
- homepage four additional-tool cards open the correct pages;
- tools-directory cards open the correct pages;
- `site.js` upgrades legacy `/#tools` navigation anchors to `/tools.html` on pages using the shared script;
- fallback behavior is not made invalid in static HTML.

## 23.3 Localization

- India country profile displays **SIP Calculator**;
- a non-India profile displays **Recurring Investment Calculator**;
- changing currency alone does not incorrectly change country terminology;
- changing country updates terminology without requiring a page reload where the shared locale system supports live updates;
- country list remains alphabetized under the established locale controller;
- at least several representative country profiles (including India, United States, United Kingdom, Canada and Australia) render the exact approved demand-led tool order from the demand matrix;
- changing currency alone does not reorder core cards;
- changing country reorders the real core cards deterministically;
- Explore All Tools remains fixed as the directory gateway and is never displaced by demand ranking;
- keyboard/tab order matches the rendered DOM order after country-specific ordering is applied.

## 23.4 Responsive

- no page-level horizontal overflow at desktop;
- no page-level horizontal overflow at 390 px;
- no page-level horizontal overflow at 360 px;
- card titles/CTAs remain visible;
- homepage authority section does not disturb the core-tool layout;
- core card icons remain visible and correctly paired with their tool after reordering;
- Explore All Tools remains clearly distinct on desktop and mobile;
- no unacceptable cumulative layout shift is introduced by country-order application.

## 23.5 SEO / crawlability

- canonical URL correct;
- title/description correct;
- sitemap entry exists;
- direct static homepage link to `/tools.html` exists;
- direct static links from `/tools.html` to all ten live tools exist.

## 23.6 Regression

- existing SEO3A/SEO3B/SEO3C/SEO3D suites remain green;
- existing six calculator smoke/layout/report suites remain green;
- Cloudflare RUM isolation behavior remains unchanged;
- no new external network dependency is introduced.

---

# 24. Visual consistency gate

Before release packaging, visually compare:

- homepage six-tool section before/after;
- new homepage "Explore more financial tools" section;
- `/tools.html` desktop;
- `/tools.html` 390 px;
- `/tools.html` 360 px;
- header/locale controls;
- card border/radius/shadow/spacing;
- typography;
- footer.

The new directory must look like part of Carrowmont, not a separate microsite.

---

# 25. Red-prevention preflight gate

Do **not** hand the production release ZIP to the user until the exact final release candidate has passed the following checks.

## 25.1 Baseline / manifest

- implementation starts from the fresh post-spec Source Snapshot;
- base hashes match that snapshot exactly;
- release manifest contains only intended files/repositories;
- expected PR count is known before Publisher;
- no hidden calculator-repository changes.

## 25.2 Archive integrity

- ZIP opens cleanly;
- archive integrity test passes;
- manifest file paths match archive paths;
- release SHA-256 recorded;
- no accidental nested ZIP-root/path mismatch.

## 25.3 Staging-layout rehearsal

Test the release under the same directory assumptions used by:

- Batch PR Publisher;
- Automated QA;
- Multi-Repo Guard.

Do not assume a sibling repository exists in live Automated QA unless the workflow actually checks it out.

## 25.4 Browser / visual

- desktop browser flow pass;
- 390 px pass;
- 360 px pass;
- actual links clicked rather than inferred;
- locale changes exercised;
- visual screenshots reviewed;
- no overflow/clipping.

## 25.5 SEO / source

- central source contract green;
- canonical/meta/sitemap assertions green;
- all ten intended URLs linked;
- existing authority URLs unchanged.

## 25.6 Regression

- existing central QA suites remain green;
- no calculator formula files changed;
- no workflow permission elevation required.

Any modification to the release candidate after this validation requires the affected checks to be rerun.

---

# 26. Acceptance criteria

TOOLS-HUB1 is acceptable only when all of the following are true.

## Product / UX

1. `/tools.html` exists and is public.
2. Page clearly distinguishes primary planning tools from other decision-support tools.
3. Six primary tools remain visually and conceptually primary.
4. Four current authority/scenario tools are easy to find.
5. No non-existent future tool appears as live.
6. Homepage includes a compact additional-tools section.
7. Homepage "View all tools" goes to `/tools.html`.
8. Homepage additional-tools CTA goes to `/tools.html`.
9. New directory remains no-login and free.
10. Existing Learn hub remains intact.

## Localization

11. India sees SIP terminology.
12. Non-India sees recurring-investment terminology.
13. Country controls terminology.
14. Currency does not incorrectly control terminology.
15. Existing country/currency behavior is not regressed.

## Navigation / links

16. All six primary tool links are correct.
17. 4% Rule link is correct.
18. FI Number link is correct.
19. US Debt link is correct.
20. Gold Explorer link is correct.
21. Shared runtime navigation upgrade points legacy Tools/All tools anchors to `/tools.html`.
22. Static homepage discoverability does not depend on JavaScript.

## SEO

23. Unique title exists.
24. Unique description exists.
25. Canonical URL is correct.
26. One H1 exists.
27. Logical H2 structure exists.
28. `/tools.html` is in sitemap.
29. Existing authority URLs remain in sitemap.
30. Direct crawlable links exist to all ten live tools.
31. Structured data, if included, validates and does not misrepresent the page.

## Responsive / accessibility

32. Desktop has no horizontal overflow.
33. 390 px has no horizontal overflow.
34. 360 px has no horizontal overflow.
35. No title clips.
36. No CTA clips.
37. Keyboard navigation works.
38. Focus state is visible.
39. Meaning is not color-only.
40. Heading hierarchy is accessible.

## Regression / architecture

41. Existing six calculator repositories are unchanged.
42. Six-tool PDF/report registry remains unchanged.
43. Existing SEO3A suite remains green.
44. Existing SEO3B suite remains green.
45. Existing SEO3C suite remains green.
46. Existing SEO3D suite remains green.
47. Existing calculator smoke tests remain green.
48. Existing report tests remain green.
49. Cloudflare RUM isolation remains green.
50. Source contract remains green.
51. Architecture doc is updated minimally and consistently.
52. No new third-party dependency is introduced.
53. No client secret is introduced.
54. No `.github/workflows/*` file is changed unless separately approved.

## Release

55. Final ZIP integrity passes.
56. Base hashes match fresh post-spec snapshot.
57. Publisher-layout simulation passes.
58. Guard-layout simulation passes.
59. Expected PR count is exactly two unless scope is explicitly revised.
60. Batch PR Publisher is GREEN before merges.
61. Main-site PR merges before central-QA PR.
62. Pages deployment is GREEN.
63. Live Automated QA is GREEN.
64. Multi-Repo Guard is GREEN.
65. Fresh Source Snapshot is GREEN and becomes the next authoritative baseline.

## Search-engine post-release gate

66. Google URL Inspection performed for the four authority URLs plus `/tools.html`.
67. Request Indexing used where appropriate for URLs not on Google and not blocked by a defect.
68. Any Google technical indexing defect is diagnosed rather than repeatedly resubmitted.
69. Bing IndexNow operation is verified through the established automation/status path.
70. Silver implementation does not begin until the Google inspection/request step above is completed.

---

# 27. Release sequence

Use the standard protected Carrowmont flow:

```text
Approved TOOLS-HUB1 specification
        ↓
Commit specification to draw004.github.io/docs via branch → PR → merge
        ↓
Fresh Source Snapshot
        ↓
Build from that exact snapshot
        ↓
Source contract + browser + responsive + localization tests
        ↓
Publisher-layout and Guard-layout rehearsal
        ↓
Visual consistency gate
        ↓
Package smallest release ZIP
        ↓
Upload release ZIP to controller repo via branch → PR → merge
        ↓
Batch PR Publisher GREEN
        ↓
Merge draw004.github.io PR
        ↓
Merge carrowmont-qa PR last
        ↓
Pages / IndexNow
        ↓
Live Automated QA GREEN
        ↓
Multi-Repo Guard GREEN
        ↓
Fresh Source Snapshot
        ↓
Google Search Console inspection/request for 5 URLs
        ↓
Silver project may begin
```

No temporary Workflow-write token permission is expected because TOOLS-HUB1 does not require a `.github/workflows/*` change.

---

# 28. Definition of done

TOOLS-HUB1 is complete only when:

- this final specification is committed;
- implementation begins from a fresh post-spec Source Snapshot;
- `/tools.html` is live;
- all ten current public tools are correctly discoverable there;
- homepage keeps the six primary tools prominent;
- homepage exposes the four newer tools in a separate compact section;
- country-sensitive SIP/Recurring Investment terminology works;
- no calculator logic changes;
- six-tool report registry remains untouched;
- sitemap contains `/tools.html`;
- Bing IndexNow remains the existing notification mechanism;
- Publisher is GREEN;
- Pages is GREEN;
- live Automated QA is GREEN;
- Multi-Repo Guard is GREEN;
- a fresh post-release Source Snapshot is taken;
- Google Search Console inspection/request is completed for the five agreed URLs before Silver implementation starts.

---

# 29. Final product principle

Carrowmont should remain easy to understand as it grows.

The homepage should communicate:

> **Here are the core tools you can use for everyday financial planning.**

The all-tools directory should communicate:

> **Here is the complete Carrowmont toolkit, including planning calculators, stress tests and macro scenario explorers.**

That separation allows Carrowmont to grow from 10 tools to dozens of useful global financial tools without turning the homepage into an unstructured catalogue.

---

**End of final specification — TOOLS-HUB1 All Tools Directory & Homepage Discoverability**


---

## Revision note — country-demand homepage ordering

REV1 adds the approved homepage principles agreed after the initial TOOLS-HUB1 draft:

- the homepage core grid is expandable beyond six real tools;
- the future Home Loan / Mortgage Prepayment & Early Payoff tool is intended to become the seventh prominent core card after its own release;
- **Explore All Tools** is designed as a standout permanent directory gateway and future eighth card;
- real core tools are ordered by researched country demand, not one global arbitrary sequence;
- ranking research is documented, static, deterministic and separated from runtime external APIs;
- existing unique tool icons/visual card identity are protected.

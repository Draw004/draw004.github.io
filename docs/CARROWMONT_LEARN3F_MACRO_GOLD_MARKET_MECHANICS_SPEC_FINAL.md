# CARROWMONT LEARN3F - MACRO, GOLD & MARKET MECHANICS

## Final Authority-Content, Data-Asset, Search-Intent, Internal-Discovery, QA and Release Specification

**Status:** FINAL specification-only approval gate. This document does not change public article content.  
**Authoritative baseline:** Carrowmont Source Snapshot 104 (timestamped source snapshot generated 2026-10-21T19:34:30Z)  
**Main-site baseline commit:** `c7ab860b9192605a7043d5e6f6228b781ea54f23`  
**Central-QA baseline commit:** `d75849f372590b740c110bc215a8872c1540a799`  
**Baseline source contract:** 638 PASS / 0 FAIL  
**Specification date:** 22 October 2026

---

# 1. Executive decision

LEARN3F will complete the controlled Carrowmont Learn-improvement programme by filling genuine knowledge gaps in global macro, sovereign-debt, reserve-currency and central-bank-gold education.

The original Learn-library audit expected LEARN3F to improve existing Macro, Gold and Market Mechanics pages. Since that audit, however, Carrowmont has already materially strengthened much of this area through:

- the Market Chain Reaction Explorer and its seven supporting market-chain guides;
- the US Debt & Interest Cost Calculator;
- the Gold Macro Stress Explorer;
- the Silver Supply-Demand & Macro Stress Explorer;
- recent gold-cluster improvements;
- recent Stocks vs Bonds and other investing-foundation work.

Therefore LEARN3F must **not** rewrite those pages merely to satisfy an old roadmap label. Their recent content, search identities and freshness should be preserved.

The stronger remaining opportunity is to publish a small set of genuinely distinct, source-led educational resources that answer questions Carrowmont does not currently own and that can also function as legitimate link-worthy references.

LEARN3F will add seven new public Learn/reference pages in two controlled implementation batches:

- **LEARN3F-1:** real yields, US debt interest costs, Treasury maturity and reserve-currency foundations;
- **LEARN3F-2:** central-bank gold buying, de-dollarisation / dedollarization and gold-versus-government-bond reserve roles.

The central-bank-gold page will be the programme's strongest proposed **linkable research asset**, with reproducible charts and downloadable data based on authoritative or clearly identified institutional sources.

Search growth and backlink earning are desired outcomes of genuinely useful resources. They are not permission to create duplicate macro pages, sensational claims or mass content.

---

# 2. Scope

## LEARN3F-1 - Rates, sovereign-debt mechanics and reserve-currency foundations

Create four new pages:

1. `real-yields-explained.html`
2. `why-us-debt-interest-costs-matter.html`
3. `treasury-bills-vs-notes-vs-bonds.html`
4. `what-makes-a-global-reserve-currency.html`

## LEARN3F-2 - Central-bank gold and reserve diversification

Create three new pages:

5. `why-central-banks-buy-gold.html`
6. `de-dollarisation-explained.html`
7. `gold-vs-government-bonds-reserve-assets.html`

A fresh clean Source Snapshot is mandatory between LEARN3F-1 and LEARN3F-2.

`fiscal-dominance-explained.html` remains a **deferred candidate**. It should not be created during LEARN3F unless later search/user evidence shows that it serves a sufficiently distinct need.

---

# 3. Why these seven pages are genuinely distinct

Every proposed page must own a separate user question rather than repackage an existing Carrowmont article.

| Proposed page | Primary user question | Existing page/tool it must not duplicate |
|---|---|---|
| `real-yields-explained.html` | What is a real yield, how is it different from a nominal yield, and why does it matter? | `what-happens-to-gold-when-interest-rates-rise.html`, Gold Macro Stress Explorer |
| `why-us-debt-interest-costs-matter.html` | Why can higher borrowing costs make government interest expense rise over time? | US Debt & Interest Cost Calculator |
| `treasury-bills-vs-notes-vs-bonds.html` | How do Treasury maturity and duration change risk even when the issuer is the same? | `stocks-vs-bonds.html`, `what-happens-when-bond-yields-rise.html` |
| `what-makes-a-global-reserve-currency.html` | Why do central banks, institutions and markets use some currencies more than others? | `what-happens-when-dollar-strengthens.html` |
| `why-central-banks-buy-gold.html` | Why do reserve managers hold and buy gold, and what do the data actually show? | `gold-as-an-investment.html`, Gold Macro Stress Explorer |
| `de-dollarisation-explained.html` | Is the world moving away from the US dollar, and how should reserve-share data be interpreted? | `what-happens-when-dollar-strengthens.html`, reserve-currency foundations page |
| `gold-vs-government-bonds-reserve-assets.html` | Why can a central bank hold both gold and government bonds rather than treating them as substitutes? | `gold-vs-stocks.html`, `physical-gold-vs-gold-etf.html` |

If implementation discovers that a proposed page cannot maintain this distinction, improve an existing page instead and do not create a duplicate URL.

---

# 4. Maintenance-only pages during LEARN3F

The following current pages are recent and already structurally strong. They remain maintenance-only except for necessary contextual links to the new resources:

- `gold-as-an-investment.html`
- `gold-and-inflation.html`
- `gold-vs-stocks.html`
- `physical-gold-vs-gold-etf.html`
- `what-happens-to-gold-when-dollar-rises.html`
- `what-happens-to-gold-when-interest-rates-rise.html`
- `what-happens-when-bond-yields-rise.html`
- `what-happens-when-dollar-strengthens.html`
- `what-happens-when-fed-cuts-interest-rates.html`
- `why-do-stocks-fall-when-bond-yields-rise.html`
- `how-oil-prices-affect-inflation.html`
- `stocks-vs-bonds.html`
- `gold-macro-stress-explorer.html`
- `us-debt-interest-cost-calculator.html`
- `market-chain-reaction-explorer.html`
- `silver-vs-gold.html`
- `silver-supply-demand-macro-stress-explorer.html`

Implementation may add tightly relevant contextual links to these pages, but must not refresh their `dateModified` or sitemap `lastmod` unless their substantive public content truly changes.

---

# 5. Controlling Carrowmont standards

LEARN3F inherits rather than replaces:

- `.github/LEARN-ARTICLE-STANDARD.md`;
- current Article and Breadcrumb structured-data conventions;
- SEARCH1 privacy, indexing and local-search rules;
- the sitewide colon-capitalization rule;
- existing SEO3C US Debt & Interest Cost Calculator contracts;
- existing SEO3D Gold Macro Stress Explorer contracts;
- existing MCR1 Market Chain Reaction Explorer and supporting-guide contracts;
- existing gold/silver cluster search ownership;
- truthful `dateModified` / sitemap `lastmod` discipline;
- 1280 / 390 / 360 responsive QA discipline;
- Publisher -> merge -> live QA -> Multi-Repo Guard -> fresh Source Snapshot release discipline.

Before implementation, every proposed static title, H1, CTA and internal link must be searched against existing smoke tests and source-contract expectations.

If a new content preference conflicts with an active older architecture or QA contract, the older active contract wins until the conflict is explicitly reviewed.

---

# 6. Non-goals and safety boundaries

LEARN3F must not:

- forecast gold, the US dollar, Treasury yields, inflation, equity markets or a sovereign default;
- imply that central-bank buying guarantees higher gold prices;
- claim that central banks are abandoning the dollar merely because gold holdings rise;
- claim that the United States is insolvent or certain to default;
- describe US Treasury borrowing as literal Treasury `money printing`;
- imply that Federal Reserve asset purchases are automatically equivalent to direct deficit financing;
- present one subjective scenario probability as an objective fact;
- recommend a personal gold allocation, bond allocation, currency position or trade;
- tell households to imitate central-bank reserve portfolios;
- present de-dollarisation / dedollarization as synonymous with dollar collapse;
- mix COFER foreign-exchange-reserve shares with total official-reserve shares that include gold without explaining the different denominators;
- present market-value changes in reserve shares as if they were necessarily active purchases or sales;
- compare Treasury bills, notes and bonds without explaining maturity / duration differences;
- call gold a reliable short-term CPI hedge;
- imply that a positive real yield makes gold certain to fall;
- use current data without a visible source date;
- create country-specific doorway copies;
- use raw machine translation;
- create live browser requests to third-party data APIs that leak user activity or create availability/privacy dependencies;
- refresh unrelated page freshness;
- pad pages to hit arbitrary word counts.

---

# 7. Common editorial standard

Every new LEARN3F page must provide:

1. **Direct answer:** a plain-language answer close to the top.
2. **Mental model:** explain the economic mechanism before presenting detail.
3. **Worked illustration:** numbers only where they illuminate the mechanism.
4. **What can break the simple story:** show counterexamples and competing forces.
5. **Practical checklist:** what a reader should check before interpreting a headline or data point.
6. **Source transparency:** primary or authoritative institutional sources where available.
7. **Correct Carrowmont next step:** connect to the most relevant existing tool/explorer and related Learn pages.
8. **Educational boundary:** no individualized investment instruction.

Prefer simple words before specialist language. Terms such as real yield, term premium, duration, reserve currency, foreign-exchange reserves, reserve asset, refinancing, sanctions risk, custody risk and fiscal dominance must be explained before being used as shorthand.

---

# 8. Data and evidence standard

Macro content becomes untrustworthy quickly if it mixes dates, denominators or publication vintages. LEARN3F must therefore use a stricter evidence standard than ordinary evergreen Learn pages.

## 8.1 Source hierarchy

Prefer, where relevant:

- official central banks and finance ministries;
- IMF, BIS, World Bank, OECD and similar multilateral institutions;
- US Treasury / FiscalData, CBO, GAO and Federal Reserve sources for US fiscal/rate mechanics;
- ECB and other official reserve-analysis material;
- World Gold Council for industry gold-demand estimates, clearly identified as WGC estimates rather than government statistics;
- reputable institutional research only where primary data cannot answer the question.

Do not cite low-quality aggregator pages for figures that are available from a primary institution.

## 8.2 Publication-vintage discipline

When a series is subject to revision:

- show the source/publication date;
- state that historical estimates can be revised;
- do not silently combine revised and unrevised vintages as if they form one immutable accounting series;
- use `n/a` rather than invent a country/year figure that the chosen source does not reliably provide.

## 8.3 Denominator discipline

This is a permanent LEARN3F rule:

> IMF COFER is a foreign-exchange-reserve dataset and excludes monetary gold from the FX-reserve denominator. A chart or statistic that includes gold in total official reserves uses a different denominator and must not be directly compared without explanation.

## 8.4 Static first, not live-browser dependent

Public Learn pages should remain useful even if no external data service is available.

For data-backed resources:

- store reviewed reference data in the repository;
- show `data through` / `source date` prominently;
- generate charts from the same reviewed dataset used for downloadable CSV;
- do not fetch cross-origin data in the user's browser;
- use controlled PR-based reference updates if automation is later added;
- never allow an updater to overwrite hand-reviewed interpretation text automatically.

---

# 9. LEARN3F-1 page specifications

## 9.1 `real-yields-explained.html`

### Search intent

Primary: `real yields explained`, `what is a real yield`, `real vs nominal yield`.

### Required answer

Explain that a real yield measures return after accounting for inflation or expected inflation, depending on the measure. Distinguish:

- nominal yield;
- ex-post real return;
- market real yields from inflation-linked government securities;
- approximate nominal yield minus expected inflation mental model.

### Required lessons

- why real yields matter for borrowers, savers, bonds, equities and gold;
- why a positive real yield does not guarantee one asset will fall;
- why expected inflation is not the same as realized future inflation;
- why maturity matters;
- a simple illustration of 5% nominal yield with 3% inflation versus a 2% real-yield approximation;
- checklist for interpreting a `real yields rose` headline.

### Primary Carrowmont journey

Gold Macro Stress Explorer, with Market Chain Reaction Explorer as secondary context.

### Must not become

A duplicate of `what-happens-to-gold-when-interest-rates-rise.html`.

---

## 9.2 `why-us-debt-interest-costs-matter.html`

### Search intent

Primary: `US debt interest cost`, `why government interest expense rises`, `US debt service explained`.

### Required answer

Explain that the government's interest bill depends on the amount of debt, the rates paid across that debt, maturities/refinancing and future borrowing—not simply today's headline policy rate.

### Required lessons

- stock of debt versus annual deficit;
- old low-rate debt does not instantly refinance at today's rate;
- refinancing / maturity profile;
- effective interest rate versus a single Treasury yield;
- primary balance versus total deficit;
- debt-interest feedback without claiming inevitability;
- why debt-to-GDP alone does not answer affordability;
- transparent illustrative calculation, clearly not a federal forecast.

### Primary Carrowmont journey

US Debt & Interest Cost Calculator.

### Must not become

A static copy of calculator outputs or a prediction of US default.

---

## 9.3 `treasury-bills-vs-notes-vs-bonds.html`

### Search intent

Primary: `Treasury bills vs notes vs bonds`, `T-bills vs Treasury bonds`, `Treasury maturity risk`.

### Required answer

Explain that bills, notes and bonds are obligations of the same sovereign issuer but can behave very differently because of maturity and interest-rate sensitivity.

### Required lessons

- broad maturity categories without implying a fixed investor recommendation;
- coupon / discount mechanics in plain language;
- duration intuition;
- reinvestment risk versus price risk;
- inflation risk for nominal securities;
- why a short bill and a 30-year bond are not the same `safe asset` exposure;
- how rising yields can affect existing long-duration securities more strongly;
- checklist before comparing yields across maturities.

### Primary Carrowmont journey

Market Chain Reaction Explorer, with US Debt & Interest Cost Calculator and `stocks-vs-bonds.html` as secondary links.

### Must not become

A brokerage/product recommendation page.

---

## 9.4 `what-makes-a-global-reserve-currency.html`

### Search intent

Primary: `what is a reserve currency`, `what makes a currency a reserve currency`, `global reserve currency explained`.

### Required answer

Explain that reserve-currency status is an ecosystem, not simply a trade-invoicing habit.

### Required lessons

- convertibility and ability to move capital;
- depth and liquidity of safe-asset markets;
- legal/institutional confidence;
- payment, banking, derivatives and collateral networks;
- trade invoicing and network effects;
- economic scale versus financial-market openness;
- why bilateral trade settlement does not automatically create a replacement reserve currency;
- why reserve share can decline gradually without a `collapse`.

### Primary Carrowmont journey

Market Chain Reaction Explorer, with the dollar-strengthens Learn guide and Gold Macro Stress Explorer as related resources.

### Must not become

A political argument for or against any country/currency.

---

# 10. LEARN3F-2 page specifications

## 10.1 `why-central-banks-buy-gold.html`

### Role

This is the flagship LEARN3F authority/reference asset.

### Search intent

Primary: `why are central banks buying gold`, `central bank gold purchases`, `central bank gold reserves`.

### Required answer

Explain that central banks can hold gold for multiple reasons including diversification, crisis performance, long-term store-of-value characteristics, geopolitical/custody access risk and reduced dependence on another issuer's liability. Buying gold does not by itself prove an expectation of imminent US default or dollar collapse.

### Required evidence blocks

At minimum:

1. central-bank gold demand over time;
2. selected major buyer/seller examples with source-date caveats;
3. dollar reserve-share context;
4. gold's advantages and limitations as a reserve asset;
5. explicit distinction between reserve-manager objectives and household objectives.

### Linkable-asset requirement

The page should publish original Carrowmont chart presentation from reviewed source data, with:

- accessible HTML table equivalents;
- downloadable CSV for the underlying published series where licensing/terms permit;
- downloadable PNG chart versions for journalists/educators where appropriate;
- chart title, period, units, source and `data through` date embedded visibly;
- a methodology/source note explaining revisions and missing values.

The data should be repository-stored and auditable. Do not create a live browser dependency on WGC, IMF or other third-party APIs.

### Primary Carrowmont journey

Gold Macro Stress Explorer.

### Required household warning

A central bank manages national reserves, currency intervention capacity and sovereign liquidity. A household should not infer a personal gold allocation from central-bank portfolio behavior.

---

## 10.2 `de-dollarisation-explained.html`

### Search intent

Primary: `de-dollarisation explained`, `dedollarization explained`, `is the world moving away from the dollar`.

### Required answer

Explain the difference between:

- lower dollar share of disclosed FX reserves;
- higher gold holdings;
- non-dollar trade settlement;
- regional currency use;
- genuine displacement of dollar financial-market functions.

### Required lessons

- COFER denominator and valuation effects;
- currency-market moves can change reported shares without active portfolio switching;
- reserve diversification can coexist with continuing dollar dominance in trade finance, collateral and markets;
- gold diversification is not the same as another currency replacing the dollar;
- what evidence would be needed before claiming true displacement;
- a balanced `what would change the conclusion?` checklist.

### Spelling/search handling

The canonical page may use UK English `de-dollarisation`, consistent with Carrowmont house style, while static copy/search aliases should naturally include the common US spelling `de-dollarization` / `dedollarization` without stuffing.

### Primary Carrowmont journey

Gold Macro Stress Explorer, with `what-makes-a-global-reserve-currency.html` and the dollar-strengthens guide as supporting links.

---

## 10.3 `gold-vs-government-bonds-reserve-assets.html`

### Search intent

Primary: `gold vs government bonds reserve assets`, `why central banks hold gold and bonds`, `gold vs Treasuries reserves`.

### Required answer

Explain why gold and high-quality sovereign securities can be complements rather than perfect substitutes in an official reserve portfolio.

### Required lessons

Compare:

- issuer/default liability;
- yield/income;
- market liquidity;
- duration / interest-rate sensitivity;
- inflation sensitivity;
- collateral/payment utility;
- custody/jurisdiction/access risk;
- storage/operational friction;
- intervention usefulness.

Use a comparison table that clearly states that different governments/currencies carry different credit, currency, institutional and access risks.

### Primary Carrowmont journey

Gold Macro Stress Explorer, with US Debt & Interest Cost Calculator as a secondary analytical link.

### Must not become

A household portfolio-allocation recommendation or a claim that gold is universally safer than sovereign bonds.

---

# 11. Search ownership and SEARCH1

Current Snapshot 104 SEARCH1 inventory is **121 public pages**.

After LEARN3F-1, if all four approved pages ship, the reviewed inventory should become **125**.

After LEARN3F-2, if all three approved pages ship, the reviewed inventory should become **128**.

Each page must receive:

- one canonical URL;
- one distinct static title and meta description;
- one clear H1;
- a `guide` SEARCH1 entry;
- carefully chosen aliases that do not hijack an existing calculator or guide query;
- deterministic search fixtures for its intended query ownership.

Recommended aliases include, without keyword stuffing:

- `real yield`, `real interest rate`, `real vs nominal yield`;
- `US debt interest expense`, `government debt service`, `federal interest cost`;
- `T bills vs bonds`, `Treasury bills notes bonds`, `Treasury maturity`;
- `reserve currency`, `global reserve currency`;
- `central bank gold buying`, `official gold reserves`;
- `dedollarization`, `de-dollarization`, `de-dollarisation`;
- `gold vs Treasuries reserves`, `gold vs government bonds reserves`.

SEARCH1 privacy remains unchanged: no query values in URLs, cookies, storage or external search APIs.

---

# 12. Internal-link architecture

New links must be contextual and useful, not sitewide keyword plumbing.

## LEARN3F-1

- Real Yields <-> Gold When Interest Rates Rise <-> Gold Macro Stress Explorer.
- US Debt Interest Costs <-> US Debt & Interest Cost Calculator <-> Bond Yields guide.
- Treasury Bills/Notes/Bonds <-> Bond Yields guide <-> Stocks vs Bonds <-> Market Chain Reaction Explorer.
- Reserve Currency <-> Dollar Strengthens guide <-> De-Dollarisation (after LEARN3F-2).

## LEARN3F-2

- Central-Bank Gold <-> Gold Macro Stress Explorer <-> Gold as an Investment.
- De-Dollarisation <-> Reserve Currency <-> Dollar Strengthens <-> Central-Bank Gold.
- Gold vs Government Bonds <-> Central-Bank Gold <-> US Debt Interest Costs <-> Treasury Bills/Notes/Bonds.

Existing gold and market-chain articles should receive only the minimum contextual inbound/outbound links necessary to make the new cluster discoverable.

Do not turn the Learn hub or footer into a dense block of seven new macro links.

---

# 13. Linkable-research and backlink rules

LEARN3F is the first Learn batch explicitly designed to support Carrowmont's authority/backlink programme, but backlink goals may never lower editorial standards.

The flagship central-bank-gold asset should be pitchable because it contains something useful to cite:

- reviewed data;
- transparent methodology;
- original explanatory charts;
- downloadable data/chart assets;
- careful distinctions that reduce common misinformation.

Outreach should offer one relevant chart, dataset or explainer to a specific publication/resource page. Do not request generic `link to Carrowmont` placements.

No:

- paid ranking links;
- link farms;
- PBNs;
- automated guest-post spam;
- fabricated authors/credentials;
- invented statistics;
- reciprocal-link schemes at scale.

A link should still help a human reader if search engines did not exist.

---

# 14. Freshness and updating

## New pages

Use actual publication date in Article structured data and sitemap.

## Existing pages

Do not change freshness merely because a contextual link is added unless the public content is materially changed. If a small link-only adjustment does not justify a new review date, preserve the existing article date and follow the current sitemap discipline.

## Data-backed central-bank-gold asset

Separate:

- article `dateModified`;
- dataset `data through` date;
- source publication dates.

A new source-data observation does not automatically mean every paragraph was substantively reviewed. If the dataset is updated, the page should make the data date visible even when the editorial review date remains unchanged.

---

# 15. Structured data and trust

Each new page must use the established Carrowmont Article + Breadcrumb pattern and connect to the existing site/organization identity.

The research-style central-bank-gold page must additionally make source/methodology information prominent in visible HTML. Structured data must not claim:

- professional investment advice;
- a financial analyst credential not held by a real author/reviewer;
- live data if the page uses repository-stored reference data;
- a forecast or recommendation.

Do not fabricate an author persona. Use the established Carrowmont editorial identity and trust pages.

---

# 16. QA preflight before implementation

This section is mandatory because earlier Learn batches demonstrated that strong new content can still conflict with older smoke contracts.

Before modifying public files for either LEARN3F implementation batch:

1. search `carrowmont-qa/tests` for every target page name and expected H1/title/CTA;
2. search `scripts/source-contract.mjs` for every related macro/gold/debt contract;
3. inspect runtime localization/heading transformations;
4. inspect current SEARCH1 query ownership;
5. confirm existing static titles/H1s on maintenance-only pages will not be rewritten accidentally;
6. identify any shared JavaScript that could alter runtime headings or metadata;
7. validate old tests and new tests together before packaging.

Do not patch only the most recent failing assertion.

---

# 17. Required implementation QA

Each production batch must protect at least:

## Static/source

- canonical URL;
- exactly one H1;
- Article + Breadcrumb structured data;
- static title/meta boundaries;
- intended sitemap membership/date;
- no accidental `noindex`;
- internal links resolve;
- SEARCH1 inventory/fixture ownership;
- one legacy Learn depth/rich structure where required by the current article standard;
- no unapproved external browser data calls.

## Content contracts

- page-specific required distinctions from this specification;
- no forecast/recommendation language;
- source date / data date present where current figures appear;
- COFER/gold denominator distinction protected on relevant pages;
- `Treasury borrowing != Treasury money printing` distinction protected where relevant;
- central-bank objective != household objective distinction protected on gold-reserve pages.

## Deterministic mathematics

Where worked examples use arithmetic, QA should independently recalculate rather than only compare printed strings.

## Browser

Run at minimum:

- 1280 desktop;
- 390 mobile;
- 360 mobile.

Check:

- no horizontal overflow;
- tables remain usable;
- chart/table fallback is accessible;
- download links work where present;
- contextual CTAs and return links resolve;
- no runtime title/H1 drift against approved page identity;
- no duplicate strict-mode selectors based on phrases that legitimately occur more than once.

---

# 18. Release model

## Specification release

This document only:

- repository: `draw004.github.io`;
- expected PR count: **1**;
- no public page, sitemap, QA, workflow or runtime changes.

## LEARN3F-1 implementation

Expected repositories:

1. `draw004.github.io`;
2. `carrowmont-qa` last.

Then live QA -> Multi-Repo Guard -> fresh Source Snapshot.

## LEARN3F-2 implementation

Start only from the fresh clean post-LEARN3F-1 snapshot.

Expected repositories:

1. `draw004.github.io`;
2. `carrowmont-qa` last.

Then live QA -> Multi-Repo Guard -> fresh Source Snapshot.

---

# 19. Indexing plan

## Specification release

No public URL changes. Submit **nothing** manually to Google. No manual Bing action.

## LEARN3F-1 / LEARN3F-2

For each successful implementation batch:

- request Google indexing for **new public URLs only after they are live and QA/Guard are green**;
- allow IndexNow to notify Bing/participating engines;
- do not repeatedly resubmit unchanged pages;
- only request re-indexing for an existing maintenance page if it received a genuine substantive content change.

---

# 20. Final programme closeout after LEARN3F

After LEARN3F-2 and its clean snapshot, perform one final Learn-library closeout rather than another broad rewrite:

1. whole-library canonical/title/H1/structured-data consistency review;
2. SEARCH1 query-ownership and cannibalisation review;
3. contextual internal-link review;
4. freshness/date audit;
5. final broken-link and responsive QA;
6. verify the authority/linkable-research assets are discoverable;
7. record Google/Bing indexing actions;
8. stop broad editorial rewriting and move to measurement-led maintenance using Search Console, Bing performance and real user/search demand.

---

# 21. Definition of done

LEARN3F is complete only when:

- all seven approved pages are live or deliberately rejected for documented overlap reasons;
- no existing search identity was cannibalized;
- the central-bank-gold asset exposes transparent, dated and reproducible evidence;
- SEARCH1 inventory and deterministic fixtures match the actual public set;
- static metadata, runtime H1s and old smoke contracts agree;
- staged Publisher, live Automated QA and Multi-Repo Guard are green;
- a fresh Source Snapshot is captured;
- the final Learn closeout is completed;
- indexing actions are limited to materially new/changed public URLs;
- continuity documentation records the final state.

The success criterion is not `more articles`. It is a smaller set of macro resources that are accurate, distinct, understandable, internally connected and useful enough to deserve discovery and citation.

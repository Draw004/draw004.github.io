# CARROWMONT SEARCH1 — GLOBAL SITE SEARCH IMPLEMENTATION

## Production implementation record

**Status:** Production implementation prepared for protected Publisher release  
**Authoritative baseline:** Carrowmont Source Snapshot 88  
**Snapshot generated:** 2026-10-20T08:26:18Z  
**Main-site baseline commit:** `3f9cf35a62bcec2c6911cca371b05cb90bbb92a9`  
**Central-QA baseline commit:** `a460fb5335d36d995c3abc91643b894e7a39a539`  
**Implementation date:** 20 October 2026

---

## 1. What SEARCH1 adds

SEARCH1 adds one privacy-first Carrowmont search experience across the current public content library.

The implementation includes:

- a dedicated `/search.html` utility page;
- a compact Search entry in the main-site desktop and mobile navigation;
- embedded search on `/learn.html`;
- embedded search on `/tools.html`;
- one static same-origin search index covering all 113 current sitemap URLs;
- reviewed global and country-aware terminology aliases;
- deterministic matching and ranking with no machine-learning or external search service;
- central browser and source-contract QA.

The feature searches current calculators, decision tools, Learn guides and important Carrowmont trust pages.

---

## 2. Privacy architecture

SEARCH1 treats a typed money question as sensitive user context.

V1 follows these boundaries:

- the query remains in page memory only;
- the query is not added to the URL query string or fragment;
- the query is not written to localStorage or sessionStorage;
- the query is not stored in cookies;
- the query is not included in analytics events;
- the query is not sent to Google, Bing, Algolia, an AI provider or another external search service;
- the only application data requests are same-origin requests for the static search index and reviewed alias library.

Cloudflare aggregate page-view analytics remains under the established Carrowmont privacy architecture. SEARCH1 does not attach the typed words to those page views.

**No external search API is used.**

---

## 3. Search-engine safety

`/search.html` uses:

```html
<meta name="robots" content="noindex,follow">
```

The page has one stable canonical URL and does not create query-specific URLs.

It is intentionally omitted from `sitemap.xml` because it is a user utility, not a search-engine landing page.

All important tools and guides remain available through ordinary crawlable links in the Tools directory, Learn hub and contextual pages. SEARCH1 adds discovery; it does not replace the existing information architecture.

---

## 4. Local and country-aware terminology

The reviewed alias system connects common wording without creating country doorway pages.

Examples include:

- SIP ↔ systematic / recurring / regular investment;
- EMI ↔ loan payment / repayment / instalment / installment;
- home loan ↔ mortgage;
- deposit ↔ down payment;
- balance transfer ↔ refinance ↔ remortgage;
- prepayment ↔ overpayment ↔ early payoff ↔ extra repayment;
- SWP ↔ systematic withdrawal plan ↔ retirement withdrawal ↔ drawdown;
- corpus ↔ retirement savings / fund / portfolio.

Country selection may boost familiar local terms. Currency selection alone does not change a term's meaning.

---

## 5. Deterministic search engine

The search engine uses transparent, deterministic scoring.

Ranking considers:

1. exact title and alias matches;
2. phrase matches;
3. complete token matches;
4. safe prefix and singular/plural matching;
5. keywords, descriptions and categories;
6. tool-versus-guide intent;
7. reviewed priority only as a tie-breaker.

Aggressive fuzzy matching is deliberately excluded so an unrelated financial topic is not presented as a close answer.

A deterministic fixture script protects the initial high-value terms: SIP, recurring investment, EMI, remortgage, SWP, home loan, budgeting, ETF and nonsense/empty-state behavior.

---

## 6. Search inventory and build process

The index is built from:

- `data/carrowmont-search-pages.json` — reviewed public-page inventory;
- `data/carrowmont-search-aliases.json` — reviewed synonym and locale terminology groups;
- `scripts/build-search-index.mjs` — deterministic validator and generator;
- `data/carrowmont-search-index.json` — committed runtime index.

The build script verifies:

- schema version;
- required fields;
- duplicate canonical URLs;
- exact parity with current sitemap URLs;
- internal/release paths are excluded;
- stable ordering;
- current index is not stale;
- index remains below the 250 KB V1 target;
- optional staged-file and canonical verification through `SEARCH_SITE_ROOT`.

---

## 7. Accessibility and mobile behavior

SEARCH1 provides:

- a visible input label;
- native keyboard and touch controls;
- a live result-count announcement;
- Escape-to-clear behavior;
- clear focus styles;
- no placeholder-only labelling;
- no modal focus trap;
- reduced-motion support;
- 1280, 390 and 360 px overflow protection;
- a no-JavaScript route back to Tools and Learn.

---

## 8. Controlled repository scope

This production release changes only:

1. `draw004.github.io` — public search UI, index, build script, Learn/Tools integration, privacy disclosure and implementation documentation;
2. `carrowmont-qa` — SEARCH1 source contract, route inventory and browser QA.

It does not change any calculator formula, report formula, country/currency engine, PDF engine or workflow file.

Central QA must merge last.

---

## 9. Validation and release gates

Required release sequence:

1. exact manifest/base/new hash checks;
2. JavaScript syntax checks;
3. deterministic SEARCH1 fixtures;
4. generated-index freshness check;
5. central source contract;
6. staged browser and 1280/390/360 layout QA in Publisher;
7. main-site PR merge;
8. central-QA PR merge last;
9. live Automated QA;
10. Multi-Repo Guard;
11. fresh Source Snapshot.

---

## 10. Follow-up boundary

SEARCH1 does not publish the eight LEARN2A articles.

After SEARCH1 is stable and a new clean snapshot is taken, Carrowmont can build **LEARN2A-1** first in simple language:

- How to Make a Budget;
- Investing for Beginners;
- What Is an ETF?;
- Index Funds Explained.

The search index architecture is ready to add those pages once they are real, canonical and included in the sitemap. It must never link to planned or nonexistent articles.

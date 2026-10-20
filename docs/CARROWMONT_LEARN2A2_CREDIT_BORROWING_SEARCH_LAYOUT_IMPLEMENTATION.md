# CARROWMONT LEARN2A-2 — CREDIT, BORROWING & SEARCH-PAGE LAYOUT IMPLEMENTATION

**Implementation baseline:** Carrowmont Source Snapshot 90  
**Status:** Production implementation prepared for protected Publisher validation  
**Repositories:** `draw004.github.io` and `carrowmont-qa`

## 1. Purpose

This controlled release combines two owner-approved improvements:

1. publish the remaining four LEARN2A evergreen guides about credit and borrowing; and
2. refine the SEARCH1 page after live Chrome and Edge review showed that the hero used too much vertical space and placed the primary search action too low.

The release keeps the current Carrowmont design. It does not redesign Search, alter calculator mathematics or introduce a third-party search service.

## 2. Search-page layout refinement

The search utility remains at `/search.html` and remains privacy-first, local and `noindex,follow`.

The layout change:

- reduces excessive hero padding;
- keeps the Search Carrowmont identity prominent without using a large empty hero;
- pulls the search card upward so the input and button are visible above the fold on a normal 900-pixel-high desktop viewport;
- preserves the existing search heading, suggestions, result filters and privacy explanation;
- avoids decorative filler that does not help the user;
- uses fluid rather than fixed hero height;
- stacks the search button below the input at narrow mobile widths;
- protects 1280, 390 and 360 px layouts.

No search words are placed in URLs, cookies, browser storage or external analytics. No external search API is added.

## 3. LEARN2A-2 public guides

This release adds:

1. `/credit-score-explained.html`
2. `/debt-consolidation-explained.html`
3. `/how-credit-card-interest-works.html`
4. `/apr-vs-interest-rate.html`

Every guide uses simple language and includes:

- a direct answer near the beginning;
- a clear explanation of unfamiliar terms;
- a worked example or cost comparison;
- practical questions to ask before acting;
- common mistakes or limitations;
- primary or authoritative sources;
- visible publication/review information and the Editorial Policy;
- Article and Breadcrumb structured data;
- a relevant Carrowmont calculator journey;
- educational-use and country-rule cautions.

The universal lesson stays the same across countries. Existing declarative localization adapts currency examples, while the content explains that credit-reporting, disclosure, grace-period and lending rules can differ locally. The release does not create country doorway pages and does not claim universal score ranges, lender approval or guaranteed debt savings.

## 4. Search and discovery

The four guides are added to the Learn hub under the existing `loans` category, whose visible heading becomes **Credit, Loans & Debt**. Contextual links are added only from closely related existing guides.

SEARCH1 expands from 117 to **121 reviewed public pages**. It gains reviewed ownership for credit score, credit rating, debt consolidation, credit-card interest and APR-versus-rate searches.

The sitemap receives one canonical URL and current `lastmod` for each guide. The existing IndexNow and Google Search Console follow-up process remains unchanged.

## 5. Out of scope

This release does not:

- change any calculator formula, result or report;
- rank lenders, credit bureaus, cards, loans or debt products;
- calculate a credit score;
- claim eligibility, approval or guaranteed savings;
- implement country-specific legal advice;
- add login, account storage, financial-data collection or AI advice;
- create a new homepage core card;
- implement LEARN2B or another calculator.

This release does not implement LEARN2B.

## 6. QA and release discipline

Central QA protects:

- unique titles, H1s, canonicals and Article identities;
- simple-language depth and source links;
- country-aware examples and universal direct answers;
- Learn-hub, sitemap, contextual-link and SEARCH1 discovery;
- 121-page sitemap/search-index parity;
- compact Search layout and above-fold visibility;
- 1280, 390 and 360 px overflow safety;
- privacy boundaries and existing Search behavior.

Publisher must be GREEN before PRs are created. Merge `draw004.github.io` first and `carrowmont-qa` last, then run Pages, Automated QA, Multi-Repo Guard and a fresh Source Snapshot.

# Carrowmont Batch 12 SEO and indexing closeout

**Review date:** 22 November 2026  
**Authoritative source baseline:** `carrowmont-source-snapshot - 2026-11-22T174649.594.zip`  
**Baseline Main commit:** `42490249c81017770ae299d695e11aeab2946d0e`  
**Baseline QA commit:** `8a6c2258adf640b76d0e44e5ffb3f9406a6775c4`  
**Baseline snapshot SHA-256:** `b6a6dc4f40b33a1c531174525cd60df3c480fefe444773e866e02a898889332c`

## Purpose

Close Batch 12 search-discovery work without creating duplicate URLs or a second submission mechanism. This review reconciles sitemap freshness, confirms the intentional internal-search indexing boundary, documents the selective Google Search Console queue, reconciles the current Google/Bing console evidence supplied on 22 November 2026, and preserves the existing IndexNow flow for Bing and other participating engines.

No calculator formula, financial engine, saved plan, account schema, Search ranking rule, public URL or workflow is changed by this closeout.

## Source audit result

- Public Search inventory: **145 unique URLs**.
- XML sitemap: **145 unique canonical URLs**.
- Every sitemap URL resolves to a source page in the 11-repository snapshot.
- Every sitemap page is indexable and its canonical URL matches the sitemap URL.
- `search.html` remains `noindex,follow` and is absent from both the sitemap and public Search inventory.
- The other intentional Main-site noindex pages are `404.html` and `newsletter-confirmed.html`; neither is in the sitemap.
- No sitemap URL is intentionally noindex.

## Current Google / Bing console evidence reviewed before release

The owner supplied current Google Search Console and Bing Webmaster Tools evidence before running this closeout package. This evidence does not require another public-page change, but it changes the manual follow-up queue and adds explicit guardrails.

### Google Search Console

- Current overview: **139 indexed / 11 not indexed** across all known pages in the supplied report.
- Three `Page with redirect` examples are non-canonical root variants (`https://www.carrowmont.com/`, `http://carrowmont.com/`, `http://www.carrowmont.com/`). These should continue redirecting to the canonical HTTPS non-www home page; a failed validation for those redirects is not a reason to remove the redirects.
- `https://carrowmont.com/search.html` is the one supplied `Excluded by noindex` example. This is intentional and should remain `noindex,follow`.
- Five supplied `Crawled - currently not indexed` examples are research support assets (`.md`, `.json`, `.csv`). They are not submitted in the sitemap and are not intended search-result landing pages. Do not request indexing merely to make the report green.
- `https://carrowmont.com/rent-vs-buy-home.html` is a legitimate indexable Learn page shown as `Discovered - currently not indexed`. It is already canonical, internally linked and in the sitemap, so it is added to the selective manual Google queue below.
- The screenshots show 11 non-indexed pages across 5 reasons, while the supplied detail screenshots account for 10 URLs across 4 visible reasons. One remaining reason/URL is therefore not identified by the supplied evidence and should be reviewed in Search Console after this release rather than guessed at.

### Bing Webmaster Tools

- Supplied Site Explorer overview: **168 URLs, 159 indexed, 1 warning, 8 excluded**.
- The supplied CSV contains 123 rows: 114 HTTP 200, 3 HTTP 301, 2 HTTP 404, 1 HTTP 304 and 3 rows reported with HTTP code 0.
- The two supplied 404 URLs are `https://carrowmont.com/planner.html` and `https://carrowmont.com/faq.html`. Both have 0 clicks, 0 impressions and 0 backlinks in the supplied export. The authoritative routes are under `/retirement-calculator/`; the two root-level URLs are not in the sitemap, not in Carrowmont Search inventory and have no internal source references. Keep them as 404s rather than creating speculative redirects solely to remove a Bing warning.
- `search.html` remains intentionally excluded. The existing IndexNow mechanism remains the correct Bing freshness path.

## Sitemap freshness corrections in this closeout

The following pages were materially changed during Batch 12 but still carried older sitemap dates. Their `lastmod` values are reconciled to the dates of their last significant Batch 12 updates.

| URL | Corrected lastmod | Batch 12 reason |
|---|---:|---|
| `https://carrowmont.com/` | 2026-11-18 | Batch 12 homepage Ask/navigation/presentation closeout |
| `https://carrowmont.com/learn.html` | 2026-11-20 | Learn Wave 1 placement plus Search/Learn discovery updates |
| `https://carrowmont.com/tools.html` | 2026-11-21 | Search/Tool hierarchy and Short-Term Savings discovery route |
| `https://carrowmont.com/ask-carrowmont.html` | 2026-11-22 | Search/Ask hierarchy plus Batch 12B decision journeys |
| `https://carrowmont.com/my-carrowmont.html` | 2026-11-22 | Explainable Opportunities / decision prompts |
| `https://carrowmont.com/emergency-fund-runway-calculator.html` | 2026-11-21 | Short-Term Savings Comparison |
| `https://carrowmont.com/financial-independence/` | 2026-11-22 | Early-retirement scenarios |
| `https://carrowmont.com/mortgage-payoff-calculator/` | 2026-11-22 | Prepay / recast / refinance decision routing |
| `https://carrowmont.com/mortgage-payoff-calculator/decision-centre.html` | 2026-11-22 | Three-path mortgage decision comparison |

Other Batch 12 URLs already carry current significant-update dates in the sitemap and are not rewritten merely to make them look newer.

## Google Search Console - selective manual queue after this closeout is green

Request indexing only after this closeout is merged, deployed QA/Guard are green and a fresh Source Snapshot becomes authoritative. URL Inspection requests are discovery/recrawl requests; they do not guarantee indexing or ranking.

### Priority A - new or substantially rewritten Learn pages

1. `https://carrowmont.com/mutual-funds-explained.html`
2. `https://carrowmont.com/pay-off-debt-or-invest.html`
3. `https://carrowmont.com/balance-transfer-credit-card.html`
4. `https://carrowmont.com/where-to-keep-short-term-savings.html`
5. `https://carrowmont.com/what-to-do-with-a-lump-sum.html`
6. `https://carrowmont.com/early-retirement-planning.html`
7. `https://carrowmont.com/how-much-save-for-retirement-each-month.html`
8. `https://carrowmont.com/planning-life-goals.html`

### Priority B - materially changed decision/tool pages

9. `https://carrowmont.com/budget-cash-flow-planner/credit-card-payoff-calculator.html`
10. `https://carrowmont.com/emergency-fund-runway-calculator.html`
11. `https://carrowmont.com/mortgage-payoff-calculator/`
12. `https://carrowmont.com/mortgage-payoff-calculator/decision-centre.html`
13. `https://carrowmont.com/mortgage-refinance-break-even.html`
14. `https://carrowmont.com/financial-independence/`

### Priority C - currently discovered but not indexed

15. `https://carrowmont.com/rent-vs-buy-home.html`

This page is already canonical, internally linked and present in the sitemap. The current Search Console evidence shows it as `Discovered - currently not indexed`, so inspect it and request indexing after this closeout is green.

The Home, Tools, Learn, Ask and My Carrowmont hub/app pages remain indexable and receive accurate sitemap freshness where applicable, but manual Google requests are lower priority than the 15 pages above. Normal crawling, internal links and the sitemap are sufficient unless Search Console later shows a specific crawl/indexing problem.

## Do not request Google indexing for internal Search

`https://carrowmont.com/search.html` intentionally remains `noindex,follow`.

This is an internal site-search utility. It remains available to users and crawlers can follow its links, but it should not compete with the underlying Tool/Learn pages in search results. Do not remove the noindex directive merely because Search Console reports it as excluded.

## Bing and participating engines

Carrowmont already has one IndexNow implementation. Keep that mechanism; do not add a second one. The existing workflow can notify Bing and other participating engines when public URLs are added or materially updated. Bing Webmaster Tools / IndexNow history may be used to verify receipt and crawl/index status where useful.

A Bing `NOINDEX` issue is not automatically a defect. In this source baseline the intentional noindex pages are Search, the 404 page and the newsletter-confirmation page, and none is submitted in the sitemap.

## External guidance reviewed

- Google Search Central: sitemap `lastmod` should represent the last significant page update and remain consistently accurate; pages that should not appear in Search should not be included in sitemaps.
- Bing Webmaster Tools: list canonical URLs, keep sitemap freshness accurate, and use IndexNow when URLs are added, updated or removed. `NOINDEX` is honored.

## Acceptance

This closeout is complete only after:

1. Publisher staged validation is green.
2. Main and QA PRs are reviewed and merged.
3. Deployed automated QA and Multi-Repo Guard are green.
4. A fresh all-green Source Snapshot is generated.
5. The 15 selective Google URLs above are inspected/submitted as appropriate, including the currently discovered-but-not-indexed Rent vs Buy guide.
6. Bing/IndexNow receipt is allowed to continue through the existing mechanism; no duplicate submission system is introduced.

Batch 13 and repository branch-backlog cleanup remain deferred until separately resumed by the owner.

## IndexNow dry-run verification

Using the existing `scripts/indexnow-submit.mjs` with target date `2026-11-22`, one-day lookback and dry-run mode prepared **10 URLs** without sending a network request:

- `https://carrowmont.com/ask-carrowmont.html`
- `https://carrowmont.com/early-retirement-planning.html`
- `https://carrowmont.com/emergency-fund-runway-calculator.html`
- `https://carrowmont.com/financial-independence/`
- `https://carrowmont.com/mortgage-payoff-calculator/`
- `https://carrowmont.com/mortgage-payoff-calculator/decision-centre.html`
- `https://carrowmont.com/mortgage-refinance-break-even.html`
- `https://carrowmont.com/my-carrowmont.html`
- `https://carrowmont.com/tools.html`
- `https://carrowmont.com/what-to-do-with-a-lump-sum.html`

This confirms the existing automation can cover the recent freshness window after deployment. Older Batch 12 pages retain their truthful historical `lastmod` dates rather than being falsely stamped as new merely to force resubmission.

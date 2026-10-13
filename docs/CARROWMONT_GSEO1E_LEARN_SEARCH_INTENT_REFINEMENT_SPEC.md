# CARROWMONT GSEO1E — Learn Search-Intent Refinement

**Release baseline:** Source Snapshot 57 (2026-10-13)  
**Evidence window:** Google Search Console export through 2026-10-10 plus the GSEO1A query-ownership baseline

## Objective

Refine a small set of existing Learn pages around query families already visible in Search Console, while preserving one primary URL per intent and avoiding title churn on pages that are already well aligned.

This release does not create new Learn pages. The current Search Console sample is still early, so GSEO1E changes only clear wording mismatches or missing clarifications supported by the observed query families.

## Evidence and decisions

### Zero-based budgeting

- Page-level GSC: **152 impressions** in the baseline export.
- Query-level demand includes `zero based budgeting` (26 impressions), `what is zero based budgeting` (11), and the observed variants `what is zero-sum budgeting` (14) and `zero sum budget` (5).
- The existing title and H1 already own the correct informational intent and therefore remain unchanged.
- A short FAQ clarification routes readers who arrived with “zero-sum” or “zero-balance” wording back to the actual zero-based-budgeting concept without creating a duplicate page or claiming the bank balance should be zero.

### Asset allocation

- Page-level GSC: **91 impressions**.
- Query-level demand includes `what is asset allocation` (32), `asset allocation` (30), `assets allocation` (9), `define asset allocation` (3), and `how does asset allocation work` (4).
- The H1 already asks the right question, but the document title was the less explicit `Asset Allocation Explained`.
- Search title becomes **What Is Asset Allocation? How It Works | Carrowmont** and the description is rewritten as a concise definition-first snippet. The page remains the definition / portfolio-allocation owner.

### Diversification across asset classes

- Page-level GSC: **61 impressions**.
- Query-level demand includes `asset class diversification` (13), `diversification across asset classes` (9), `asset diversification` (8), `diversification vs asset allocation` (4), and `how is asset allocation different from diversification` (3).
- The existing title and H1 already own the diversification intent and remain unchanged.
- A focused FAQ explains the distinction between diversification and asset allocation and links to the separate asset-allocation definition page. The two pages remain distinct rather than being merged into one broad target.

### Emergency fund sizing

- Page-level GSC: **29 impressions**.
- Query-level demand includes `how much emergency fund should i have` (4), `how many months should an emergency fund last` (3), `how much should an emergency fund be` (3), and related variants.
- The GSEO1A ownership baseline already defined the primary intent as **How much emergency fund should I have?**
- The page’s search title, H1 and Article/Breadcrumb naming are aligned from “should you keep” to **should you have**. The underlying article content and Budget/Goal ownership remain unchanged.

### Monthly investment amount for a goal

- Page-level GSC: **10 impressions**.
- Query-level demand includes `how much should i invest per month` (3), `how much to invest each month` (3), and `how much should i invest each month` (2).
- The title changes from `How Much to Invest Each Month for a Goal` to **How Much Should You Invest Each Month?** so the search title matches the observed informational question. The H1, body and Goal Planner handoff continue to bound the article around investing toward a defined goal.
- The page must not target `monthly investment calculator`; the SIP / Investment Calculator remains the calculator-intent owner and the Goal Planner remains the page’s primary interactive handoff.

## Explicit hold decisions

GSEO1E intentionally does **not** rewrite the following pages:

- `silver-vs-gold.html` — 94 impressions at an unusually strong early average position (~7.65); the GSEO1A baseline explicitly says not to overfit without page-query filtering.
- `physical-gold-vs-gold-etf.html` — title and H1 already match the observed comparison intent.
- `pay-yourself-first-budgeting.html` — title/H1 already match the observed definition / method queries.
- `how-much-should-i-save-each-month.html` — title/H1 already match the observed question.
- `budgeting-by-pay-frequency.html` — already earned a click and remains a useful globally localized support page.

No new “content-gap” page is justified by this early Search Console sample.

## Locked behavior

This release does **not** change:

- any calculator formulas, inputs, outputs, defaults, reports or PDF generation;
- calculator localization, currency handling or country terminology;
- calculator titles, H1s or canonical URLs;
- any Learn canonical URL;
- the seven-core-tool homepage composition;
- Mortgage Decision Centre product status;
- workflow files or repository permissions.

## Sitemap and freshness

Only the five Learn pages actually changed in GSEO1E receive `lastmod` **2026-10-13**. Their visible / structured modified dates are also refreshed where the existing page template exposes them.

## QA contract

Central QA must verify:

1. asset allocation owns the definition query with the approved search title and definition-first description;
2. zero-based budgeting keeps its existing primary title/H1 and contains the observed-query clarification;
3. diversification keeps its own title/H1 and explicitly distinguishes itself from asset allocation with a contextual link;
4. emergency-fund wording is consistently aligned to “should you have” in title, H1, Article headline and breadcrumb;
5. the monthly-investing page asks “How Much Should You Invest Each Month?” in search presentation while the H1/body still frame the answer around a financial goal, hand off to the Goal Planner and avoid calculator intent;
6. only the five changed Learn URLs receive GSEO1E sitemap freshness;
7. changed pages remain mobile-safe at 390 px and 360 px.

## Release scope

Expected Publisher output: **2 PRs**, merged in this order:

1. `draw004.github.io`
2. `carrowmont-qa` last

After merge: Pages → Automated QA → Multi-Repo Guard → fresh Source Snapshot.

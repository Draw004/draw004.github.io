# CARROWMONT GSEO1C — Trust + Structured Data Foundation

Release baseline: Snapshot 54 (2026-10-13).

## Objective

Strengthen Carrowmont's machine-readable site identity and user-visible trust foundation without changing calculator mathematics, input defaults, reports, localization behavior, URLs, or established product headings.

## Changes

1. The domain homepage now publishes one connected JSON-LD graph for the Carrowmont `WebSite` and `Organization` entities. The website is identified as `https://carrowmont.com/#website`; the publisher is identified as `https://carrowmont.com/#organization`.
2. The seven core calculator entry points use consistent `WebApplication` identity, reference the domain-level website and publisher entities, and include `BreadcrumbList` markup.
3. The Retirement overview no longer declares a subdirectory-level `WebSite`; it is correctly described as a `WebPage` within the domain-level Carrowmont website.
4. The Mortgage Payoff / Home Loan Prepayment calculator receives `WebApplication` and breadcrumb structured data for the first time.
5. `tools.html` is connected to the same website entity and gains breadcrumb markup while preserving the existing 12-item tool directory.
6. `about.html` and `methodology.html` gain page-level structured data and clearer publication/validation transparency.
7. A new `/editorial-policy.html` explains educational purpose, calculator/content standards, source handling, release checks, professional-review labels, corrections and updates. No expert reviewer or credential is claimed unless it actually exists.
8. The sitemap adds the editorial policy and refreshes only pages materially changed by this release.
9. Central QA protects the identity graph, trust-page contract, core-tool structured data, retirement WebSite correction and sitemap freshness.

## Locked behavior

This release does **not** change calculator formulas, result logic, input values, reports, country/currency behavior, product URLs, primary navigation behavior, or established visible calculator H1/product labels.

## Search guidance basis

The implementation follows current Google Search Central guidance that domain-level `WebSite` structured data belongs on the site homepage, organization markup helps Google understand the publisher, and breadcrumbs can describe a page's position in site hierarchy. `WebApplication` markup is kept factual and does not fabricate ratings or professional endorsements.

Primary references:
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://developers.google.com/search/docs/appearance/structured-data/software-app

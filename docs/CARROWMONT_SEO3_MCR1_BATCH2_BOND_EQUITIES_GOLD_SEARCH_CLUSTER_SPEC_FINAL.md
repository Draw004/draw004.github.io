# CARROWMONT SEO3-MCR1 BATCH 2 — BOND YIELDS, EQUITIES & GOLD SEARCH CLUSTER

## Specification — FINAL

**Date:** 15 October 2026  
**Authoritative baseline:** Carrowmont Source Snapshot 69  
**Main-site baseline commit:** `0d9ee6e436660d00a6ce0bc6859363da8031ce53`  
**Central-QA baseline commit:** `d96117032795c0fc2a4aa1d978747d37b946e334`

## 1. Objective

Deepen the Market Chain Reaction authority layer around the highest-priority post-Explorer search cluster: bond yields → stocks / gold / dollar. Batch 2 adds focused pages for three distinct questions that are too specific to be fully owned by the broad Batch-1 guides.

## 2. New canonical pages

- `/why-do-stocks-fall-when-bond-yields-rise.html`
- `/what-happens-to-gold-when-interest-rates-rise.html`
- `/what-happens-to-gold-when-dollar-rises.html`

Each page must independently answer its query, remain useful without JavaScript, exceed the current Learn regression-depth floor, cite authoritative sources, include a Chain Breaker and link to a reviewed Explorer state.

## 3. Search-intent ownership

The existing `/what-happens-when-bond-yields-rise.html` remains the broad owner for the overall event. The new stock page owns the narrower equity-transmission question. The existing `/what-happens-when-dollar-strengthens.html` remains the broad owner for dollar effects, while the new gold page owns the dollar-to-gold relationship. The new rates/gold page owns the policy-rate / real-yield search question. No duplicate canonical or fragment page is created.

## 4. Editorial rules

- Fixed-rate bond price/yield mechanics may be described as mechanical; equity and gold reactions may not.
- Policy rate, nominal bond yield, real yield and borrowing cost remain distinct terms.
- Higher yields/rates are not described as proof of a crash.
- Higher real yields may be described as a usual gold headwind, not a guarantee.
- A stronger U.S. dollar may be described as a usual USD-gold headwind, not a fixed inverse law.
- Local-currency gold translation is separated from the market relationship between USD gold and a dollar index.
- No buy/sell signal, price target, probability or personalized allocation advice.

## 5. Evidence standard

Use primary/high-authority material, including Federal Reserve, Investor.gov, IMF and BIS, plus World Gold Council research where specialist gold-market evidence is needed. Schwab research may support the current equity/yield explanation but must not be treated as a universal rule.

## 6. Internal-link network

The Learn macro category and Market Chain Reaction Explorer must expose all three pages. Relevant existing authority pages must link down into the focused content: broad bond-yield guide, broad dollar guide, Stocks vs Bonds, Gold as an Investment and Gold Macro Stress Explorer. New pages must cross-link to each other and to the broader guides.

## 7. UX / localization

Reuse the current Learn Article Standard and Market Chain Learn styling. Global static HTML must avoid India-only money units or terminology. Country/currency controls remain shared shell controls and do not alter the economic relationship explanation.

## 8. SEO / indexation

Each page requires a unique title, description, H1, Article + BreadcrumbList JSON-LD, self-canonical URL, `index,follow`, Learn-hub discovery and sitemap entry dated 2026-10-15. No query-string or fragment variant is indexable.

## 9. QA

Central QA must verify the three pages are substantive and globally neutral; canonical/schema/discovery are correct; the Explorer and authority bridges expose them; the seven-core homepage remains unchanged; and layouts avoid page-level horizontal overflow at 1280, 390 and 360 px. Source contract must protect the same rules.

## 10. Deliberately out of scope

No new Explorer event, target or relationship is required in this batch because the reviewed MCR1 library already contains the relevant yield, policy-rate, dollar, stock and gold relationships. No runtime API, AI, price feed, calculator mathematics, homepage-core ordering or workflow file is changed.

## 11. Release sequence

Build only from Snapshot 69. Package manifest-listed files only. Use a disposable staging branch and Carrowmont Batch PR Publisher with `CREATE_PRS`; merge only Publisher-generated PRs after green staged QA; then run live Automated QA, Multi-Repo Guard and take a fresh Source Snapshot. Never merge the staging branch itself.

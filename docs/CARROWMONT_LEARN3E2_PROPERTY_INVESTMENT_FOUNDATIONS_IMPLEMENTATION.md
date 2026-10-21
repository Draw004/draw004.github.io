# CARROWMONT LEARN3E-2 — Property Investment Foundations & Comparisons

**Implementation baseline:** Carrowmont Source Snapshot 103  
**Snapshot generated:** 2026-10-21T18:37:22Z  
**Implementation date:** 22 October 2026  
**Scope:** Four existing Learn guides; no new public URLs.

## Purpose

LEARN3E-2 completes the approved Home, Mortgage & Property improvement programme by deepening four established property-investment guides. The work focuses on concepts that are frequently compared incorrectly: gross versus net rental yield, property yield versus leveraged cash-on-cash return, direct-property leverage versus REIT entity leverage, distribution yield versus total return, and leveraged property returns versus unleveraged equity-market returns.

The release keeps one universal educational core and uses the existing Carrowmont declarative localization bindings for illustrative money. Currency presentation changes by user selection; the percentages and underlying relationships do not. Tax, REIT legal rules, property charges and financing conventions remain jurisdiction-specific rather than being invented as universal rules.

## Pages materially improved

- `rental-yield-explained.html`
- `reit-vs-direct-property.html`
- `what-is-a-reit.html`
- `real-estate-vs-stocks.html`

## Editorial improvements

Each page keeps its established canonical URL, static title/H1 search identity and primary Tool <-> Learn journey. The existing Learn V2 depth and rich modules remain unique. Exactly one existing depth module carries `data-cm-learn3e2="1"`; no second `data-cm-depth="1"` or `data-cm-rich="1"` module is introduced.

The four pages now add a clearly labelled **Worked example:** and **Checklist:** layer:

- Rental Yield shows a reproducible 6.0% gross yield becoming a 4.5% illustrative net operating yield after explicitly stated vacancy, management and recurring property costs. Financing remains separate so rental yield is not confused with leveraged cash-on-cash return.
- REIT vs Direct Property uses equal starting capital to show that direct-property household leverage can create much larger equity sensitivity while REIT leverage may instead sit inside the entity. The example does not claim equal risk or equal outcomes.
- What Is a REIT follows a simplified revenue -> operating costs -> financing/admin -> distributable/retained cash chain and explicitly states that distributions are not guaranteed and legal payout rules differ by jurisdiction.
- Real Estate vs Stocks shows why a leveraged property return cannot be casually compared with an unleveraged diversified-equity return. The example isolates leverage rather than declaring a winner.

## Deterministic illustration discipline

Permanent QA recalculates the stated arithmetic:

- gross rental yield: 300,000 / 5,000,000 = 6.0%;
- illustrative net operating income: 300,000 - 15,000 - 18,000 - 42,000 = 225,000, or 4.5% of 5,000,000;
- direct-property example: 2,000,000 equity controls an 8,000,000 asset with 6,000,000 debt; a 5% asset move is 400,000, equal to 20% of starting equity before costs and financing effects;
- unleveraged 2,000,000 equity exposure moving 5% changes by 100,000;
- simplified REIT flow: 5,000,000 revenue - 2,000,000 operating - 750,000 financing - 250,000 administration = 2,000,000 before tax/reserves/other requirements; a 1,500,000 illustrative distribution leaves 500,000 retained.

These are teaching illustrations, not forecasts, valuations, property recommendations or REIT payout promises.

## Protected Tool <-> Learn journeys

Older active contracts remain authoritative:

- Rental Yield -> Goal Planner;
- REIT vs Direct Property -> Goal Planner;
- What Is a REIT -> Retirement Planner;
- Real Estate vs Stocks -> Financial Independence Planner.

The shared bottom return CTA must continue to mirror each approved primary top action. No newer editorial recommendation silently overrides an older architectural contract.

## Search and internal discovery

No canonical URL is changed and no new public URL is created. SEARCH1 remains exactly 121 canonical public entries. Reviewed aliases and fixtures improve ownership for gross/net rental yield, REIT vs rental/direct property, REIT meaning/how it works, and property vs shares/equities.

Contextual links connect Rental Yield -> REIT/direct-property structure, REIT definition -> REIT/direct comparison, and Real Estate vs Stocks -> diversification. The release does not create a link dump or change homepage core-tool architecture.

Only the four materially rewritten URLs receive Article `dateModified` and sitemap `lastmod` of `2026-10-22`. Bing/participating engines may receive those changes through the established IndexNow workflow; selective Google re-indexing can be requested after the complete release is green. Better content does not guarantee crawling, indexing, ranking, traffic or backlink placement.

## Product, privacy and release boundaries

This release does not change calculator formulas, Goal/Retirement/FI planner behavior, reports, PDFs, shared-plan-state, analytics, SEARCH1 query privacy, workflow files or country-specific tax/property rules.

Browser QA must protect the older journeys, one-H1/one-depth/one-rich structure, money localization, decision-boundary wording and 1280 / 390 / 360 layouts. Static SEO is checked from raw HTML; runtime localization is checked from the rendered page.

LEARN3E is complete after this batch is merged, live Automated QA and Multi-Repo Guard are green, and a fresh Source Snapshot is taken. The next planned library phase is LEARN3F — Macro, Gold & Market Mechanics, including the separately recorded backlink/linkable-research opportunities.

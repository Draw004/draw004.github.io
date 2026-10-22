# CARROWMONT LEARN3F-1 — Rates, Debt & Reserve-Currency Foundations Implementation

**Baseline:** Source Snapshot 105 (generated 2026-10-21T20:32:06Z)  
**Main-site baseline:** `c414a472766ff126fdebc997e6be73ec31911026`  
**Central-QA baseline:** `d75849f372590b740c110bc215a8872c1540a799`  
**Implementation date:** 22 October 2026

## Scope

Creates four genuinely new Learn pages: real yields, U.S. debt interest-cost mechanics, Treasury maturity structure, and global reserve-currency foundations. These pages own distinct search intent and do not rewrite the recent MCR1/SEO3C/SEO3D macro pages.

## Product and editorial boundaries

- No calculator formulas or deterministic engines changed.
- No market, gold, dollar, rate or sovereign-default forecast is introduced.
- Treasury borrowing is explicitly separated from literal Treasury `money printing`.
- COFER is explicitly described as a foreign-exchange-reserve dataset that excludes monetary gold.
- The reserve-currency page treats reserve status as a financial ecosystem rather than a political argument.
- Current IMF COFER figures are visibly dated Q2 2026; other worked examples are hypothetical so the pages remain evergreen.
- No browser-side external data API or query leakage is introduced.
- Existing maintenance-only pages receive only contextual links; their review dates and sitemap `lastmod` values remain unchanged.
- SEARCH1 query privacy remains unchanged.

## Search and discovery

The reviewed SEARCH1 inventory moves from 121 to 125 public pages. Four deterministic fixtures protect query ownership for `real yield`, `us debt interest expense`, `treasury bills notes bonds`, and `reserve currency`. The Learn macro hub receives four contextual cards.

## QA

Central QA independently recalculates the real-return example, the gradual debt-refinancing example and the duration approximation. Browser QA protects static/runtime identity, top/bottom tool journeys, source counts and 1280/390/360 overflow. Old smoke contracts and new LEARN3F-1 tests are designed to pass together.

## Release discipline

Normal protected flow applies: Batch PR Publisher -> main-site PR -> central-QA PR last -> live Automated QA -> Multi-Repo Guard -> fresh Source Snapshot. No workflow files are included. LEARN3F-2 must start from that fresh post-LEARN3F-1 snapshot.


## Publisher validation 66 reconciliation

The first Publisher run reported six browser failures while 611 browser checks passed. Five failures had one cause: older SEARCH1/LEARN2A/LEARN3B browser tests still hard-coded the pre-LEARN3F-1 inventory of 121 pages even though the approved LEARN3F-1 release expands the reviewed index to 125 pages. The source contract had already been updated to 125. FIX1 therefore introduces one exported `search1ExpectedPublicPages` QA constant and makes the legacy browser inventory checks consume that shared contract instead of maintaining separate page-count literals.

The sixth failure was a brittle case-sensitive broad-text assertion on the Real Yields guide. The published heading correctly begins `Market real yields...`; FIX1 scopes the check to the intended H2/H3 elements and similarly scopes the remaining page-specific mechanics assertions to their intended headings or precision note. No public Learn wording, calculator mathematics, canonical URL, sitemap membership, search intent, freshness, privacy or analytics behavior is changed by this reconciliation.

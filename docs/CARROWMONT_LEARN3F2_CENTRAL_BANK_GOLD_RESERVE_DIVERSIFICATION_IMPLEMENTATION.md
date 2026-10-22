# CARROWMONT LEARN3F-2 — Central-Bank Gold & Reserve Diversification Implementation

**Baseline:** Source Snapshot 106 (generated 2026-10-22T04:28:36Z)  
**Main-site baseline:** `bfbaeba0e2a90c386a39bf0503ba3b12e01b7831`  
**Central-QA baseline:** `498b54ba0e1068c67107e2695b36d62823a82b08`  
**Implementation date:** 22 October 2026

## Scope

Creates the final three LEARN3F authority guides: why central banks buy gold, de-dollarisation, and gold versus government bonds as official reserve assets. The central-bank-gold guide is the flagship linkable reference asset with repository-stored charts, accessible tables and downloadable CSV/PNG data.

## Evidence and data discipline

- Current reserve figures are visibly dated rather than presented as timeless facts.
- World Gold Council annual demand values are labelled publication-vintage estimates because historical estimates can be revised. H1 2026 is explicitly partial-year data.
- The 2026 WGC Central Bank Gold Reserves Survey is treated as a survey, not a promise of future buying. The page records the reviewed 89% global-reserve and 45% own-institution expectations.
- IMF COFER Q2 2026 is used for foreign-exchange reserve shares. The implementation permanently states that **COFER excludes monetary gold**.
- ECB total-official-reserve comparisons are kept separate from COFER because the denominator includes gold. The end-2025 market-price comparison is shown alongside the ECB constant end-2023 gold-price comparison so valuation effects cannot be mistaken for equivalent physical buying.
- The de-dollarisation guide separates reserve shares, gold diversification, trade settlement, funding and true currency displacement. The IMF observation that the U.S. dollar accounted for more than 80% of trade finance in the cited 2024 analysis is used as a dated reference point, not a forecast.
- Repository-stored charts and CSVs are generated from the same reviewed values printed in the articles. There is **No browser-side external data API**.

## Product and editorial boundaries

- Central-bank objectives are not household objectives and do not create a household gold-allocation rule.
- Central-bank gold buying is not presented as proof of dollar collapse, Treasury dumping, or imminent U.S. default.
- Gold and government bonds are compared by reserve function: issuer/default exposure, yield, liquidity, duration, inflation sensitivity, collateral/payment utility, custody/jurisdiction and storage friction.
- The Gold Macro Stress Explorer remains the approved primary next step for all three guides; no calculator formulas or deterministic engines change.
- SEARCH1 query privacy, analytics privacy and the no-login product model remain unchanged.
- No workflow files are included.

## Search, discovery and freshness

SEARCH1 expands from 125 to 128 reviewed public pages through the shared QA inventory contract. Deterministic fixtures protect `central bank gold buying`, `dedollarization`, and `gold vs Treasuries reserves`. The Learn macro hub receives three new cards. Older macro pages receive only contextual links and keep their existing sitemap freshness dates.

## QA

Central source contracts protect identities, Article/Breadcrumb structured data, date discipline, denominators, reviewed data values, downloadable assets, search ownership, primary journeys and the maintenance-only freshness boundary. Browser QA checks chart loading, CSV/PNG availability, top/bottom tool journeys, page-specific distinctions and 1280/390/360 overflow. Old browser inventory suites continue to consume the single `search1ExpectedPublicPages` value rather than scattered hard-coded counts.

## Release discipline and next step

Normal protected flow applies: Batch PR Publisher -> main-site PR -> central-QA PR last -> live Automated QA -> Multi-Repo Guard -> fresh Source Snapshot. After LEARN3F-2 is green, the broad LEARN3 improvement programme moves to the **final whole-library closeout**, not another mass rewrite.

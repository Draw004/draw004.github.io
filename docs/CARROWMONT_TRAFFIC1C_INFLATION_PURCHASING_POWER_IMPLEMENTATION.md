# CARROWMONT TRAFFIC1C - U.S. INFLATION & PURCHASING-POWER MONITOR

**Authoritative baseline:** Carrowmont Source Snapshot supplied 26 October 2026; manifest generated 24 October 2026.  
**Main-site baseline commit:** `07ceb78668be4153afc3d6455adcf019f3a5109f`  
**Inflation-calculator baseline commit:** `780fb8ed1da418a4a6743a1d3116b02331af886b`  
**Central-QA baseline commit:** `267d14f7741b6f0bbd6ca03ae4206c0c2a6c0780`.

## Implemented

- `research/inflation-purchasing-power-monitor.html`;
- BLS September 2026 CPI-U reference data plus Carrowmont calculations in JSON/CSV;
- three 1600x900 editorial charts;
- a browser-local weighted personal-basket illustration using the eight BLS major expenditure groups;
- technical methodology and outreach launch pack;
- Research hub promotion from NEXT to LIVE;
- sitemap and SEARCH1 integration with distinct research vs calculator/evergreen intent;
- contextual Research links from existing inflation Learn pages and the Inflation Calculator without changing calculator mathematics;
- dedicated browser QA and source-contract coverage.

## Evidence discipline

BLS CPI values are labelled as official data. Purchasing-power equivalence and weighted spending-mix results are labelled Carrowmont calculations. The page does not present the current CPI as a forecast, does not estimate investment returns and does not claim to calculate an official personal CPI.

## Personal-basket model

The model uses the eight mutually exclusive BLS major expenditure groups and the current 12-month price change for each group. User-entered weights are normalized by their total before the weighted rate is calculated. The widget runs locally and does not fetch, store or transmit user-entered values.

## Product boundaries

No Inflation Calculator mathematics, locale engines, report generation, shared-plan behavior, analytics payloads, storage/account behavior or other calculator engines are changed. The Research page is United States-specific and does not claim global representativeness. Country expansion requires equivalent authoritative primary data and a separate approval.

## Search ownership

`inflation calculator` and user-entered future-cost queries remain owned by the Inflation Calculator. Evergreen questions such as `what is purchasing power` remain owned by Learn. Research-specific queries such as `US inflation purchasing power monitor`, `inflation by household spending category` and `personal inflation basket research` are owned by the new Research page.

## Freshness

The new Research study is published 26 October 2026 using September 2026 CPI data released 14 October 2026. The Research hub receives a 26 October material-change date because the third flagship study moves from NEXT to LIVE. Contextual links added to existing Learn/tool pages do not manufacture new article freshness dates. The monitor is intended to update after substantive monthly BLS CPI releases.

## Workflow files

No workflow files are included. The release does not add a browser-side data API or a GitHub updater workflow.

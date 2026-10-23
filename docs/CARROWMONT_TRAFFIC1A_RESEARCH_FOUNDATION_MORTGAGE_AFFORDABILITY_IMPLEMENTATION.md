# CARROWMONT TRAFFIC1A - RESEARCH FOUNDATION + MORTGAGE AFFORDABILITY MONITOR

**Baseline:** Source Snapshot 110, generated 2026-10-23T12:56:06Z.  
**Main-site baseline commit:** `cb331053348b3a9cc8d72f1d8c95e0de2ec3a8dc`  
**Central QA baseline commit:** `775ae00f0f1f63bcc88577e6c7f8585bceac1958`  
**Baseline source contract:** 672 PASS / 0 FAIL.

## Implemented

- public `research.html` hub;
- `research/mortgage-affordability-monitor.html`;
- shared `research.css`;
- normalized JSON and downloadable CSV;
- three 1600x900 shareable PNG charts;
- technical methodology and outreach launch pack;
- sitemap and SEARCH1 integration with distinct research vs calculator intent;
- sitewide runtime Research navigation entry through the existing shared `site.js`;
- contextual Research links from the home-affordability tool/Learn cluster;
- dedicated browser QA and source-contract coverage.

## Evidence discipline

Official reported data, source dates and Carrowmont calculations are visibly separated. No external data API is called in the browser. The report is a static research snapshot.

## Product boundaries

No calculator formulas, locale engines, privacy behavior, analytics payloads or account/storage behavior are changed. The Research monitor is United States-specific and does not claim global representativeness.

## Search ownership

`mortgage affordability calculator` remains owned by the Home Affordability Calculator. Research-specific queries such as `mortgage affordability monitor` and `mortgage payment research` are owned by the Research page.

## Freshness

Only the new Research hub/study receive 23 October 2026 publication dates. Contextual links added to existing Learn/tool pages do not change their existing `dateModified` or sitemap `lastmod`.

## Workflow files

No workflow files are included.

## FIX1 publisher hardening

Publisher validation exposed two QA/runtime integration issues without identifying a research-content defect:

- adding the shared **Research** desktop-navigation item could exceed the 1440px header width on legacy pages whose compact-header breakpoint began below that width; `site.js` now applies a narrowly scoped 1361-1500px header-fit rule that keeps Research visible while hiding only the non-essential tagline/rule and tightening shared gaps;
- the Research study legitimately contains more than one link to the Home Affordability calculator, so browser QA now checks for one-or-more correct links rather than relying on Playwright strict-mode uniqueness.

TRAFFIC1A browser overflow coverage now explicitly includes **1440, 1280, 390 and 360px**. Public research data, calculator formulas, canonical URLs, freshness, privacy, analytics and workflow files are unchanged by FIX1.


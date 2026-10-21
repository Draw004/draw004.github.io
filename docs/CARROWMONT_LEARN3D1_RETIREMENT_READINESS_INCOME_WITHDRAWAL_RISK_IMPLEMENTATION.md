# CARROWMONT LEARN3D-1 — Retirement Readiness, Income & Withdrawal Risk

**Implementation baseline:** Carrowmont Source Snapshot 99  
**Implementation date:** 21 October 2026  
**Scope:** Eight existing Learn guides; no new public URLs.

## Purpose

LEARN3D-1 improves retirement education so readers can understand the assumptions behind retirement benchmarks, income needs, changing expenses, inflation, withdrawal longevity, the 4% rule, sequence-of-returns risk and longevity risk.

The release follows one universal educational core with country-aware terminology and monetary examples. It does not turn a benchmark, withdrawal rate, retirement age, inflation assumption or life horizon into a promise.

## Pages materially improved

- `retirement-savings-by-age.html`
- `retirement-monthly-income-needed.html`
- `retirement-expenses.html`
- `inflation-and-retirement-planning.html`
- `how-long-will-retirement-savings-last.html`
- `4-percent-rule-retirement.html`
- `sequence-of-returns-risk.html`
- `longevity-risk-retirement.html`

## Editorial improvements

Each page keeps its established question and canonical URL. The new editorial layer adds a transparent worked example or sensitivity illustration, a practical checklist and contextual links to the next relevant Carrowmont guide or tool.

Key principles protected in the rewritten material:

- age-based savings benchmarks are checkpoints, not pass/fail rules;
- retirement income is built from expected spending and dependable income rather than a universal salary-replacement percentage;
- retirement expenses can stop, continue, rise or begin at different times;
- inflation acts before retirement and during retirement withdrawals;
- today's money and future nominal money are not mixed silently;
- deterministic runway results are illustrations, not forecasts;
- the 4% rule is an initial-withdrawal framework from historical U.S. research, not a universally safe rate;
- sequence risk is demonstrated using the same return set in reverse order;
- longevity risk is modeled as horizon uncertainty rather than a life-expectancy prediction.

## Localization

All new monetary illustrations use Carrowmont's existing declarative localization bindings. Values inside one example use the same proportional teaching basis. Currency changes alter the illustrative display rather than pretending to perform live FX conversion.

Country-specific pensions, tax rules, healthcare systems, benefit systems and retirement-account rules remain outside the universal core. Where relevant, readers are told to check local official or provider information.

## Protected Tool <-> Learn journeys

No newer editorial recommendation silently overrides an older architectural contract.

- `retirement-expenses.html`, `how-long-will-retirement-savings-last.html` and `inflation-and-retirement-planning.html` retain the Retirement Planner at the top and shared bottom CTA.
- `longevity-risk-retirement.html` retains the Financial Independence Planner at the top and shared bottom CTA.
- `4-percent-rule-retirement.html` keeps the 4% Rule Stress Test as its primary route.
- `sequence-of-returns-risk.html` keeps the approved 4% Rule Stress Test route and contextual withdrawal/SWP discovery.
- withdrawal-specific pages keep contextual access to the Retirement Withdrawal / Drawdown Calculator.

## Search and indexing

No canonical URL is changed. No new indexable URL is created. Only these eight materially rewritten pages receive `dateModified` and sitemap `lastmod` of `2026-10-21`.

SEARCH1 remains at 121 public entries. Reviewed aliases and deterministic fixtures are added for the eight retirement intents without changing search-query privacy.

Search visibility is a desired outcome of better content. This release does not guarantee crawling, indexing, ranking, traffic or AI citation.

## Product boundaries

This release does not change calculator formulas, reports, PDF engines, shared-plan-state behavior, analytics, SEARCH1 query privacy, homepage core-tool architecture or workflow files.

LEARN3D-2 remains outside this release and must start from a fresh post-LEARN3D-1 Source Snapshot.


## Publisher FIX1 correction

The first Publisher run exposed an established Learn V2 structural contract that was not included in the LEARN3D-1 preflight: representative pillar guides must contain exactly one `data-cm-depth="1"` module. All eight Snapshot 99 source pages already had that legacy depth marker, while the new LEARN3D-1 enhancement module accidentally reused the same marker and created two depth modules.

FIX1 keeps the existing legacy depth module unchanged and keeps the new LEARN3D-1 editorial module and all of its content, but the new module now uses only `data-cm-learn3d1="1"`. Central source and browser QA explicitly require exactly one legacy depth marker and exactly one LEARN3D-1 enhancement marker on every rewritten page. No public wording, calculation, canonical URL, search intent, localization, freshness date, Tool-to-Learn journey or sitemap membership is changed by this correction.

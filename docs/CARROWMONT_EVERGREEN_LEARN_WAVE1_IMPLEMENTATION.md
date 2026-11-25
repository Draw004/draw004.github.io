# Carrowmont Evergreen Learn Expansion — Wave 1 implementation and handover

**Prepared:** 25 November 2026  
**Release state:** controlled review release. Do not infer deployment from this document alone. Deployment is established only when these changes are present in the newest completed all-green post-merge Source Snapshot supplied by the owner.

## Objective

Deepen Carrowmont Learn after Learn Hub 2.0 by filling only high-value, unique educational gaps validated through a multi-market content audit. At the same time, correct the weekly reference updater fallback semantics discovered after duplicate Tuesday US Debt and Gold PRs were created.

## Public Learn expansion

Wave 1 adds six new evergreen guides:

1. `/emergency-fund-vs-paying-off-debt.html`
2. `/risk-tolerance-vs-risk-capacity.html`
3. `/portfolio-rebalancing-explained.html`
4. `/investment-fees-and-expense-ratios.html`
5. `/market-timing-vs-staying-invested.html`
6. `/home-buying-upfront-costs.html`

Each guide uses the existing Carrowmont educational-article UI, Article/Breadcrumb structured data, global/country caveats, source disclosure, related guides and an action route into a relevant Carrowmont tool or guided Ask journey.

## Internal discovery

- Learn Hub source categories include every new guide; Learn Hub 2.0 continues to derive counts/ranking from the source library.
- `Emergency fund vs paying off debt` is also added as an editorial/common planning starting point.
- Relevant existing articles receive bidirectional related-guide links rather than leaving the new content isolated.
- The reviewed Search inventory adds all six URLs and rebuilds `carrowmont-search-index.json`.
- `sitemap.xml` includes all six new public Learn URLs with 25 November 2026 `lastmod`, and `learn.html` receives a current `lastmod` because its visible library changed. Existing guides that only gained contextual internal links keep their prior `lastmod`/Article `dateModified` so internal-link maintenance does not manufacture editorial freshness.

## Automation fallback hardening

The earlier Hardening 1 release added Monday primary + Tuesday fallback schedules for U.S. Debt and Gold. The schedule itself worked, but Tuesday was a normal updater run. Once Monday's PR had been merged, Tuesday saw no open PR and could create a second data PR from the next daily source observation.

Wave 1 changes Tuesday semantics:

- primary Monday and manual-dispatch runs are unaffected;
- Tuesday identifies itself through `github.event.schedule`;
- it computes the current UTC week's Monday boundary;
- it searches closed PRs for the updater's automation branch prefix;
- if an updater-specific automated PR has already **merged during the current UTC week**, Tuesday exits before the source fetch;
- if Monday was missed/dropped, or Monday ran but produced no newer data/PR, Tuesday is still allowed to catch up;
- the existing open-PR guard remains in place.

The Country Reference Saturday catch-up was audited and is intentionally unchanged. Country policy rates do not normally create a new daily observation merely because another day passed; if Friday already merged a rate change, Saturday sees the same stored/current rate and produces no material PR. A same-week-merged guard would also be too broad because country checks are intentionally weekday-based, not weekly-only.

## External research principle

The content-gap audit and all six pages were informed by authoritative material from MoneyHelper, CFPB, SEC/Investor.gov, FINRA, ASIC Moneysmart, SEBI Investor, RBI, FCAC and FCA. Sources and URLs are preserved in `CARROWMONT_EVERGREEN_LEARN_CONTENT_GAP_AUDIT_2026-11-25.md` and on the relevant public guides.

No external site's design, wording or proprietary content is copied. Carrowmont keeps its own global, plain-language, understanding-first structure.

## Locked boundaries

- No new calculator formula.
- No new Ask engine.
- No account/persistence change.
- No provider/bank connection; Batch 13B remains ON HOLD.
- No native-app work; Batch 14 remains traffic-gated.
- No country-specific tax advice or universal lender rules.
- No “best investment” or market prediction language.
- New pages remain educational, not individualized advice.


## Pre-Publisher QA evidence

The review candidate was validated against the complete historical Carrowmont contract rather than only new Wave 1 tests. Final pre-Publisher results before packaging:

- deterministic source contract: **1,618 PASS / 0 FAIL**;
- Development Standards Gate: **PASS** with 39 pre-existing tracked legacy items and **0 new** standards debt;
- all 15 changed HTML pages passed the manifest-aware standards review;
- Search index build check: **151 reviewed public entries / 192,229 bytes**;
- SEARCH1 deterministic fixtures: **87 PASS / 0 FAIL**;
- U.S. Debt, Gold and Country workflow YAML parse successfully.

During development the full historical suite initially found 56 contract/regression mismatches, mostly shared article-template standards, current inventory counts and sitemap-freshness assumptions. Those shared causes were corrected rather than bypassed. A subsequent run reduced the set to four formatting/documentation mismatches; after correcting those, the full suite returned to 1,618 / 0. This history is retained so a future maintainer understands that compatibility was actively tested rather than assumed.

## Publisher Repair 1 — 25 November 2026

The first Publisher staged browser run completed with **998 passed / 2 failed**. Both failures were QA-assumption regressions rather than public product defects:

1. `101-evergreen-learn-wave1.spec.js` used a broad `a[href=...]` locator for article action paths. Learn Article v2 intentionally exposes the same destination in both the top `.guide-action-first` CTA and the generated bottom `.learn-tool-return` CTA, so Playwright strict-locator semantics saw multiple valid matches. Repair 1 scopes and verifies both intended CTA locations explicitly.
2. `16-mortgage-learn-education.spec.js` required all five legacy mortgage education guides to be visible in the first Learn Hub result page. Evergreen Wave 1 expands the Home topic to 13 guides while Learn Hub deliberately shows 12 before `Show more guides`; the fifth mortgage-series item can therefore sit behind that control. Repair 1 keeps the stronger requirement: all five must remain in the crawlable Home source cluster and all five must become visible through enhanced discovery after using `Show more` when needed.

No public Learn UI, article content, ranking formula, Search inventory, sitemap, calculator or workflow behavior was changed by this repair.

## Indexing

This release creates **six new public Learn URLs**. The required release path is **Publisher -> reviewed merge -> deployed QA -> Multi-Repo Guard -> final all-green Source Snapshot**. Only after that verified deployment:

1. sitemap/IndexNow should carry the six URLs through the existing automation;
2. selective Google Search Console Request Indexing is recommended for the six new pages;
3. do not request indexing for workflow/docs/JSON support files.

## Next step after green close

Move to **Measurement & next-priority review** before a larger Wave 2. Use Search Console, internal search behavior and Learn/Ask usage to decide whether to deepen existing pages or add the Priority B candidates from the content-gap audit.

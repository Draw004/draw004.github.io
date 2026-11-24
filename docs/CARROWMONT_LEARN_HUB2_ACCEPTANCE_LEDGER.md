# Carrowmont Learn Hub 2.0 - acceptance ledger

**Prepared:** 24 November 2026  
**Release state:** review candidate until Publisher -> merge -> QA -> Guard -> Source Snapshot is all green.

## Product acceptance

- [x] Learn has a dedicated educational-discovery surface rather than the old embedded all-site Search widget.
- [x] Full `/search.html` remains the separate route for tools, Learn and Research.
- [x] Six situation-first educational starting points are present and explicitly non-personalized.
- [x] Topic filters are generated from the existing Learn categories, including counts.
- [x] Topic selection exposes the existing related calculator when one already exists.
- [x] Learning-style filters support All, Start here, Explain, Compare and Plan & decide.
- [x] Learn search reuses local Carrowmont SearchCore ranking, typo correction and suggestions against Learn-library candidates only.
- [x] `POPULAR PLANNING QUESTIONS` is replaced by truthful `COMMON PLANNING QUESTIONS` / editorial-starting-point wording.
- [x] Desktop result discovery uses a contained right-edge vertical scroller.
- [x] Mobile results use normal page scrolling; situation/topic controls can scroll horizontally without page overflow.
- [x] The original full static library remains in HTML as progressive-enhancement, SEO and no-JS fallback.
- [x] Locale changes rebuild visible topic/guide labels from the localized source library.
- [x] No new public URL, sitemap entry or indexing request is required.

## Safety / scope acceptance

- [x] No calculator formula changes.
- [x] No Ask calculation or journey changes.
- [x] No Search-page hierarchy changes.
- [x] No My Carrowmont persistence changes.
- [x] No external search API or external query transmission.
- [x] No traffic-backed `popular` claim without analytics evidence.
- [x] No personalized financial-advice framing.
- [x] Batch 13B remains ON HOLD.
- [x] Batch 14 remains deferred / traffic-gated.

## QA acceptance

Required before Publisher package is considered ready:

- [x] Full deterministic source contract green after Repair 2: **1,603 PASS / 0 FAIL** from the exact staged multi-repo source.
- [x] Development Standards Gate green: **PASS**, 39 pre-existing legacy issues tracked, **1 changed HTML page audited**.
- [x] New/changed JS/MJS syntax green.
- [x] Static guide inventory still resolves all **102 unique Learn destinations** and remains the crawlable/no-JS source library.
- [x] No unintended sitemap/search-index URL change; this release adds **no public URL**.
- [x] Browser tests authored for desktop and mobile Learn Hub 2.0 (`tests/100-learn-hub2.spec.js`) plus legacy compatibility coverage.

### Browser validation boundary

The local workspace does not contain the Playwright dependency used by Carrowmont QA, so **local full Playwright execution is not claimed**. Repair 1 did run targeted headless-Chromium probes against the staged Learn page and confirmed desktop enhancement, related-tool routing, legacy topic-hash activation, 390/360 page-width containment and the 1366x640 result-scroll handoff. Publisher staged Playwright QA and the normal deployed QA cycle remain mandatory and authoritative for full interactive/responsive acceptance.

### Publisher Repair 1

- [x] Initial Publisher result recorded: **878 passed / 17 failed**.
- [x] Shared causes identified instead of weakening 17 assertions individually.
- [x] Mobile min-content/page-overflow defect repaired.
- [x] Established Learn hash/topic-banner routes now activate Learn Hub 2.0.
- [x] Short-laptop search timer/render race repaired.
- [x] Legacy browser contracts migrated to the new Hub while preserving crawlable static source-link assertions.
- [x] Source meta-contracts migrated with the browser contracts.
- [x] Repair 1 Publisher rerun recorded: **895 passed / 1 failed**; the single failure was a QA-helper same-document hash-navigation false failure, not a Learn product regression.
- [x] Repair 2 separates clean HTTP navigation from the `#loans-and-debt` same-document hash activation while preserving the underlying discovery/mobile assertions.
- [ ] Repair 2 Publisher Playwright run green.
- [ ] Merge -> deployed QA -> Guard -> Source Snapshot green.

Required release path after package review:

**Publisher -> merge -> QA -> Guard -> Source Snapshot**

Do not call Learn Hub 2.0 deployed from a review ZIP or source-only pass. The newest completed all-green post-merge Source Snapshot supplied by the owner is the deployment/code authority.

## Next phase after green close

**Evergreen Learn Expansion** - perform a content-gap and collision audit first, then add only unique-intent, deep, well-sourced evergreen guides. The existing high-priority candidate `Emergency Fund vs Paying Off Debt` remains subject to that full editorial/search-intent process rather than being auto-created.

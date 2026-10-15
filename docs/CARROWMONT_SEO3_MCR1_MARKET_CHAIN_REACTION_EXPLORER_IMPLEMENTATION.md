# CARROWMONT SEO3-MCR1 — MARKET CHAIN REACTION EXPLORER

## Batch 1 Implementation Record

**Implementation date:** 15 October 2026  
**Authoritative baseline:** Carrowmont Source Snapshot 68, generated 15 October 2026 at 05:38:31 UTC  
**Main-site baseline commit:** `71f321a742f48da3f3e3beff14d568ad6ee306c7`  
**Central QA baseline commit:** `ad0c64b83253adcb657fd6b1e256fe2cd4d33fc0`  
**Status:** Batch 1 release candidate. Production remains unchanged until Publisher-created PRs are reviewed and merged.

## 1. What Batch 1 adds

Batch 1 creates one central educational authority product and four substantial search-intent guides:

- `/market-chain-reaction-explorer.html`
- `/what-happens-when-bond-yields-rise.html`
- `/how-oil-prices-affect-inflation.html`
- `/what-happens-when-fed-cuts-interest-rates.html`
- `/what-happens-when-dollar-strengthens.html`

The Explorer is deterministic. It loads a static reviewed event/cause/outcome library and never asks an AI model to invent a market relationship in the visitor's browser.

## 2. Relationship library

Batch 1 ships:

- 12 top-level market/economic events;
- 25 defined outcome concepts;
- 73 reviewed event-to-outcome relationships;
- controlled relationship classifications;
- a mandatory direct answer;
- a two-or-more-step causal chain;
- supportive and opposing forces;
- a mandatory **Chain Breaker**;
- differentiated asset/sector/country reactions where relevant;
- historical/contextual explanation;
- source IDs that resolve to the reviewed source catalogue.

No relationship is exposed in the interface unless a reviewed record exists for it.

## 3. Editorial and terminology rules preserved

The implementation follows the final MCR1 specification and existing Carrowmont standards:

- mechanical relationships are separated from market tendencies;
- `bond yield`, `policy rate`, `borrowing cost`, `real yield` and `discount rate` are not used as synonyms;
- U.S. `deficit`, `debt`, `debt held by the public`, `debt ceiling` and `default` remain separate concepts;
- the first substantive currency reference uses `U.S. dollar` where ambiguity could exist;
- gold, silver and copper keep distinct economic identities;
- no price target, trading signal, guaranteed direction or personalized investment instruction is generated;
- the U.S. Treasury default-stress event carries an additional uncertainty warning.

## 4. Learn / search architecture

Each Batch 1 Learn page independently answers one search question before linking to the Explorer. Each page contains:

1. a direct 30-second answer;
2. plain-English definitions;
3. the relevant cause-and-effect chain;
4. a distinction between mechanical and context-dependent effects;
5. a Chain Breaker;
6. different asset/sector/country reactions;
7. indicators to watch;
8. historical perspective without a fabricated forecast;
9. FAQ answers;
10. reviewed sources and a methodology note;
11. contextual links to the Explorer and related Carrowmont content.

The Learn hub gains a **Markets & Macro Chain Reactions** category. The Tools directory gains the Explorer as the 15th live tool, inside the existing Macro & Market Explorers section. The seven-core homepage is intentionally unchanged.

## 5. SEO / indexation controls

- One canonical Explorer URL only.
- Interactive state uses URL fragments rather than indexable query/parameter pages.
- The Explorer contains substantial static HTML before JavaScript interaction.
- The four Learn pages have unique Article schema, BreadcrumbList schema, title, description, H1 and canonical URL.
- The Explorer uses WebApplication + BreadcrumbList schema.
- No combination-generated thin pages are created.
- Sitemap contains the Explorer and all four Batch 1 guides with `2026-10-15` lastmod.
- Existing macro pages updated with contextual Explorer links have refreshed sitemap dates.
- Search-intent ownership remains one canonical page per primary question.

## 6. Localization and global language

MCR1 uses universal market/economic logic. Country and currency controls remain part of the shared Carrowmont shell, but changing currency does not alter the market relationship model.

The four new global Learn pages intentionally avoid hard-coded `₹`, lakh/crore examples or India-only terminology. Country-specific context can be added only where it changes the explanation, without creating cloned country doorway pages.

## 7. Accessibility and responsive behavior

The implementation requires:

- keyboard-operable selects, buttons and disclosures;
- visible focus through shared Carrowmont controls;
- textual verdict labels rather than color-only meaning;
- no hover-only explanation;
- a static no-JavaScript route to the four Learn guides;
- no page-level horizontal overflow at desktop, 390 px or 360 px;
- readable long source links and responsive article tables.

## 8. Privacy and network boundary

MCR1 requires no personal financial data and no login.

The visitor browser reads only same-origin static JSON for the relationship library. It does not call:

- a third-party market-price API;
- a third-party macro-data API;
- an external AI service;
- a personalized financial account service.

User selections are represented only in page state / shareable fragment state and are not treated as stored financial-plan data.

## 9. Central QA

Central QA adds `tests/27-market-chain-reaction-explorer.spec.js` and source-contract coverage for:

- 12 events / 73 relationships and full event-target coverage;
- controlled verdict and relationship vocabularies;
- mandatory Chain Breakers and evidence;
- cause-dependent yield and oil examples;
- Treasury-default uncertainty warning;
- shareable fragment behavior with one canonical URL;
- Copy Explanation output;
- same-origin runtime data behavior;
- the four substantive Learn pages;
- Learn hub / Tools Hub / sitemap discovery;
- seven-core homepage non-regression;
- 1280 / 390 / 360 responsive behavior.

Existing historical source-contract checks were made freshness-aware where an MCR1 contextual link legitimately changes a previously released page. No prior functional requirement is removed merely to obtain GREEN.

## 10. Deliberately not included in Batch 1

- no market-price prediction engine;
- no portfolio recommendation or allocation advice;
- no runtime generative AI;
- no real-time market-data feed;
- no PDF/report export for the Explorer;
- no hundreds of automatically generated event/asset pages;
- no copper standalone article yet;
- no dedicated war, U.S.-default or stagflation Learn page yet;
- no change to existing calculator mathematics;
- no change to the seven-core homepage ordering.

## 11. Release sequence

1. Package only manifest-listed files from Snapshot 68.
2. Upload the release ZIP to a disposable staging branch created from current `main`.
3. Run **Carrowmont Batch PR Publisher** with the exact bundle path and confirmation `CREATE_PRS`.
4. Publisher must validate exact base/new hashes, syntax, source contract and staged browser QA before creating PRs.
5. Review and merge only the Publisher-generated PRs in the approved repository order.
6. Do not merge the staging branch itself.
7. Run live Carrowmont Automated QA.
8. Run Multi-Repo Guard.
9. Generate a fresh green Carrowmont Source Snapshot and make it the next authoritative baseline.

## 12. Definition of done

MCR1 Batch 1 is complete only when the exact packaged bundle passes Publisher staging, the live site passes Automated QA, Multi-Repo Guard is green, and a new clean Source Snapshot has been produced after the merges.

## Publisher FIX1 hardening — 15 October 2026

The first Snapshot 68 Publisher run reached staged Chrome QA with **339 PASS / 6 FAIL**. Source contract remained **464 PASS / 0 FAIL**. The six failures were triaged rather than bypassed:

- the new macro authority category had incorrectly been counted as an eighth `data-cm-topic-tool` planning-owner mapping; the seven established planning-owner contract is preserved and the macro category keeps a normal contextual Explorer CTA instead;
- `market-chain-relations.json` now lists the already-approved `Usually pushes higher` and `Usually pushes lower` verdicts in its public allowed-verdict contract;
- the yield-rise browser fixture now protects the intended cause-specific semantics: inflation-driven yield increases are a **usual headwind** for broad stocks, while growth-driven yield increases remain **mixed / cause-dependent**; neither is treated as mechanical stock-price causation;
- same-origin privacy QA now compares runtime requests with the actual page origin, so localhost Publisher staging is tested correctly as well as production;
- Learn-page `Chain Breaker` QA is case-insensitive because the established visual CSS may uppercase the label;
- MCR1 discovery QA targets the macro category's explicit contextual link without redefining GSEO1D's seven planning-tool owners.

No browser assertion was removed merely to obtain GREEN. Each change aligns QA with the approved product architecture or corrects a real data-contract omission.

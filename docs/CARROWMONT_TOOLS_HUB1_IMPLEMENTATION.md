# CARROWMONT TOOLS-HUB1 — All Tools Directory & Homepage Discoverability

## Implementation Record

**Status:** Validated release-candidate implementation record  
**Project:** Carrowmont  
**Baseline:** Snapshot 36  
**Snapshot generated:** 10 October 2026 at 11:40:27 UTC  
**Main-site baseline commit:** `d6392c73d57c6bbed19ec6ef8da71ab1896c6a30`  
**Central-QA baseline commit:** `034ba87da64af4853f69d6e94454df2f662224c5`  
**Approved specification:** `docs/CARROWMONT_TOOLS_HUB1_ALL_TOOLS_DIRECTORY_DISCOVERABILITY_SPEC_FINAL_REV1.md`

---

## 1. Purpose

TOOLS-HUB1 gives Carrowmont a permanent discovery structure before the product catalogue expands further. It adds a canonical all-tools directory, strengthens homepage access to the four live authority tools, preserves the visual identity of the six existing planning tools and introduces a documented country-aware ordering layer for the homepage core tools.

It does not add a new calculator or modify any existing calculator engine.

---

## 2. Implemented public experience

### Canonical directory

`https://carrowmont.com/tools.html`

The directory contains exactly ten currently live assets, grouped as:

1. **Core Planning Tools** — six tools;
2. **Planning & Retirement Stress Tests** — two tools;
3. **Macro & Market Explorers** — two tools.

No unfinished or “coming soon” card is published.

### Homepage discovery

The homepage now contains:

- the six existing core planning cards with their icons, badges, copy, illustrations and CTAs preserved;
- a visually prominent **Explore All Tools** gateway with a tools-grid icon;
- a separate **Explore more financial tools** section linking the 4% Rule Stress Test, FI Number by Spending, US Debt & Interest Cost Calculator and Gold Under Macro Stress Explorer.

The gateway remains outside the demand ranking. With six live core tools it spans two desktop columns. The CSS contract already supports a future seven-tool grid where the gateway becomes the eighth card without publishing a placeholder now.

---

## 3. Country-aware discovery contract

The homepage uses the selected country returned by `CarrowmontLocale.getRegion()` to apply one of eleven deterministic ordering profiles. Currency selection never chooses or changes an order profile.

The complete evidence hierarchy, source registry, profile definitions, country mapping and fallbacks are stored in:

`docs/CARROWMONT_HOMEPAGE_TOOL_DEMAND_MATRIX.md`

The runtime physically reorders card nodes so DOM order, keyboard order and visual order remain aligned. Every tool moves with its complete visual identity.

India uses familiar SIP terminology. Other country profiles use Recurring Investment terminology. Links and the universal calculation engine remain stable.

---

## 4. Controlled files

### `draw004.github.io`

- `tools.html` — new canonical directory;
- `index.html` — homepage gateway, authority section, stable card identifiers and direct directory links;
- `carrowmont.css` — scalable discovery, directory, mobile and standout-gateway styling;
- `site.js` — legacy-link upgrade, country-aware terminology and deterministic card ordering;
- `sitemap.xml` — canonical tools-directory entry;
- `docs/CARROWMONT_ARCHITECTURE.md` — permanent directory/discovery rules;
- `docs/CARROWMONT_HOMEPAGE_TOOL_DEMAND_MATRIX.md` — documented evidence and order contract;
- `docs/CARROWMONT_TOOLS_HUB1_IMPLEMENTATION.md` — this implementation record.

### `carrowmont-qa`

- `qa.config.js` — directory route registered as a main-site page;
- `tests/12-tools-hub.spec.js` — browser, localization, accessibility-order, responsive, metadata and visual coverage;
- `scripts/source-contract.mjs` — protected static and cross-layout source contract.

The six calculator repositories remain untouched.

---

## 5. Release scope and security

Expected generated release PR count: **2**

1. `draw004.github.io`
2. `carrowmont-qa` — merged last

No `.github/workflows/*` file is created or modified by TOOLS-HUB1. Therefore Workflows: Read and write is **not required** for this release.

The normal protected flow remains:

```text
Upload release ZIP to controller repository
→ Batch PR Publisher GREEN
→ merge draw004.github.io PR
→ merge carrowmont-qa PR last
→ Pages GREEN
→ Automated QA GREEN
→ Multi-Repo Guard GREEN
→ fresh Source Snapshot
```

---

## 6. Validation gate

The exact final bundle must pass before upload:

- JavaScript syntax checks;
- HTML parse and semantic checks;
- sitemap XML validation and unique-URL check;
- source contract in Publisher layout;
- source contract in Multi-Repo Guard layout;
- country-profile completeness for every supported locale;
- India, United States and Türkiye ordering fixtures;
- currency-only no-reorder fixture;
- direct-link and legacy-link-upgrade checks;
- 1440 px, 390 px and 360 px overflow checks;
- dedicated Chrome, Edge and mobile Playwright coverage packaged for Publisher/live QA;
- local Chromium preflight at 1440 px, 390 px and 360 px;
- homepage and directory full-page visual capture;
- manifest base/new hashes and ZIP integrity.

Final validation counts are recorded below. The release-bundle SHA-256 is recorded in the release handoff after the immutable ZIP is created.

---

## 7. Search-engine follow-up before Silver

After deployment and final green snapshot:

1. confirm IndexNow received the changed/new URLs for Bing;
2. inspect the following URLs in Google Search Console:
   - `/4-percent-rule-stress-test.html`
   - `/financial-independence-number-by-spending.html`
   - `/us-debt-interest-cost-calculator.html`
   - `/gold-macro-stress-explorer.html`
   - `/tools.html`
3. request indexing only where Google reports that the URL is not indexed and no blocking defect is present;
4. resolve any specific indexing defect before beginning the Silver explorer.

IndexNow notification and sitemap inclusion support discovery but do not guarantee indexing.

---

## 8. Future Home Loan / Mortgage tool

The future universal Home Loan / Mortgage Prepayment & Early Payoff tool is intended to become the seventh live core homepage tool after its own approved specification, release and QA cycle.

It must not appear as a placeholder. When live, the demand matrix must be revised with country-specific intent clusters such as home-loan prepayment/foreclosure, mortgage payoff, mortgage overpayment and extra repayments. Country-specific terminology must sit above one universal calculation engine unless a genuine local rule requires a country module.

---

## 9. Final pre-release validation

The immutable release candidate was checked against the exact Snapshot 36 baseline.

- changed repositories: exactly `draw004.github.io` and `carrowmont-qa`;
- changed files: 8 main-site files and 3 central-QA files;
- JavaScript syntax: PASS;
- HTML semantics, one-H1 and duplicate-ID checks: PASS;
- `tools.html` CollectionPage / ItemList JSON-LD: PASS;
- sitemap XML and 76 unique canonical URLs: PASS;
- source contract in Publisher layout: **292 PASS / 0 FAIL**;
- source contract in Multi-Repo Guard layout: **292 PASS / 0 FAIL**;
- local Chromium behavior/responsive preflight: **120 PASS / 0 FAIL**;
- desktop, 390 px and 360 px visual review: PASS;
- all 44 supported locale profiles (43 named countries plus Other / International) map to one complete six-tool order;
- India, United States and Türkiye order fixtures: PASS;
- currency-only no-reorder fixture: PASS;
- the six existing card icons, copy blocks, CTAs and selective illustrations remain attached to their tools;
- the Explore All Tools gateway remains fixed after the real core tools and is visually distinct;
- no `.github/workflows/*` file changes are included;
- expected Publisher output: exactly **2 PRs**.

The dedicated Playwright suite is included for exact Chrome, Edge and mobile execution by Batch Publisher and live Automated QA.

---

**End of TOOLS-HUB1 implementation record**

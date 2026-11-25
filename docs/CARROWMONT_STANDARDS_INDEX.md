# Carrowmont standards index - one entry, existing authorities

**Version 1.6 | reviewed 24 November 2026.** This is a directory and precedence guide; it does NOT duplicate or replace the approved detailed standards below.

| Topic | Canonical source | Enforced through |
|---|---|---|
| Start procedure, snapshot authority and account portability | `CARROWMONT_DEVELOPMENT_START_HERE.md` + `CARROWMONT_NEW_CHAT_START_HERE.txt` + `CARROWMONT_MASTER_CONTINUITY_HANDBOOK.md` | Handover/source contract and newest supplied all-green snapshot `SNAPSHOT-MANIFEST.txt` |
| Current progress, roadmap status and known debt | `CARROWMONT_CURRENT_PROJECT_STATUS.md` + `CARROWMONT_FRE_MASTER_ROADMAP_STATUS.md` + original Financial Resolution Engine Master Roadmap | Snapshot verification, acceptance ledger, peer review |
| Architecture, deterministic engines, privacy boundaries | `CARROWMONT_ARCHITECTURE.md` + current Batch 0-13A implementation/ledger documents | Existing core source contracts and browser fixtures |
| Header, locale pill, button geometry, mobile responsiveness | `CARROWMONT_SHARED_UI_STANDARD.md` (global header amendment v1.2) + `CARROWMONT_GLOBAL_HEADER_AUDIT.md` | `carrowmont-qa/scripts/development-standards-gate.mjs` + browser QA |
| Installed-app vs normal browser, initial route, install journey | `CARROWMONT_APP_WEBSITE_BEHAVIOR_STANDARD.md` | App/startup/install contracts and browser QA |
| Saved-plan transparency, trust and assumptions | `CARROWMONT_TRUST_STANDARD.md` | Trust/plan/report source contracts and browser QA |
| Connected financial data readiness | `CARROWMONT_FRE_BATCH13A_CONNECTED_DATA_READINESS.md` + `CARROWMONT_FRE_BATCH13A_ACCEPTANCE_LEDGER.md` | Batch 13A source contract + signed-in sandbox browser QA; production feature flag remains off and Batch 13B is ON HOLD |
| Reports and PDF | `CARROWMONT_REPORT_STANDARD_IMPLEMENTATION.md` | PDF/source regression checks |
| Learn educational depth, search intent, links | `draw004.github.io/.github/LEARN-ARTICLE-STANDARD.md` (from main repo root `.github/`) | Learn/Search/SEO contracts and URL checks |
| Learn Hub discovery UX and Search/Learn boundary | `CARROWMONT_LEARN_HUB2_IMPLEMENTATION.md` + `CARROWMONT_LEARN_HUB2_ACCEPTANCE_LEDGER.md` | `learn-hub2-contract.mjs`, targeted Learn Hub browser QA and central source contract; static library remains crawlable/no-JS fallback |
| Evergreen Learn Expansion Wave 1 | `CARROWMONT_EVERGREEN_LEARN_CONTENT_GAP_AUDIT_2026-11-25.md` + `CARROWMONT_EVERGREEN_LEARN_WAVE1_IMPLEMENTATION.md` + `CARROWMONT_EVERGREEN_LEARN_WAVE1_ACCEPTANCE_LEDGER.md` | `evergreen-learn-wave1-contract.mjs`, direct article/Learn Hub browser QA, Search-index build check, sitemap/internal-link checks and central source contract |
| Weekly reference fallback semantics | `CARROWMONT_AUTOMATION_FALLBACK_HARDENING2.md` + `CARROWMONT_GITHUB_AUTOMATION_HANDOVER.md` | `automation-fallback-hardening2-contract.mjs` + source contract; Tuesday Debt/Gold runs are catch-up-only, Country Saturday remains material-change-driven |
| Publisher, Guard, PRs and source snapshots | `CARROWMONT_GITHUB_AUTOMATION_HANDOVER.md` + live `.github/workflows/` files | Staged Publisher source/browser validation, Guard |
| Quality hardening and site-integrity regression protection | `CARROWMONT_QUALITY_HARDENING1_IMPLEMENTATION.md` | `carrowmont-qa/scripts/quality-hardening1-contract.mjs` + central source contract |
| Ask Carrowmont controlled decision expansion | `CARROWMONT_ASK_EXPANSION_WAVE1_IMPLEMENTATION.md` + `CARROWMONT_ASK_EXPANSION_WAVE1_ACCEPTANCE_LEDGER.md` | Wave 1 source/browser/account contracts + central source contract; deterministic engines remain numeric authority |
| Release-credential expiry and security handover | `CARROWMONT_CREDENTIAL_EXPIRY_GUARD.md` + `../ops/credential-expiry-registry.json` | Scheduled independent-token issue alerts and central QA date/issue-policy contracts |
| Historical UI exceptions | `CARROWMONT_UI_LEGACY_EXCEPTIONS.json` | Standards gate (known debt cannot be reintroduced) |

## Implementation priority

1. Read the latest green source and source-controlled standards. Keep the existing tested calculation engines as numeric authority.
2. For any component being added or changed, find its current canonical implementation in an established tool. **Copying old ad hoc markup is not acceptable.**
3. Distinguish applicable shared controls from deliberately different content types: e.g. country-agnostic macro Learn articles need not invent a currency picker.
4. Validate HTML structure with the standards gate before running expensive browser tests. It checks the full seven-destination primary navigation, one active destination per responsive nav, shared shell assets, canonical locale controls and modified-page heading/anchor/metadata/id hygiene. Browser tests must still cover focus/scroll, return journeys, layout at 360/390/412px, desktop, tablet and print as applicable.
5. The gate is intentionally forward-safe: existing known markup deviations remain recorded as debt, but if an excepted HTML file is changed then the deviation must be corrected (or separately approved by a new explicit decision with source and QA updates).
6. A release that edits HTML must declare standards review (`standards_review` keys in `release-manifest.json`). Declarations are not a substitute for actual checks.

## Minimum release acceptance record for a changed tool

Document and test: canonical header and country/currency (globe, label, chevron, correct sizing); first-click fragment expansion and focus/scroll; forward AND return paths between related tools; responsive height/width and no overlap; clear input/results/print treatment; locale examples; deterministic parity; privacy and save boundary; Learn/Search/SEO links; accessible labels and reduced-motion behavior where applicable.

The automated gate cannot verify every user journey by reading HTML. **Do not claim full UX approval until targeted browser tests and real-user/device review are complete.**

## Conflict rules

- A newer specific approved standard supersedes an older generic passage on the same feature. Record the change, including its justification and tests.
- The newest completed all-green Source Snapshot supplied by the owner and its `SNAPSHOT-MANIFEST.txt` establish what currently runs, not what ought to be product policy. Status/handbook documents intentionally do not pin the newest snapshot filename/hash. Where there is a genuine discrepancy, surface it and open a targeted correction rather than silently treating the bug as intended.
- The original master roadmap reserves **Batch 13 for optional connected financial data** and **Batch 14 for a conditional native-app decision**. Batch 12B and Batch 13A are complete. Batch 13B live-provider work is ON HOLD until the owner explicitly reopens it; Batch 14 remains traffic/usage-gated and deferred.

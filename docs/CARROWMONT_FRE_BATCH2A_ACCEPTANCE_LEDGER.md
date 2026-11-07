# Carrowmont Financial Resolution Engine — Batch 2A Acceptance Ledger

**Batch:** 2A — Emergency Fund & Financial Runway Planner  
**Baseline snapshot:** `carrowmont-source-snapshot - 2026-11-07T044538.659.zip`  
**Baseline SHA-256:** `038c8c7b791405ff9e62ab2eb16f03edf95c36d17ae57d3f48b18e7a174cd1cd`  
**Baseline source contract:** 768 PASS / 0 FAIL  
**Main-site baseline commit:** `dedb8ad09418a2f7f72f84f97d6a377c61b6383b`

This ledger is mandatory. No requested outcome may disappear during implementation. Batch 2A is not complete until every row is accounted for and the post-merge release gates are green.

## Mandatory acceptance ledger

| ID | Requested outcome | Implementation / owner | QA evidence required | Status before Publisher |
|---|---|---|---|---|
| R1 | Create a standalone Emergency Fund & Financial Runway tool that answers how long essential spending could continue if income changes. | `emergency-fund-runway-calculator.html/.css/.js` | Public-page contract + browser smoke/responsive QA | IMPLEMENTED / AWAITING PUBLISHER |
| R2 | Keep all financial mathematics in a pure deterministic engine callable by the future Financial Resolution Engine. | `emergency-fund-runway-core.js` | Exact deterministic fixtures + no DOM/storage/network contract | IMPLEMENTED / AWAITING PUBLISHER |
| R3 | Let the user choose the planning target; show the common 3–6 month range as context only, not a universal recommendation. | Core + UI + report + registry documentation | Static wording contract + exact 3/6 reference fixture | IMPLEMENTED / AWAITING PUBLISHER |
| R4 | Include a practical stress scenario using continuing income and an optional one-time shock. | Core + UI + PDF | Deterministic stress fixture + browser result QA | IMPLEMENTED / AWAITING PUBLISHER |
| R5 | Make the engine available to the FRE through the engine catalogue, intent router and standard adapter contract. | `assets/fre/engine-catalog.js`, `intent-router.js`, `resilience-engine-adapters.js`, Registry V4 | FRE core contract + adapter-envelope fixture | IMPLEMENTED / AWAITING PUBLISHER |
| R6 | Preserve guest-first privacy: no login requirement and no new persistence/network transmission of financial inputs. | Tool runtime + core | Storage/URL/network sentinel test | IMPLEMENTED / AWAITING PUBLISHER |
| R7 | Preserve the established global localization contract: 59 region profiles / 48 currencies. | Shared `CarrowmontLocale`; no locale-registry rewrite | Static locale contract + browser locale smoke | IMPLEMENTED / AWAITING PUBLISHER |
| R8 | Make the tool discoverable without changing the nine-card homepage core hierarchy. | Tools Hub + Search index + Sitemap + contextual Learn links | Tools count/search/sitemap/inbound-link contracts + homepage nine-core assertion | IMPLEMENTED / AWAITING PUBLISHER |
| R9 | Provide useful outputs users can keep: Copy Summary, CSV and standardized PDF report. | Tool app + PDF helper/renderer | Copy, CSV and exact PDF-page browser tests | IMPLEMENTED / AWAITING PUBLISHER |
| R10 | Follow Carrowmont GUI/plain-language/responsive standards. | HTML/CSS/app | 360/390/412/768/1280 overflow and interaction checks | IMPLEMENTED / AWAITING PUBLISHER |
| R11 | Extend central QA so the new engine, public page, routing and discovery cannot regress silently. | `fre-emergency-runway-contract.mjs`, `source-contract.mjs`, browser spec/config | Full staged source contract + Publisher browser QA | IN PROGRESS UNTIL FINAL PACKAGE GATE |
| R12 | Release only through exact-hash Publisher packaging, green merge, central QA, Guard and a fresh authoritative snapshot. | Release manifest + standard Carrowmont release flow | Exact overlay/hash validation + post-merge evidence | BLOCKED UNTIL PUBLISHER / POST-MERGE |

## Mandatory 14-dimension change-impact matrix

| # | Dimension | Batch 2A treatment | Pre-Publisher status |
|---|---|---|---|
| 1 | Product intent / user problem | New Protect-stage decision tool for emergency resilience and financial runway. | PASS |
| 2 | Existing engine reuse / formula protection | New isolated core; no existing calculator formula is changed. | PASS |
| 3 | Financial reasoning / prioritization | Evidence supports Protect stage; no universal reserve target is asserted. | PASS |
| 4 | GUI / information hierarchy | Answer-first result, progressive input groups, collapsed explanations. | PASS |
| 5 | Plain language / educational clarity | Uses “runway”, “essential monthly need”, “emergency-ready money”; explanatory context is included. | PASS |
| 6 | Localization / country / currency | Existing 59-region / 48-currency layer reused; neutral terminology in v1. | PASS |
| 7 | Mobile / tablet / desktop / accessibility | Responsive layout and labelled controls; Publisher viewport QA remains mandatory. | AWAITING PUBLISHER |
| 8 | Privacy / data collection / saving | No account, new storage or financial-data network call. | PASS |
| 9 | Shared state / cross-tool | No new shared-state key in Batch 2A; FRE adapter is the integration boundary. | PASS |
| 10 | Charts / reports / PDF | No decorative chart added; Copy/CSV/three-page PDF provide useful outputs. | AWAITING PUBLISHER PDF GATE |
| 11 | Search / URLs / Learn / Research | Public canonical URL, Tools Hub, sitemap, search index and five relevant Learn links updated. | PASS |
| 12 | QA / fixtures / browser | Deterministic and source contracts added; Publisher browser QA mandatory. | IN PROGRESS |
| 13 | Publisher / manifest / base hashes | Exact baseline SHA and per-file hashes required. | BLOCKED UNTIL PACKAGE GATE |
| 14 | Continuity docs / implementation record / latest snapshot | Ledger, implementation record and Engine Registry V4 added; fresh post-merge snapshot required. | AWAITING POST-MERGE SNAPSHOT |

## Stop conditions

Do not merge if any of the following occurs:

- Publisher or central QA is red.
- A manifest base hash does not match the authoritative snapshot.
- The new engine produces different results between direct core and FRE adapter use.
- A user-entered financial sentinel appears in URL, storage, or an external request.
- Country/currency coverage falls below 59 region profiles / 48 currencies.
- The homepage core grid changes from nine cards as a side effect.
- The 3–6 month reference is presented as a compulsory or universally correct target.
- Any R1–R12 acceptance row is missing or silently dropped.

## Definition of Done

Batch 2A is complete only after:

1. every acceptance row is PASS or an explicitly approved N/A;
2. full staged source contract is green on the exact packaged overlay;
3. Publisher source/browser/PDF validation is green;
4. generated PRs are merged in the approved order;
5. Automated QA and Multi-Repo Guard are green; and
6. a fresh Source Snapshot is generated and becomes the new authoritative baseline.

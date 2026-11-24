# Carrowmont Master Continuity & Recovery Handbook

**Version:** 2026-11-24 (snapshot-authority continuity fix after Quality Hardening 1)  
**Permanent repository path:** `docs/CARROWMONT_MASTER_CONTINUITY_HANDBOOK.md`  
**Project:** Carrowmont - Money in Real Life  
**Live site:** carrowmont.com  
**GitHub owner:** Draw004  
**Current code authority:** the newest completed all-green Carrowmont Source Snapshot ZIP supplied with the project; read its root `SNAPSHOT-MANIFEST.txt` for the exact 11 repository SHAs. This handbook intentionally does not pin a current snapshot filename/hash.  
**Historical Quality Hardening 1 source-QA evidence:** **1,553 PASS / 0 FAIL**

> **Purpose:** Make Carrowmont portable across ChatGPT accounts, future developers, and future chats. A new ChatGPT account does not inherit the old account's conversation history, so the durable source of truth must be files: this handbook plus the newest all-green Source Snapshot.


> **MANDATORY NEW START POINT (November 2026):** Read `CARROWMONT_DEVELOPMENT_START_HERE.md`, `CARROWMONT_CURRENT_PROJECT_STATUS.md` and `CARROWMONT_STANDARDS_INDEX.md` before following any historical subsection below. This handbook contains long-lived product principles and history; later implementation records may supersede older counts or UI conventions. Batches 0-12B and **13A** are complete. **Batch 13B is ON HOLD** until the owner explicitly reopens it; **Batch 14 is traffic/usage-gated and deferred**. Quality Audit & Hardening Release 1 is complete. Ask Carrowmont Expansion Wave 1 is the active release and expands the controlled journey set from 7 to 13 using existing deterministic engines. Its deployment state is established by the newest all-green post-merge snapshot. After Wave 1 green close, the path is Learn Hub 2.0 -> Evergreen Learn Expansion -> measurement. The standards gate and Publisher are mandatory. Do not assume that this documentation file automatically updates after merges or that a future ChatGPT account has prior-chat memory.

## 1. Best way to move Carrowmont to another ChatGPT account

Use **two authoritative attachments** in every fresh account or important new chat:

1. **This handbook** - explains product rules, architecture, UX standards, QA and release procedure.
2. **The newest Carrowmont Source Snapshot ZIP** - contains the exact source, repository SHAs, QA tests and current implementation.

If troubleshooting a red run, also attach the latest `carrowmont-batch-pr-publisher-validation (...).zip` artifact.

A handbook alone is not enough for exact code work, because code changes after the handbook is written. A snapshot alone is not enough for safe decision-making, because it does not explain every product decision or operating rule. Together they provide the continuity layer.

### New-chat bootstrap prompt

Use `docs/CARROWMONT_NEW_CHAT_START_HERE.txt` verbatim. Its content, rather than a copied prompt in this historical handbook, is the one authoritative version. Attach the **latest green Source Snapshot ZIP** (or a portable handover pack containing it). No account-specific memory, connector, permission or token should be assumed.

## 2. Current baseline - derive it from the supplied snapshot, do not guess past it

The newest completed all-green Source Snapshot ZIP supplied by the owner is the current code baseline. Open its root `SNAPSHOT-MANIFEST.txt` and read the exact SHAs for all **11 repositories**. Do **not** expect this handbook or the current-status page to mirror the newest snapshot filename/hash; doing so would create a self-referential loop because the documentation update itself changes repository state.

Quality Audit & Hardening Release 1 is complete and Search + Ask Results UX2 is retained. Ask Carrowmont Expansion Wave 1 is the active release: six existing deterministic engines are surfaced as new guided decisions, taking Ask from 7 to 13 controlled journeys. Pre-Publisher Wave 1 source QA reached **1,589 PASS / 0 FAIL**; that is development evidence, not a substitute for Publisher/deployed QA or for rerunning current contracts from the newest snapshot.

Older architecture/handover files inside the repository contain useful history, but some counts and roadmap statements predate newer calculators and later UX changes. When they conflict, use this priority order:

1. newest all-green Source Snapshot;
2. current `carrowmont-qa/scripts/source-contract.mjs` and browser tests;
3. this Master Continuity Handbook;
4. newer approved implementation/spec documents;
5. older historical handover/architecture passages.

## 3. Repository baseline

| Repository | Commit | Current role |
|---|---|---|
| `draw004.github.io` | `534349dd2201ea0fd6b9b8d67180c960c8b38b4a` | Main site, public content, Research, shared runtime, controller workflows |
| `sip-calculator` | `0e718f0c5935948d11c1c4eee1a3059ba0209662` | SIP / recurring investment calculator |
| `goal-planner` | `cfd03c8c66bf85b2f25ee916cde78e51bacfc8b0` | Financial goal planner |
| `financial-independence` | `95b2c40f6396c80290abef514f6b98b241eff333` | Financial independence planner |
| `inflation-calculator` | `89ae312ebf444e932d7545ddf67d8e1d9fd459b9` | Inflation calculator |
| `retirement-calculator` | `28afb6e3bdf438d304dac3eef95abb80baa3590e` | Retirement planner / calculator |
| `budget-cash-flow-planner` | `81524657dd9d24353ba2ee8f761be3b6c5629db7` | Budget & cash flow planner; debt-payoff capability |
| `mortgage-payoff-calculator` | `8b6650487a6c47b79f6ec6729795c00759b929df` | Mortgage / home-loan payoff and decision-centre tools |
| `compound-interest-calculator` | `bd85864abbff231bf54e1cc3864cb699a106fbcb` | Compound interest calculator |
| `loan-calculator` | `7410d13df9b0014ce9ccf402af839876e7eb8fa3` | Loan / EMI calculator |
| `carrowmont-qa` | `29dbcae5d78d16d5f189b5a4efdf70a1894b02f3` | Shared source-contract, browser, PDF and regression QA |


The controller repository is `Draw004/draw004.github.io`. The central QA repository is `Draw004/carrowmont-qa`.

## 4. Product identity and operating principles

- Brand: **Carrowmont - Money in Real Life**.
- Core promise: practical tools, clear explanations and scenario analysis for real-world financial planning.
- Global/universal-first design. India-specific terminology is used only when the selected country is India.
- Country changes sensible defaults and wording; it should not force assumptions the user cannot override.
- Keep calculation logic separate from labels, currency symbols, UI formatting, report copy and country defaults.
- Prefer one flexible international tool over separate country-specific calculators unless the calculation logic truly differs.
- Preserve simple, consistent, international, testable, safe and maintainable product behavior.
- Outputs are educational/planning estimates, not guaranteed outcomes or individualized regulated financial advice.

## 5. Current UX contracts

### Desktop header

Canonical order:

`Home | Tools | Learn | Research | Methodology | About | Search | Country/Currency`

Rules:
- **Home** is the first item everywhere; old `Plan` navigation is retired.
- Search is immediately after About and before the separate locale control.
- The locale control must not be inserted into the navigation list in a way that breaks ordering.

### Mobile header

Current approved MOBILE2 contract:
- **one compact row**;
- strong `CARROWMONT` brand on the left;
- rounded rectangular **Search** pill in the middle;
- compact country/currency control anchored at the far right;
- **no hamburger menu** and no hamburger dropdown;
- no multi-row blank white header area;
- test at 412px, 390px and 360px widths when header CSS/runtime changes.

Bottom navigation remains:

`Home | Tools | Learn | Research | More`

### Learn hub

- The shared topic selector is labeled **Explore by topic**.
- It sits after the Learn hero/intro and before the Search section in the intended page flow.
- `Try a topic` was deliberately removed **globally** (desktop, tablet and mobile) to avoid duplication.
- Preserve the legacy `#home-loans` anchor inside the new topic navigation for compatibility.
- Country-aware topic wording applies: e.g. India can use SIP terminology; non-India should use neutral recurring-investing language.

## 6. Current content/discovery baseline

The current QA contract protects:
- the current source-index inventory (review the index files for an authoritative count);
- existing Learn guides and the seven added in Batch 12A;
- **3 formal Research studies** currently covered by newsletter/Research contracts;
- stable sitemap/search ownership and truthful freshness;
- distinct search intent between calculators, research studies and evergreen Learn content.

The homepage currently exposes nine real planning-tool cards in the core grid plus an **Explore All Tools** gateway. The broader Tools hub also exposes scenario/research tools that do not need separate repositories.

## 7. Country, currency and localization rules

- Country list should be alphabetical; `Other / International` stays at the end.
- First-visit locale detection prioritizes current device timezone before browser language.
- A saved explicit region preference wins over inference.
- An orphaned saved currency must not override a newly detected country.
- Country and currency continuity is shared across compatible tools.
- Financial values may transfer between tools only when semantic meaning and currency are compatible and validated.
- Do not silently change assumptions while carrying values across tools.
- Keep pay frequency separate from contribution frequency.
- Do not create country-specific tools merely for terminology differences.

Examples of wording principles:
- India: SIP, Home Loan, EMI where appropriate.
- US/other markets: Recurring/Monthly Investment, Mortgage, repayment/payment terminology where appropriate.
- Australia/New Zealand may use Home Loan terminology where established.

## 8. Privacy, analytics and newsletter boundaries

- Prefer in-browser/local calculations and local state where practical.
- Do not collect unnecessary sensitive financial inputs.
- Search words remain in the browser and are not sent to an external search provider.
- Do not introduce a consent popup or invasive tracking merely for convenience.
- Newsletter signup is optional and uses the approved Kit integration/identity; calculator data remains separate.
- The confirmation page remains noindex and routes users back into Tools/Learn/Research.
- Never expose API keys, PATs, GitHub secrets or newsletter credentials in frontend code, documentation, screenshots or chat.

## 9. Reports and calculator math

- Do not change formulas during wording, UI, navigation, SEO, analytics, content or report-formatting work unless the requested change explicitly requires a methodology change.
- Keep calculation engines isolated from localization and display formatting.
- Reports should follow the shared Carrowmont report standard, include assumptions/methodology and relevant related-tool links.
- Shared report-standard files/registries must remain consistent across repositories where the QA contract requires it.
- PDF/report changes must be browser/PDF-QA tested, not inferred from source only.

## 10. GitHub automation - the safe release flow

Canonical process:

```text
Fresh Source Snapshot
  -> prepare reviewed release bundle
  -> upload bundle to disposable staging branch (commonly 0/0)
  -> Carrowmont Batch PR Publisher + CREATE_PRS
  -> staged hash/source/browser/PDF QA
  -> generated review PRs
  -> human review and merge
  -> Carrowmont Automated QA
  -> Multi-Repo Guard
  -> fresh Source Snapshot
  -> independent live interaction / visual verification of changed behavior
  -> close the release only after that verification
```

Important rules:
- The disposable staging branch is a transport branch. **Do not merge it into main.**
- Normal product automation creates PRs; it does not auto-merge normal product changes.
- `CREATE_PRS` is the Publisher confirmation word.
- `RELEASE` belongs to the separate formal GitHub tag/release workflow.
- If Publisher is red, do not bypass it by making manual PRs just to get the change through.
- After an all-green release, run a new Source Snapshot and treat its `SNAPSHOT-MANIFEST.txt` as the next code/commit baseline. **Do not open another PR solely to copy that new snapshot filename/hash into status documents**; update product/release state and QA evidence only when there is substantive state to record.
- **Post-snapshot live verification is mandatory for changed interactive UX.** After the owner reports all green and supplies the fresh snapshot, independently exercise the changed Carrowmont.com behavior before marking the item CLOSED. Click new/changed cards, CTAs, links and controls; check pointer/keyboard behavior, desktop/mobile layout, scrolling/overflow, empty/error states, locale behavior where relevant and obvious calculation paths. Publisher/browser QA is necessary but does not replace this post-deployment check. If the environment cannot truthfully exercise a live interaction, state that limitation instead of claiming it was tested.

## 11. Release-bundle contract

A safe release bundle should:
- contain `release-manifest.json` with schema/version expected by Publisher;
- list allowed target repositories/files only;
- include reviewed base SHA-256 and new SHA-256 hashes;
- be built from the newest verified all-green Source Snapshot supplied for the release;
- contain no unapproved workflow files;
- avoid unrelated file churn;
- pass JavaScript syntax checks where relevant;
- pass the shared source contract and staged browser/PDF QA before PR creation.

Base-hash protection is intentional. If Publisher says a base file changed, stop and build from a fresh Source Snapshot. Do not edit hashes just to force an old bundle through.

## 12. Controller workflows and secret names

Controller: `Draw004/draw004.github.io`

Important workflows:
- Carrowmont Source Snapshot
- Carrowmont Batch PR Publisher
- Carrowmont Multi-Repo Dry Run
- Carrowmont Multi-Repo Guard
- Carrowmont Repository Access Check
- GitHub Pages deployment
- scheduled/reference refresh workflows where applicable

QA repository: `Draw004/carrowmont-qa`
- Carrowmont Automated QA
- Carrowmont Release (formal tags/releases only)

Secret names that may appear in workflow source:
- `CARROWMONT_REPO_TOKEN`
- `CARROWMONT_RELEASE_TOKEN`

**Never store or request the actual secret values in this handbook or a chat.** If access fails, inspect token scope/expiry in GitHub and update the repository secret there.

## 13. QA rules

Current extracted-snapshot source-contract result: **1,351 PASS / 0 FAIL**.

QA is a product contract, not an afterthought. When an approved product rule changes, update both the implementation and the relevant QA contract in the same release.

Before a shared change, test at least:
- source contract;
- desktop layout/navigation;
- mobile widths 412/390/360 when responsive code changes;
- country/currency/localization behavior;
- calculator determinism/math when touched;
- links/search/sitemap when public discovery changes;
- report/PDF behavior when report code changes;
- no unexpected horizontal overflow;
- no console/runtime errors.

A green static/source check does **not** prove a visual browser change is correct. Publisher browser QA is authoritative for staged responsive behavior.

## 14. Failure handling

### Publisher says base file changed
Create a fresh Source Snapshot, rebuild the release and regenerate hashes. Never bypass the guard.

### Source-contract failure
Inspect the exact assertion and decide whether:
1. implementation is wrong; or
2. the approved product contract changed and the test legitimately needs updating.

Do not weaken a valid test merely to get green.

### Browser/PDF failure
Inspect the Publisher validation artifact, Playwright output/screenshots and the exact viewport/test. Fix the root behavior, then rebuild a complete release bundle.

### Authentication/404/403
Check exact repository name first, then token scope/expiry and repository permissions. Known historical error: `retirement-planner` is wrong; repository is `retirement-calculator`.

## 15. Working style for future ChatGPT sessions

The project owner prefers a low-manual-step workflow. A future assistant should:
- use simple language and explicit file names;
- inspect the supplied snapshot/artifact rather than guessing;
- aim for one consolidated fix instead of repeated trial-and-error red runs;
- provide a complete ready-to-upload Publisher ZIP when code changes are requested;
- avoid asking the user to run local scripts when the assistant can package the release directly;
- explain exactly what will change before touching shared UX/contracts;
- preserve established Carrowmont rules unless the owner explicitly changes them;
- never claim success/green without validation evidence;
- keep the user informed during longer technical work.

## 16. New tool / repository checklist

When adding a new repository/tool:
1. create and name the repository consistently;
2. add it to central token scope if cross-repo automation needs it;
3. update Repository Access Check;
4. update Multi-Repo Dry Run/Guard;
5. update Source Snapshot coverage;
6. update Publisher allow-list and complete-baseline clone list;
7. extend source-contract/browser QA;
8. update Tools hub/homepage/contextual discovery as appropriate;
9. update sitemap/search index if a public route is added;
10. run access checks, Publisher/QA/Guard and create a fresh snapshot after merge.

A new repository must not become a central-QA blind spot.

## 17. Restart checklist for a new ChatGPT account

At the beginning of a fresh account/chat:

- attach this handbook;
- attach the newest all-green Source Snapshot;
- if debugging, attach the latest Publisher validation ZIP;
- tell the assistant to inspect files before answering technical questions;
- ask it to state the current baseline snapshot filename and repository SHAs before making a release;
- confirm it understands `CREATE_PRS` versus `RELEASE`;
- confirm it will not merge the staging branch;
- confirm it will preserve calculator formulas unless explicitly asked to change them;
- confirm it will package a complete ready-to-upload release ZIP;
- after a successful release, replace the old snapshot in your continuity pack with the new one.

## 18. What must be updated in this handbook over time

Update the handbook when any of these materially change:
- repository list;
- central workflow names/inputs;
- secret names (never values);
- release/publisher procedure;
- canonical navigation or responsive layout contracts;
- country/localization architecture;
- report standard architecture;
- tool registry/core-grid rules;
- QA architecture or major test families;
- privacy/newsletter architecture.

Routine article edits or isolated copy fixes do not require a new handbook version if the architecture and operating rules are unchanged. A newer Source Snapshot still supersedes the old code baseline.

## 19. Recovery rule if documentation and code disagree

Do not guess. Use this sequence:

1. inspect the newest snapshot's `SNAPSHOT-MANIFEST.txt`;
2. inspect current source and current `carrowmont-qa` contracts;
3. compare with this handbook and implementation docs;
4. identify whether the discrepancy is stale documentation or a regression;
5. fix the product and QA together if needed;
6. publish only through the safe reviewed flow.

## 20. Final continuity principle

Carrowmont should never depend on one ChatGPT account's memory.

The durable project memory is:

**newest all-green Source Snapshot + this handbook + current QA contracts + GitHub history.**

Keep those together and a future ChatGPT account, developer or maintainer can resume the project without reconstructing months of decisions from old chats.

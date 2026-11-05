# Carrowmont Master Continuity & Recovery Handbook

**Version:** 2026-11-06  
**Permanent repository path:** `docs/CARROWMONT_MASTER_CONTINUITY_HANDBOOK.md`  
**Project:** Carrowmont - Money in Real Life  
**Live site:** carrowmont.com  
**GitHub owner:** Draw004  
**Authoritative baseline snapshot:** `carrowmont-source-snapshot - 2026-11-06T001111.170.zip`  
**Snapshot SHA-256:** `cb3318be3972671fb13027d5300b9512691d398ad8190b2fc784ba68c802029a`  
**Verified source contract:** **723 PASS / 0 FAIL**

> **Purpose:** Make Carrowmont portable across ChatGPT accounts, future developers, and future chats. A new ChatGPT account does not inherit the old account's conversation history, so the durable source of truth must be files: this handbook plus the newest all-green Source Snapshot.

## 1. Best way to move Carrowmont to another ChatGPT account

Use **two authoritative attachments** in every fresh account or important new chat:

1. **This handbook** - explains product rules, architecture, UX standards, QA and release procedure.
2. **The newest Carrowmont Source Snapshot ZIP** - contains the exact source, repository SHAs, QA tests and current implementation.

If troubleshooting a red run, also attach the latest `carrowmont-batch-pr-publisher-validation (...).zip` artifact.

A handbook alone is not enough for exact code work, because code changes after the handbook is written. A snapshot alone is not enough for safe decision-making, because it does not explain every product decision or operating rule. Together they provide the continuity layer.

### New-chat bootstrap prompt

```text
CARROWMONT NEW-CHAT START PROMPT

I am continuing an existing project called Carrowmont (carrowmont.com). I have attached:
1) `docs/CARROWMONT_MASTER_CONTINUITY_HANDBOOK.md` from the newest Source Snapshot (or this Markdown file attached separately)
2) carrowmont-source-snapshot - 2026-11-06T001111.170.zip, or a newer Carrowmont Source Snapshot if available.

Treat the newest Source Snapshot as the code/source baseline and the handbook as the operating-policy baseline. Do not rely on assumptions from older Carrowmont conversations or older handover documents when they conflict with the newest snapshot/source-contract.

Before changing anything:
- inspect SNAPSHOT-MANIFEST.txt and the relevant source files;
- summarize the current repository baseline and the non-negotiable product/release rules;
- preserve country-aware terminology, calculator math, report standards, responsive behavior and existing QA contracts unless the requested change explicitly changes a contract;
- use the safe flow: fresh snapshot -> reviewed release bundle -> disposable staging branch -> Carrowmont Batch PR Publisher -> staged QA -> generated PRs -> human merge -> live QA/Guard -> fresh snapshot;
- use CREATE_PRS for Batch PR Publisher; RELEASE is only for formal tag/release creation;
- never merge the disposable staging branch itself;
- never ask me to paste GitHub tokens or secrets into chat;
- do not bypass a red Publisher/QA run; inspect its artifact and fix the root cause;
- for changes, prefer one complete Publisher-ready ZIP over local scripts or many manual edits;
- do not silently change calculator formulas during copy, UI, SEO or layout work;
- do not claim all-green unless the exact packaged release has passed the applicable validation.

Current baseline in the attached 2026-11-06 snapshot: source-contract 723 PASS / 0 FAIL. Snapshot SHA-256: cb3318be3972671fb13027d5300b9512691d398ad8190b2fc784ba68c802029a.

If I provide a newer all-green Source Snapshot, that newer snapshot supersedes this baseline. Update the handbook/version notes after a meaningful architecture or workflow change.
```

## 2. Current baseline - do not guess past it

The 2026-11-06 source snapshot is the current all-green baseline for this handbook. It contains **11 repositories** and the shared QA system. The source-contract run against the extracted snapshot produced **723 PASS / 0 FAIL**.

Older architecture/handover files inside the repository contain useful history, but some counts and roadmap statements predate newer calculators and later UX changes. When they conflict, use this priority order:

1. newest all-green Source Snapshot;
2. current `carrowmont-qa/scripts/source-contract.mjs` and browser tests;
3. this Master Continuity Handbook;
4. newer approved implementation/spec documents;
5. older historical handover/architecture passages.

## 3. Repository baseline

| Repository | Commit | Current role |
|---|---|---|
| `draw004.github.io` | `93e425053b4d443c589425790fc76eee568e7895` | Main site, public content, Research, shared runtime, controller workflows |
| `sip-calculator` | `c51e16930b99986a0f3d0213d902c13d9b7c0277` | SIP / recurring investment calculator |
| `goal-planner` | `af3d8d03fbb69059e1849f4745048190344e6deb` | Financial goal planner |
| `financial-independence` | `45f15d29f91e6eaa54ffea81626375286b36edf3` | Financial independence planner |
| `inflation-calculator` | `e8eb5440e0d1a201fe6b7b64272400538548f897` | Inflation calculator |
| `retirement-calculator` | `145eb958a4b9868ec47aeae96328b449271b88ec` | Retirement planner / calculator |
| `budget-cash-flow-planner` | `ba640e389b5974c7871d7c0968b5511d8e652883` | Budget & cash flow planner; debt-payoff capability |
| `mortgage-payoff-calculator` | `b3c593b55020cfa5e4164047fc1bf0eb35bca3be` | Mortgage / home-loan payoff and decision-centre tools |
| `compound-interest-calculator` | `251dde96ad1b75cfbfc51ff0853507e30c10f8ae` | Compound interest calculator |
| `loan-calculator` | `eb64f2cedb17cf46da3376bac797028fc0b28b1a` | Loan / EMI calculator |
| `carrowmont-qa` | `d09716007285bc4d77aae926e78628cd57526ea8` | Shared source-contract, browser, PDF and regression QA |


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
- **132 public pages** in the reviewed site inventory;
- **90 Learn guides**;
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
```

Important rules:
- The disposable staging branch is a transport branch. **Do not merge it into main.**
- Normal product automation creates PRs; it does not auto-merge normal product changes.
- `CREATE_PRS` is the Publisher confirmation word.
- `RELEASE` belongs to the separate formal GitHub tag/release workflow.
- If Publisher is red, do not bypass it by making manual PRs just to get the change through.
- After an all-green release, run a new Source Snapshot and treat it as the next authoritative baseline.

## 11. Release-bundle contract

A safe release bundle should:
- contain `release-manifest.json` with schema/version expected by Publisher;
- list allowed target repositories/files only;
- include reviewed base SHA-256 and new SHA-256 hashes;
- be built from the newest authoritative snapshot;
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

Current extracted-snapshot source-contract result: **723 PASS / 0 FAIL**.

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

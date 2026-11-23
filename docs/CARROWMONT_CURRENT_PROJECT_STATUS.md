# Carrowmont - current project status

**Status verified:** 24 November 2026, after the all-green Search + Ask Results UX2 deployment snapshot and before Quality Audit & Hardening Release 1 is published.  
**Authoritative green source snapshot:** `carrowmont-source-snapshot - 2026-11-23T224718.530.zip`  
**Snapshot SHA-256:** `69f846cfcfc749b5e10d83d1150d85e6e2b8bf63fdce528eee3ff644064c84c5`  
**Source/standards QA at this baseline:** 1,547 PASS / 0 FAIL.  
**Release status:** Search + Ask Results UX2 is deployed and captured in the authoritative green snapshot. The next controlled release is **Quality Audit & Hardening Release 1**. Batch 13B is **ON HOLD** pending a future owner decision; Batch 14 is deferred until real traffic/usage justifies reconsidering native apps.

## Exact repository baseline

These commits are recorded in the authoritative `SNAPSHOT-MANIFEST.txt`; that manifest supersedes this file if a newer green snapshot is issued.

| Repository | Commit |
|---|---|
| `draw004.github.io` | `bd26963f1e054b36133083f38dd97e4edb302d5c` |
| `sip-calculator` | `0e718f0c5935948d11c1c4eee1a3059ba0209662` |
| `goal-planner` | `cfd03c8c66bf85b2f25ee916cde78e51bacfc8b0` |
| `financial-independence` | `95b2c40f6396c80290abef514f6b98b241eff333` |
| `inflation-calculator` | `89ae312ebf444e932d7545ddf67d8e1d9fd459b9` |
| `retirement-calculator` | `28afb6e3bdf438d304dac3eef95abb80baa3590e` |
| `budget-cash-flow-planner` | `81524657dd9d24353ba2ee8f761be3b6c5629db7` |
| `mortgage-payoff-calculator` | `8b6650487a6c47b79f6ec6729795c00759b929df` |
| `compound-interest-calculator` | `bd85864abbff231bf54e1cc3864cb699a106fbcb` |
| `loan-calculator` | `7410d13df9b0014ce9ccf402af839876e7eb8fa3` |
| `carrowmont-qa` | `07255b2deba3df6dffbe982ed269bf55b3978103` |

## Product state

- **Batches 0-11:** completed per the existing acceptance ledgers.
- **Batch 12 / Batch 12B:** completed; the Batch 12 SEO/indexing closeout are complete.
- **Batch 12B-3 Mortgage Recast vs Refinance/Prepayment:** deployed and preserved as shipped without adding a public URL.
- **Batch 13A Connected Financial Data Readiness:** completed. The provider-neutral sandbox/readiness architecture is deployed; the production feature flag OFF boundary remains in force and no real bank/provider is connected.
- **Search + Ask Results UX2:** deployed and captured in this baseline. Desktop Search shows Tools and Learn & Guides side-by-side with independent panes, with the scrollbar on the right edge of each pane; mobile uses counted Tools/Learn tabs with normal page scrolling; result cards and their visible CTAs share the same real link destination. Ask keeps the compact fallback presentation and working route cards.
- **Batch 13B live provider pilot:** **ON HOLD; not approved yet.** Do not start provider selection, bank connectivity or production financial-data activation until the owner explicitly reopens it. A future restart still requires provider/jurisdiction, privacy/legal, security, deletion/consent and cost review.
- **Batch 14 native iOS/Android:** **DEFERRED / TRAFFIC-GATED.** Do not build native apps until website/PWA traffic, repeat usage and capability gaps justify the cost and maintenance.
- **Discovery/Search Growth Agent:** remains a separate future track and must not displace the active product-quality roadmap.
- **Repository branch cleanup:** deferred maintenance; it must not block current product work.
- **Credential Expiry Guard v1:** deployed. The registered release-token expiry remains 22 September 2027; temporary PAT Workflows write permission was removed again after the workflow-changing release that required it.

## Active development path

The owner has explicitly redirected development from new high-risk infrastructure toward making the existing Carrowmont system deeper, more reliable and easier to discover.

1. **Quality Audit & Hardening** - active controlled release. Audit integrity, internal links, workflow reliability, documentation continuity, performance, privacy/security, accessibility, SEO/PWA boundaries and QA gaps; fix confirmed issues without changing financial formulas.
2. **Ask Carrowmont Expansion** - next product expansion. Grow beyond the current seven controlled journeys by reusing tested deterministic engines and keeping Ask a controlled traffic-controller/decision layer rather than an unrestricted chatbot.
3. **Learn Hub 2.0** - develop Learn to the same maturity level as Search while preserving a distinct educational-discovery role. Search answers "find what I mean"; Learn should answer "help me understand what to learn next."
4. **Evergreen Learn Expansion** - add carefully selected, unique-intent evergreen guides only after content-gap, duplication, source and internal-link review. Maintain existing depth, sourcing, localization and SEO discipline.
5. **Measurement & next-priority review** - use actual traffic, Search Console and user behaviour to decide the next expansion instead of adding pages/features for volume alone.

## Quality Audit & Hardening Release 1 - review state

This release is being built from the authoritative green snapshot above. It is **not part of the authoritative baseline until Publisher review, merge, deployed QA, Multi-Repo Guard and a fresh green Source Snapshot complete.**

Confirmed baseline audit findings:

- source contract: **1,547 PASS / 0 FAIL**;
- search index and sitemap remain aligned at the currently protected 145 indexed URLs;
- three missing internal Learn destinations caused eight broken-link occurrences;
- no duplicate public-page titles, duplicate meta descriptions or duplicate canonicals were found in the reviewed baseline audit;
- no missing local JS/CSS/image targets were found in the reviewed baseline audit;
- GitHub scheduled workflows can be delayed or dropped under load, so weekly reference updaters need a safe fallback trigger even though their data validation and protected-PR logic are sound.

Release 1 repairs the broken destinations by routing to existing canonical content, strengthens reference-workflow scheduling, updates portable handover/roadmap records, and adds a permanent site-integrity source contract so broken internal destinations are caught before Publisher.

The missing editorial topic **Emergency Fund vs Paying Off Debt** is retained as a high-priority evergreen Learn candidate. It is not being rushed into the hardening release because a new indexed guide must follow the full Learn editorial, search-intent, sourcing, structured-data, internal-link and freshness process.

## Required guardrails

- Reuse canonical UI and locale components and tested deterministic financial engines. Never silently change formulas or saved plans.
- Keep guest-first tools, optional accounts, explicit save/update, trust/source traceability, Learn/Search SEO and PWA startup/navigation unchanged unless explicitly approved.
- Ask Carrowmont remains controlled and deterministic: tested engines calculate; Ask routes, gathers inputs and explains.
- Existing QA and automated standards run before Publisher; Publisher creates PRs and never merges automatically.
- After approved merge, run deployed Chrome Desktop, Edge Desktop and Mobile Chromium QA as applicable, Multi-Repo Guard, and a fresh Source Snapshot.
- No tokens, account credentials, private financial data or recovery codes in public GitHub docs/issues, portable handovers or PR bundles.
- Every development release must update the account-independent handover/status/roadmap record. Code without continuity documentation is not complete.

## Account-independent handover rule

Carrowmont must not depend on a particular ChatGPT account or chat history. A new AI assistant or human developer must be able to resume from the repository plus the newest all-green Source Snapshot. Every release therefore records: baseline, objective, exact changes, affected files, locked decisions, QA/evidence, known limitations, deferred/on-hold items, next steps, deployment status and safe operational/configuration notes.

## Snapshot and documentation policy

Never treat a proposed Publisher release as deployed. The newest green `SNAPSHOT-MANIFEST.txt` is authoritative for code/commit truth. Update this status file after merge/deployed validation/fresh snapshot, and clearly label any pre-merge release state as review/proposed work.

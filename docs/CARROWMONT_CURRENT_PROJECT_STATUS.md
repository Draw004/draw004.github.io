# Carrowmont - current project status

**Status verified:** 24 November 2026, after Quality Audit & Hardening Release 1 completed the full green release path and was captured in a fresh Source Snapshot.  
**Authoritative green source snapshot:** `carrowmont-source-snapshot - 2026-11-24T023324.666.zip`  
**Snapshot SHA-256:** `f7beeb6e9fa125e801ee8f6311867b91c381fa2ac3be79bfc452527c07521b72`  
**Source/standards QA at this baseline:** 1,553 PASS / 0 FAIL.  
**Release status:** **Quality Audit & Hardening Release 1 is complete and captured in the authoritative green snapshot.** The next controlled product release is **Ask Carrowmont Expansion Wave 1**. Batch 13B is **ON HOLD** pending a future owner decision; Batch 14 is deferred until real traffic/usage justifies reconsidering native apps.

## Exact repository baseline

These commits are recorded in the authoritative `SNAPSHOT-MANIFEST.txt`; that manifest supersedes this file if a newer green snapshot is issued.

| Repository | Commit |
|---|---|
| `draw004.github.io` | `534349dd2201ea0fd6b9b8d67180c960c8b38b4a` |
| `sip-calculator` | `0e718f0c5935948d11c1c4eee1a3059ba0209662` |
| `goal-planner` | `cfd03c8c66bf85b2f25ee916cde78e51bacfc8b0` |
| `financial-independence` | `95b2c40f6396c80290abef514f6b98b241eff333` |
| `inflation-calculator` | `89ae312ebf444e932d7545ddf67d8e1d9fd459b9` |
| `retirement-calculator` | `28afb6e3bdf438d304dac3eef95abb80baa3590e` |
| `budget-cash-flow-planner` | `81524657dd9d24353ba2ee8f761be3b6c5629db7` |
| `mortgage-payoff-calculator` | `8b6650487a6c47b79f6ec6729795c00759b929df` |
| `compound-interest-calculator` | `bd85864abbff231bf54e1cc3864cb699a106fbcb` |
| `loan-calculator` | `7410d13df9b0014ce9ccf402af839876e7eb8fa3` |
| `carrowmont-qa` | `29dbcae5d78d16d5f189b5a4efdf70a1894b02f3` |

## Product state

- **Batches 0-11:** completed per the existing acceptance ledgers.
- **Batch 12 / Batch 12B:** completed; the Batch 12 SEO/indexing closeout are complete.
- **Batch 12B-3 Mortgage Recast vs Refinance/Prepayment:** deployed and preserved as shipped without adding a public URL.
- **Batch 13A Connected Financial Data Readiness:** completed. The provider-neutral sandbox/readiness architecture is deployed; the production feature flag OFF boundary remains in force and no real bank/provider is connected.
- **Search + Ask Results UX2:** deployed and retained. Desktop Search shows Tools and Learn & Guides side-by-side with independent panes, with the scrollbar on the right edge of each pane; mobile uses counted Tools/Learn tabs with normal page scrolling; result cards and their visible CTAs share the same real link destination. Ask keeps the compact fallback presentation and working route cards.
- **Quality Audit & Hardening Release 1:** **completed and deployed.** Verified Learn-link gaps were repaired, protected reference updaters gained safe fallback schedules, site-integrity regression coverage was added, handover/roadmap records were strengthened, and the Search UX2 browser assertion exposed by Publisher was repaired without changing product behavior.
- **Batch 13B live provider pilot:** **ON HOLD; not approved yet.** Do not start provider selection, bank connectivity or production financial-data activation until the owner explicitly reopens it. A future restart still requires provider/jurisdiction, privacy/legal, security, deletion/consent and cost review.
- **Batch 14 native iOS/Android:** **DEFERRED / TRAFFIC-GATED.** Do not build native apps until website/PWA traffic, repeat usage and capability gaps justify the cost and maintenance.
- **Discovery/Search Growth Agent:** remains a separate future track and must not displace the active product-quality roadmap.
- **Repository branch cleanup:** deferred maintenance; it must not block current product work.
- **Credential Expiry Guard v1:** deployed. The registered release-token expiry remains 22 September 2027. Quality Hardening 1 required temporary PAT **Workflows: read/write** because it changed workflow files; the normal security baseline is to remove that temporary permission immediately after the green release closeout.

## Active development path

Quality Audit & Hardening Release 1 is complete. The owner has explicitly redirected development from new high-risk infrastructure toward making the existing Carrowmont system deeper, more reliable and easier to discover.

1. **Ask Carrowmont Expansion - Wave 1 (NEXT / ACTIVE).** Grow beyond the current seven controlled journeys by reusing tested deterministic engines and keeping Ask a controlled traffic-controller/decision layer rather than an unrestricted chatbot.
2. **Learn Hub 2.0.** Develop Learn to the same maturity level as Search while preserving a distinct educational-discovery role. Search answers "find what I mean"; Learn should answer "help me understand what to learn next."
3. **Evergreen Learn Expansion.** Add carefully selected, unique-intent evergreen guides only after content-gap, duplication, source and internal-link review. Maintain existing depth, sourcing, localization and SEO discipline.
4. **Measurement & next-priority review.** Use actual traffic, Search Console and user behaviour to decide the next expansion instead of adding pages/features for volume alone.

## Quality Audit & Hardening Release 1 - deployed closeout

This release is part of the authoritative baseline above. The full release path completed: Publisher staged QA -> reviewed merge -> deployed checks / Multi-Repo Guard -> fresh all-green Source Snapshot.

Closeout evidence preserved in this snapshot:

- source contract: **1,553 PASS / 0 FAIL**;
- static local internal-destination audit: **0 broken local href/src targets**;
- Search + Ask Results UX2 browser test was hardened to verify the real left/right layout requirement without an arbitrary pixel-offset threshold;
- US Debt updater: Monday primary + Tuesday fallback;
- Gold updater: Monday primary + Tuesday fallback;
- Country References: weekday primary checks + Saturday catch-up;
- Batch 13B remains **ON HOLD** and Batch 14 remains **DEFERRED / TRAFFIC-GATED**;
- portable handover and new-account instructions are mandatory release scope.

The missing editorial topic **Emergency Fund vs Paying Off Debt** remains a high-priority evergreen Learn candidate. It must follow the full Learn editorial, search-intent, sourcing, structured-data, internal-link and freshness process rather than being inserted as a thin repair page.

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

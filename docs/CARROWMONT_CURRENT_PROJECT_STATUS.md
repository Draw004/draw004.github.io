# Carrowmont - current project status

**Status verified:** 24 November 2026, after Quality Audit & Hardening Release 1 completed the full green release path.  
**Snapshot authority rule:** the newest completed **all-green Carrowmont Source Snapshot ZIP supplied with the project** is authoritative for current code and repository-commit truth. Read its root `SNAPSHOT-MANIFEST.txt`; do not use a snapshot filename or SHA copied into a status document as proof that it is still current.  
**Documentation role:** this file records product/release state, decisions, QA evidence and next work. It intentionally does **not** pin a "current authoritative snapshot" filename/hash, because every documentation commit would otherwise create a newer repository state and an endless snapshot-reference loop.  
**Last documented source-QA milestone:** Ask Carrowmont Expansion Wave 1 review candidate reached **1,589 PASS / 0 FAIL** before Publisher. This is development evidence, not deployed-browser acceptance; re-run the current contracts from the newest supplied snapshot before changing source.  
**Release status:** **Ask Carrowmont Expansion Wave 1 is the active controlled release.** This source expands Ask from 7 to 13 deterministic guided journeys. Treat Wave 1 as deployed only if these changes are present in the newest completed all-green post-merge Source Snapshot supplied by the owner. Once that condition is met, the next product release is **Learn Hub 2.0**. Batch 13B is **ON HOLD**; Batch 14 remains traffic/usage-gated.

## How to establish the exact repository baseline

Do not derive current commits from this status page. For any new chat, developer handover, release or incident:

1. obtain the newest completed all-green Source Snapshot ZIP supplied by the owner;
2. read the root `SNAPSHOT-MANIFEST.txt`;
3. use the 11 repository SHAs recorded there as the exact code baseline;
4. if newer repository commits are known to exist, verify them explicitly before treating them as current;
5. treat snapshot names/hashes preserved in implementation records as **historical release evidence only**.

The 11-repository set is: `draw004.github.io`, `sip-calculator`, `goal-planner`, `financial-independence`, `inflation-calculator`, `retirement-calculator`, `budget-cash-flow-planner`, `mortgage-payoff-calculator`, `compound-interest-calculator`, `loan-calculator`, and `carrowmont-qa`.

## Product state

- **Batches 0-11:** completed per the existing acceptance ledgers.
- **Batch 12 / Batch 12B:** completed; the Batch 12 SEO/indexing closeout are complete.
- **Batch 12B-3 Mortgage Recast vs Refinance/Prepayment:** deployed and preserved as shipped without adding a public URL.
- **Batch 13A Connected Financial Data Readiness:** completed. The provider-neutral sandbox/readiness architecture is deployed; the production feature flag OFF boundary remains in force and no real bank/provider is connected.
- **Search + Ask Results UX2:** deployed and retained. Desktop Search shows Tools and Learn & Guides side-by-side with independent panes, with the scrollbar on the right edge of each pane; mobile uses counted Tools/Learn tabs with normal page scrolling; result cards and their visible CTAs share the same real link destination. Ask keeps the compact fallback presentation and working route cards.
- **Quality Audit & Hardening Release 1:** **completed and deployed.** Verified Learn-link gaps were repaired, protected reference updaters gained safe fallback schedules, site-integrity regression coverage was added, handover/roadmap records were strengthened, and the Search UX2 browser assertion exposed by Publisher was repaired without changing product behavior.
- **Ask Carrowmont Expansion Wave 1:** **active release / implementation present in this source.** Six controlled journeys are added using existing deterministic engines: Borrowing Health, Home Affordability, Debt Payoff, Credit Card Payoff, Retirement Readiness and Goal Funding. The start screen groups all 13 unique guided decisions into Everyday stability, Debt decisions, Big goals and Trade-offs. No unrestricted chatbot, new public URL, bank connection or formula fork is introduced. Deployment state must be established from the newest all-green post-merge snapshot, not from this status sentence alone.
- **Snapshot-authority continuity rule:** the newest supplied all-green Source Snapshot manifest is the exact code/commit authority. Status/handbook files deliberately do not pin a current snapshot filename/hash; release-specific snapshot references are historical evidence only.
- **Batch 13B live provider pilot:** **ON HOLD; not approved yet.** Do not start provider selection, bank connectivity or production financial-data activation until the owner explicitly reopens it. A future restart still requires provider/jurisdiction, privacy/legal, security, deletion/consent and cost review.
- **Batch 14 native iOS/Android:** **DEFERRED / TRAFFIC-GATED.** Do not build native apps until website/PWA traffic, repeat usage and capability gaps justify the cost and maintenance.
- **Discovery/Search Growth Agent:** remains a separate future track and must not displace the active product-quality roadmap.
- **Repository branch cleanup:** deferred maintenance; it must not block current product work.
- **Credential Expiry Guard v1:** deployed. The registered release-token expiry remains 22 September 2027. Quality Hardening 1 required temporary PAT **Workflows: read/write** because it changed workflow files; the normal security baseline is to remove that temporary permission immediately after the green release closeout.

## Active development path

Quality Audit & Hardening Release 1 is complete. The owner has explicitly redirected development from new high-risk infrastructure toward making the existing Carrowmont system deeper, more reliable and easier to discover.

1. **Ask Carrowmont Expansion - Wave 1 (ACTIVE RELEASE).** Implementation expands 7 controlled journeys to 13 by adding Borrowing Health, Home Affordability, Debt Payoff, Credit Card Payoff, Retirement Readiness and Goal Funding. Publisher/deployed QA/Guard/snapshot acceptance still determines whether the release is deployed.
2. **Learn Hub 2.0 (NEXT AFTER WAVE 1 GREEN CLOSE).** Develop Learn to the same maturity level as Search while preserving a distinct educational-discovery role. Search answers "find what I mean"; Learn should answer "help me understand what to learn next."
3. **Evergreen Learn Expansion.** Add carefully selected, unique-intent evergreen guides only after content-gap, duplication, source and internal-link review. Maintain existing depth, sourcing, localization and SEO discipline.
4. **Measurement & next-priority review.** Use actual traffic, Search Console and user behaviour to decide the next expansion instead of adding pages/features for volume alone.

## Quality Audit & Hardening Release 1 - deployed closeout

This release completed the full controlled path: Publisher staged QA -> reviewed merge -> deployed checks / Multi-Repo Guard -> fresh all-green Source Snapshot. Its closeout snapshot references are historical evidence; the newest supplied all-green snapshot manifest always determines current code/commit truth.

Hardening 1 closeout evidence recorded in repository history:

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

Never treat a proposed Publisher release as deployed. The `SNAPSHOT-MANIFEST.txt` inside the newest completed all-green Source Snapshot supplied by the owner is authoritative for code/commit truth. This status document must record release state, QA evidence, decisions and the next safe step, but it must **not** chase the newest snapshot filename/hash after every documentation commit. Release-specific implementation records may preserve snapshot names and hashes as historical evidence. Clearly label any pre-merge release state as review/proposed work.

# Carrowmont - current project status

**Status verified:** 25 November 2026, after Learn Hub 2.0 completed the full green release path and Evergreen Learn Expansion Wave 1 entered controlled review.  
**Snapshot authority rule:** the newest completed **all-green Carrowmont Source Snapshot ZIP supplied with the project** is authoritative for current code and repository-commit truth. Read its root `SNAPSHOT-MANIFEST.txt`; do not use a snapshot filename or SHA copied into a status document as proof that it is still current.  
**Documentation role:** this file records product/release state, decisions, QA evidence and next work. It intentionally does **not** pin a "current authoritative snapshot" filename/hash, because every documentation commit would otherwise create a newer repository state and an endless snapshot-reference loop.  
**Last documented deployed source-QA milestone:** Learn Hub 2.0 reached **1,603 PASS / 0 FAIL** in the newest verified all-green post-merge snapshot after its Publisher/browser repairs closed.  
**Release status:** **Evergreen Learn Expansion Wave 1 + Automation Fallback Hardening 2 is the active controlled review release.** Learn Hub 2.0 is complete/deployed in the newest verified all-green baseline. This review release adds six unique-intent, globally researched Learn guides and corrects Tuesday Debt/Gold schedules so they behave as catch-up runs rather than second weekly updates. Batch 13B is **ON HOLD**; Batch 14 remains traffic/usage-gated.

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
- **Ask Carrowmont Expansion Wave 1:** **completed and deployed.** Six controlled journeys were added using existing deterministic engines: Borrowing Health, Home Affordability, Debt Payoff, Credit Card Payoff, Retirement Readiness and Goal Funding. The start screen groups all 13 unique guided decisions into Everyday stability, Debt decisions, Big goals and Trade-offs. No unrestricted chatbot, new public URL, bank connection or formula fork was introduced.
- **Learn Hub 2.0:** **completed and deployed.** Learn now has a dedicated guide-only discovery layer with six situation-first entry points, topic counts, learning-style filters, typo-tolerant local ranking, related-tool pathways, a contained desktop result pane and normal mobile page scrolling. The two Publisher repair cycles fixed real mobile/deep-link/short-laptop issues and one QA-only same-document hash assumption without restoring the old long directory. The deployed pre-Evergreen library contains 102 unique guide destinations in HTML as the crawlable/no-JS fallback; the active Evergreen review proposes six additional unique guide URLs, which would take that source library to 108 only after green deployment. Full Search remains a separate explicit route.
- **Snapshot-authority continuity rule:** the newest supplied all-green Source Snapshot manifest is the exact code/commit authority. Status/handbook files deliberately do not pin a current snapshot filename/hash; release-specific snapshot references are historical evidence only.
- **Batch 13B live provider pilot:** **ON HOLD; not approved yet.** Do not start provider selection, bank connectivity or production financial-data activation until the owner explicitly reopens it. A future restart still requires provider/jurisdiction, privacy/legal, security, deletion/consent and cost review.
- **Batch 14 native iOS/Android:** **DEFERRED / TRAFFIC-GATED.** Do not build native apps until website/PWA traffic, repeat usage and capability gaps justify the cost and maintenance.
- **Discovery/Search Growth Agent:** remains a separate future track and must not displace the active product-quality roadmap.
- **Repository branch cleanup:** deferred maintenance; it must not block current product work.
- **Credential Expiry Guard v1:** deployed. The registered release-token expiry remains 22 September 2027. Quality Hardening 1 required temporary PAT **Workflows: read/write** because it changed workflow files; the normal security baseline is to remove that temporary permission immediately after the green release closeout.

## Active development path

Quality Audit & Hardening Release 1 is complete. The owner has explicitly redirected development from new high-risk infrastructure toward making the existing Carrowmont system deeper, more reliable and easier to discover.

1. **Evergreen Learn Expansion Wave 1 + Automation Fallback Hardening 2 (ACTIVE CONTROLLED REVIEW).** Add six carefully selected unique-intent guides only after a documented content-gap/collision audit and authoritative multi-market research: Emergency Fund vs Paying Off Debt; Risk Tolerance vs Risk Capacity; Portfolio Rebalancing; Investment Fees & Expense Ratios; Market Timing vs Staying Invested; and Home-Buying Upfront Costs. Wire them into Learn Hub, Search, sitemap and existing related guides. In the same controlled release, make Debt/Gold Tuesday schedules true catch-up runs and audit the Country Saturday catch-up without changing public financial formulas.
2. **Measurement & next-priority review (NEXT AFTER GREEN CLOSE).** Use real traffic, Search Console, Ask usage, Learn searches and user behaviour to decide which pages to deepen or which Priority-B gaps to pursue next.
3. **Further Evergreen expansion only when evidence supports it.** Do not add pages for volume, duplicate existing search intent or publish country-specific tax/regulated advice without a maintained source and jurisdiction owner.

## Quality Audit & Hardening Release 1 - deployed closeout

This release completed the full controlled path: Publisher staged QA -> reviewed merge -> deployed checks / Multi-Repo Guard -> fresh all-green Source Snapshot. Its closeout snapshot references are historical evidence; the newest supplied all-green snapshot manifest always determines current code/commit truth.

Hardening 1 closeout evidence recorded in repository history:

- source contract: **1,553 PASS / 0 FAIL**;
- static local internal-destination audit: **0 broken local href/src targets**;
- Search + Ask Results UX2 browser test was hardened to verify the real left/right layout requirement without an arbitrary pixel-offset threshold;
- US Debt updater: Monday primary + Tuesday fallback existed in Hardening 1, but a 25 November audit found that the Tuesday cron could create a second weekly PR after Monday had already merged; the active Hardening 2 review adds a current-week merged-PR guard so Tuesday is catch-up-only;
- Gold updater: the same Tuesday catch-up-only correction is in active review;
- Country References: weekday primary checks + Saturday catch-up remains intentionally material-change-driven; it is audited separately because a same-week merged guard could suppress a legitimate later policy-rate change;
- Batch 13B remains **ON HOLD** and Batch 14 remains **DEFERRED / TRAFFIC-GATED**;
- portable handover and new-account instructions are mandatory release scope.

The previously missing editorial topic **Emergency Fund vs Paying Off Debt** passed the full content-gap/collision and authoritative-source review and is included in the active Evergreen Wave 1 review release; do not treat it or the other five new URLs as deployed/indexable until the full Publisher -> merge -> QA -> Guard -> fresh Source Snapshot path is green.

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

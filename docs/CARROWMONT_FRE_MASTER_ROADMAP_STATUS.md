# Carrowmont Financial Resolution Engine - authoritative roadmap status crosswalk

Reviewed against the user-approved post-Batch-9 Master Roadmap and subsequent owner-confirmed all-green releases through 27 November 2026 (including NAVFIT1 and SECOPS1). This document preserves original feature numbering and is a **status crosswalk**, not a rewrite of the historical master plan. Exact current repository commits are always taken from `SNAPSHOT-MANIFEST.txt` inside the newest completed all-green Source Snapshot supplied by the owner; this roadmap intentionally does not pin a current snapshot filename/hash.

**Current product-quality phase:** Ask Wave 1, Learn Hub 2.0, Evergreen Learn Wave 1, Automation Fallback Hardening 2, Ask Intent Alignment Wave 2, and the direct Drawdown routing follow-up are **completed and deployed** in the latest owner-confirmed all-green source. NAVFIT1 and SECOPS1 are complete. Next priorities: independent privacy/operations audit, measurement / next-priority review, SEO/discovery and documented low-risk maintenance.

| Original roadmap stage | Source/acceptance position |
|---|---|
| Batches 0-7 | Historical core: architecture, decision routing, account-backed profile foundation. Completed per records. |
| 8A-8K and Post-8K | Account continuity, saving/progress, product/mobile UX and Google account identity. Completed/superseded where documented. |
| 9 | Trust, explainability and plan transparency. Completed. |
| 9B | Consolidated Your Financial Plan View & Report. Completed. |
| 10 | Country-Aware Financial Intelligence. Completed within supported-market scope. |
| 10B | Account-Aware Ask Carrowmont. Completed within controlled supported journeys. |
| 11 | Homepage & Product Transformation. Completed with compact Ask entry and Tools access. |
| 12A | Batch 12 UX/Search/Learn expansion; seven new guides and one upgraded guide. Completed. |
| 12B | Wider Resolution Library & Opportunity Engine. **Completed.** 12B-1, 12B-2, **12B-3 shipped**, 12B-4, 12B-5 and 12B-6 are shipped. |
| 13A | Connected Financial Data Readiness sandbox/foundation. **Completed.** Production connectivity remains disabled. |
| 13B | Real connected-financial-data provider pilot. **IN PROGRESS - ON HOLD pending future owner decision.** Do not activate or begin provider integration automatically. |
| 14 | Native iOS/Android decision gate. **DEFERRED / TRAFFIC-GATED.** Reconsider only after sufficient website/PWA traffic and usage evidence. |

## Current approved sequence

Search + Ask Results UX2 and Quality Audit & Hardening Release 1 are deployed. The completed delivery path is now:

**Ask Carrowmont Expansion Wave 1 (COMPLETE: 7 -> 13) -> Learn Hub 2.0 (COMPLETE) -> Evergreen Learn Wave 1 + Automation Fallback Hardening 2 (COMPLETE) -> Ask Intent Alignment & Coverage Wave 2 (COMPLETE: 13 -> 17) -> direct Drawdown / UX corrections (COMPLETE) -> NAVFIT1 (COMPLETE) -> SECOPS1 (COMPLETE) -> Measurement / next-priority review and security audit.**

Before 13B can ever resume, the owner must explicitly reopen it and the provider/jurisdiction, privacy/legal, security, deletion/consent and cost review must still be completed. Batch 14 is not a default next build; it remains conditional on real traffic, repeat usage and capability gaps.

Repository branch-backlog cleanup remains deferred maintenance. The Discovery/Search Growth Agent remains a separate future track and must not displace the active product-quality path.

## Roadmap non-negotiables

- AI reasons and routes; tested Carrowmont engines calculate.
- Guest-first; account save/update only after explicit user action.
- Manual planning remains first-class.
- Localized wording must not invent country financial rules.
- Production connected-financial-data capability must never be implied while Batch 13B is on hold.
- Learn expansion must preserve unique intent, deep educational quality, truthful freshness, internal linking and country-aware terminology.
- Ask expansion must reuse deterministic engines where possible and retain unsupported-query protections.
- Every major requirement receives acceptance coverage and account-independent handover documentation.

The original 16-page `CARROWMONT_FINANCIAL_RESOLUTION_ENGINE_MASTER_ROADMAP_POST_BATCH9(3).docx` remains the historical master planning source. If a future team supplies a newer approved master roadmap, reconcile it with this status crosswalk in a reviewable PR before altering numbering.

## Current numbered continuity release

The separate account-transfer handover tracks small final-audit releases: Batch 0 NAVFIT1/Search Focus and Batch 1 SECOPS1 are completed; Batch 2 is a pending operational documentation review unless the latest all-green source snapshot proves otherwise. These numbers do **not** renumber original FRE Batch 13 / 14. No current snapshot checksum is pinned here.

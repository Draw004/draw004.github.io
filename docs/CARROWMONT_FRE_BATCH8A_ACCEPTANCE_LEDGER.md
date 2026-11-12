# FRE Batch 8A — Acceptance Ledger

## Requirements
| Requirement | Expected outcome |
|---|---|
| Guest access | Calculators, Ask, Learn and Research remain usable without account |
| My Carrowmont gate | Dashboard content populates only after authenticated account resolution |
| Sign-in simplification | `Continue with email`; no password; no pre-login save checkbox |
| Persistence model | No `Remember on this device` guest-dashboard option |
| Explicit save | Only user-selected plan handoff or signed-in edits update My Carrowmont |
| Sign-out | Account-backed browser working copy is cleared and dashboard hidden |
| Privacy | Saved planning values are not sold or used for advertising; Supabase/Brevo roles remain explicit |
| Homepage placement | My Carrowmont + Newsletter immediately after core tools, before decision-support tools |
| Newsletter independence | No Carrowmont account required; existing Kit behavior retained |
| Ask handoff | Ask result can explicitly stage a meaningful plan and route to My Carrowmont |
| Inventory | No new public URL; tools remain 23; search public pages remain 138 |
| Formulas | No deterministic calculator formula changes |

## 14-dimension change-impact matrix
1. Formula/math — unchanged.
2. Engine routing — unchanged.
3. Shared state — guest dashboard persistence is superseded; authenticated working copy is session-only.
4. Persistence — My Carrowmont becomes account-backed.
5. Authentication — existing passwordless Supabase flow retained.
6. Privacy/security — RLS retained; auth request contains no financial payload; saved financial values not used for advertising.
7. GUI hierarchy — dashboard gated; sign-in simplified; homepage relationship section moved upward.
8. Responsive — desktop two-card relationship row; tablet/mobile stacked.
9. Localization — country/currency behavior unchanged.
10. Search/SEO — no new URL; My Carrowmont metadata updated; inventory count unchanged.
11. Newsletter — same Kit form and independence; homepage placement changed only.
12. Legal/trust — About, Privacy and Terms aligned to account-backed model.
13. QA/contracts — FRE6/FRE7 contracts superseded with Batch 8A account-continuity expectations.
14. Roadmap/continuity — Batch 6 guest/local dashboard assumption explicitly superseded; Batch 8 Plans & Progress remains the parent roadmap objective.

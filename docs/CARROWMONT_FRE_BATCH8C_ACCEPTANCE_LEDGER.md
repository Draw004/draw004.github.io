# FRE Batch 8C — Acceptance Ledger

## Requirements
| Requirement | Expected outcome |
|---|---|
| Saved-version basis | Progress uses only versions explicitly saved/updated by the user |
| First saved version | Shows `Ready to track`; does not manufacture a trend |
| Explicit update boundary | Unsaved tool experiments never enter progress history |
| History storage | Existing saved-scenario row keeps a compact recent history; no new database table |
| History limit | Maximum 12 prior saved versions per journey |
| Dashboard placement | `Your progress` appears only for authenticated My Carrowmont and before the saved-plan library |
| Plain language | Uses clear status/copy and avoids technical analytics jargon |
| Budget | Compares monthly room and flags a saved shortfall clearly |
| Emergency fund | Compares runway with prior saved version and saved target |
| Debt / credit / loan | Compares saved balance/payoff path without claiming live transaction tracking |
| Mortgage | Compares saved balance/payoff path |
| Retirement / goals | Compares modeled funding percentage and gap |
| FI | Compares saved invested assets/context |
| Recurring investment | Compares saved invested amount/contribution plan where available |
| Retirement drawdown | Compares modeled runway between saved versions |
| Car affordability | Remains a saved decision scenario and is excluded from core progress feed |
| Corrective next step | Needs-attention cards point back to an existing planner; no automatic plan changes |
| Privacy | Privacy/Terms explain limited saved-version history and unsaved calculations remain excluded |
| Export/delete | Existing account export/delete includes history because history stays inside saved scenario rows |
| Formula/math | No deterministic calculator formula changes |
| Inventory | No new public URL; Tools Hub remains 23; search inventory remains 138 |

## 14-dimension change-impact matrix
1. Formula/math — unchanged; progress compares existing saved outputs only.
2. Engine routing — unchanged.
3. Shared state — no new global plan-state key; existing saved scenario JSON receives bounded history metadata.
4. Persistence — explicit saved versions only; maximum 12 prior snapshots per journey.
5. Authentication — existing passwordless Supabase/Brevo flow retained.
6. Privacy/security — no bank feed, transaction monitoring or background financial collection; owner-only saved scenario row remains authoritative.
7. GUI hierarchy — authenticated `Your progress` section added above Saved plans.
8. Responsive — progress cards use two columns on larger screens and one column on narrow screens.
9. Localization — existing country/currency engines remain authoritative; progress currency uses saved/account locale.
10. Search/SEO — no new URL and no tool inventory expansion.
11. Newsletter — unchanged.
12. Legal/trust — Privacy/Terms disclose limited saved-version history.
13. QA/contracts — deterministic contract tests history, explicit-save boundary, statuses and legal wording; browser QA verifies first-save and updated-plan progress.
14. Roadmap/continuity — Batch 8C completes Plans & Progress Tracking foundation; Batch 9 remains the formal Trust/Explainability layer.

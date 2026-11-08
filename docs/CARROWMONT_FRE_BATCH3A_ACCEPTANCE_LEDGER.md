# Carrowmont Financial Resolution Engine — Batch 3A Acceptance Ledger

| ID | Requirement | Evidence | Status before Publisher |
|---|---|---|---|
| B3A-R1 | Support 3–5 controlled Ask Carrowmont journeys | Five journey definitions in `assets/fre/ask-carrowmont-mvp.js` | PASS |
| B3A-R2 | Recognize a real-life problem in ordinary language | Existing FRE intent router plus a deterministic cash-shortfall pattern | PASS |
| B3A-R3 | Ask only for missing facts | Journey-specific required fields; maximum three questions returned per turn | PASS |
| B3A-R4 | Call existing deterministic engines | Emergency Fund, Budget, Car Affordability, Debt Payoff, Compound Interest, Mortgage Prepay vs Invest | PASS |
| B3A-R5 | Do not invent new financial formulas | Orchestrator only sequences existing engines and applies explanation rules | PASS |
| B3A-R6 | Return situation, diagnosis, numbers, alternatives and next steps | Standard resolved-result contract | PASS |
| B3A-R7 | Keep assumptions visible | `assumptions[]` returned separately | PASS |
| B3A-R8 | Make every result traceable | `trace[]` records engine ID, deterministic input and output | PASS |
| B3A-R9 | Privacy-first | No fetch/XHR/browser storage/database calls | PASS |
| B3A-R10 | Do not transform homepage early | No public page or homepage changes in Batch 3A | PASS |
| B3A-R11 | Preserve existing tool count and URLs | No Tools Hub/search/sitemap changes | PASS |
| B3A-R12 | Preserve existing calculation engines | No existing core files modified | PASS |
| B3A-R13 | Preserve Multi-Repo Guard portability | Contract resolves QA root from its own repository | PASS |
| B3A-R14 | Keep public Ask UI for controlled follow-up | Batch 3B only after 3A is green | PASS |

Exit for Batch 3A still requires Publisher, Automated QA, Multi-Repo Guard and a fresh authoritative Source Snapshot.

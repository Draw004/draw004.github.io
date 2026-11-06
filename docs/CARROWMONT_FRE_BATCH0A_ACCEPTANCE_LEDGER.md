# Carrowmont FRE Batch 0A — Acceptance Ledger

| ID | Requirement | Evidence | Status |
|---|---|---|---|
| B0A-R1 | Add 15 approved named countries | All 10 locale runtimes contain AR, IL, CO, RO, PK, CZ, EG, PE, KZ, NG, GR, MA, KW, UZ, KE | PASS |
| B0A-R2 | Add required currencies without duplicates | 14 new currencies; Greece reuses EUR; total 48 | PASS |
| B0A-R3 | Preserve alphabetical selector and Other last | Existing sort contract retained; browser QA updated | PASS |
| B0A-R4 | Add privacy-first timezone inference | Representative IANA timezone mappings added to every locale runtime | PASS |
| B0A-R5 | Preserve neutral/universal financial assumptions | No tax/pension/inflation/return/regulatory rule added | PASS |
| B0A-R6 | Preserve existing terminology and frequency behavior | New frequency-aware profiles use monthly + neutral two-week wording; old profiles untouched | PASS |
| B0A-R7 | Keep Learn examples complete | Explicit illustrative profiles added for all 14 new currencies; 48/48 completeness locked | PASS |
| B0A-R8 | Keep homepage/tools-hub complete | Every new region maps to an existing complete tool-order profile | PASS |
| B0A-R9 | Extend automated QA | Source contract and browser smoke/learn checks updated | PASS |
| B0A-R10 | Protect calculations, charts, reports and shared state | No engine/report/chart/shared-state file changed | PASS |
| B0A-R11 | Document the change for continuity | GLOBAL2 implementation note + this ledger included | PASS |
| B0A-R12 | Exact release overlay remains green | Full source contract passes after applying the exact packaged release over the authoritative baseline | PASS |

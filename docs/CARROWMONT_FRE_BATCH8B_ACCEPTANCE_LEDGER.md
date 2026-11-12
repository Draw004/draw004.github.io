# FRE Batch 8B — Acceptance Ledger

## Requirements
| Requirement | Expected outcome |
|---|---|
| Guest results | Complete supported-tool results remain available without account creation |
| Selectivity | Save prompt appears only after meaningful planning activity, not merely page load |
| Explicit consent | No plan is staged until the user chooses Save/Update |
| Logged-in experimentation | Recalculating while signed in does not automatically change My Carrowmont |
| Existing plan update | Existing journey offers `Update My Carrowmont with these changes` and `Keep existing plan` |
| Keep existing plan | Discarding the experimental change leaves the prior account plan/dashboard facts unchanged |
| New plan save | Journey without a saved account plan offers `Save this plan to My Carrowmont` and `Not now` |
| Scenario replacement | Saving the same journey again updates the existing scenario rather than creating a second active copy |
| Saved-plan library | Explicitly saved scenarios appear in authenticated My Carrowmont and can be reopened |
| Profile compatibility | Only compatible present-state facts update the one-glance profile |
| Hypothetical safety | Proposed purchase/borrowing scenarios do not silently become current debts |
| Account-backed planning set | Budget, Emergency Fund, Debt Payoff, Credit Card Payoff, Loan/EMI, Mortgage, Retirement, Goals, FI, SIP/Recurring Investment and Retirement Withdrawal |
| Saved decision scenario | Car Affordability remains saveable without silently becoming current debt |
| Utility boundary | Inflation and Compound Interest remain free of a generic account prompt in 8B |
| Hero value | Approved compact My Carrowmont benefit/analytics copy is used efficiently across screen sizes |
| Trust | `Only the plans you choose to keep become part of My Carrowmont.` remains visible |
| Retirement cleanup | Obsolete `Save plan on this device` controls/copy remain removed |
| Guest persistence | Budget month comparisons are session-only; long-term continuity/history remains account-backed |
| SEO/inventory | No new public URL; Tools Hub remains 23; search inventory remains 138 |
| Formulas | No deterministic calculator formula changes |
| Browser QA compatibility | Main-site smoke copy, Budget session-only continuity, signed-out trust copy and Retirement meaningful-plan setup match the approved 8B behavior without weakening any gate |

## 14-dimension change-impact matrix
1. Formula/math — unchanged.
2. Engine routing — unchanged.
3. Shared state — explicit saved-plan handoff/update contract expanded; existing shared-plan semantics retained.
4. Persistence — account scenario changes require explicit Save/Update; guest Budget month comparisons remain session-only.
5. Authentication — existing passwordless Supabase/Brevo flow retained.
6. Privacy/security — financial values are not included in authentication requests; being logged in does not imply auto-save.
7. GUI hierarchy — compact result-adjacent save/update card; no modal interruption.
8. Responsive — save/update card stacks on narrow screens; My Carrowmont hero remains compact.
9. Localization — existing country/currency engines remain authoritative.
10. Search/SEO — no new URL; 138-page inventory preserved.
11. Newsletter — unchanged from 8A.
12. Legal/trust — explicit-save wording remains authoritative.
13. QA/contracts — deterministic/browser QA protect save eligibility, logged-in update/keep behavior, scenario replacement and utility exclusions.
14. Roadmap/continuity — 8B completes selective save/update continuity; 8C retains progress tracking/off-course detection.

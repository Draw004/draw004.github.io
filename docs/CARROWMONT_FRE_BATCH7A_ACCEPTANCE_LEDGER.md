# Batch 7A Acceptance Ledger — Optional Login Foundation

1. Guest-first dashboard still works with account configuration disabled — PASS.
2. Login remains optional and hidden until a real backend is configured — PASS.
3. Passwordless email magic-link flow is supported; Carrowmont stores no passwords — PASS.
4. Cloud profile reads/writes require an authenticated user — PASS.
5. Guest financial values are never uploaded automatically — PASS.
6. Existing cloud data is never silently overwritten by browser data — PASS.
7. User can explicitly save browser profile to account — PASS.
8. User can explicitly load saved account profile into browser — PASS.
9. User can export saved account profile/scenarios — PASS.
10. User can delete saved cloud financial profile/scenarios without deleting browser data — PASS.
11. User can sign out while guest/local dashboard remains available — PASS.
12. Database schema enables RLS and scopes every operation with auth.uid() — PASS.
13. Frontend contains no service-role secret — PASS.
14. Saved-scenario API boundary exists for later Ask/plan persistence — PASS.
15. No new calculator, formula, public URL or Tools Hub count change — PASS.
16. Production activation requires real Supabase Free project configuration and full release gates — PASS.

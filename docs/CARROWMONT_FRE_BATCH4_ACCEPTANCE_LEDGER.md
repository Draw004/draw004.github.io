# Carrowmont FRE Batch 4 — Acceptance Ledger

## Requirements
1. PASS — Progressive disclosure keeps each question screen to no more than three related facts.
2. PASS — A clear journey progress indicator is visible while collecting facts.
3. PASS — Every requested field exposes a collapsed **Why we ask** explanation.
4. PASS — **I don't know** is available where appropriate without fabricating household facts.
5. PASS — Unknown return assumptions use an explicit 5% illustration and are disclosed in assumptions.
6. PASS — Previously supplied facts remain in state and are not requested again during forward progress.
7. PASS — Validation messages identify the field needing correction in plain language.
8. PASS — Results remain answer-first, with calculations/methodology progressively disclosed.
9. PASS — No new charts are added where they do not materially improve understanding.
10. PASS — Financial inputs remain guest-first, local to the active page session, and are not persisted/transmitted.
11. PASS — Existing deterministic engines remain the sole authority for calculations.
12. PASS — No new public URL, Tools Hub entry or search inventory item is created.
13. PASS — Responsive QA covers 360 / 390 / 412 mobile plus tablet and desktop layouts.
14. PASS — Existing five Batch 3 journeys and unsupported-question fallback remain intact.
15. PASS — Previous/Back lets a user revisit an earlier question group and correct answers without restarting.
16. PASS — Smart focus/auto-scroll brings each next question group, validation problem and result into context while respecting reduced-motion preferences.
17. PASS — Validation recovery preserves valid answers, marks the exact invalid field and returns keyboard focus to it.
18. PASS — Keyboard/accessibility protections include native form submission, keyboard-operable Back/Why-we-ask controls, visible focus states, accessible labels and assertive validation announcements.

## 14-dimension change-impact matrix
| Dimension | Impact | Control |
|---|---|---|
| Architecture | Low | UI-only enhancement; FRE/engine boundaries unchanged. |
| Calculations | None | No deterministic engine formula changed. |
| Inputs | Low | Same facts; assumption-only unknown helper and editable step history added. |
| Outputs | Low | Same resolution outputs; explicit estimated-assumption disclosure retained. |
| Shared state | Low | In-memory journey facts/history only; no persistence added. |
| Localization | Low | Existing locale/currency formatting remains authoritative. |
| Search/SEO | None | No new URL or inventory change. |
| Navigation | None | Existing approved Ask navigation preserved. |
| Reports/PDF | None | No report behavior changed. |
| Privacy | None | No storage/network access added. |
| Accessibility | Positive | Labels, native details, progress semantics, focus recovery and visible keyboard focus. |
| Responsive GUI | Medium | Step history, focus and field cards tested across mobile/tablet/desktop. |
| QA contracts | Medium | Source/browser contracts protect guided flow, correction and recovery behavior. |
| Rollback | Low | Changes are isolated to Ask UI assets/docs/QA. |

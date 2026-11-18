# Carrowmont FRE Batch 12 — Acceptance Ledger

**Date:** 18 November 2026  
**Reviewed main-site base:** `d80afc6f5d05e44353f2cbf9a84cb8077317db3c`

| Area | Acceptance requirement | Evidence in this batch | Status |
|---|---|---|---|
| Home | Full Ask form is not embedded in the hero | Compact `data-home-ask-entry` routes to Ask | PASS |
| Navigation | Exactly one route-controlled active bottom-nav item | `aria-current="page"` is assigned only from current route; permanent Ask styling removed | PASS |
| Search | Partial queries help rather than fail early | Two-character suggestions; `re` predicts retirement destinations | PASS |
| Search | Common misspellings can recover | `retirment`, `mutal fund`, `mortage`, `compound intrest` verified | PASS |
| Search privacy | Typing assistance remains local | Search uses Carrowmont inventory/core; no external query-provider call added | PASS |
| Ask | Imperfect spelling gets prediction/correction before unsupported routing | Ask uses shared Search suggestion/correction APIs | PASS |
| Accessibility | Search/Ask expose appropriate browser/autocomplete semantics | spellcheck/autocorrect/autocapitalize and ARIA listbox/autocomplete added | PASS |
| My Carrowmont | Attention summary names affected area(s) | Flagged planning areas rendered individually | PASS |
| My Carrowmont | Attention item leads to the issue | Smooth jump, focus and temporary highlight implemented | PASS |
| Motion | My Carrowmont/PWA animation respects reduced motion | `prefers-reduced-motion` rules present | PASS |
| PWA | Brand transition does not deliberately delay a ready page | Render-release plus bounded fallback | PASS |
| Learn consistency | Existing style is preserved | New guides use shared Learn assets/structure | PASS |
| Learn depth | New pages teach mechanics, examples, risks and decision use | Seven new substantive guides pass depth/source contract | PASS |
| Learn duplication | Existing intent is improved instead of duplicated | `planning-life-goals.html` expanded for multi-goal prioritization | PASS |
| Learn governance | Understanding-first + content-collision rules are durable | Learn Article Standard v2.3 | PASS |
| Internal linking | New guides are placed in existing clusters and receive contextual inbound links | Learn hub plus related existing guides updated | PASS |
| SEO/discovery | New URLs are uniquely indexed and sitemap-linked | Search inventory/index/sitemap each contain 145 unique public URLs | PASS |
| Structured data | New guides have Article/Breadcrumb/canonical metadata | FRE12 source contract validates guide structure | PASS |
| Formula safety | Financial calculation engines are not changed | No calculator repository is modified by this release | PASS |
| Source QA | Source contracts remain green | 1289 PASS / 0 FAIL | PASS |
| Search regression QA | Deterministic search fixtures remain green | 85 / 85 PASS | PASS |
| JavaScript syntax | Changed runtime JS parses | `node --check` on changed runtime files | PASS |
| Browser QA | Staged browser suite must pass before merge | FRE12 Playwright specs included; execution delegated to normal Batch PR Publisher staged environment because local snapshot runtime lacks Playwright dependencies | REQUIRED AT PUBLISHER |
| Merge safety | No automatic merge | Human PR review remains mandatory | PASS |

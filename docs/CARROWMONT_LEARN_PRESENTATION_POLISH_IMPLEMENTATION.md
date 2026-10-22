# Carrowmont Learn Presentation Polish - Implementation

**Baseline:** Carrowmont Source Snapshot 108  
**Snapshot generated:** 2026-10-22T17:12:18Z  
**Main-site commit:** `c90f0587e4e98320d5ed252013bc4004c134e996`  
**Central-QA commit:** `806745ada66bed7735d1e752daf5f6ec4e885c9e`  
**Baseline source contract:** 665 PASS / 0 FAIL

## Purpose

This release repairs presentation defects observed after the final Learn closeout. The screenshots supplied by the owner are treated as defect classes, not isolated pages.

## Locked presentation rules

1. **30-second answers:** body copy uses normal weight. One important phrase or statement may be bold when it genuinely improves scanning. The label remains bold/uppercase. Broad CSS must never turn the whole answer paragraph bold or promote inline emphasis into a block label.
2. **Colon capitalization:** in Carrowmont-authored visible public text, the first alphabetic word after a colon is capitalized. URLs, code, formulas, numeric notation, direct quotations and official external-source titles are not rewritten merely to satisfy the presentation rule.
3. **Checklist/question spacing:** shared `.guide-steps` rows use one compact single-column card rhythm. Parent gap and child margins may not stack into large vertical holes.
4. **Tables:** shared Learn tables use a restrained visual hierarchy. The retirement-runway illustration fixes the malformed two-header/three-cell row without changing any model value.
5. **Contact page:** the hero is shortened so the email action appears materially earlier on a standard desktop viewport while preserving the same contact copy and email identity.

## Scope

- 90 Learn HTML pages: colon-capitalization normalization and shared CSS cache-bust only; no canonical/search-intent change.
- `learn-article.css`: answer emphasis, compact card/list rhythm and table presentation.
- `market-chain-learn.css`: macro answer typography selector repair.
- `contact.html` + `carrowmont.css`: Contact-specific compact hero.
- Shared Learn/UI standards: record the owner-approved colon rule.
- Central QA source contract + dedicated browser QA.

## Explicit non-changes

- No calculator formula, deterministic engine or financial result changes.
- No SEARCH1 inventory, query alias, canonical URL or sitemap ownership changes.
- No analytics, privacy, persistence or localization-engine changes.
- No artificial `dateModified` or sitemap `lastmod` refresh for presentation-only edits.
- No workflow files.

## Release discipline

Publisher remains the authoritative browser/responsive gate. If Publisher is red, merge nothing; root the exact failure and rebuild from this clean Snapshot 108 baseline.

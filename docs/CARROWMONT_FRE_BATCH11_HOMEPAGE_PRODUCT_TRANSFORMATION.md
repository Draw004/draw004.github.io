# Carrowmont FRE Batch 11 — Homepage & Product Transformation

Status: Stable implementation contract. Batch completion is determined by the standard all-green release gates and the authoritative Source Snapshot, not by temporary status wording in this document.

## Purpose

Batch 11 changes the public homepage from primarily asking visitors to choose a calculator to helping them start with the money decision they are trying to solve.

The transformation is deliberately public-product focused. It does not create a new financial engine, change calculator formulas or require an account.

## Product contract

1. The homepage leads with a real-life money-question entry rather than calculator buttons.
2. Free-text questions are passed to Ask Carrowmont through a short-lived same-tab `sessionStorage` handoff, not through a query string.
3. Ask Carrowmont consumes that handoff once, removes it immediately and uses the existing controlled intent classifier and deterministic engines.
4. Six established guided Ask decisions remain visible as suggested starting points.
5. Visitors who prefer calculators have an explicit **Prefer to calculate yourself? Explore Tools** path.
6. The connected product story and illustrative My Carrowmont experience appear before the long desktop calculator grid, so visitors can see the planning product before the feature list.
7. The nine established core homepage tools remain directly linked on desktop and the existing compact mobile quick-tool launcher remains intact.
8. My Carrowmont remains optional; homepage copy makes clear that no account is required and only plans the user chooses to keep become account-backed continuity.
9. Individual tool, Learn and Research URLs remain unchanged and indexable.
10. Country/currency localization, India-specific SIP discovery, hero imagery, newsletter, social links and mobile primary navigation remain established shared behaviors.

## Private homepage-to-Ask handoff

The homepage uses `carrowmont_home_ask_handoff_v1` in `sessionStorage` with a 15-minute maximum age.

The stored payload contains only the question the visitor typed plus a timestamp/expiry/source marker. It is temporary browser-session state:

- it is not written to local storage;
- it is not added to the URL;
- it is not sent to My Carrowmont;
- Ask removes it immediately when it is read; and
- if the browser blocks the private handoff, the homepage does not fall back to exposing the question in the URL.

## Ask boundary

Batch 11 does not expand the six controlled Ask journeys. A homepage question is classified by the existing Ask intent router. Supported questions enter the established guided decision flow; unsupported questions keep the existing traffic-controller behavior and route toward relevant Carrowmont content.

Signed-in users continue to receive the Batch 10B account-aware behavior after the handoff reaches Ask. Guest users remain fully supported without login.

## Product-first hierarchy

The homepage order is intentionally:

1. problem-first hero / Ask entry;
2. established localized discovery where applicable;
3. connected Ask / Plan / Keep / Track / Understand story;
4. illustrative My Carrowmont product outcome;
5. direct calculator/planner grid;
6. newsletter, additional decision-support tools, learning and trust content.

This keeps product outcomes ahead of the feature directory without removing direct access to tools.

## SEO and discovery boundary

Batch 11 introduces no new public URL and removes no indexed tool, Learn or Research URL.

The canonical homepage remains `/`. The nine core tool links remain in crawler-visible HTML. The complete `/tools.html` directory remains the calculator gateway, and the existing sitemap/search inventory remain unchanged.

## Performance and responsive boundary

The approved responsive hero image assets remain unchanged and eagerly loaded. Batch 11 adds no new homepage network asset: the small handoff behavior is added to the existing shared `site.js` runtime.

On mobile, the established Home / My Money / Ask / Tools / More navigation remains authoritative. The question entry stacks vertically, suggested decisions become a horizontal touch-friendly row, the long core tool grid remains replaced by the compact quick-tool launcher, and no horizontal page overflow is allowed.

## Save and account boundary

Submitting a homepage question does not save anything to My Carrowmont. Ask may read relevant current saved context only after the visitor reaches Ask and only under the Batch 10B read-only contract. Any account change still requires the existing explicit Save / Update action.

## Stable release-record rule

This implementation record intentionally avoids temporary release-status placeholders or a hard-coded future snapshot reference that would require a second documentation-only deployment after the release gates complete.

Batch completion is established by the standard release evidence:

**Publisher → Automated QA → Multi-Repo Guard → authoritative Source Snapshot**

The master roadmap records the completed batch and authoritative snapshot after those gates are green. No additional product Publisher run is required solely to rewrite release-status wording in this file.

## Exit gate

Batch 11 is complete only when:

1. the problem-first homepage entry is clear and usable without login;
2. free-text handoff reaches Ask without exposing the question in the URL;
3. the handoff is one-time and short-lived;
4. the six guided Ask decisions remain available;
5. the direct Explore Tools path is obvious;
6. product story and My Carrowmont outcomes precede the desktop feature grid;
7. nine core homepage tools, mobile quick tools and all public discovery routes remain intact;
8. no formulas, account schema, save ownership, country intelligence or public URLs are changed;
9. desktop/mobile layouts have no horizontal overflow and remain accessible;
10. source-contract and browser QA are green; and
11. Publisher, Automated QA, Multi-Repo Guard and a fresh Source Snapshot are all green.

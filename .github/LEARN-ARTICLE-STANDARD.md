# Carrowmont Learn Article Standard

**Version:** 2.0  
**Effective:** 28 September 2026

This is the required structure and editorial-depth standard for every indexable Carrowmont Learn article. It exists so future guides inherit the same layout, trust signals, SEO treatment, tool journey and content quality without repeating one-off page work.

## 1. Required shared assets

Every Learn Article page must include:

- `data-cm-learn-article="1"` on `<body>`
- `learn-article.css?v=20260928-standard2` after legacy/page-specific styles
- `learn-article.js?v=20260928-standard2` before `</body>`

The shared CSS owns the compact article hero, responsive H1 sizing, top/bottom relevant-tool actions, rich-answer blocks, formulas, worked examples, tables, notes, source treatment, compact educational disclaimer and related-guide presentation.

The shared JavaScript reuses the top relevant-tool link to create the consistent bottom "Continue with…" action. Article content must remain readable and useful if JavaScript is unavailable.

## 2. Required visible structure

1. Guide category/kicker
2. One H1 only
3. Short summary/deck
4. Carrowmont author + updated date + educational guide label
5. Compact relevant-tool action at the top
6. Main educational content
7. Direct-answer block for the core search question
8. Deep-dive sections, examples and decision context
9. Frequently asked questions
10. Relevant-tool action near the end (generated from the top action)
11. `Sources and how this guide was prepared` as a collapsible source note
12. `Educational information only` disclaimer
13. `Back to all learning guides`
14. Three related-guide cards where practical

## 3. Required search/editorial metadata

- self-canonical URL
- `index,follow`
- unique title and meta description
- `meta[name="author"] = Carrowmont`
- Article + BreadcrumbList JSON-LD
- Carrowmont author/publisher identity
- `dateModified` matching the editorial review date
- one H1
- current article URL in `sitemap.xml`
- current article linked from `learn.html`

Current QA keeps titles at 25–70 characters and descriptions at 100–170 characters as a Carrowmont editorial guardrail. This is not a claim that search engines impose fixed character limits.

## 4. Content-depth standard

Carrowmont Learn must not publish thin pages whose only purpose is to capture a keyword. The reader should be able to understand the topic, the mechanics, the important trade-offs and what to test next without needing another generic explainer immediately afterward.

Every substantive guide should include, when relevant:

- an immediate direct answer in plain language;
- a through-and-through explanation of what the concept means and why it matters;
- formulas/mechanics with variables explained rather than unexplained equations;
- at least one worked example, scenario table or numerical illustration when numbers materially improve understanding;
- sensitivity analysis showing which assumptions change the result most;
- benefits **and** limitations, including what the concept cannot solve;
- risks, failure modes and common misconceptions;
- decision or review checklists that convert theory into a planning process;
- life-stage, time-horizon or cash-flow differences where they change the answer;
- country-aware caveats when tax, regulation or product structure differs by jurisdiction;
- FAQs that answer genuine follow-up questions rather than restating headings;
- internal links to genuinely related Learn articles;
- a relevant Carrowmont calculator/tool path;
- authoritative sources for factual, regulatory, historical or research-based claims.

The standard deliberately does **not** impose one universal word count. A focused concept can be complete in less space than a pillar topic. Depth is judged by coverage, examples, trade-offs, sourcing and reader usefulness—not by padding. As a QA warning signal, however, an article that remains unusually short after removing navigation/boilerplate should be reviewed manually for missing substance.

For the current 52-guide library, automated QA also uses **1,000 words of visible guide text as a regression floor** so an accidental rollback to the previous thin-page state fails staged QA. This is a floor, not a writing target: a future focused guide may justify an exception only through an intentional QA/standard review rather than by silently weakening content.

## 5. Evidence and sourcing standard

Prefer primary or high-authority sources where available, including regulators, investor-education bodies, central banks/international institutions, recognized research organizations and original researchers.

Examples used across the current Learn library include Investor.gov/SEC, FINRA, CFPB, SEBI/NISM, IMF, OECD, CFA Institute, Vanguard, Morningstar and original William Bengen withdrawal research commentary.

Rules:

- do not fabricate statistics, returns or historical facts;
- do not present one research model as a universal rule;
- label model outputs and worked examples as illustrative;
- identify the relevant country/market when a result is jurisdiction-specific;
- keep tax/legal/product rules country-aware and avoid silently applying one country globally;
- preserve the educational-information disclaimer;
- never turn a Learn article into individualized investment advice.

## 6. Calculation consistency

If an article contains financial math:

- use the same nominal/real-money basis throughout a worked example;
- state return, inflation, horizon and contribution/withdrawal timing assumptions;
- avoid false precision from smooth deterministic projections;
- explain where real-world sequence risk, fees, taxes or irregular cash flows can make actual outcomes differ;
- where a Carrowmont calculator implements the same concept, keep the article explanation consistent with the calculator methodology unless an intentional methodology change is separately approved and tested.

## 7. UX and navigation standard

The article hero is intentionally compact so useful content begins quickly. The H1 must remain readable and prominent without consuming most of the first viewport.

The relevant tool remains visible near the top for readers who already understand the concept. The bottom CTA should use action wording such as `Continue with the Retirement Planner` or `Run your numbers in the Goal Planner`, rather than assuming the visitor came from that tool.

Sources and the educational disclaimer must remain present but visually secondary to the educational content.

## 8. Future-article creation rule

A new Learn article is not complete merely because an HTML file exists. Before release it must:

1. use the shared article assets and structure;
2. satisfy the depth standard above;
3. be added to the Learn hub and sitemap;
4. link to an appropriate Carrowmont tool and related guides;
5. include Article + Breadcrumb structured data and self-canonical metadata;
6. include authoritative sources;
7. pass source-contract and browser QA;
8. be reviewed for mobile/desktop readability and factual accuracy.

## 9. Release rule

Learn changes use the normal Carrowmont process:

`Fresh Source Snapshot -> reviewed release bundle -> Batch PR Publisher -> staged QA -> human PR review/merge -> Automated QA -> Multi-Repo Guard -> fresh Source Snapshot`

Automation may prepare PRs but must not auto-merge normal product/content changes to `main`.

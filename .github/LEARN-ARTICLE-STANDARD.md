# Carrowmont Learn Article Standard

**Version:** 2.3  
**Effective:** 18 November 2026

This is the required structure and editorial-depth standard for every indexable Carrowmont Learn article. It exists so future guides inherit the same layout, trust signals, SEO treatment, tool journey and content quality without repeating one-off page work.

## 1. Required shared assets

Every Learn Article page must include:

- `data-cm-learn-article="1"` on `<body>`
- `learn-article.css?v=20261022-presentation2` after legacy/page-specific styles
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

### Display-heading punctuation

For all Learn H1–H6 headings, omit the trailing full stop. Preserve questions, meaningful abbreviations and punctuation in regular sentences, explanations, worked examples and source notes. This is a display typography rule, not permission to rewrite article content or change SEO intent. It also applies to any dynamically generated visible heading.

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

### Ask & Search relevance metadata

Every new Learn article must also be added to `data/carrowmont-search-pages.json`. Search relevance is semantic and content-driven rather than a list of one-off query exceptions. The inventory entry must therefore describe the page clearly enough for the shared taxonomy to understand both **what the page is about** and, when useful, **what the reader is trying to do**.

Required for every new Learn search entry:

- accurate `category`;
- concise `description` written in plain language;
- specific `keywords` that name the actual subject, not generic SEO filler;
- useful `aliases` for genuinely equivalent phrases or familiar wording;
- optional `topics` and `intents` only when the automatic taxonomy needs an explicit signal for an ambiguous or especially important destination.

The reviewed taxonomy lives in `data/carrowmont-search-aliases.json`. The search-index builder precomputes semantic topic/intent signals for each page and **fails a new guide/tool build if it maps to no recognized topic**. If Carrowmont expands into a genuinely new subject, add or extend one reviewed taxonomy definition instead of hard-coding a special query in `search-core.js`. Existing topics, nearby wording and locale aliases should be reused whenever they already describe the new page.

Near-equivalent reader wording should keep the same core destination set. For example, `how to invest in gold`, `how to start investing in gold` and `gold investing for beginners` may rank supporting pages differently, but a direct gold-investment guide should not disappear merely because the reader added `start` or `beginners`. The same rule applies across retirement, debt, budgeting, emergency savings, mortgages, inflation, FI, goals, cars, investing, assets and Research.

Current QA keeps titles at 25–70 characters and descriptions at 100–170 characters as a Carrowmont editorial guardrail. This is not a claim that search engines impose fixed character limits.


### Public-text capitalization after a colon

In Carrowmont-authored public text, the first alphabetic word after a colon begins with a capital letter. This applies to titles, H1–H6 headings, card headings, chart titles, standalone labels, checklist/list explanations and ordinary explanatory prose.

Correct examples:

- `Diversification: Helpful, but not automatic`
- `Worked example: The score is not the whole decision`
- `APR vs interest rate: Why the cheaper-looking loan may not be cheaper`

This is a sitewide presentation rule. Do not alter URLs, code, formulas, numeric notation, direct quotations or the official titles of external sources to force the rule.

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

For the current 83-guide library, automated QA also uses **1,000 words of visible guide text as a regression floor** so an accidental rollback to the previous thin-page state fails staged QA. This is a floor, not a writing target: a future focused guide may justify an exception only through an intentional QA/standard review rather than by silently weakening content.

### Understanding-first editorial rule

Carrowmont Learn exists to build understanding, not merely to provide a short answer to a search query. A reader should finish a guide able to explain the core idea, recognize the main trade-offs and test the concept against their own situation with more confidence than when they arrived.

For every substantive topic, the editorial review should be able to answer these questions clearly:

1. **What is it?** Define the concept in plain language without assuming specialist knowledge.
2. **How does it work?** Explain the mechanics, moving parts and relationships that produce the result.
3. **Why does it matter?** Connect the concept to a real planning decision or consequence.
4. **What changes the outcome?** Identify the assumptions, inputs or circumstances that materially alter the answer.
5. **What can go wrong?** Cover limitations, risks, common mistakes and situations in which the usual rule of thumb can mislead.
6. **How should the reader think about the decision?** Give a practical framework, not a universal prescription.

When numbers or assumptions materially affect the decision, prefer the learning sequence **concept -> worked example -> change an assumption -> explain the effect**. The purpose is to develop intuition, not simply display a calculation.

The relevant Carrowmont tool is the next part of the lesson, not a generic promotional button. Teach the concept first, then link the reader to the calculator or planner at the point where testing their own assumptions becomes useful.

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

1. pass the existing-library/content-collision review below;
2. use the shared article assets and structure;
3. satisfy the depth and understanding-first standards above;
4. be added to the Learn hub and sitemap;
5. link to an appropriate Carrowmont tool and related guides;
6. include Article + Breadcrumb structured data and self-canonical metadata;
7. include authoritative sources;
8. pass source-contract and browser QA;
9. be reviewed for mobile/desktop readability and factual accuracy.

### Existing-library and content-collision review

Before creating a new public Learn URL, review the current Carrowmont Learn library, relevant Research pages, applicable tool explanations and the local Search inventory. Map the proposed article's primary reader problem and search intent against those existing destinations.

- If an existing page already owns the same intent, **improve that page rather than create a competing URL**.
- Create a new URL only when it solves a distinct reader problem or serves a genuinely distinct search intent.
- When two subjects are close neighbours, document why the new destination is meaningfully different and define the internal-link relationship between them.
- Check the new page's Learn cluster, inbound contextual links, related-guide links and relevant tool path before publication.
- Use Search Console/search evidence to prioritize useful opportunities, but do not create overlapping pages merely because a new keyword variation appears.
- Preserve Carrowmont's established Learn layout, tone, educational approach and country-aware terminology unless an intentional design/editorial change is separately approved.

## 9. Release rule

Learn changes use the normal Carrowmont process:

`Fresh Source Snapshot -> reviewed release bundle -> Batch PR Publisher -> staged QA -> human PR review/merge -> Automated QA -> Multi-Repo Guard -> fresh Source Snapshot`

Automation may prepare PRs but must not auto-merge normal product/content changes to `main`.

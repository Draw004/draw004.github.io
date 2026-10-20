# CARROWMONT SEARCH1 - GLOBAL SITE SEARCH AND CONTENT DISCOVERY

## Final Product, UX, Privacy, Localization, Search-Engine Safety, QA and Release Specification

**Status:** FINAL - specification-only approval gate; production code must not be changed by this document  
**Authoritative baseline:** Carrowmont Source Snapshot 87  
**Snapshot generated:** 2026-10-19T19:27:32Z  
**Main-site baseline commit:** `2b6919e8ed09bc11341df94550ebb0232ddac036`  
**Central QA baseline commit:** `a460fb5335d36d995c3abc91643b894e7a39a539`  
**Baseline source contract:** 552 PASS / 0 FAIL  
**Specification date:** 20 October 2026  

---

# 1. Executive decision

Build a public, free, no-login Carrowmont search feature that helps visitors find the right calculator, guide or trusted site page without sending their search words to an external search provider.

The search feature should answer one simple need:

> **I know the money question I have. Help me find the clearest Carrowmont tool or guide for it.**

SEARCH1 is a discovery feature. It is not a web search engine, an AI adviser, a chatbot or a page generator.

The first release must search across:

- all live Carrowmont calculators and decision tools;
- all live Learn guides;
- important methodology, privacy, editorial and trust pages;
- country-aware aliases such as SIP, recurring investment, EMI, loan payment, mortgage, home loan, remortgage, refinance, balance transfer, SWP, withdrawal and drawdown.

The search must stay fast, simple, private and useful on desktop, 390 px and 360 px layouts.

---

# 2. Why SEARCH1 is useful now

Carrowmont now contains nineteen live tools and a large Learn library. The current Tools and Learn hubs help users browse by category, but they do not help a visitor who arrives with a direct question such as:

- `How do I make a budget?`
- `What is an ETF?`
- `How much home can I afford?`
- `Should I pay off debt or invest?`
- `What is EMI?`
- `What is SWP?`
- `How does inflation reduce purchasing power?`

A useful search feature should reduce the effort required to find the right answer. It should also improve discovery of strong pages that may sit several clicks below the homepage.

SEARCH1 must not replace clear navigation, contextual links, the Tools directory or the Learn hub. Search is an additional discovery path.

---

# 3. Locked product principles

SEARCH1 must follow these rules:

1. **People first.** Results should help the visitor, not create search-engine-only pages.
2. **Private by default.** Search words remain in the browser and are not sent to a third-party search service.
3. **No query tracking.** Carrowmont must not record or transmit the visitor's search words in V1.
4. **No financial values in URLs.** Search text must not be written into the URL query string or hash by default.
5. **No account required.** Search works without sign-in, cookies or saved history.
6. **No external search API.** Do not use Google Programmable Search, Algolia, Bing Search API, an AI API or another hosted search provider in V1.
7. **One Carrowmont index.** Tools, Learn pages and trust pages should be searchable from one index.
8. **Country-aware language.** Search should understand common local terms without creating duplicate country doorway pages.
9. **Clear result types.** Every result must show whether it is a Tool, Guide or Carrowmont page.
10. **Stable canonical pages.** Search must lead to existing canonical URLs rather than create indexable result URLs.
11. **Accessible interaction.** Search must work with keyboard, screen reader, touch and reduced-motion settings.
12. **No ranking claims.** SEARCH1 can improve discovery and internal navigation, but it cannot guarantee search-engine rankings or traffic.

---

# 4. Public experience

## 4.1 Main entry points

V1 should provide three entry points:

1. a compact `Search` control in the main Carrowmont header;
2. a prominent search field near the top of `/learn.html`;
3. a search field or clear search action on `/tools.html`.

A dedicated utility page may be created at:

`https://carrowmont.com/search.html`

The utility page should use:

```html
<meta name="robots" content="noindex,follow">
```

The page exists for users, not as a search-results landing page for Google or Bing.

## 4.2 Header behavior

The desktop header search control should be visually compact and should not crowd the current navigation or country/currency selector.

The mobile header must keep Search easy to reach without causing horizontal overflow.

Selecting Search should open a focused search panel or the dedicated search page. The implementation choice may be finalized during production, but the experience must remain consistent.

## 4.3 Search field language

Preferred label:

`Search Carrowmont`

Preferred helper text:

`Find a calculator, guide or money topic.`

Preferred placeholder:

`Try: budget, ETF, mortgage, SIP, debt or retirement`

Avoid:

- `Ask our AI`;
- `Get financial advice`;
- `Search the web`;
- wording that implies a personalized recommendation.

## 4.4 Result card

Each result should show:

- result type: `Tool`, `Guide` or `Carrowmont`;
- page title;
- one short, plain-language description;
- category;
- a clear link to the canonical page.

A result card should not show a fake rating, popularity number, paid placement or recommendation badge.

## 4.5 Empty and short-query states

Before the visitor types, show a small set of useful starting topics, not an empty white panel.

For one-character queries, do not run broad matching. Ask for at least two meaningful characters.

For no result, use:

> **We could not find a close match. Try a shorter phrase or one of these topics.**

Then show useful categories such as Budget, Investing, Retirement, Home & Loans and Debt & Credit.

---

# 5. Search index architecture

## 5.1 Static local index

Use a version-controlled same-origin JSON index, for example:

`/data/carrowmont-search-index.json`

The visitor browser may fetch that file from `carrowmont.com`. No external service is required.

Recommended top-level structure:

```json
{
  "schema_version": 1,
  "generated_at": "2026-10-20",
  "entries": []
}
```

Recommended entry fields:

```json
{
  "url": "/home-affordability-calculator.html",
  "title": "Home Affordability Calculator",
  "description": "Estimate a home price and loan amount that may fit your household cash flow.",
  "type": "tool",
  "category": "Home & Loans",
  "keywords": ["home affordability", "mortgage affordability", "borrowing power"],
  "aliases": ["home loan affordability", "how much home can i afford"],
  "locale_aliases": {
    "IN": ["home loan", "EMI"],
    "GB": ["mortgage", "deposit"],
    "AU": ["home loan", "borrowing power"]
  },
  "priority": 100
}
```

The final implementation may use a more compact representation, but the fields and behavior must remain understandable and testable.

## 5.2 Index scope

Include:

- canonical public tools;
- canonical Learn guides;
- the Tools and Learn hubs;
- About, Methodology, Editorial Policy, Privacy, Terms and Contact where useful.

Exclude:

- duplicate routes;
- release ZIPs;
- internal documentation;
- test pages;
- workflow files;
- noindex utility pages other than the search page itself as a direct navigation destination;
- thin generated fragments;
- URLs that redirect to another canonical page.

## 5.3 Index generation

The production release should include a deterministic build script, for example:

`scripts/build-search-index.mjs`

The script should:

1. read the approved public-page inventory;
2. extract or validate title, description, H1, canonical and page type;
3. merge reviewed aliases and country terms;
4. reject duplicate canonical URLs;
5. reject empty titles or descriptions;
6. write stable JSON in a predictable order;
7. avoid adding personal data, page body dumps or hidden text.

The generated index must be committed in the release so the public static site does not need a build server at runtime.

---

# 6. Search matching and ranking

SEARCH1 does not need a complex machine-learning engine.

Use a transparent deterministic score.

Recommended order of importance:

1. exact title or exact alias match;
2. phrase match in title;
3. all search words present in title or aliases;
4. prefix match in title or aliases;
5. keyword match;
6. description match;
7. category match;
8. reviewed page priority as a tie-breaker.

The result order must not be changed by payment, advertising or affiliate relationships.

## 6.1 Normalization

Search matching should be case-insensitive and should normalize:

- repeated spaces;
- common punctuation;
- hyphenated and unhyphenated forms;
- singular/plural where safe;
- basic apostrophe differences.

Do not use aggressive fuzzy matching that could return a misleading financial topic.

## 6.2 Required alias groups

The reviewed alias library should include at least:

| User wording | Related Carrowmont wording |
|---|---|
| SIP | recurring investment, regular investment, monthly investment |
| EMI | loan payment, loan repayment, monthly instalment/installment |
| home loan | mortgage |
| deposit | down payment |
| balance transfer | refinance, remortgage |
| foreclosure / pre-closure | early payoff, prepayment, overpayment |
| SWP | systematic withdrawal plan, retirement withdrawal, drawdown |
| corpus | retirement savings, retirement fund, portfolio |
| credit card debt | card balance, revolving debt |
| APR | annual percentage rate, borrowing cost |
| ETF | exchange-traded fund |
| index fund | passive fund, market-tracking fund |

Aliases help discovery. They must not rewrite the visible page into unnatural keyword language.

## 6.3 Locale behavior

Country and currency remain separate.

The selected country may:

- give a small ranking boost to familiar local aliases;
- localize result labels where the destination page already supports it;
- change example wording in the search suggestions.

Changing currency alone must not silently change the meaning of a search term.

---

# 7. Privacy and analytics boundary

Search text may reveal financial concerns. Treat it as sensitive user context even if it is not a bank account number.

V1 must:

- keep the query in memory only;
- avoid localStorage and sessionStorage;
- avoid cookies;
- avoid URL parameters and fragments;
- avoid analytics events containing the query;
- avoid fetch/XHR/beacon calls containing the query;
- avoid console logging the query in production;
- avoid sending the query to Cloudflare Web Analytics or another analytics endpoint.

The same-origin request for the static search index is allowed.

Aggregate page-view analytics may remain under the established Carrowmont privacy rules, but the typed words must not be included.

---

# 8. Search-engine safety

Internal site search and public search-engine optimization are different things.

SEARCH1 must not create thousands of crawlable URLs such as:

- `/search.html?q=budget`;
- `/search/etf/`;
- parameter combinations;
- auto-generated topic pages.

The dedicated utility page should be `noindex,follow`. Its results are rendered for the visitor only.

All important content must still be reachable through ordinary crawlable `<a href>` links from Tools, Learn and contextual article/tool connections.

Google recommends standard crawlable links, useful sitemaps and careful handling of internal-search URLs. Bing also emphasizes canonical URLs, clear internal links, focused pages, accurate sitemaps and IndexNow notifications. SEARCH1 should support those foundations rather than replace them.

---

# 9. Accessibility and interaction

SEARCH1 must support:

- visible label, not placeholder-only input;
- keyboard focus on open;
- `Escape` to close a modal or panel;
- arrow-key or Tab navigation without focus traps;
- screen-reader announcement of result count;
- clear focus styles;
- touch targets suitable for mobile;
- reduced-motion preference;
- no horizontal overflow at 1280, 390 or 360 px;
- useful operation when JavaScript loads slowly.

The first meaningful page content must remain accessible even if the search script fails.

---

# 10. Performance

The search index should be small enough to load quickly on a normal mobile connection.

V1 target:

- index payload below 250 KB uncompressed unless the final public-page count makes that impractical;
- no large page-body copies in the index;
- no external library for basic search matching;
- no blocking search script in the critical rendering path;
- debounce input only as needed, without making the interface feel slow.

---

# 11. Integration with Learn and Tools

## 11.1 Learn hub

Add a search area near the top of `/learn.html` with a clear explanation:

> **Search guides and calculators by the question you have.**

Keep the existing categories and popular questions. Search does not replace them.

## 11.2 Tools directory

Add a compact search field or Search action near the top of `/tools.html`.

A search for a topic may show both a tool and supporting guides. The tool should not always outrank the guide. The best result depends on the user's words.

Examples:

- `mortgage calculator` -> tool first;
- `how does mortgage interest work` -> guide first;
- `SIP calculator` -> tool first;
- `what is recurring investing` -> guide first if available.

## 11.3 Homepage

The homepage may show a compact Search action in the header. Do not add another large homepage core card.

## 11.4 Calculator repositories

The first implementation may add a simple `Search` link in the established compact footer or shared navigation only if the change can be made consistently and safely.

Do not create different search behavior in each calculator repository.

If multi-repository header/footer rollout would make SEARCH1 too large, launch the main-site search first and schedule the calculator-entry rollout as a controlled follow-up.

---

# 12. QA contract

Central source and browser QA should protect at least:

## 12.1 Index contract

- JSON parses;
- schema version is supported;
- every URL is canonical and unique;
- every entry has title, description, type and category;
- no release ZIP, docs or workflow URL enters the index;
- all indexed URLs exist in the staged site;
- no `noindex` content is accidentally promoted as a normal result;
- country alias groups are reviewed and deterministic.

## 12.2 Matching fixtures

Deterministic fixtures should include:

- `sip` finds the SIP / Recurring Investment Calculator;
- `recurring investment` finds the same tool and related guides;
- `emi` finds Loan / EMI content;
- `home loan` finds mortgage/home-loan tools and guides;
- `remortgage` finds refinance content;
- `swp` finds the withdrawal/drawdown calculator and guide;
- `how to make a budget` finds the new budget guide when live;
- `etf` finds the ETF guide when live;
- nonsense text returns a helpful empty state.

## 12.3 Privacy fixtures

Tests must prove that typed search text does not enter:

- the URL;
- localStorage;
- sessionStorage;
- cookies;
- analytics requests;
- unexpected fetch/XHR/beacon requests.

## 12.4 Browser and layout fixtures

Test Chrome Desktop, Edge Desktop and Mobile Chromium where supported.

Protect:

- open/close behavior;
- keyboard behavior;
- result count announcement;
- result navigation;
- 1280, 390 and 360 px overflow safety;
- empty state;
- no-script or script-failure fallback where practical.

---

# 13. Release boundary

SEARCH1 V1 should normally change only:

- `draw004.github.io`;
- `carrowmont-qa`.

Expected main-site production files may include:

- `search.html`;
- `search.js`;
- `search.css`;
- `data/carrowmont-search-index.json`;
- `data/carrowmont-search-aliases.json` or an equivalent reviewed source;
- `scripts/build-search-index.mjs`;
- selected main-site header/navigation files;
- `learn.html`;
- `tools.html`;
- implementation documentation.

Expected QA files may include:

- one dedicated SEARCH1 browser spec;
- source-contract additions;
- route/config additions only where required.

Do not change calculator formulas, report formulas or financial engines.

---

# 14. Release sequence

Use the established Carrowmont process:

1. merge this specification-only release;
2. run a fresh Source Snapshot;
3. build SEARCH1 from that snapshot;
4. run static, hash, syntax and source-contract validation;
5. run staged Chrome/PDF/layout QA as applicable;
6. use the Batch PR Publisher from a disposable staging branch;
7. merge the main-site PR before central QA;
8. run live Automated QA;
9. run Multi-Repo Guard;
10. take a fresh Source Snapshot;
11. inspect Search Console and Bing only after the production release is stable.

Central QA merges last.

---

# 15. Definition of done

SEARCH1 is complete only when:

- the user can search tools, guides and trust pages from one interface;
- no third-party search provider receives the query;
- no search query enters URL, storage or analytics;
- country-aware aliases work without changing canonical URLs;
- result types are clear;
- search remains useful at 1280, 390 and 360 px;
- keyboard and screen-reader behavior is protected;
- the search utility page does not create indexable query-result URLs;
- all important content remains reachable through crawlable links;
- source contract and deterministic matching fixtures pass;
- Publisher is green;
- live Automated QA is green;
- Multi-Repo Guard is green;
- a fresh Source Snapshot becomes the new baseline.

---

# 16. Official search references used by this specification

- Google Search Essentials: `https://developers.google.com/search/docs/essentials`
- Google SEO documentation: `https://developers.google.com/search/docs`
- Google URL structure guidance: `https://developers.google.com/search/docs/crawling-indexing/url-structure`
- Google crawl troubleshooting and discovery guidance: `https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors`
- Bing Webmaster Guidelines: `https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a`
- IndexNow: `https://www.bing.com/indexnow`

These references guide eligibility and discovery. They do not guarantee crawling, indexing, ranking, citations or traffic.

---

# 17. Final product principle

> **Search should help a person reach the clearest Carrowmont answer with less effort, while keeping the person's financial question private.**

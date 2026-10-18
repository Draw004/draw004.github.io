# CARROWMONT GSEO2A — SEARCH VISIBILITY & PRIVACY FOUNDATION

## Product / SEO / Privacy Specification — REV1

**Baseline:** Carrowmont clean Source Snapshot 82  
**Snapshot generated:** 2026-10-18T17:02:54Z  
**Main-site commit:** `258da983dd0bcae071eae44441c8a7a678a1c8db`  
**Status:** FINAL REV1 SPECIFICATION — production code is not changed by this document.  

> **REV1 supersession:** This document replaces the earlier GSEO2A draft that retained optional Google Analytics. For all future Carrowmont work, the rule below is authoritative: **Google Analytics is removed, there is no analytics-consent popup, and calculator financial values are never used for website analytics.** Where an older Carrowmont specification says “Google Analytics remains opt-in”, this newer rule supersedes that analytics statement.

---

## 1. Why this release exists

Carrowmont is indexable and Google can find many of its pages, but important calculator searches are still weak. Short searches such as **SIP calculator**, **retirement calculator**, **loan calculator**, **SWP calculator**, **goal planner** and **recurring investment calculator** often do not surface Carrowmont prominently.

This is mainly a **ranking, authority and search-intent problem**, not a basic indexing problem.

At the same time, Carrowmont handles deeply personal financial planning inputs. Even when analytics is technically configured not to receive calculator values, a large consent popup that talks about Google Analytics can create the wrong feeling. A user should be able to open Carrowmont and use a calculator without first wondering whether their financial information is being tracked.

GSEO2A therefore has two priorities:

1. make Carrowmont's important calculator pages easier for search engines to understand and trust; and
2. make privacy feel like a normal property of the product, not a warning shown before the product can be used.

HOME1 production remains paused until this foundation is stable.

---

## 2. Locked Carrowmont rules preserved

GSEO2A must preserve all established Carrowmont rules:

- no calculator-math changes;
- no report-math changes;
- one universal engine when the mathematics is universal;
- country selection may change familiar terminology, examples and genuine local caveats, but must not create duplicate country calculator engines;
- one primary canonical page per important search intent;
- no fake experts, invented credentials, paid-link schemes, PBNs, doorway pages, hidden text or keyword stuffing;
- no financial values in URLs;
- no calculator requires an account for core use;
- compact fixed footer architecture remains intact;
- new tools are discovered through All Tools, Learn and contextual journeys rather than an ever-growing footer;
- simple language is the default; technical terms are explained when they are genuinely needed;
- central QA merges last;
- no workflow-file change is expected;
- Batch PR Publisher browser QA remains the authoritative staged release gate.

---

## 3. New permanent privacy rule

### 3.1 No analytics popup

Carrowmont must not show an analytics or tracking popup when a visitor opens the site.

Remove the current consent panel and all equivalent first-visit analytics prompts, including:

- “Your calculator numbers stay private from analytics” banner;
- “Continue without Google Analytics” button;
- “Allow Google Analytics” button;
- “Analytics settings” control whose only purpose is Google Analytics consent;
- consent-state UI related to Google Analytics.

A visitor should simply arrive at the requested Carrowmont page and use it.

### 3.2 Remove Google Analytics completely

Google Analytics / GA4 must be removed from the Carrowmont visitor runtime.

The implementation must remove or disable:

- Google Analytics measurement IDs used by visitor pages;
- `googletagmanager.com/gtag/js` loading;
- `gtag()` initialization and event dispatch;
- Google Analytics consent state and related local-storage/cookie preference logic;
- custom GA events used for calculator interactions;
- QA expectations that require GA consent or GA network requests.

The implementation must verify that ordinary Carrowmont browsing produces **no request to Google Analytics or Google Tag Manager**.

Historical documentation may remain as historical evidence, but current product documentation must make the new rule clear.

### 3.3 Financial values are outside website analytics

Financial calculator inputs belong to the user.

Carrowmont must not use calculator financial values for:

- website analytics;
- advertising;
- behavioural profiling;
- marketing audiences;
- cross-site tracking.

This includes values such as income, savings, debt, balances, spending, contributions, investment amounts, withdrawal amounts, interest rates, return assumptions and calculated financial results.

Where a calculator can perform its work entirely in the browser, those values should remain in browser-side calculation/state unless a separate future feature genuinely requires transmission and the user knowingly chooses that feature.

### 3.4 Privacy-focused site measurement may remain

Carrowmont may retain the existing privacy-focused aggregate site measurement used for page-level site usage and performance, provided it remains separate from calculator financial values and does not introduce a first-visit consent popup under the approved implementation.

For the current architecture this means retaining the existing Cloudflare Web Analytics integration, subject to verification that:

- no calculator input or result is deliberately added to its beacon payload;
- financial values are not placed in URLs;
- no custom event layer sends calculator amounts/results;
- no cross-site advertising or profiling feature is introduced.

Google Search Console, Bing Webmaster Tools and IndexNow remain part of Carrowmont's search-measurement/discovery workflow. They do not require a visitor-facing analytics popup.

### 3.5 Privacy-page language

The Privacy page remains, but the wording should be short, calm and easy to understand.

Recommended section:

**Your financial information**

`The numbers you enter into Carrowmont calculators are used to calculate your results. Carrowmont does not use those financial values for advertising, profiling or website analytics.`

Recommended separate section:

**Website analytics**

`Carrowmont uses privacy-focused, aggregate website analytics to understand site usage and performance. These analytics do not include the financial values you enter into calculators.`

A short factual sentence may identify Cloudflare Web Analytics on the Privacy page. Do not put a large analytics explanation on calculator pages and do not show an analytics popup.

Do not use absolute terms such as “anonymous” unless the implementation and service contract justify them.

---

## 4. Search findings from Snapshot 82

### 4.1 Technical indexability is broadly healthy

The major calculator pages checked in Snapshot 82 use intended indexability, canonicals and sitemap coverage. `robots.txt` allows the intended public site to be crawled.

Weak head-term rankings should therefore not be treated as if a hidden `noindex` or robots block is the main problem.

### 4.2 Internal authority is uneven

Snapshot 82 shows a large difference between mature tools and newly launched tools. Mature calculators receive contextual links from many Carrowmont pages, while several new calculators are supported by only a few internal source pages.

The answer is **not** to restore a giant footer. The answer is to build meaningful topic journeys:

- Tool -> Learn;
- Learn -> Tool;
- related Tool -> Tool when the next decision genuinely fits;
- Tools Hub discovery;
- methodology / FAQ / decision-centre paths where useful.

### 4.3 Retirement query ownership is split

Two indexable pages currently overlap too much:

- `/retirement-calculator/`
- `/retirement-calculator/planner.html`

The root page already has much stronger internal discovery. It should own the broad **retirement calculator** intent. The detailed planner should own a narrower **detailed / expense-aware retirement planning** intent.

### 4.4 SIP search identity must survive localization

Carrowmont's investment calculator is global, but **SIP** is an important Indian search term and **Recurring Investment** is important internationally.

Localization may change the prominent user-facing label, but it must not make the canonical page appear to be only one of those products. Search-critical static/rendered wording should preserve both concepts naturally.

### 4.5 SWP needs an explicit crawlable identity

The retirement withdrawal calculator is new and its static search identity does not yet make **SWP / Systematic Withdrawal Plan** strong enough.

The already prepared RETIRE1-SWP improvements should be folded into the GSEO2A implementation rather than released as a separate overlapping package.

### 4.6 Loan / EMI needs authority more than another title rewrite

The Loan & EMI Calculator already has a clear product identity. Its main weakness is shallow contextual support. GSEO2A should strengthen useful internal paths and Learn support without changing the calculation engine.

### 4.7 External authority remains a major long-term gap

Carrowmont is young and competes in finance against domains with years of history, citations and backlinks.

On-page SEO cannot fully replace genuine third-party trust. After the internal foundation is stable, Carrowmont should build useful reference assets and earn legitimate mentions from relevant finance, education and publishing sites.

---

## 5. Search-intent ownership

### 5.1 SIP / recurring investment

**Canonical owner:** `/sip-calculator/`

Primary search family:

- SIP calculator;
- systematic investment plan calculator;
- recurring investment calculator;
- monthly investment calculator;
- step-up SIP calculator;
- goal SIP calculator.

Recommended stable search title:

**`SIP & Recurring Investment Calculator | Carrowmont`**

Required behavior:

- one canonical URL only;
- static/rendered content contains both **SIP** and **Recurring Investment** identity;
- India may still show SIP prominently;
- other markets may show Recurring Investment prominently;
- locale JavaScript must not rewrite the search identity so one major query family disappears;
- include one simple sentence explaining that SIP is the common Indian term for making recurring investments at regular intervals;
- do not create a cloned India calculator page.

### 5.2 Retirement

**`/retirement-calculator/`** owns the broad family:

- retirement calculator;
- retirement planning calculator;
- retirement savings calculator;
- retirement corpus calculator.

Recommended title:

**`Retirement Calculator & Retirement Planner | Carrowmont`**

The static page must use **retirement calculator** naturally and clearly route the visitor into the calculation experience.

**`/retirement-calculator/planner.html`** owns the narrower family:

- detailed retirement planner;
- expense-aware retirement planning;
- retirement expense planner.

Recommended title direction:

**`Detailed Retirement Planner | Carrowmont`**

Internal links using generic **Retirement Calculator** wording should primarily support the root canonical page.

### 5.3 SWP / retirement withdrawal / drawdown

**Canonical owner:** `/retirement-calculator/withdrawal-calculator.html`

Primary search family:

- SWP calculator;
- systematic withdrawal plan calculator;
- retirement withdrawal calculator;
- retirement drawdown calculator;
- how long will retirement savings last.

Recommended title:

**`SWP, Retirement Withdrawal & Drawdown Calculator | Carrowmont`**

Static HTML should explain in simple language:

`SWP means Systematic Withdrawal Plan. In India, it commonly describes taking a regular amount from an invested corpus while the remaining balance stays invested.`

Then clearly state:

`Carrowmont models the withdrawal maths of a portfolio. It does not model a particular mutual fund's NAV history, exit load, tax treatment or guaranteed return.`

Add one Learn page:

`/what-is-swp-systematic-withdrawal-plan.html`

That article owns the informational question **What is SWP?** and links prominently to the calculator. It must not try to become a second SWP calculator page.

### 5.4 Loan / EMI

**Canonical owner:** `/loan-calculator/`

Primary search family:

- loan calculator;
- EMI calculator;
- loan payment calculator;
- loan interest calculator;
- amortization calculator where the page genuinely answers that intent.

Keep the current core title direction unless evidence supports a change. Strengthen contextual internal links and useful Learn support around questions such as:

- **How is a loan EMI or monthly payment calculated?**
- **How do interest rate and loan term change the total cost of a loan?**

These Learn pages should answer the question in plain language and then route the visitor to the calculator.

### 5.5 Goal Planner

Keep the established direction:

**Savings Goal Calculator & Financial Goal Planner**

Do not over-optimize for generic **goal planner**, because that phrase can also mean career, productivity or personal-goal software.

Primary financial ownership remains:

- savings goal calculator;
- financial goal planner;
- goal savings calculator;
- monthly savings needed for a goal.

### 5.6 Compound interest and other newer tools

Do not repeatedly rewrite stable titles because rankings are young. Strengthen contextual authority from investing, saving, debt, retirement and relevant Learn content where the relationship is genuinely useful.

---

## 6. Simple-language standard

Search optimization must not make Carrowmont harder to read.

Every calculator and Learn page should:

- use short, familiar words where possible;
- explain necessary finance terms immediately;
- answer the user's question before giving background detail;
- explain what a result means, what may change it, and what the user should think about next;
- avoid regulatory or lender jargon unless the rule is genuinely relevant and sourced;
- avoid exaggerated promises, fear-based wording and fake precision;
- use examples that help someone make a real decision.

A page should be useful even if the visitor never clicks another Carrowmont page.

---

## 7. Internal topic-authority standard

Important calculators should not launch with only a handful of weak discovery paths.

For each high-value calculator, use a small coherent cluster:

- direct Tools Hub discovery;
- one or more useful Learn -> Tool links;
- Tool -> Learn explanation;
- related-tool links when the next financial decision naturally fits;
- methodology / FAQ / decision-centre links where useful.

Anchor text should describe the destination naturally, for example:

- **Loan Calculator**;
- **Retirement Calculator**;
- **SWP Calculator**;
- **SIP Calculator**;
- **Recurring Investment Calculator**.

Do not add every tool to every article and do not rebuild the footer as a directory.

---

## 8. Trust standard for finance pages

Carrowmont must improve trust without inventing authority.

Required:

- clear methodology and formula explanations;
- clear limitations and educational framing;
- meaningful reviewed/updated dates only when a real review occurred;
- Editorial Policy and Calculator Methodology / Formula Review standard;
- primary or authoritative sources for country-specific legal/regulatory claims;
- real human authors/reviewers only when identity, role and contribution are genuine and owner-approved;
- otherwise transparent Carrowmont editorial ownership without fabricated credentials;
- easy-to-find contact and corrections paths;
- privacy language that is factual and calm rather than alarming.

---

## 9. External authority workstream

After the sitewide foundation is stable, prioritize legitimate third-party discovery and references through:

- original reference assets that finance writers can cite;
- useful formula/methodology resources;
- genuine outreach to relevant finance educators, bloggers, journalists and financial-literacy publishers;
- legitimate tool/product directories where Carrowmont is genuinely relevant;
- real expert collaboration when the contribution is genuine;
- shareable educational examples, tables and research that add something beyond existing calculators.

Never buy bulk backlinks or exchange keyword-rich links at scale.

---

## 10. Technical verification gate

Before the implementation release is handed to the user, verify on the exact staged build:

- intended canonical pages return HTTP 200;
- robots allows the intended public pages;
- `index,follow` is present where intended;
- one approved canonical per page;
- sitemap contains the intended canonicals and no duplicate state URLs;
- rendered title and H1 preserve approved search identity after JavaScript runs;
- locale code does not remove critical search terminology;
- structured data matches visible content;
- contextual links are crawlable `<a href>` links;
- no financial values appear in generated URLs;
- no accidental `noindex`;
- **no Google Analytics / Google Tag Manager request is made**;
- **no analytics consent popup or analytics-settings control appears**;
- Cloudflare Web Analytics, if retained, receives no deliberate calculator input/result custom fields;
- desktop / 1280 / 390 / 360 browser QA;
- no console errors;
- existing calculator and report fixtures remain unchanged;
- `http`, `https`, `www` and non-`www` consolidation is verified with live/Search Console evidence before any DNS change is considered.

---

## 11. QA migration requirement

The existing PRIVACY2 QA contract currently expects optional Google Analytics and a consent gate. GSEO2A implementation must deliberately replace that contract rather than working around it.

Update central QA so it protects the new privacy architecture:

- no GA or GTM script/network request;
- no consent banner on first visit;
- no analytics-settings button;
- Privacy page contains the approved simple financial-information and website-analytics explanations;
- calculator financial values remain absent from URLs;
- existing one-time cross-tool handoffs remain privacy-safe;
- Cloudflare aggregate analytics remains isolated from calculator financial inputs/results;
- mobile and desktop pages remain usable with no privacy overlay.

The old tests must not remain as hidden requirements that force the removed Google Analytics behavior back into the product.

---

## 12. Measurement rule

Manual Google searches are useful signals but are not the ranking source of truth because results vary by market, device, personalization and time.

Measure primarily in Google Search Console by:

**Query x Page x Country x Device**

Track:

- impressions;
- clicks;
- CTR;
- average position;
- which canonical page receives impressions;
- whether the intended query family appears;
- India vs US / UK / Canada / Australia / New Zealand differences;
- branded vs non-branded discovery.

Use Cloudflare aggregate site analytics for broad site-usage/performance signals where useful. Do not reintroduce Google Analytics merely to obtain richer behavioural funnels at the current stage.

Do not rewrite titles every few days. Record material changes and allow enough time for recrawl and ranking evaluation.

---

## 13. Delivery sequence

GSEO2A should be delivered in controlled stages:

1. **Specification REV1 release** — this document only.
2. Fresh post-spec Source Snapshot.
3. **Implementation release A — privacy + search foundation**:
   - remove Google Analytics from all visitor-facing repositories;
   - remove the analytics consent popup and settings control;
   - simplify Privacy page wording;
   - preserve privacy-focused aggregate site measurement;
   - stabilize SIP / Recurring Investment search identity;
   - separate broad Retirement Calculator intent from detailed-planner intent;
   - fold in SWP static identity + SWP Learn page;
   - strengthen internal authority for Loan / EMI, SWP and other newer tools;
   - migrate central QA to the new privacy contract.
4. Pages -> Automated QA -> Multi-Repo Guard -> fresh Source Snapshot.
5. Request Google recrawl only for materially changed/new canonical pages.
6. Continue the earned external-authority workstream.
7. Export fresh Search Console data after a meaningful observation window and compare against the recorded baseline.
8. Resume HOME1 production only after this foundation is stable.

---

## 14. Explicit non-goals

GSEO2A must not:

- promise Top 10 / Top 5 / Top 3 rankings by a date;
- create duplicate India / US / UK calculator pages solely for keywords;
- change calculator mathematics;
- use hidden text or keyword stuffing;
- add fake reviews or ratings;
- fabricate authors or expert reviewers;
- reintroduce Google Analytics under another consent design;
- put financial values into any website analytics system;
- create a first-visit privacy or analytics popup;
- rebuild the footer as a long calculator directory;
- create dozens of thin Learn pages merely because keywords exist;
- launch HOME1 production in the same implementation release.

---

## 15. Acceptance criteria

The implementation is acceptable only when:

- a first-time visitor sees the Carrowmont page directly with **no analytics popup**;
- Google Analytics and Google Tag Manager are absent from visitor runtime/network activity;
- no analytics settings control remains solely for removed GA consent;
- Privacy explains financial-data handling in simple, calm language;
- calculator amounts/results are not used for website analytics, advertising or profiling;
- privacy-focused aggregate site measurement remains separate from calculator financial values;
- the final rendered SIP page preserves both SIP and recurring-investment identity;
- one clear Retirement page owns the broad calculator query and the detailed planner has a distinct narrower intent;
- the withdrawal calculator is clearly understandable as an SWP calculator for Indian users while remaining globally correct;
- Loan / EMI and other newer tools gain contextual authority without footer link dumping;
- no established calculator or report math changes;
- Publisher staged browser QA is green;
- live Automated QA and Multi-Repo Guard are green;
- a fresh Source Snapshot is taken before HOME1 resumes.

---

## 16. Owner-facing conclusion

Carrowmont should feel private without making privacy feel frightening.

A visitor should be able to open a calculator, enter numbers and get a result without first seeing a tracking decision. Search measurement should come from Search Console, Bing tools and privacy-focused aggregate site analytics rather than asking users to accept Google Analytics.

For search visibility, the priority remains:

**make each calculator's purpose clear -> strengthen useful internal authority -> strengthen trust -> earn external authority -> measure patiently.**

More calculators should come after this foundation is stable, not instead of it.

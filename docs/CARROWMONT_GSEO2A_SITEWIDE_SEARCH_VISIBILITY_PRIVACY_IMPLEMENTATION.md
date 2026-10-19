# CARROWMONT GSEO2A — Sitewide Search Visibility & Privacy Foundation

## Production implementation record

**Implementation baseline:** Carrowmont Source Snapshot 83  
**Snapshot generated:** 18 October 2026, 18:46:09 UTC  
**Status:** production implementation package prepared for protected Publisher flow  

## 1. Purpose

GSEO2A fixes two sitewide foundations before Carrowmont adds another calculator:

1. visitors should be able to use Carrowmont without an analytics consent interruption or uncertainty about whether their financial numbers are being tracked; and
2. every live calculator/tool and every Learn article should have a clear, crawlable search purpose and useful internal discovery paths.

This is not a promise of a particular Google ranking. Search performance will be measured after deployment through Google Search Console by query, page, country and device.

## 2. Privacy implementation

Google Analytics is removed from the visitor runtime across the main site and all nine calculator repositories.

The release removes:

- the first-visit analytics popup;
- Google Analytics / GA4 loading;
- the analytics consent state and controls;
- the Analytics settings button;
- legacy GA configuration escape hatches.

Carrowmont keeps privacy-focused aggregate Cloudflare Web Analytics. Existing application calls to the shared analytics API remain safe through a no-op compatibility interface so calculator behavior does not break.

The Privacy page now uses simple wording. Financial values entered into calculators are not used for advertising, profiling or website analytics.

Google Search Console, Bing Webmaster Tools and IndexNow remain separate search-discovery/measurement systems and are not removed by this release.

## 3. Sitewide search-discoverability contract

The Tools Hub currently exposes 18 live public tool destinations. Central QA now requires every one of those destinations to have:

- a crawlable title;
- a meta description;
- one intended H1;
- an index/follow robots directive;
- the intended canonical URL;
- sitemap coverage; and
- at least five relevant discovery paths from main-site pages.

This prevents newer tools from becoming isolated while avoiding a large sitewide footer or mechanical link dumping.

The same release protects every Carrowmont Learn article. Every Learn article must remain indexable, have a unique title and canonical, contain a direct-answer section, expose Article structured data, appear in the Learn hub and remain in the sitemap.

The goal is one useful page per search intent, not multiple Carrowmont pages competing for the same phrase.

## 4. Search-intent corrections in this release

### SIP / recurring investment

The static search identity now retains both **SIP Calculator** and **Recurring Investment Calculator**. Country selection can still change the visible product terminology, but localization can no longer erase the important crawlable SIP identity.

The page also explains in plain language that SIP means Systematic Investment Plan.

### Retirement

Broad **retirement calculator / retirement planner** intent belongs to `/retirement-calculator/`.

`/retirement-calculator/planner.html` is now clearly the **Detailed Retirement Planner**, reducing unnecessary competition between two Carrowmont URLs for the same broad search.

### SWP / retirement withdrawal

The existing canonical retirement-withdrawal tool remains one URL. Its static page now clearly owns **SWP**, **Systematic Withdrawal Plan**, **retirement withdrawal** and **drawdown** language without pretending to model a particular mutual fund, NAV, tax treatment or guaranteed return.

A new Learn article, `what-is-swp-systematic-withdrawal-plan.html`, owns the explanatory “what is SWP?” intent and links to the calculator.

### Loan / EMI

The Loan / EMI Calculator now has two substantial supporting Learn pages:

- `how-is-loan-emi-calculated.html`
- `loan-interest-rate-vs-term.html`

They use simple decision-focused explanations, worked examples and authoritative references. The Learn hub now contains a Loans & Debt category and Tool ↔ Learn paths are bidirectional.

## 5. Bounded internal-authority improvements

Several newer or narrower tools had materially fewer relevant internal discovery paths than the mature Carrowmont tools. This release adds contextual links only where the reader's next decision genuinely fits, including Compound Interest, Debt Payoff, Rent vs Buy, Silver and Retirement Withdrawal/SWP.

Central QA now requires every current Tools Hub destination to retain at least five main-site discovery paths. This is a floor against isolation, not a ranking formula.

## 6. What this release deliberately does not do

GSEO2A does not:

- change calculator mathematics;
- change report mathematics;
- create country-cloned doorway pages;
- add keyword-stuffed paragraphs;
- mass-rewrite already healthy titles merely for activity;
- add a large footer directory;
- invent authors, reviewers or credentials;
- buy links or use private-blog-network schemes;
- promise top-10, top-5 or top-3 rankings.

Most existing Carrowmont pages already had basic titles, descriptions, canonicals and H1s. The implementation therefore focuses on identified gaps, intent ownership, crawlable terminology, internal authority and trust rather than another blind sitewide metadata rewrite.

## 7. QA and release safeguards

The central source contract protects:

- absence of Google Analytics and the old consent popup;
- Cloudflare-only aggregate visitor measurement;
- financial-data privacy wording;
- all 18 live tool search/indexability contracts;
- the full Learn-article search/indexability contract;
- minimum tool discovery paths;
- SIP/SWP/Retirement/Loan intent ownership;
- historical sitemap freshness using monotonic checks so later legitimate content improvements do not fail old release contracts.

Browser QA additionally checks the no-popup/no-Google-Analytics first visit, responsive Learn/Tools behavior, localization, SWP discovery and Tool ↔ Learn journeys.

## 8. Measurement after deployment

The deployment date should be recorded in the Search Console measurement log. Performance should be reviewed by **query × page × country × device** rather than repeated personalized manual searches alone.

The first sign of progress is not “a green workflow.” It is the correct Carrowmont URLs gaining impressions for their intended query families, followed by movement from deep positions toward Top 50, Top 20 and Top 10 where competitive reality allows.

Avoid changing the same title or intent again after a few days of noisy data. Allow enough crawl and ranking history to accumulate before another search-facing rewrite.

## 9. Next SEO phase

Once this foundation is live and stable, the next major growth lever is **external authority**: original reference assets and legitimate mentions/links from relevant independent sites, educators, journalists and communities. Internal SEO alone cannot manufacture the historical authority held by established finance domains.

HOME1 remains paused until GSEO2A is deployed, validated and snapshotted.

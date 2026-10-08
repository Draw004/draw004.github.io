# Carrowmont Bing / SEO Audit

**Baseline:** Source Snapshot 19  
**Audit date:** 8 October 2026  
**Scope:** `carrowmont.com` sitemap, root site, six public planning tools, internal linking, metadata, canonicalization, structured data, crawl directives, and Bing discovery signals.

## Executive conclusion

Carrowmont does **not** have an obvious site-wide blocking error. The sitemap resolves to 71 real public pages, `robots.txt` allows crawling, all sitemap URLs have canonical tags, none contains a `noindex` directive, there are no missing sitemap files, and no broken internal links were found in the audited source.

The current Bing problem is more consistent with **crawl prioritization on a new/low-authority domain**, made worse by several fixable discovery/freshness issues:

1. IndexNow is not implemented anywhere in the current source.
2. Sitemap `lastmod` values are stale for all 52 Learn articles compared with their visible/schema `dateModified` values.
3. Internal-link depth is weak for a meaningful subset of Learn pages.
4. Two public planner pages contain two `<h1>` elements.
5. Several titles and descriptions are longer or weaker than ideal for search presentation.
6. Most Learn content was published in two large bursts on 23 and 27 September, then all 52 articles were modified on 28 September. A new site asking Bing to evaluate dozens of new finance pages at once can take time, especially with few external authority signals.

The correct response is **not repeated manual URL submission**. Carrowmont should strengthen machine-readable freshness, automate change notification, improve internal authority flow, and gradually earn genuine external links.

---

## 1. Sitemap and crawl audit

| Check | Result |
|---|---:|
| Sitemap URLs | 71 |
| Sitemap URLs missing from source | 0 |
| Missing titles | 0 |
| Missing meta descriptions | 0 |
| Missing canonicals | 0 |
| Canonical mismatches | 0 |
| `noindex` URLs | 0 |
| Broken internal links found | 0 |
| Duplicate exact titles | 0 |
| Duplicate exact meta descriptions | 0 |
| IndexNow implementation | Not present |

`robots.txt` currently permits all crawlers and points to `https://carrowmont.com/sitemap.xml`.

## 2. Sitemap freshness problem

All 52 Learn articles expose `dateModified: 2026-09-28` in Article structured data, but their sitemap `lastmod` values remain earlier dates (mostly 23 or 27 September).

This creates inconsistent freshness signals. The sitemap should reflect the actual significant content modification date.

### Recommended correction

- Update all 52 Learn article `lastmod` values to `2026-09-28` for this baseline.
- Add QA so future Article `dateModified` cannot be newer than sitemap `lastmod`.
- For future releases, update `lastmod` only when a page materially changes rather than refreshing every URL indiscriminately.

## 3. Internal-link depth

No article is fully orphaned, largely because the Learn hub links to the content set. However, internal authority is uneven.

### Articles with only one internal inbound link

- `planning-life-goals.html`
- `step-up-sip-vs-regular-sip.html`
- `coast-fire-explained.html`
- `sip-during-market-fall.html`

### Articles with only two internal inbound links

- `emergency-savings.html`
- `sip-for-1-crore.html`
- `inflation-and-retirement-planning.html`
- `investment-time-to-target.html`
- `lump-sum-vs-monthly-investing.html`
- `future-cost-of-expenses.html`
- `inflation-purchasing-power-savings.html`
- `zero-based-budgeting.html`
- `pay-yourself-first-budgeting.html`
- `lifestyle-inflation.html`
- `budgeting-by-pay-frequency.html`
- `physical-gold-vs-gold-etf.html`
- `gold-and-inflation.html`
- `reit-vs-direct-property.html`

### Recommended correction

Add contextual links from closely related Learn articles so important pages have multiple crawl paths and stronger topic clusters. Do not add random site-wide links merely to increase counts.

## 4. Heading issue

Two public pages contain two `<h1>` elements in source:

- `/goal-planner/`
- `/retirement-calculator/planner.html`

The second `<h1>` belongs to report UI/content rather than the primary page topic. It should be changed to a non-primary heading without affecting PDF output.

## 5. Title and meta cleanup

The audit found 15 title tags longer than 60 characters and five meta descriptions longer than 160 characters. This is not a crawl blocker, but tightening the most important search-facing pages can improve clarity and click-through presentation.

Priority examples include:

- Retirement Planner landing/planner/methodology titles
- `inflation-value-of-money-over-time.html`
- `retirement-monthly-income-needed.html`
- `inflation-and-retirement-planning.html`
- `investment-time-to-target.html`
- `learn.html` description

`learn.html` also uses the generic title `Learn | Carrowmont`; a clearer search title such as `Financial Planning Guides | Carrowmont` would better describe the page.

## 6. Content-quality findings

The Learn library does **not** look like a thin-content problem from source inspection:

- 52 educational article pages were found.
- Most contain roughly 1,000–1,700 visible words.
- All audited Learn articles use Article structured data.
- Exact title and meta-description duplication was not found.
- No strong near-duplicate pair was detected at a high similarity threshold.
- Articles include outbound references to sources such as Investor.gov, CFPB, FINRA, IMF, Vanguard, Morningstar, SEBI/NISM, CFA Institute, and other relevant authorities.

This means a mass deletion/consolidation campaign is **not justified at this stage**. The first priority should be crawl/discovery signals and authority.

## 7. Publishing pattern

Article publication dates in structured data:

- 6 articles: 20 September 2026
- 20 articles: 23 September 2026
- 26 articles: 27 September 2026

All 52 are marked modified on 28 September 2026.

This is a large amount of new finance content for a very young domain to ask a search engine to evaluate at once. It strengthens the case for IndexNow, accurate `lastmod`, stronger internal linking, and gradual external authority building.

## 8. Recommended BING-SEO1 release

### Technical discovery

1. Add an IndexNow verification key file at the Carrowmont domain root.
2. Add automated IndexNow submission after production changes.
3. Submit only affected/public canonical URLs where practical.
4. Keep the XML sitemap and robots.txt as the baseline discovery layer.

### Sitemap

5. Correct stale article `lastmod` values.
6. Add automated QA comparing Article `dateModified` with sitemap `lastmod`.
7. Keep only canonical public URLs in the sitemap.

### Page structure

8. Fix the two duplicate-H1 pages.
9. Tighten the most problematic title/meta lengths.
10. Improve the Learn hub title.

### Internal authority

11. Add contextual links to the 18 underlinked Learn pages, prioritizing the four one-inlink pages.
12. Preserve topic relevance; do not add indiscriminate footer/sitewide links.

### QA

13. Add source-contract checks for:
    - exactly one primary H1 on indexable pages where practical
    - canonical/sitemap agreement
    - no accidental `noindex`
    - sitemap `lastmod` freshness against Article metadata
    - IndexNow key/workflow presence
    - no broken internal links

## 9. Authority / backlink work after BING-SEO1

Bing Webmaster Tools is explicitly reporting insufficient inbound links from high-quality domains. After the technical batch, work should focus on earning a small number of legitimate links rather than buying bulk backlinks.

Good Carrowmont link assets include:

- calculators and planning tools
- original comparison tables
- financial-planning explainers with transparent methodology
- downloadable educational checklists/templates
- data-driven or scenario-based articles that other publishers can cite

Potential outreach targets should be relevant personal-finance publications, retirement/FIRE communities, financial-education websites, India/expat finance publishers, and legitimate resource pages.

## 10. What not to do

- Do not repeatedly resubmit the same unchanged URLs every few days.
- Do not buy bulk backlinks or use link farms.
- Do not change URLs merely because Bing has not crawled them yet.
- Do not delete useful articles solely to reduce the sitemap count.
- Do not refresh every sitemap `lastmod` date unless the corresponding page actually changed materially.

## Recommended order

1. BING-SEO1 technical release
2. Batch PR Publisher / staged QA
3. Merge and live QA
4. Confirm IndexNow submissions in Bing Webmaster Tools
5. Re-check URL Inspection over the following 1–3 weeks
6. Begin authority/backlink outreach and content promotion
7. Use Search Performance data to decide which topic clusters deserve further expansion

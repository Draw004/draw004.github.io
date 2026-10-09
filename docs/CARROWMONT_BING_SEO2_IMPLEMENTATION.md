# Carrowmont BING-SEO2 — Internal Authority & Search Presentation

Date: 2026-10-08
Baseline: Carrowmont Source Snapshot 21

## Purpose

BING-SEO2 strengthens the discoverability and search presentation of the existing Carrowmont Learn library without changing calculator formulas, Smart Suggestions logic, URLs, canonicals, or the 71-URL sitemap inventory.

BING-SEO1 established the technical indexing foundation with IndexNow, accurate sitemap freshness, and crawlability protections. BING-SEO2 focuses on the next layer: stronger internal authority paths between related educational pages and tighter search-result titles/descriptions.

## Internal authority improvements

Before this release, a group of Learn articles were linked mainly from the Learn hub and only one additional page, while several had no contextual inbound source beyond the hub. BING-SEO2 adds contextual "Related Carrowmont guides" links from thematically relevant articles across these topic clusters:

- budgeting and cash flow
- financial independence
- inflation and purchasing power
- retirement planning
- monthly investing / SIP concepts
- gold and asset allocation
- real estate / REITs
- goal planning

The release does not add artificial sitewide links. Each new link is placed on a page with closely related subject matter.

After the release, every current Learn Article has links from at least three unique Carrowmont pages, including the Learn hub.

## Search presentation improvements

BING-SEO2 shortens 11 Learn page titles that exceeded the new concise-title target while preserving the user-facing H1 question or article heading. It also tightens long meta descriptions and expands one unusually short Learn description.

The SEO2 source contract requires current Learn Articles to keep:

- unique titles
- title length between 25 and 60 characters
- unique meta descriptions
- description length between 110 and 160 characters

The Learn hub and methodology descriptions are also kept within the 110–160 character range.

## Freshness handling

Every Learn Article changed by SEO2 receives:

- JSON-LD `dateModified` = `2026-10-08`
- visible article update date = `Updated 8 October 2026`
- matching sitemap `lastmod` = `2026-10-08`

This preserves the BING-SEO1 contract that Article structured-data freshness and sitemap freshness agree.

Because IndexNow is already live, the production merge can notify Bing of these changed URLs automatically after deployment.

## QA protection

Central QA now protects the following SEO2 contracts:

1. all Learn Article titles and descriptions stay within the tighter search-presentation ranges;
2. every Learn Article has at least three unique internal source pages;
3. contextual related-guide modules remain present across the selected topic-cluster pages;
4. Learn hub and methodology descriptions remain within the snippet-safe range;
5. the earlier sitemap/dateModified consistency contract continues to pass.

## Out of scope

BING-SEO2 does not change:

- calculator formulas;
- Budget Smart Suggestions;
- report calculations;
- canonical URLs;
- sitemap URL count;
- robots directives;
- IndexNow workflow permissions;
- external backlink strategy;
- login or AI/SS3 architecture.

External authority/backlink work remains a separate off-site SEO activity.

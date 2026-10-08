# Carrowmont IndexNow Implementation

**Status:** Active design for BING-SEO1  
**Host:** `carrowmont.com`  
**Purpose:** Notify IndexNow-enabled search engines when Carrowmont URLs are genuinely added, updated, or removed.

## Components

- Public verification key file at the site root:
  - `d7088229f885cb74d3cd2a3b696b5708.txt`
- Submission script:
  - `scripts/indexnow-submit.mjs`
- GitHub Actions workflow:
  - `.github/workflows/carrowmont-indexnow.yml`
- Source of recent-change URLs:
  - `sitemap.xml` `<lastmod>` values

## Operating model

1. A meaningful public page change is merged.
2. The matching canonical URL receives an accurate `lastmod` in `sitemap.xml`.
3. GitHub Pages deploys the change.
4. The IndexNow workflow waits until the production verification key and sitemap match the merged commit.
5. The workflow submits only recently changed Carrowmont URLs to the global IndexNow endpoint.
6. A daily fallback run checks the current and previous UTC day in case a push-triggered run was interrupted.

The workflow also supports a manual run for a small set of recently changed URLs. Manual submission should not be used to repeatedly resubmit unchanged pages.

## Security

The IndexNow key is intentionally public. IndexNow requires the key to be hosted as a plain-text verification file on the public site. It is not a GitHub credential, password, Personal Access Token, or AI API key.

The workflow has `contents: read` permission only and does not push code, create pull requests, or modify repository settings.

## Sitemap freshness rule

For Carrowmont Learn Article pages, the sitemap `lastmod` must match the page's JSON-LD `dateModified` value. This is enforced by central QA.

For calculators, hubs, and other public pages without Article JSON-LD, update `lastmod` only when the public page has materially changed.

## Indexing expectation

IndexNow is a discovery/freshness signal. It does not guarantee that Bing or another participating search engine will crawl, index, or rank a submitted URL. Content quality, crawl priority, internal links, external authority, and search-engine selection criteria still apply.

## Secure workflow bootstrap note

The `carrowmont-indexnow.yml` workflow was installed separately through the protected-branch pull-request process before the rest of BING-SEO1 was published. This is intentional: the `Carrowmont Release Automation` fine-grained token retains the narrower Contents + Pull Requests permissions and is not granted Workflows write permission solely for this feature.

After that one-time bootstrap, ordinary BING-SEO1 and future content releases can update sitemap/key/script/content files through the normal Batch PR Publisher while the pre-installed read-only IndexNow workflow reacts to relevant `main` changes.

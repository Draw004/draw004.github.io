import fs from 'node:fs';

const HOST = process.env.INDEXNOW_HOST || 'carrowmont.com';
const KEY = process.env.INDEXNOW_KEY || '';
const KEY_LOCATION = process.env.INDEXNOW_KEY_LOCATION || (KEY ? `https://${HOST}/${KEY}.txt` : '');
const ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';
const SITEMAP = process.env.INDEXNOW_SITEMAP || 'sitemap.xml';
const TARGET_DATE = process.env.INDEXNOW_TARGET_DATE || new Date().toISOString().slice(0, 10);
const LOOKBACK_DAYS = Number.parseInt(process.env.INDEXNOW_LOOKBACK_DAYS || '1', 10);
const EXPLICIT_URLS = (process.env.INDEXNOW_URLS || '')
  .split(/[\n,]/)
  .map(value => value.trim())
  .filter(Boolean);
const DRY_RUN = /^(1|true|yes)$/i.test(process.env.INDEXNOW_DRY_RUN || '');

function fail(message) {
  console.error(`IndexNow: ${message}`);
  process.exit(1);
}

if (!/^[A-Za-z0-9_-]{8,128}$/.test(KEY)) fail('INDEXNOW_KEY must be 8-128 URL-safe characters.');
if (!Number.isInteger(LOOKBACK_DAYS) || LOOKBACK_DAYS < 0 || LOOKBACK_DAYS > 30) fail('INDEXNOW_LOOKBACK_DAYS must be between 0 and 30.');
if (!/^\d{4}-\d{2}-\d{2}$/.test(TARGET_DATE)) fail('INDEXNOW_TARGET_DATE must be YYYY-MM-DD.');

const allowedPrefix = `https://${HOST}/`;
const validateUrl = url => {
  if (url === `https://${HOST}/`) return url;
  if (!url.startsWith(allowedPrefix)) fail(`URL is outside ${HOST}: ${url}`);
  return url;
};

function recentUrlsFromSitemap() {
  if (!fs.existsSync(SITEMAP)) fail(`Sitemap not found: ${SITEMAP}`);
  const xml = fs.readFileSync(SITEMAP, 'utf8');
  const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>\s*<\/url>/g)]
    .map(match => ({ url: match[1].trim(), lastmod: match[2] }));
  if (!entries.length) fail('No sitemap URL entries with lastmod were found.');

  const target = new Date(`${TARGET_DATE}T00:00:00Z`);
  const cutoff = new Date(target);
  cutoff.setUTCDate(cutoff.getUTCDate() - LOOKBACK_DAYS);
  return entries
    .filter(({ lastmod }) => {
      const d = new Date(`${lastmod}T00:00:00Z`);
      return d >= cutoff && d <= target;
    })
    .map(({ url }) => validateUrl(url));
}

const urls = [...new Set((EXPLICIT_URLS.length ? EXPLICIT_URLS.map(validateUrl) : recentUrlsFromSitemap()))].sort();
if (!urls.length) {
  console.log(`IndexNow: no URLs changed between ${LOOKBACK_DAYS} day(s) before ${TARGET_DATE} and ${TARGET_DATE}. Nothing to submit.`);
  process.exit(0);
}
if (urls.length > 10000) fail(`Refusing to submit ${urls.length} URLs; IndexNow allows at most 10,000 per request.`);

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

console.log(`IndexNow: prepared ${urls.length} URL(s) for ${HOST}.`);
for (const url of urls) console.log(`  ${url}`);

if (DRY_RUN) {
  console.log('IndexNow: dry run only; no network request sent.');
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

let response;
try {
  response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
} catch (error) {
  fail(`network request failed: ${error.message}`);
}

const responseText = await response.text();
console.log(`IndexNow: HTTP ${response.status}${responseText ? ` - ${responseText.slice(0, 500)}` : ''}`);
if (![200, 202].includes(response.status)) process.exit(1);

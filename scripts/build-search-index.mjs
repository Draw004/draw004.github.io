#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const dataDir = path.join(repoRoot, 'data');
const sourcePath = path.join(dataDir, 'carrowmont-search-pages.json');
const aliasesPath = path.join(dataDir, 'carrowmont-search-aliases.json');
const outputPath = path.join(dataDir, 'carrowmont-search-index.json');
const sitemapPath = path.join(repoRoot, 'sitemap.xml');
const checkOnly = process.argv.includes('--check');
const siteRoot = process.env.SEARCH_SITE_ROOT ? path.resolve(process.env.SEARCH_SITE_ROOT) : null;

function fail(message) {
  throw new Error(`SEARCH1 index build failed: ${message}`);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`${path.relative(repoRoot, filePath)} is not valid JSON (${error.message})`);
  }
}

function cleanText(value, field, url) {
  if (typeof value !== 'string') fail(`${url}: ${field} must be a string`);
  const clean = value.replace(/\s+/g, ' ').trim();
  if (!clean) fail(`${url}: ${field} must not be empty`);
  return clean;
}

function cleanStringArray(value, field, url) {
  if (value == null) return [];
  if (!Array.isArray(value)) fail(`${url}: ${field} must be an array`);
  return [...new Set(value.map(item => cleanText(item, field, url)))].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
}

function cleanLocaleAliases(value, url) {
  if (value == null) return undefined;
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`${url}: locale_aliases must be an object`);
  const cleaned = {};
  for (const country of Object.keys(value).sort()) {
    if (!/^[A-Z]{2,5}$/.test(country)) fail(`${url}: invalid locale alias key ${country}`);
    cleaned[country] = cleanStringArray(value[country], `locale_aliases.${country}`, url);
  }
  return cleaned;
}

function sitemapPaths() {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const matches = [...xml.matchAll(/<loc>https:\/\/carrowmont\.com([^<]*)<\/loc>/g)];
  const paths = matches.map(match => match[1] || '/');
  if (!paths.length) fail('sitemap.xml contains no Carrowmont URLs');
  return paths;
}

function sourceFileForPublicUrl(publicUrl) {
  if (!siteRoot) return null;
  const clean = publicUrl.split(/[?#]/)[0];
  if (clean === '/') return path.join(siteRoot, 'draw004.github.io', 'index.html');
  const segments = clean.replace(/^\//, '').split('/');
  const repoNames = new Set([
    'sip-calculator',
    'goal-planner',
    'financial-independence',
    'inflation-calculator',
    'retirement-calculator',
    'budget-cash-flow-planner',
    'mortgage-payoff-calculator',
    'compound-interest-calculator',
    'loan-calculator'
  ]);
  if (repoNames.has(segments[0])) {
    const remainder = segments.slice(1).join('/');
    return path.join(siteRoot, segments[0], remainder || 'index.html');
  }
  return path.join(siteRoot, 'draw004.github.io', clean.replace(/^\//, ''));
}

const source = readJson(sourcePath);
const aliases = readJson(aliasesPath);
if (source.schema_version !== 1 || !Array.isArray(source.entries)) fail('page inventory must use schema_version 1 with an entries array');
if (aliases.schema_version !== 1 || !Array.isArray(aliases.groups)) fail('alias library must use schema_version 1 with a groups array');

const aliasIds = new Set();
for (const group of aliases.groups) {
  const id = cleanText(group.id, 'id', 'alias group');
  if (aliasIds.has(id)) fail(`duplicate alias group id: ${id}`);
  aliasIds.add(id);
  const terms = cleanStringArray(group.terms, 'terms', `alias group ${id}`);
  if (terms.length < 2) fail(`alias group ${id} must contain at least two reviewed terms`);
  if (group.locale_terms != null) cleanLocaleAliases(group.locale_terms, `alias group ${id}`);
}

const allowedTypes = new Set(['tool', 'guide', 'carrowmont']);
const seenUrls = new Set();
const entries = source.entries.map(raw => {
  const url = cleanText(raw.url, 'url', 'entry');
  if (!/^\/(?:[^?#]*)$/.test(url)) fail(`${url}: URL must be a same-origin path without query or fragment`);
  if (seenUrls.has(url)) fail(`duplicate canonical URL: ${url}`);
  seenUrls.add(url);
  if (!allowedTypes.has(raw.type)) fail(`${url}: type must be tool, guide or carrowmont`);
  const priority = Number(raw.priority);
  if (!Number.isInteger(priority) || priority < 0 || priority > 100) fail(`${url}: priority must be an integer from 0 to 100`);
  if (/\.(?:zip|md|json|ya?ml)$/i.test(url) || url.includes('/docs/') || url.includes('/.github/')) fail(`${url}: internal/release URL cannot enter the public search index`);

  const entry = {
    url,
    title: cleanText(raw.title, 'title', url),
    description: cleanText(raw.description, 'description', url),
    type: raw.type,
    category: cleanText(raw.category, 'category', url),
    keywords: cleanStringArray(raw.keywords, 'keywords', url),
    aliases: cleanStringArray(raw.aliases, 'aliases', url),
    priority
  };
  const localeAliases = cleanLocaleAliases(raw.locale_aliases, url);
  if (localeAliases && Object.keys(localeAliases).length) entry.locale_aliases = localeAliases;

  if (siteRoot) {
    const filePath = sourceFileForPublicUrl(url);
    if (!filePath || !fs.existsSync(filePath)) fail(`${url}: staged public file does not exist (${filePath || 'unresolved'})`);
    const html = fs.readFileSync(filePath, 'utf8');
    if (/meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) fail(`${url}: noindex page cannot be a normal search result`);
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const canonical = url === '/' ? 'https://carrowmont.com/' : `https://carrowmont.com${url}`;
    if (!html.includes(`href="${canonical}"`) && !html.includes(`href='${canonical}'`)) fail(`${url}: staged page is missing its expected canonical URL`);
    void escaped;
  }
  return entry;
}).sort((a, b) => a.url.localeCompare(b.url, 'en'));

const sitemap = new Set(sitemapPaths());
for (const entry of entries) {
  if (!sitemap.has(entry.url)) fail(`${entry.url}: indexed public result is missing from sitemap.xml`);
}
for (const sitemapUrl of sitemap) {
  if (!seenUrls.has(sitemapUrl)) fail(`${sitemapUrl}: sitemap URL is missing from the reviewed search inventory`);
}

const output = {
  schema_version: 1,
  generated_at: cleanText(source.reviewed_at, 'reviewed_at', 'page inventory'),
  entries
};
const rendered = `${JSON.stringify(output, null, 2)}\n`;
if (Buffer.byteLength(rendered, 'utf8') > 250 * 1024) fail('generated index exceeds the 250 KB uncompressed V1 target');

if (checkOnly) {
  if (!fs.existsSync(outputPath)) fail('generated index is missing; run scripts/build-search-index.mjs');
  const existing = fs.readFileSync(outputPath, 'utf8');
  if (existing !== rendered) fail('committed search index is stale; rebuild it');
  console.log(`SEARCH1 index check PASS: ${entries.length} entries, ${Buffer.byteLength(rendered, 'utf8')} bytes.`);
} else {
  fs.writeFileSync(outputPath, rendered, 'utf8');
  console.log(`SEARCH1 index built: ${entries.length} entries, ${Buffer.byteLength(rendered, 'utf8')} bytes.`);
}

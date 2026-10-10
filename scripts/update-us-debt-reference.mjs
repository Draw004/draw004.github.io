import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_API_URL = 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page%5Bsize%5D=1';
const DEFAULT_REFERENCE_PATH = 'data/us-debt-reference.json';
const SOURCE_NAME = 'U.S. Treasury FiscalData — Debt to the Penny';
const SOURCE_URL = 'https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/';
const ANOMALY_THRESHOLD = 0.05;

function output(name, value) {
  if (!process.env.GITHUB_OUTPUT) return;
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${String(value)}\n`);
}

function finitePositive(value, label) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) throw new Error(`${label} must be a positive finite number.`);
  return n;
}

function validIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || '')) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

export function validateTreasuryPayload(payload) {
  if (!payload || !Array.isArray(payload.data) || payload.data.length < 1) throw new Error('Treasury response does not contain a data row.');
  const row = payload.data[0];
  const labels = payload.meta?.labels || {};
  if (labels.debt_held_public_amt !== 'Debt Held by the Public' || labels.tot_pub_debt_out_amt !== 'Total Public Debt Outstanding') {
    throw new Error('Treasury response fields do not match the expected Debt to the Penny dataset.');
  }
  if (!validIsoDate(row.record_date)) throw new Error('Treasury record date is invalid.');
  const debtHeldByPublic = finitePositive(row.debt_held_public_amt, 'Debt Held by the Public');
  const totalPublicDebtOutstanding = finitePositive(row.tot_pub_debt_out_amt, 'Total Public Debt Outstanding');
  if (totalPublicDebtOutstanding < debtHeldByPublic) throw new Error('Total Public Debt Outstanding cannot be below Debt Held by the Public.');
  return Object.freeze({
    asOfDate: row.record_date,
    debtHeldByPublic,
    totalPublicDebtOutstanding
  });
}

export function validateStoredReference(reference) {
  if (!reference || reference.schemaVersion !== 1) throw new Error('Stored reference schemaVersion must be 1.');
  if (!validIsoDate(reference.asOfDate)) throw new Error('Stored reference asOfDate is invalid.');
  const debtHeldByPublic = finitePositive(reference.debtHeldByPublic, 'Stored Debt Held by the Public');
  const totalPublicDebtOutstanding = finitePositive(reference.totalPublicDebtOutstanding, 'Stored Total Public Debt Outstanding');
  if (totalPublicDebtOutstanding < debtHeldByPublic) throw new Error('Stored total debt cannot be below stored public debt.');
  return { ...reference, debtHeldByPublic, totalPublicDebtOutstanding };
}

function percentChange(next, current) {
  return current > 0 ? Math.abs(next - current) / current : Infinity;
}

async function loadPayload(apiUrl) {
  if (process.env.TREASURY_PAYLOAD_PATH) {
    return JSON.parse(fs.readFileSync(path.resolve(process.env.TREASURY_PAYLOAD_PATH), 'utf8'));
  }
  const response = await fetch(apiUrl, {
    headers: { 'accept': 'application/json', 'user-agent': 'Carrowmont-US-Debt-Reference-Updater/1.0' }
  });
  if (!response.ok) throw new Error(`Treasury request failed with HTTP ${response.status}.`);
  return response.json();
}

async function main() {
  const referencePath = path.resolve(process.env.REFERENCE_PATH || DEFAULT_REFERENCE_PATH);
  const apiUrl = process.env.TREASURY_API_URL || DEFAULT_API_URL;
  const storedRaw = JSON.parse(fs.readFileSync(referencePath, 'utf8'));
  const stored = validateStoredReference(storedRaw);
  const payload = await loadPayload(apiUrl);
  const next = validateTreasuryPayload(payload);

  output('old_record_date', stored.asOfDate);
  output('old_debt_held_public', stored.debtHeldByPublic);
  output('old_total_public_debt', stored.totalPublicDebtOutstanding);
  output('record_date', next.asOfDate);
  output('debt_held_public', next.debtHeldByPublic);
  output('total_public_debt', next.totalPublicDebtOutstanding);

  if (next.asOfDate <= stored.asOfDate) {
    output('changed', 'false');
    output('anomaly', 'false');
    console.log(`No newer Treasury record. Stored ${stored.asOfDate}; latest ${next.asOfDate}.`);
    return;
  }

  const publicChange = percentChange(next.debtHeldByPublic, stored.debtHeldByPublic);
  const totalChange = percentChange(next.totalPublicDebtOutstanding, stored.totalPublicDebtOutstanding);
  const anomaly = publicChange > ANOMALY_THRESHOLD || totalChange > ANOMALY_THRESHOLD;

  const updated = {
    schemaVersion: 1,
    dataset: 'Debt to the Penny',
    asOfDate: next.asOfDate,
    debtHeldByPublic: next.debtHeldByPublic,
    totalPublicDebtOutstanding: next.totalPublicDebtOutstanding,
    sourceName: SOURCE_NAME,
    sourceUrl: SOURCE_URL,
    apiUrl,
    retrievedAt: new Date().toISOString()
  };

  const serialized = `${JSON.stringify(updated, null, 2)}\n`;
  JSON.parse(serialized);
  const tmp = `${referencePath}.tmp`;
  fs.writeFileSync(tmp, serialized, 'utf8');
  fs.renameSync(tmp, referencePath);

  output('changed', 'true');
  output('anomaly', anomaly ? 'true' : 'false');
  output('public_change_pct', (publicChange * 100).toFixed(4));
  output('total_change_pct', (totalChange * 100).toFixed(4));
  console.log(`Updated ${path.relative(process.cwd(), referencePath)} from ${stored.asOfDate} to ${next.asOfDate}.`);
  if (anomaly) console.log('ANOMALY FLAG: debt changed by more than 5% from the stored reference; manual review is required.');
}

try {
  await main();
} catch (error) {
  output('changed', 'false');
  console.error(`US debt reference update failed: ${error.message}`);
  process.exit(1);
}

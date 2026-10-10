#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const file=path.resolve(process.argv[2]||new URL('../data/silver-market-reference.json',import.meta.url).pathname);
function fail(msg){console.error(`Silver reference validation failed: ${msg}`);process.exit(2);}
function finiteNonNegative(name,v){if(!Number.isFinite(Number(v))||Number(v)<0)fail(`${name} must be finite and non-negative.`);return Number(v);}
function near(a,b,tol=0.25){return Math.abs(Number(a)-Number(b))<=tol;}
let data;
try{data=JSON.parse(fs.readFileSync(file,'utf8'));}catch(err){fail(`could not parse JSON (${err.message}).`);}
if(data.schemaVersion!==1)fail('schemaVersion must be 1.');
if(data.methodologyVersion!=='silver-supply-demand-macro-v1.0')fail('unexpected methodologyVersion.');
if(!Number.isInteger(data.referenceYear)||data.referenceYear<2000||data.referenceYear>2100)fail('referenceYear is invalid.');
if(data.unit!=='million_troy_ounces')fail('unit must be million_troy_ounces.');
if(!data.source?.publisher||!data.source?.title||!/^https:\/\//.test(data.source?.url||''))fail('source metadata is incomplete.');
if(!/completed-year/i.test(data.source?.dataStatus||''))fail('source dataStatus must identify completed-year data.');
const s=data.supply||{},d=data.demand||{};
const mine=finiteNonNegative('mineProductionMoz',s.mineProductionMoz),recycling=finiteNonNegative('recyclingMoz',s.recyclingMoz),otherSupply=finiteNonNegative('otherSupplyMoz',s.otherSupplyMoz);
const supplyTotal=mine+recycling+otherSupply,publishedSupply=finiteNonNegative('publishedTotalSupplyMoz',s.publishedTotalSupplyMoz);
if(!near(supplyTotal,publishedSupply,0.15))fail(`supply categories do not reconcile (${supplyTotal} vs ${publishedSupply}).`);
const demandFields=['industrialMoz','physicalInvestmentMoz','jewelryMoz','silverwareMoz','photographyMoz','otherDemandMoz'];
const demandTotal=demandFields.reduce((sum,k)=>sum+finiteNonNegative(k,d[k]),0),publishedDemand=finiteNonNegative('publishedTotalDemandMoz',d.publishedTotalDemandMoz);
if(!near(demandTotal,publishedDemand,0.15))fail(`demand categories exceed rounding tolerance (${demandTotal} vs ${publishedDemand}).`);
if(!Number.isFinite(Number(data.publishedBalanceMoz)))fail('publishedBalanceMoz must be finite.');
if(!near(publishedSupply-publishedDemand,data.publishedBalanceMoz,0.2))fail('published balance is inconsistent outside documented rounding tolerance.');
if(!Array.isArray(data.limitedHistory)||data.limitedHistory.length<2)fail('limitedHistory must contain at least two years.');
let prev=0;const seen=new Set();
for(const row of data.limitedHistory){if(!Number.isInteger(row.year)||row.year<=prev||seen.has(row.year))fail('history years must be unique and strictly increasing.');seen.add(row.year);prev=row.year;const ts=finiteNonNegative(`history ${row.year} supply`,row.totalSupplyMoz),td=finiteNonNegative(`history ${row.year} demand`,row.totalDemandMoz);if(!Number.isFinite(Number(row.marketBalanceMoz)))fail(`history ${row.year} balance must be finite.`);if(!near(ts-td,row.marketBalanceMoz,0.2))fail(`history ${row.year} balance does not reconcile.`);}
const latest=data.limitedHistory.at(-1);if(latest.year!==data.referenceYear)fail('latest history year must equal referenceYear.');
if(!near(latest.totalSupplyMoz,publishedSupply,0.15)||!near(latest.totalDemandMoz,publishedDemand,0.15))fail('latest history totals must match published reference totals.');
if(!data.secondaryValidation?.url||!Number.isFinite(Number(data.secondaryValidation?.globalMineProduction2025MetricTonnes)))fail('secondary USGS validation metadata is incomplete.');
const usgsMoz=Number(data.secondaryValidation.globalMineProduction2025MetricTonnes)*0.0321507466;
const mineDiff=Math.abs(mine-usgsMoz)/mine;
const warnings=[];
if(mineDiff>0.08)warnings.push(`USGS mine-production cross-check differs by ${(mineDiff*100).toFixed(1)}%.`);
if(Math.abs(Number(data.publishedBalanceMoz))/publishedDemand>0.30)warnings.push('Published balance exceeds 30% of demand; review for an anomaly.');
console.log(JSON.stringify({ok:true,file,referenceYear:data.referenceYear,supplyModelMoz:Number(supplyTotal.toFixed(1)),demandCategorySumMoz:Number(demandTotal.toFixed(1)),publishedDemandMoz:publishedDemand,publishedBalanceMoz:Number(data.publishedBalanceMoz),historyYears:data.limitedHistory.map(x=>x.year),warnings},null,2));

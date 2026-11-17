import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DEFAULT_REFERENCE_PATH = 'data/country-financial-reference.json';
const DEFAULT_RUNTIME_PATH = 'assets/trust/carrowmont-trust.js';
const MAX_ABSOLUTE_RATE_PCT = 25;
const MIN_ABSOLUTE_RATE_PCT = -5;
const MAX_AUTOMATED_MOVE_PP = 2;
const MAX_CHANGED_SOURCE_AGE_DAYS = 120;
const REFERENCE_BEGIN = '/* COUNTRY_REFERENCE_BEGIN */';
const REFERENCE_END = '/* COUNTRY_REFERENCE_END */';

const SOURCES = Object.freeze({
  IN: { name:'Reserve Bank of India', url:'https://www.rbi.org.in/', domain:'rbi.org.in', parser:'rbi' },
  US: { name:'Federal Reserve', url:'https://www.federalreserve.gov/monetarypolicy/openmarket.htm', domain:'federalreserve.gov', parser:'fed' },
  GB: { name:'Bank of England', url:'https://www.bankofengland.co.uk/boeapps/database/Bank-Rate.asp', domain:'bankofengland.co.uk', parser:'boe' },
  CA: { name:'Bank of Canada', url:'https://www.bankofcanada.ca/valet/observations/V39079/json?recent=10', domain:'bankofcanada.ca', parser:'boc' },
  AU: { name:'Reserve Bank of Australia', url:'https://www.rba.gov.au/statistics/cash-rate/', domain:'rba.gov.au', parser:'rba' }
});

const MONTHS = Object.freeze({jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12});

function githubOutput(name,value){
  if(!process.env.GITHUB_OUTPUT)return;
  fs.appendFileSync(process.env.GITHUB_OUTPUT,`${name}=${String(value)}\n`);
}
function pad2(n){return String(n).padStart(2,'0');}
function todayUtc(){
  const forced=String(process.env.COUNTRY_REFERENCE_TODAY||'').trim();
  if(forced){assertIsoDate(forced,'COUNTRY_REFERENCE_TODAY');return forced;}
  return new Date().toISOString().slice(0,10);
}
function assertIsoDate(value,label='date'){
  const s=String(value||'');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(s)||Number.isNaN(Date.parse(`${s}T00:00:00Z`)))throw new Error(`${label} must be a valid YYYY-MM-DD date.`);
  return s;
}
function isoFromParts(year,month,day){
  const y=Number(year),m=Number(month),d=Number(day);
  const iso=`${String(y).padStart(4,'0')}-${pad2(m)}-${pad2(d)}`;
  assertIsoDate(iso,'parsed source date');
  return iso;
}
function parseMonth(value){
  const key=String(value||'').slice(0,4).toLowerCase().replace(/\.$/,'');
  const month=MONTHS[key]||MONTHS[key.slice(0,3)];
  if(!month)throw new Error(`Unknown month ${value}.`);
  return month;
}
function stripHtml(html){
  return String(html||'')
    .replace(/<script\b[\s\S]*?<\/script>/gi,' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi,' ')
    .replace(/<[^>]+>/g,' ')
    .replace(/&nbsp;|&#160;/gi,' ')
    .replace(/&amp;/gi,'&')
    .replace(/&ndash;|&#8211;/gi,'–')
    .replace(/&mdash;|&#8212;/gi,'—')
    .replace(/\s+/g,' ')
    .trim();
}
function finiteRate(value,label){
  const n=Number(value);
  if(!Number.isFinite(n)||n<MIN_ABSOLUTE_RATE_PCT||n>MAX_ABSOLUTE_RATE_PCT)throw new Error(`${label} ${value} is outside the permitted policy-rate range.`);
  return n;
}
function sourceHostAllowed(url,expectedDomain){
  let host='';try{host=new URL(url).hostname.toLowerCase();}catch{throw new Error(`Invalid official source URL: ${url}`);}
  const domain=expectedDomain.toLowerCase();
  if(host!==domain&&!host.endsWith(`.${domain}`))throw new Error(`Source host ${host} is not the expected official domain ${domain}.`);
}
function singleObservation(valuePct,asOf,source){return {kind:'single',valuePct:finiteRate(valuePct,`${source} rate`),asOf:assertIsoDate(asOf,`${source} as-of date`)};}
function rangeObservation(rangeMinPct,rangeMaxPct,asOf,source){
  const lo=finiteRate(rangeMinPct,`${source} lower rate`),hi=finiteRate(rangeMaxPct,`${source} upper rate`);
  if(lo>hi)throw new Error(`${source} target-range lower bound cannot exceed upper bound.`);
  return {kind:'range',rangeMinPct:lo,rangeMaxPct:hi,asOf:assertIsoDate(asOf,`${source} as-of date`)};
}

export function parseRbi(html,checkedDate){
  const text=stripHtml(html);
  const match=/Policy\s*Repo\s*Rate\s*:?\s*(-?\d+(?:\.\d+)?)\s*%/i.exec(text);
  if(!match)throw new Error('RBI current-rates page did not expose the expected Policy Repo Rate field.');
  // RBI's home page does not publish a policy-decision date beside the repo rate.
  // Use the page's own visible "As at" date as a freshness timestamp when available
  // rather than blindly stamping the workflow run date. This prevents a stale/cached
  // RBI page from masquerading as a fresh changed observation.
  const asAt=/As\s+at\s+(?:\d{1,2}(?:[.:]\d{2})?\s*(?:am|pm)\s+of\s+)?(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})/i.exec(text);
  const asOf=asAt?isoFromParts(asAt[3],parseMonth(asAt[1]),asAt[2]):checkedDate;
  return singleObservation(match[1],asOf,'RBI');
}
export function parseFed(html,currentYear){
  const text=stripHtml(html);
  const marker=text.indexOf(String(currentYear));
  if(marker<0)throw new Error(`Federal Reserve open-market page does not contain a ${currentYear} section.`);
  const section=text.slice(marker,marker+5000);
  const m=/(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})\s+\d+(?:\.\d+)?\s+\d+(?:\.\d+)?\s+(-?\d+(?:\.\d+)?)\s*[-–]\s*(-?\d+(?:\.\d+)?)/i.exec(section);
  if(!m)throw new Error('Federal Reserve open-market page did not expose the expected current-year target-range row.');
  return rangeObservation(m[3],m[4],isoFromParts(currentYear,parseMonth(m[1]),m[2]),'Federal Reserve');
}
export function parseBoe(html){
  const text=stripHtml(html);
  const current=/Current\s+official\s+Bank\s+Rate\s+(-?\d+(?:\.\d+)?)\s*%/i.exec(text);
  const row=/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+(\d{2}|\d{4})\s+(-?\d+(?:\.\d+)?)/i.exec(text);
  if(!current||!row)throw new Error('Bank of England page did not expose both the current rate and latest change row.');
  let year=Number(row[3]);if(year<100)year+=2000;
  const value=finiteRate(current[1],'Bank of England current Bank Rate');
  const rowValue=finiteRate(row[4],'Bank of England latest history row');
  if(Math.abs(value-rowValue)>1e-9)throw new Error(`Bank of England current rate ${value} does not match latest history row ${rowValue}.`);
  return singleObservation(value,isoFromParts(year,parseMonth(row[2]),row[1]),'Bank of England');
}
export function parseBoc(payload){
  const rows=Array.isArray(payload?.observations)?payload.observations:[];
  const valid=rows.map(row=>({date:String(row?.d||''),value:Number(row?.V39079?.v)})).filter(row=>/^\d{4}-\d{2}-\d{2}$/.test(row.date)&&Number.isFinite(row.value));
  if(!valid.length)throw new Error('Bank of Canada Valet response did not contain V39079 observations.');
  valid.sort((a,b)=>a.date.localeCompare(b.date));
  const last=valid.at(-1);
  return singleObservation(last.value,last.date,'Bank of Canada');
}
export function parseRba(html){
  const text=stripHtml(html);
  const marker=text.search(/Effective\s+Date\s+Change.*Cash\s+rate\s+target/i);
  const section=marker>=0?text.slice(marker,marker+5000):text;
  const row=/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+(\d{4})\s+[+−-]?\d+(?:\.\d+)?\s+(-?\d+(?:\.\d+)?)/i.exec(section);
  if(!row)throw new Error('RBA cash-rate page did not expose the expected latest decision row.');
  return singleObservation(row[4],isoFromParts(row[3],parseMonth(row[2]),row[1]),'RBA');
}

async function fetchWithTimeout(url,expectJson=false){
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
  try{
    const response=await fetch(url,{signal:controller.signal,headers:{accept:expectJson?'application/json':'text/html,application/xhtml+xml','user-agent':'Carrowmont-Country-Reference-Updater/1.0'}});
    if(!response.ok)throw new Error(`Official source ${url} returned HTTP ${response.status}.`);
    return expectJson?response.json():response.text();
  }finally{clearTimeout(timer);}
}
async function loadLiveObservations(reference,checkedDate){
  const currentYear=Number(checkedDate.slice(0,4));
  const entries=await Promise.all(Object.entries(SOURCES).map(async([code,source])=>{
    sourceHostAllowed(source.url,source.domain);
    if(!reference?.markets?.[code])throw new Error(`Stored country reference is missing ${code}.`);
    const payload=await fetchWithTimeout(source.url,source.parser==='boc');
    let observation;
    if(source.parser==='rbi')observation=parseRbi(payload,checkedDate);
    else if(source.parser==='fed')observation=parseFed(payload,currentYear);
    else if(source.parser==='boe')observation=parseBoe(payload);
    else if(source.parser==='boc')observation=parseBoc(payload);
    else if(source.parser==='rba')observation=parseRba(payload);
    else throw new Error(`Unsupported parser ${source.parser}.`);
    return [code,{...observation,sourceName:source.name,sourceUrl:source.url}];
  }));
  return Object.fromEntries(entries);
}
function loadFixtureObservations(fixturePath){
  const data=JSON.parse(fs.readFileSync(path.resolve(fixturePath),'utf8'));
  const out={};
  for(const code of Object.keys(SOURCES)){
    const item=data?.[code];if(!item)throw new Error(`Fixture missing ${code}.`);
    out[code]=item.kind==='range'?rangeObservation(item.rangeMinPct,item.rangeMaxPct,item.asOf,`fixture ${code}`):singleObservation(item.valuePct,item.asOf,`fixture ${code}`);
    out[code].sourceName=`Fixture ${code}`;out[code].sourceUrl=SOURCES[code].url;
  }
  return out;
}
function storedShape(policy,code){
  if(Number.isFinite(Number(policy?.valuePct)))return singleObservation(policy.valuePct,policy.asOf,`stored ${code}`);
  if(Number.isFinite(Number(policy?.rangeMinPct))&&Number.isFinite(Number(policy?.rangeMaxPct)))return rangeObservation(policy.rangeMinPct,policy.rangeMaxPct,policy.asOf,`stored ${code}`);
  throw new Error(`Stored ${code} policy-rate shape is invalid.`);
}
export function formatSignedPp(value){
  const n=Number(value);if(!Number.isFinite(n))throw new Error('Signed percentage-point change must be finite.');
  if(Math.abs(n)<0.0000005)return '0.00';
  return `${n>0?'+':''}${n.toFixed(2)}`;
}
function displaySingle(value){return `${Number(value).toFixed(2)}%`;}
function displayRange(lo,hi){return `${Number(lo).toFixed(2)}%-${Number(hi).toFixed(2)}%`;}
export function comparePolicy(stored,observed){
  if(stored.kind!==observed.kind)throw new Error(`Policy-rate shape changed from ${stored.kind} to ${observed.kind}; manual review is required.`);
  if(stored.kind==='single'){
    const delta=observed.valuePct-stored.valuePct;
    return {changed:Math.abs(delta)>1e-9,deltaPp:delta,changeText:`${formatSignedPp(delta)} pp`,oldDisplay:displaySingle(stored.valuePct),newDisplay:displaySingle(observed.valuePct)};
  }
  const lowerDelta=observed.rangeMinPct-stored.rangeMinPct,upperDelta=observed.rangeMaxPct-stored.rangeMaxPct;
  return {changed:Math.abs(lowerDelta)>1e-9||Math.abs(upperDelta)>1e-9,lowerDeltaPp:lowerDelta,upperDeltaPp:upperDelta,changeText:`lower ${formatSignedPp(lowerDelta)} pp / upper ${formatSignedPp(upperDelta)} pp`,oldDisplay:displayRange(stored.rangeMinPct,stored.rangeMaxPct),newDisplay:displayRange(observed.rangeMinPct,observed.rangeMaxPct)};
}
function daysBetween(a,b){return Math.floor((Date.parse(`${b}T00:00:00Z`)-Date.parse(`${a}T00:00:00Z`))/86400000);}
function validateChangedFreshness(stored,observed,checkedDate,comparison,code){
  if(!comparison.changed)return;
  const futureDays=daysBetween(checkedDate,observed.asOf);
  if(futureDays>1)throw new Error(`${code} source date ${observed.asOf} is unexpectedly in the future relative to ${checkedDate}.`);
  if(observed.asOf<stored.asOf)throw new Error(`${code} proposed changed rate is dated ${observed.asOf}, older than stored ${stored.asOf}; update blocked.`);
  const age=daysBetween(observed.asOf,checkedDate);
  if(age>MAX_CHANGED_SOURCE_AGE_DAYS)throw new Error(`${code} changed rate source is ${age} days old; automated update blocked for manual review.`);
  const moves=stored.kind==='single'?[comparison.deltaPp]:[comparison.lowerDeltaPp,comparison.upperDeltaPp];
  if(moves.some(v=>Math.abs(v)>MAX_AUTOMATED_MOVE_PP))throw new Error(`${code} policy-rate move exceeds ${MAX_AUTOMATED_MOVE_PP.toFixed(2)} percentage points; automated update blocked for manual review.`);
}
function applyObservedPolicy(policy,observed){
  const next={...policy,asOf:observed.asOf};
  if(observed.kind==='single'){
    next.valuePct=observed.valuePct;delete next.rangeMinPct;delete next.rangeMaxPct;next.display=displaySingle(observed.valuePct);
  }else{
    next.rangeMinPct=observed.rangeMinPct;next.rangeMaxPct=observed.rangeMaxPct;delete next.valuePct;next.display=displayRange(observed.rangeMinPct,observed.rangeMaxPct);
  }
  return next;
}
export function applyObservations(reference,observations,checkedDate){
  if(reference?.schemaVersion!==1||!reference?.markets)throw new Error('Country financial reference schema is invalid.');
  const next=JSON.parse(JSON.stringify(reference));const changes=[];
  for(const code of Object.keys(SOURCES)){
    const stored=storedShape(reference.markets[code]?.policyRate,code),observed=observations[code];
    if(!observed)throw new Error(`Missing observation for ${code}.`);
    const comparison=comparePolicy(stored,observed);
    validateChangedFreshness(stored,observed,checkedDate,comparison,code);
    if(!comparison.changed)continue;
    next.markets[code].policyRate=applyObservedPolicy(reference.markets[code].policyRate,observed);
    changes.push({code,country:reference.markets[code].country,centralBank:reference.markets[code].centralBank,oldDisplay:comparison.oldDisplay,newDisplay:comparison.newDisplay,changeText:comparison.changeText,oldAsOf:stored.asOf,newAsOf:observed.asOf,sourceName:observed.sourceName||SOURCES[code].name,sourceUrl:observed.sourceUrl||SOURCES[code].url});
  }
  if(changes.length){next.version=checkedDate;next.reviewedAt=checkedDate;}
  return {next,changes};
}
export function replaceEmbeddedReference(runtimeText,reference){
  const start=runtimeText.indexOf(REFERENCE_BEGIN),end=runtimeText.indexOf(REFERENCE_END);
  if(start<0||end<0||end<=start)throw new Error('Country-reference runtime markers are missing or malformed.');
  const replacement=`${REFERENCE_BEGIN}\n  const REFERENCE=${JSON.stringify(reference)};\n  ${REFERENCE_END}`;
  return `${runtimeText.slice(0,start)}${replacement}${runtimeText.slice(end+REFERENCE_END.length)}`;
}
export function extractEmbeddedReference(runtimeText){
  const start=runtimeText.indexOf(REFERENCE_BEGIN),end=runtimeText.indexOf(REFERENCE_END);
  if(start<0||end<0||end<=start)throw new Error('Country-reference runtime markers are missing or malformed.');
  const block=runtimeText.slice(start+REFERENCE_BEGIN.length,end);
  const m=/const\s+REFERENCE\s*=\s*([\s\S]*?)\s*;\s*$/.exec(block.trim());
  if(!m)throw new Error('Embedded country-reference JSON could not be extracted.');
  return JSON.parse(m[1]);
}
function writeSynchronizedFiles(referencePath,runtimePath,nextReference,nextRuntime){
  const refOriginal=fs.readFileSync(referencePath,'utf8'),runtimeOriginal=fs.readFileSync(runtimePath,'utf8');
  const refTmp=`${referencePath}.tmp`,runtimeTmp=`${runtimePath}.tmp`;
  fs.writeFileSync(refTmp,`${JSON.stringify(nextReference,null,2)}\n`,'utf8');
  fs.writeFileSync(runtimeTmp,nextRuntime,'utf8');
  try{
    fs.renameSync(runtimeTmp,runtimePath);
    fs.renameSync(refTmp,referencePath);
  }catch(error){
    try{fs.writeFileSync(referencePath,refOriginal,'utf8');}catch{}
    try{fs.writeFileSync(runtimePath,runtimeOriginal,'utf8');}catch{}
    try{if(fs.existsSync(refTmp))fs.unlinkSync(refTmp);}catch{}
    try{if(fs.existsSync(runtimeTmp))fs.unlinkSync(runtimeTmp);}catch{}
    throw error;
  }
}
async function main(){
  const referencePath=path.resolve(process.env.REFERENCE_PATH||DEFAULT_REFERENCE_PATH);
  const runtimePath=path.resolve(process.env.RUNTIME_PATH||DEFAULT_RUNTIME_PATH);
  const checkedDate=todayUtc();
  const reference=JSON.parse(fs.readFileSync(referencePath,'utf8'));
  const runtime=fs.readFileSync(runtimePath,'utf8');
  const embedded=extractEmbeddedReference(runtime);
  if(JSON.stringify(embedded)!==JSON.stringify(reference))throw new Error('Canonical country reference and embedded runtime reference are out of sync before update; update blocked.');
  const fixture=String(process.env.COUNTRY_REFERENCE_FIXTURE_PATH||'').trim();
  const observations=fixture?loadFixtureObservations(fixture):await loadLiveObservations(reference,checkedDate);
  const {next,changes}=applyObservations(reference,observations,checkedDate);
  const result={ok:true,changed:changes.length>0,checkedDate,changeCount:changes.length,changes,inflationFrameworksPreserved:Object.keys(SOURCES).every(code=>JSON.stringify(next.markets[code].inflationReference)===JSON.stringify(reference.markets[code].inflationReference)),signConvention:'proposed minus stored; positive means rate increase; negative means rate decrease; changes shown in percentage points'};
  if(changes.length){
    const nextRuntime=replaceEmbeddedReference(runtime,next);
    const extracted=extractEmbeddedReference(nextRuntime);
    if(JSON.stringify(extracted)!==JSON.stringify(next))throw new Error('Post-update embedded country reference does not exactly match canonical JSON.');
    writeSynchronizedFiles(referencePath,runtimePath,next,nextRuntime);
  }
  githubOutput('changed',changes.length?'true':'false');
  githubOutput('change_count',changes.length);
  githubOutput('checked_date',checkedDate);
  console.log(JSON.stringify(result,null,2));
}

const invokedPath=process.argv[1]?pathToFileURL(path.resolve(process.argv[1])).href:'';
if(invokedPath===import.meta.url){
  try{await main();}catch(error){githubOutput('changed','false');console.error(JSON.stringify({ok:false,changed:false,error:String(error?.message||error)},null,2));process.exitCode=1;}
}

export { SOURCES, MAX_AUTOMATED_MOVE_PP, MAX_CHANGED_SOURCE_AGE_DAYS };

(function(root){
  'use strict';
  if(root.CarrowmontTrust)return;
  const VERSION='carrowmont-trust-v1.0';
  const qsa=(selector,scope=document)=>Array.from(scope.querySelectorAll(selector));
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const clean=value=>String(value??'').replace(/\s+/g,' ').trim();
  const nowLabel=()=>{try{return new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(new Date());}catch(_){return 'this session';}};
  function ensureCss(){if(document.querySelector('link[data-cm-trust-style]'))return;const link=document.createElement('link');link.rel='stylesheet';link.href='/assets/trust/carrowmont-trust.css?v=20261116-fre9';link.dataset.cmTrustStyle='1';document.head.appendChild(link);}
  function labelFor(el){
    if(!el)return'';
    const byFor=el.id?document.querySelector(`label[for="${CSS.escape(el.id)}"]`):null;
    const wrap=el.closest('label');
    const node=byFor||wrap;
    if(node){const clone=node.cloneNode(true);clone.querySelectorAll('input,select,textarea,button,small').forEach(x=>x.remove());const text=clean(clone.textContent);if(text)return text;}
    return clean(el.getAttribute('aria-label')||el.name||el.id||'Value');
  }
  function displayValue(el){
    if(el.tagName==='SELECT')return clean(el.selectedOptions?.[0]?.textContent||el.value);
    if(el.type==='checkbox')return el.checked?'Yes':'No';
    if(el.type==='radio')return el.checked?clean(el.closest('label')?.textContent||el.value):'';
    const value=clean(el.value);if(!value)return'';
    const parent=el.parentElement;let suffix='';
    if(parent){const parts=qsa('span',parent).map(x=>clean(x.textContent)).filter(Boolean);suffix=parts.find(x=>x!==value&&x.length<=20)||'';}
    return suffix&&el.type==='number'?`${value} ${suffix}`:value;
  }
  function isRelevant(el){
    if(!el||el.disabled||el.type==='hidden'||['button','submit','reset','file'].includes(el.type))return false;
    if(el.type==='radio'&&!el.checked)return false;
    if(el.closest('[hidden],dialog:not([open]),.report-print,.no-print-only-hidden'))return false;
    return Boolean(displayValue(el));
  }
  function inputs(){
    const all=qsa('main input,main select,main textarea').filter(isRelevant);
    const seen=new Set();const rows=[];
    for(const el of all){const label=labelFor(el),value=displayValue(el);if(!label||!value)continue;const key=`${label}|${value}`;if(seen.has(key))continue;seen.add(key);rows.push({el,label,value});if(rows.length>=18)break;}
    return rows;
  }
  function isAssumption(row){
    const text=clean(`${row.label} ${row.el.closest('label,.field,.input-card,.car-field,.stress-field')?.textContent||''}`).toLowerCase();
    return /assumption|expected annual|expected return|inflation|price-growth|growth assumption|return assumption|step-up|withdrawal rate|future return|salary growth|income growth/.test(text);
  }
  function mountPoint(){return document.querySelector('#methodology,.methodology,.explain-section,.car-method,#how-it-works,.how')||document.querySelector('footer');}
  function render(){
    ensureCss();let host=document.getElementById('cmTrustContractTool');
    if(!host){host=document.createElement('details');host.id='cmTrustContractTool';host.className='cm-trust-contract';const anchor=mountPoint();if(anchor?.parentNode)anchor.parentNode.insertBefore(host,anchor);else(document.querySelector('main')||document.body).appendChild(host);}
    const rows=inputs();if(!rows.length){host.hidden=true;return host;}host.hidden=false;
    const assumptions=rows.filter(isAssumption);const important=(assumptions.length?assumptions:rows).slice(0,5);
    const values=rows.slice(0,12).map(row=>`<li><b>${esc(row.label)}:</b> ${esc(row.value)}</li>`).join('');
    const assumptionHtml=assumptions.length?`<ul>${assumptions.slice(0,8).map(row=>`<li><b>${esc(row.label)}:</b> ${esc(row.value)}</li>`).join('')}</ul>`:'<p>No separate forecast-style assumption is marked in the current inputs. Contractual amounts and rates remain values you entered.</p>';
    const changeText=important.map(row=>row.label).join(', ');
    host.innerHTML=`<summary><span><span class="cm-trust-contract-kicker">Carrowmont Trust Check</span><span class="cm-trust-contract-title">Why this result? See the values, assumptions and boundaries.</span><span class="cm-trust-contract-sub">Open only when you want to verify the calculation context.</span></span></summary><div class="cm-trust-contract-body"><div class="cm-trust-grid"><div class="cm-trust-item"><strong>Why am I seeing this?</strong><p>This is an illustrative result from this tool's tested calculation logic using the values currently entered on this page. It is not a separate AI calculation.</p></div><div class="cm-trust-item"><strong>What numbers were used?</strong><ul class="cm-trust-value-list">${values}</ul></div><div class="cm-trust-item"><strong>Which values are assumptions?</strong>${assumptionHtml}</div><div class="cm-trust-item"><strong>When was this updated?</strong><p>These are the current page values as of ${esc(nowLabel())}. If you change an input, recalculate where the tool has a Calculate button.</p></div><div class="cm-trust-item"><strong>What could change the result?</strong><p>Changing the entered amounts, dates or rates can change the outcome${changeText?`, especially ${esc(changeText)}`:''}. Actual real-world outcomes may also differ.</p></div><div class="cm-trust-item"><strong>What gets saved?</strong><p>This what-if stays separate from My Carrowmont. It becomes account data only when you explicitly choose Save to My Carrowmont or update an existing saved plan.</p></div></div><p class="cm-trust-note">Carrowmont shows calculations and scenarios for planning and education. Methodology and limitations remain available below where this tool provides them.</p></div>`;
    return host;
  }
  let timer=null;function schedule(){clearTimeout(timer);timer=setTimeout(render,80);}
  function attachTool(){render();document.addEventListener('input',schedule,{passive:true});document.addEventListener('change',schedule,{passive:true});document.addEventListener('click',event=>{if(event.target.closest('button'))setTimeout(schedule,120);});return true;}
  root.CarrowmontTrust=Object.freeze({VERSION,attachTool,refresh:render});
  if(document.currentScript?.dataset?.cmTrustAuto!==undefined){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attachTool,{once:true});else setTimeout(attachTool,0);}
})(window);

(function(root){
  'use strict';
  const current=document.currentScript;
  const wantsAuto=Boolean(current?.dataset?.cmCountryContextAuto!==undefined);
  if(root.CarrowmontCountryIntelligence){
    if(wantsAuto){
      const run=()=>root.CarrowmontCountryIntelligence?.attach?.();
      if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else setTimeout(run,0);
    }
    return;
  }
  const VERSION='carrowmont-country-intelligence-v1.1-trust-runtime';
  /* COUNTRY_REFERENCE_BEGIN */
  const REFERENCE={"schemaVersion":1,"version":"2026-11-17","reviewedAt":"2026-11-17","scope":"Verified official monetary-policy reference points for selected Carrowmont markets. Country profiles may share a monetary-policy jurisdiction (for example France and Italy use the ECB/Euro Area reference). These references never replace user-entered calculator assumptions or lender/product-specific rates.","markets":{"IN":{"country":"India","centralBank":"Reserve Bank of India","policyRate":{"label":"Policy repo rate","display":"5.50%","valuePct":5.5,"asOf":"2026-11-16","sourceTitle":"Reserve Bank of India - Current Rates","sourceUrl":"https://www.rbi.org.in/"},"inflationReference":{"label":"CPI inflation target","display":"4% target; 2%-6% tolerance band","targetPct":4,"rangeMinPct":2,"rangeMaxPct":6,"effectiveFrom":"2026-04-01","effectiveTo":"2031-03-31","sourceTitle":"Reserve Bank of India - Second review of the flexible inflation targeting framework","sourceUrl":"https://www.rbi.org.in/scripts/AnnualReportPublications.aspx?Id=1463"},"monetaryPolicyJurisdiction":"IN"},"US":{"country":"United States","centralBank":"Federal Reserve","policyRate":{"label":"Federal funds target range","display":"3.75%-4.00%","rangeMinPct":3.75,"rangeMaxPct":4,"asOf":"2026-10-29","sourceTitle":"Federal Reserve - Economy at a Glance: Policy Rate","sourceUrl":"https://www.federalreserve.gov/economy-at-a-glance-policy-rate.htm"},"inflationReference":{"label":"Longer-run PCE inflation goal","display":"2%","targetPct":2,"effectiveFrom":"2026-01-27","sourceTitle":"Federal Reserve - Statement on Longer-Run Goals and Monetary Policy Strategy","sourceUrl":"https://www.federalreserve.gov/monetarypolicy/files/FOMC_LongerRunGoals.pdf"},"monetaryPolicyJurisdiction":"US"},"GB":{"country":"United Kingdom","centralBank":"Bank of England","policyRate":{"label":"Bank Rate","display":"4.00%","valuePct":4,"asOf":"2026-11-05","sourceTitle":"Bank of England - Latest Bank Rate decision","sourceUrl":"https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate"},"inflationReference":{"label":"CPI inflation target","display":"2%","targetPct":2,"sourceTitle":"Bank of England - Inflation target and Bank Rate","sourceUrl":"https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate"},"monetaryPolicyJurisdiction":"GB"},"CA":{"country":"Canada","centralBank":"Bank of Canada","policyRate":{"label":"Target for the overnight rate","display":"2.50%","valuePct":2.5,"asOf":"2026-10-28","sourceTitle":"Bank of Canada - Policy interest rate","sourceUrl":"https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/"},"inflationReference":{"label":"CPI inflation-control target","display":"2% target; 1%-3% control range","targetPct":2,"rangeMinPct":1,"rangeMaxPct":3,"sourceTitle":"Bank of Canada - Inflation","sourceUrl":"https://www.bankofcanada.ca/core-functions/monetary-policy/inflation/"},"monetaryPolicyJurisdiction":"CA"},"AU":{"country":"Australia","centralBank":"Reserve Bank of Australia","policyRate":{"label":"Cash rate target","display":"4.85%","valuePct":4.85,"asOf":"2026-11-04","sourceTitle":"Reserve Bank of Australia - Cash Rate Target Overview","sourceUrl":"https://www.rba.gov.au/cash-rate-target-overview.html"},"inflationReference":{"label":"CPI inflation target","display":"2%-3%","rangeMinPct":2,"rangeMaxPct":3,"sourceTitle":"Reserve Bank of Australia - Australia's Inflation Target","sourceUrl":"https://www.rba.gov.au/education/resources/explainers/australias-inflation-target.html"},"monetaryPolicyJurisdiction":"AU"},"JP":{"country":"Japan","centralBank":"Bank of Japan","monetaryPolicyJurisdiction":"JP","policyRate":{"label":"Uncollateralized overnight call rate guideline (around)","display":"1.25%","valuePct":1.25,"asOf":"2026-09-24","sourceTitle":"Bank of Japan - Market Operations and policy guideline","sourceUrl":"https://www.boj.or.jp/en/"},"inflationReference":{"label":"CPI price stability target","display":"2%","targetPct":2,"sourceTitle":"Bank of Japan - Price Stability Target of 2 Percent","sourceUrl":"https://www.boj.or.jp/en/mopo/outline/target.htm"}},"KR":{"country":"South Korea","centralBank":"Bank of Korea","monetaryPolicyJurisdiction":"KR","policyRate":{"label":"Bank of Korea Base Rate","display":"3.00%","valuePct":3.0,"asOf":"2026-08-27","sourceTitle":"Bank of Korea - Base Rate history","sourceUrl":"https://www.bok.or.kr/portal/singl/baseRate/list.do?menuNo=200656"},"inflationReference":{"label":"CPI inflation target","display":"2%","targetPct":2,"sourceTitle":"Bank of Korea - Inflation Targeting","sourceUrl":"https://www.bok.or.kr/eng/main/contents.do?menuNo=400015"}},"FR":{"country":"France","centralBank":"European Central Bank (Eurosystem)","monetaryPolicyJurisdiction":"EA","policyRate":{"label":"ECB deposit facility rate","display":"2.50%","valuePct":2.5,"asOf":"2026-09-16","sourceTitle":"European Central Bank - Key ECB interest rates","sourceUrl":"https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html"},"inflationReference":{"label":"HICP inflation target","display":"2% over the medium term","targetPct":2,"sourceTitle":"European Central Bank - Two per cent inflation target","sourceUrl":"https://www.ecb.europa.eu/mopo/strategy/pricestab/html/index.en.html"}},"IT":{"country":"Italy","centralBank":"European Central Bank (Eurosystem)","monetaryPolicyJurisdiction":"EA","policyRate":{"label":"ECB deposit facility rate","display":"2.50%","valuePct":2.5,"asOf":"2026-09-16","sourceTitle":"European Central Bank - Key ECB interest rates","sourceUrl":"https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html"},"inflationReference":{"label":"HICP inflation target","display":"2% over the medium term","targetPct":2,"sourceTitle":"European Central Bank - Two per cent inflation target","sourceUrl":"https://www.ecb.europa.eu/mopo/strategy/pricestab/html/index.en.html"}}}};
  /* COUNTRY_REFERENCE_END */
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  let attached=false;
  function ensureCss(){
    if(document.querySelector('link[data-cm-country-style]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='/assets/trust/carrowmont-trust.css?v=20261117-fre10b';
    link.dataset.cmCountryStyle='1';
    document.head.appendChild(link);
  }
  function loadReference(){return Promise.resolve(REFERENCE);}
  function dateLabel(value){
    const raw=String(value||'');
    const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
    const date=match?new Date(Number(match[1]),Number(match[2])-1,Number(match[3])):new Date(raw);
    if(!Number.isFinite(date.getTime()))return 'date not supplied';
    try{return new Intl.DateTimeFormat(undefined,{day:'numeric',month:'short',year:'numeric'}).format(date);}catch(_){return raw;}
  }
  function inferRole(){
    const path=(location.pathname||'').toLowerCase();
    if(path.includes('inflation-calculator'))return'inflation';
    if(/mortgage|home-affordability|loan-calculator|debt-to-income|car-affordability|rent-vs-buy|refinance/.test(path))return'borrowing';
    if(/budget-cash-flow|emergency-fund/.test(path))return'cash-flow';
    if(/retirement|financial-independence|goal-planner|sip-calculator|compound-interest|investment/.test(path))return'planning';
    return'general';
  }
  function roleCopy(role,country){
    if(role==='borrowing')return`The central-bank policy rate helps describe the wider interest-rate environment in ${country}, but it is not your lender's mortgage, home-loan, card or personal-loan rate. Keep using the actual rate you want to model.`;
    if(role==='inflation')return`The official inflation target is a policy objective, not today's inflation and not a forecast. This calculator continues to use the inflation rate you enter.`;
    if(role==='cash-flow')return`Inflation and policy rates can affect household costs and borrowing conditions, but this planner continues to use the income, spending and debt amounts you enter.`;
    if(role==='planning')return`The official inflation target can be a useful benchmark when you sanity-check a long-term assumption, but it is not a forecast. Your entered return, inflation and contribution assumptions remain in control.`;
    return`These official reference points describe part of the current financial-policy backdrop in ${country}. They are context only and do not replace the values you enter.`;
  }
  function mountPoint(){return document.querySelector('#cmTrustContractTool')||document.querySelector('#methodology,.methodology,#how-it-works,.how,.explain-section,.car-method')||document.querySelector('footer');}
  function sourceLink(item){if(!item?.sourceUrl)return'';return`<a href="${esc(item.sourceUrl)}" target="_blank" rel="noopener">${esc(item.sourceTitle||'Official source')}</a>`;}
  function renderReference(data){
    const L=root.CarrowmontLocale;if(!L)return null;
    const region=L.getRegion?.()||'';const market=data?.markets?.[region];
    let host=document.getElementById('cmCountryContext');
    if(!market){if(host)host.hidden=true;return host;}
    ensureCss();
    if(!host){host=document.createElement('details');host.id='cmCountryContext';host.className='cm-country-context';const anchor=mountPoint();if(anchor?.parentNode)anchor.parentNode.insertBefore(host,anchor);else(document.querySelector('main')||document.body).appendChild(host);}
    host.hidden=false;host.dataset.cmCountryRegion=region;
    const policy=market.policyRate||{};const inflation=market.inflationReference||{};
    const policyAsOf=policy.asOf?`As of ${dateLabel(policy.asOf)}`:'Official reference';
    const inflationPeriod=inflation.effectiveTo?`Framework through ${dateLabel(inflation.effectiveTo)}`:'Official policy objective';
    host.innerHTML=`<summary><span><span class="cm-country-kicker">Country context</span><span class="cm-country-title">Official reference points for ${esc(market.country)}</span><span class="cm-country-sub">Useful context from ${esc(market.centralBank)}. These values do not change your calculation.</span></span></summary><div class="cm-country-body"><div class="cm-country-grid"><article><strong>${esc(policy.label||'Policy rate')}</strong><b>${esc(policy.display||'Not available')}</b><small>${esc(policyAsOf)}</small><span>${sourceLink(policy)}</span></article><article><strong>${esc(inflation.label||'Inflation target')}</strong><b>${esc(inflation.display||'Not available')}</b><small>${esc(inflationPeriod)}</small><span>${sourceLink(inflation)}</span></article></div><div class="cm-country-why"><strong>Why this matters here</strong><p>${esc(roleCopy(inferRole(),market.country))}</p></div><p class="cm-country-boundary"><strong>Carrowmont boundary:</strong> official country references are shown for context only. Carrowmont does not automatically replace an entered interest rate, inflation assumption, return assumption, contribution, target or saved plan. Product-specific rates, taxes, eligibility rules and lender terms can differ.</p><p class="cm-country-reviewed">Reference set reviewed ${esc(dateLabel(data.reviewedAt))}. If a source is newer, the official source takes precedence.</p></div>`;
    return host;
  }
  function render(){return loadReference().then(renderReference).catch(()=>{const host=document.getElementById('cmCountryContext');if(host)host.hidden=true;return null;});}
  function attach(){ensureCss();render();if(!attached){root.addEventListener('carrowmont:localechange',render);attached=true;}return true;}
  async function getReference(region){return REFERENCE?.markets?.[region]||null;}
  root.CarrowmontCountryIntelligence=Object.freeze({VERSION,loadReference,getReference,render,attach});
  if(wantsAuto){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attach,{once:true});else setTimeout(attach,0);}
})(window);

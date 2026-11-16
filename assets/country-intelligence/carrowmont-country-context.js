(function(root){
  'use strict';
  if(root.CarrowmontCountryIntelligence)return;
  const VERSION='carrowmont-country-intelligence-v1.0';
  const DATA_URL='/data/country-financial-reference.json?v=20261117-fre10';
  let dataPromise=null;
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function ensureCss(){
    if(document.querySelector('link[data-cm-country-style]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='/assets/country-intelligence/carrowmont-country-context.css?v=20261117-fre10';
    link.dataset.cmCountryStyle='1';
    document.head.appendChild(link);
  }
  function loadReference(){
    if(!dataPromise){
      dataPromise=fetch(DATA_URL,{cache:'no-store'}).then(response=>{
        if(!response.ok)throw new Error(`Country reference unavailable (${response.status})`);
        return response.json();
      });
    }
    return dataPromise;
  }
  function dateLabel(value){
    const raw=String(value||'');
    const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
    const date=match?new Date(Number(match[1]),Number(match[2])-1,Number(match[3])):new Date(raw);
    if(!Number.isFinite(date.getTime()))return 'date not supplied';
    try{return new Intl.DateTimeFormat(undefined,{day:'numeric',month:'short',year:'numeric'}).format(date);}
    catch(_){return raw;}
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
  function mountPoint(){
    return document.querySelector('#cmTrustContractTool')||
      document.querySelector('#methodology,.methodology,#how-it-works,.how,.explain-section,.car-method')||
      document.querySelector('footer');
  }
  function sourceLink(item){
    if(!item?.sourceUrl)return'';
    return`<a href="${esc(item.sourceUrl)}" target="_blank" rel="noopener">${esc(item.sourceTitle||'Official source')}</a>`;
  }
  function renderReference(data){
    const L=root.CarrowmontLocale;
    if(!L)return null;
    const region=L.getRegion?.()||'';
    const market=data?.markets?.[region];
    let host=document.getElementById('cmCountryContext');
    if(!market){if(host)host.hidden=true;return host;}
    ensureCss();
    if(!host){
      host=document.createElement('details');
      host.id='cmCountryContext';
      host.className='cm-country-context';
      const anchor=mountPoint();
      if(anchor?.parentNode)anchor.parentNode.insertBefore(host,anchor);
      else(document.querySelector('main')||document.body).appendChild(host);
    }
    host.hidden=false;
    host.dataset.cmCountryRegion=region;
    const policy=market.policyRate||{};
    const inflation=market.inflationReference||{};
    const policyAsOf=policy.asOf?`As of ${dateLabel(policy.asOf)}`:'Official reference';
    const inflationPeriod=inflation.effectiveTo?`Framework through ${dateLabel(inflation.effectiveTo)}`:'Official policy objective';
    host.innerHTML=`<summary><span><span class="cm-country-kicker">Country context</span><span class="cm-country-title">Official reference points for ${esc(market.country)}</span><span class="cm-country-sub">Useful context from ${esc(market.centralBank)}. These values do not change your calculation.</span></span></summary><div class="cm-country-body"><div class="cm-country-grid"><article><strong>${esc(policy.label||'Policy rate')}</strong><b>${esc(policy.display||'Not available')}</b><small>${esc(policyAsOf)}</small><span>${sourceLink(policy)}</span></article><article><strong>${esc(inflation.label||'Inflation target')}</strong><b>${esc(inflation.display||'Not available')}</b><small>${esc(inflationPeriod)}</small><span>${sourceLink(inflation)}</span></article></div><div class="cm-country-why"><strong>Why this matters here</strong><p>${esc(roleCopy(inferRole(),market.country))}</p></div><p class="cm-country-boundary"><strong>Carrowmont boundary:</strong> official country references are shown for context only. Carrowmont does not automatically replace an entered interest rate, inflation assumption, return assumption, contribution, target or saved plan. Product-specific rates, taxes, eligibility rules and lender terms can differ.</p><p class="cm-country-reviewed">Reference set reviewed ${esc(dateLabel(data.reviewedAt))}. If a source is newer, the official source takes precedence.</p></div>`;
    return host;
  }
  function render(){return loadReference().then(renderReference).catch(()=>{const host=document.getElementById('cmCountryContext');if(host)host.hidden=true;return null;});}
  function attach(){
    ensureCss();
    render();
    window.addEventListener('carrowmont:localechange',render);
    return true;
  }
  async function getReference(region){const data=await loadReference();return data?.markets?.[region]||null;}
  root.CarrowmontCountryIntelligence=Object.freeze({VERSION,DATA_URL,loadReference,getReference,render,attach});
  if(document.currentScript?.dataset?.cmCountryContextAuto!==undefined){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attach,{once:true});
    else setTimeout(attach,0);
  }
})(window);

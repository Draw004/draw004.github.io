(function(){
  'use strict';
  const C=window.CarrowmontMarketChainCore;
  const $=id=>document.getElementById(id);
  let eventsData,relationsData,sourcesData,lastResult;
  const els={event:$('mcrEvent'),cause:$('mcrCause'),target:$('mcrTarget'),explain:$('mcrExplain'),verdict:$('mcrVerdict'),type:$('mcrType'),answer:$('mcrAnswer'),chain:$('mcrChain'),support:$('mcrSupport'),headwinds:$('mcrHeadwinds'),breaker:$('mcrBreaker'),different:$('mcrDifferent'),historical:$('mcrHistorical'),sources:$('mcrSources'),warning:$('mcrScenarioWarning'),status:$('mcrStatus'),copy:$('mcrCopy'),share:$('mcrShare')};
  function option(value,label){const o=document.createElement('option');o.value=value;o.textContent=label;return o;}
  function eventById(id){return (eventsData.events||[]).find(x=>x.id===id);}
  function targetById(id){return (eventsData.targets||[]).find(x=>x.id===id);}
  function fillEvents(){els.event.innerHTML='';eventsData.events.forEach(e=>els.event.appendChild(option(e.id,e.label)));}
  function fillCauses(event,preferred){els.cause.innerHTML='';(event.causes||[]).forEach(c=>els.cause.appendChild(option(c.id,c.label)));const allowed=(event.causes||[]).some(c=>c.id===preferred);els.cause.value=allowed?preferred:(event.defaultCause||(event.causes[0]&&event.causes[0].id));}
  function fillTargets(event,preferred){els.target.innerHTML='';(event.targets||[]).forEach(id=>{const t=targetById(id);if(t)els.target.appendChild(option(t.id,t.label));});els.target.value=(event.targets||[]).includes(preferred)?preferred:(event.targets||[])[0];}
  function state(){return {eventId:els.event.value,causeId:els.cause.value,targetId:els.target.value};}
  function badgeClass(verdict){if(/supportive/i.test(verdict))return 'mcr-positive';if(/headwind/i.test(verdict))return 'mcr-negative';if(/mechanical/i.test(verdict))return 'mcr-mechanical';return 'mcr-mixed';}
  function listInto(el,items,empty){el.innerHTML='';if(!items||!items.length){const li=document.createElement('li');li.textContent=empty;el.appendChild(li);return;}items.forEach(x=>{const li=document.createElement('li');li.textContent=x;el.appendChild(li);});}
  function renderChain(steps){els.chain.innerHTML='';steps.forEach((s,i)=>{const node=document.createElement('div');node.className='mcr-chain-node';node.innerHTML=`<span>${i+1}</span><strong>${escapeHtml(s)}</strong>`;els.chain.appendChild(node);if(i<steps.length-1){const arrow=document.createElement('span');arrow.className='mcr-chain-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='→';els.chain.appendChild(arrow);}});}
  function renderSources(result){els.sources.innerHTML='';result.sources.forEach((s,i)=>{const li=document.createElement('li');const a=document.createElement('a');a.href=s.url;a.target='_blank';a.rel='noopener';a.textContent=`${s.publisher}: ${s.title}`;li.appendChild(a);const small=document.createElement('small');small.textContent=`${s.sourceType}${s.published?' · '+s.published:''} · reviewed ${s.reviewedDate}`;li.appendChild(small);els.sources.appendChild(li);});}
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
  function resultText(r){return [
    'Carrowmont Market Chain Reaction Explorer',
    `What changed: ${r.event.label}`,
    `Why: ${r.eventCause.label}`,
    `What you are exploring: ${r.target.label}`,
    `Direct answer: ${r.verdict}. ${r.directAnswer}`,
    `Relationship type: ${r.relationshipType}`,
    `Chain: ${r.mechanismSteps.join(' → ')}`,
    `Chain Breaker: ${r.chainBreaker}`,
    r.scenarioWarning?`Important: ${r.scenarioWarning}`:'',
    'Educational framework, not a forecast or investment recommendation.'
  ].filter(Boolean).join('\n');}
  function syncHash(){history.replaceState(null,'',C.toHash(state()));}
  function render(){
    try{
      const r=C.resolve(eventsData,relationsData,sourcesData,state());lastResult=r;window.__carrowmontMarketChainLastResult=r;
      els.verdict.textContent=r.verdict;els.verdict.className='mcr-verdict '+badgeClass(r.verdict);els.type.textContent=r.relationshipType;els.answer.textContent=r.directAnswer;
      renderChain(r.mechanismSteps);listInto(els.support,r.supportingForces,'No separate supportive force is required to explain this relationship.');listInto(els.headwinds,r.headwinds,'No separate headwind is required to explain this relationship.');
      els.breaker.textContent=r.chainBreaker;listInto(els.different,r.differentReactions,'Different securities, sectors and countries can still react differently because starting conditions are not identical.');els.historical.textContent=r.historicalExample;renderSources(r);
      if(r.scenarioWarning){els.warning.hidden=false;els.warning.textContent=r.scenarioWarning;}else{els.warning.hidden=true;els.warning.textContent='';}
      syncHash();els.status.textContent=`Showing ${r.event.label} → ${r.target.label}.`;
    }catch(err){els.status.textContent='The relationship library could not be loaded safely.';console.error(err);}
  }
  function applyEvent(preferredCause,preferredTarget){const e=eventById(els.event.value);fillCauses(e,preferredCause);fillTargets(e,preferredTarget);render();}
  async function copyText(text,success){try{await navigator.clipboard.writeText(text);els.status.textContent=success;}catch{els.status.textContent='Copy was not available in this browser.';}}
  async function init(){
    try{
      [eventsData,relationsData,sourcesData]=await Promise.all(['data/market-chain-events.json','data/market-chain-relations.json','data/market-chain-sources.json'].map(async u=>{const r=await fetch(u,{cache:'no-store'});if(!r.ok)throw new Error(`Failed ${u}`);return r.json();}));
      const validation=C.validate(eventsData,relationsData,sourcesData);if(!validation.ok)throw new Error(validation.errors.join('\n'));
      fillEvents();const requested=C.allowedState(eventsData,C.parseHash(location.hash));els.event.value=requested.eventId;applyEvent(requested.causeId,requested.targetId);
      els.event.addEventListener('change',()=>applyEvent('', ''));
      els.cause.addEventListener('change',render);els.target.addEventListener('change',render);els.explain.addEventListener('click',()=>{render();$('mcrResults').focus();});
      els.copy.addEventListener('click',()=>lastResult&&copyText(resultText(lastResult),'Explanation copied.'));
      els.share.addEventListener('click',()=>lastResult&&copyText(location.href,'Share link copied.'));
      window.addEventListener('hashchange',()=>{const s=C.allowedState(eventsData,C.parseHash(location.hash));els.event.value=s.eventId;applyEvent(s.causeId,s.targetId);});
      document.documentElement.dataset.mcrReady='1';
    }catch(err){console.error(err);els.status.textContent='The reviewed relationship library could not be loaded. Please use the learning guides below.';}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

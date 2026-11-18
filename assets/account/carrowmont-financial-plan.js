(function(root,factory){
  'use strict';
  const api=factory(root);
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.CarrowmontFinancialPlan=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(root){
  'use strict';
  const VERSION='carrowmont-financial-plan-v1.0';
  const AREA_DEFS=Object.freeze([
    {id:'cash-flow',label:'Cash flow',route:'/budget-cash-flow-planner/',journeys:['budget-cash-flow']},
    {id:'emergency',label:'Emergency savings',route:'/emergency-fund-runway-calculator.html',journeys:['emergency-runway']},
    {id:'debt-home',label:'Debt & home / loans',route:'/budget-cash-flow-planner/debt-payoff-calculator.html',journeys:['debt-payoff','credit-card-payoff','loan-emi','mortgage-payoff']},
    {id:'retirement',label:'Retirement',route:'/retirement-calculator/planner.html#planner',journeys:['retirement','retirement-withdrawal']},
    {id:'financial-independence',label:'Financial independence',route:'/financial-independence/',journeys:['financial-independence']},
    {id:'goals-investing',label:'Goals & investing',route:'/goal-planner/',journeys:['goal','recurring-investment']}
  ]);
  const SEVERITY=Object.freeze({bad:4,warn:3,neutral:2,good:1});
  const MOVE_ORDER=Object.freeze({'budget-cash-flow':1,'emergency-runway':2,'debt-payoff':3,'credit-card-payoff':3,'loan-emi':3,'mortgage-payoff':3,'goal':4,'retirement':5,'financial-independence':5,'recurring-investment':5,'retirement-withdrawal':5});
  const ASSUMPTION_LABELS=Object.freeze({longTermReturnPct:'Long-term return assumption',withdrawalRatePct:'Withdrawal-rate assumption',inflationPct:'Inflation assumption',annualReturnPct:'Annual return assumption',annualStepUpPct:'Annual contribution increase',annualReturn:'Annual return assumption',inflationRate:'Inflation assumption',returnRate:'Return assumption',aprPct:'Interest-rate assumption'});
  const clean=v=>typeof v==='string'?v.trim():'';
  const num=(v,fallback=null)=>{const n=Number(v);return Number.isFinite(n)?n:fallback;};
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const obj=v=>v&&typeof v==='object'?v:{};
  const titleCase=value=>String(value||'').replace(/[_-]+/g,' ').replace(/([a-z0-9])([A-Z])/g,'$1 $2').replace(/\b\w/g,c=>c.toUpperCase()).trim();
  function fact(profile,path){const f=obj(profile?.facts)[path];return f&&!f.excluded&&f.value!==''&&f.value!==null&&f.value!==undefined?f:null;}
  function factValue(profile,path,fallback=null){const f=fact(profile,path);return f?f.value:fallback;}
  function latestDate(values){let best='';let bestMs=-Infinity;for(const value of values){const t=Date.parse(value||'');if(Number.isFinite(t)&&t>bestMs){bestMs=t;best=value;}}return best;}
  function dateLabel(value){const t=Date.parse(value||'');if(!Number.isFinite(t))return 'Date unavailable';try{return new Intl.DateTimeFormat(undefined,{day:'numeric',month:'short',year:'numeric'}).format(new Date(t));}catch(_){return 'Date unavailable';}}
  function money(value,currency){const n=num(value);if(n===null)return 'Not available';try{return new Intl.NumberFormat(undefined,{style:'currency',currency:currency||'USD',maximumFractionDigits:0}).format(n);}catch(_){return `${currency||''} ${Math.round(n).toLocaleString()}`.trim();}}
  function number(value,digits=1){const n=num(value);return n===null?'Not available':new Intl.NumberFormat(undefined,{maximumFractionDigits:digits}).format(n);}
  function pct(value){const n=num(value);return n===null?'Not available':`${number(Math.abs(n)<=1.5?n*100:n,1)}%`;}
  function debtPayments(profile){
    const direct=fact(profile,'debt.monthlyPayments');if(direct)return num(direct.value,0);
    const parts=['debt.housingPayment','debt.otherLoanPayments','debt.creditCardMinimums','debt.otherDebtPayments'].map(p=>fact(profile,p)).filter(Boolean);
    return parts.length?parts.reduce((sum,f)=>sum+Math.max(0,num(f.value,0)),0):null;
  }
  function sourceFact(profile,path,label){const f=fact(profile,path);if(!f)return null;return {kind:'detail',label:label||titleCase(path.split('.').pop()),source:f.source||f.origin||'Saved detail',updatedAt:f.lastUpdated||profile?.updatedAt||'',path};}
  function rowForJourney(rows,journey){return (Array.isArray(rows)?rows:[]).find(row=>row?.journey===journey)||null;}
  function progressForArea(items,area){
    const matches=(items||[]).filter(item=>area.journeys.includes(item?.journey));
    if(!matches.length)return null;
    return matches.slice().sort((a,b)=>(SEVERITY[b.tone]||2)-(SEVERITY[a.tone]||2))[0];
  }
  function progressSources(rows,area){
    return (Array.isArray(rows)?rows:[]).filter(row=>area.journeys.includes(row?.journey)).map(row=>({kind:'plan',label:row.label||titleCase(row.journey),source:'Saved plan',updatedAt:row.updated_at||row.created_at||'',journey:row.journey,route:clean(row?.scenario?.toolPath)}));
  }
  function baseArea(def){return {id:def.id,label:def.label,status:'Not added',tone:'neutral',summary:`No ${def.label.toLowerCase()} plan or compatible saved details are available yet.`,detail:'Add or save a relevant plan when this area matters to you.',route:def.route,sources:[],hasData:false};}
  function fromProgress(def,item,rows){
    const area=baseArea(def);if(!item)return area;
    area.status=item.status||'Ready to track';area.tone=item.tone||'neutral';area.summary=item.headline||'This saved plan is ready to review.';area.detail=item.target||item.freshness?.label||'Open the saved plan for the underlying details.';area.route=item.route||def.route;area.sources=progressSources(rows,def);area.hasData=true;return area;
  }
  function cashFlowArea(profile,items,rows,currency){
    const def=AREA_DEFS[0],area=fromProgress(def,progressForArea(items,def),rows);
    const income=fact(profile,'cashFlow.takeHomeIncome'),essential=fact(profile,'cashFlow.essentialExpenses'),flex=fact(profile,'cashFlow.flexibleExpenses'),debt=debtPayments(profile);
    if(!income||!essential||!flex||debt===null)return area;
    const Budget=root.CarrowmontBudgetCore;if(!Budget?.calculate)return area;
    const r=Budget.calculate({incomes:[{amount:num(income.value,0),frequency:'monthly'}],essential:[{amount:num(essential.value,0),frequency:'monthly'},{amount:debt,frequency:'monthly'}],flexible:[{amount:num(flex.value,0),frequency:'monthly'}],savings:[],primaryPayFrequency:'monthly'});
    area.hasData=true;area.status=r.remaining<0?'Needs attention':'On track';area.tone=r.remaining<0?'bad':'good';area.summary=r.remaining<0?`Saved monthly outgo is ${money(Math.abs(r.remaining),currency)} above saved take-home income.`:`Saved monthly income leaves about ${money(r.remaining,currency)} after the monthly amounts currently included.`;area.detail='Uses saved monthly income, essential expenses, other spending and required debt payments.';area.sources=[sourceFact(profile,'cashFlow.takeHomeIncome','Monthly income'),sourceFact(profile,'cashFlow.essentialExpenses','Essential expenses'),sourceFact(profile,'cashFlow.flexibleExpenses','Other spending')].filter(Boolean);return area;
  }
  function emergencyArea(profile,items,rows,currency){
    const def=AREA_DEFS[1],area=fromProgress(def,progressForArea(items,def),rows);
    const essential=fact(profile,'cashFlow.essentialExpenses'),reserve=fact(profile,'resilience.emergencySavings'),target=fact(profile,'resilience.targetMonths'),debt=debtPayments(profile);
    if(!essential||!reserve||debt===null)return area;
    const Emergency=root.CarrowmontEmergencyFundCore;if(!Emergency?.calculate)return area;
    const targetMonths=target?num(target.value,6):6;const r=Emergency.calculate({essentialExpenses:num(essential.value,0),debtPayments:debt,emergencySavings:num(reserve.value,0),targetMonths});
    area.hasData=true;
    if(!target){area.status='Needs review';area.tone='warn';area.summary=`Saved emergency savings cover about ${number(r.fullLossRunwayMonths,1)} months of essential commitments.`;area.detail='Choose an emergency-savings target before Carrowmont labels this area on track.';}
    else if(r.targetGap>0){area.status='Needs attention';area.tone='bad';area.summary=`Emergency savings are about ${money(r.targetGap,currency)} below the saved ${number(targetMonths,1)}-month target.`;area.detail=`Current modeled runway: ${number(r.fullLossRunwayMonths,1)} months.`;}
    else{area.status='On track';area.tone='good';area.summary=`Emergency savings meet the saved ${number(targetMonths,1)}-month target.`;area.detail=`Current modeled runway: ${number(r.fullLossRunwayMonths,1)} months.`;}
    area.sources=[sourceFact(profile,'resilience.emergencySavings','Emergency savings'),sourceFact(profile,'resilience.targetMonths','Emergency target'),sourceFact(profile,'cashFlow.essentialExpenses','Essential expenses')].filter(Boolean);return area;
  }
  function aggregateArea(def,items,rows){
    const matches=(items||[]).filter(item=>def.journeys.includes(item?.journey));if(!matches.length)return baseArea(def);
    const worst=matches.slice().sort((a,b)=>(SEVERITY[b.tone]||2)-(SEVERITY[a.tone]||2))[0];const area=fromProgress(def,worst,rows);
    if(matches.length>1)area.detail=`${matches.length} saved plans contribute to this area. The status shown is the one needing the most attention.`;
    return area;
  }
  function debtHomeArea(profile,items,rows,currency){
    const def=AREA_DEFS[2],fromPlans=aggregateArea(def,items,rows);if(fromPlans.hasData)return fromPlans;
    const balance=fact(profile,'debt.balance'),payments=debtPayments(profile),mortgage=fact(profile,'debt.mortgageBalance');if(!balance&&payments===null&&!mortgage)return fromPlans;
    const area=baseArea(def);area.hasData=true;area.status='Ready to track';area.tone='neutral';const bits=[];if(balance)bits.push(`saved debt balance ${money(balance.value,currency)}`);if(mortgage)bits.push(`home-loan balance ${money(mortgage.value,currency)}`);if(payments!==null)bits.push(`monthly debt payments ${money(payments,currency)}`);area.summary=`You have ${bits.join(' and ')}.`;area.detail='Save a payoff or loan plan when you want Carrowmont to measure this area against a target.';area.sources=[sourceFact(profile,'debt.balance','Debt balance'),sourceFact(profile,'debt.monthlyPayments','Monthly debt payments'),sourceFact(profile,'debt.mortgageBalance','Home-loan balance')].filter(Boolean);return area;
  }
  function retirementArea(profile,items,rows,currency){
    const def=AREA_DEFS[3],fromPlans=aggregateArea(def,items,rows);if(fromPlans.hasData)return fromPlans;const savings=fact(profile,'retirement.currentSavings'),contribution=fact(profile,'retirement.monthlyContribution');if(!savings&&!contribution)return fromPlans;const area=baseArea(def);area.hasData=true;area.status='Ready to track';area.tone='neutral';area.summary=`Saved retirement position: ${savings?money(savings.value,currency):'savings not set'}${contribution?` with ${money(contribution.value,currency)} saved as the monthly contribution`:''}.`;area.detail='Save a Retirement Planner target before Carrowmont labels retirement on track or needs attention.';area.sources=[sourceFact(profile,'retirement.currentSavings','Retirement savings'),sourceFact(profile,'retirement.monthlyContribution','Monthly retirement contribution')].filter(Boolean);return area;
  }
  function fiArea(profile,items,rows,currency){
    const def=AREA_DEFS[4],fromPlans=aggregateArea(def,items,rows);if(fromPlans.hasData)return fromPlans;const assets=fact(profile,'fi.currentAssets'),target=fact(profile,'fi.targetAge');if(!assets&&!target)return fromPlans;const area=baseArea(def);area.hasData=true;area.status='Ready to track';area.tone='neutral';area.summary=`Saved FI details include ${assets?money(assets.value,currency):'no asset amount yet'}${target?` and target age ${number(target.value,0)}`:''}.`;area.detail='Save a Financial Independence plan before Carrowmont measures progress against the target age.';area.sources=[sourceFact(profile,'fi.currentAssets','Invested assets'),sourceFact(profile,'fi.targetAge','Target FI age')].filter(Boolean);return area;
  }
  function goalsInvestingArea(profile,items,rows,currency){
    const def=AREA_DEFS[5],fromPlans=aggregateArea(def,items,rows);if(fromPlans.hasData)return fromPlans;const target=fact(profile,'goal.targetAmount'),saved=fact(profile,'goal.currentSavings'),contribution=fact(profile,'goal.monthlyContribution');if(!target&&!saved&&!contribution)return fromPlans;const area=baseArea(def);area.hasData=true;area.status='Ready to track';area.tone='neutral';area.summary=`Saved goal details include ${target?`a ${money(target.value,currency)} target`:'a goal without a target amount yet'}${saved?` and ${money(saved.value,currency)} already set aside`:''}.`;area.detail='Save a Goal or Recurring Investment plan before Carrowmont measures this area against a target path.';area.sources=[sourceFact(profile,'goal.targetAmount','Goal target'),sourceFact(profile,'goal.currentSavings','Goal savings'),sourceFact(profile,'goal.monthlyContribution','Goal contribution')].filter(Boolean);return area;
  }
  function flattenPrimitive(value,prefix='',out=[]){
    if(value===null||value===undefined)return out;
    if(['string','number','boolean'].includes(typeof value)){out.push([prefix,value]);return out;}
    if(Array.isArray(value))return out;
    if(typeof value==='object'){for(const [k,v] of Object.entries(value)){const key=prefix?`${prefix}.${k}`:k;flattenPrimitive(v,key,out);}}return out;
  }
  function assumptionValue(key,value,currency){
    const low=key.toLowerCase();if(typeof value==='number'&&/(pct|rate|return|inflation|step|growth)/.test(low))return pct(value);
    if(typeof value==='number'&&/(amount|balance|savings|contribution|corpus|target|income|expense|payment)/.test(low))return money(value,currency);
    if(typeof value==='number')return number(value,2);return String(value);
  }
  function assumptions(profile,rows,currency){
    const out=[],seen=new Set();
    const add=(label,value,source,updatedAt,key)=>{const id=`${label}|${String(value)}`.toLowerCase();if(seen.has(id)||value===null||value===undefined||value==='')return;seen.add(id);out.push({label,value:assumptionValue(key||label,value,currency),source,updatedAt});};
    const profileAssumptions=['assumptions.longTermReturnPct','fi.withdrawalRatePct','fi.inflationPct','fi.annualReturnPct','fi.annualStepUpPct'];
    for(const path of profileAssumptions){const f=fact(profile,path);if(f)add(ASSUMPTION_LABELS[path.split('.').pop()]||titleCase(path.split('.').pop()),f.value,f.source||'Saved detail',f.lastUpdated||profile?.updatedAt,path);}
    const pattern=/(assum|return|inflation|rate|step.?up|growth|withdrawal|apr)/i;
    for(const row of Array.isArray(rows)?rows:[]){for(const [key,value] of flattenPrimitive(row?.scenario?.input||{})){if(pattern.test(key)&&typeof value!=='boolean')add(ASSUMPTION_LABELS[key.split('.').pop()]||titleCase(key.split('.').pop()),value,row.label||titleCase(row.journey),row.updated_at||row.created_at,key);}}
    return out.slice(0,8);
  }
  function priorityFacts(profile){return {monthlyIncome:num(factValue(profile,'cashFlow.takeHomeIncome'),0),essentialExpenses:num(factValue(profile,'cashFlow.essentialExpenses'),0),flexibleExpenses:num(factValue(profile,'cashFlow.flexibleExpenses'),0),monthlyDebtPayments:num(debtPayments(profile),0),emergencySavings:num(factValue(profile,'resilience.emergencySavings'),0),emergencyTargetMonths:num(factValue(profile,'resilience.targetMonths'),6),debtBalance:num(factValue(profile,'debt.balance'),0),highestDebtAprPct:num(factValue(profile,'debt.highestAprPct'),0),assumedLongTermReturnPct:num(factValue(profile,'assumptions.longTermReturnPct'),5),retirementSavings:num(factValue(profile,'retirement.currentSavings'),0),retirementMonthlyContribution:num(factValue(profile,'retirement.monthlyContribution'),0),goalTargetAmount:num(factValue(profile,'goal.targetAmount'),0),goalCurrentSavings:num(factValue(profile,'goal.currentSavings'),0),goalYearsAway:num(factValue(profile,'goal.yearsAway'),0),goalMonthlyContribution:num(factValue(profile,'goal.monthlyContribution'),0)};}
  function canUsePriority(profile){return ['cashFlow.takeHomeIncome','cashFlow.essentialExpenses','cashFlow.flexibleExpenses','resilience.emergencySavings'].every(path=>Boolean(fact(profile,path)))&&debtPayments(profile)!==null;}
  function nextMoves(profile,progressItems,currency){
    const moves=[],seen=new Set();const add=move=>{const key=clean(move?.action||move?.title).toLowerCase();if(!key||seen.has(key)||moves.length>=3)return;seen.add(key);moves.push(move);};
    const needs=(progressItems||[]).filter(item=>['bad','warn'].includes(item?.tone)).sort((a,b)=>(MOVE_ORDER[a.journey]||99)-(MOVE_ORDER[b.journey]||99));
    needs.forEach(item=>add({title:item.label||titleCase(item.journey),action:item.correction||item.trend?.next||`Open ${item.label||'the saved plan'} and review what changed.`,reason:item.headline||item.freshness?.label||'This saved plan needs review.',source:'Saved plan progress'}));
    if(moves.length<3&&canUsePriority(profile)&&root.CarrowmontMoneyPriorities?.create){try{const result=root.CarrowmontMoneyPriorities.create().evaluate(priorityFacts(profile),{currency});for(const move of result.priorityMoves||[])add({title:move.stageLabel||move.headline,action:move.action,reason:move.rationale,source:'Carrowmont Money Priorities'});}catch(_){}}
    if(moves.length<3){for(const item of (progressItems||[]).filter(x=>x?.tone==='good').sort((a,b)=>(MOVE_ORDER[a.journey]||99)-(MOVE_ORDER[b.journey]||99))){add({title:item.label||titleCase(item.journey),action:`Keep this plan reviewed when your saved details or target change.`,reason:item.headline||'This saved plan is currently on track.',source:'Saved plan progress'});}}
    return moves.slice(0,3);
  }
  function build(profile,rows,options={}){
    const currency=options.currency||profile?.locale?.currency||'USD',now=options.now||new Date().toISOString();const Progress=root.CarrowmontProgress;
    const progressItems=Progress?.evaluateAll?Progress.evaluateAll(Array.isArray(rows)?rows:[],currency,now):[];
    const areas=[cashFlowArea(profile,progressItems,rows,currency),emergencyArea(profile,progressItems,rows,currency),debtHomeArea(profile,progressItems,rows,currency),retirementArea(profile,progressItems,rows,currency),fiArea(profile,progressItems,rows,currency),goalsInvestingArea(profile,progressItems,rows,currency)];
    const withData=areas.filter(a=>a.hasData),attention=withData.filter(a=>a.tone==='bad').length,review=withData.filter(a=>a.tone==='warn').length,onTrack=withData.filter(a=>a.tone==='good').length;
    const headline=attention?`${attention} planning area${attention===1?'':'s'} need attention.`:review?`Your plan is broadly steady, with ${review} area${review===1?'':'s'} to review.`:withData.length?'Your saved financial plan is broadly on track.':'Your financial plan is ready to build out.';
    const latest=latestDate([profile?.updatedAt,...(Array.isArray(rows)?rows:[]).flatMap(row=>[row?.updated_at,row?.created_at])]);
    return {version:VERSION,generatedAt:now,currency,headline,coverage:{withData:withData.length,total:AREA_DEFS.length,onTrack,attention,review},areas,moves:nextMoves(profile,progressItems,currency),assumptions:assumptions(profile,rows,currency),latestSavedAt:latest,sourceRows:(Array.isArray(rows)?rows:[]).map(row=>({journey:row.journey,label:row.label||titleCase(row.journey),updatedAt:row.updated_at||row.created_at||'',route:clean(row?.scenario?.toolPath)}))};
  }
  function sourceList(area){if(!area.sources?.length)return '<li>No saved source is available for this area yet.</li>';return area.sources.map(src=>`<li><strong>${esc(src.label)}</strong><span>${esc(src.source||'Saved source')}${src.updatedAt?` · ${esc(dateLabel(src.updatedAt))}`:''}</span></li>`).join('');}
  function areaAnchor(id){return `mycm-plan-area-${String(id||'').replace(/[^a-z0-9-]/gi,'-')}`;}
  function jumpToArea(container,id){
    const target=container.querySelector(`#${areaAnchor(id)}`);if(!target)return;
    const reduce=typeof root.matchMedia==='function'&&root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
    try{target.focus({preventScroll:true});}catch(_){target.focus();}
    target.classList.remove('mycm-plan-area-focus');void target.offsetWidth;target.classList.add('mycm-plan-area-focus');
    root.setTimeout(()=>target.classList.remove('mycm-plan-area-focus'),reduce?700:1800);
  }
  function render(container,model,options={}){
    if(!container||!model)return;container.hidden=false;
    const statusBits=[model.coverage.onTrack?`${model.coverage.onTrack} on track / ahead`:'',model.coverage.attention?`${model.coverage.attention} need attention`:'',model.coverage.review?`${model.coverage.review} need review`:''].filter(Boolean);
    const attentionAreas=model.areas.filter(area=>area.hasData&&area.tone==='bad');
    const reviewAreas=model.areas.filter(area=>area.hasData&&area.tone==='warn');
    const areaHtml=model.areas.map(area=>`<article class="mycm-plan-area" id="${areaAnchor(area.id)}" tabindex="-1" data-plan-area="${esc(area.id)}" data-tone="${esc(area.tone)}"><div class="mycm-plan-area-head"><strong>${esc(area.label)}</strong><span>${esc(area.status)}</span></div><p>${esc(area.summary)}</p><small>${esc(area.detail)}</small><div class="mycm-plan-area-actions"><a class="mycm-link" href="${esc(area.route)}">Open ${esc(area.label.toLowerCase())} →</a><details class="mycm-plan-source"><summary>Where this came from</summary><ul>${sourceList(area)}</ul></details></div></article>`).join('');
    const attentionLinks=attentionAreas.length?`<div class="mycm-plan-overview-links" aria-label="Planning areas needing attention"><span>Review now</span>${attentionAreas.map(area=>`<button type="button" class="mycm-plan-overview-link" data-mycm-plan-jump="${esc(area.id)}"><strong>${esc(area.label)}</strong><small>${esc(area.summary)}</small><span aria-hidden="true">↓</span></button>`).join('')}</div>`:'';
    const reviewLinks=!attentionAreas.length&&reviewAreas.length?`<div class="mycm-plan-overview-links" aria-label="Planning areas to review"><span>Worth reviewing</span>${reviewAreas.map(area=>`<button type="button" class="mycm-plan-overview-link" data-mycm-plan-jump="${esc(area.id)}"><strong>${esc(area.label)}</strong><small>${esc(area.summary)}</small><span aria-hidden="true">↓</span></button>`).join('')}</div>`:'';
    const moves=model.moves.length?model.moves.map((move,i)=>`<li><span>${i+1}</span><div><strong>${esc(move.title)}</strong><p>${esc(move.action)}</p><small>${esc(move.reason)} · ${esc(move.source)}</small></div></li>`).join(''):'<li class="mycm-plan-empty"><div><strong>No clear next move is being generated.</strong><p>Add or update saved plans before Carrowmont creates action steps from them.</p></div></li>';
    const assumptionsHtml=model.assumptions.length?model.assumptions.map(item=>`<li><strong>${esc(item.label)}</strong><span>${esc(item.value)}</span><small>${esc(item.source)}${item.updatedAt?` · ${esc(dateLabel(item.updatedAt))}`:''}</small></li>`).join(''):'<li class="mycm-plan-empty"><strong>No important forecast assumptions are saved yet.</strong><small>Assumptions appear here only when they are present in saved details or saved plans.</small></li>';
    container.innerHTML=`<div class="mycm-plan-head"><div><span class="mycm-kicker">Your Financial Plan</span><h2>Your saved plans, brought together in one view</h2><p>This summary uses only the details and plans you chose to keep. It is a planning view, not a bank or transaction feed.</p></div><button type="button" class="mycm-button mycm-button-primary" id="mycmGeneratePlanReport" ${model.coverage.withData?'':'disabled'}>Generate My Carrowmont Plan Report</button></div><div class="mycm-plan-overview" data-attention-count="${attentionAreas.length}"><div class="mycm-plan-overview-copy"><strong>${esc(model.headline)}</strong><span>${esc(statusBits.join(' · ')||`${model.coverage.withData} of ${model.coverage.total} planning areas have saved information`)}</span></div>${attentionLinks||reviewLinks}<small>${model.latestSavedAt?`Latest saved information: ${esc(dateLabel(model.latestSavedAt))}`:'No saved plan date is available yet.'}</small></div><div class="mycm-plan-area-grid">${areaHtml}</div><div class="mycm-plan-support-grid"><article class="mycm-plan-moves"><span class="mycm-kicker">Your next three moves</span><h3>What deserves attention next?</h3><p>Carrowmont shows only moves supported by the saved information available. It does not create activity just to fill this list.</p><ol>${moves}</ol></article><article class="mycm-plan-assumptions"><span class="mycm-kicker">Important assumptions</span><h3>Values that can change the forecast</h3><p>These are assumptions found in your saved details or plans, not guaranteed outcomes.</p><ul>${assumptionsHtml}</ul></article></div><p class="mycm-plan-note"><strong>Traceable by design:</strong> open “Where this came from” on any area to see the underlying saved source. Unsaved what-if calculations do not enter this summary until you explicitly save or update a plan.</p>`;
    container.querySelectorAll('[data-mycm-plan-jump]').forEach(button=>button.addEventListener('click',()=>jumpToArea(container,button.dataset.mycmPlanJump)));
    if(attentionAreas.length===1){const overview=container.querySelector('.mycm-plan-overview');if(overview){overview.classList.add('mycm-plan-overview-single');overview.tabIndex=0;overview.setAttribute('role','button');overview.setAttribute('aria-label',`Review ${attentionAreas[0].label}: ${attentionAreas[0].summary}`);const activate=event=>{if(event.target.closest('button,a,details,summary'))return;if(event.type==='keydown'&&event.key!=='Enter'&&event.key!==' ')return;if(event.type==='keydown')event.preventDefault();jumpToArea(container,attentionAreas[0].id);};overview.addEventListener('click',activate);overview.addEventListener('keydown',activate);}}
    const btn=container.querySelector('#mycmGeneratePlanReport');if(btn&&typeof options.onReport==='function')btn.addEventListener('click',async()=>{btn.disabled=true;const old=btn.textContent;btn.textContent='Preparing report…';try{await options.onReport(model);}finally{btn.disabled=false;btn.textContent=old;}});
  }

  return Object.freeze({VERSION,AREA_DEFS,build,render,dateLabel,money});
});

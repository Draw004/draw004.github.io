(function(){
  'use strict';
  const Core=()=>window.CarrowmontSilverMacroCore;
  const els={
    snapshotDate:document.getElementById('snapshotDate'),referenceList:document.getElementById('referenceList'),
    industrial:document.getElementById('simple-industrial'),investment:document.getElementById('simple-investment'),mine:document.getElementById('simple-mine'),recycling:document.getElementById('simple-recycling'),monetary:document.getElementById('simple-monetary'),
    explore:document.getElementById('exploreBtn'),reset:document.getElementById('resetBtn'),presets:document.getElementById('scenarioPresets'),advanced:document.getElementById('advancedAssumptions'),advancedPhysical:document.getElementById('advancedPhysicalFields'),advancedMacro:document.getElementById('advancedMacroFields'),
    validation:document.getElementById('validationMessage'),scenarioType:document.getElementById('scenarioType'),combined:document.getElementById('combinedLabel'),scenarioSummary:document.getElementById('scenarioSummary'),physical:document.getElementById('physicalLabel'),physicalDetail:document.getElementById('physicalDetail'),macro:document.getElementById('macroLabel'),macroDetail:document.getElementById('macroDetail'),modeledSupply:document.getElementById('modeledSupply'),modeledDemand:document.getElementById('modeledDemand'),supplyDelta:document.getElementById('supplyDelta'),demandDelta:document.getElementById('demandDelta'),interpretation:document.getElementById('interpretation'),changesPanel:document.getElementById('changesPanel'),changedList:document.getElementById('changedList'),
    copy:document.getElementById('copySummaryBtn'),csv:document.getElementById('downloadCsvBtn'),report:document.getElementById('generateReportBtn'),actionMessage:document.getElementById('actionMessage'),
    supplyChart:document.getElementById('supplyDemandChart'),supplyTable:document.getElementById('supplyDemandTable'),history:document.getElementById('historyStrip'),forceMap:document.getElementById('forceMap'),forceTable:document.getElementById('forceMapTable'),comparisonBody:document.querySelector('#comparisonTable tbody'),referenceDataBody:document.getElementById('referenceDataBody'),sourceDateCopy:document.getElementById('sourceDateCopy')
  };
  let silverRef=null,goldRef=null,lastResult=null,unit='moz',advancedDirty=false;
  const PHYSICAL_LABELS={mineProduction:'Mine production',recycling:'Recycling',otherSupply:'Other / reconciling supply',industrial:'Industrial demand',physicalInvestment:'Physical investment demand',jewelry:'Jewelry demand',silverware:'Silverware demand',photography:'Photography demand',otherDemand:'Other demand'};
  const PHYSICAL_ORDER=['mineProduction','recycling','otherSupply','industrial','physicalInvestment','jewelry','silverware','photography','otherDemand'];

  const fmt=(v,d=1)=>Number(v).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
  const fmtDate=v=>{if(!v)return '—';const d=new Date(`${v}T00:00:00Z`);return Number.isNaN(d.getTime())?String(v):new Intl.DateTimeFormat('en',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(d);};
  function qty(v,d=1){const n=unit==='tonnes'?Core().toTonnes(v):Number(v);return `${fmt(n,d)} ${unit==='tonnes'?'t':'Moz'}`;}
  function setAction(text,isError=false){els.actionMessage.textContent=text||'';els.actionMessage.style.color=isError?'#9d3d3d':'';}
  function escapeCsv(v){const s=String(v??'');return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;}
  function currentSimpleStates(){return{industrial:els.industrial.value,investment:els.investment.value,mine:els.mine.value,recycling:els.recycling.value,monetary:els.monetary.value};}
  function setSimpleReference(){[els.industrial,els.investment,els.mine,els.recycling,els.monetary].forEach(x=>x.value='reference');}
  function refPhysical(){return Core().normalizePhysicalReference(silverRef);}
  function goldMacroValue(){return{realYield:goldRef.drivers.realYields.referenceScore,dollar:goldRef.drivers.dollar.referenceScore};}

  function buildAdvancedFields(){
    els.advancedPhysical.innerHTML='';
    const ref=refPhysical();
    PHYSICAL_ORDER.forEach(key=>{
      const label=document.createElement('label');label.className='smse-field';label.innerHTML=`<span>${PHYSICAL_LABELS[key]}</span><input id="adv-${key}" data-physical="${key}" type="number" min="0" step="0.1" aria-label="${PHYSICAL_LABELS[key]}">`;
      els.advancedPhysical.appendChild(label);label.querySelector('input').value=(unit==='tonnes'?Core().toTonnes(ref[key]):ref[key]).toFixed(1);
    });
    els.advancedMacro.innerHTML=`<label class="smse-field"><span>Real-yield state</span><select id="adv-realYield" data-macro="realYield"><option value="-2">Strong headwind</option><option value="-1">Headwind</option><option value="0">Mixed</option><option value="1">Supportive</option><option value="2">Strong support</option></select></label><label class="smse-field"><span>U.S. dollar state</span><select id="adv-dollar" data-macro="dollar"><option value="-2">Strong headwind</option><option value="-1">Headwind</option><option value="0">Mixed</option><option value="1">Supportive</option><option value="2">Strong support</option></select></label>`;
    const m=goldMacroValue();document.getElementById('adv-realYield').value=String(m.realYield);document.getElementById('adv-dollar').value=String(m.dollar);
    els.advanced.querySelectorAll('input[data-physical]').forEach(input=>input.addEventListener('input',()=>{advancedDirty=true;const key=input.dataset.physical;if(key==='industrial')els.industrial.value='reference';if(key==='physicalInvestment')els.investment.value='reference';if(key==='mineProduction')els.mine.value='reference';if(key==='recycling')els.recycling.value='reference';}));
    els.advanced.querySelectorAll('select[data-macro]').forEach(input=>input.addEventListener('change',()=>{advancedDirty=true;els.monetary.value='reference';}));
  }

  function syncAdvancedFromResult(bundle){
    PHYSICAL_ORDER.forEach(key=>{const input=document.getElementById(`adv-${key}`);if(input)input.value=(unit==='tonnes'?Core().toTonnes(bundle.scenario.physical[key]):bundle.scenario.physical[key]).toFixed(1);});
    const ry=document.getElementById('adv-realYield'),du=document.getElementById('adv-dollar');if(ry)ry.value=String(bundle.scenario.macro.realYield);if(du)du.value=String(bundle.scenario.macro.dollar);
  }

  function advancedOptions(){
    if(!advancedDirty)return null;
    const absolute={};
    for(const key of PHYSICAL_ORDER){const input=document.getElementById(`adv-${key}`);let value=Number(input.value);if(unit==='tonnes')value=Core().toMoz(value);absolute[key]=value;}
    return{absolute,macroScores:{realYield:Number(document.getElementById('adv-realYield').value),dollar:Number(document.getElementById('adv-dollar').value)}};
  }

  function makeBundle(){
    const simple=Core().applySimpleState({},currentSimpleStates());
    const adv=advancedOptions();
    const options=adv?{...simple,...adv,adjustments:simple.adjustments}:simple;
    const scenario=Core().buildScenario(silverRef,goldRef,options);
    return Object.freeze({methodologyVersion:Core().METHODOLOGY_VERSION,silverReference:silverRef,goldReference:goldRef,scenario});
  }

  function buildReferenceUi(){
    els.snapshotDate.textContent=`Physical market ${silverRef.referenceYear} · reviewed ${fmtDate(silverRef.reviewedAt)} · macro snapshot ${fmtDate(goldRef.snapshotDate)}`;
    const model=Core().buildScenario(silverRef,goldRef,{}),t=model.referenceTotals;
    els.referenceList.innerHTML=`<div class="smse-reference-row"><span>Published total supply</span><strong>${fmt(silverRef.supply.publishedTotalSupplyMoz)} Moz</strong></div><div class="smse-reference-row"><span>Published total demand</span><strong>${fmt(silverRef.demand.publishedTotalDemandMoz)} Moz</strong></div><div class="smse-reference-row"><span>Published market balance</span><strong>${fmt(silverRef.publishedBalanceMoz)} Moz deficit</strong></div><div class="smse-reference-row"><span>Model classification</span><strong>${Core().classifyBalanceRatio(t.balanceRatio).label}</strong></div>`;
    els.referenceDataBody.innerHTML='';
    const rows=[
      ['Physical-market source',`${silverRef.source.title} · ${silverRef.referenceYear}`,silverRef.source.publicationDate,`${silverRef.source.publisher} · ${silverRef.source.dataStatus}`],
      ['Published supply',`${fmt(silverRef.supply.publishedTotalSupplyMoz)} Moz`,String(silverRef.referenceYear),silverRef.source.publisher],
      ['Published demand',`${fmt(silverRef.demand.publishedTotalDemandMoz)} Moz`,String(silverRef.referenceYear),`${silverRef.source.publisher} · category rounding disclosed`],
      ['Published balance',`${fmt(silverRef.publishedBalanceMoz)} Moz`,String(silverRef.referenceYear),silverRef.source.publisher],
      ['USGS mine cross-check',`${fmt(silverRef.secondaryValidation.globalMineProduction2025MetricTonnes,0)} t`,String(silverRef.referenceYear),`${silverRef.secondaryValidation.publisher} · trend cross-check only`],
      ['Real yields',`${fmt(goldRef.drivers.realYields.value,3)}%`,goldRef.drivers.realYields.asOf,goldRef.drivers.realYields.source],
      ['U.S. dollar',`${fmt(goldRef.drivers.dollar.value,2)}`,goldRef.drivers.dollar.asOf,goldRef.drivers.dollar.source]
    ];
    rows.forEach(r=>{const tr=document.createElement('tr');tr.innerHTML=r.map(v=>`<td>${v}</td>`).join('');els.referenceDataBody.appendChild(tr);});
    els.sourceDateCopy.textContent=`Physical reference: ${silverRef.source.title}, completed year ${silverRef.referenceYear}, published ${fmtDate(silverRef.source.publicationDate)}. Macro reference: Carrowmont Gold Macro snapshot dated ${fmtDate(goldRef.snapshotDate)}. The visitor's browser reads bundled same-origin files only.`;
    els.history.innerHTML='';silverRef.limitedHistory.forEach(row=>{const a=document.createElement('article');a.innerHTML=`<strong>${row.year}</strong><span>${fmt(row.marketBalanceMoz)} Moz ${row.marketBalanceMoz<0?'deficit':'surplus'}</span>`;els.history.appendChild(a);});
  }

  function drawSupplyChart(bundle){
    const svg=els.supplyChart,ns='http://www.w3.org/2000/svg';while(svg.children.length>2)svg.lastChild.remove();
    const mobile=window.matchMedia('(max-width: 700px)').matches,dims=mobile?{vb:'0 0 390 360',left:48,right:370,top:35,bottom:300,labelY:337}:{vb:'0 0 960 390',left:75,right:930,top:35,bottom:320,labelY:358};svg.setAttribute('viewBox',dims.vb);svg.dataset.chartLayout=mobile?'mobile':'desktop';
    const add=(tag,attrs,text)=>{const e=document.createElementNS(ns,tag);Object.entries(attrs||{}).forEach(([k,v])=>e.setAttribute(k,String(v)));if(text!==undefined)e.textContent=text;svg.appendChild(e);return e;};
    const ref=bundle.scenario.referenceTotals,sc=bundle.scenario.totals,values=[ref.totalSupply,ref.totalDemand,sc.totalSupply,sc.totalDemand],max=Math.max(...values)*1.12,plotH=dims.bottom-dims.top;
    for(let i=0;i<=4;i++){const value=max*i/4,y=dims.bottom-plotH*i/4;add('line',{x1:dims.left,x2:dims.right,y1:y,y2:y,class:'grid'});add('text',{x:dims.left-8,y:y+4,'text-anchor':'end',class:'axis-label'},fmt(unit==='tonnes'?Core().toTonnes(value):value,0));}
    const groups=mobile?[{x:85,label:'Reference'},{x:260,label:'Scenario'}]:[{x:245,label:'Reference'},{x:650,label:'Scenario'}],barW=mobile?54:105,gap=mobile?8:18;
    [[ref.totalSupply,ref.totalDemand],[sc.totalSupply,sc.totalDemand]].forEach((pair,gi)=>pair.forEach((v,bi)=>{const display=unit==='tonnes'?Core().toTonnes(v):v,h=plotH*(v/max),x=groups[gi].x+bi*(barW+gap),y=dims.bottom-h;add('rect',{x,y,width:barW,height:h,rx:7,class:`${bi===0?'supply-bar':'demand-bar'} ${gi===0?'reference-bar':'scenario-bar'}`});add('text',{x:x+barW/2,y:y-8,'text-anchor':'middle',class:'value-label'},fmt(display,0));add('text',{x:x+barW/2,y:dims.bottom+20,'text-anchor':'middle',class:'axis-label'},bi===0?'Supply':'Demand');}));
    groups.forEach(g=>add('text',{x:g.x+(barW*2+gap)/2,y:dims.labelY,'text-anchor':'middle',class:'group-label'},g.label));
    add('text',{x:dims.left,y:17,class:'axis-label'},unit==='tonnes'?'Metric tonnes':'Million troy ounces (Moz)');
  }

  function drawForceMap(bundle){
    const svg=els.forceMap,ns='http://www.w3.org/2000/svg';while(svg.children.length>2)svg.lastChild.remove();const mobile=window.matchMedia('(max-width:700px)').matches;
    const d=mobile?{vb:'0 0 390 430',center:205,unit:82,top:50,row:58,left:123,right:287,axis:414,labelX:10,stateX:380}:{vb:'0 0 960 390',center:575,unit:170,top:60,row:50,left:405,right:745,axis:365,labelX:20,stateX:930};svg.setAttribute('viewBox',d.vb);svg.dataset.chartLayout=mobile?'mobile':'desktop';
    const add=(tag,attrs,text)=>{const e=document.createElementNS(ns,tag);Object.entries(attrs||{}).forEach(([k,v])=>e.setAttribute(k,String(v)));if(text!==undefined)e.textContent=text;svg.appendChild(e);return e;};
    [-1,0,1].forEach(score=>{const x=d.center+score*d.unit;add('line',{x1:x,x2:x,y1:35,y2:385,class:score===0?'zero':'grid'});add('text',{x,y:d.axis,'text-anchor':'middle',class:'axis-label'},score===-1?'Headwind':score===1?'Support':'Mixed');});
    bundle.scenario.forceMap.forEach((f,i)=>{const y=d.top+i*d.row,score=Math.max(-1,Math.min(1,f.score));add('text',{x:d.labelX,y,class:'driver-label'},f.name);add('text',{x:d.stateX,y,'text-anchor':'end',class:'state-label'},f.direction);add('line',{x1:d.left,x2:d.right,y1:y+14,y2:y+14,class:'grid'});const x2=d.center+score*d.unit,x=Math.min(d.center,x2),w=Math.max(8,Math.abs(x2-d.center));add('rect',{x:score===0?d.center-4:x,y:y+3,width:score===0?8:w,height:22,rx:6,class:score>0?'bar-support':score<0?'bar-headwind':'bar-mixed'});});
  }

  function renderTables(bundle){
    const s=bundle.scenario,ref=s.referencePhysical;els.comparisonBody.innerHTML='';PHYSICAL_ORDER.forEach(k=>{const tr=document.createElement('tr'),change=ref[k]===0?0:(s.physical[k]/ref[k]-1)*100;tr.innerHTML=`<td>${PHYSICAL_LABELS[k]}</td><td>${qty(ref[k])}</td><td class="${Math.abs(change)>1e-8?'changed':''}">${qty(s.physical[k])}</td><td>${Math.abs(change)<1e-8?'—':`${change>0?'+':''}${fmt(change,1)}%`}</td>`;els.comparisonBody.appendChild(tr);});
    els.supplyTable.innerHTML='';[["Reference",s.referenceTotals],["Scenario",s.totals]].forEach(([name,t])=>{const tr=document.createElement('tr');tr.innerHTML=`<td>${name}</td><td>${qty(t.totalSupply)}</td><td>${qty(t.totalDemand)}</td><td>${qty(t.balance)} · ${fmt(t.balanceRatio*100,1)}%</td>`;els.supplyTable.appendChild(tr);});
    els.forceTable.innerHTML='';s.forceMap.forEach(f=>{const tr=document.createElement('tr');tr.innerHTML=`<td>${f.name}</td><td>${f.label}</td><td>${f.direction}</td>`;els.forceTable.appendChild(tr);});
  }

  function changedDescriptions(s){
    const out=[];for(const k of s.changedPhysical){out.push(`${PHYSICAL_LABELS[k]} ${s.adjustments[k]>0?'+':''}${fmt(s.adjustments[k],1)}%`);}if(s.macroChanged)out.push(`Macro override: real yields ${s.macro.realYield}, U.S. dollar ${s.macro.dollar}`);return out;
  }

  function render(bundle,{syncAdvanced=true}={}){
    lastResult=bundle;window.__carrowmontSilverLastResult=bundle;const s=bundle.scenario;
    els.scenarioType.textContent=s.scenarioType==='reference'?'REFERENCE SNAPSHOT':'CUSTOM WHAT-IF SCENARIO';els.combined.textContent=s.combinedInterpretation;els.scenarioSummary.textContent=s.scenarioType==='reference'?`Completed-year ${silverRef.referenceYear} physical reference with dated macro conditions.`:`${s.changedPhysical.length+(s.macroChanged?1:0)} scenario area${s.changedPhysical.length+(s.macroChanged?1:0)===1?'':'s'} changed from reference.`;
    els.physical.textContent=s.balanceClass.label;els.physicalDetail.textContent=`${qty(Math.abs(s.totals.balance))} ${s.totals.balance<0?'deficit':'surplus'} · ${fmt(Math.abs(s.totals.balanceRatio)*100,1)}% of modeled demand.`;els.macro.textContent=s.macro.label;els.macroDetail.textContent=`Real-yield state ${s.macro.realYield>0?'supportive':s.macro.realYield<0?'headwind':'mixed'} · dollar state ${s.macro.dollar>0?'supportive':s.macro.dollar<0?'headwind':'mixed'}.`;
    els.modeledSupply.textContent=qty(s.totals.totalSupply);els.modeledDemand.textContent=qty(s.totals.totalDemand);const sd=s.totals.totalSupply-s.referenceTotals.totalSupply,dd=s.totals.totalDemand-s.referenceTotals.totalDemand;els.supplyDelta.textContent=`${sd===0?'No change':`${sd>0?'+':''}${qty(sd)} vs reference`}`;els.demandDelta.textContent=`${dd===0?'No change':`${dd>0?'+':''}${qty(dd)} vs reference`}`;
    els.interpretation.textContent=`${s.combinedInterpretation} The modeled annual flow is ${s.totals.balance<0?'in deficit':'in surplus'} by ${qty(Math.abs(s.totals.balance))}. This can contribute to physical ${s.totals.balance<0?'tightness':'availability'}, but annual flow alone does not measure all inventories or determine the future silver price.`;
    const changed=changedDescriptions(s);els.changesPanel.hidden=!changed.length;els.changedList.innerHTML='';changed.forEach(t=>{const li=document.createElement('li');li.textContent=t;els.changedList.appendChild(li);});
    document.querySelectorAll('.smse-change-tag').forEach(t=>{const key=t.dataset.tag;const changedMap={industrial:s.changedPhysical.includes('industrial'),investment:s.changedPhysical.includes('physicalInvestment'),mine:s.changedPhysical.includes('mineProduction'),recycling:s.changedPhysical.includes('recycling'),monetary:s.macroChanged};t.hidden=!changedMap[key];});
    drawSupplyChart(bundle);drawForceMap(bundle);renderTables(bundle);if(syncAdvanced)syncAdvancedFromResult(bundle);
  }

  function runScenario(){try{els.validation.textContent='';const bundle=makeBundle();render(bundle,{syncAdvanced:!advancedDirty});setAction('Scenario updated.');}catch(err){els.validation.textContent=err.message;setAction('',true);}}
  function reset(){advancedDirty=false;setSimpleReference();buildAdvancedFields();const b=makeBundle();render(b);setAction('Reference snapshot restored.');}
  function applyPreset(name){advancedDirty=false;setSimpleReference();buildAdvancedFields();const p=Core().scenarioPreset(name),map={industrial:'industrial',physicalInvestment:'investment',mineProduction:'mine',recycling:'recycling'};Object.entries(p.adjustments||{}).forEach(([k,v])=>{const simpleKey=map[k];const select=els[simpleKey];if(!select)return;const table=Core().SIMPLE_STEPS[k];const match=Object.entries(table).find(([,pct])=>pct===v);if(match)select.value=match[0];});if(p.macroScores){advancedDirty=true;document.getElementById('adv-realYield').value=String(p.macroScores.realYield);document.getElementById('adv-dollar').value=String(p.macroScores.dollar);}
    runScenario();
  }

  function copySummary(){if(!lastResult)return;const s=lastResult.scenario,changed=changedDescriptions(s);const lines=[`Carrowmont Silver Supply, Demand & Macro Stress Explorer`,`Reference year: ${silverRef.referenceYear}`,`Modeled total supply: ${qty(s.totals.totalSupply)}`,`Modeled total demand: ${qty(s.totals.totalDemand)}`,`Modeled balance: ${qty(s.totals.balance)} (${fmt(s.totals.balanceRatio*100,1)}% of demand)`,`Physical classification: ${s.balanceClass.label}`,`Macro backdrop: ${s.macro.label}`,`Combined interpretation: ${s.combinedInterpretation}`,`Changed assumptions: ${changed.length?changed.join('; '):'None — reference snapshot'}`,`Important: A deficit can contribute to physical tightness but does not guarantee a price response. This is educational scenario analysis, not investment advice.`,`https://carrowmont.com/silver-supply-demand-macro-stress-explorer.html`];navigator.clipboard.writeText(lines.join('\n')).then(()=>setAction('Summary copied.'),()=>setAction('Could not copy summary.',true));}
  function downloadCsv(){if(!lastResult)return;const s=lastResult.scenario,rows=[['reference_year','scenario_identifier','component','unit','reference_moz','scenario_moz','adjustment_pct','modeled_total_supply_moz','modeled_total_demand_moz','balance_moz','balance_ratio_pct','physical_balance_classification','macro_backdrop','real_yield_state','us_dollar_state'],...PHYSICAL_ORDER.map(k=>[silverRef.referenceYear,s.scenarioType,PHYSICAL_LABELS[k],'million_troy_ounces',s.referencePhysical[k],s.physical[k],s.referencePhysical[k]===0?0:(s.physical[k]/s.referencePhysical[k]-1)*100,s.totals.totalSupply,s.totals.totalDemand,s.totals.balance,s.totals.balanceRatio*100,s.balanceClass.label,s.macro.label,s.macro.realYield>0?'Supportive':s.macro.realYield<0?'Headwind':'Mixed',s.macro.dollar>0?'Supportive':s.macro.dollar<0?'Headwind':'Mixed'])];const blob=new Blob([rows.map(r=>r.map(escapeCsv).join(',')).join('\n')],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='carrowmont-silver-supply-demand-scenario.csv';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);setAction('CSV downloaded.');}
  async function report(){if(!lastResult||!window.CarrowmontSilverReport?.generate)return setAction('Report helper unavailable.',true);try{els.report.disabled=true;setAction('Generating report…');await window.CarrowmontSilverReport.generate(lastResult,{supplySvg:els.supplyChart,forceSvg:els.forceMap,unit});setAction('Report has been downloaded.');}catch(err){setAction(err.message||'Could not generate report.',true);}finally{els.report.disabled=false;}}

  async function init(){
    try{
      const [s,g]=await Promise.all([fetch('data/silver-market-reference.json',{cache:'no-store'}),fetch('data/gold-macro-reference.json',{cache:'no-store'})]);if(!s.ok||!g.ok)throw new Error('Could not load bundled reference data.');silverRef=await s.json();goldRef=await g.json();if(silverRef.schemaVersion!==1||silverRef.methodologyVersion!==Core().METHODOLOGY_VERSION)throw new Error('Silver reference metadata does not match the approved methodology.');Core().buildScenario(silverRef,goldRef,{});buildReferenceUi();buildAdvancedFields();render(makeBundle());
      els.explore.addEventListener('click',runScenario);els.reset.addEventListener('click',reset);els.presets.querySelectorAll('button[data-preset]').forEach(b=>b.addEventListener('click',()=>applyPreset(b.dataset.preset)));els.copy.addEventListener('click',copySummary);els.csv.addEventListener('click',downloadCsv);els.report.addEventListener('click',report);
      document.querySelectorAll('.smse-unit-toggle button').forEach(btn=>btn.addEventListener('click',()=>{const next=btn.dataset.unit;if(next===unit)return;unit=next;document.querySelectorAll('.smse-unit-toggle button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.unit===unit)));if(lastResult){advancedDirty=false;syncAdvancedFromResult(lastResult);render(lastResult,{syncAdvanced:false});}}));
      window.addEventListener('resize',()=>{if(lastResult){drawSupplyChart(lastResult);drawForceMap(lastResult);}});
    }catch(err){els.validation.textContent=err.message;els.snapshotDate.textContent='Reference unavailable';els.explore.disabled=true;els.report.disabled=true;}
  }
  init();
})();

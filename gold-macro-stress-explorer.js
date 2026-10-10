(function(){
  'use strict';
  const Core=()=>window.CarrowmontGoldMacroCore;
  const DRIVER_META={
    realYield:{name:'Real yields',referenceKey:'realYields',options:[[-2,'Strong headwind'],[-1,'Headwind'],[0,'Mixed'],[1,'Supportive'],[2,'Very supportive']]},
    dollar:{name:'U.S. dollar',referenceKey:'dollar',options:[[-2,'Strong headwind'],[-1,'Headwind'],[0,'Mixed'],[1,'Supportive'],[2,'Very supportive']]},
    inflation:{name:'Inflation pressure',referenceKey:'inflation',options:[[-2,'Strong low-inflation headwind'],[-1,'Low-inflation headwind'],[0,'Mixed'],[1,'Support'],[2,'Strong support']]},
    centralBank:{name:'Central-bank demand',referenceKey:'centralBankDemand',options:[[-2,'Strong net selling'],[-1,'Weak demand'],[0,'Typical / mixed'],[1,'Strong demand'],[2,'Very strong demand']]},
    fiscal:{name:'Fiscal stress',referenceKey:'fiscalStress',options:[[-1,'Low / improving'],[0,'Normal / mixed'],[1,'Elevated'],[2,'Very elevated']]},
    stress:{name:'Geopolitical / financial stress',referenceKey:'stress',options:[[-1,'Low'],[0,'Normal / mixed'],[1,'Elevated'],[2,'Very elevated']]}
  };
  const els={
    snapshotDate:document.getElementById('snapshotDate'),referenceList:document.getElementById('referenceList'),driverControls:document.getElementById('driverControls'),
    explore:document.getElementById('exploreBtn'),reset:document.getElementById('resetBtn'),presets:document.getElementById('scenarioPresets'),validation:document.getElementById('validationMessage'),
    scenarioType:document.getElementById('scenarioType'),environmentLabel:document.getElementById('environmentLabel'),forceCounts:document.getElementById('forceCounts'),conflict:document.getElementById('conflictBadge'),
    supportHeadline:document.getElementById('supportHeadline'),supportDetail:document.getElementById('supportDetail'),headwindHeadline:document.getElementById('headwindHeadline'),headwindDetail:document.getElementById('headwindDetail'),
    interpretation:document.getElementById('interpretation'),changesPanel:document.getElementById('changesPanel'),changedList:document.getElementById('changedList'),
    actionMessage:document.getElementById('actionMessage'),copy:document.getElementById('copySummaryBtn'),csv:document.getElementById('downloadCsvBtn'),report:document.getElementById('generateReportBtn'),
    chart:document.getElementById('forceMap'),chartTable:document.getElementById('forceMapTable'),comparisonBody:document.querySelector('#comparisonTable tbody'),referenceDataBody:document.getElementById('referenceDataBody'),sourceDateCopy:document.getElementById('sourceDateCopy')
  };
  let reference=null, referenceScores=null,lastResult=null;

  const fmtDate=value=>{if(!value)return '—';if(/^\d{4}-\d{2}$/.test(value)){const [y,m]=value.split('-').map(Number);return new Intl.DateTimeFormat('en',{month:'short',year:'numeric'}).format(new Date(Date.UTC(y,m-1,1)));}const d=new Date(`${value}T00:00:00Z`);return Number.isNaN(d.getTime())?String(value):new Intl.DateTimeFormat('en',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(d);};
  const fmtNum=(v,d=1)=>Number(v).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
  function setAction(text,isError=false){els.actionMessage.textContent=text||'';els.actionMessage.style.color=isError?'#9d3d3d':'';}
  function escapeCsv(value){const s=String(value??'');return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;}
  function scoreWord(score){return score>0?'Supportive':score<0?'Headwind':'Mixed';}

  function referenceValueLabel(key){
    const d=reference.drivers;
    if(key==='realYield')return `${fmtNum(d.realYields.value,3)}% · 5-day average`;
    if(key==='dollar')return `${fmtNum(d.dollar.value,2)} · 5-day average`;
    if(key==='inflation')return `${fmtNum(d.inflation.value,1)}% YoY CPI-U`;
    if(key==='centralBank')return `${fmtNum(d.centralBankDemand.trailingFourQuarterTonnes,1)} tonnes · trailing 4Q`;
    if(key==='fiscal')return `Debt ${fmtNum(d.fiscalStress.metrics.debtHeldByPublicPctGdp2026,0)}% of GDP · net interest ${fmtNum(d.fiscalStress.metrics.netInterestPctGdp2026,1)}%`;
    if(key==='stress')return `GPR ${fmtNum(d.stress.gprFourWeekAverage,1)} · OFR FSI ${fmtNum(d.stress.ofrFourWeekAverage,2)}`;
    return '—';
  }
  function referencePeriod(key){
    const d=reference.drivers;
    if(key==='realYield')return d.realYields.asOf;
    if(key==='dollar')return d.dollar.asOf;
    if(key==='inflation')return d.inflation.asOf;
    if(key==='centralBank')return d.centralBankDemand.asOfQuarter;
    if(key==='fiscal')return d.fiscalStress.sourceDate;
    return `${d.stress.gprAsOf} / ${d.stress.ofrAsOf}`;
  }
  function referenceSource(key){
    const d=reference.drivers;
    if(key==='realYield')return d.realYields.source;
    if(key==='dollar')return d.dollar.source;
    if(key==='inflation')return d.inflation.source;
    if(key==='centralBank')return d.centralBankDemand.source;
    if(key==='fiscal')return `${d.fiscalStress.source} — ${d.fiscalStress.sourceBaseline}`;
    return `${d.stress.gprSource}; ${d.stress.ofrSource}`;
  }

  function validateReference(data){
    if(!data||data.schemaVersion!==1||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(data.snapshotDate||''))throw new Error('Reference snapshot metadata is invalid.');
    const calculated=Core().referenceScores(data);
    const stored={realYield:data.drivers.realYields.referenceScore,dollar:data.drivers.dollar.referenceScore,inflation:data.drivers.inflation.referenceScore,centralBank:data.drivers.centralBankDemand.referenceScore,fiscal:data.drivers.fiscalStress.referenceScore,stress:data.drivers.stress.referenceScore};
    Core().DRIVER_ORDER.forEach(k=>{if(Number(calculated[k])!==Number(stored[k]))throw new Error(`Reference score mismatch for ${k}.`);});
    return calculated;
  }

  function buildReferenceUi(){
    els.snapshotDate.textContent=`Snapshot updated ${fmtDate(reference.snapshotDate)}`;
    els.referenceList.innerHTML='';els.driverControls.innerHTML='';els.referenceDataBody.innerHTML='';
    Core().DRIVER_ORDER.forEach(key=>{
      const meta=DRIVER_META[key],score=referenceScores[key];
      const row=document.createElement('div');row.className='gmse-reference-row';row.innerHTML=`<span>${meta.name}</span><strong>${Core().stateLabel(key,score)}</strong>`;els.referenceList.appendChild(row);
      const label=document.createElement('label');label.className='gmse-field';label.dataset.driver=key;label.htmlFor=`driver-${key}`;label.innerHTML=`<span>${meta.name}<em class="gmse-change-tag" hidden>Changed</em></span><select id="driver-${key}" data-driver="${key}" aria-label="${meta.name} scenario state">${meta.options.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select>`;els.driverControls.appendChild(label);label.querySelector('select').value=String(score);
      const tr=document.createElement('tr');tr.innerHTML=`<td>${meta.name}</td><td>${referenceValueLabel(key)}</td><td>${referencePeriod(key)}</td><td>${referenceSource(key)}</td><td>${Core().stateLabel(key,score)}</td>`;els.referenceDataBody.appendChild(tr);
    });
    const dates=Core().DRIVER_ORDER.map(referencePeriod).join(' · ');els.sourceDateCopy.textContent=`The bundled Carrowmont reference snapshot is dated ${fmtDate(reference.snapshotDate)}. Underlying source periods differ by driver (${dates}). The visitor's browser makes no external macro-data request.`;
  }
  function readOverrides(){const out={};document.querySelectorAll('#driverControls select[data-driver]').forEach(s=>{out[s.dataset.driver]=Number(s.value);});return out;}
  function updateChangedStyling(scenario){
    Core().DRIVER_ORDER.forEach(key=>{const f=document.querySelector(`.gmse-field[data-driver="${key}"]`);const changed=scenario.isUserOverride[key];f.classList.toggle('is-changed',changed);const tag=f.querySelector('.gmse-change-tag');tag.hidden=!changed;});
  }
  function resultBundle(){const scenario=Core().buildScenario(referenceScores,readOverrides());return Object.freeze({methodologyVersion:Core().METHODOLOGY_VERSION,snapshotDate:reference.snapshotDate,reference,referenceScores,scenario});}

  function drawChartSvg(svg,bundle,layout='desktop'){
    [...svg.children].slice(2).forEach(n=>n.remove());
    const ns='http://www.w3.org/2000/svg';
    const mobile=layout==='mobile';
    const dims=mobile
      ? {viewBox:'0 0 390 430',center:195,unit:65,top:52,rowH:57,leftPlot:65,rightPlot:325,gridTop:62,gridBottom:383,axisY:414,labelX:12,stateX:378,barOffset:12,lineOffset:24,barH:22}
      : {viewBox:'0 0 960 390',center:565,unit:125,top:62,rowH:50,leftPlot:315,rightPlot:815,gridTop:39,gridBottom:344,axisY:365,labelX:20,stateX:925,barOffset:4,lineOffset:16,barH:24};
    svg.setAttribute('viewBox',dims.viewBox);svg.dataset.chartLayout=layout;
    const add=(tag,attrs,text)=>{const el=document.createElementNS(ns,tag);Object.entries(attrs||{}).forEach(([k,v])=>el.setAttribute(k,String(v)));if(text!==undefined)el.textContent=text;svg.appendChild(el);return el;};
    [-2,-1,0,1,2].forEach(score=>{const x=dims.center+score*dims.unit;add('line',{x1:x,x2:x,y1:dims.gridTop,y2:dims.gridBottom,class:score===0?'zero':'grid'});add('text',{x,y:dims.axisY,'text-anchor':'middle',class:'axis-label'},score>0?`+${score}`:String(score));});
    bundle.scenario.environment.drivers.forEach((d,i)=>{
      const y=dims.top+i*dims.rowH,score=d.score,x2=dims.center+score*dims.unit;
      add('text',{x:dims.labelX,y,class:'driver-label'},d.name);
      add('text',{x:dims.stateX,y,'text-anchor':'end',class:'state-label'},`${score>0?'+':''}${score} · ${scoreWord(score)}`);
      add('line',{x1:dims.leftPlot,x2:dims.rightPlot,y1:y+dims.lineOffset,y2:y+dims.lineOffset,class:'grid'});
      const x=Math.min(dims.center,x2),w=Math.max(8,Math.abs(x2-dims.center));
      add('rect',{x:score===0?dims.center-4:x,y:y+dims.barOffset,width:score===0?8:w,height:dims.barH,rx:6,class:score>0?'bar-support':score<0?'bar-headwind':'bar-mixed'});
    });
    return svg;
  }
  function exportChartSvg(bundle){
    const holder=document.createElement('div');holder.setAttribute('aria-hidden','true');Object.assign(holder.style,{position:'fixed',left:'-2000px',top:'0',width:'960px',height:'390px',overflow:'hidden',pointerEvents:'none'});const svg=els.chart.cloneNode(true);drawChartSvg(svg,bundle,'desktop');svg.removeAttribute('id');holder.appendChild(svg);document.body.appendChild(holder);return{svg,holder};
  }
  function renderChart(bundle){
    const layout=window.matchMedia('(max-width: 700px)').matches?'mobile':'desktop';drawChartSvg(els.chart,bundle,layout);
    els.chartTable.innerHTML='';bundle.scenario.environment.drivers.forEach(d=>{const tr=document.createElement('tr');tr.innerHTML=`<td>${d.name}</td><td>${d.stateLabel}</td><td>${d.direction}</td>`;els.chartTable.appendChild(tr);});
  }

  function renderComparison(bundle){
    els.comparisonBody.innerHTML='';Core().DRIVER_ORDER.forEach(key=>{const ref=referenceScores[key],cur=bundle.scenario.scores[key],changed=bundle.scenario.isUserOverride[key];const tr=document.createElement('tr');tr.innerHTML=`<td>${DRIVER_META[key].name}</td><td>${Core().stateLabel(key,ref)}</td><td>${Core().stateLabel(key,cur)}</td><td class="${changed?'changed':''}">${changed?'Yes':'No'}</td>`;els.comparisonBody.appendChild(tr);});
  }
  function renderResult(bundle){
    lastResult=bundle;window.__carrowmontGoldLastResult=bundle;const s=bundle.scenario,e=s.environment;
    els.scenarioType.textContent=s.scenarioType==='reference'?'REFERENCE SNAPSHOT':'CUSTOM WHAT-IF SCENARIO';els.environmentLabel.textContent=e.label;els.forceCounts.textContent=`${e.supportiveCount} supportive force${e.supportiveCount===1?'':'s'} · ${e.headwindCount} headwind${e.headwindCount===1?'':'s'} · ${e.mixedCount} mixed`;els.conflict.hidden=!e.hasConflict;
    const sup=e.strongestSupport,head=e.strongestHeadwinds;els.supportHeadline.textContent=sup.length?sup.map(x=>x.name).join(' · '):'No supportive force';els.supportDetail.textContent=sup.length?sup.map(x=>x.stateLabel).join(' · '):'None of the six drivers is supportive in this scenario.';els.headwindHeadline.textContent=head.length?head.map(x=>x.name).join(' · '):'No macro headwind';els.headwindDetail.textContent=head.length?head.map(x=>x.stateLabel).join(' · '):'None of the six drivers is a headwind in this scenario.';els.interpretation.textContent=s.interpretation;
    els.changesPanel.hidden=s.changedDrivers.length===0;els.changedList.innerHTML='';s.changedDrivers.forEach(d=>{const li=document.createElement('li');li.textContent=`${d.name}: ${d.fromState} → ${d.toState}.`;els.changedList.appendChild(li);});updateChangedStyling(s);renderChart(bundle);renderComparison(bundle);
  }
  function calculate(){if(!reference)return null;try{const bundle=resultBundle();els.validation.textContent='';renderResult(bundle);return bundle;}catch(error){els.validation.textContent='The selected scenario could not be classified. Reset the controls and try again.';console.error(error);return null;}}
  function reset(){if(!referenceScores)return;Core().DRIVER_ORDER.forEach(k=>{const el=document.getElementById(`driver-${k}`);if(el)el.value=String(referenceScores[k]);});setAction('');calculate();}
  function applyPreset(name){reset();const set=(k,v)=>{const el=document.getElementById(`driver-${k}`);if(el)el.value=String(v);};if(name==='lower-real-yields')set('realYield',2);if(name==='higher-real-yields')set('realYield',-2);if(name==='dollar-weakness')set('dollar',2);if(name==='inflation-shock')set('inflation',2);if(name==='central-bank-demand')set('centralBank',2);if(name==='stress-shock'){set('fiscal',2);set('stress',2);}calculate();}

  function buildSummary(bundle=lastResult){if(!bundle)return'';const s=bundle.scenario,e=s.environment,lines=['Carrowmont — Gold Under Macro Stress Explorer',`Scenario: ${s.scenarioType==='reference'?'Reference Snapshot':'Custom What-if Scenario'}`,`Reference snapshot date: ${bundle.snapshotDate}`,`Overall macro environment: ${e.label}`,`${e.supportiveCount} supportive · ${e.headwindCount} headwind · ${e.mixedCount} mixed`,e.hasConflict?'Competing forces are present.':''];lines.push('', 'Driver states:');e.drivers.forEach(d=>lines.push(`${d.name}: ${d.stateLabel} (${d.direction})${s.isUserOverride[d.key]?' [changed from reference]':''}`));if(s.changedDrivers.length){lines.push('','Changed from reference:');s.changedDrivers.forEach(d=>lines.push(`${d.name}: ${d.fromState} -> ${d.toState}`));}lines.push('',`Interpretation: ${s.interpretation}`,'','This describes a macro environment, not a gold-price forecast or investment recommendation.');return lines.filter((x,i)=>x!==''||lines[i-1]!=='').join('\n');}
  async function copySummary(){if(!lastResult)return;try{await navigator.clipboard.writeText(buildSummary());setAction('Summary copied.');}catch(error){console.error(error);setAction('Copy was blocked by the browser. Please try again.',true);}}
  function csvText(bundle=lastResult){if(!bundle)return'';const rows=[['Carrowmont Gold Under Macro Stress Explorer'],['Scenario type',bundle.scenario.scenarioType],['Reference snapshot date',bundle.snapshotDate],['Overall macro environment',bundle.scenario.environment.label],['Supportive forces',bundle.scenario.environment.supportiveCount],['Headwinds',bundle.scenario.environment.headwindCount],['Mixed forces',bundle.scenario.environment.mixedCount],[],['Driver','Scenario score','Scenario state','Reference score','Reference state','Reference value','Reference unit/context','Reference as-of / period','Source','User override']];Core().DRIVER_ORDER.forEach(key=>{const d=bundle.scenario.environment.drivers.find(x=>x.key===key);rows.push([DRIVER_META[key].name,d.score,d.stateLabel,bundle.referenceScores[key],Core().stateLabel(key,bundle.referenceScores[key]),referenceValueLabel(key),bundle.reference.drivers[DRIVER_META[key].referenceKey]?.unit||'',referencePeriod(key),referenceSource(key),bundle.scenario.isUserOverride[key]?'yes':'no']);});rows.push([],['Disclaimer','Macro-environment framework only; not a gold-price forecast or investment recommendation.']);return rows.map(r=>r.map(escapeCsv).join(',')).join('\n');}
  function downloadCsv(){if(!lastResult)return;const blob=new Blob([csvText()],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='carrowmont-gold-macro-stress-scenario.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setAction('CSV downloaded.');}
  async function generateReport(){if(!lastResult||!window.CarrowmontGoldMacroPdf){setAction('Report helper is unavailable.',true);return;}const old=els.report.textContent;let exportChart=null;els.report.disabled=true;els.report.textContent='Generating Report…';try{exportChart=exportChartSvg(lastResult);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));await window.CarrowmontGoldMacroPdf.generate(lastResult,{chartSvg:exportChart.svg});setAction('Report has been downloaded.');}catch(error){console.error(error);setAction('The report could not be generated. Please try again.',true);}finally{if(exportChart)exportChart.holder.remove();els.report.disabled=false;els.report.textContent=old;}}

  async function loadReference(){const response=await fetch('data/gold-macro-reference.json',{cache:'no-store'});if(!response.ok)throw new Error(`Reference data HTTP ${response.status}`);const data=await response.json();reference=data;referenceScores=validateReference(data);buildReferenceUi();calculate();}

  els.explore.addEventListener('click',()=>{setAction('');calculate();});els.reset.addEventListener('click',reset);els.copy.addEventListener('click',copySummary);els.csv.addEventListener('click',downloadCsv);els.report.addEventListener('click',generateReport);els.driverControls.addEventListener('change',calculate);els.presets.addEventListener('click',event=>{const b=event.target.closest('button[data-preset]');if(b)applyPreset(b.dataset.preset);});window.addEventListener('resize',()=>{if(lastResult)renderChart(lastResult);});
  loadReference().catch(error=>{console.error(error);els.snapshotDate.textContent='Reference unavailable';els.validation.textContent='The explorer cannot run until its validated bundled reference snapshot is available.';[els.explore,els.copy,els.csv,els.report].forEach(b=>{b.disabled=true;});});
})();

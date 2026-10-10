(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.CarrowmontSilverMacroCore=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const METHODOLOGY_VERSION='silver-supply-demand-macro-v1.0';
  const MOZ_TO_TONNES=31.1034768;
  const ADJUSTABLE=['industrial','physicalInvestment','mineProduction','recycling'];
  const PHYSICAL_FIELDS=['mineProduction','recycling','otherSupply','industrial','physicalInvestment','jewelry','silverware','photography','otherDemand'];
  const SIMPLE_STEPS=Object.freeze({industrial:{weak:-5,reference:0,strong:5},physicalInvestment:{weak:-10,reference:0,strong:10},mineProduction:{weak:-2,reference:0,strong:2},recycling:{weak:-10,reference:0,strong:10}});

  const finite=v=>Number.isFinite(Number(v));
  const pct=(value,base)=>base===0?0:(value/base-1)*100;
  const clampScore=v=>Math.max(-2,Math.min(2,Math.round(Number(v)||0)));
  const round=(n,d=6)=>Number(Number(n).toFixed(d));
  function assertNonNegative(name,value){if(!finite(value)||Number(value)<0)throw new Error(`${name} must be a finite non-negative number.`);return Number(value);}

  function normalizePhysicalReference(reference={}){
    const s=reference.supply||{},d=reference.demand||{};
    return Object.freeze({
      mineProduction:assertNonNegative('Mine production',s.mineProductionMoz),
      recycling:assertNonNegative('Recycling',s.recyclingMoz),
      otherSupply:assertNonNegative('Other supply',s.otherSupplyMoz||0),
      industrial:assertNonNegative('Industrial demand',d.industrialMoz),
      physicalInvestment:assertNonNegative('Physical investment demand',d.physicalInvestmentMoz),
      jewelry:assertNonNegative('Jewelry demand',d.jewelryMoz||0),
      silverware:assertNonNegative('Silverware demand',d.silverwareMoz||0),
      photography:assertNonNegative('Photography demand',d.photographyMoz||0),
      otherDemand:assertNonNegative('Other demand',d.otherDemandMoz||0)
    });
  }

  function totalsFromPhysical(p){
    const totalSupply=p.mineProduction+p.recycling+p.otherSupply;
    const totalDemand=p.industrial+p.physicalInvestment+p.jewelry+p.silverware+p.photography+p.otherDemand;
    const balance=totalSupply-totalDemand;
    const balanceRatio=totalDemand===0?0:balance/totalDemand;
    return Object.freeze({totalSupply,totalDemand,balance,balanceRatio});
  }

  function classifyBalanceRatio(ratio){
    const r=Number(ratio);
    if(!finite(r))throw new Error('Invalid balance ratio.');
    if(r<=-0.05)return Object.freeze({key:'large-deficit',label:'Large modeled deficit',shortLabel:'Large deficit',direction:'support'});
    if(r<=-0.02)return Object.freeze({key:'deficit',label:'Modeled deficit',shortLabel:'Deficit',direction:'support'});
    if(r<0.02)return Object.freeze({key:'near-balance',label:'Near balance',shortLabel:'Near balance',direction:'mixed'});
    if(r<0.05)return Object.freeze({key:'surplus',label:'Modeled surplus',shortLabel:'Surplus',direction:'headwind'});
    return Object.freeze({key:'large-surplus',label:'Large modeled surplus',shortLabel:'Large surplus',direction:'headwind'});
  }

  function macroReferenceScores(goldReference={}){
    const d=goldReference.drivers||{};
    if(!d.realYields||!d.dollar)throw new Error('Approved macro reference is missing real-yield or dollar data.');
    return Object.freeze({realYield:clampScore(d.realYields.referenceScore),dollar:clampScore(d.dollar.referenceScore)});
  }

  function classifyMacro(scores={}){
    const realYield=clampScore(scores.realYield),dollar=clampScore(scores.dollar),sum=realYield+dollar;
    const label=sum>=1?'Supportive':sum<=-1?'Adverse':'Mixed';
    return Object.freeze({realYield,dollar,sum,label});
  }

  function combinedInterpretation(balanceClass,macroLabel){
    const p=balanceClass.key;
    if((p==='deficit'||p==='large-deficit')&&macroLabel==='Supportive')return 'Physical and macro conditions are both supportive in the framework.';
    if((p==='deficit'||p==='large-deficit')&&macroLabel==='Adverse')return 'Physical support with macro headwinds.';
    if((p==='deficit'||p==='large-deficit')&&macroLabel==='Mixed')return 'Physical-market support with a mixed macro backdrop.';
    if(p==='near-balance'&&macroLabel==='Supportive')return 'Macro support with a balanced physical market.';
    if(p==='near-balance'&&macroLabel==='Adverse')return 'A balanced physical market with macro headwinds.';
    if(p==='near-balance'&&macroLabel==='Mixed')return 'Mixed / balanced environment.';
    if((p==='surplus'||p==='large-surplus')&&macroLabel==='Supportive')return 'Macro support with physical-market headwinds.';
    if((p==='surplus'||p==='large-surplus')&&macroLabel==='Adverse')return 'Physical and macro headwinds.';
    return 'Physical-market headwinds with a mixed macro backdrop.';
  }

  function stateFromAdjustment(key,adjustment){
    const a=Number(adjustment)||0;
    if(Math.abs(a)<1e-9)return Object.freeze({score:0,label:'Reference',direction:'Mixed'});
    const demand=key==='industrial'||key==='physicalInvestment';
    const supportive=demand?a>0:a<0;
    const score=supportive?1:-1;
    return Object.freeze({score,label:a>0?`+${round(a,1)}%`:`${round(a,1)}%`,direction:supportive?'Supportive':'Headwind'});
  }

  function scenarioPreset(name){
    const presets={
      'industrial-surge':{adjustments:{industrial:5}},
      'investment-surge':{adjustments:{physicalInvestment:10}},
      'mine-disruption':{adjustments:{mineProduction:-2}},
      'strong-recycling':{adjustments:{recycling:10}},
      'industrial-slowdown':{adjustments:{industrial:-5}},
      'deficit-strong-dollar':{adjustments:{industrial:5},macroScores:{dollar:-2,realYield:-1}}
    };
    const p=presets[name];
    if(!p)throw new Error('Unknown scenario preset.');
    return JSON.parse(JSON.stringify(p));
  }

  function buildScenario(reference={},goldReference={},options={}){
    const ref=normalizePhysicalReference(reference);
    const refTotals=totalsFromPhysical(ref);
    const adj={industrial:0,physicalInvestment:0,mineProduction:0,recycling:0,...(options.adjustments||{})};
    ADJUSTABLE.forEach(k=>{if(!finite(adj[k]))throw new Error(`Invalid ${k} adjustment.`);adj[k]=Number(adj[k]);});
    const physical={...ref};
    ADJUSTABLE.forEach(k=>{physical[k]=ref[k]*(1+adj[k]/100);});
    if(options.absolute&&typeof options.absolute==='object'){
      PHYSICAL_FIELDS.forEach(k=>{if(Object.prototype.hasOwnProperty.call(options.absolute,k)&&options.absolute[k]!==''&&options.absolute[k]!==null){physical[k]=assertNonNegative(k,options.absolute[k]);if(ADJUSTABLE.includes(k))adj[k]=pct(physical[k],ref[k]);}});
    }
    PHYSICAL_FIELDS.forEach(k=>{physical[k]=assertNonNegative(k,physical[k]);});
    const totals=totalsFromPhysical(physical);
    const balanceClass=classifyBalanceRatio(totals.balanceRatio);
    const refMacro=macroReferenceScores(goldReference);
    const macroScores={...refMacro,...(options.macroScores||{})};
    const macro=classifyMacro(macroScores);
    const changedPhysical=ADJUSTABLE.filter(k=>Math.abs(adj[k])>1e-9);
    const macroChanged=macro.realYield!==refMacro.realYield||macro.dollar!==refMacro.dollar;
    const forceMap=[
      Object.freeze({key:'industrial',name:'Industrial demand',...stateFromAdjustment('industrial',adj.industrial),reference:'Reference',scenario:`${round(adj.industrial,1)}%`} ),
      Object.freeze({key:'physicalInvestment',name:'Physical investment demand',...stateFromAdjustment('physicalInvestment',adj.physicalInvestment),reference:'Reference',scenario:`${round(adj.physicalInvestment,1)}%`} ),
      Object.freeze({key:'mineProduction',name:'Mine supply',...stateFromAdjustment('mineProduction',adj.mineProduction),reference:'Reference',scenario:`${round(adj.mineProduction,1)}%`} ),
      Object.freeze({key:'recycling',name:'Recycling',...stateFromAdjustment('recycling',adj.recycling),reference:'Reference',scenario:`${round(adj.recycling,1)}%`} ),
      Object.freeze({key:'realYield',name:'Real yields',score:macro.realYield,direction:macro.realYield>0?'Supportive':macro.realYield<0?'Headwind':'Mixed',label:macro.realYield>0?'Supportive':macro.realYield<0?'Headwind':'Mixed',reference:refMacro.realYield,scenario:macro.realYield}),
      Object.freeze({key:'dollar',name:'U.S. dollar',score:macro.dollar,direction:macro.dollar>0?'Supportive':macro.dollar<0?'Headwind':'Mixed',label:macro.dollar>0?'Supportive':macro.dollar<0?'Headwind':'Mixed',reference:refMacro.dollar,scenario:macro.dollar})
    ];
    return Object.freeze({
      methodologyVersion:METHODOLOGY_VERSION,
      referencePhysical:ref,
      referenceTotals:refTotals,
      physical:Object.freeze(physical),
      adjustments:Object.freeze(adj),
      totals,
      balanceClass,
      referenceMacro:refMacro,
      macro,
      combinedInterpretation:combinedInterpretation(balanceClass,macro.label),
      changedPhysical:Object.freeze(changedPhysical),
      macroChanged,
      scenarioType:changedPhysical.length||macroChanged?'custom':'reference',
      forceMap:Object.freeze(forceMap)
    });
  }

  function applySimpleState(options={},states={}){
    const out={adjustments:{...(options.adjustments||{})},macroScores:{...(options.macroScores||{})}};
    const map={industrial:'industrial',investment:'physicalInvestment',mine:'mineProduction',recycling:'recycling'};
    Object.entries(map).forEach(([stateKey,driver])=>{const state=states[stateKey]||'reference';const table=SIMPLE_STEPS[driver];if(!Object.prototype.hasOwnProperty.call(table,state))throw new Error(`Invalid ${stateKey} state.`);out.adjustments[driver]=table[state];});
    const monetary=states.monetary||'reference';
    if(monetary==='supportive')out.macroScores={realYield:1,dollar:1};
    else if(monetary==='adverse')out.macroScores={realYield:-1,dollar:-1};
    else if(monetary!=='reference')throw new Error('Invalid monetary state.');
    return out;
  }

  function toTonnes(moz){if(!finite(moz))throw new Error('Invalid Moz value.');return Number(moz)*MOZ_TO_TONNES;}
  function toMoz(tonnes){if(!finite(tonnes))throw new Error('Invalid tonne value.');return Number(tonnes)/MOZ_TO_TONNES;}

  return Object.freeze({METHODOLOGY_VERSION,MOZ_TO_TONNES,SIMPLE_STEPS,ADJUSTABLE,PHYSICAL_FIELDS,normalizePhysicalReference,totalsFromPhysical,classifyBalanceRatio,macroReferenceScores,classifyMacro,combinedInterpretation,stateFromAdjustment,scenarioPreset,buildScenario,applySimpleState,toTonnes,toMoz});
});

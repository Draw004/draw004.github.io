(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontGoldMacroCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const METHODOLOGY_VERSION = 'gold-macro-stress-v1.0';
  const DRIVER_ORDER = ['realYield','dollar','inflation','centralBank','fiscal','stress'];
  const WEIGHTS = Object.freeze({ realYield:1.5, dollar:1.5, inflation:1, centralBank:1, fiscal:1, stress:1 });
  const MAX_WEIGHTED_ABSOLUTE = 14;
  const NAMES = Object.freeze({
    realYield:'Real yields', dollar:'U.S. dollar', inflation:'Inflation pressure',
    centralBank:'Central-bank demand', fiscal:'Fiscal stress', stress:'Geopolitical / financial stress'
  });
  const STATE_LABELS = Object.freeze({
    realYield:{'-2':'Strong real-yield headwind','-1':'Real-yield headwind','0':'Mixed real-yield conditions','1':'Supportive real-yield conditions','2':'Very supportive real-yield conditions'},
    dollar:{'-2':'Strong dollar headwind','-1':'Dollar headwind','0':'Mixed dollar conditions','1':'Supportive dollar conditions','2':'Very supportive dollar conditions'},
    inflation:{'-2':'Strong low-inflation headwind','-1':'Low-inflation headwind','0':'Mixed inflation pressure','1':'Inflation support','2':'Strong inflation support'},
    centralBank:{'-2':'Strong net-selling headwind','-1':'Weak official demand','0':'Typical / mixed official demand','1':'Strong official demand','2':'Very strong official demand'},
    fiscal:{'-2':'Low / improving fiscal backdrop','-1':'Low / improving fiscal backdrop','0':'Normal / mixed fiscal backdrop','1':'Elevated fiscal stress','2':'Very elevated fiscal stress'},
    stress:{'-2':'Low stress','-1':'Low stress','0':'Normal / mixed stress','1':'Elevated stress','2':'Very elevated stress'}
  });

  const clamp = (value,min,max) => Math.min(max,Math.max(min,Number(value)));
  const finite = value => Number.isFinite(Number(value));
  const boundedScore = value => clamp(Math.round(Number(value)||0),-2,2);

  function percentileLowIsSupport(p){
    if (p <= 20) return 2;
    if (p <= 40) return 1;
    if (p <= 60) return 0;
    if (p <= 80) return -1;
    return -2;
  }
  function percentileHighIsSupport(p){
    if (p >= 80) return 2;
    if (p >= 60) return 1;
    if (p >= 40) return 0;
    if (p >= 20) return -1;
    return -2;
  }

  function classifyRealYield(metrics={}){
    const p=Number(metrics.fiveYearPercentile), t=Number(metrics.trend13WeekPp);
    if(!finite(p)||p<0||p>100||!finite(t)) throw new Error('Invalid real-yield reference metrics.');
    const baseScore=percentileLowIsSupport(p);
    const trendModifier=t<=-0.50?1:t>=0.50?-1:0;
    return Object.freeze({baseScore,trendModifier,score:clamp(baseScore+trendModifier,-2,2)});
  }
  function classifyDollar(metrics={}){
    const p=Number(metrics.fiveYearPercentile), t=Number(metrics.trend13WeekPct);
    if(!finite(p)||p<0||p>100||!finite(t)) throw new Error('Invalid dollar reference metrics.');
    const baseScore=percentileLowIsSupport(p);
    const trendModifier=t<=-3?1:t>=3?-1:0;
    return Object.freeze({baseScore,trendModifier,score:clamp(baseScore+trendModifier,-2,2)});
  }
  function classifyInflation(metrics={}){
    const p=Number(metrics.fiveYearPercentile), t=Number(metrics.trend3MonthPp);
    if(!finite(p)||p<0||p>100||!finite(t)) throw new Error('Invalid inflation reference metrics.');
    const baseScore=percentileHighIsSupport(p);
    const trendModifier=t>=0.50?1:t<=-0.50?-1:0;
    return Object.freeze({baseScore,trendModifier,score:clamp(baseScore+trendModifier,-2,2)});
  }

  // Reviewed V1 threshold table. Deliberately avoids bulk-republishing specialist history.
  function classifyCentralBankDemand(metrics={}){
    const tonnes=Number(metrics.trailingFourQuarterTonnes);
    if(!finite(tonnes)) throw new Error('Invalid central-bank demand metric.');
    let score;
    if(tonnes<0) score=-2;
    else if(tonnes<400) score=-1;
    else if(tonnes<700) score=0;
    else if(tonnes<1000) score=1;
    else score=2;
    return Object.freeze({score,method:'reviewed-threshold-v1'});
  }
  function classifyFiscalStress(metrics={}){
    const score=Math.round(Number(metrics.referenceScore));
    if(![-1,0,1,2].includes(score)) throw new Error('Fiscal stress reference score must be -1, 0, 1 or 2.');
    return Object.freeze({score});
  }
  function classifyStressSubscore(percentile){
    const p=Number(percentile);
    if(!finite(p)||p<0||p>100) throw new Error('Invalid stress percentile.');
    if(p<=30) return -1;
    if(p<70) return 0;
    if(p<90) return 1;
    return 2;
  }
  function combineStress(gprSubscore,ofrSubscore){
    const g=Math.round(Number(gprSubscore)),o=Math.round(Number(ofrSubscore));
    if(![-1,0,1,2].includes(g)||![-1,0,1,2].includes(o)) throw new Error('Invalid stress subscore.');
    if(g===2||o===2) return 2;
    if(g===1||o===1) return 1;
    if(g===-1&&o===-1) return -1;
    return 0;
  }
  function classifyStress(metrics={}){
    const gprSubscore=classifyStressSubscore(metrics.gprPercentile);
    const ofrSubscore=classifyStressSubscore(metrics.ofrPercentile);
    return Object.freeze({gprSubscore,ofrSubscore,score:combineStress(gprSubscore,ofrSubscore)});
  }

  function stateLabel(key,score){
    const k=String(boundedScore(score));
    return STATE_LABELS[key]?.[k] || 'Mixed';
  }
  function directionLabel(score){
    const s=boundedScore(score);
    return s>0?'Supportive':s<0?'Headwind':'Mixed';
  }
  function environmentLabel(normalized){
    const n=Number(normalized);
    if(n<=-0.60) return 'Strong macro headwinds';
    if(n< -0.15) return 'Macro headwinds';
    if(n<=0.15) return 'Mixed macro environment';
    if(n<0.60) return 'Supportive macro environment';
    return 'Strongly supportive macro environment';
  }

  function normalizeScores(raw={}){
    const out={}; DRIVER_ORDER.forEach(key=>{out[key]=boundedScore(raw[key]);}); return out;
  }

  function calculateEnvironment(rawScores={}){
    const scores=normalizeScores(rawScores);
    let weightedSum=0;
    const drivers=DRIVER_ORDER.map(key=>{
      const score=scores[key], weight=WEIGHTS[key], weightedContribution=score*weight;
      weightedSum+=weightedContribution;
      return Object.freeze({key,name:NAMES[key],score,weight,weightedContribution,stateLabel:stateLabel(key,score),direction:directionLabel(score)});
    });
    const normalized=weightedSum/MAX_WEIGHTED_ABSOLUTE;
    const hasSupport=drivers.some(d=>d.score>=1),hasHeadwind=drivers.some(d=>d.score<=-1);
    const supportiveCount=drivers.filter(d=>d.score>0).length,headwindCount=drivers.filter(d=>d.score<0).length,mixedCount=drivers.filter(d=>d.score===0).length;
    const strongestSupport=drivers.filter(d=>d.weightedContribution>0).sort((a,b)=>b.weightedContribution-a.weightedContribution||DRIVER_ORDER.indexOf(a.key)-DRIVER_ORDER.indexOf(b.key)).slice(0,3);
    const strongestHeadwinds=drivers.filter(d=>d.weightedContribution<0).sort((a,b)=>a.weightedContribution-b.weightedContribution||DRIVER_ORDER.indexOf(a.key)-DRIVER_ORDER.indexOf(b.key)).slice(0,3);
    return Object.freeze({scores:Object.freeze(scores),weightedSum,normalized,label:environmentLabel(normalized),hasSupport,hasHeadwind,hasConflict:hasSupport&&hasHeadwind,supportiveCount,headwindCount,mixedCount,drivers:Object.freeze(drivers),strongestSupport:Object.freeze(strongestSupport),strongestHeadwinds:Object.freeze(strongestHeadwinds)});
  }

  function buildInterpretation(environment){
    const supports=environment.strongestSupport.map(d=>d.name);
    const headwinds=environment.strongestHeadwinds.map(d=>d.name);
    const bits=[];
    if(environment.normalized>0.15){
      bits.push(supports.length?`The strongest supportive forces in this scenario are ${supports.join(', ')}.`:'Supportive forces are limited.');
      const major=environment.drivers.filter(d=>['realYield','dollar'].includes(d.key)&&d.score<0).map(d=>d.name);
      if(major.length) bits.push(`Important financial headwind${major.length>1?'s remain':' remains'}: ${major.join(' and ')}.`);
    } else if(environment.normalized<-0.15){
      bits.push(headwinds.length?`The strongest headwinds are ${headwinds.join(', ')}.`:'Headwinds dominate this scenario.');
      const safe=environment.drivers.filter(d=>['fiscal','stress'].includes(d.key)&&d.score>0).map(d=>d.name);
      if(safe.length) bits.push(`At the same time, ${safe.join(' and ')} provide${safe.length===1?'s':''} some macro support.`);
    } else {
      bits.push('Supportive and adverse forces are close enough that the framework classifies the overall environment as mixed.');
      if(supports.length) bits.push(`Support comes mainly from ${supports.join(', ')}.`);
      if(headwinds.length) bits.push(`Headwinds come mainly from ${headwinds.join(', ')}.`);
    }
    if(environment.hasConflict) bits.push('Competing forces are present, so one headline should not be treated as a complete gold thesis.');
    return bits.join(' ');
  }

  function referenceScores(reference={}){
    const d=reference.drivers||{};
    return Object.freeze({
      realYield:classifyRealYield(d.realYields).score,
      dollar:classifyDollar(d.dollar).score,
      inflation:classifyInflation(d.inflation).score,
      centralBank:classifyCentralBankDemand(d.centralBankDemand).score,
      fiscal:classifyFiscalStress(d.fiscalStress).score,
      stress:classifyStress(d.stress).score
    });
  }

  function buildScenario(referenceScoreInput={},userOverrides={}){
    const reference=normalizeScores(referenceScoreInput), scores={...reference}, isUserOverride={};
    DRIVER_ORDER.forEach(key=>{
      if(Object.prototype.hasOwnProperty.call(userOverrides,key) && userOverrides[key]!==null && userOverrides[key]!=='' && Number(userOverrides[key])!==reference[key]){
        scores[key]=boundedScore(userOverrides[key]); isUserOverride[key]=true;
      } else { isUserOverride[key]=false; }
    });
    const environment=calculateEnvironment(scores);
    const changedDrivers=DRIVER_ORDER.filter(k=>isUserOverride[k]).map(key=>Object.freeze({key,name:NAMES[key],fromScore:reference[key],toScore:scores[key],fromState:stateLabel(key,reference[key]),toState:stateLabel(key,scores[key])}));
    return Object.freeze({scenarioType:changedDrivers.length?'custom':'reference',referenceScores:Object.freeze(reference),scores:Object.freeze(scores),isUserOverride:Object.freeze(isUserOverride),changedDrivers:Object.freeze(changedDrivers),environment,interpretation:buildInterpretation(environment)});
  }

  return Object.freeze({METHODOLOGY_VERSION,DRIVER_ORDER,WEIGHTS,MAX_WEIGHTED_ABSOLUTE,NAMES,STATE_LABELS,clamp,stateLabel,directionLabel,classifyRealYield,classifyDollar,classifyInflation,classifyCentralBankDemand,classifyFiscalStress,classifyStressSubscore,combineStress,classifyStress,environmentLabel,calculateEnvironment,buildInterpretation,referenceScores,buildScenario});
});

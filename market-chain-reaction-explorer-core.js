(function(global){
  'use strict';
  const VERSION='MCR1-1.0';
  const verdicts=new Set(['Usually supportive','Usually a headwind','Usually pushes higher','Usually pushes lower','Mixed / cause-dependent','Indirect effect','No reliable one-way relationship','Mechanical inverse relationship']);
  const types=new Set(['Mechanical relationship','Economic transmission','Market tendency','Context-dependent relationship']);

  function indexById(items){return Object.fromEntries((items||[]).map(x=>[x.id,x]));}
  function validate(eventsData,relationsData,sourcesData){
    const errors=[];
    const events=eventsData&&eventsData.events||[];
    const targets=eventsData&&eventsData.targets||[];
    const relations=relationsData&&relationsData.relationships||[];
    const sources=sourcesData&&sourcesData.sources||[];
    const eventMap=indexById(events),targetMap=indexById(targets),sourceMap=indexById(sources),relationMap=indexById(relations);
    if(!events.length)errors.push('No events loaded.');
    if(!relations.length)errors.push('No relationship records loaded.');
    if(new Set(relations.map(x=>x.id)).size!==relations.length)errors.push('Duplicate relationship IDs found.');
    events.forEach(e=>{
      if(!e.id||!e.label)errors.push('Event missing id/label.');
      if(!Array.isArray(e.causes)||!e.causes.length)errors.push(`Event ${e.id} has no causes.`);
      if(!Array.isArray(e.targets)||!e.targets.length)errors.push(`Event ${e.id} has no targets.`);
      (e.targets||[]).forEach(t=>{
        if(!targetMap[t])errors.push(`Event ${e.id} references unknown target ${t}.`);
        if(!relationMap[`${e.id}__${t}`])errors.push(`Missing relationship ${e.id}__${t}.`);
      });
    });
    relations.forEach(r=>{
      if(!eventMap[r.eventId])errors.push(`Relationship ${r.id} has unknown event.`);
      if(!targetMap[r.targetId])errors.push(`Relationship ${r.id} has unknown target.`);
      if(!verdicts.has(r.verdict))errors.push(`Relationship ${r.id} has uncontrolled verdict.`);
      if(!types.has(r.relationshipType))errors.push(`Relationship ${r.id} has uncontrolled type.`);
      if(!r.directAnswer)errors.push(`Relationship ${r.id} has no direct answer.`);
      if(!Array.isArray(r.mechanismSteps)||r.mechanismSteps.length<2)errors.push(`Relationship ${r.id} has fewer than two mechanism steps.`);
      if(!r.chainBreaker)errors.push(`Relationship ${r.id} has no Chain Breaker.`);
      if(!Array.isArray(r.sourceIds)||!r.sourceIds.length)errors.push(`Relationship ${r.id} has no sources.`);
      (r.sourceIds||[]).forEach(id=>{if(!sourceMap[id])errors.push(`Relationship ${r.id} references unknown source ${id}.`);});
    });
    return {ok:errors.length===0,errors,eventMap,targetMap,sourceMap,relationMap};
  }
  function allowedState(eventsData,requested){
    const events=eventsData.events||[],eventMap=indexById(events);
    let event=eventMap[requested&&requested.eventId]||events[0];
    const causeMap=indexById(event.causes||[]);
    const cause=causeMap[requested&&requested.causeId]||causeMap[event.defaultCause]||(event.causes||[])[0];
    const targetId=(event.targets||[]).includes(requested&&requested.targetId)?requested.targetId:(event.targets||[])[0];
    return {eventId:event.id,causeId:cause&&cause.id,targetId};
  }
  function resolve(eventsData,relationsData,sourcesData,requested){
    const v=validate(eventsData,relationsData,sourcesData);if(!v.ok)throw new Error(v.errors.join('\n'));
    const state=allowedState(eventsData,requested||{}),event=v.eventMap[state.eventId],cause=(event.causes||[]).find(x=>x.id===state.causeId),target=v.targetMap[state.targetId];
    const base=v.relationMap[`${state.eventId}__${state.targetId}`];
    const override=(base.causeOverrides&&base.causeOverrides[state.causeId])||{};
    const result={...base,...override,id:base.id,eventId:state.eventId,causeId:state.causeId,targetId:state.targetId,event,eventCause:cause,target};
    result.sourceIds=override.sourceIds||base.sourceIds;
    result.sources=result.sourceIds.map(id=>v.sourceMap[id]).filter(Boolean);
    result.mechanismSteps=override.mechanismSteps||base.mechanismSteps;
    result.supportingForces=override.supportingForces||base.supportingForces||[];
    result.headwinds=override.headwinds||base.headwinds||[];
    result.differentReactions=override.differentReactions||base.differentReactions||[];
    result.chainBreaker=override.chainBreaker||base.chainBreaker;
    result.historicalExample=override.historicalExample||base.historicalExample;
    result.scenarioWarning=override.scenarioWarning||base.scenarioWarning||event.specialWarning||'';
    return result;
  }
  function parseHash(hash){
    const raw=(hash||'').replace(/^#/,'');if(!raw)return {};
    const p=new URLSearchParams(raw);return {eventId:p.get('event')||'',causeId:p.get('cause')||'',targetId:p.get('target')||''};
  }
  function toHash(state){const p=new URLSearchParams();p.set('event',state.eventId);p.set('cause',state.causeId);p.set('target',state.targetId);return '#'+p.toString();}
  global.CarrowmontMarketChainCore=Object.freeze({VERSION,validate,allowedState,resolve,parseHash,toHash});
})(window);

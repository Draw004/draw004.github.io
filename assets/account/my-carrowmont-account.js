(function(){
  'use strict';
  const Account=window.CarrowmontAccount;
  const Store=window.CarrowmontDashboardStore;
  const Progress=window.CarrowmontProgress;
  if(!Account||!Store) return;
  const root=document.getElementById('mycmAccount');
  if(!root||!Account.isConfigured()) return;

  const browserStore=Store.createBrowserStore(window);
  const $=id=>document.getElementById(id);
  const status=$('mycmAccountStatus');
  const signedOut=$('mycmAccountSignedOut');
  const signedIn=$('mycmAccountSignedIn');
  const dashboard=$('mycmDashboardShell');
  const emailInput=$('mycmAccountEmail');
  const accountEmail=$('mycmAccountCurrentEmail');
  const cloudSummary=$('mycmCloudSummary');
  const savedPlansSection=$('mycmSavedPlansSection');
  const savedPlansList=$('mycmSavedPlansList');
  const progressSection=$('mycmProgressSection');
  const progressSummary=$('mycmProgressSummary');
  const progressList=$('mycmProgressList');
  let cloudProfile=null;
  let currentUser=null;
  let saveTimer=null;

  function say(message,kind='info'){
    status.textContent=message;
    status.dataset.kind=kind;
    status.hidden=false;
  }
  function hasFacts(profile){return Boolean(profile&&Object.keys(profile.facts||{}).length);}
  function normalized(profile){return Store.setMode(Store.normalize(profile||Store.create()),'session');}
  function mergeProfiles(base,incoming){
    const a=normalized(base),b=normalized(incoming);
    return normalized({...a,locale:b.locale||a.locale,facts:{...(a.facts||{}),...(b.facts||{})},lastImport:b.lastImport||a.lastImport,updatedAt:new Date().toISOString()});
  }
  function mergePlanFacts(profile,plan){
    let out=normalized(profile);const facts=plan?.profileFacts&&typeof plan.profileFacts==='object'?plan.profileFacts:{};
    for(const [path,item] of Object.entries(facts)){
      if(!item||typeof item!=='object'||item.value===undefined||item.value===null||item.value==='') continue;
      out=Store.setFact(out,path,item.value,{origin:'user',source:item.source||plan.label||'Saved plan',unit:item.unit||null,note:item.note||`Saved from ${plan.journey||'Carrowmont'} after you chose My Carrowmont.`});
    }
    return out;
  }
  function fmtDate(value){try{return new Intl.DateTimeFormat(undefined,{day:'numeric',month:'short',year:'numeric'}).format(new Date(value));}catch(_){return 'Saved plan';}}
  function esc(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function progressTone(tone){return ['good','warn','bad'].includes(tone)?tone:'neutral';}
  function renderProgress(rows){
    if(!progressSection||!progressList||!progressSummary||!currentUser||!Progress){if(progressSection)progressSection.hidden=true;return;}
    const currency=window.CarrowmontLocale?.getCurrency?.()||cloudProfile?.profile?.locale?.currency||'USD';
    const items=Progress.evaluateAll?Progress.evaluateAll(rows,currency):Progress.analyze(rows,currency);
    progressList.innerHTML='';
    if(!items.length){progressSection.hidden=true;return;}
    progressSection.hidden=false;
    const attention=items.filter(item=>item.tone==='bad').length;
    const review=items.filter(item=>item.status==='Needs review').length;
    const healthy=items.filter(item=>item.status==='On track'||item.status==='Ahead').length;
    const ready=items.filter(item=>item.status==='Ready to track').length;
    const parts=[];if(healthy)parts.push(`${healthy} on track`);if(attention)parts.push(`${attention} need${attention===1?'s':''} attention`);if(review)parts.push(`${review} need${review===1?'s':''} review`);if(ready)parts.push(`${ready} ready to track`);
    progressSummary.textContent=parts.length?parts.join(' · '):'Your saved plans are ready to review.';
    items.forEach(item=>{
      const trend=item.trend||item;
      const showTrendStatus=trend?.status&&trend.status!==item.status;
      const card=document.createElement('article');card.className='mycm-progress-card';
      card.innerHTML=`<div class="mycm-progress-head"><strong>${esc(item.label)}</strong><span class="mycm-progress-status" data-tone="${progressTone(item.tone)}">${esc(item.status)}</span></div><div class="mycm-progress-meta"><span>${esc(item.freshness?.label||'')}</span>${item.target?`<span>${esc(item.target)}</span>`:''}</div><h3>${esc(item.headline)}</h3><div class="mycm-progress-change"><div><strong>Since last save</strong>${showTrendStatus?`<span class="mycm-progress-trend" data-tone="${progressTone(trend.tone)}">${esc(trend.status)}</span>`:''}</div><p>${esc(trend.headline||'')}</p><small>${esc(trend.detail||'')}</small></div>${item.correction?`<div class="mycm-progress-next"><strong>What could help</strong><span>${esc(item.correction)}</span></div>`:''}<div class="mycm-progress-actions"><button type="button" class="mycm-button" data-progress-open="${esc(item.journey)}">Open plan</button></div>`;
      card.querySelector('[data-progress-open]').addEventListener('click',()=>{const row=(rows||[]).find(candidate=>candidate?.journey===item.journey);if(row&&Account.stageOpenPlan(row))location.href=planRoute(row);});
      progressList.appendChild(card);
    });
  }
  function planRoute(row){const path=row?.scenario?.toolPath;return typeof path==='string'&&path.startsWith('/')?path:'/my-carrowmont.html';}
  async function renderSavedPlans(){
    if(!savedPlansSection||!savedPlansList||!currentUser){if(savedPlansSection)savedPlansSection.hidden=true;return;}
    const rows=await Account.listScenarios();renderProgress(rows);savedPlansList.innerHTML='';savedPlansSection.hidden=false;
    if(!rows.length){savedPlansList.innerHTML='<p class="mycm-saved-empty">No saved plans yet. Use a supported Carrowmont planner and choose <strong>Save to My Carrowmont</strong> when you want to keep one.</p>';return;}
    rows.forEach(row=>{
      const card=document.createElement('article');card.className='mycm-saved-plan';
      const title=document.createElement('div');title.className='mycm-saved-plan-copy';title.innerHTML=`<strong>${String(row.label||'Saved plan').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}</strong><span>${fmtDate(row.updated_at||row.created_at)} · ${String(row.journey||'plan').replace(/-/g,' ')}</span>`;
      const actions=document.createElement('div');actions.className='mycm-saved-plan-actions';
      const open=document.createElement('button');open.type='button';open.className='mycm-button';open.textContent='Open plan';open.addEventListener('click',()=>{if(Account.stageOpenPlan(row)) location.href=planRoute(row);});
      const del=document.createElement('button');del.type='button';del.className='mycm-button mycm-button-danger';del.textContent='Delete';del.addEventListener('click',async()=>{if(!confirm('Delete this saved plan from My Carrowmont?'))return;await Account.deleteScenario(row.id);await renderSavedPlans();say('Saved plan deleted.','success');});
      actions.append(open,del);card.append(title,actions);savedPlansList.appendChild(card);
    });
  }
  function hasPersistedAuthSession(){
    try{for(let i=0;i<localStorage.length;i+=1){const key=localStorage.key(i)||'';if(/^sb-.*-auth-token$/.test(key)&&localStorage.getItem(key))return true;}}catch(_){}
    return false;
  }
  function hasAuthReturnInUrl(){
    try{const hash=String(location.hash||'');const search=new URLSearchParams(location.search||'');return /(?:^|[&#])access_token=/.test(hash)||/(?:^|[&#])refresh_token=/.test(hash)||search.has('code');}catch(_){return false;}
  }
  function downloadJson(data,name){
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
  }
  function showSignedOut(){signedOut.hidden=false;signedIn.hidden=true;dashboard.hidden=true;}
  function showSignedIn(profile){
    signedOut.hidden=true;signedIn.hidden=false;dashboard.hidden=false;
    accountEmail.textContent=currentUser?.email||'Signed-in account';
    const count=Object.keys(profile?.facts||{}).length;
    cloudSummary.textContent=count?`Your saved profile is loaded with ${count} planning value${count===1?'':'s'}. Updates made here are saved to My Carrowmont.`:'No planning values are saved yet. Add details here or save a supported Carrowmont plan to start your profile.';
    window.dispatchEvent(new CustomEvent('carrowmont:mycm-account-ready',{detail:{profile:normalized(profile)}}));
  }
  async function applyStagedChoice(baseProfile){
    const stagedEntry=Account.readStagedGuestProfile();
    if(stagedEntry && stagedEntry.explicit!==true){Account.clearStagedGuestProfile();return {profile:baseProfile,changed:false};}
    const staged=stagedEntry?.profile;
    if(!hasFacts(staged)) return {profile:baseProfile,changed:false};
    const merged=mergeProfiles(baseProfile,staged);
    const saved=await Account.saveCloudProfile(merged);
    Account.clearStagedGuestProfile();
    return {profile:saved.profile,changed:true};
  }
  async function applyStagedPlan(baseProfile){
    const entry=Account.readStagedPlan();
    if(!entry) return {profile:baseProfile,changed:false,label:''};
    if(entry.explicit!==true||!entry.plan||typeof entry.plan!=='object'){Account.clearStagedPlan();return {profile:baseProfile,changed:false,label:''};}
    const stagedAt=Date.parse(entry.stagedAt||'');if(!Number.isFinite(stagedAt)||Date.now()-stagedAt>2*60*60*1000){Account.clearStagedPlan();return {profile:baseProfile,changed:false,label:''};}
    const plan=entry.plan;let profile=mergePlanFacts(baseProfile,plan);
    if(hasFacts(profile)) profile=(await Account.saveCloudProfile(profile)).profile;
    const existing=(await Account.listScenarios()).find(row=>row?.journey===plan.journey)||null;
    const nextScenario={...plan.scenario,journey:plan.journey,label:plan.label,toolPath:plan.toolPath,capturedAt:plan.capturedAt||entry.stagedAt};
    const scenario=Progress?.scenarioWithHistory?Progress.scenarioWithHistory(existing,nextScenario):nextScenario;
    await Account.saveScenario({id:existing?.id,journey:plan.journey,label:plan.label,scenario});
    Account.clearStagedPlan();
    return {profile,changed:true,label:plan.label||'Selected plan',updated:Boolean(existing)};
  }
  async function refresh(){
    try{
      currentUser=await Account.getUser();
      if(!currentUser){showSignedOut();return;}
      cloudProfile=await Account.loadCloudProfile();
      let profile=cloudProfile?.profile?normalized(cloudProfile.profile):normalized(Store.create());
      const applied=await applyStagedChoice(profile);
      profile=applied.profile;
      const planApplied=await applyStagedPlan(profile);
      profile=planApplied.profile;
      if(applied.changed||planApplied.changed) cloudProfile=await Account.loadCloudProfile();
      browserStore?.save(profile,'session');
      showSignedIn(profile);
      await renderSavedPlans();
      if(planApplied.changed) say(planApplied.updated?`${planApplied.label} has been updated in My Carrowmont.`:`${planApplied.label} has been saved to My Carrowmont. You can reopen it from Saved plans.`,'success');
      else if(applied.changed) say('Your selected plan has been saved to My Carrowmont.','success');
    }catch(error){showSignedOut();say(error.message||'Account status could not be loaded.','error');}
  }

  $('mycmAccountForm').addEventListener('submit',async event=>{
    event.preventDefault();
    try{
      await Account.sendMagicLink(emailInput.value,`${location.origin}/my-carrowmont.html`);
      say('Check your email for your secure one-time Carrowmont sign-in link.','success');
    }catch(error){say(error.message||'The sign-in link could not be sent.','error');}
  });

  window.addEventListener('carrowmont:mycm-profile-change',event=>{
    if(!currentUser||!event.detail?.profile) return;
    clearTimeout(saveTimer);
    const profile=normalized(event.detail.profile);
    if(event.detail.saveImmediately===true){
      saveTimer=null;
      void (async()=>{
        try{cloudProfile=await Account.saveCloudProfile(profile);cloudSummary.textContent='Your latest My Carrowmont changes are saved.';}
        catch(error){say(error.message||'Your latest changes could not be saved.','error');}
      })();
      return;
    }
    saveTimer=window.setTimeout(async()=>{
      try{cloudProfile=await Account.saveCloudProfile(profile);cloudSummary.textContent='Your latest My Carrowmont changes are saved.';}
      catch(error){say(error.message||'Your latest changes could not be saved.','error');}
    },250);
  });

  $('mycmExportCloud').addEventListener('click',async()=>{
    try{downloadJson(await Account.exportAccountData(),'carrowmont-account-export.json');say('Account export prepared.','success');}
    catch(error){say(error.message||'Account data could not be exported.','error');}
  });

  $('mycmDeleteCloud').addEventListener('click',async()=>{
    if(!window.confirm('Delete the saved My Carrowmont profile and saved scenarios from this account? Your sign-in account will remain active.'))return;
    try{
      await Account.deleteCloudProfile();cloudProfile=null;browserStore?.clear();Account.clearStagedPlan();
      const empty=normalized(Store.create());browserStore?.save(empty,'session');showSignedIn(empty);
      await renderSavedPlans();
      say('Saved My Carrowmont profile deleted.','success');
    }catch(error){say(error.message||'Saved profile could not be deleted.','error');}
  });

  $('mycmSignOut').addEventListener('click',async()=>{
    try{await Account.signOut();currentUser=null;cloudProfile=null;Account.clearStagedGuestProfile();Account.clearStagedPlan();browserStore?.clear();location.replace('/my-carrowmont.html');}
    catch(error){say(error.message||'Sign out failed.','error');}
  });

  if(hasPersistedAuthSession()||hasAuthReturnInUrl()){
    Account.onAuthStateChange(()=>refresh());
    refresh();
  }else showSignedOut();
})();

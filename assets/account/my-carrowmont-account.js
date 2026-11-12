(function(){
  'use strict';
  const Account=window.CarrowmontAccount;
  const Store=window.CarrowmontDashboardStore;
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
  async function refresh(){
    try{
      currentUser=await Account.getUser();
      if(!currentUser){showSignedOut();return;}
      cloudProfile=await Account.loadCloudProfile();
      let profile=cloudProfile?.profile?normalized(cloudProfile.profile):normalized(Store.create());
      const applied=await applyStagedChoice(profile);
      profile=applied.profile;
      if(applied.changed) cloudProfile=await Account.loadCloudProfile();
      browserStore?.save(profile,'session');
      showSignedIn(profile);
      if(applied.changed) say('Your selected plan has been saved to My Carrowmont.','success');
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
      await Account.deleteCloudProfile();cloudProfile=null;browserStore?.clear();
      const empty=normalized(Store.create());browserStore?.save(empty,'session');showSignedIn(empty);
      say('Saved My Carrowmont profile deleted.','success');
    }catch(error){say(error.message||'Saved profile could not be deleted.','error');}
  });

  $('mycmSignOut').addEventListener('click',async()=>{
    try{await Account.signOut();currentUser=null;cloudProfile=null;Account.clearStagedGuestProfile();browserStore?.clear();location.replace('/my-carrowmont.html');}
    catch(error){say(error.message||'Sign out failed.','error');}
  });

  if(hasPersistedAuthSession()||hasAuthReturnInUrl()){
    Account.onAuthStateChange(()=>refresh());
    refresh();
  }else showSignedOut();
})();

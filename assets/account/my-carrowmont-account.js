(function(){
  'use strict';
  const Account=window.CarrowmontAccount;
  const Store=window.CarrowmontDashboardStore;
  if(!Account||!Store) return;
  const root=document.getElementById('mycmAccount');
  if(!root||!Account.isConfigured()) return;

  root.hidden=false;
  const browserStore=Store.createBrowserStore(window);
  const $=id=>document.getElementById(id);
  const status=$('mycmAccountStatus');
  const signedOut=$('mycmAccountSignedOut');
  const signedIn=$('mycmAccountSignedIn');
  const emailInput=$('mycmAccountEmail');
  const carry=$('mycmCarryGuest');
  const accountEmail=$('mycmAccountCurrentEmail');
  const cloudSummary=$('mycmCloudSummary');
  let cloudProfile=null;
  let currentUser=null;

  function say(message,kind='info'){
    status.textContent=message;
    status.dataset.kind=kind;
    status.hidden=false;
  }
  function hasFacts(profile){return Boolean(profile&&Object.keys(profile.facts||{}).length);}
  function downloadJson(data,name){
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
  }
  function renderCloudState(){
    if(!currentUser){signedOut.hidden=false;signedIn.hidden=true;return;}
    signedOut.hidden=true;signedIn.hidden=false;
    accountEmail.textContent=currentUser.email||'Signed-in account';
    if(cloudProfile?.profile){
      const count=Object.keys(cloudProfile.profile.facts||{}).length;
      cloudSummary.textContent=`Saved account profile: ${count} planning value${count===1?'':'s'}, last updated ${new Date(cloudProfile.updated_at).toLocaleString()}. Nothing is copied into this browser unless you choose Load saved profile.`;
    }else{
      cloudSummary.textContent='No saved My Carrowmont profile exists in this account yet.';
    }
  }
  async function refresh(){
    try{
      currentUser=await Account.getUser();
      cloudProfile=currentUser?await Account.loadCloudProfile():null;
      renderCloudState();
      const staged=Account.readStagedGuestProfile();
      if(currentUser&&staged?.profile&&hasFacts(staged.profile)) say('You signed in successfully. Your guest dashboard is ready to save, but it has not been uploaded yet. Choose “Save this browser profile to account” if you want to keep it.','success');
    }catch(error){say(error.message||'Account status could not be loaded.','error');}
  }

  $('mycmAccountForm').addEventListener('submit',async event=>{
    event.preventDefault();
    try{
      const profile=browserStore?.load();
      if(carry.checked&&hasFacts(profile)) Account.stageGuestProfile(profile);
      else Account.clearStagedGuestProfile();
      await Account.sendMagicLink(emailInput.value,`${location.origin}/my-carrowmont.html`);
      say('Check your email for the secure Carrowmont sign-in link. Your financial profile has not been uploaded.','success');
    }catch(error){say(error.message||'The sign-in link could not be sent.','error');}
  });

  $('mycmSaveCloud').addEventListener('click',async()=>{
    try{
      const staged=Account.readStagedGuestProfile()?.profile;
      const current=browserStore?.load();
      const chosen=hasFacts(staged)?staged:current;
      if(!hasFacts(chosen)){say('There are no browser planning values to save yet.','error');return;}
      cloudProfile=await Account.saveCloudProfile(chosen);
      Account.clearStagedGuestProfile();
      renderCloudState();
      say('My Carrowmont was saved to your account.','success');
    }catch(error){say(error.message||'My Carrowmont could not be saved.','error');}
  });

  $('mycmLoadCloud').addEventListener('click',async()=>{
    try{
      cloudProfile=await Account.loadCloudProfile();
      if(!cloudProfile?.profile){say('There is no saved account profile to load.','error');return;}
      const mode=browserStore?.load()?.mode||'session';
      browserStore?.save(cloudProfile.profile,mode);
      Account.clearStagedGuestProfile();
      say('Saved account profile loaded into this browser.','success');
      window.setTimeout(()=>location.reload(),120);
    }catch(error){say(error.message||'Saved profile could not be loaded.','error');}
  });

  $('mycmExportCloud').addEventListener('click',async()=>{
    try{downloadJson(await Account.exportAccountData(),'carrowmont-account-export.json');say('Account export prepared.','success');}
    catch(error){say(error.message||'Account data could not be exported.','error');}
  });

  $('mycmDeleteCloud').addEventListener('click',async()=>{
    if(!window.confirm('Delete the saved My Carrowmont cloud profile and saved scenarios from this account? Your account itself will remain active.'))return;
    try{await Account.deleteCloudProfile();cloudProfile=null;renderCloudState();say('Saved cloud profile deleted. Browser-local My Carrowmont data was not changed.','success');}
    catch(error){say(error.message||'Saved cloud profile could not be deleted.','error');}
  });

  $('mycmSignOut').addEventListener('click',async()=>{
    try{await Account.signOut();currentUser=null;cloudProfile=null;Account.clearStagedGuestProfile();renderCloudState();say('Signed out. Your browser-local My Carrowmont data remains under your existing guest settings.','success');}
    catch(error){say(error.message||'Sign out failed.','error');}
  });

  Account.onAuthStateChange(()=>refresh());
  refresh();
})();

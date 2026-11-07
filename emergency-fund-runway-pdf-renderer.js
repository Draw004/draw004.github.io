(function(){
  'use strict';
  const W=794,H=1123,M=44,CW=W-M*2;
  const C={navy:'#102945',ink:'#17314f',teal:'#0e827a',tealDark:'#08756d',muted:'#506b84',line:'#cbdbe3',pale:'#e9f7f4',warm:'#fff7e8',white:'#ffffff',light:'#f8fbfc',rose:'#fff3f1'};
  const P=()=>window.CarrowmontEmergencyFundPdfExport;
  const page=()=>P().createPage({width:W,height:H,scale:2.35,background:'#fff'});
  const card=(ctx,x,y,w,h,fill=C.white,stroke=C.line,r=10)=>P().roundRect(ctx,x,y,w,h,r,fill,stroke,1);
  const rule=(ctx,x1,x2,y,color=C.line,width=1)=>P().line(ctx,x1,y,x2,y,color,width);
  function money(value,currency,locale){try{return new Intl.NumberFormat(locale||'en',{style:'currency',currency:currency||'USD',maximumFractionDigits:0}).format(Number(value)||0);}catch{return String(Math.round(Number(value)||0));}}
  function monthText(value){if(value==null||!Number.isFinite(value))return 'Monthly need covered';const v=value>=10?value.toFixed(1):value.toFixed(2);return `${v.replace(/\.00$/,'').replace(/(\.\d)0$/,'$1')} months`;}
  function header(ctx,title,subtitle,label){P().text(ctx,'CARROWMONT',M,52,{size:14,weight:900,color:C.teal});P().text(ctx,label,W-M,52,{size:9.2,weight:650,color:C.muted,align:'right'});P().text(ctx,title,M,92,{size:24,weight:900,color:C.navy});if(subtitle)P().wrappedText(ctx,subtitle,M,118,CW,{size:10,lineHeight:14,weight:550,color:C.muted,maxLines:3});rule(ctx,M,W-M,153,C.navy,2);}
  function footer(ctx,label){P().text(ctx,'CARROWMONT',M,H-35,{size:9.8,weight:900,color:C.teal});P().text(ctx,label,W-M,H-35,{size:8.7,weight:550,color:C.muted,align:'right'});}
  function summaryPage(r,opt){
    const pg=page(),ctx=pg.ctx,a=r.assumptions;
    header(ctx,'Emergency Fund & Financial Runway Report','A planning view of emergency-ready cash, essential monthly need and a user-chosen runway target.','Planning Summary');
    let y=176;
    card(ctx,M,y,CW,126,C.pale,'#b9ded8',12);
    P().text(ctx,'Current full-income-loss runway',M+16,y+30,{size:11,weight:900,color:C.tealDark});
    P().text(ctx,monthText(r.fullLossRunwayMonths),M+16,y+74,{size:29,weight:900,color:C.navy});
    P().text(ctx,`Emergency-ready reserve: ${money(r.reserve,opt.currency,opt.locale)}`,M+16,y+104,{size:9.7,weight:750,color:C.ink});
    P().text(ctx,'YOUR CHOSEN TARGET',W-M-16,y+31,{size:8.7,weight:900,color:C.muted,align:'right'});
    P().text(ctx,`${a.targetMonths} months`,W-M-16,y+63,{size:20,weight:900,color:C.navy,align:'right'});
    P().text(ctx,money(r.targetAmount,opt.currency,opt.locale),W-M-16,y+95,{size:12,weight:850,color:C.tealDark,align:'right'});
    y+=151;
    P().text(ctx,'Key numbers',M,y,{size:16,weight:900,color:C.navy});rule(ctx,M,W-M,y+13);y+=31;
    const gap=12,w=(CW-gap)/2,items=[
      ['Essential monthly need',money(r.monthlyNeed,opt.currency,opt.locale)],
      ['Gap to chosen target',r.targetGap>0?money(r.targetGap,opt.currency,opt.locale):'No gap'],
      ['First useful buffer',money(r.firstStageAmount,opt.currency,opt.locale)],
      ['Time to chosen target',r.monthsToTarget==null?(r.targetGap<=0?'Already covered':'Contribution not entered'):`About ${r.monthsToTarget} months`]
    ];
    items.forEach((item,i)=>{const x=M+(i%2)*(w+gap),yy=y+Math.floor(i/2)*94;card(ctx,x,yy,w,80,C.light,C.line,10);P().text(ctx,item[0],x+13,yy+27,{size:8.8,weight:850,color:C.muted});P().wrappedText(ctx,item[1],x+13,yy+55,w-26,{size:15,weight:900,color:C.navy,maxLines:2});});
    y+=206;
    card(ctx,M,y,CW,116,C.warm,'#ead1a9',11);
    P().text(ctx,'Reference range, not a rule',M+15,y+29,{size:12.4,weight:900,color:'#8b5a17'});
    P().wrappedText(ctx,`A 3 to 6 month reference range equals about ${money(r.referenceLowAmount,opt.currency,opt.locale)} to ${money(r.referenceHighAmount,opt.currency,opt.locale)} using the essential monthly need entered. Carrowmont does not choose this as your personal target.`,M+15,y+55,CW-30,{size:9.3,lineHeight:13.5,weight:550,color:C.ink,maxLines:4});
    y+=142;
    P().text(ctx,'What is counted',M,y,{size:15,weight:900,color:C.navy});rule(ctx,M,W-M,y+13);y+=31;
    const rows=[
      ['Essential living costs',a.essentialExpenses],['Minimum debt payments',a.debtPayments],['Other unavoidable commitments',a.otherCommitments],['Emergency savings',a.emergencySavings],['Other liquid cash counted',a.includeOtherLiquidCash?a.otherLiquidCash:0]
    ];
    rows.forEach((row,i)=>{const h=42;if(i%2){ctx.fillStyle='#fbfdfe';ctx.fillRect(M,y,CW,h);}P().text(ctx,row[0],M+8,y+27,{size:9,weight:800,color:C.muted});P().text(ctx,money(row[1],opt.currency,opt.locale),W-M-8,y+27,{size:9.4,weight:850,color:C.ink,align:'right'});rule(ctx,M,W-M,y+h);y+=h;});
    footer(ctx,'Emergency Fund & Runway - Planning Summary');return pg.canvas;
  }
  function stressPage(r,opt){
    const pg=page(),ctx=pg.ctx,a=r.assumptions;
    header(ctx,'Stress Scenario','See how a one-time shock and continuing income change the modeled reserve.','Stress Test');
    let y=176;
    const items=[
      ['Reserve before shock',r.reserve],['One-time shock',a.shockCost],['Reserve after shock',r.postShockReserve],['Essential monthly need',r.monthlyNeed],['Continuing monthly income',a.disruptionIncome],['Monthly shortfall after income',r.stressMonthlyBurn]
    ];
    items.forEach((item,i)=>{const h=48;if(i%2){ctx.fillStyle='#fbfdfe';ctx.fillRect(M,y,CW,h);}P().text(ctx,item[0],M+8,y+30,{size:9,weight:800,color:C.muted});P().text(ctx,money(item[1],opt.currency,opt.locale),W-M-8,y+30,{size:10,weight:900,color:C.ink,align:'right'});rule(ctx,M,W-M,y+h);y+=h;});
    y+=25;
    card(ctx,M,y,CW,118,r.stressMonthlyBurn<=0?C.pale:C.light,r.stressMonthlyBurn<=0?'#b9ded8':C.line,11);
    P().text(ctx,'Stressed runway',M+15,y+31,{size:11.5,weight:900,color:C.tealDark});
    P().text(ctx,r.stressMonthlyBurn<=0?'Monthly need covered':monthText(r.stressedRunwayMonths),M+15,y+70,{size:26,weight:900,color:C.navy});
    P().wrappedText(ctx,r.stressMonthlyBurn<=0?'The continuing income entered covers the modeled essential monthly need after the one-time shock. This does not mean every future cost is covered.':'This is the reserve after the shock divided by the remaining monthly shortfall. It is a scenario, not a forecast.',M+15,y+95,CW-30,{size:8.9,lineHeight:12.8,weight:550,color:C.ink,maxLines:2});
    y+=145;
    P().text(ctx,'Build path',M,y,{size:15,weight:900,color:C.navy});rule(ctx,M,W-M,y+13);y+=31;
    const buildItems=[
      ['Monthly amount you plan to add',money(a.monthlyContribution,opt.currency,opt.locale)],
      ['First-buffer gap',r.firstStageGap>0?money(r.firstStageGap,opt.currency,opt.locale):'Covered'],
      ['Months to first buffer',r.monthsToFirstStage==null?(r.firstStageGap<=0?'Already covered':'Contribution not entered'):`About ${r.monthsToFirstStage}`],
      ['Months to chosen target',r.monthsToTarget==null?(r.targetGap<=0?'Already covered':'Contribution not entered'):`About ${r.monthsToTarget}`]
    ];
    buildItems.forEach((item,i)=>{card(ctx,M,y,CW,64,i===3?C.pale:C.white,i===3?'#b9ded8':C.line,9);P().text(ctx,item[0],M+13,y+25,{size:9,weight:850,color:C.muted});P().text(ctx,item[1],W-M-13,y+25,{size:10.2,weight:900,color:C.navy,align:'right'});y+=73;});
    y+=8;
    card(ctx,M,y,CW,105,C.rose,'#e6c6bf',11);
    P().text(ctx,'Important limitation',M+15,y+28,{size:12.2,weight:900,color:'#9a4134'});
    P().wrappedText(ctx,'This stress test does not estimate benefits, insurance payouts, tax changes, severance, investment losses, borrowing availability or country-specific support. Add only continuing income you believe is reasonably reliable for the scenario you want to test.',M+15,y+53,CW-30,{size:9.1,lineHeight:13.2,weight:550,color:C.ink,maxLines:4});
    footer(ctx,'Emergency Fund & Runway - Stress Test');return pg.canvas;
  }
  function methodPage(r,opt){
    const pg=page(),ctx=pg.ctx;
    header(ctx,'Method & Next Steps','How Carrowmont calculates the result and how to use it without turning a reference point into a rule.','Methodology');
    let y=176;
    const steps=[
      ['1','Monthly need','Essential living costs + minimum debt payments + other unavoidable commitments.'],
      ['2','Emergency-ready reserve','Emergency savings plus other liquid cash only when you explicitly choose to count it.'],
      ['3','Current runway','Emergency-ready reserve divided by monthly need.'],
      ['4','Chosen target','Monthly need multiplied by the target months you entered.'],
      ['5','Stress runway','Reserve after the one-time shock divided by monthly need minus continuing income.']
    ];
    steps.forEach(([n,t,d])=>{card(ctx,M,y,CW,84,C.light,C.line,10);card(ctx,M+14,y+20,38,38,C.pale,'#b9ded8',19);P().text(ctx,n,M+33,y+46,{size:13,weight:900,color:C.tealDark,align:'center'});P().text(ctx,t,M+66,y+27,{size:10.7,weight:900,color:C.navy});P().wrappedText(ctx,d,M+66,y+51,CW-82,{size:8.9,lineHeight:12.8,weight:550,color:C.ink,maxLines:2});y+=96;});
    y+=8;
    P().text(ctx,'Useful next moves',M,y,{size:15,weight:900,color:C.navy});rule(ctx,M,W-M,y+13);y+=31;
    const next=[
      ['If you are below one month','Build a first buffer before treating the larger target as one giant goal.'],
      ['If high-cost debt is growing','Balance the emergency buffer with the cost and urgency of that debt rather than funding the maximum reserve blindly.'],
      ['If your target is covered','Review whether the cash is accessible and whether predictable annual bills belong in sinking funds instead.'],
      ['After a major life change','Re-run the plan when essential costs, dependants, employment, debt or insurance change materially.']
    ];
    next.forEach((row,i)=>{const h=61;if(i%2){ctx.fillStyle='#fbfdfe';ctx.fillRect(M,y,CW,h);}P().text(ctx,row[0],M+8,y+24,{size:9,weight:900,color:C.tealDark});P().wrappedText(ctx,row[1],M+220,y+20,CW-228,{size:8.8,lineHeight:12.5,weight:550,color:C.ink,maxLines:3});rule(ctx,M,W-M,y+h);y+=h;});
    y+=20;
    card(ctx,M,y,CW,118,C.warm,'#ead1a9',11);
    P().text(ctx,'Educational planning estimate',M+15,y+29,{size:12.4,weight:900,color:'#8b5a17'});
    P().wrappedText(ctx,'Emergency-fund guidance often uses a few months of expenses as a starting reference, but the useful amount depends on the household. This report is illustrative and is not individualized financial, tax, legal or insurance advice.',M+15,y+55,CW-30,{size:9.2,lineHeight:13.3,weight:550,color:C.ink,maxLines:4});
    y+=144;
    P().text(ctx,`Methodology version: ${r.methodologyVersion}`,M,y,{size:9.2,weight:750,color:C.muted});
    footer(ctx,'Emergency Fund & Runway - Methodology');return pg.canvas;
  }
  async function generate(opt={}){
    if(!opt.result||!P())throw new Error('Emergency fund report helpers are unavailable.');
    const canvases=[summaryPage(opt.result,opt),stressPage(opt.result,opt),methodPage(opt.result,opt)];
    await P().downloadCanvases(canvases,{filename:'carrowmont-emergency-fund-runway-report.pdf',quality:.94});
  }
  window.CarrowmontEmergencyFundPdfRenderer={generate};
})();

(function(){
  'use strict';
  const W=794,H=1123,M=44,CW=W-M*2;
  const C={navy:'#102945',ink:'#17314f',teal:'#0e827a',tealDark:'#08756d',muted:'#506b84',line:'#cbdbe3',pale:'#e9f7f4',warm:'#fff7e8',white:'#ffffff',light:'#f8fbfc',rose:'#fff3f1'};
  const P=()=>window.CarrowmontHomeAffordabilityPdfExport;
  const page=()=>P().createPage({width:W,height:H,scale:2.35,background:'#fff'});
  const card=(ctx,x,y,w,h,fill=C.white,stroke=C.line,r=10)=>P().roundRect(ctx,x,y,w,h,r,fill,stroke,1);
  const rule=(ctx,x1,x2,y,color=C.line,width=1)=>P().line(ctx,x1,y,x2,y,color,width);
  function money(value,currency,locale){
    try{return new Intl.NumberFormat(locale||'en',{style:'currency',currency:currency||'USD',maximumFractionDigits:0}).format(Number(value)||0);}catch{return String(Math.round(Number(value)||0));}
  }
  const rate=v=>`${Number(v||0).toFixed(2).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1')}%`;
  function header(ctx,title,subtitle,label){
    P().text(ctx,'CARROWMONT',M,52,{size:14,weight:900,color:C.teal});
    P().text(ctx,label,W-M,52,{size:9.2,weight:650,color:C.muted,align:'right'});
    P().text(ctx,title,M,92,{size:24,weight:900,color:C.navy});
    if(subtitle)P().wrappedText(ctx,subtitle,M,118,CW,{size:10,lineHeight:14,weight:550,color:C.muted,maxLines:3});
    rule(ctx,M,W-M,153,C.navy,2);
  }
  function footer(ctx,label){
    P().text(ctx,'CARROWMONT',M,H-35,{size:9.8,weight:900,color:C.teal});
    P().text(ctx,label,W-M,H-35,{size:8.7,weight:550,color:C.muted,align:'right'});
  }
  function kvRows(ctx,items,y,currency,locale){
    items.forEach((row,i)=>{
      const h=38;if(i%2){ctx.fillStyle='#fbfdfe';ctx.fillRect(M,y,CW,h);}
      P().text(ctx,row[0],M+9,y+25,{size:8.8,weight:800,color:C.muted});
      P().text(ctx,row[2]==='money'?money(row[1],currency,locale):String(row[1]),W-M-9,y+25,{size:9.4,weight:800,color:C.ink,align:'right'});
      rule(ctx,M,W-M,y+h);y+=h;
    });return y;
  }
  function summaryPage(result,opt){
    const pg=page(),ctx=pg.ctx,a=result.assumptions,b=result.base,id=opt.identity||{};
    header(ctx,'Home Affordability Planning Report','A household cash-flow estimate based on the assumptions you entered.','Planning Summary');
    let y=176;
    card(ctx,M,y,CW,126,C.pale,'#b9ded8',12);
    P().text(ctx,a.mode==='target'?'Home price checked':'Planning home price',M+16,y+30,{size:11,weight:900,color:C.tealDark});
    P().text(ctx,money(b.homePrice,opt.currency,opt.locale),M+16,y+72,{size:29,weight:900,color:C.navy});
    P().text(ctx,`${id.payment||'Monthly payment'}: ${money(b.payment,opt.currency,opt.locale)}`,M+16,y+103,{size:9.7,weight:750,color:C.ink});
    P().text(ctx,'HOUSEHOLD PLANNING ESTIMATE',W-M-16,y+31,{size:8.7,weight:900,color:C.muted,align:'right'});
    P().text(ctx,'Not lender approval',W-M-16,y+62,{size:16,weight:900,color:C.navy,align:'right'});
    P().text(ctx,`Rate ${rate(a.annualRate)} · ${a.termYears} years`,W-M-16,y+91,{size:9.2,weight:650,color:C.muted,align:'right'});
    y+=151;
    P().text(ctx,'Key result',M,y,{size:16,weight:900,color:C.navy});rule(ctx,M,W-M,y+13);y+=31;
    const gap=12,w=(CW-gap)/2,outs=[
      [id.loan||'Estimated loan amount',money(b.loanAmount,opt.currency,opt.locale)],
      ['All-in monthly housing cost',money(b.allInHousingCost,opt.currency,opt.locale)],
      ['Monthly amount left',money(b.monthlyLeftover,opt.currency,opt.locale)],
      ['Difference vs chosen buffer',money(b.bufferDifference,opt.currency,opt.locale)]
    ];
    outs.forEach((o,idx)=>{const x=M+(idx%2)*(w+gap),yy=y+Math.floor(idx/2)*80;card(ctx,x,yy,w,68,C.light,C.line,10);P().text(ctx,o[0],x+12,yy+23,{size:8.6,weight:850,color:C.muted});P().text(ctx,o[1],x+12,yy+50,{size:15,weight:900,color:C.navy});});
    y+=180;
    P().text(ctx,'Assumptions entered',M,y,{size:16,weight:900,color:C.navy});rule(ctx,M,W-M,y+13);y+=31;
    y=kvRows(ctx,[
      ['Monthly take-home income',a.takeHomeIncome,'money'],
      ['Essential monthly spending',a.essentialSpending,'money'],
      ['Existing debt repayments',a.existingDebt,'money'],
      ['Protected monthly savings / investing',a.protectedSavings,'money'],
      ['Money kept free each month',a.freeBuffer,'money'],
      [id.deposit||'Deposit / down payment',a.deposit,'money'],
      ['Other monthly ownership costs',a.ownershipCosts,'money']
    ],y,opt.currency,opt.locale);
    y+=22;
    card(ctx,M,y,CW,82,C.warm,'#ead1a9',11);
    P().text(ctx,'Important',M+15,y+27,{size:12.4,weight:900,color:'#8b5a17'});
    P().wrappedText(ctx,'This report estimates what may fit the household cash flow you entered. A lender can offer more, less or nothing depending on its criteria, the property, your circumstances and local rules.',M+15,y+50,CW-30,{size:9.2,lineHeight:13,weight:550,color:C.ink,maxLines:3});
    footer(ctx,'Home Affordability · Planning Summary');return pg.canvas;
  }
  function cashFlowPage(result,opt){
    const pg=page(),ctx=pg.ctx,a=result.assumptions,b=result.base;
    header(ctx,'Monthly Cash-Flow View','See what is already committed before the modeled home-loan or mortgage payment.','Cash Flow');
    let y=176;
    const rows=[
      ['Take-home income',a.takeHomeIncome],['Essential spending',-a.essentialSpending],['Existing debt',-a.existingDebt],['Protected savings / investing',-a.protectedSavings],['Principal & interest payment',-b.payment],['Other ownership costs',-a.ownershipCosts],['Amount left after housing',b.monthlyLeftover]
    ];
    const max=Math.max(a.takeHomeIncome,1);
    rows.forEach((r,idx)=>{
      card(ctx,M,y,CW,62,idx===6?C.pale:C.white,idx===6?'#b9ded8':C.line,10);
      P().text(ctx,r[0],M+14,y+24,{size:9.3,weight:850,color:C.ink});
      P().text(ctx,money(Math.abs(r[1]),opt.currency,opt.locale),W-M-14,y+24,{size:10,weight:900,color:r[1]<0?'#8b5a17':C.navy,align:'right'});
      if(idx<6){const width=Math.min(CW-28,Math.max(2,(Math.abs(r[1])/max)*(CW-28)));ctx.fillStyle=idx===0?C.teal:'#d9e5ea';ctx.fillRect(M+14,y+38,width,8);}
      y+=72;
    });
    y+=12;
    card(ctx,M,y,CW,113,b.bufferDifference>=0?C.pale:C.rose,b.bufferDifference>=0?'#b9ded8':'#e6c6bf',11);
    P().text(ctx,'Chosen free-cash buffer',M+15,y+29,{size:11,weight:900,color:C.tealDark});
    P().text(ctx,money(a.freeBuffer,opt.currency,opt.locale),M+15,y+62,{size:21,weight:900,color:C.navy});
    P().text(ctx,'Difference after housing',W-M-15,y+29,{size:9.5,weight:850,color:C.muted,align:'right'});
    P().text(ctx,money(b.bufferDifference,opt.currency,opt.locale),W-M-15,y+62,{size:18,weight:900,color:b.bufferDifference>=0?C.tealDark:'#9a4134',align:'right'});
    P().wrappedText(ctx,b.bufferDifference>=0?'The modeled plan leaves at least the amount you chose to keep free each month.':'The entered home price and assumptions use more of the monthly cash flow than your chosen free-cash buffer allows.',M+15,y+88,CW-30,{size:8.9,lineHeight:12.5,weight:550,color:C.ink,maxLines:2});
    y+=137;
    P().text(ctx,'What is not automatically added',M,y,{size:15,weight:900,color:C.navy});rule(ctx,M,W-M,y+13);y+=31;
    P().wrappedText(ctx,'Carrowmont does not invent local property taxes or rates, insurance, service charges, HOA or strata fees, maintenance, stamp duty, closing costs or other buying costs. Enter relevant recurring ownership costs yourself and plan separately for one-off purchase costs.',M,y,CW,{size:9.4,lineHeight:14,weight:550,color:C.ink,maxLines:5});
    footer(ctx,'Home Affordability · Cash Flow');return pg.canvas;
  }
  function ratePage(result,opt){
    const pg=page(),ctx=pg.ctx,a=result.assumptions,b=result.base,h=result.higherRate;
    header(ctx,'Rate & Assumption Check','A simple comparison using your entered rate and optional higher-rate check.','Rate Check');
    let y=176;
    const head=['Scenario','Rate','Home price','Payment','Monthly leftover'],xs=[M+8,M+200,M+285,M+430,W-M-8];
    ctx.fillStyle='#eef6f7';ctx.fillRect(M,y,CW,34);head.forEach((v,j)=>P().text(ctx,v,xs[j],y+23,{size:8.5,weight:900,color:C.navy,align:j===4?'right':'left'}));y+=34;
    const scenarios=[['Entered assumptions',b]];if(h)scenarios.push(['Higher-rate check',h]);
    scenarios.forEach((row,idx)=>{const s=row[1],hh=52;if(idx%2){ctx.fillStyle='#fbfdfe';ctx.fillRect(M,y,CW,hh);}P().text(ctx,row[0],xs[0],y+32,{size:9,weight:850,color:idx?C.ink:C.tealDark});P().text(ctx,rate(s.annualRate),xs[1],y+32,{size:9,weight:750,color:C.ink});P().text(ctx,money(s.homePrice,opt.currency,opt.locale),xs[2],y+32,{size:9,weight:750,color:C.ink});P().text(ctx,money(s.payment,opt.currency,opt.locale),xs[3],y+32,{size:9,weight:750,color:C.ink});P().text(ctx,money(s.monthlyLeftover,opt.currency,opt.locale),xs[4],y+32,{size:9,weight:750,color:C.ink,align:'right'});rule(ctx,M,W-M,y+hh);y+=hh;});
    y+=30;
    P().text(ctx,'How the estimate is calculated',M,y,{size:16,weight:900,color:C.navy});rule(ctx,M,W-M,y+13);y+=31;
    card(ctx,M,y,CW,100,C.light,C.line,10);
    P().text(ctx,'1. Find monthly room for the loan payment',M+14,y+27,{size:11,weight:900,color:C.tealDark});
    P().wrappedText(ctx,'Take-home income − essentials − existing debt − protected savings − free-cash buffer − other ownership costs.',M+14,y+53,CW-28,{size:9.4,lineHeight:14,weight:550,color:C.ink,maxLines:3});y+=117;
    card(ctx,M,y,CW,100,C.light,C.line,10);
    P().text(ctx,'2. Convert that payment room into a loan amount',M+14,y+27,{size:11,weight:900,color:C.tealDark});
    P().wrappedText(ctx,'For budget mode, Carrowmont works backward using the rate, term and standard amortizing-payment formula. At 0% interest, it uses payment × number of months.',M+14,y+53,CW-28,{size:9.4,lineHeight:14,weight:550,color:C.ink,maxLines:3});y+=117;
    card(ctx,M,y,CW,100,C.light,C.line,10);
    P().text(ctx,'3. Add the deposit or down payment',M+14,y+27,{size:11,weight:900,color:C.tealDark});
    P().wrappedText(ctx,'The modeled home price is the loan amount plus the deposit you entered. In “Check a home price” mode, the process runs forward from the chosen home price instead.',M+14,y+53,CW-28,{size:9.4,lineHeight:14,weight:550,color:C.ink,maxLines:3});y+=131;
    P().text(ctx,'Important limitations',M,y,{size:15,weight:900,color:C.navy});rule(ctx,M,W-M,y+13);y+=31;
    const notes=['No lender debt-to-income or loan-to-value rule is assumed.','No tax, stamp duty, insurance premium or local legal fee is estimated automatically.','The optional higher-rate check is not a forecast and is not a lender stress test.','Actual mortgage or home-loan products can use different rates, fees, repayment timing and approval criteria.'];
    notes.forEach(n=>{P().text(ctx,'•',M+2,y+2,{size:12,weight:900,color:C.teal});P().wrappedText(ctx,n,M+18,y,CW-18,{size:9.2,lineHeight:13.5,weight:550,color:C.ink,maxLines:2});y+=42;});
    footer(ctx,'Home Affordability · Rate & Method');return pg.canvas;
  }
  function nextPage(result,opt){
    const pg=page(),ctx=pg.ctx,a=result.assumptions;
    header(ctx,'How to Use This Estimate','Use the number as a starting point for a bigger home-buying decision.','Next Steps');
    let y=176;
    const steps=[
      ['1','Check the missing ownership costs','Estimate the recurring property costs that apply where you live and to the type of home you are considering.'],
      ['2','Compare with renting','Use Carrowmont Rent vs Buy to compare the broader cash-flow trade-off rather than looking only at the mortgage payment.'],
      ['3','Model the actual loan','When you have a likely loan amount and product rate, use the Loan / EMI Calculator for payment, total-interest and amortization detail.'],
      ['4','Test a harder month','Ask whether the plan still leaves room for emergencies, irregular bills and the savings goals you do not want to abandon.'],
      ['5','Then check lender terms','Treat lender approval as a separate question. Compare the lender’s verified figures, fees, rules and product terms with your own household budget.']
    ];
    steps.forEach(([n,t,d])=>{card(ctx,M,y,CW,100,C.light,C.line,11);card(ctx,M+14,y+20,42,42,C.pale,'#b9ded8',21);P().text(ctx,n,M+35,y+48,{size:14,weight:900,color:C.tealDark,align:'center'});P().text(ctx,t,M+70,y+31,{size:11.2,weight:900,color:C.navy});P().wrappedText(ctx,d,M+70,y+56,CW-86,{size:8.9,lineHeight:13,weight:550,color:C.ink,maxLines:3});y+=114;});
    y+=6;
    card(ctx,M,y,CW,132,C.warm,'#ead1a9',11);
    P().text(ctx,'Keep the estimate in perspective',M+15,y+29,{size:12.6,weight:900,color:'#8b5a17'});
    P().wrappedText(ctx,`Your entered rate is ${rate(a.annualRate)}, your term is ${a.termYears} years and your chosen monthly free-cash buffer is ${money(a.freeBuffer,opt.currency,opt.locale)}. Those are planning assumptions, not recommendations. Re-run the calculator when any of them changes materially.`,M+15,y+55,CW-30,{size:9.2,lineHeight:13.2,weight:550,color:C.ink,maxLines:4});
    y+=158;
    P().text(ctx,'Related Carrowmont tools',M,y,{size:15,weight:900,color:C.navy});rule(ctx,M,W-M,y+13);y+=31;
    [['Rent vs Buy','Compare buying with continuing to rent.'],['Loan / EMI Calculator','Model a specific loan and total interest.'],['Mortgage / Home Loan Payoff','See what extra payments may change after the loan starts.'],['Rate Rise & Budget Stress','Run a deeper payment stress test.']].forEach((r,idx)=>{const h=46;if(idx%2){ctx.fillStyle='#fbfdfe';ctx.fillRect(M,y,CW,h);}P().text(ctx,r[0],M+8,y+20,{size:9,weight:850,color:C.tealDark});P().text(ctx,r[1],M+210,y+20,{size:8.7,weight:550,color:C.ink});rule(ctx,M,W-M,y+h);y+=h;});
    footer(ctx,'Home Affordability · Next Steps');return pg.canvas;
  }
  async function generate(opt={}){
    const result=opt.result;
    if(!result||!P())throw new Error('Home affordability report helpers are unavailable.');
    const canvases=[summaryPage(result,opt),cashFlowPage(result,opt),ratePage(result,opt),nextPage(result,opt)];
    await P().downloadCanvases(canvases,{filename:'carrowmont-home-affordability-report.pdf',quality:.94});
  }
  window.CarrowmontHomeAffordabilityPdfRenderer={generate};
})();

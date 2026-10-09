(function () {
  'use strict';

  const W = 794, H = 1123, M = 42, CW = W - M * 2;
  const C = { navy:'#102945', ink:'#17314f', teal:'#0e827a', tealDark:'#08756d', muted:'#506b84', line:'#cbdbe3', pale:'#e9f7f4', warm:'#fff7e8', white:'#fff', light:'#f8fbfc' };
  const P = () => window.CarrowmontPdfExport;
  const L = () => window.CarrowmontLocale;
  const S = () => window.CarrowmontReportStandard;
  const page = () => P().createPage({ width:W, height:H, scale:2.5, background:'#fff' });
  const money = value => L().formatMoney(value,{maximumFractionDigits:0});
  const compact = value => L().formatCompactMoney(value,{maximumFractionDigits:1});
  const pct = value => `${(Number(value)*100).toFixed(1).replace(/\.0$/,'')}%`;
  const multiple = value => `${Number(value).toFixed(2).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1')}×`;
  const card = (ctx,x,y,w,h,fill=C.white,stroke=C.line,r=10) => P().roundRect(ctx,x,y,w,h,r,fill,stroke,1);
  const hline = (ctx,x1,x2,y,color=C.line,width=1) => P().line(ctx,x1,y,x2,y,color,width);

  function footer(ctx,label){P().text(ctx,'CARROWMONT',M,H-34,{size:9.8,weight:900,color:C.teal});P().text(ctx,label,W-M,H-34,{size:8.7,weight:550,color:C.muted,align:'right'});}
  function header(ctx,title,subtitle,label){P().text(ctx,'CARROWMONT',M,51,{size:14,weight:900,color:C.teal});P().text(ctx,label,W-M,51,{size:9.2,weight:650,color:C.muted,align:'right'});P().text(ctx,title,M,92,{size:25,weight:900,color:C.navy});if(subtitle)P().wrappedText(ctx,subtitle,M,116,CW,{size:10.2,lineHeight:14,weight:550,color:C.muted,maxLines:2});hline(ctx,M,W-M,149,C.navy,2);}

  function summaryPage(result){
    const pg=page(),ctx=pg.ctx,a=result.inputs;
    header(ctx,'Your FI Number by Spending','A first-pass target from portfolio-funded spending and a visible withdrawal-rate assumption.','Summary');
    let y=177;
    card(ctx,M,y,CW,112,C.pale,'#b9ded8',12);
    P().text(ctx,'FI number today',M+16,y+28,{size:11,weight:900,color:C.tealDark});
    P().text(ctx,compact(result.fiToday),M+16,y+65,{size:27,weight:900,color:C.navy});
    P().text(ctx,`${money(result.annualSpendingToday)} annual spending · ${pct(a.withdrawalRate)} rate · ${multiple(result.fiMultiple)}`,M+16,y+91,{size:9.8,weight:700,color:C.ink});
    if(a.yearsUntilFi>0){P().text(ctx,`Future nominal target in ${a.yearsUntilFi} years`,W-M-16,y+36,{size:9.5,weight:800,color:C.muted,align:'right'});P().text(ctx,compact(result.fiFuture),W-M-16,y+65,{size:18,weight:900,color:C.navy,align:'right'});P().text(ctx,`${pct(a.inflationRate)} inflation assumption`,W-M-16,y+91,{size:9.2,weight:650,color:C.muted,align:'right'});}
    else{P().text(ctx,'Today’s-money view',W-M-16,y+46,{size:11,weight:850,color:C.muted,align:'right'});P().text(ctx,'No inflation uplift applied',W-M-16,y+75,{size:12,weight:800,color:C.navy,align:'right'});}
    y+=139;

    P().text(ctx,'Inputs used',M,y,{size:16,weight:900,color:C.navy});hline(ctx,M,W-M,y+13);y+=31;
    const rows=[['Country / currency',`${L().getProfile().label} · ${L().getCurrency()}`],['Spending view',a.view==='monthly'?'Monthly':'Annual'],['Entered spending',money(a.spending)],['Annual portfolio-funded spending',money(result.annualSpendingToday)],['Planning withdrawal rate',pct(a.withdrawalRate)],['Years until future-money view',String(a.yearsUntilFi)],['Annual inflation assumption',pct(a.inflationRate)]];
    rows.forEach((row,i)=>{const h=42;if(i%2){ctx.fillStyle='#fbfdfe';ctx.fillRect(M,y,CW,h);}P().text(ctx,row[0],M+8,y+26,{size:9.3,weight:800,color:C.muted});P().text(ctx,row[1],W-M-8,y+26,{size:9.7,weight:800,color:C.ink,align:'right'});hline(ctx,M,W-M,y+h);y+=h;});
    y+=26;
    P().text(ctx,'What this number means',M,y,{size:16,weight:900,color:C.navy});hline(ctx,M,W-M,y+13);y+=31;
    const text=`At a ${pct(a.withdrawalRate)} planning withdrawal rate, ${money(result.annualSpendingToday)} of annual portfolio-funded spending corresponds to about ${money(result.fiToday)} in today’s money.${a.yearsUntilFi>0?` With ${pct(a.inflationRate)} assumed inflation for ${a.yearsUntilFi} years, the future nominal illustration is about ${money(result.fiFuture)}.`:''}`;
    ctx.font='550 10px Arial, sans-serif';
    const count=Math.min(6,(P().linesForText?.(ctx,text,CW-32)||[]).length||4), boxH=Math.max(78,32+count*15);
    card(ctx,M,y,CW,boxH,C.light,C.line,11);P().wrappedText(ctx,text,M+16,y+26,CW-32,{size:10,lineHeight:15,weight:550,color:C.ink,maxLines:6});y+=boxH+20;
    card(ctx,M,y,CW,83,C.warm,'#ead1a9',11);P().text(ctx,'Educational use only',M+16,y+27,{size:13,weight:900,color:'#8b5a17'});P().wrappedText(ctx,'This is a deterministic first-pass target. The selected withdrawal rate is a planning assumption, not a guaranteed or universally safe rate. The standard report is available without an account.',M+16,y+51,CW-32,{size:9.4,lineHeight:13,weight:550,color:C.ink,maxLines:3});
    footer(ctx,'FI Number by Spending · Summary');return pg.canvas;
  }

  async function sensitivityPage(result,chartSvg){
    const pg=page(),ctx=pg.ctx,a=result.inputs;
    header(ctx,'Sensitivity & comparison','See how withdrawal-rate and spending assumptions change the first-pass target.','Sensitivity');
    let y=174;
    P().text(ctx,'Withdrawal-rate comparison',M,y,{size:16,weight:900,color:C.navy});hline(ctx,M,W-M,y+13);y+=29;
    const headers=['Rate','Multiple','FI number today',...(a.yearsUntilFi>0?['Future nominal FI number']:[])];
    const xs=a.yearsUntilFi>0?[M+8,M+110,M+260,W-M-8]:[M+8,M+150,W-M-8];
    ctx.fillStyle='#eef6f7';ctx.fillRect(M,y,CW,31);headers.forEach((h,i)=>P().text(ctx,h,xs[i],y+21,{size:8.6,weight:900,color:C.navy,align:i===headers.length-1?'right':'left'}));y+=31;
    result.rateComparison.forEach((row,i)=>{const h=34;if(i%2){ctx.fillStyle='#fbfdfe';ctx.fillRect(M,y,CW,h);}P().text(ctx,pct(row.rate),xs[0],y+25,{size:9.2,weight:row.isSelected?900:750,color:row.isSelected?C.tealDark:C.ink});P().text(ctx,multiple(row.multiple),xs[1],y+25,{size:9.2,weight:700,color:C.ink});P().text(ctx,money(row.fiToday),xs[2],y+25,{size:9.2,weight:700,color:C.ink,align:a.yearsUntilFi>0?'left':'right'});if(a.yearsUntilFi>0)P().text(ctx,money(row.fiFuture),xs[3],y+25,{size:9.2,weight:700,color:C.ink,align:'right'});hline(ctx,M,W-M,y+h);y+=h;});
    y+=24;
    P().text(ctx,'Spending sensitivity',M,y,{size:16,weight:900,color:C.navy});hline(ctx,M,W-M,y+13);y+=27;
    card(ctx,M,y,CW,280,C.light,C.line,12);if(chartSvg)await P().drawSvgElement(ctx,chartSvg,M+14,y+10,CW-28,260);y+=300;
    const sh=['Level','Annual spending','FI number today',...(a.yearsUntilFi>0?['Future nominal']:[])], sx=a.yearsUntilFi>0?[M+8,M+120,M+330,W-M-8]:[M+8,M+180,W-M-8];
    ctx.fillStyle='#eef6f7';ctx.fillRect(M,y,CW,31);sh.forEach((h,i)=>P().text(ctx,h,sx[i],y+21,{size:8.5,weight:900,color:C.navy,align:i===sh.length-1?'right':'left'}));y+=31;
    result.spendingSensitivity.forEach((row,i)=>{const h=32;if(i%2){ctx.fillStyle='#fbfdfe';ctx.fillRect(M,y,CW,h);}P().text(ctx,`${row.percentage}%${row.isBaseline?' baseline':''}`,sx[0],y+24,{size:8.8,weight:row.isBaseline?900:700,color:row.isBaseline?C.tealDark:C.ink});P().text(ctx,money(row.annualSpending),sx[1],y+24,{size:8.8,weight:650,color:C.ink});P().text(ctx,money(row.fiToday),sx[2],y+24,{size:8.8,weight:650,color:C.ink,align:a.yearsUntilFi>0?'left':'right'});if(a.yearsUntilFi>0)P().text(ctx,money(row.fiFuture),sx[3],y+24,{size:8.8,weight:650,color:C.ink,align:'right'});hline(ctx,M,W-M,y+h);y+=h;});
    footer(ctx,'FI Number by Spending · Sensitivity');return pg.canvas;
  }

  async function generate(result,options={}){
    if(!result||!P()||!S())throw new Error('Report helpers are unavailable.');
    const canvases=[summaryPage(result),await sensitivityPage(result,options.chartSvg)];
    canvases.push(S().guidePage({
      reportTitle:'Carrowmont FI Number by Spending Report',preparedFrom:'Prepared from the Carrowmont FI Number by Spending calculator',
      howToRead:'Start with the FI number in today’s money, then compare withdrawal-rate and spending sensitivities. The future-money value is a nominal inflation illustration, not a forecast.',
      methodology:[['Annual spending','Monthly portfolio-funded spending is multiplied by 12. Annual view is used directly.'],['FI number today','Annual portfolio-funded spending divided by the selected planning withdrawal rate.'],['Future annual spending','Annual spending today multiplied by (1 + inflation)^years.'],['Future nominal FI target','Future annual spending divided by the same selected withdrawal-rate assumption.'],['Sensitivity','The five spending points use 80%, 90%, 100%, 110% and 120% of entered portfolio-funded spending.']],
      terminology:[['Portfolio-funded spending','The part of lifestyle spending that would need to come from the investment portfolio.'],['Planning withdrawal rate','A modelling assumption used to translate annual spending into a first-pass target; not a guaranteed safe rate.'],['Today’s money','A value expressed in the purchasing-power frame of today.'],['Future nominal money','A future currency amount after applying the entered inflation assumption.'],['Spending multiple','The mathematical reciprocal of the selected withdrawal rate, such as 25× at 4%.']],
      assumptions:'No investment return, tax, fee, pension database, market sequence, probability model or automatic FX conversion is included in this quick-reference calculation.',
      disclaimer:'This report is an educational planning illustration and is not individualized investment, financial, tax, legal or accounting advice. Actual outcomes can differ materially.',
      methodologyMeta:`${result.methodologyVersion} · reviewed 9 October 2026`,methodologyUrl:'https://carrowmont.com/financial-independence-number-by-spending.html#methodology'
    }));
    canvases.push(S().continuePlanningPage({currentTool:'seo3b',intro:'This quick target is one part of a broader plan. Use the full Financial Independence Planner for current assets, recurring investments, return assumptions and target age, then explore the other Carrowmont tools as needed.'}));
    await P().downloadCanvases(canvases,{filename:'carrowmont-fi-number-by-spending-report.pdf',quality:.94});
  }

  window.CarrowmontFINumberBySpendingPdf={generate};
})();

export const money=(cents:number)=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(cents/100);
export const percent=(n:number)=>`${(n*100).toFixed(1)}%`;
export const sum=(a:number[])=>a.reduce((x,y)=>x+y,0);
export const shareText=(n:number)=>n.toLocaleString('en-CA',{maximumFractionDigits:6});
export const catalogue=[
 {name:'Apple',ticker:'AAPL',currency:'USD',type:'Stock',color:'#f9735c',description:'A tiny ownership stake in the company behind iPhone, Mac and Apple services. One company can have big price swings.',fee:0,info:'https://www.apple.com/newsroom/'},
 {name:'Roblox',ticker:'RBLX',currency:'USD',type:'Stock',color:'#fcd34d',description:'Ownership in the company behind the Roblox platform. A popular game platform can still be a risky investment.',fee:0,info:'https://ir.roblox.com/'},
 {name:'Nike',ticker:'NKE',currency:'USD',type:'Stock',color:'#7893ce',description:'Ownership in a sportswear company that sells shoes, clothing and equipment. Sales, competition and costs can change its value.',fee:0,info:'https://investors.nike.com/'},
 {name:'Shopify',ticker:'SHOP',currency:'CAD',type:'Stock',color:'#6ed9b3',description:'Ownership in the Canadian company that helps businesses run online shops. Business growth does not guarantee a rising share price.',fee:0,info:'https://www.shopify.com/investors'},
 {name:'iShares Canadian stocks',ticker:'XIC',currency:'CAD',type:'ETF',color:'#1a1a57',description:'A basket tracking the broad Canadian stock market. Many companies, but still exposed to Canada’s market and major sectors.',fee:.0006,info:'https://www.blackrock.com/ca/investors/en/products/239837/ishares-sptsx-capped-composite-index-etf'},
 {name:'Vanguard U.S. stocks',ticker:'VFV',currency:'CAD',type:'ETF',color:'#a275be',description:'A basket tracking the S&P 500: large U.S. companies. Trades in CAD, but its U.S. investments also bring currency exposure in real life.',fee:.0009,info:'https://fund-docs.vanguard.com/VFV_SandP_500_Index_ETF_9563_FS_EN_CA.pdf'},
 {name:'iShares global stocks',ticker:'XAW',currency:'CAD',type:'ETF',color:'#dc8565',description:'A basket covering U.S., international and emerging-market stocks, excluding Canada. Global does not mean guaranteed or immune to losses.',fee:.0022,info:'https://www.blackrock.com/ca/investors/en/products/272108/ishares-core-msci-all-country-world-ex-canada-index-etf'},
] as const;
export type Price={ticker:string,currency:'CAD'|'USD',close:number,date:string,source:string};
export type PriceSnapshot={schemaVersion:1,verified:boolean,fx:{rate:number,date:string,source:string},prices:Price[]};
const date='2026-10-01';
export const reference:PriceSnapshot={schemaVersion:1,verified:true,fx:{rate:1.4243,date,source:'https://www.bankofcanada.ca/rates/exchange/daily-exchange-rates/'},prices:[
 {ticker:'AAPL',currency:'USD',close:330.32,date,source:'https://stockanalysis.com/stocks/aapl/history/'},
 {ticker:'RBLX',currency:'USD',close:43,date,source:'https://stockanalysis.com/stocks/rblx/history/'},
 {ticker:'NKE',currency:'USD',close:35.15,date,source:'https://stockanalysis.com/stocks/nke/history/'},
 {ticker:'SHOP',currency:'CAD',close:212.10,date,source:'https://stockanalysis.com/quote/tsx/SHOP/history/'},
 {ticker:'XIC',currency:'CAD',close:56.09,date,source:'https://stockanalysis.com/quote/tsx/XIC/history/'},
 {ticker:'VFV',currency:'CAD',close:193.30,date,source:'https://stockanalysis.com/quote/tsx/VFV/history/'},
 {ticker:'XAW',currency:'CAD',close:59.40,date,source:'https://stockanalysis.com/quote/tsx/XAW/history/'},
]};
export type Portfolio={shares:number[],cash:number}; // Cash and holding values in integer CAD cents.
export const emptyPortfolio=(budget:number):Portfolio=>({shares:catalogue.map(()=>0),cash:budget});
export function cadPrices(p:PriceSnapshot){return p.prices.map(c=>c.close*(c.currency==='USD'?p.fx.rate:1))}
export function holdingValues(portfolio:Portfolio,prices:number[]){return portfolio.shares.map((q,i)=>Math.round(q*prices[i]*100))}
export function total(portfolio:Portfolio,prices:number[]){return sum(holdingValues(portfolio,prices))+portfolio.cash}
export function validatePortfolio(p:Portfolio){if(p.shares.length!==catalogue.length||p.shares.some(v=>!Number.isFinite(v)||v<0||v>1e9)||!Number.isSafeInteger(p.cash)||p.cash<0)throw new Error('Invalid portfolio');return p}
export function setHolding(p:Portfolio,i:number,quantity:number,prices:number[]):Portfolio{
 validatePortfolio(p);if(!Number.isInteger(i)||i<0||i>=catalogue.length||!Number.isFinite(quantity)||quantity<0||quantity>1e9)throw new Error('Enter valid non-negative shares.');
 const before=Math.round(p.shares[i]*prices[i]*100),after=Math.round(quantity*prices[i]*100);const cash=p.cash+before-after;
 if(quantity>0&&after===0)throw new Error('The amount must be at least CAD $0.01.');if(!Number.isSafeInteger(cash)||cash<0)throw new Error('Not enough cash. Sell or lower another holding first.');
 return {shares:p.shares.map((v,j)=>j===i?quantity:v),cash};
}
export function trade(p:Portfolio,i:number,quantity:number,side:'buy'|'sell',prices:number[]){if(!Number.isFinite(quantity)||quantity<=0)throw new Error('Enter a positive trade amount.');if(side==='sell'&&quantity>p.shares[i]+1e-10)throw new Error('You cannot sell more shares than you own.');const q=side==='buy'?p.shares[i]+quantity:Math.max(0,p.shares[i]-quantity);return setHolding(p,i,q,prices)}
export function scenarioRates(id:string,target:number){if(!Number.isInteger(target)||target<0||target>3)throw new Error('Choose an individual company.');switch(id){case 'company':return catalogue.map((_,i)=>i===target?-.2:0);case 'decline':return catalogue.map(c=>c.type==='Stock'?-.25:-.15);case 'recovery':return catalogue.map(c=>c.type==='Stock'?.2:.12);case 'mixed':return catalogue.map((c,i)=>i===target?.2:c.type==='Stock'?-.15:-.08);default:throw new Error('Choose a valid scenario.')}}
export const scenarios=[{id:'company',name:'One company falls 20%',description:'Only your selected company falls. All other prices stay unchanged, even ETFs that may hold that company. This isolates company concentration for learning.'},{id:'decline',name:'The stock market falls broadly',description:'Every individual stock falls 25%; every ETF falls 15%. These invented changes are teaching assumptions, not historical returns.'},{id:'recovery',name:'Markets recover',description:'Every individual stock rises 20%; every ETF rises 12%. An independent case from the original snapshot, not a cumulative rebound or prediction.'},{id:'mixed',name:'One company rises; others fall',description:'Your selected company rises 20%; other individual stocks fall 15%; all ETFs fall 8%. Different holdings can move in different directions.'}];
export function simulate(p:Portfolio,prices:number[],rates:number[]){validatePortfolio(p);if(prices.length!==p.shares.length||rates.length!==p.shares.length||rates.some(r=>!Number.isFinite(r)||r<=-1))throw new Error('Invalid event');const eventPrices=prices.map((v,i)=>v*(1+rates[i]));const before=holdingValues(p,prices),after=holdingValues(p,eventPrices);return {prices:eventPrices,values:after,changes:after.map((v,i)=>v-before[i]),total:sum(after)+p.cash,change:sum(after)-sum(before)}}
export function annualFee(p:Portfolio,prices:number[]){return sum(holdingValues(p,prices).map((v,i)=>Math.round(v*catalogue[i].fee)))}
export function parsePriceFile(input:unknown):PriceSnapshot{
 const p=input as PriceSnapshot;const validDate=(d:unknown)=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&!Number.isNaN(Date.parse(d))&&new Date(d+'T00:00:00Z').toISOString().slice(0,10)===d&&d<='2026-10-02';const validURL=(u:unknown)=>{try{const url=new URL(String(u));return url.protocol==='https:'&&!url.username&&!url.password}catch{return false}};
 if(!p||p.schemaVersion!==1||!p.fx||!Number.isFinite(p.fx.rate)||p.fx.rate<=0||p.fx.rate>10||!validDate(p.fx.date)||!validURL(p.fx.source)||!Array.isArray(p.prices)||p.prices.length!==catalogue.length)throw new Error('Use the JSON snapshot template with positive prices, dates and HTTPS sources.');
 const ordered=catalogue.map(c=>{const rows=p.prices.filter(r=>r.ticker===c.ticker);if(rows.length!==1)throw new Error(`Provide exactly one row for ${c.ticker}.`);const r=rows[0];if(r.currency!==c.currency||!Number.isFinite(r.close)||r.close<=0||r.close>1e7||!validDate(r.date)||!validURL(r.source))throw new Error(`Check price, currency, date and source for ${c.ticker}.`);return {ticker:r.ticker,currency:r.currency,close:r.close,date:r.date,source:r.source}});
 return {schemaVersion:1,verified:false,fx:{rate:p.fx.rate,date:p.fx.date,source:p.fx.source},prices:ordered};
}
export const accounts = {
 FHSA:{title:'First Home Savings Account',body:'For eligible Canadian residents age 18+ (19 where the contract age is 19), and 71 or younger at year-end, who meet CRA first-time home buyer conditions, including the spouse/partner test. Room starts when the first FHSA opens: $8,000 that year, with a $40,000 lifetime limit and limited carry-forward. Contributions are generally deductible; qualifying home withdrawals are tax-free. Other withdrawals are generally taxable.',url:'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html'},
 TFSA:{title:'Tax-Free Savings Account',body:'For the usual Canadian-resident case: age 18+ with a valid SIN and available contribution room. Some provinces and territories require age 19 to sign the contract; room still starts at 18. Contributions are not deductible. Investment income and withdrawals are generally tax-free. Withdrawn amounts return as contribution room the next calendar year.',url:'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/opening.html'},
 RRSP:{title:'Registered Retirement Savings Plan',body:'There is no minimum contribution age under tax rules, but you need contribution room, generally based on prior-year earned income; providers may have age requirements. Eligible contributions can reduce taxable income. Growth is usually sheltered while inside; withdrawals are generally taxable. Your own RRSP must mature by the end of the year you turn 71.',url:'https://www.canada.ca/en/revenue-agency/services/tax/individuals/educational-programs/saving-future.html'},
 'Non-registered':{title:'Regular investment account',body:'No TFSA/RRSP contribution-room limit or special tax shelter. Providers set opening requirements; minors may need a parent or guardian arrangement. Interest, dividends and realized capital gains can be taxable, with different tax rules. Ownership and attribution rules can affect whose tax return reports income.',url:'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/investment-income.html'},
};
export type Account = keyof typeof accounts;
export type Snapshot={budget:number,portfolio:Portfolio,prices:PriceSnapshot,account:Account,goal:string,horizon:string,risk:string};
export type Event={id:string,target:number,rates:number[]};

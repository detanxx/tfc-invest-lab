import {assets} from '@/lib/builder';
import {parseYahoo,type MarketQuote} from '@/lib/market';
import {reference} from '@/lib/lab';
const allowed=new Set(assets.map(a=>a.symbol).filter(Boolean));
const cache=new Map<string,{time:number,quote:MarketQuote}>();
async function quote(symbol:string){const cached=cache.get(symbol);if(cached&&Date.now()-cached.time<120000)return cached.quote;
 const res=await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`,{headers:{'User-Agent':'Mozilla/5.0'},signal:AbortSignal.timeout(10000)});if(!res.ok)throw new Error(`Yahoo responded ${res.status}`);const q=parseYahoo(await res.json(),symbol);cache.set(symbol,{time:Date.now(),quote:q});return q;}
export async function GET(req:Request){const symbols=[...new Set((new URL(req.url).searchParams.get('symbols')??'').split(',').filter(Boolean))];if(!symbols.length||symbols.length>12||symbols.some(s=>!allowed.has(s)))return Response.json({error:'Choose up to 12 catalogue symbols.'},{status:400});
 const quotes:Record<string,MarketQuote>={},errors:string[]=[];let fx={rate:reference.fx.rate,date:reference.fx.date,source:reference.fx.source};
 const fxResult=await Promise.allSettled([quote('CAD=X')]);if(fxResult[0].status==='fulfilled'){const q=fxResult[0].value;fx={rate:q.price,date:q.asOf,source:q.source}}else errors.push('Yahoo FX unavailable; using the labelled Bank of Canada reference rate.');
 // Three requests at a time to keep the public quote service load modest.
 for(let i=0;i<symbols.length;i+=3)await Promise.all(symbols.slice(i,i+3).map(async symbol=>{try{quotes[symbol]=await quote(symbol)}catch{errors.push(`${symbol}: Yahoo quote unavailable`)}}));
 return Response.json({quotes,fx,errors,fetchedAt:new Date().toISOString()},{headers:{'Cache-Control':'no-store'}});
}

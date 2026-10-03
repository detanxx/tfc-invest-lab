export type MarketQuote={symbol:string,currency:'CAD'|'USD',price:number,asOf:string,source:string};
export type MarketData={quotes:Record<string,MarketQuote>,fx:{rate:number,date:string,source:string},errors:string[],fetchedAt:string};
export function parseYahoo(input:unknown,symbol:string):MarketQuote{
 const meta=(input as any)?.chart?.result?.[0]?.meta;
 if(!meta||meta.symbol?.toUpperCase()!==symbol.toUpperCase()||!['CAD','USD'].includes(meta.currency)||!Number.isFinite(meta.regularMarketPrice)||meta.regularMarketPrice<=0||!Number.isFinite(meta.regularMarketTime)||meta.regularMarketTime<=0)throw new Error('Quote unavailable or invalid');
 return {symbol,currency:meta.currency,price:meta.regularMarketPrice,asOf:new Date(meta.regularMarketTime*1000).toISOString(),source:`https://finance.yahoo.com/quote/${encodeURIComponent(symbol)}/`};
}

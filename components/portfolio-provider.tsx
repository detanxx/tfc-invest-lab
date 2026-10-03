 'use client';
import {createContext,useContext,useState,type ReactNode} from 'react';
import {assets} from '@/lib/builder';
import type {Account} from '@/lib/lab';
import type {MarketData} from '@/lib/market';
function usePortfolioState(){
const [budget,setBudget]=useState(100000),[amounts,setAmounts]=useState(()=>assets.map(()=>0)),[account,setAccount]=useState<Account>('Non-registered'),[goal,setGoal]=useState('Explore my portfolio'),[assigned,setAssigned]=useState<Account[]>(()=>assets.map(()=>'Non-registered')),[market,setMarket]=useState<MarketData|null>(null);
return {budget,setBudget,amounts,setAmounts,account,setAccount,goal,setGoal,assigned,setAssigned,market,setMarket};
}
const PortfolioContext=createContext<ReturnType<typeof usePortfolioState>|null>(null);
export function PortfolioProvider({children}:{children:ReactNode}){const state=usePortfolioState();return <PortfolioContext.Provider value={state}>{children}</PortfolioContext.Provider>}
export function usePortfolio(){const state=useContext(PortfolioContext);if(!state)throw Error('Portfolio provider missing');return state}

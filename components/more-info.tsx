import type {ReactNode} from 'react';

/** Native disclosure: keyboard accessible, useful on touch screens, no hover required. */
export function MoreInfo({topic,children}:{topic:string;children:ReactNode}) {
 return <details className="more-info"><summary><span aria-hidden="true">ⓘ</span> More info: {topic}</summary><div className="more-info-body">{children}</div></details>;
}

export const definitions = {
 portfolio: 'Your portfolio is everything you’ve put money into, plus your leftover cash. Think of it as your full money mix.',
 allocation: 'Allocation means how you split your money. If you put $250 of a $1,000 budget into one investment, its share of your portfolio is 25%.',
 holdings: 'A holding is an investment in your portfolio. $100 in Apple and $200 in a stock ETF are two holdings. Your remaining cash is part of the portfolio too.',
 types: 'Stocks: a small piece of one company. ETFs (exchange-traded funds): baskets you can buy a piece of. Bonds: loans to governments or companies. Cash: money you haven’t invested. Crypto: digital assets whose prices can swing a lot.',
 prices: 'A reference price is a price saved from a particular time, not a promise of what you could buy or sell for now. CAD means Canadian dollars; USD means U.S. dollars. A ticker, like AAPL, is an investment’s short label on the market.',
 shares: 'A share is a small piece of a company or fund. This tool allows fractional shares: you can practise with part of a share. Units are a similar way to count crypto or the practice bonds. Your entered dollar amount is what counts toward your budget.',
 exchange: 'An exchange rate converts one currency into another. At a rate of 1.40, USD $10 equals CAD $14. We keep the saved rate until you refresh prices. The rate can change in real life.',
 concentration: 'Concentration means a lot of your money depends on one investment. If $600 of your $1,000 is in one company, a price drop in that company could have a big effect on your whole portfolio.',
 diversification: 'Diversification means spreading your money across different investments. Like putting together a team with different strengths, it reduces reliance on one player. It cannot stop every loss. Two ETFs may hold the same companies, so two baskets can still contain many of the same things.',
 fees: 'A fund expense ratio is the share of a fund’s value used each year to cover its costs. MER means management expense ratio. At 0.20%, $500 invested works out to about $1 a year if its value stays the same. Real fund costs affect returns; this tool only shows an estimate and doesn’t subtract it from your budget.',
 accounts: 'The account is the container; investments are what you put inside. Account rules can change how money is taxed. They do not protect you from falling investment prices. This tool lets anyone explore the containers without opening a real account.',
 room: 'Contribution room is the amount you’re allowed to add to a registered account under its rules. It is not the same as the account balance: investment gains and losses can change a balance without being new contributions. This tool does not work out your personal room.',
 tax: 'A contribution is money you add; a withdrawal is money you take out. A tax deduction can reduce the income used to calculate tax. A realized gain is a profit after selling an investment. The CRA (Canada Revenue Agency) administers the tax rules linked here. A dividend is money a company pays to its shareholders. Tax-free means no tax is generally charged on the income or withdrawals covered by that account’s rules.',
 risk: 'Risk means things may turn out differently from what you hoped, including losing money. Volatility means prices move up and down, sometimes quickly. Credit or default risk means a borrower may not repay. Interest-rate risk means changing rates can affect bond prices. Custody risk means something could go wrong with how an asset is stored or accessed.',
 exposure: 'Stock exposure means the part of your money linked to company share prices, including stocks held inside ETFs. An ETF can contain many companies, but those prices can still fall together.',
} as const;

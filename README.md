# TFC Investment Lab

A Teen Finance Club portfolio tool using fictional CAD money. Browse 79 educational instruments, filter by type, industry and market, open instrument details, and allocate holdings to TFSA, RRSP, FHSA or Non-registered accounts. See asset/account distribution and export editable Excel allocations with price and exchange-rate provenance.

## Development

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173/. Run `npm test`, `npm run typecheck`, and `npm run build` for validation. `npm start` runs the production build.

## Vercel

Import this repository into Vercel with the Next.js preset. Use the root directory, `npm run build`, and the default Next.js output. No environment variables, database or API keys are required. Git pushes to main can trigger production deployments when the Git integration is connected.

## Prices and privacy

The server fetches public Yahoo Finance chart quotes and CAD=X on request, with timestamps, timeouts and a two-minute memory cache. The endpoint accepts only catalogue symbols. Quotes may be delayed or unavailable: the original seven securities retain the labelled dated reference snapshot; others support dollar-only allocations. No prices are invented. Refreshing changes reference units, not the fictional dollar allocations.

No login, real trades or brokerage links. Portfolio amounts, goals and account choices stay in browser memory. Only symbols go to the quote service. Download before leaving. Direct crypto eligibility warnings and account education link to official Canadian sources. Personal taxes and contribution room are not calculated.

Fund fees are verified for the original three ETFs; other fund fees are unknown and excluded from the known-cost subtotal. This does not mean they are free. Cash interest and trading/FX fees are assumed zero.

The original TFC logo is used without stretching or alteration. All 13 calculation and spreadsheet tests pass.

## Portfolio pages and pricing

Build `/`, Holdings `/holdings`, and Accounts `/accounts` share an in-memory provider. Use the internal navigation links to keep allocations; a refresh or closing the browser resets them. Download Excel before leaving.

All 75 tradable symbols have a Yahoo Finance snapshot with source and market timestamp in `lib/price-snapshot.json`, retrieved October 2, 2026. FX uses the sourced CAD=X snapshot. Four generic bond categories use explicitly illustrative CAD $100 practice units, not market quotes or actual bond issues. The manual refresh fetches visible symbols. Prices explain reference fractional units; CAD allocations are authoritative and refresh does not mark balances to market.

Direct crypto can only be saved to Non-registered. Account balances are not contribution-room calculations. A holding currently belongs to one account; splitting the same symbol across accounts is not supported.

## Design guide

Read `design.md` before making interface changes. It defines the TFC brand colours, typography, spacing, controls, accessibility and responsive widths. The final section of `app/globals.css` applies the shared design tokens. White-text buttons use the documented accessible coral shade.

Production builds explicitly use Webpack so local and Vercel builds use the same verified CSS pipeline.

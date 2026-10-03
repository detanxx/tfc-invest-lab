# Portfolio flow review — October 2, 2026

Updated app: this Next.js/Vercel folder. The older Vinext folder is not the active version.

## Changes
- Separate Build, Holdings, and Accounts routes. A shared in-memory provider preserves budget, goal, prices, allocations and account assignments through internal navigation.
- All 75 Yahoo-tradable symbols have retrieved price snapshots and timestamps. Four generic bond categories use explicitly illustrative CAD $100 practice units; these are not actual bond issues or market prices. Cash is residual CAD with no interest, counted once.
- USD prices use the dated CAD=X snapshot. The Excel export uses exactly the same quote and FX lookup as the UI.
- Direct crypto allocations must use Non-registered in the UI. CRA's qualified-investment folio identifies direct cryptocurrency as non-qualified for registered plans.
- Removed the FHSA balance-based contribution-limit warning: account balance is not a measure of contributions or available room.
- Holdings includes asset allocation, reference units, editable account assignment, concentration, overlap education and known fund costs. Accounts includes each account's holdings and a separate selector for the remaining cash.
- Fixed budget input to show the shared budget after changing pages.

## Validation
- TypeScript and Next.js production build pass, including /holdings and /accounts.
- 15 tests pass. They cover allocation limits, cash reconciliation, account totals, quote validation, FX, fees and Excel read/write round trips. Legacy scenario tests also remain passing; scenarios are not in the active UI.
- Browser test: allocate CAD $400 to Apple; CAD $600 remains as cash. Navigate to Holdings without losing state, move Apple to TFSA, navigate to Accounts: TFSA $400 and Non-registered $600 cash.
- Mobile viewport: document width equals 390px viewport width, without horizontal page overflow.
- Browser download action reported Excel download started; browser automation could not obtain the saved download path. Workbook content was independently round-trip verified by automated tests.

## Intentional limits
- Each instrument currently belongs to one account; splitting one ticker across accounts is not supported.
- Refreshing prices changes reference units, not dollar allocation values. This is an allocation builder, not a mark-to-market trading simulator.
- Fund fees are verified for only the original three ETFs; unknown fund fees remain disclosed and excluded from the known-cost estimate.
- Internal navigation retains memory; a browser refresh, closing, or full external navigation resets the session. Download before leaving.
- No personal taxes, real contributions, trades or investment recommendations.

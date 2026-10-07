# TFC App Design System

This is the design guide for TFC Invest Lab. Use it for all new screens and component changes.

## Brand / feel
Friendly, modern, youthful and educational. Should feel polished but not corporate. Designed primarily for teenagers, parents and facilitators.

## Colours
| Token | Colour |
| --- | --- |
| Primary Navy | #1A1A57 |
| Deep Indigo | #161633 |
| Coral / Primary CTA | #F9735C |
| Aquamarine / Success | #6ED9B3 |
| Mustard / Highlight | #FCD34D |
| Background | #FBF6EE |
| Secondary Background | #F2E9DD |
| Light Neutral | #E2E2EB |

## Typography
Use one font family throughout the product. Preferred: Inter or similar clean sans-serif.

| Role | Size / weight |
| --- | --- |
| Page title | 32px / 700 |
| Section heading | 24px / 700 |
| Card heading | 18px / 600 |
| Body | 16px / 400 |
| Small text | 14px / 400 |

## Layout
Maximum content width: 1200px.

Page horizontal padding: desktop 32px; tablet 24px; mobile 16px.

Use an 8px spacing system: 4, 8, 16, 24, 32, 48, 64.

## Component style
### Cards
White or floral-white background; 12px border radius; 1px subtle neutral border; very light shadow; 24px padding.

### Primary button
Coral #F9735C; white text; 10px border radius; medium/semibold weight; 44–48px minimum height.

### Secondary button
White/light background; navy border; navy text.

### Inputs
44–48px height; 8–10px border radius; neutral border; strong coral/navy focus state.

## Navigation
Navy text; clear active state; avoid overly complex sidebars; same header structure across applications where possible.

## Data visualization
Use brand colours consistently: navy = primary data; aquamarine = positive; coral = warning/attention; mustard = secondary highlight. Always include readable labels.

## Accessibility
Maintain WCAG AA contrast. Do not communicate status through colour alone. All form fields must have labels. Buttons should have clear descriptive text.

## Responsive design
All applications must work at 375px mobile, 768px tablet, 1024px laptop and 1440px desktop.

## Implementation notes
- The exact requested guide is preserved above. When colour and contrast requirements conflict, prioritize the guide's WCAG AA requirement.
- White text on brand coral #F9735C has only about 2.7:1 contrast. For buttons with white text, use the accessible coral shade #B83C28 (about 5.7:1); preserve #F9735C for brand accents, borders and attention graphics. Do not use pale aquamarine or mustard as text on white.
- This app uses Arial, a clean sans-serif, throughout. It avoids external font requests and stays consistent with the guide's allowance for a similar font.
- Interactive neutral borders use #79798F so control boundaries remain visible. Decorative card borders use Light Neutral.
- The supplied TFC logo stays unchanged and proportional, including its favicon.
- Central design-system overrides are at the end of app/globals.css. Use these tokens rather than adding competing ad hoc styles.

### Invest Lab navigation reference
Use the user-provided TFC Compound Lab header style: unchanged TFC logo and product name on the left, page links in the same header on the right. Inactive links are plain navy text. The current page has a cream background, semibold navy text, rounded corners and a coral bottom border. Keep `aria-current="page"` and visible keyboard focus. On phones the links wrap onto a full-width second header row. Avoid the previous separate filled-pill navigation.

### Shared footer
All pages end with the same cream footer: unchanged TFC logo and muted navy product name on the left, plain-language education, risk, data-storage and CAD information on the right. Describe this app accurately: fictional allocations, no trades, in-memory portfolio calculations, and server-backed Yahoo price refreshes. Keep the download-before-leaving reminder and Excel action. Stack the footer on tablet and mobile.

Header branding uses bold lowercase `invest lab.` with a coral dot, and the subtext “Explore your money mix.” beneath it, following the supplied Compound Lab header reference. Keep the logo unchanged.

Mobile layout: the header grows with its navigation and stays in normal page flow. Excel download remains in the footer on phones. Instrument rows use explicit grid areas, filters stack, and the catalogue expands naturally rather than clipping rows in a nested scroll area.

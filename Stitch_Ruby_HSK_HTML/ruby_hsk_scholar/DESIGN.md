---
name: Ruby HSK Scholar
colors:
  surface: '#fdf9f4'
  surface-dim: '#ddd9d5'
  surface-bright: '#fdf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ee'
  surface-container: '#f1ede8'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e6e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#534340'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f4f0eb'
  outline: '#86736f'
  outline-variant: '#d8c2bd'
  surface-tint: '#8d4c41'
  primary: '#642c22'
  on-primary: '#ffffff'
  primary-container: '#804237'
  on-primary-container: '#ffb6a9'
  inverse-primary: '#ffb4a6'
  secondary: '#924b27'
  on-secondary: '#ffffff'
  secondary-container: '#fea277'
  on-secondary-container: '#773614'
  tertiary: '#433a39'
  on-tertiary: '#ffffff'
  tertiary-container: '#5b5150'
  on-tertiary-container: '#d3c4c2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a6'
  on-primary-fixed: '#390b05'
  on-primary-fixed-variant: '#70362b'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#ffb694'
  on-secondary-fixed: '#351000'
  on-secondary-fixed-variant: '#743411'
  tertiary-fixed: '#eedfdd'
  tertiary-fixed-dim: '#d2c3c1'
  on-tertiary-fixed: '#211a19'
  on-tertiary-fixed-variant: '#4e4543'
  background: '#fdf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e6e2dd'
typography:
  display-lg:
    fontFamily: Noto Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Noto Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Noto Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  container-max: 1280px
---

## Brand & Style

The design system is crafted for an educational platform that balances academic rigor with a youthful, welcoming energy. It positions itself as a "scholarly companion"—premium enough to feel authoritative for HSK certification, yet cute and approachable enough to reduce the friction of learning a difficult language.

The visual style is **Modern Tactile with Glassmorphism**. It utilizes soft, organic shapes and semi-transparent layers to create a sense of depth and friendliness. The mood is warm, intellectual, and high-end, moving away from cold institutional aesthetics in favor of an "ivory tower" meets "modern lifestyle" vibe. Key visual drivers include generous whitespace, high-quality editorial layouts, and smooth, soft-touch interface elements.

## Colors

The palette is rooted in earth tones and warm neutrals to evoke a sense of heritage and comfort.

*   **Primary (#804237):** A deep, warm brown used for brand identification, primary actions, and scholarly emphasis.
*   **Secondary (#E78F65):** A soft coral that provides a youthful pop of color. It is used for highlights, progress indicators, and call-to-action accents.
*   **Tertiary (#191211):** A deep charcoal used for high-contrast text and as the canvas for the Dark Mode experience.
*   **Neutral (#F9F5F0):** An ivory cream that serves as the primary background in Light Mode, providing a softer, more premium feel than pure white.

In **Dark Mode**, the background shifts to the Tertiary color, while Ivory Cream and Coral are used for surface accents and interactive elements to maintain legibility and warmth.

## Typography

The design system relies exclusively on **Noto Sans** to ensure maximum legibility and extensive character support for multilingual HSK content (including Chinese characters). 

The type scale is generous, prioritizing readability for long-form educational content. Headlines use tighter letter spacing and heavier weights to command attention, while body text uses a comfortable line height (1.6) to prevent eye fatigue during study sessions. Display styles should be used sparingly for hero sections and major course titles.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with high-density margins to create an editorial, "book-like" feel on desktop.

*   **Desktop:** 12-column grid, 24px gutters, max-width 1280px. Content is centered with significant breathing room (xl spacing) between sections to reduce cognitive load.
*   **Tablet:** 8-column grid, 20px gutters.
*   **Mobile:** 4-column grid, 16px gutters and margins.

Spacing follows an 8px rhythm. For educational cards and profile sections, use 'md' (24px) padding to ensure the UI feels "roomy" and premium.

## Elevation & Depth

This design system uses a combination of **Tonal Layers** and **Glassmorphism** to establish hierarchy. 

1.  **Level 0 (Base):** Neutral (#F9F5F0) background.
2.  **Level 1 (Cards):** Slightly lighter or white surfaces with a soft, diffused shadow (15% opacity Primary color) and a 1px soft-brown border (5% opacity).
3.  **Level 2 (Glass):** Used for navigation bars and overlays. Uses a backdrop blur (20px) with a semi-transparent Ivory Cream fill (80% opacity).
4.  **Level 3 (Popovers):** Higher elevation with a more pronounced, warm shadow to suggest tangibility.

Shadows are never pure black; they are always tinted with the Primary warm brown to maintain the "cute/warm" brand personality.

## Shapes

The shape language is defined by **Soft Roundedness**.

*   **Standard UI Elements:** (Inputs, Small Cards) use a 0.5rem (8px) radius.
*   **Large Educational Cards:** Use `rounded-lg` (1rem / 16px) to emphasize the friendly, youthful brand.
*   **Avatars & Interactive Pills:** Use `rounded-xl` or full pill shapes to lean into the "cute" aesthetic.

Circular elements (like profile images or iconic action buttons) should always have a subtle 2px border in a contrasting warm tone to make them feel "framed" and premium.

## Components

### Course Cards
The centerpiece of the experience. Cards should use a Level 1 elevation with a vertical layout. Images should have a 12px top-radius. Include a Secondary-colored progress bar for active courses and a small Primary-colored chip for the HSK level (e.g., "HSK 4").

### Buttons
*   **Primary:** Solid Primary (#804237) with white text. Pill-shaped. Subtle lift on hover.
*   **Secondary:** Ghost style with a Primary border or Solid Secondary (#E78F65) for high-urgency marketing actions.
*   **Tertiary:** Transparent background with Primary text for low-priority navigation.

### Input Fields
Inputs should use the Neutral background with a slightly darker cream border. On focus, the border transitions to a 2px Primary stroke. Use Noto Sans Label-lg for field titles.

### Profile Sections
Profile headers should utilize the Glassmorphism effect over a warm gradient background. Use large, pill-shaped chips for "Badges" or "Achievements" to reinforce the youthful, gamified nature of the scholar experience.

### Navigation Patterns
A top-docked navigation bar with a glass effect. Links should use high-contrast Tertiary text, transitioning to Primary with a soft underline dot on active state.
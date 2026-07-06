---
name: Vibrant Academic Ivory
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
  on-surface-variant: '#5a403f'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f4f0eb'
  outline: '#8e706f'
  outline-variant: '#e2bebc'
  surface-tint: '#b52330'
  primary: '#b52330'
  on-primary: '#ffffff'
  primary-container: '#ff5a5f'
  on-primary-container: '#61000e'
  inverse-primary: '#ffb3b0'
  secondary: '#785a00'
  on-secondary: '#ffffff'
  secondary-container: '#ffd167'
  on-secondary-container: '#765900'
  tertiary: '#006c4f'
  on-tertiary: '#ffffff'
  tertiary-container: '#00a87d'
  on-tertiary-container: '#003424'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b0'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001b'
  secondary-fixed: '#ffdf9b'
  secondary-fixed-dim: '#edc157'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#54fdc4'
  tertiary-fixed-dim: '#27e0a9'
  on-tertiary-fixed: '#002116'
  on-tertiary-fixed-variant: '#00513b'
  background: '#fdf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e6e2dd'
typography:
  display-lg:
    fontFamily: Noto Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  title-md:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
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
  lg: 40px
  xl: 64px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is tailored for a youthful, energetic academic environment. It balances the rigor of scholarship with a "cute" and approachable aesthetic. The primary goal is to evoke a sense of warmth, optimism, and intellectual curiosity. 

The style is **Soft Minimalism** with a **Tactile** edge. It utilizes generous white space (via the ivory base), soft organic shapes, and subtle depth to make the interface feel friendly rather than institutional. The visual language is intentionally "bouncy" and accessible, reducing the friction of learning through welcoming visuals and high-clarity layouts.

## Colors

The palette is anchored by a vibrant **Coral Red** (#FF5A5F), which replaces the previous darker tones to inject energy and youthfulness into the brand. The foundation of the UI is a warm **Ivory Cream** (#F9F5F0), providing a soft, non-clinical background that reduces eye strain during long study sessions.

- **Primary (Coral Red):** Used for key actions, progress indicators, and brand-heavy elements.
- **Secondary (Sunlight Yellow):** Used for highlighting "achievements" or secondary interactive elements.
- **Accent (Mint Green):** Used for success states and "correct" indicators in learning modules.
- **Neutral/Base (Ivory):** The primary surface color for the background and container backgrounds.
- **High-Contrast Text:** Deep Charcoal (#2D2926) is used for all body text to ensure AA/AAA accessibility against the ivory background.

## Typography

This design system utilizes **Noto Sans** across all levels to maintain a friendly, clean, and highly legible reading experience. The type scale is generous to accommodate the academic nature of the content.

Headlines are set with heavy weights and slightly tighter letter-spacing for a modern, bold look. Body text prioritizes comfortable line heights (1.5x) to ensure legibility during intense reading or vocabulary study. Label styles use medium or semi-bold weights to remain distinct even at smaller sizes.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** with generous inner padding to reinforce the soft aesthetic. An 8px base unit drives all spacing decisions.

- **Desktop:** 12-column grid with a max-width of 1280px. Centers content to maintain focus.
- **Mobile:** Single column with 16px side margins.
- **Rhythm:** Vertical rhythm is maintained by using `md` (24px) spacing between standard sections and `lg` (40px) between major thematic blocks.

The "no-edge" approach is preferred; containers should feel like they have room to breathe, avoiding cramped text or UI elements.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Soft Ambient Shadows**. 

Instead of harsh black shadows, this design system uses "Colored Shadows"—shadows that take a tiny hint of the primary color (Coral) or the background (Ivory) to feel more integrated. 
- **Level 0 (Base):** Ivory background.
- **Level 1 (Cards):** Pure white surface with a very soft, diffused shadow (15% opacity Coral-Tinted Grey).
- **Level 2 (Active/Floating):** Higher elevation with a larger blur radius for items like floating action buttons or active menus.

Low-contrast outlines in a slightly darker cream are used for input fields and static containers to provide structure without adding visual noise.

## Shapes

The shape language is defined by **High Circularity**. This softens the overall academic tone, making the application feel like a companion or a toy rather than a textbook.

- **Standard Containers:** Use `rounded-2xl` (1rem / 16px) for cards, modals, and large containers.
- **Interactive Elements:** Buttons, tags, and progress bars use **Pill shapes** (full rounding) to maximize the "cute" and energetic aesthetic.
- **Images/Media:** Use `rounded-2xl` to match the container language.

## Components

### Buttons
Primary buttons are pill-shaped, filled with Coral Red, and feature bold white text. Secondary buttons use a thick Coral Red outline with a subtle Ivory-tinted fill on hover.

### Chips & Tags
Used for categories or difficulty levels (HSK levels). These are fully rounded (pill) with soft-tinted backgrounds (e.g., a 10% opacity Coral background with 100% Coral text).

### Lists
Lists are presented as "Floating Cards." Each list item is a separate container with `rounded-xl` corners and a subtle shadow, creating a clear vertical separation of content.

### Input Fields
Inputs use a white background with a soft cream border. On focus, the border thickens and transitions to Coral Red, accompanied by a soft glow effect.

### Cards
Cards are the primary content vessel. They must have a white background, `rounded-2xl` corners, and enough padding (`md`) to ensure the text does not touch the edges.

### Progress Bars
Thick, pill-shaped bars. The "track" is a darker ivory/beige, and the "fill" is the vibrant Coral Red or Mint Green, emphasizing the energy of completion.
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
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Noto Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
  label-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system establishes a sophisticated, scholarly, and warm environment for language learners. It bridges the gap between high-performance educational tools and a comfortable, literary atmosphere. The personality is authoritative yet encouraging, moving away from "gamified" tropes toward a mature "digital library" aesthetic.

The design style is **Corporate Modern with a Minimalist focus on Typography**. It leverages heavy whitespace and a refined color palette to reduce cognitive load during intensive study. The UI evokes a sense of groundedness and intellectual pursuit, making the user feel like a serious scholar rather than just a casual student. Visual interest is maintained through high-contrast branding sections and subtle, warm layering.

## Colors

The palette is rooted in earth tones and deep minerals, reflecting a "Sunset in the Library" mood. 

- **Primary Canvas:** Use `ivory-bg` (#F9F5F0) for all main reading and study areas to ensure maximum legibility and reduced eye strain.
- **Branding & Navigation:** Use `deep-crimson` (#191211) and `rich-sunset` (#351404) for headers, footers, and sidebars to create a strong, grounded frame.
- **Accents:** Use `accent-crimson` (#804237) for primary calls to action and `soft-sunset` (#E9DAD3) for secondary interactive elements or highlighted text backgrounds.
- **Text:** Primary body text should remain high-contrast using `deep-crimson` on `ivory-bg` surfaces.

## Typography

The system utilizes **Noto Sans** exclusively to maintain a professional, versatile, and highly legible experience across all Chinese and Latin characters.

- **Scale:** Headlines use a tight tracking (-0.02em) to feel more editorial and "locked in." 
- **Readability:** Body text is set at 18px (`body-lg`) for primary study content to ensure clarity during character recognition.
- **Hierarchy:** Use weight over color to establish hierarchy. Bold weights should be reserved for essential navigation and headings, while medium weights are used for labels and secondary metadata.

## Layout & Spacing

The layout philosophy follows a **Fixed-Width Centered Grid** for desktop and a **Fluid Grid** for mobile. 

- **Desktop:** A 12-column grid with 24px gutters. The content is capped at 1280px to maintain comfortable line lengths for reading.
- **Mobile:** A 4-column fluid grid with 16px margins. 
- **Rhythm:** An 8px base unit (0.5rem) governs all padding and margins. Vertical rhythm is critical; use double spacing (16px/32px) between logical content blocks to maintain the "scholarly" airy feel.

## Elevation & Depth

Visual depth is achieved through **Tonal Layering** rather than heavy shadows.

- **Surfaces:** Use `pale-sunset` (#EEDCCA) as a subtle "Step 1" elevation on top of the `ivory-bg`. 
- **Outlines:** Instead of shadows, use low-contrast borders (1px) in `soft-sunset` to define card boundaries.
- **Focus:** Reserve shadows for ephemeral elements like dropdowns and modals. These should be "Ambient Shadows"—diffused, low-opacity (10%), using a hint of the `deep-crimson` hue in the shadow color to maintain warmth.

## Shapes

The design system uses **ROUND_EIGHT (0.5rem)** as its base corner radius. 

- **Standard Components:** Buttons, input fields, and cards use 0.5rem (8px).
- **Large Containers:** Educational modules or large cards use 1rem (16px) to feel more inviting.
- **Small Elements:** Chips and tags should use a full pill shape (999px) to contrast against the more structured rectangular forms of the main UI.

## Components

- **Buttons:** Primary buttons use the `accent-crimson` background with white text. Hover states should darken the crimson. Text is semi-bold.
- **Cards:** Cards are styled with a 1px `soft-sunset` border and no shadow. The background is either `white` or `pale-sunset` depending on the content depth.
- **Input Fields:** Use a subtle `pale-sunset` fill with a `soft-sunset` border. On focus, the border transitions to `accent-crimson`.
- **Chips/Tags:** Used for HSK levels (e.g., HSK 1, HSK 2). Each level should use a monochromatic tint of the brand colors (e.g., HSK 6 uses `deep-crimson`, HSK 1 uses a light `soft-sunset`).
- **Mascot Integration:** The mascot should be rendered in a clean, flat-illustration style using the palette's deep tones. It should appear sparingly—as a "tutor" in the corner of lesson screens or as a celebratory icon on completion states.
- **Lists:** Vocabulary lists should feature generous vertical padding (16px) and thin `soft-sunset` dividers to ensure each character is distinct and easy to focus on.
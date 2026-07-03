/**
 * Design tokens — Vibrant Academic Ivory (Stitch design system)
 * Source: Stitch_Ruby_HSK_HTML/vibrant_academic_ivory/DESIGN.md
 *
 * Use CSS vars (var(--color-*)) in components, use these consts
 * only when you need the raw hex in TypeScript logic (e.g. canvas, chart).
 */

export const Colors = {
    // Primary palette — Deep Coral Red
    primary: '#b52330',
    primaryHover: '#9e1e2a',
    primaryContainer: '#ff5a5f',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#61000e',
    primaryFixed: '#ffdad8',
    primaryFixedDim: '#ffb3b0',
    inversePrimary: '#ffb3b0',

    // Secondary — Sunlight Yellow
    secondary: '#785a00',
    onSecondary: '#ffffff',
    secondaryContainer: '#ffd167',
    onSecondaryContainer: '#765900',
    secondaryFixed: '#ffdf9b',
    secondaryFixedDim: '#edc157',

    // Tertiary — Mint Green
    tertiary: '#006c4f',
    onTertiary: '#ffffff',
    tertiaryContainer: '#00a87d',
    onTertiaryContainer: '#003424',
    tertiaryFixed: '#54fdc4',
    tertiaryFixedDim: '#27e0a9',

    // Surface / Background — Ivory Cream
    background: '#fdf9f4',
    surface: '#fdf9f4',
    surfaceBright: '#fdf9f4',
    surfaceDim: '#ddd9d5',
    surfaceVariant: '#e6e2dd',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f7f3ee',
    surfaceContainer: '#f1ede8',
    surfaceContainerHigh: '#ebe8e3',
    surfaceContainerHighest: '#e6e2dd',
    inverseSurface: '#31302d',
    inverseOnSurface: '#f4f0eb',

    // Content colors
    onBackground: '#1c1c19',
    onSurface: '#1c1c19',
    onSurfaceVariant: '#5a403f',

    // Outline
    outline: '#8e706f',
    outlineVariant: '#e2bebc',

    // Error
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#93000a',

    // Surface tint
    surfaceTint: '#b52330',
} as const;

export const Typography = {
    displayLg: { fontSize: '48px', lineHeight: '56px', fontWeight: '700', letterSpacing: '-0.02em' },
    headlineLg: { fontSize: '32px', lineHeight: '40px', fontWeight: '700' },
    headlineLgMobile: { fontSize: '28px', lineHeight: '36px', fontWeight: '700' },
    titleMd: { fontSize: '20px', lineHeight: '28px', fontWeight: '600' },
    bodyLg: { fontSize: '18px', lineHeight: '28px', fontWeight: '400' },
    bodyMd: { fontSize: '16px', lineHeight: '24px', fontWeight: '400' },
    labelLg: { fontSize: '14px', lineHeight: '20px', fontWeight: '600', letterSpacing: '0.01em' },
    labelSm: { fontSize: '12px', lineHeight: '16px', fontWeight: '500' },
} as const;

export const Spacing = {
    xs: '4px',
    sm: '12px',
    base: '8px',
    md: '24px',
    gutter: '20px',
    lg: '40px',
    xl: '64px',
    marginMobile: '16px',
    marginDesktop: '48px',
} as const;

export const BorderRadius = {
    DEFAULT: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
} as const;

export const Shadows = {
    card: '0 10px 30px -5px rgba(181, 35, 48, 0.08)',
    coral: '0 10px 30px -10px rgba(181, 35, 48, 0.15)',
    button: '0 14px 28px rgba(181, 35, 48, 0.22)',
    navBottom: '0 -4px 10px rgba(181, 35, 48, 0.1)',
} as const;

/** HSK level → color mapping (for badges/tags) */
export const HskLevelColors: Record<string, { bg: string; text: string }> = {
    'HSK 1-2': { bg: Colors.primaryFixed, text: Colors.primary },
    'HSK 3-4': { bg: Colors.primary, text: Colors.onPrimary },
    'HSK 4+': { bg: Colors.secondary, text: Colors.onSecondary },
    'HSK 5-6': { bg: Colors.tertiary, text: Colors.onTertiary },
};

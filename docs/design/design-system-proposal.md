# Ruby HSK Design System Proposal

Based on the UI Audit findings, this document outlines a unified, scalable Design System to resolve inconsistencies, eradicate "magic numbers," and provide strict rules for responsive layouts across the Ruby HSK platform.

---

## 1. Typography Scale

The typographic scale uses a fluid hierarchy that automatically steps down for smaller viewports to prevent overcrowding. Hardcoded class strings like `text-[13px]` and `text-[40px]` are strictly forbidden.

| Role | Token Class | Mobile (<768px) | Tablet / Desktop | Line Height | Usage |
|---|---|---|---|---|---|
| **Display Large** | `text-display-lg` | 2.5rem (40px) | 3.5rem (56px) | 1.1 | Hero sections, 404 Pages |
| **Headline Large** | `text-headline-lg` | 2rem (32px) | 2.5rem (40px) | 1.2 | Main Section Titles (H2) |
| **Headline Medium**| `text-headline-md` | 1.5rem (24px) | 1.75rem (28px) | 1.3 | Sub-section headers (H3) |
| **Title Large** | `text-title-lg` | 1.25rem (20px) | 1.5rem (24px) | 1.4 | Card titles, Dialog headers |
| **Body Large** | `text-body-lg` | 1rem (16px) | 1.125rem (18px) | 1.6 | Hero paragraphs, intro text |
| **Body Medium** | `text-body-md` | 0.875rem (14px)| 1rem (16px) | 1.5 | Standard reading text |
| **Label Large** | `text-label-lg` | 0.875rem (14px)| 0.875rem (14px)| 1 | Button text, form labels |
| **Label Small** | `text-label-sm` | 0.75rem (12px) | 0.75rem (12px) | 1 | Metadata, caps lock badges |
| **Limit** | *none* | *No text is allowed below 12px (0.75rem) to maintain WCAG legibility.* |

---

## 2. Spacing Scale

Rlying on Tailwind's native scale, we assign semantic meaning to specific spacing stops. Avoid any arbitrary `p-[x]` sizing.

| Value | Rem (Px) | Tailwind | Contextual Semantic Usage |
|---|---|---|---|
| **2** | 0.125rem (2px) | `gap-0.5` | Border spacing, tightly stacked icons |
| **4** | 0.25rem (4px) | `gap-1`, `p-1` | Checkbox gutters, adjacent inline links |
| **8** | 0.5rem (8px) | `gap-2`, `p-2` | Base component gap (e.g., Icon next to Button text) |
| **12** | 0.75rem (12px)| `gap-3`, `p-3` | Tight card padding, nested grid gutters |
| **16** | 1rem (16px) | `gap-4`, `p-4` | **Base Mobile Gutters.** Standard padding for forms |
| **24** | 1.5rem (24px) | `gap-6`, `p-6` | Standard Card Padding, Desktop internal padding |
| **32** | 2rem (32px) | `gap-8`, `p-8` | Desktop container outer gutters (`px-8`), chunk gaps |
| **48** | 3rem (48px) | `gap-12`, `py-12`| Inner section padding (e.g. nested sections) |
| **64** | 4rem (64px) | `gap-16`, `py-16`| **Mobile Section Vertical Padding (Top & Bottom)** |
| **96** | 6rem (96px) | `gap-24`, `py-24`| **Desktop Section Vertical Padding (Top & Bottom)** |

---

## 3. Border Radius

| Scale | Tailwind | Pixel Value | Application Target |
|---|---|---|---|
| **xs** | `rounded-sm` | 2px | Checkboxes, focus outlines |
| **sm** | `rounded` | 4px | Small decorative badges |
| **md** | `rounded-md` | 6px | Input fields, dropdown menus |
| **lg** | `rounded-lg` | 8px | Standard containers, small cards |
| **xl** | `rounded-xl` | 12px | Modals, Featured UI Elements |
| **2xl**| `rounded-[var(--radius-2xl)]`| 24px | **Core Brand Identity.** All main Primary Cards and Hero Images. |
| **full**| `rounded-full` | 9999px | Buttons (Pill shapes), User Avatars |

---

## 4. Icon Size

| Scale | Pixel Dimensions | Tailwind equivalent | Usage |
|---|---|---|---|
| **xs** | 12x12 | `size-3` | Inline text decorations, tooltips |
| **sm** | 16x16 | `size-4` | Button leading/trailing icons |
| **md** | 24x24 | `size-6` | Main navigation, standard action icons |
| **lg** | 32x32 | `size-8` | Highlights inside cards |
| **xl** | 48x48 | `size-12` | Large feature indicators, empty state illustrations |

---

## 5. Button Size

All buttons are structured as `rounded-full` pills. Touch targets are strictly enforced (minimum 44px height).

| Variant | Height | Padding X | Font Size / Weight | Usage |
|---|---|---|---|---|
| **xs** | 36px (`h-9`) | `px-3` | `text-label-sm` | Internal modal actions, tags (rare) |
| **sm** | 44px (`h-11`) | `px-5` | `text-label-sm` | Mobile standard button |
| **md** | 48px (`h-12`) | `px-6` | `text-label-lg` | **Default.** Forms, cards |
| **lg** | 56px (`h-14`) | `px-8` | `text-body-md` | Hero CTAs, bottom sticky banners |
| **xl** | 64px (`h-16`) | `px-10` | `text-body-lg` | Dedicated fullscreen focal actions |

---

## 6. Input Size

Inputs match button heights to ensure visual balance when placed side-by-side (e.g. search bar next to a submit button).

| Variant | Height | Padding | Typogrpahy | Border Radius |
|---|---|---|---|---|
| **md** (Default) | 48px | `px-4 py-3` | `text-body-md` | `var(--radius-2xl)` |
| **lg** (Search) | 56px | `px-6 py-4` | `text-body-lg` | `rounded-full` |
| **textarea** | Min: 128px | `px-4 py-3` | `text-body-md` | `var(--radius-2xl)` |

---

## 7. Card Style

| Role | Background | Border | Shadow | Hover Interaction |
|---|---|---|---|---|
| **Primary** | `bg-surface-lowest` | `border-border` | Default structural shadow | Lifts (`-translate-y-1`), casts `shadow-[var(--shadow-card)]` |
| **Secondary**| `bg-surface` | None | None | Background darkens to `surface-highest` |
| **Glass** | Translucent frost | `border-white/20` | None | Blur intensity increases |
| **Accent** | Solid Primary red | None | Coral accent shadow | Lift (`-translate-y-2`), intensified outline |

---

## 8. Dialog Style

- **Width Constraints:** Max-width caps dynamically based on context (`max-w-md` for alerts, `max-w-2xl` for forms).
- **Background:** `bg-surface-lowest` (pure white/black contrast).
- **Overlay:** Backdrop blur with 40% opacity black.
- **Radius:** `rounded-xl` (or `2xl` for large data displays).
- **Padding:** Outer padding `p-6`, header/footer boundaries clearly demarcated with inner gaps of `gap-4`.

---

## 9. Table Style

- **Header:** Sticky header row, `text-label-sm` capitalized, `bg-surface-highest` background.
- **Row Separation:** Horizontal dividers `border-b border-surface-variant` only; no vertical dividers.
- **Interaction:** Hover state on rows changes background slightly to `surface` container color to assist tracking for the user's eye across wide desktop configurations.
- **Sizing:** `px-4 py-3` cell padding minimum.

---

## 10. Section Width

Sections handle vertical pacing natively instead of relying on custom `py-` combinations every time. 

- **Role Overview**: Creating a dedicated `<Section>` layout component standardizes blocks globally.
- **Vertical Rhythm**: `<Section>` enforces `py-16 md:py-24` consistently. No negative margins strings like `-mt-16`.

---

## 11. Container Width

`<Container>` regulates horizontal constraints and padding.

- **Narrow (`max-w-[900px]`)**: For single-column text heavy reading (e.g., Privacy policies, detailed methodogies).
- **Default (`max-w-[1400px]`)**: The global standard boundary. Used for wrapping Navbars, footers, courses, and general masonry grids.
- **Wide (`max-w-[1600px]`)**: Used explicitly for massive interactive maps or ultra-wide data dashboards.

---

## 12. Responsive Rules

Breakpoints adhere strictly to Tailwind definitions without manual media query injections.

| Breakpoint | Viewport Width | Rules |
|---|---|---|
| **Mobile** | `<768px` | **100% width grids.** `grid-cols-1`. Horizontal padding strictly `px-4` bounding, `0` external margin. Buttons revert to `w-full`. |
| **Tablet** (`md`) | `>=768px` | Two-column grid configurations unlock. Paddings increase to `px-8` minimum on wrappers. Section padding increases from `py-16` to `py-24`. |
| **Desktop** (`lg`+) | `>=1024px` | Advanced asymmetrical layouts unlock (e.g., `grid-cols-[280px_1fr]`). Interaction hover states (tooltips, card lifts) govern mouse activity. |
| **Max Cap** | `>=1400px` | Items lock to max container width. Whitespace pools outside the container margins instead of stretching UI primitives dynamically. |

---

## 13. Tailwind Tokens (Utility Recommendations)

To eliminate hardcoded `var(--...)` and raw magic numbers inside components, map these behaviors via `tailwind.config.ts` plugins to output reliable shortcuts:

**Avoid:**
```tsx
className="bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface-variant)] shadow-[var(--shadow-soft)] hover:-translate-y-2"
```

**Recommend Standardized Custom Classes (in globals.scss or plugin config):**
- **Surfaces**: `.bg-surface-lowest`, `.bg-surface-default`, `.bg-surface-variant`
- **Text**: `.text-main`, `.text-muted`, `.text-inverted`
- **Effects**: `.shadow-soft`, `.shadow-coral`, `.hover-lift`
- **Layout Layers**: `.grid-responsive-2` (auto handles 1 col mobile, 2 col desktop), `.grid-responsive-3`
- **Border Utility**: `.radius-brand` (alias for `[var(--radius-2xl)]`)

This prevents developers from typing arbitrary array braces `[]` and preserves structural purity checking easily via layout linters.

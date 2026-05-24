---
name: Visionary Trust
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5e3f3b'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#936e69'
  outline-variant: '#e9bcb6'
  surface-tint: '#c0000f'
  primary: '#bf000f'
  on-primary: '#ffffff'
  primary-container: '#ec111a'
  on-primary-container: '#ffffff'
  inverse-primary: '#ffb4aa'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#5c5c5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#757474'
  on-tertiary-container: '#fefcfc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930008'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Manrope
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
  container-padding-desktop: 40px
  container-padding-mobile: 20px
  gutter: 24px
  section-gap: 64px
---

## Brand & Style

The design system embodies a "Humanized Institutional" aesthetic—fusing the multi-generational reliability of traditional banking with the frictionless, insight-driven experience of modern wealth management. The brand personality is calm, authoritative, and intentionally quiet, allowing the user’s financial data to take center stage without the anxiety often associated with fiscal management.

The style is a sophisticated blend of **Minimalism** and **Modern Corporate**. It prioritizes high-quality white space, purposeful "Apple Health-style" information density, and a refined tactile feel. Visual complexity is aggressively reduced to eliminate cognitive load, replacing dense data tables with breathable, card-based layouts and soft, approachable data visualizations.

## Colors

The palette is anchored by the iconic **Scotiabank Red**, used surgically for primary actions, brand presence, and critical notifications. To avoid a "heavy corporate" feel, the red is balanced against a vast expanse of white and a premium **Charcoal** (#1A1A1A) used for primary typography to ensure maximum legibility and a modern, high-contrast look.

*   **Primary Action:** Scotiabank Red is reserved for "Commit" actions and brand signatures.
*   **Surface Hierarchy:** Pure White is the base. A subtle light grey (#F9F9F9) is used for container backgrounds to create soft distinction without the need for heavy borders.
*   **Data Indicators:** A muted "Success Green" is used for positive financial trends, ensuring the interface remains calming rather than alarmist.

## Typography

The choice of **Manrope** provides a balanced, contemporary geometric feel that maintains professional integrity. It excels in numerical legibility—a critical requirement for fintech—while feeling more "human" than standard grotesque faces.

Typography is used to establish a clear hierarchy of information. Large, bold headlines are used for account balances and personalized insights, while body text remains airy and light. We utilize a "Numbers-First" approach, ensuring currency and data points are always clear and never compressed.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous safe areas. Elements are organized into logical "Insights Cards" that reflow based on device width. 

*   **Desktop:** A 12-column grid with wide 40px margins to evoke a premium, editorial feel. 
*   **Mobile:** A single-column stack with 20px margins, prioritizing top-to-bottom readability.
*   **Rhythm:** We utilize an 8px baseline grid. Spacing between cards should be consistent (24px) to create a rhythmic, predictable scanning pattern for the user.

## Elevation & Depth

This design system utilizes **Ambient Shadows** and **Tonal Layers** to create a sense of organized depth without visual noise. 

1.  **Level 0 (Base):** Pure White (#FFFFFF).
2.  **Level 1 (Subtle Inset):** Neutral Grey (#F9F9F9) used for grouping background sections.
3.  **Level 2 (Raised Cards):** White cards with a very soft, highly diffused shadow (15% opacity Charcoal, 30px blur, 10px Y-offset). This makes the financial data feel "lifted" and interactable.
4.  **Level 3 (Modals/Overlays):** Stronger shadow definition to focus user attention, paired with a subtle backdrop blur (12px) to maintain spatial awareness.

## Shapes

The shape language is defined by **Rounded** geometry to soften the "hard" nature of banking. 

*   **Cards & Containers:** 1rem (16px) corner radius creates a friendly, approachable container for complex data.
*   **Buttons:** Standard buttons use a 0.5rem (8px) radius to maintain a professional "tool-like" appearance, while secondary chips or tags may use a full pill-shape for quick recognition.
*   **Input Fields:** Consistent with cards at 0.5rem to ensure a unified form-factor.

## Components

### Buttons
Primary buttons are solid Scotiabank Red with white Manrope Medium text. Secondary buttons are outlined in a light grey or use a ghost-style with charcoal text. Hover states should be a subtle darkening of the red, never a jarring color shift.

### Insights Cards
The core of the experience. These containers hold "Apple Health-style" data visualizations. They must have 24px internal padding, a soft Level 2 shadow, and use "Charcoal" for titles. They should never be crowded; if a card has more than 5 data points, it must be split or use a "See More" progressive disclosure.

### Input Fields
Inputs are minimal: a bottom-border only or a very light 4-sided stroke (#E0E0E0). Labels are persistent and positioned above the field in `label-sm`. Focus states use a 2px Scotiabank Red bottom-border.

### Chips & Tags
Used for transaction categories (e.g., "Grocery", "Dining"). These should be low-contrast (light grey background with charcoal text) to avoid competing with the Primary Red buttons.

### List Items
Transactions are displayed in a clean list with significant vertical breathing room (16px between items). Icons for merchants should be simplified and placed in a 40px rounded-square container with a light grey background.
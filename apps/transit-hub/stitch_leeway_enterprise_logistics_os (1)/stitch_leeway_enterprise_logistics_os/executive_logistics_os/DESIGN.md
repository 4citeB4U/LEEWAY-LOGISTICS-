---
name: Executive Logistics OS
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#c5c6cb'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#8f9195'
  outline-variant: '#44474b'
  surface-tint: '#c1c7d0'
  primary: '#c1c7d0'
  on-primary: '#2b3138'
  primary-container: '#30363d'
  on-primary-container: '#999fa7'
  inverse-primary: '#595f67'
  secondary: '#c2c7d0'
  on-secondary: '#2c3138'
  secondary-container: '#42474f'
  on-secondary-container: '#b1b5bf'
  tertiary: '#c4c6d0'
  on-tertiary: '#2d3038'
  tertiary-container: '#32353d'
  on-tertiary-container: '#9b9da7'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde3ec'
  primary-fixed-dim: '#c1c7d0'
  on-primary-fixed: '#161c23'
  on-primary-fixed-variant: '#41474f'
  secondary-fixed: '#dee2ec'
  secondary-fixed-dim: '#c2c7d0'
  on-secondary-fixed: '#171c23'
  on-secondary-fixed-variant: '#42474f'
  tertiary-fixed: '#e0e2ec'
  tertiary-fixed-dim: '#c4c6d0'
  on-tertiary-fixed: '#191c23'
  on-tertiary-fixed-variant: '#44474f'
  background: '#111318'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 12px
  gutter: 8px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 20px
---

## Brand & Style

This design system is engineered for mission-critical logistics operations, prioritizing industrial-strength reliability over aesthetic flair. The brand personality is "Executive Neutral"—authoritative, precise, and devoid of non-functional decoration. It targets high-level logistics coordinators and field commanders who require immediate data clarity under high-pressure scenarios.

The design style is **Corporate / Modern** with a lean toward **High-Density Minimalism**. It utilizes a "Hardware UI" approach where every pixel serves a functional purpose. There are no gradients, soft shadows, or whimsical animations. Instead, the interface relies on structural borders, clear information architecture, and a strict color hierarchy to guide the user through complex logistical datasets. The emotional response is one of absolute control, security, and tactical efficiency.

## Colors

The palette is strictly dark-mode to reduce eye strain during extended operational shifts and to emphasize the "Pentagon-grade" technical aesthetic. 

- **Foundational Surfaces:** Midnight (`#0a0c10`) serves as the base canvas, while Steel (`#11141b`) and Slate (`#161b22`) are used to differentiate container depths and logical groupings.
- **Accents:** Accent colors are strictly reserved for functional status indicators. They must never be used for decorative branding.
    - **In Service (Success):** Used for active fleets, verified routes, and optimal system health.
    - **Warning (Amber):** Used for projected delays, low fuel levels, or pending maintenance.
    - **Out of Service (Danger):** Used for critical failures, route blockages, or security breaches.
- **Interactive Elements:** Borders and active states utilize the primary Slate (`#30363d`) to maintain a low-profile, professional appearance.

## Typography

Typography is treated as a data visualization tool. **Inter** is the primary typeface for its exceptional legibility at small sizes and its neutral, systematic character.

- **Scale:** The scale is intentionally tight. Mobile headlines do not exceed 20px to maximize the "above the fold" data density.
- **Data Mono:** For serial numbers, GPS coordinates, and timestamps, a monospaced font (or Inter with tabular num features) is used to ensure vertical alignment in data grids.
- **Labels:** Use `label-caps` for table headers and section metadata to provide a clear visual distinction from dynamic content.
- **Weight:** Use Semi-Bold (`600`) sparingly for emphasis; Regular (`400`) should be the standard for all body and data entries to maintain a clean, un-cluttered interface.

## Layout & Spacing

This design system uses a strict **4px baseline grid** to achieve high information density. 

- **Mobile Grid:** A 4-column fluid grid with 8px gutters. Standard horizontal margins are set to 12px to maximize the horizontal real estate for data tables.
- **Density:** Elements are packed tightly. Vertical spacing between related data points (e.g., a truck ID and its driver) should be 4px. Between unrelated logical blocks, use 12px or 20px.
- **Safe Areas:** Adhere to system safe areas but extend container backgrounds to the edges of the screen to create a "full-bleed" instrument panel feel.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Bold Borders**, rather than shadows. 

- **Surface Levels:** 
    - Level 0 (Midnight): Global background.
    - Level 1 (Steel): Card containers and list items.
    - Level 2 (Slate): Active states, input fields, and modal overlays.
- **Borders:** Every container must have a 1px solid border (`#30363d`). This defines the "Industrial" look and ensures that individual data modules remain distinct even when tightly packed.
- **No Shadows:** Shadows are strictly prohibited as they suggest a "floating" consumer app feel. All elements should feel bolted to the interface.

## Shapes

The shape language is **Soft (0.25rem)**. 

Extreme rounding (pills) is reserved exclusively for status indicators (pills) to make them instantly recognizable against the predominantly rectangular layout. All primary containers, input fields, and data cells use a subtle 4px radius to maintain a professional, structured appearance while avoiding the harshness of 0px "Brutalist" corners.

## Components

- **Data Grids:** High-density rows (32px-40px height). Every row is separated by a 1px border. Use alternating "Zebra" striping only for extremely wide datasets.
- **Status Pills:** Small, high-contrast badges using the status color palette. Text inside must be `label-caps`. 
- **Buttons:** Rectangular with 4px radius. Primary buttons use Slate (`#30363d`) with white text. Secondary buttons use an outline style. No gradients.
- **Input Fields:** Darker than the container background (Midnight) with a 1px Slate border. Labels should sit above the field in `body-sm`.
- **Agent Lee Intelligence Overlay:** A specialized "Heads-Up Display" (HUD) component. It uses a semi-transparent Slate backdrop (`rgba(48, 54, 61, 0.9)`) with a distinct colored border (e.g., Cyan or a dedicated "Intelligence Blue") to distinguish AI-generated insights from standard system data.
- **Logistics Cards:** Standardized units containing a header, a primary metric (in `headline-md`), and a 2-column key-value pair list for secondary data points.
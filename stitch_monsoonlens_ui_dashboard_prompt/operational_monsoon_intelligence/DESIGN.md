---
name: Operational Monsoon Intelligence
colors:
  surface: '#151310'
  surface-dim: '#151310'
  surface-bright: '#3c3935'
  surface-container-lowest: '#100e0b'
  surface-container-low: '#1d1b18'
  surface-container: '#221f1c'
  surface-container-high: '#2c2a26'
  surface-container-highest: '#373431'
  on-surface: '#e8e1dc'
  on-surface-variant: '#d6c4ac'
  inverse-surface: '#e8e1dc'
  inverse-on-surface: '#33302c'
  outline: '#9e8e78'
  outline-variant: '#514532'
  surface-tint: '#ffba38'
  primary: '#ffd79b'
  on-primary: '#432c00'
  primary-container: '#ffb300'
  on-primary-container: '#6b4900'
  inverse-primary: '#7e5700'
  secondary: '#93ccff'
  on-secondary: '#003351'
  secondary-container: '#3198dc'
  on-secondary-container: '#002c47'
  tertiary: '#69f6b9'
  on-tertiary: '#003824'
  tertiary-container: '#48d99e'
  on-tertiary-container: '#005b3d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdeac'
  primary-fixed-dim: '#ffba38'
  on-primary-fixed: '#281900'
  on-primary-fixed-variant: '#604100'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#151310'
  on-background: '#e8e1dc'
  surface-variant: '#373431'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  data-display-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.03em
  data-display-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.02em
  data-tabular:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-desktop: 1rem
  margin: 1rem
  margin-desktop: 1.5rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system establishes an operational-grade meteorology workstation interface designed specifically for atmospheric scientists, state disaster management authorities, and hydrological modelers monitoring the Indian monsoon. The aesthetic is anchored in tactical mission-control environments, prioritizing zero-latency readability, prolonged dark-room visual ergonomics, and uncompromising structural precision.

The style unites **Modern Scientific Minimalism** with **Tactile Mission Console Architecture**:
- **Interface Atmosphere:** Deep atmospheric dark spaces punctuated by deliberate emissive indicators, razor-sharp 1px structural framing, and low-diffuse ambient glows.
- **Visual Weight & Density:** High data density designed for simultaneous geospatial map evaluation, multi-ensemble telemetry, and delta anomaly tracking without cognitive fatigue.
- **Emotional Stance:** Authoritative, clinically accurate, vigilant, and mission-critical. The design eschews decorative whimsy in favor of calibrated data density, clear visual hierarchies, and immediate alert triage.

## Colors

The color architecture is built for mission control dark-mode fidelity, strict contrast safety (WCAG 2.1 AA/AAA compliance for critical alerts), and instant categorical parsing.

### Core Canvas & Structural Tokens
- **Canvas Base (`#0B0B0D`):** Deep abyssal black ground for maximum contrast against geospatial raster maps.
- **Canvas Elevated (`#111114`):** Base container fill for global navigation, dock panels, and drawer shells.
- **Surface Level 1 (`#161411`):** Warm charcoal tile surface, providing grounded warmth to prolonged observational sessions.
- **Surface Level 2 (`#1C1A17`):** Elevated card surface, metric modules, floating inspector panels.
- **Surface Hover (`#24211D`):** Interactive state for clickable modules and table rows.
- **Border Structural (`#2A2621`):** 1px structural boundary dividing panels, maps, and toolbars.
- **Border Focus / Subtle (`#38322B`):** Enhanced delineation for active cards and hover states.

### Accent & Telemetry Spectrum
- **Primary Operational Accent (`#FFB300` / `#FFC107`):** Scientific amber. Reserved strictly for system focal states, selected ensemble runs, critical telemetry highlights, and primary command executions.
- **Primary Accent Hover (`#FFA000`) & Muted Wash (`rgba(255, 179, 0, 0.12)`):** Secondary control anchors and active switch wells.

### IMD Standard Rainfall Scale & Hydrological Tokens
- **Trace to Light (< 15.5mm):** `#E0F2FE` (Vapor Cyan) to `#38BDF8` (Atmospheric Sky)
- **Moderate (15.6 - 64.4mm):** `#0284C7` (Pacific Cyan-Blue)
- **Heavy (64.5 - 115.5mm):** `#0369A1` (Deep Bay Blue)
- **Very Heavy to Extreme (> 115.6mm):** `#1E3A8A` (Deep Indigo Abyss)

### Operational Risk & Alert Tiers
- **Green / Normal Alert (`#10B981`):** Stable precipitation, model convergence, nominal feed.
- **Amber / Advisory (`#F59E0B`):** Convective trigger likely, low-pressure formation, localized excess.
- **Orange / Warning (`#F97316`):** Very heavy precipitation (64.5 - 115.5mm), flood watch advisory.
- **Crimson / Emergency (`#EF4444`):** Extremely heavy downpour (> 204.5mm), flash flood risk, cloudburst anomaly.

## Typography

The typographic hierarchy separates analytical synthesis from raw telemetry ingestion by employing three distinct type families:

1. **Display & Structural Headings (`Space Grotesk`):** Delivers a technical, forward-looking scientific character. Used for dashboard headers, modal crowns, and primary division markers.
2. **Body & System Text (`Inter`):** Unobtrusive, neutral, and optimized for legibility at small scale. Used for analytical briefing paragraphs, descriptions, metadata titles, and contextual form labels.
3. **Data Telemetry & Metric Displays (`JetBrains Mono`):** Engineered for numerical comparison. Monospace alignment prevents visual jitter during live updates of lat/long coordinates, ensemble timestamps (UTC/IST), precipitation rates (mm/hr), and variance percentages.

### Styling Guidelines
- **Uppercase Meta Labels:** All categorical micro-labels, coordinate stamps, and mode tags (`label-caps`, `label-mono-sm`) must be rendered in uppercase with positive letter spacing (`0.06em` to `0.08em`).
- **Tabular Numerics:** Monospace figures must be enforced on all delta readouts and rainfall accumulations to maintain vertical alignment down grid columns.

## Layout & Spacing

The operational interface uses a **High-Density Adaptive Grid Architecture** calibrated for dense desktop command setups (1080p, 1440p, 4K multi-head displays) with responsive degradation to field tablets and mobile terminals.

### Screen Partitioning & Layout Structure
- **Desktop (>= 1280px):**
  - **Header Rail (52px fixed height):** Mission status, global datetime (UTC/IST toggle), model sync lock, user station profile.
  - **Left Operations Dock (340px to 420px):** Model runs, lead time step selectors, atmospheric layer toggles (850hPa wind, precipitable water, convective available potential energy).
  - **Center Canvas (Flexible Viewport):** Interactive GIS projection map with WebGL raster precipitation layers.
  - **Bottom Timeline Dock (64px to 88px fixed):** Multi-hour lead time scrubber, playback sequencer, ensemble dispersion brush.
  - **Right Telemetry Drawer (360px collapsible):** Station ground-truth verification, AI bias correction delta curves, and district-level impact tables.
- **Tablet (768px - 1279px):**
  - Left dock collapses into an off-canvas drawer. Center map takes 100% width with overlaid floating tool clusters. Bottom timeline shrinks to collapsed scrubber pills.
- **Mobile (< 768px):**
  - Single-column flow with fixed map viewport (50vh) and swipeable bottom bottom-sheet containing telemetry cards and alert tickers.

### Spacing Principles
- Compact gap rhythms (`space-sm`, `space-md`) dominate analytical toolbars to pack operational telemetry into the primary visual cone.
- Card padding remains uniformly tight: `12px` (`space-md`) on sub-panels, `16px` (`space-lg`) on major alert aggregates.

## Elevation & Depth

This design system avoids theatrical drop shadows, employing **Tonal Layering, Dark Back-Glows, and Razor Edge Borders** to separate spatial planes. The interface reflects the precision of an illuminated optical bench in a dark room.

### Depth Hierarchy
1. **Ground Zero (`#0B0B0D`):** The foundational void upon which geospatial maps, raster tiles, and heatmaps render.
2. **Base Panels (`#161411` with 1px border `#2A2621`):** Persistent sidebars and tool docks. No shadow; separation is achieved entirely via the structural 1px border.
3. **Floating Modules & Card Overlays (`#1C1A17` with 1px border `#38322B`):** Floating inspector panels, hover tooltips, and contextual parameter pickers. Enhanced with an ultra-subtle ambient shadow: `0 8px 24px -4px rgba(0, 0, 0, 0.6)`.
4. **Modal Overlays & Alert Cockpits:** `rgba(11, 11, 13, 0.85)` backdrop blur (12px) with surface `#1C1A17` framed by a faint primary amber rim: `border: 1px solid rgba(255, 179, 0, 0.28)`.

### Optical Accents & Critical Emissives
- **Telemetry Indicators:** Live feeds feature glowing status pips utilizing a 6px blur bloom (`box-shadow: 0 0 8px rgba(16, 185, 129, 0.7)` for nominal, `0 0 10px rgba(239, 68, 68, 0.8)` for extreme warnings).
- **Active State Highlights:** Active segment tabs and focused map layers feature a muted amber base glow (`0 0 16px -2px rgba(255, 179, 0, 0.15)`).

## Shapes

The interface balances sharp industrial utility with ergonomic modern framing:
- **Cards and Analytical Panels:** Standardized on `0.75rem` (`12px`) to `1rem` (`16px`) corners, counterbalancing the high-density grid lines and preventing visual hardness.
- **Controls, Input Fields, and Segmented Pickers:** Standardized on `0.375rem` (`6px`) to `0.5rem` (`8px`) for tight structural precision.
- **Pills and Badges:** `9999px` full-radius pills reserved strictly for alert status markers, telemetry tags, and real-time state chips.
- **Border Invariants:** Border stroke width is strictly `1px` across all containers to preserve mathematical alignment across dense tabular modules.

## Components

### Buttons & Interactive Triggers
- **Primary Operational Action:** High-intensity Amber fill (`#FFB300`), text in deep obsidian (`#0B0B0D`, `font-weight: 700`), radius `6px`. Hover: `#FFA000`. Active: `#E59200`. Glow: `0 0 12px rgba(255, 179, 0, 0.25)`.
- **Secondary Command Trigger:** Surface `#1C1A17`, 1px border `#38322B`, text `#E0E0E0`, hover background `#24211D`, hover border `#FFB300`.
- **Destructive / High Alert Action:** Solid `#EF4444` background or `#EF4444` outline with `rgba(239, 68, 68, 0.15)` wash on hover.

### Segmented Model Mode Selectors
- A unified dock containing three exclusive states: `RAW NWP MODEL` | `AI-CORRECTED` | `DIFFERENCE (DELTA)`.
- **Enclosure:** Background `#111114`, 1px border `#2A2621`, padding `3px`, radius `8px`.
- **Segments:** Monospaced label (`label-mono-sm`), text `#8E8A83`.
- **Selected Segment:** Background `#24211D`, 1px border `#FFB300`, text `#FFC107`, shadow `0 2px 6px rgba(0,0,0,0.4)`.

### Telemetry Status Chips & Badges
- Compact pill-shaped metadata chips (`height: 22px`).
- **Normal/Nominal:** Border `rgba(16, 185, 129, 0.3)`, background `rgba(16, 185, 129, 0.1)`, text `#10B981`. Includes a pulsating `6px` dot on the left.
- **Heavy Alert:** Border `rgba(249, 115, 22, 0.3)`, background `rgba(249, 115, 22, 0.1)`, text `#F97316`.
- **Extreme Warning:** Border `rgba(239, 68, 68, 0.4)`, background `rgba(239, 68, 68, 0.15)`, text `#EF4444`.

### Operational Time Slider (Lead Time Scrubber)
- Traverses forecast intervals from `T+00h` to `T+168h` in dynamic steps (3h, 6h, 12h, 24h).
- **Track:** 4px tall bar in `#2A2621` with stepped notch indicators for ensemble runs.
- **Buffer / Loaded Forecast Bar:** Cyan glow line (`#0284C7`, height `4px`).
- **Thumb:** Amber diamond or capsule (`#FFB300`, `12px x 20px`), centered, featuring an active timestamp tooltip pinned directly above in `data-tabular` format.

### Precipitation Legend Scale (IMD Standard)
- Continuous or stepped horizontal strip anchored at the map corner.
- 5 categorical steps (`#E0F2FE` -> `#38BDF8` -> `#0284C7` -> `#0369A1` -> `#1E3A8A`) with an optional extreme hatch indicator for `> 204.5 mm`.
- Numerical intervals rendered below each transition mark in `label-mono-sm` font.

### Meteorological Data Cards & Station Inspect Panels
- Container: Surface `#161411` with `border: 1px solid #2A2621`, radius `12px`.
- **Card Header:** Uppercase section title (`label-caps`), station callout code (`label-mono-sm`), and synchronicity status.
- **Metric Block:** Big number readout (`data-display-md`) displaying precipitation in `mm/24h` accompanied by positive/negative bias variance chips (`+14.2% AI Delta` in emerald or crimson).
- **Tabular Sub-Grid:** Dense alternating rows (`#161411` and `#1C1A17`) rendering ensemble spread, 850hPa wind vectors, and model divergence indices.
---
name: Aetheric Audio
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#e9b3ff'
  on-secondary: '#510074'
  secondary-container: '#7d01b1'
  on-secondary-container: '#e5a9ff'
  tertiary: '#fff3f2'
  on-tertiary: '#680019'
  tertiary-container: '#ffcdce'
  on-tertiary-container: '#bf0036'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#f6d9ff'
  secondary-fixed-dim: '#e9b3ff'
  on-secondary-fixed: '#310048'
  on-secondary-fixed-variant: '#7200a3'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b5'
  on-tertiary-fixed: '#40000c'
  on-tertiary-fixed-variant: '#920027'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 48px
  container-max: 1440px
---

## Brand & Style

The design system is a premium, futuristic interface designed for high-fidelity music immersion. It targets an audience that appreciates the intersection of luxury and cutting-edge technology. The visual direction is a refined evolution of Glassmorphism, blending deep atmospheric depth with vibrant, high-energy accents.

The emotional response should be one of "Tactile Digitalism"—where the UI feels like a physical piece of glass instrumentation floating in a dark space. By utilizing intense background blurs and high-contrast neon highlights, the system creates a focused, cinematic environment that prioritizes the album art and the emotional resonance of the music.

## Colors

The palette is built on a "Deep Space" foundation. The background is nearly black with a subtle navy undertone to prevent visual fatigue and provide a canvas for glowing elements.

- **Primary (Electric Cyan):** Used for active states, playback progress, and primary call-to-actions. It represents energy and connectivity.
- **Secondary (Luminous Violet):** Used for secondary interactions, multi-select states, and genre-tagging.
- **Tertiary (Neon Rose):** Reserved for high-emotion actions like "Favorites" or "Live" indicators.
- **Surface Neutrals:** Semi-transparent grays (White at 5-15% opacity) are used to define the glass layers against the deep background.

## Typography

The typography system relies on **Inter** for its systematic clarity and modern proportions. To inject a technical, "futuristic tech" feel, **Geist** is used for small labels, metadata, and technical readouts (bitrate, timestamps).

Visual hierarchy is achieved through extreme scale contrast rather than weight variety. Large display titles should feel cinematic, while body text remains utilitarian. Use `label-sm` for all non-content metadata to create a "heads-up display" (HUD) aesthetic.

## Layout & Spacing

This design system utilizes a **Fluid Grid** with generous negative space to allow the "glass" panels to breathe. 

- **Desktop:** A 12-column grid with 24px gutters. Content is typically housed in floating glass modules that span multiple columns. 
- **Mobile:** A single-column flow with 20px side margins. 
- **Spacing Rhythm:** All spacing must be multiples of 8px. Use larger gaps (48px+) between distinct functional sections (e.g., Player Controls vs. Up Next List) to maintain a premium, airy feel.

## Elevation & Depth

Depth is conveyed through **Backdrop Blurs** and **Luminous Outlines** rather than traditional drop shadows.

1.  **Base Layer:** The deepest dark navy background.
2.  **Glass Panels:** Background blur (20px to 40px) with a semi-transparent white fill (8%).
3.  **Glow Borders:** A 1px inner stroke using a gradient of White (20% opacity) to Primary Color (40% opacity) to simulate light catching the edge of the glass.
4.  **Active Elevation:** When an element is focused, a soft outer "bloom" (neon glow) in the primary color is applied with a 20px blur at low opacity (15-20%).

## Shapes

The shape language is defined by large, sweeping curves. All main containers and album art containers must use `rounded-xl` (1.5rem / 24px) to create a soft, high-end feel that offsets the technicality of the neon colors.

Buttons and interactive chips use a full pill-shape (round-full). This distinction ensures that interactive elements are immediately recognizable against the structural panels of the UI.

## Components

- **Buttons:** Primary buttons are pill-shaped with a solid-to-vibrant gradient fill. Secondary buttons are "ghost" glass with a 1px border that glows on hover.
- **Input Fields:** Minimalist underlines or glass-morphic containers with primary-color "bloom" effects when focused.
- **Glass Cards:** Used for album clusters. Must include a `backdrop-filter: blur(30px)` and a subtle 1px top-left highlight stroke.
- **Interactive Switches:** Custom-designed "slider" toggles that use the Primary Cyan for the 'on' state, appearing to "light up" the interface.
- **Playhead/Sliders:** The track should be a 4px thick translucent line, with the progress filled in a neon gradient. The "thumb" should be a glowing white orb.
- **Visualizers:** Dynamic, thin-stroke waveforms that react to the frequency, utilizing the Secondary and Tertiary color palette to indicate energy levels.
# Landing Page Redesign — Feature Spotlight Sections

**Date:** 2026-02-21
**Status:** Approved
**Approach:** Ansatz B — Feature Spotlight Sections

---

## Goal

Elevate the z-docs landing page to a premium level. The page serves two audiences equally:
- **New users** — server owners who need to be convinced to use Z-Core & Z-Admin
- **Existing users** — quick navigation hub to documentation

Visual direction: Clean Dark + Photo. Polished, accessible. Indigo brand retained.

---

## Page Architecture

```
1. Hero (VitePress default, enhanced with Screenshot Carousel)
2. Trust Bar (ESX / QBCore / ox_core / Standalone compatibility)
3. Z-Core Spotlight A — "One Bridge. Every Framework." (text left, code right)
4. Z-Core Spotlight B — "Developer API that doesn't get in your way." (code left, text right)
5. Divider
6. Z-Admin Spotlight A — "Your server. At a glance." (text left, livemap.jpg right)
7. Z-Admin Spotlight B — "Full control. One click away." (players.png left, text right)
8. Z-Admin Spotlight C — "Security that doesn't sleep." (text left, security.png right)
9. CTA Block — "Ready to get started?"
```

---

## Design System

### Colors & Tokens
```
Background:     #09090b   (existing)
Surface:        #0f0f11   (cards, code widgets)
Border:         rgba(255,255,255,0.06)
Brand Primary:  #6366f1   (existing)
Brand Bright:   #818cf8   (existing)
Text Primary:   #ffffff
Text Secondary: #a1a1aa
Badge Text:     #6366f1 (caps label, e.g. "Z-CORE")
```

### Typography
- Section H2: `clamp(32px, 4vw, 44px)`, `font-weight: 800`, `letter-spacing: -0.035em`
- Body: `17px`, `line-height: 1.65`, `color: text-secondary`
- Badge: `11px`, `font-weight: 700`, `letter-spacing: 0.08em`, `text-transform: uppercase`

---

## Component Specs

### HeroCarousel.vue
- Auto-cycles through 4 screenshots: `dashboard.png` → `players.png` → `livemap.jpg` → `security.png`
- Interval: 3000ms, pauses on hover
- Crossfade transition: `0.6s ease`
- Wrapped in a dark browser-frame mockup:
  - Top bar: 3 traffic-light dots + fake URL bar (`z-admin.localhost`)
  - Border-radius: `12px`
  - Border: `1px solid rgba(255,255,255,0.08)`
  - Box-shadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)`
  - Glow: `0 48px 120px rgba(99,102,241,0.12)` below frame
- Dot indicators below the frame (outside), one per slide

### TrustBar.vue
- Full-width centered section, `padding: 40px 0`
- Label: "Works with your existing framework" — `13px`, dimmed
- Badges: ESX · QBCore · ox_core · Standalone — `font-weight: 600`, `15px`, `opacity: 0.5`, hover `opacity: 0.9`
- Top + bottom border: `1px solid rgba(255,255,255,0.05)`

### SpotlightSection.vue (reusable)
Props:
- `badge`: string ("Z-CORE" / "Z-ADMIN")
- `headline`: string
- `body`: string
- `bullets`: string[]
- `ctaText` + `ctaLink`: string
- `visual`: slot (accepts CodeWidget or ScreenshotFrame)
- `reverse`: boolean (swaps text/visual column order)

Layout:
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 80px;
align-items: center;
padding: 100px 0;
max-width: 1100px;
margin: 0 auto;
```
Bullet items: Indigo checkmark SVG icon + text, `gap: 12px`
CTA: Styled inline link, `"Read the Docs →"`, hover underline + color shift

Mobile (`< 768px`): stacks to single column, visual goes below text.

### CodeWidget.vue
- Dark surface card (`#0f0f11`), border `rgba(255,255,255,0.06)`
- Top bar: filename + language badge (e.g. `exports.ts`, `[TS]`)
- Hardcoded syntax-highlighted content (no runtime highlighting — styled spans)
- Colors: strings → `#a5b4fc`, keywords → `#818cf8`, properties → `#c4b5fd`, comments → `#52525b`

### ScreenshotFrame.vue
- Reusable browser-frame wrapper (same style as HeroCarousel frame but static)
- Prop: `src` (image path), `alt`
- Optional subtle 3D tilt: `transform: perspective(1000px) rotateY(-3deg)` (right-side visuals) / `rotateY(3deg)` (left-side)

### CTABlock.vue
- Centered, `padding: 120px 0`
- H2: "Ready to set up your server?" — same heading style
- Subtext: "Everything you need is in the docs."
- Two buttons: brand ("Browse Documentation") + alt ("View on GitHub")
- Radial Indigo glow in background (reuse spotlight effect)

---

## Screenshots Used
| Section | File |
|---|---|
| Hero Carousel frame 1 | `public/screenshots/dashboard.png` |
| Hero Carousel frame 2 | `public/screenshots/players.png` |
| Hero Carousel frame 3 | `public/screenshots/livemap.jpg` |
| Hero Carousel frame 4 | `public/screenshots/security.png` |
| Z-Admin Spotlight A | `public/screenshots/livemap.jpg` |
| Z-Admin Spotlight B | `public/screenshots/players.png` |
| Z-Admin Spotlight C | `public/screenshots/security.png` |

Note: Screenshots are currently in `.vitepress/dist/screenshots/` — they need to be moved or symlinked to `public/screenshots/` so VitePress serves them as static assets.

---

## What Stays Unchanged
- `custom.css` brand tokens and VitePress overrides
- Hero section (VitePress `layout: home` frontmatter)
- All sidebar navigation and doc content
- Glass-card styles (used on other pages or as fallback)
- Apple spotlight background animations

## What Gets Replaced / Added
- `index.md`: The hand-coded glass-card HTML is replaced with Vue component imports
- `HeroShowcase.vue`: Repurposed or replaced by `HeroCarousel.vue`
- New components: `TrustBar.vue`, `SpotlightSection.vue`, `CodeWidget.vue`, `ScreenshotFrame.vue`, `CTABlock.vue`

# Landing Page Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing glass-card landing page with a premium "Feature Spotlight Sections" layout — hero carousel, trust bar, alternating text+visual sections, CTA block.

**Architecture:** 6 new Vue SFC components registered globally in `theme/index.ts`, imported into `index.md` which is rewritten to use them. All screenshots already exist in `public/screenshots/`. VitePress base is `/z-docs/` — use root-absolute paths like `/screenshots/foo.png` in `src` attributes; VitePress rewrites them at build time.

**Tech Stack:** VitePress 1.x, Vue 3 Composition API, scoped CSS in SFCs, no new dependencies.

---

## Context You Need

- **Working dir:** `z-docs/` (the VitePress project root)
- **Dev server:** `npm run docs:dev` → `http://localhost:5173/z-docs/`
- **Build:** `npm run docs:build` → output in `.vitepress/dist/`
- **Brand colors:** `#6366f1` (primary), `#818cf8` (bright), `#09090b` (bg)
- **Screenshots:** `public/screenshots/` → `dashboard.png`, `players.png`, `livemap.jpg`, `security.png`
- **Theme entry:** `.vitepress/theme/index.ts` — register all components here with `app.component()`
- **Global CSS:** `.vitepress/theme/custom.css` — do not touch existing rules, append only

---

## Task 1: Create `HeroCarousel.vue`

**Files:**
- Create: `.vitepress/theme/HeroCarousel.vue`

**Step 1: Create the component**

```vue
<!-- .vitepress/theme/HeroCarousel.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const screenshots = [
  { src: '/screenshots/dashboard.png', alt: 'Z-Admin Dashboard Overview' },
  { src: '/screenshots/players.png',   alt: 'Player Management Panel' },
  { src: '/screenshots/livemap.jpg',   alt: 'Interactive Live Map' },
  { src: '/screenshots/security.png',  alt: 'Security & Audit Logs' },
]

const current = ref(0)
const paused  = ref(false)
let timer = null

function goTo(i) { current.value = i }
function pause()  { paused.value = true }
function resume() { paused.value = false }

onMounted(() => {
  timer = setInterval(() => {
    if (!paused.value) current.value = (current.value + 1) % screenshots.length
  }, 3000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="hc-outer" @mouseenter="pause" @mouseleave="resume">
    <div class="hc-frame">
      <div class="hc-bar">
        <div class="hc-dots">
          <span class="hc-dot hc-dot--red"></span>
          <span class="hc-dot hc-dot--yellow"></span>
          <span class="hc-dot hc-dot--green"></span>
        </div>
        <div class="hc-url">z-admin.localhost</div>
      </div>
      <div class="hc-viewport">
        <img
          v-for="(s, i) in screenshots"
          :key="s.src"
          :src="s.src"
          :alt="s.alt"
          :class="['hc-img', { 'hc-img--active': i === current }]"
        />
      </div>
    </div>
    <div class="hc-indicators">
      <button
        v-for="(_, i) in screenshots"
        :key="i"
        :class="['hc-pip', { 'hc-pip--active': i === current }]"
        :aria-label="`Go to slide ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.hc-outer {
  max-width: 860px;
  margin: 48px auto 0;
  padding: 0 24px;
}

.hc-frame {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow:
    0 32px 80px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 48px 120px rgba(99, 102, 241, 0.12);
}

.hc-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: #141416;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.hc-dots { display: flex; gap: 6px; }
.hc-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.hc-dot--red    { background: #ff5f57; }
.hc-dot--yellow { background: #ffbd2e; }
.hc-dot--green  { background: #28c840; }

.hc-url {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 3px 12px;
  flex: 1;
  text-align: center;
}

.hc-viewport {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #0a0a0c;
  overflow: hidden;
}

.hc-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease;
}
.hc-img--active { opacity: 1; }

.hc-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.hc-pip {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  padding: 0;
  transition: background 0.3s ease, transform 0.3s ease;
}
.hc-pip--active {
  background: #6366f1;
  transform: scale(1.3);
}
</style>
```

**Step 2: Register in `theme/index.ts`**

Add to the existing `enhanceApp` block:
```ts
import HeroCarousel from './HeroCarousel.vue'
// ... and in enhanceApp:
app.component('HeroCarousel', HeroCarousel)
```

**Step 3: Start dev server and verify it renders**

```bash
npm run docs:dev
```
Open `http://localhost:5173/z-docs/` — at this point nothing shows yet because `index.md` hasn't been updated. That's fine. Only verify no build errors in the terminal.

**Step 4: Commit**

```bash
git add .vitepress/theme/HeroCarousel.vue .vitepress/theme/index.ts
git commit -m "feat(landing): add HeroCarousel component with browser-frame mockup"
```

---

## Task 2: Create `TrustBar.vue`

**Files:**
- Create: `.vitepress/theme/TrustBar.vue`

**Step 1: Create the component**

```vue
<!-- .vitepress/theme/TrustBar.vue -->
<template>
  <div class="tb-wrapper">
    <p class="tb-label">Works with your existing framework</p>
    <div class="tb-badges">
      <span class="tb-badge">ESX</span>
      <span class="tb-sep">·</span>
      <span class="tb-badge">QBCore</span>
      <span class="tb-sep">·</span>
      <span class="tb-badge">ox_core</span>
      <span class="tb-sep">·</span>
      <span class="tb-badge">Standalone</span>
    </div>
  </div>
</template>

<style scoped>
.tb-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tb-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.3);
  margin: 0 0 16px;
  letter-spacing: 0.02em;
}

.tb-badges {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.tb-badge {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
  cursor: default;
}

.tb-badge:hover { color: rgba(255, 255, 255, 0.9); }

.tb-sep {
  color: rgba(255, 255, 255, 0.15);
  font-size: 18px;
  line-height: 1;
}

/* Light mode */
:global(:root:not(.dark)) .tb-label { color: rgba(0, 0, 0, 0.35); }
:global(:root:not(.dark)) .tb-badge { color: rgba(0, 0, 0, 0.4); }
:global(:root:not(.dark)) .tb-badge:hover { color: rgba(0, 0, 0, 0.85); }
:global(:root:not(.dark)) .tb-sep { color: rgba(0, 0, 0, 0.15); }
</style>
```

**Step 2: Register in `theme/index.ts`**

```ts
import TrustBar from './TrustBar.vue'
// in enhanceApp:
app.component('TrustBar', TrustBar)
```

**Step 3: Commit**

```bash
git add .vitepress/theme/TrustBar.vue .vitepress/theme/index.ts
git commit -m "feat(landing): add TrustBar component"
```

---

## Task 3: Create `CodeWidget.vue`

**Files:**
- Create: `.vitepress/theme/CodeWidget.vue`

**Step 1: Create the component**

This is a static styled widget showing Z-Core API usage. No runtime syntax highlighter — styled spans only.

```vue
<!-- .vitepress/theme/CodeWidget.vue -->
<template>
  <div class="cw-card">
    <div class="cw-bar">
      <span class="cw-filename">exports.ts</span>
      <span class="cw-lang">TS</span>
    </div>
    <pre class="cw-pre"><code><span class="cw-k">const</span> <span class="cw-v">player</span> <span class="cw-op">=</span> <span class="cw-fn">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">]</span>
  <span class="cw-p">.</span><span class="cw-fn">GetPlayer</span><span class="cw-p">(</span><span class="cw-v">source</span><span class="cw-p">)</span>

<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">name</span>   <span class="cw-c">// "John_Doe"</span>
<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">job</span>    <span class="cw-c">// &#123; name: "police", grade: 2 &#125;</span>
<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">money</span>  <span class="cw-c">// &#123; cash: 5000, bank: 200 &#125;</span>
<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">coords</span> <span class="cw-c">// &#123; x: 123.4, y: -456.7, z: 28.1 &#125;</span>

<span class="cw-c">// Works identically on ESX, QBCore, ox_core</span>
<span class="cw-k">const</span> <span class="cw-v">framework</span> <span class="cw-op">=</span> <span class="cw-fn">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">]</span>
  <span class="cw-p">.</span><span class="cw-fn">GetFramework</span><span class="cw-p">()</span> <span class="cw-c">// "esx" | "qb" | "ox" | "standalone"</span></code></pre>
  </div>
</template>

<style scoped>
.cw-card {
  background: #0d0d10;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
}

.cw-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #111114;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.cw-filename {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Menlo', 'Consolas', monospace;
}

.cw-lang {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 4px;
  padding: 2px 7px;
}

.cw-pre {
  margin: 0;
  padding: 24px;
  font-size: 13.5px;
  line-height: 1.75;
  font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
  overflow-x: auto;
  background: transparent;
}

/* Syntax token colors */
.cw-k    { color: #818cf8; }       /* keyword: const */
.cw-v    { color: #e2e8f0; }       /* variable */
.cw-fn   { color: #a5b4fc; }       /* function call */
.cw-prop { color: #c4b5fd; }       /* property */
.cw-s    { color: #86efac; }       /* string */
.cw-c    { color: #4b5563; }       /* comment */
.cw-op   { color: #94a3b8; }       /* operator */
.cw-p    { color: #64748b; }       /* punctuation */
</style>
```

**Step 2: Register in `theme/index.ts`**

```ts
import CodeWidget from './CodeWidget.vue'
app.component('CodeWidget', CodeWidget)
```

**Step 3: Commit**

```bash
git add .vitepress/theme/CodeWidget.vue .vitepress/theme/index.ts
git commit -m "feat(landing): add CodeWidget syntax-highlighted export preview"
```

---

## Task 4: Create `ScreenshotFrame.vue`

**Files:**
- Create: `.vitepress/theme/ScreenshotFrame.vue`

**Step 1: Create the component**

```vue
<!-- .vitepress/theme/ScreenshotFrame.vue -->
<script setup>
defineProps({
  src:  { type: String, required: true },
  alt:  { type: String, required: true },
  tilt: { type: String, default: 'none' }, // 'left' | 'right' | 'none'
})
</script>

<template>
  <div :class="['sf-wrapper', `sf-tilt-${tilt}`]">
    <div class="sf-frame">
      <div class="sf-bar">
        <div class="sf-dots">
          <span class="sf-dot sf-dot--red"></span>
          <span class="sf-dot sf-dot--yellow"></span>
          <span class="sf-dot sf-dot--green"></span>
        </div>
        <div class="sf-url">z-admin.localhost</div>
      </div>
      <img :src="src" :alt="alt" class="sf-img" />
    </div>
  </div>
</template>

<style scoped>
.sf-wrapper {
  transition: transform 0.4s ease;
}

.sf-tilt-right { transform: perspective(1000px) rotateY(-4deg) rotateX(1deg); }
.sf-tilt-left  { transform: perspective(1000px) rotateY(4deg) rotateX(1deg); }

.sf-wrapper:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg) !important;
}

.sf-frame {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.04);
}

.sf-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: #141416;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.sf-dots { display: flex; gap: 6px; }
.sf-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.sf-dot--red    { background: #ff5f57; }
.sf-dot--yellow { background: #ffbd2e; }
.sf-dot--green  { background: #28c840; }

.sf-url {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 3px 12px;
  flex: 1;
  text-align: center;
}

.sf-img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
```

**Step 2: Register in `theme/index.ts`**

```ts
import ScreenshotFrame from './ScreenshotFrame.vue'
app.component('ScreenshotFrame', ScreenshotFrame)
```

**Step 3: Commit**

```bash
git add .vitepress/theme/ScreenshotFrame.vue .vitepress/theme/index.ts
git commit -m "feat(landing): add ScreenshotFrame component with optional 3D tilt"
```

---

## Task 5: Create `SpotlightSection.vue`

**Files:**
- Create: `.vitepress/theme/SpotlightSection.vue`

**Step 1: Create the component**

```vue
<!-- .vitepress/theme/SpotlightSection.vue -->
<script setup>
defineProps({
  badge:   { type: String, required: true },
  headline:{ type: String, required: true },
  body:    { type: String, required: true },
  bullets: { type: Array,  default: () => [] },
  ctaText: { type: String, default: 'Read the Docs' },
  ctaLink: { type: String, required: true },
  reverse: { type: Boolean, default: false },
})
</script>

<template>
  <section :class="['sl-section', { 'sl-section--reverse': reverse }]">
    <div class="sl-text">
      <span class="sl-badge">{{ badge }}</span>
      <h2 class="sl-headline">{{ headline }}</h2>
      <p class="sl-body">{{ body }}</p>
      <ul v-if="bullets.length" class="sl-bullets">
        <li v-for="bullet in bullets" :key="bullet" class="sl-bullet">
          <svg class="sl-check" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7.5" stroke="rgba(99,102,241,0.3)"/>
            <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#6366f1" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ bullet }}
        </li>
      </ul>
      <a :href="ctaLink" class="sl-cta">{{ ctaText }} →</a>
    </div>
    <div class="sl-visual">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.sl-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 96px 24px;
}

.sl-section--reverse { direction: rtl; }
.sl-section--reverse > * { direction: ltr; }

.sl-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6366f1;
  margin-bottom: 20px;
}

.sl-headline {
  font-size: clamp(28px, 3.5vw, 42px);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.15;
  margin: 0 0 20px;
  color: #fff;
}

:global(:root:not(.dark)) .sl-headline { color: #111; }

.sl-body {
  font-size: 17px;
  line-height: 1.7;
  color: #a1a1aa;
  margin: 0 0 28px;
}

.sl-bullets {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sl-bullet {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: #d4d4d8;
  line-height: 1.4;
}

.sl-check {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.sl-cta {
  display: inline-flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: #6366f1;
  text-decoration: none;
  transition: color 0.2s ease, gap 0.2s ease;
  gap: 4px;
}

.sl-cta:hover {
  color: #818cf8;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Mobile */
@media (max-width: 768px) {
  .sl-section {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 64px 24px;
  }
  .sl-section--reverse { direction: ltr; }
}
</style>
```

**Step 2: Register in `theme/index.ts`**

```ts
import SpotlightSection from './SpotlightSection.vue'
app.component('SpotlightSection', SpotlightSection)
```

**Step 3: Commit**

```bash
git add .vitepress/theme/SpotlightSection.vue .vitepress/theme/index.ts
git commit -m "feat(landing): add SpotlightSection reusable component"
```

---

## Task 6: Create `CTABlock.vue`

**Files:**
- Create: `.vitepress/theme/CTABlock.vue`

**Step 1: Create the component**

```vue
<!-- .vitepress/theme/CTABlock.vue -->
<template>
  <div class="cta-outer">
    <div class="cta-glow"></div>
    <div class="cta-inner">
      <h2 class="cta-headline">Ready to set up your server?</h2>
      <p class="cta-sub">Everything you need is in the docs.</p>
      <div class="cta-actions">
        <a href="/z-docs/core/introduction" class="cta-btn cta-btn--brand">
          Browse Documentation
        </a>
        <a href="https://github.com/zhoraFPS" class="cta-btn cta-btn--alt" target="_blank" rel="noopener">
          View on GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cta-outer {
  position: relative;
  padding: 120px 24px;
  text-align: center;
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.cta-inner {
  position: relative;
  z-index: 1;
  max-width: 560px;
  margin: 0 auto;
}

.cta-headline {
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 800;
  letter-spacing: -0.035em;
  margin: 0 0 16px;
  color: #fff;
}

:global(:root:not(.dark)) .cta-headline { color: #111; }

.cta-sub {
  font-size: 17px;
  color: #a1a1aa;
  margin: 0 0 40px;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  border-radius: 100px;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 32px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.cta-btn--brand {
  background: linear-gradient(180deg, #818cf8 0%, #6366f1 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  color: #fff;
}

.cta-btn--brand:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.cta-btn--alt {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
}

.cta-btn--alt:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}
</style>
```

**Step 2: Register in `theme/index.ts`**

```ts
import CTABlock from './CTABlock.vue'
app.component('CTABlock', CTABlock)
```

**Step 3: Verify `theme/index.ts` now looks like this:**

```ts
import DefaultTheme from 'vitepress/theme'
import HeroShowcase     from './HeroShowcase.vue'
import HeroCarousel     from './HeroCarousel.vue'
import TrustBar         from './TrustBar.vue'
import CodeWidget       from './CodeWidget.vue'
import ScreenshotFrame  from './ScreenshotFrame.vue'
import SpotlightSection from './SpotlightSection.vue'
import CTABlock         from './CTABlock.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeroShowcase',     HeroShowcase)
    app.component('HeroCarousel',     HeroCarousel)
    app.component('TrustBar',         TrustBar)
    app.component('CodeWidget',       CodeWidget)
    app.component('ScreenshotFrame',  ScreenshotFrame)
    app.component('SpotlightSection', SpotlightSection)
    app.component('CTABlock',         CTABlock)
  }
}
```

**Step 4: Commit**

```bash
git add .vitepress/theme/CTABlock.vue .vitepress/theme/index.ts
git commit -m "feat(landing): add CTABlock component and finalize theme registrations"
```

---

## Task 7: Rewrite `index.md`

**Files:**
- Modify: `index.md` (full replacement of body below frontmatter)

**Step 1: Replace the entire file content**

Keep the YAML frontmatter (lines 1–15) identical. Replace everything after the closing `---` with:

```md
---
layout: home

hero:
  name: "Z-Docs"
  text: "Premium Scripts & Documentation."
  tagline: We build high-quality FiveM scripts for your server. Z-DOCS is the central hub for all our resource documentation, including our powerful Z-Core bridge and real-time Z-Admin dashboard.
  actions:
    - theme: brand
      text: Browse Documentation
      link: /core/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/zhoraFPS
---

<!-- Apple-style Soft Spotlights -->
<div class="apple-spotlight-container">
  <div class="spotlight spotlight-1"></div>
  <div class="spotlight spotlight-2"></div>
  <div class="spotlight spotlight-3"></div>
</div>

<HeroCarousel />

<TrustBar />

<div class="sl-container">

<SpotlightSection
  badge="Z-Core"
  headline="One Bridge. Every Framework."
  body="Z-Core automatically detects whether you're running ESX, QBCore, ox_core, or Standalone — and adapts instantly. Zero configuration changes required on your part."
  :bullets="['Auto-detects your framework on startup', 'Unified player, job, and inventory API', 'Drop in and go — no server.cfg editing']"
  cta-text="Read the Z-Core Docs"
  cta-link="/core/introduction"
>
  <template #default>
    <CodeWidget />
  </template>
</SpotlightSection>

<SpotlightSection
  badge="Z-Core"
  headline="Developer API that doesn't get in your way."
  body="Clean exports and server events. Whether you're building a custom script or extending Z-Core, the API stays consistent regardless of the framework underneath."
  :bullets="['Exports for player data, jobs, money, coords', 'Server events for inventory and framework hooks', 'Full TypeScript-friendly structure']"
  cta-text="View Exports & Events"
  cta-link="/core/developer-api"
  :reverse="true"
>
  <template #default>
    <CodeWidget />
  </template>
</SpotlightSection>

</div>

<div class="sl-divider"></div>

<div class="sl-container">

<SpotlightSection
  badge="Z-Admin"
  headline="Your server. At a glance."
  body="The interactive live map shows every online player in real-time — with job-based color coding, blip clustering, and one-click teleport or inspection."
  :bullets="['Real-time player positions with job colors', 'Click any blip to inspect, spectate, or teleport', 'Auto-refreshes without page reload']"
  cta-text="Live Map Docs"
  cta-link="/dashboard/live-map"
>
  <template #default>
    <ScreenshotFrame src="/screenshots/livemap.jpg" alt="Z-Admin Live Map" tilt="right" />
  </template>
</SpotlightSection>

<SpotlightSection
  badge="Z-Admin"
  headline="Full control. One click away."
  body="Kick, ban, heal, give items, edit inventories, manage vehicles — every admin action is available directly from the player panel. No in-game commands needed."
  :bullets="['Full inventory & vehicle management', 'Permanent ban with reason and audit trail', 'Search players by name, ID, or license']"
  cta-text="Player Management Docs"
  cta-link="/dashboard/player-management"
  :reverse="true"
>
  <template #default>
    <ScreenshotFrame src="/screenshots/players.png" alt="Player Management" tilt="left" />
  </template>
</SpotlightSection>

<SpotlightSection
  badge="Z-Admin"
  headline="Security that doesn't sleep."
  body="The built-in security engine monitors for suspicious patterns, blocked exploits, and logs every admin action with timestamps. Your audit trail is always ready."
  :bullets="['Real-time exploit and anticheat detection', 'Full admin action audit log', 'Discord webhook alerts on critical events']"
  cta-text="Security Docs"
  cta-link="/dashboard/security-logs"
>
  <template #default>
    <ScreenshotFrame src="/screenshots/security.png" alt="Security & Audit Logs" tilt="right" />
  </template>
</SpotlightSection>

</div>

<CTABlock />

<style>
.sl-container {
  max-width: 1148px;
  margin: 0 auto;
  padding: 0 24px;
}

.sl-divider {
  height: 1px;
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
}
</style>
```

**Step 2: Start dev server, open the landing page**

```bash
npm run docs:dev
```

Navigate to `http://localhost:5173/z-docs/`. Visually verify:
- Hero carousel renders and auto-advances every 3 seconds
- Trust bar appears below the carousel
- All 5 spotlight sections render with correct text and visuals
- CodeWidget shows syntax-colored code
- ScreenshotFrames show the correct screenshots with browser chrome
- CTABlock renders at the bottom
- Mobile: resize to < 768px, verify sections stack correctly

**Step 3: Fix any visual issues before committing**

Common issues to check:
- Images not loading: verify paths are `/screenshots/foo.png` (leading slash, no `/z-docs/` prefix)
- Layout overflow on mobile: check `.sl-section` grid
- Light mode: verify text colors are readable (the `:global(:root:not(.dark))` overrides)

**Step 4: Commit**

```bash
git add index.md
git commit -m "feat(landing): rewrite index.md with hero carousel, trust bar, spotlight sections"
```

---

## Task 8: Build & Final Verification

**Step 1: Run production build**

```bash
npm run docs:build
```

Expected: No errors, output in `.vitepress/dist/`.

**Step 2: Preview the production build**

```bash
npm run docs:preview
```

Open `http://localhost:4173/z-docs/`. Verify:
- All screenshots load (they come from `public/` → copied to `dist/`)
- Carousel works
- Navigation links (CTA buttons, spotlight CTAs) go to correct pages
- No 404s in browser console

**Step 3: Commit**

If the build is clean:

```bash
git add .
git commit -m "feat(landing): verify production build — landing page redesign complete"
```

**Step 4: Push to GitHub Pages**

```bash
git push origin main
```

GitHub Actions will deploy to GitHub Pages automatically.

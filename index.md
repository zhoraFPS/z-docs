---
layout: home

hero:
  name: "Z-Docs"
  text: "Build powerful FiveM experiences."
  tagline: Documentation for all Z-Ecosystem scripts. From high-performance core frameworks to real‑time admin dashboards — everything starts here.
  actions:
    - theme: brand
      text: Z-Core Docs
      link: /core/introduction
    - theme: alt
      text: Dashboard Docs
      link: /dashboard/getting-started
---

<div class="showcase-section">
  <div class="showcase-header">
    <span class="overline">Z-CORE DASHBOARD</span>
    <h2>Your server. One panel.</h2>
    <p>Player management, live map, support tickets, security — all from one unified admin interface.</p>
  </div>
  <HeroShowcase />
</div>

<style>
.showcase-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px 100px;
}

.showcase-header {
  text-align: center;
  margin-bottom: 48px;
}

.overline {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 16px;
  display: block;
}

.showcase-header h2 {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 14px;
  line-height: 1.15;
}

.showcase-header p {
  font-size: 16px;
  color: var(--vp-c-text-2);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
}
</style>

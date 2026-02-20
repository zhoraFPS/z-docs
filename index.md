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

<div class="custom-section">
  <div class="section-header">
    <span class="overline">FEATURED</span>
    <h2>Z-Core Admin Dashboard</h2>
    <p>Real-time server management with granular permissions, live map tracking, and in-browser staff management.</p>
  </div>
  <HeroShowcase />
</div>

<style>
.custom-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.overline {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 12px;
  display: block;
}

.section-header h2 {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
  line-height: 1.2;
}

.section-header p {
  font-size: 16px;
  color: var(--vp-c-text-2);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.6;
}
</style>

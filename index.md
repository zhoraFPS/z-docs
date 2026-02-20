---
layout: home

hero:
  name: "Z-Ecosystem"
  text: "Everything you need to run your FiveM server."
  tagline: From a powerful core framework to a full admin dashboard — manage your server like a pro, no coding required.
  actions:
    - theme: brand
      text: Get Started
      link: /core/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/zhoraFPS
---

<!-- Z-Core Section -->
<div class="product-section">
  <div class="product-header">
    <span class="product-badge">FRAMEWORK</span>
    <h2 class="gradient-heading">Z-Core</h2>
    <p class="product-desc">The foundation for your server. Install once, and everything just works — regardless of your framework.</p>
  </div>
  <div class="bento core-bento">
    <a href="/core/installation" class="bento-card wide">
      <div class="card-icon">⚡</div>
      <h3>Drag & Drop Installation</h3>
      <p>Drop the folder into your server, start it — done. No complex setup, no configuration files to edit.</p>
      <span class="arrow">→</span>
    </a>
    <a href="/core/permissions" class="bento-card">
      <div class="card-icon">🔐</div>
      <h3>Permission System</h3>
      <p>Control exactly who on your team can do what. Fine-grained access control without touching any config files.</p>
      <span class="arrow">→</span>
    </a>
    <a href="/core/introduction" class="bento-card">
      <div class="card-icon">🔄</div>
      <h3>Works with Every Framework</h3>
      <p>ESX, QBCore, ox_core — Z-Core detects your setup automatically and adapts.</p>
      <span class="arrow">→</span>
    </a>
  </div>
</div>

<!-- Z-Admin Section -->
<div class="product-section">
  <div class="product-header">
    <span class="product-badge">DASHBOARD</span>
    <h2 class="gradient-heading">Z-Admin</h2>
    <p class="product-desc">A real-time admin dashboard to manage players, view your map, handle support tickets, and keep your server secure.</p>
  </div>
  <div class="bento admin-bento">
    <a href="/dashboard/live-map" class="bento-card">
      <div class="card-icon">🗺️</div>
      <h3>Live Map</h3>
      <p>See every player on the map in real-time. Click to teleport, spectate, or take action — instantly.</p>
      <span class="arrow">→</span>
    </a>
    <a href="/dashboard/player-management" class="bento-card">
      <div class="card-icon">👥</div>
      <h3>Player Management</h3>
      <p>Kick, ban, heal, or teleport players with one click. View inventories and manage vehicles.</p>
      <span class="arrow">→</span>
    </a>
    <a href="/dashboard/security-logs" class="bento-card wide">
      <div class="card-icon">🛡️</div>
      <h3>Security & Audit Logs</h3>
      <p>Automatic exploit detection, login monitoring, and a full activity log — so you always know what's happening on your server.</p>
      <span class="arrow">→</span>
    </a>
    <a href="/dashboard/getting-started" class="bento-card">
      <div class="card-icon">🎨</div>
      <h3>Custom Themes</h3>
      <p>10 curated color themes — switch your dashboard look with a single click.</p>
      <span class="arrow">→</span>
    </a>
    <a href="/dashboard/getting-started" class="bento-card">
      <div class="card-icon">💬</div>
      <h3>Support Tickets</h3>
      <p>Players can submit tickets directly in-game. Your team handles them from the dashboard.</p>
      <span class="arrow">→</span>
    </a>
  </div>
</div>

<style>
/* ── Product Sections ── */
.product-section {
  max-width: 880px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.product-section + .product-section {
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.product-header {
  margin-bottom: 32px;
}

.product-badge {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  display: block;
  margin-bottom: 12px;
}

.gradient-heading {
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 16px;
  background: linear-gradient(135deg, #fff 40%, var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:root:not(.dark) .gradient-heading {
  background: linear-gradient(135deg, #09090b 40%, var(--vp-c-brand-1));
  -webkit-background-clip: text;
  background-clip: text;
}

.product-desc {
  font-size: 17px;
  color: var(--vp-c-text-2);
  max-width: 520px;
  line-height: 1.6;
  margin: 0;
}

/* ── Bento Grid ── */
.bento {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
}

:root:not(.dark) .bento {
  background: rgba(0, 0, 0, 0.07);
}

.bento-card {
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg);
  padding: 28px 32px;
  position: relative;
  transition: background 0.25s ease;
}

.bento-card.wide {
  grid-column: span 2;
}

.bento-card:hover {
  background: var(--vp-c-bg-soft);
}

.card-icon {
  font-size: 22px;
  margin-bottom: 14px;
  line-height: 1;
}

.bento-card h3 {
  font-size: 16px;
  font-weight: 650;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  line-height: 1.3;
}

.bento-card p {
  font-size: 14px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  margin: 0;
  max-width: 400px;
}

.arrow {
  position: absolute;
  top: 28px;
  right: 28px;
  font-size: 16px;
  color: var(--vp-c-text-3);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
}

.bento-card:hover .arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--vp-c-brand-1);
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .bento {
    grid-template-columns: 1fr;
    border-radius: 12px;
  }

  .bento-card.wide {
    grid-column: span 1;
  }

  .bento-card {
    padding: 24px;
  }

  .arrow {
    opacity: 1;
    transform: translateX(0);
  }

  .product-section {
    padding: 0 16px 48px;
  }
}
</style>

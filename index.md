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

<!-- Ambient Hero Glow -->
<div class="hero-ambient-glow"></div>

<div class="premium-container">
  <!-- Z-Core Section -->
  <div class="product-group">
    <div class="product-header">
      <div class="header-pill">FRAMEWORK</div>
      <h2 class="premium-heading">Z-Core</h2>
      <p class="premium-desc">The foundation for your server. Install once, and everything just works — regardless of your framework.</p>
    </div>
    <div class="glass-grid core-grid">
      <a href="/core/installation" class="glass-card wide">
        <div class="icon-wrapper">
          <div class="icon-glow"></div>
          <div class="icon-svg">⚡</div>
        </div>
        <div class="card-content">
          <h3>Drag & Drop Installation</h3>
          <p>Drop the folder into your server, start it — done. No complex setup, no configuration files to edit.</p>
        </div>
        <div class="hover-arrow">→</div>
      </a>
      <a href="/core/permissions" class="glass-card">
        <div class="icon-wrapper">
          <div class="icon-glow"></div>
          <div class="icon-svg">🔐</div>
        </div>
        <div class="card-content">
          <h3>Permission System</h3>
          <p>Control exactly who on your team can do what. Fine-grained access control.</p>
        </div>
        <div class="hover-arrow">→</div>
      </a>
      <a href="/core/introduction" class="glass-card">
        <div class="icon-wrapper">
          <div class="icon-glow"></div>
          <div class="icon-svg">🔄</div>
        </div>
        <div class="card-content">
          <h3>Framework Agnostic</h3>
          <p>ESX, QBCore, ox_core — Z-Core detects your setup automatically.</p>
        </div>
        <div class="hover-arrow">→</div>
      </a>
    </div>
  </div>

  <!-- Divider -->
  <div class="premium-divider"></div>

  <!-- Z-Admin Section -->
  <div class="product-group">
    <div class="product-header">
      <div class="header-pill">DASHBOARD</div>
      <h2 class="premium-heading">Z-Admin</h2>
      <p class="premium-desc">A real-time admin dashboard to manage players, view your map, handle support tickets, and keep your server secure.</p>
    </div>
    <div class="glass-grid admin-grid">
      <a href="/dashboard/live-map" class="glass-card">
        <div class="icon-wrapper">
          <div class="icon-glow"></div>
          <div class="icon-svg">🗺️</div>
        </div>
        <div class="card-content">
          <h3>Live Map</h3>
          <p>See every player on the map in real-time. Instantly teleport or spectate.</p>
        </div>
        <div class="hover-arrow">→</div>
      </a>
      <a href="/dashboard/player-management" class="glass-card">
        <div class="icon-wrapper">
          <div class="icon-glow"></div>
          <div class="icon-svg">👥</div>
        </div>
        <div class="card-content">
          <h3>Player Management</h3>
          <p>Kick, ban, heal, or teleport players with one click. Manage vehicles.</p>
        </div>
        <div class="hover-arrow">→</div>
      </a>
      <a href="/dashboard/security-logs" class="glass-card wide">
        <div class="icon-wrapper">
          <div class="icon-glow"></div>
          <div class="icon-svg">🛡️</div>
        </div>
        <div class="card-content">
          <h3>Security & Audit Logs</h3>
          <p>Automatic exploit detection, login monitoring, and a full activity log — so you always know what's happening.</p>
        </div>
        <div class="hover-arrow">→</div>
      </a>
      <a href="/dashboard/getting-started" class="glass-card">
        <div class="icon-wrapper">
          <div class="icon-glow"></div>
          <div class="icon-svg">🎨</div>
        </div>
        <div class="card-content">
          <h3>Custom Themes</h3>
          <p>10 curated color themes — switch your dashboard look instantly.</p>
        </div>
        <div class="hover-arrow">→</div>
      </a>
      <a href="/dashboard/getting-started" class="glass-card">
        <div class="icon-wrapper">
          <div class="icon-glow"></div>
          <div class="icon-svg">💬</div>
        </div>
        <div class="card-content">
          <h3>Support Tickets</h3>
          <p>Players submit tickets in-game. You handle them from the dashboard.</p>
        </div>
        <div class="hover-arrow">→</div>
      </a>
    </div>
  </div>
</div>

<style>
/* ── Premium Layout Base ── */
.premium-container {
  max-width: 1040px;
  margin: 0 auto;
  padding: 20px 24px 100px;
  position: relative;
  z-index: 10;
}

.hero-ambient-glow {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  height: 600px;
  background: radial-gradient(ellipse at top, rgba(99, 102, 241, 0.12), transparent 70%);
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

/* ── Product Section Headers ── */
.product-group {
  margin-bottom: 24px;
}

.product-header {
  text-align: center;
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-pill {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.1);
}

.premium-heading {
  font-size: clamp(32px, 5vw, 44px);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 16px;
  line-height: 1.1;
  color: #fff;
}

:root:not(.dark) .premium-heading {
  color: #111;
}

.premium-desc {
  font-size: 16px;
  color: var(--vp-c-text-2);
  max-width: 500px;
  text-align: center;
  line-height: 1.6;
  margin: 0;
}

/* ── Divider ── */
.premium-divider {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  margin: 72px 0;
}

:root:not(.dark) .premium-divider {
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent);
}

/* ── Glass Grid & Cards ── */
.glass-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.glass-card {
  position: relative;
  text-decoration: none !important;
  color: inherit;
  padding: 32px;
  border-radius: 20px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.3s ease, 
              box-shadow 0.3s ease, 
              background 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, -20%), rgba(255,255,255,0.04), transparent 40%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.glass-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.12);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2), 
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              0 0 0 1px rgba(99, 102, 241, 0.05);
}

.glass-card:hover::before {
  opacity: 1;
}

.glass-card.wide {
  grid-column: span 2;
  flex-direction: row;
  align-items: center;
  gap: 24px;
}

/* ── Card Content ── */
.icon-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  z-index: 1;
}

.glass-card.wide .icon-wrapper {
  margin-bottom: 0;
  flex-shrink: 0;
}

.icon-glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
  opacity: 0.5;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.glass-card:hover .icon-glow {
  opacity: 0.8;
  transform: scale(1.1);
}

.icon-svg {
  font-size: 24px;
  position: relative;
  z-index: 2;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.glass-card:hover .icon-svg {
  transform: scale(1.1) translateY(-1px);
}

.card-content {
  position: relative;
  z-index: 1;
  flex-grow: 1;
}

.glass-card h3 {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 8px;
  color: #fff;
  line-height: 1.3;
}

.glass-card p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

.hover-arrow {
  position: absolute;
  bottom: 32px;
  right: 32px;
  font-size: 18px;
  color: var(--vp-c-brand-1);
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-card.wide .hover-arrow {
  top: 50%;
  bottom: auto;
  transform: translate(-8px, -50%);
}

.glass-card:hover .hover-arrow {
  opacity: 1;
  transform: translateX(0) translateY(0);
}

.glass-card.wide:hover .hover-arrow {
  transform: translate(0, -50%);
}

/* ── Light mode overrides ── */
:root:not(.dark) .glass-card {
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1);
}

:root:not(.dark) .glass-card:hover {
  background: linear-gradient(160deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 100%);
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1);
}

:root:not(.dark) .glass-card h3 {
  color: #111;
}

:root:not(.dark) .icon-glow {
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .glass-grid {
    grid-template-columns: 1fr;
  }
  .glass-card.wide {
    grid-column: span 1;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
  .glass-card.wide .icon-wrapper {
    margin-bottom: 20px;
  }
  .glass-card.wide .hover-arrow {
    top: auto;
    bottom: 32px;
    transform: translateX(-8px);
  }
  .glass-card.wide:hover .hover-arrow {
    transform: translateX(0);
  }
  .premium-heading {
    text-align: center;
  }
}
</style>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Add subtle mouse tracking for the glass cards
  const cards = document.querySelectorAll('.glass-card')
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    })
  })
})
</script>

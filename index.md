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
  body="Z-Core detects whether you're running ESX, QBCore, ox_core, or Standalone at startup — and adapts automatically. Your scripts stay identical across every server."
  :bullets="['Auto-detects ESX, QBCore, ox_core or Standalone on boot', 'GetPlayer, AddItem, HasPermission — same exports everywhere', 'Drop in as a dependency — no per-framework config needed']"
  cta-text="Read the Z-Core Docs"
  cta-link="/core/introduction"
>
  <CodeWidget tilt="right" variant="player" />
</SpotlightSection>

<SpotlightSection
  badge="Z-Core"
  headline="Developer API that doesn't get in your way."
  body="Clean global exports for everything you need — player data, inventory, bans, warns, permissions, Discord webhooks. One consistent API regardless of what runs underneath."
  :bullets="['Player data: name, identifier, job, money — one call', 'Built-in inventory, warn, ban &amp; permission exports', 'Full TypeScript types — autocompletion in every IDE']"
  cta-text="View the API Reference"
  cta-link="/core/developer-api"
  :reverse="true"
>
  <CodeWidget tilt="left" variant="api" />
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
  <ScreenshotFrame src="/screenshots/livemap.jpg" alt="Z-Admin Live Map" tilt="right" />
</SpotlightSection>

<SpotlightSection
  badge="Z-Admin"
  headline="Full control. One click away."
  body="Kick, ban, heal, give items, edit inventories, manage vehicles — every admin action is available directly from the player panel. No in-game commands needed."
  :bullets="['Full inventory &amp; vehicle management', 'Permanent ban with reason and audit trail', 'Search players by name, ID, or license']"
  cta-text="Player Management Docs"
  cta-link="/dashboard/player-management"
  :reverse="true"
>
  <ScreenshotFrame src="/screenshots/players.png" alt="Player Management" tilt="left" />
</SpotlightSection>

<SpotlightSection
  badge="Z-Admin"
  headline="Security that doesn't sleep."
  body="The built-in security engine monitors for suspicious patterns, blocked exploits, and logs every admin action with timestamps. Your audit trail is always ready."
  :bullets="['Real-time exploit and anticheat detection', 'Full admin action audit log', 'Discord webhook alerts on critical events']"
  cta-text="Security Docs"
  cta-link="/dashboard/security-logs"
>
  <ScreenshotFrame src="/screenshots/security.png" alt="Security &amp; Audit Logs" tilt="right" />
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

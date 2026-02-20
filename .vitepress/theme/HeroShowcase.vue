<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

const features = [
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    title: 'Live Atlas',
    desc: 'Real-time player positions with clustered blips, job-based color coding, and instant teleport.',
    link: '/dashboard/live-map',
    span: 'wide',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
    title: 'Player Management',
    desc: 'Kick, ban, heal, teleport, edit inventories, manage vehicles — all from one panel.',
    link: '/dashboard/player-management',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
    title: 'Granular Permissions',
    desc: '12 permission strings, identifier-based staff management, namespace matching — zero server.cfg editing.',
    link: '/core/permissions',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: 'Security Shield',
    desc: 'Real-time exploit scanner, brute-force detection, and comprehensive audit logging.',
    link: '/dashboard/security-logs',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
    title: 'Theme Presets',
    desc: '10 curated color profiles — from Monochrome to Neon Synth — with one-click deployment.',
    link: '/dashboard/getting-started',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    title: 'Zero Dependencies',
    desc: 'Single esbuild bundle, no node_modules. Drop in, start your server — ESX, QBCore, ox_core.',
    link: '/core/installation',
    span: 'wide',
  },
]

onMounted(() => {
  setTimeout(() => { isVisible.value = true }, 200)
})
</script>

<template>
  <div class="bento-grid" :class="{ visible: isVisible }">
    <a
      v-for="(feat, i) in features"
      :key="i"
      :href="feat.link"
      :class="['bento-card', feat.span === 'wide' ? 'wide' : '']"
      :style="{ '--delay': `${i * 60}ms` }"
    >
      <div class="card-inner">
        <div class="card-icon" v-html="feat.icon"></div>
        <h3>{{ feat.title }}</h3>
        <p>{{ feat.desc }}</p>
        <span class="card-arrow">→</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  max-width: 820px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.bento-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.bento-card {
  text-decoration: none;
  color: inherit;
  position: relative;
  background: var(--vp-c-bg);
  transition: background 0.3s ease;
}

.bento-card.wide {
  grid-column: span 2;
}

.card-inner {
  padding: 32px;
  position: relative;
}

.card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(99, 102, 241, 0.08);
  color: var(--vp-c-brand-1);
  margin-bottom: 20px;
  transition: background 0.3s ease, color 0.3s ease;
}

.bento-card:hover .card-icon {
  background: rgba(99, 102, 241, 0.15);
  color: var(--vp-c-brand-2);
}

.bento-card h3 {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 8px;
  line-height: 1.3;
}

.bento-card p {
  font-size: 14px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  margin: 0;
  max-width: 360px;
}

.card-arrow {
  position: absolute;
  top: 32px;
  right: 32px;
  font-size: 16px;
  color: var(--vp-c-text-3);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
}

.bento-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--vp-c-brand-1);
}

.bento-card:hover {
  background: var(--vp-c-bg-soft);
}

/* ── Light mode ── */
:root:not(.dark) .bento-grid {
  background: rgba(0, 0, 0, 0.06);
}

:root:not(.dark) .card-icon {
  background: rgba(99, 102, 241, 0.06);
}

:root:not(.dark) .bento-card:hover .card-icon {
  background: rgba(99, 102, 241, 0.1);
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
    border-radius: 12px;
  }

  .bento-card.wide {
    grid-column: span 1;
  }

  .card-inner {
    padding: 24px;
  }

  .card-arrow {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

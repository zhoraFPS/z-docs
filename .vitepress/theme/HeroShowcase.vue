<script setup>
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'

const isVisible = ref(false)
const hoveredIndex = ref(-1)

const screens = [
  { img: '/screenshots/dashboard.png', label: 'Dashboard', desc: 'Live Atlas · Network Traffic · Security Log' },
  { img: '/screenshots/players.png', label: 'Players', desc: 'Real-time player management & actions' },
  { img: '/screenshots/settings.png', label: 'Settings', desc: 'Theme presets & appearance branding' },
  { img: '/screenshots/support.png', label: 'Support', desc: 'Ticket system with status tracking' },
  { img: '/screenshots/livemap.jpg', label: 'Live Map', desc: 'Full-screen Atlas with player blips' },
]

onMounted(() => {
  setTimeout(() => { isVisible.value = true }, 200)
})
</script>

<template>
  <div class="stack-showcase" :class="{ visible: isVisible }">
    <div
      class="stack-container"
      @mouseleave="hoveredIndex = -1"
    >
      <div
        v-for="(screen, i) in screens"
        :key="i"
        :class="['stack-card', { hovered: hoveredIndex === i, dimmed: hoveredIndex !== -1 && hoveredIndex !== i }]"
        :style="{
          '--i': i,
          '--total': screens.length,
          zIndex: hoveredIndex === i ? 50 : screens.length - i,
        }"
        @mouseenter="hoveredIndex = i"
      >
        <img :src="withBase(screen.img)" :alt="screen.label" loading="lazy" />

        <!-- Label overlay -->
        <div class="card-label">
          <span class="card-title">{{ screen.label }}</span>
          <span class="card-desc">{{ screen.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stack-showcase {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.stack-showcase.visible {
  opacity: 1;
  transform: translateY(0);
}

.stack-container {
  position: relative;
  width: 100%;
  /* Height based on the main card's aspect ratio plus the stack offset */
  aspect-ratio: 16 / 11;
  perspective: 1200px;
}

.stack-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  backface-visibility: hidden;

  /* Default stacked position — each card shifts down and right */
  transform:
    translateY(calc(var(--i) * 28px))
    translateX(calc(var(--i) * 6px))
    scale(calc(1 - var(--i) * 0.025));

  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.4s ease,
    filter 0.4s ease,
    box-shadow 0.4s ease;

  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.06);
}

.stack-card img {
  width: 100%;
  height: auto;
  display: block;
}

/* Hovered card — lifts up and forward */
.stack-card.hovered {
  transform:
    translateY(-8px)
    translateX(0px)
    scale(1.02);
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 0 40px rgba(99, 102, 241, 0.06);
  z-index: 50 !important;
}

/* Non-hovered cards dim */
.stack-card.dimmed {
  opacity: 0.45;
  filter: brightness(0.7) saturate(0.8);
}

/* Label overlay — shows on hover */
.card-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 24px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.stack-card.hovered .card-label {
  opacity: 1;
  transform: translateY(0);
}

.card-title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
}

.card-desc {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  letter-spacing: 0.01em;
}

/* Mobile: simpler layout */
@media (max-width: 768px) {
  .stack-container {
    aspect-ratio: auto;
    height: auto;
  }

  .stack-card {
    position: relative;
    transform: none;
    margin-bottom: 12px;
    border-radius: 8px;
  }

  .stack-card.hovered {
    transform: none;
  }

  .stack-card.dimmed {
    opacity: 1;
    filter: none;
  }

  .card-label {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

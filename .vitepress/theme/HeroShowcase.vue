<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'

const activeIndex = ref(0)
const isVisible = ref(false)
const containerRef = ref(null)
const tiltX = ref(0)
const tiltY = ref(0)

const screens = [
  { img: '/screenshots/dashboard.png', label: 'Dashboard' },
  { img: '/screenshots/players.png', label: 'Players' },
  { img: '/screenshots/livemap.jpg', label: 'Live Map' },
  { img: '/screenshots/support.png', label: 'Support' },
  { img: '/screenshots/settings.png', label: 'Settings' },
]

function onMouseMove(e) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  tiltX.value = y * -4
  tiltY.value = x * 6
}

function onMouseLeave() {
  tiltX.value = 0
  tiltY.value = 0
}

onMounted(() => {
  setTimeout(() => { isVisible.value = true }, 300)
})
</script>

<template>
  <div class="showcase" :class="{ visible: isVisible }">
    <!-- Tab pills -->
    <div class="tabs">
      <button
        v-for="(screen, i) in screens"
        :key="i"
        :class="['tab', { active: activeIndex === i }]"
        @click="activeIndex = i"
      >
        {{ screen.label }}
      </button>
    </div>

    <!-- Screenshot display -->
    <div
      ref="containerRef"
      class="frame-wrapper"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    >
      <!-- Ambient glow -->
      <div class="ambient-glow"></div>

      <!-- Main frame with perspective tilt -->
      <div
        class="frame"
        :style="{
          transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
        }"
      >
        <div class="frame-inner">
          <img
            v-for="(screen, i) in screens"
            :key="i"
            :src="withBase(screen.img)"
            :alt="screen.label"
            :class="['screen-img', { active: activeIndex === i }]"
            loading="lazy"
          />
        </div>

        <!-- Shine overlay -->
        <div class="shine"></div>
      </div>

      <!-- Bottom gradient fade -->
      <div class="fade-out"></div>
    </div>
  </div>
</template>

<style scoped>
.showcase {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
  opacity: 0;
  transform: translateY(32px) scale(0.98);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.showcase.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ── Tab pills ── */
.tabs {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-bottom: 28px;
  padding: 3px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.tab {
  padding: 7px 18px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.35);
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  border-radius: 7px;
  transition: color 0.25s ease, background 0.25s ease;
  letter-spacing: 0.005em;
  position: relative;
}

.tab:hover {
  color: rgba(255, 255, 255, 0.65);
}

.tab.active {
  background: rgba(255, 255, 255, 0.09);
  color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

/* ── Frame wrapper ── */
.frame-wrapper {
  position: relative;
  cursor: default;
}

/* ── Ambient glow ── */
.ambient-glow {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 60%;
  background: radial-gradient(ellipse, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}

/* ── Frame with tilt ── */
.frame {
  position: relative;
  z-index: 1;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #0d0d10;
  transition: transform 0.15s ease-out;
  will-change: transform;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 2px 8px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.3),
    0 30px 80px -20px rgba(0, 0, 0, 0.4);
}

.frame-inner {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.screen-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.01);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.screen-img.active {
  opacity: 1;
  transform: scale(1);
}

/* ── Subtle shine overlay ── */
.shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 40%,
    rgba(255, 255, 255, 0.03) 45%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.03) 55%,
    transparent 60%
  );
  pointer-events: none;
  z-index: 3;
}

/* ── Bottom fade ── */
.fade-out {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to top, var(--vp-c-bg), transparent);
  pointer-events: none;
  z-index: 4;
}

/* ── Light mode ── */
:root:not(.dark) .tabs {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.06);
}

:root:not(.dark) .tab {
  color: rgba(0, 0, 0, 0.35);
}

:root:not(.dark) .tab:hover {
  color: rgba(0, 0, 0, 0.65);
}

:root:not(.dark) .tab.active {
  background: rgba(0, 0, 0, 0.06);
  color: #000;
}

:root:not(.dark) .ambient-glow {
  background: radial-gradient(ellipse, rgba(99, 102, 241, 0.06) 0%, transparent 70%);
}

:root:not(.dark) .frame {
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 12px 40px rgba(0, 0, 0, 0.08),
    0 30px 80px -20px rgba(0, 0, 0, 0.12);
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .tabs {
    gap: 0;
    overflow-x: auto;
    width: calc(100% - 8px);
    justify-content: flex-start;
  }

  .tab {
    padding: 6px 14px;
    font-size: 12px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .showcase {
    padding: 0 12px;
  }

  .frame {
    border-radius: 8px;
  }
}
</style>

<!-- .vitepress/theme/HeroCarousel.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'

const screenshots = [
  { src: withBase('/screenshots/dashboard.png'), alt: 'Z-Admin Dashboard Overview' },
  { src: withBase('/screenshots/players.png'),   alt: 'Player Management Panel' },
  { src: withBase('/screenshots/livemap.jpg'),   alt: 'Interactive Live Map' },
  { src: withBase('/screenshots/security.png'),  alt: 'Security & Audit Logs' },
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
  <div class="hc-wrapper" @mouseenter="pause" @mouseleave="resume">
    <!-- Stage isolates the glow from the indicators -->
    <div class="hc-stage">
      <div class="hc-glow" aria-hidden="true"></div>
      <div class="hc-frame">
        <img
          v-for="(s, i) in screenshots"
          :key="s.src"
          :src="s.src"
          :alt="s.alt"
          :class="['hc-img', { 'hc-img--active': i === current }]"
          :loading="i === 0 ? 'eager' : 'lazy'"
        />
      </div>
    </div>
    <div class="hc-indicators">
      <button
        v-for="(_, i) in screenshots"
        :key="i"
        :class="['hc-pip', { 'hc-pip--active': i === current }]"
        :aria-label="`Go to slide ${i + 1}`"
        :aria-current="i === current ? 'true' : undefined"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.hc-wrapper {
  max-width: 900px;
  margin: 56px auto 0;
  padding: 0 24px;
}

/* Stage = frame + glow only. Indicators are outside, no overlap. */
.hc-stage {
  position: relative;
  margin-bottom: 52px;
}

.hc-glow {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 200px;
  background: radial-gradient(ellipse, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}

.hc-frame {
  position: relative;
  z-index: 1;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 24px 60px rgba(0, 0, 0, 0.65),
    0 0 80px rgba(99, 102, 241, 0.08);
  aspect-ratio: 1024 / 670;
  background: #0a0a0c;
}

.hc-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* show full screenshot, no cropping */
  opacity: 0;
  transition: opacity 0.6s ease;
}
.hc-img--active { opacity: 1; }

.hc-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
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
  transform: scale(1.4);
}
.hc-pip:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 3px;
}
</style>

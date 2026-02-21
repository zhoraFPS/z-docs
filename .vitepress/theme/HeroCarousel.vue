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
.hc-pip:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 3px;
}
</style>

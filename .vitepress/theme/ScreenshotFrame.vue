<!-- .vitepress/theme/ScreenshotFrame.vue -->
<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  src:  { type: String, required: true },
  alt:  { type: String, required: true },
  tilt: { type: String, default: 'none' },
})

const resolvedSrc = computed(() => withBase(props.src))
</script>

<template>
  <div :class="['sf-wrapper', `sf-tilt-${tilt}`]">
    <div class="sf-glow" aria-hidden="true"></div>
    <img
      :src="resolvedSrc"
      :alt="alt"
      class="sf-img"
      loading="lazy"
    />
  </div>
</template>

<style scoped>
.sf-wrapper {
  position: relative;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.sf-tilt-right { transform: perspective(1200px) rotateY(-5deg) rotateX(2deg); }
.sf-tilt-left  { transform: perspective(1200px) rotateY(5deg) rotateX(2deg); }

.sf-wrapper:hover {
  transform: perspective(1200px) rotateY(0deg) rotateX(0deg) !important;
}

.sf-glow {
  position: absolute;
  bottom: -70px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 220px;
  background: radial-gradient(ellipse, rgba(99, 102, 241, 0.22) 0%, transparent 70%);
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
}

.sf-img {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 0 60px rgba(99, 102, 241, 0.12),
    0 28px 72px rgba(0, 0, 0, 0.65);
  transition: box-shadow 0.5s ease;
}

.sf-wrapper:hover .sf-img {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 0 80px rgba(99, 102, 241, 0.2),
    0 32px 80px rgba(0, 0, 0, 0.7);
}
</style>

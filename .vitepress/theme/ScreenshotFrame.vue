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
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

/* Deeper perspective + stronger angles for dramatic 3D depth */
.sf-tilt-right { transform: perspective(650px) rotateY(-13deg) rotateX(4deg); }
.sf-tilt-left  { transform: perspective(650px) rotateY(13deg)  rotateX(4deg); }

.sf-wrapper:hover {
  transform: perspective(650px) rotateY(0deg) rotateX(0deg) scale(1.02) !important;
}

.sf-glow {
  position: absolute;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 240px;
  background: radial-gradient(ellipse, rgba(99, 102, 241, 0.28) 0%, transparent 70%);
  filter: blur(55px);
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.5s ease;
}

.sf-wrapper:hover .sf-glow {
  opacity: 0.7;
}

.sf-img {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: box-shadow 0.65s ease;
}

/* Directional shadows match the tilt — light from above-center */
.sf-tilt-right .sf-img {
  box-shadow:
    14px 28px 80px rgba(0, 0, 0, 0.75),
    0 0 50px rgba(99, 102, 241, 0.14);
}

.sf-tilt-left .sf-img {
  box-shadow:
    -14px 28px 80px rgba(0, 0, 0, 0.75),
    0 0 50px rgba(99, 102, 241, 0.14);
}

.sf-wrapper:hover .sf-img {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.07),
    0 0 80px rgba(99, 102, 241, 0.22),
    0 36px 80px rgba(0, 0, 0, 0.6);
}
</style>

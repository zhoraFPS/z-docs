<!-- .vitepress/theme/ScreenshotFrame.vue -->
<script setup>
defineProps({
  src:  { type: String, required: true },
  alt:  { type: String, required: true },
  tilt: { type: String, default: 'none' },
})
</script>

<template>
  <div :class="['sf-wrapper', `sf-tilt-${tilt}`]">
    <div class="sf-frame">
      <div class="sf-bar">
        <div class="sf-dots">
          <span class="sf-dot sf-dot--red" aria-hidden="true"></span>
          <span class="sf-dot sf-dot--yellow" aria-hidden="true"></span>
          <span class="sf-dot sf-dot--green" aria-hidden="true"></span>
        </div>
        <div class="sf-url" aria-hidden="true">z-admin.localhost</div>
      </div>
      <img :src="src" :alt="alt" class="sf-img" loading="lazy" />
    </div>
  </div>
</template>

<style scoped>
.sf-wrapper {
  transition: transform 0.4s ease;
}

.sf-tilt-right { transform: perspective(1000px) rotateY(-4deg) rotateX(1deg); }
.sf-tilt-left  { transform: perspective(1000px) rotateY(4deg) rotateX(1deg); }

.sf-wrapper:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg) !important;
}

.sf-frame {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.04);
}

.sf-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: #141416;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.sf-dots { display: flex; gap: 6px; }
.sf-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.sf-dot--red    { background: #ff5f57; }
.sf-dot--yellow { background: #ffbd2e; }
.sf-dot--green  { background: #28c840; }

.sf-url {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 3px 12px;
  flex: 1;
  text-align: center;
}

.sf-img {
  display: block;
  width: 100%;
  height: auto;
}
</style>

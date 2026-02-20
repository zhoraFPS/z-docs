<script setup>
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'

const activeTab = ref(0)
const isVisible = ref(false)

const tabs = [
  { label: 'Dashboard', img: '/screenshots/dashboard.png' },
  { label: 'Players', img: '/screenshots/players.png' },
  { label: 'Settings', img: '/screenshots/settings.png' },
  { label: 'Security', img: '/screenshots/security.png' },
]

onMounted(() => {
  setTimeout(() => { isVisible.value = true }, 150)
})
</script>

<template>
  <div class="showcase" :class="{ visible: isVisible }">
    <!-- Tab selector -->
    <div class="tab-bar">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        :class="['tab', { active: activeTab === i }]"
        @click="activeTab = i"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Screenshot display -->
    <div class="screenshot-wrapper">
      <div class="screenshot-frame">
        <img
          v-for="(tab, i) in tabs"
          :key="i"
          :src="withBase(tab.img)"
          :alt="tab.label"
          :class="['screenshot-img', { active: activeTab === i }]"
          loading="lazy"
        />
      </div>

      <!-- Gradient fade at bottom -->
      <div class="screenshot-fade"></div>
    </div>
  </div>
</template>

<style scoped>
.showcase {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.showcase.visible {
  opacity: 1;
  transform: translateY(0);
}

.tab-bar {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 24px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.tab {
  padding: 8px 20px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  border-radius: 7px;
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
}

.tab:hover {
  color: rgba(255, 255, 255, 0.7);
}

.tab.active {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.screenshot-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 20px 60px -15px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(99, 102, 241, 0.04);
}

.screenshot-frame {
  position: relative;
  aspect-ratio: 16 / 9.2;
  background: #0a0a0c;
  overflow: hidden;
}

.screenshot-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.screenshot-img.active {
  opacity: 1;
}

.screenshot-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to top, var(--vp-c-bg), transparent);
  pointer-events: none;
  z-index: 2;
}

/* Light mode adjustments */
:root:not(.dark) .tab-bar {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.06);
}

:root:not(.dark) .tab {
  color: rgba(0, 0, 0, 0.4);
}

:root:not(.dark) .tab:hover {
  color: rgba(0, 0, 0, 0.7);
}

:root:not(.dark) .tab.active {
  background: rgba(0, 0, 0, 0.06);
  color: #000;
}

:root:not(.dark) .screenshot-wrapper {
  border-color: rgba(0, 0, 0, 0.1);
  box-shadow:
    0 20px 60px -15px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(0, 0, 0, 0.03);
}

@media (max-width: 768px) {
  .tab {
    padding: 6px 14px;
    font-size: 12px;
  }

  .showcase {
    padding: 0 16px;
  }
}
</style>

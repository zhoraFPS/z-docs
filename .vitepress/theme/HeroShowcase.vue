<script setup>
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => { isVisible.value = true }, 100)
})
</script>

<template>
  <div class="hero-showcase" :class="{ visible: isVisible }">
    <div class="showcase-container">
      <!-- Main large screenshot -->
      <div class="screenshot-main">
        <div class="browser-frame">
          <div class="browser-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <img :src="withBase('/screenshots/dashboard.png')" alt="Z-Core Dashboard Overview" loading="lazy" />
        </div>
      </div>

      <!-- Floating side panels -->
      <div class="screenshot-float float-right">
        <div class="browser-frame">
          <div class="browser-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <img :src="withBase('/screenshots/players.png')" alt="Player Management" loading="lazy" />
        </div>
      </div>

      <div class="screenshot-float float-left">
        <div class="browser-frame">
          <div class="browser-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <img :src="withBase('/screenshots/settings.png')" alt="System Settings" loading="lazy" />
        </div>
      </div>
    </div>

    <!-- Gradient fade at bottom -->
    <div class="showcase-fade"></div>
  </div>
</template>

<style scoped>
.hero-showcase {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 3rem auto 0;
  perspective: 1800px;
  padding: 0 1.5rem;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.hero-showcase.visible {
  opacity: 1;
  transform: translateY(0);
}

.showcase-container {
  position: relative;
  width: 100%;
  min-height: 500px;
}

/* Browser frame wrapper */
.browser-frame {
  border-radius: 12px;
  overflow: hidden;
  background: #0d0d0f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 25px 80px -12px rgba(0, 0, 0, 0.6),
    0 0 40px rgba(100, 120, 255, 0.04);
}

.browser-dots {
  display: flex;
  gap: 6px;
  padding: 10px 14px;
  background: #0a0a0c;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }

.browser-frame img {
  width: 100%;
  height: auto;
  display: block;
}

/* Main screenshot — centered, slightly tilted */
.screenshot-main {
  position: relative;
  z-index: 3;
  width: 85%;
  margin: 0 auto;
  transform: rotateX(4deg) rotateY(0deg);
  transition: transform 0.6s ease;
}

.screenshot-main:hover {
  transform: rotateX(2deg) rotateY(0deg) scale(1.01);
}

/* Floating side panels */
.screenshot-float {
  position: absolute;
  width: 55%;
  z-index: 2;
  transition: transform 0.6s ease, opacity 0.6s ease;
}

.screenshot-float:hover {
  z-index: 5;
  transform: rotateX(2deg) rotateY(0deg) scale(1.03) !important;
}

.float-right {
  top: 12%;
  right: -5%;
  transform: rotateX(4deg) rotateY(-6deg) scale(0.88);
  opacity: 0.85;
}

.float-left {
  top: 25%;
  left: -5%;
  transform: rotateX(4deg) rotateY(6deg) scale(0.82);
  opacity: 0.7;
}

/* Bottom gradient fade */
.showcase-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to top, var(--vp-c-bg), transparent);
  z-index: 10;
  pointer-events: none;
}

/* Responsive */
@media (max-width: 768px) {
  .showcase-container {
    min-height: 300px;
  }

  .screenshot-main {
    width: 95%;
    transform: rotateX(2deg);
  }

  .screenshot-float {
    display: none;
  }

  .hero-showcase {
    margin-top: 2rem;
  }
}
</style>

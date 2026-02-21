<!-- .vitepress/theme/CTABlock.vue -->
<template>
  <div class="cta-outer">
    <div class="cta-glow" aria-hidden="true"></div>
    <div class="cta-inner">
      <h2 class="cta-headline">Ready to set up your server?</h2>
      <p class="cta-sub">Everything you need is in the docs.</p>
      <div class="cta-actions">
        <a href="/core/introduction" class="cta-btn cta-btn--brand">
          Browse Documentation
        </a>
        <a href="https://github.com/zhoraFPS" class="cta-btn cta-btn--alt" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cta-outer {
  position: relative;
  padding: 120px 24px;
  text-align: center;
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.cta-inner {
  position: relative;
  z-index: 1;
  max-width: 560px;
  margin: 0 auto;
}

.cta-headline {
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 800;
  letter-spacing: -0.035em;
  margin: 0 0 16px;
  color: #fff;
}

.cta-sub {
  font-size: 17px;
  color: #a1a1aa;
  margin: 0 0 40px;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  border-radius: 100px;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 32px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.cta-btn--brand {
  background: linear-gradient(180deg, #818cf8 0%, #6366f1 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  color: #fff;
}

.cta-btn--brand:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.cta-btn--alt {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
}

.cta-btn--alt:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}
</style>

<style>
:root:not(.dark) .cta-headline { color: #111; }
:root:not(.dark) .cta-btn--alt {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.6);
}
:root:not(.dark) .cta-btn--alt:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.85);
}
</style>

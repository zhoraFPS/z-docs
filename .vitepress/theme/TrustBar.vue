<!-- .vitepress/theme/TrustBar.vue -->
<template>
  <div class="tb-wrapper">
    <p class="tb-label">Works with your existing framework</p>
    <div class="tb-badges">
      <span class="tb-badge">ESX</span>
      <span class="tb-sep">·</span>
      <span class="tb-badge">QBCore</span>
      <span class="tb-sep">·</span>
      <span class="tb-badge">ox_core</span>
      <span class="tb-sep">·</span>
      <span class="tb-badge">Standalone</span>
    </div>
  </div>
</template>

<style scoped>
.tb-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tb-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.3);
  margin: 0 0 16px;
  letter-spacing: 0.02em;
}

.tb-badges {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.tb-badge {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
  cursor: default;
}

.tb-badge:hover { color: rgba(255, 255, 255, 0.9); }

.tb-sep {
  color: rgba(255, 255, 255, 0.15);
  font-size: 18px;
  line-height: 1;
}

/* Light mode */
:global(:root:not(.dark)) .tb-label { color: rgba(0, 0, 0, 0.35); }
:global(:root:not(.dark)) .tb-badge { color: rgba(0, 0, 0, 0.4); }
:global(:root:not(.dark)) .tb-badge:hover { color: rgba(0, 0, 0, 0.85); }
:global(:root:not(.dark)) .tb-sep { color: rgba(0, 0, 0, 0.15); }
</style>

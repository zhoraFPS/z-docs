<!-- .vitepress/theme/SpotlightSection.vue -->
<script setup>
defineProps({
  badge:   { type: String, required: true },
  headline:{ type: String, required: true },
  body:    { type: String, required: true },
  bullets: { type: Array,  default: () => [] },
  ctaText: { type: String, default: 'Read the Docs' },
  ctaLink: { type: String, required: true },
  reverse: { type: Boolean, default: false },
})
</script>

<template>
  <section :class="['sl-section', { 'sl-section--reverse': reverse }]">
    <div class="sl-text">
      <span class="sl-badge">{{ badge }}</span>
      <h2 class="sl-headline">{{ headline }}</h2>
      <p class="sl-body">{{ body }}</p>
      <ul v-if="bullets.length" class="sl-bullets">
        <li v-for="bullet in bullets" :key="bullet" class="sl-bullet">
          <svg class="sl-check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="7.5" stroke="rgba(99,102,241,0.3)"/>
            <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#6366f1" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ bullet }}
        </li>
      </ul>
      <a :href="ctaLink" class="sl-cta">{{ ctaText }} →</a>
    </div>
    <div class="sl-visual">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.sl-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 96px 24px;
}

.sl-section--reverse { direction: rtl; }
.sl-section--reverse > * { direction: ltr; }

.sl-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6366f1;
  margin-bottom: 20px;
}

.sl-headline {
  font-size: clamp(28px, 3.5vw, 42px);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.15;
  margin: 0 0 20px;
  color: #fff;
}

.sl-body {
  font-size: 17px;
  line-height: 1.7;
  color: #a1a1aa;
  margin: 0 0 28px;
}

.sl-bullets {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sl-bullet {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: #d4d4d8;
  line-height: 1.4;
}

.sl-check {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.sl-cta {
  display: inline-flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: #6366f1;
  text-decoration: none;
  transition: color 0.2s ease;
  gap: 4px;
}

.sl-cta:hover {
  color: #818cf8;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 768px) {
  .sl-section {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 64px 24px;
  }
  .sl-section--reverse { direction: ltr; }
}
</style>

<style>
:root:not(.dark) .sl-headline { color: #111; }
</style>

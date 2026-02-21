<!-- .vitepress/theme/CodeWidget.vue -->
<script setup>
defineProps({
  tilt:    { type: String, default: 'none' },
  variant: { type: String, default: 'player' },
})
</script>

<template>
  <div :class="['cw-wrapper', `cw-tilt-${tilt}`]">
  <div class="cw-glow" aria-hidden="true"></div>
  <div class="cw-card">
    <div class="cw-bar">
      <span class="cw-filename">{{ variant === 'api' ? 'server.ts' : 'exports.ts' }}</span>
      <span class="cw-lang">TS</span>
    </div>

    <!-- Variant: player — GetPlayer + unified ZPlayer object -->
    <pre v-if="variant === 'player'" class="cw-pre" aria-label="Z-Core GetPlayer example"><code><span class="cw-c">// Auto-detects ESX, QBCore, ox_core or Standalone</span>
<span class="cw-k">const</span> <span class="cw-v">player</span> <span class="cw-op">=</span> <span class="cw-v">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">].</span><span class="cw-fn">GetPlayer</span><span class="cw-p">(</span><span class="cw-v">source</span><span class="cw-p">)</span>

<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">name</span>        <span class="cw-c">// "John_Doe"</span>
<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">identifier</span>  <span class="cw-c">// "steam:110000112345678"</span>
<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">job</span>         <span class="cw-c">// &#123; name: "police", grade: 2, label: "Officer" &#125;</span>
<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">money</span>       <span class="cw-c">// &#123; cash: 5000, bank: 20000 &#125;</span>

<span class="cw-c">// Identical result on every framework</span>
<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-fn">notify</span><span class="cw-p">(</span><span class="cw-s">'Welcome back!'</span><span class="cw-p">,</span> <span class="cw-s">'success'</span><span class="cw-p">)</span>
<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-fn">addMoney</span><span class="cw-p">(</span><span class="cw-s">'bank'</span><span class="cw-p">,</span> <span class="cw-v">500</span><span class="cw-p">)</span></code></pre>

    <!-- Variant: api — modular exports for inventory / moderation / permissions -->
    <pre v-else class="cw-pre" aria-label="Z-Core modular API example"><code><span class="cw-c">// Inventory</span>
<span class="cw-v">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">].</span><span class="cw-fn">AddItem</span><span class="cw-p">(</span><span class="cw-v">source</span><span class="cw-p">,</span> <span class="cw-s">'bread'</span><span class="cw-p">,</span> <span class="cw-v">3</span><span class="cw-p">)</span>
<span class="cw-v">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">].</span><span class="cw-fn">RemoveItem</span><span class="cw-p">(</span><span class="cw-v">source</span><span class="cw-p">,</span> <span class="cw-s">'lockpick'</span><span class="cw-p">,</span> <span class="cw-v">1</span><span class="cw-p">)</span>
<span class="cw-v">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">].</span><span class="cw-fn">GetItemCount</span><span class="cw-p">(</span><span class="cw-v">source</span><span class="cw-p">,</span> <span class="cw-s">'phone'</span><span class="cw-p">)</span>   <span class="cw-c">// → 1</span>

<span class="cw-c">// Moderation</span>
<span class="cw-v">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">].</span><span class="cw-fn">WarnPlayer</span><span class="cw-p">(</span><span class="cw-s">'Admin'</span><span class="cw-p">,</span> <span class="cw-v">source</span><span class="cw-p">,</span> <span class="cw-s">'cheating'</span><span class="cw-p">)</span>
<span class="cw-v">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">].</span><span class="cw-fn">BanPlayer</span><span class="cw-p">(</span><span class="cw-s">'Admin'</span><span class="cw-p">,</span> <span class="cw-v">source</span><span class="cw-p">,</span> <span class="cw-s">'hacking'</span><span class="cw-p">,</span> <span class="cw-v">0</span><span class="cw-p">)</span>

<span class="cw-c">// Permissions</span>
<span class="cw-v">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">].</span><span class="cw-fn">HasPermission</span><span class="cw-p">(</span><span class="cw-v">source</span><span class="cw-p">,</span> <span class="cw-s">'ban.players'</span><span class="cw-p">)</span>  <span class="cw-c">// → true</span>
<span class="cw-v">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">].</span><span class="cw-fn">GetRole</span><span class="cw-p">(</span><span class="cw-v">source</span><span class="cw-p">)</span>                       <span class="cw-c">// → "superadmin"</span></code></pre>

  </div>
  </div>
</template>

<style scoped>
.cw-wrapper {
  position: relative;
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.cw-tilt-right { transform: perspective(650px) rotateY(-13deg) rotateX(4deg); }
.cw-tilt-left  { transform: perspective(650px) rotateY(13deg)  rotateX(4deg); }

.cw-wrapper:hover {
  transform: perspective(650px) rotateY(0deg) rotateX(0deg) scale(1.02) !important;
}

.cw-glow {
  position: absolute;
  bottom: -70px;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 200px;
  background: radial-gradient(ellipse, rgba(99, 102, 241, 0.22) 0%, transparent 70%);
  filter: blur(55px);
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.5s ease;
}

.cw-wrapper:hover .cw-glow {
  opacity: 0.6;
}

.cw-card {
  position: relative;
  z-index: 1;
  background: #0d0d10;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.65s ease;
}

.cw-tilt-right .cw-card {
  box-shadow:
    14px 28px 70px rgba(0, 0, 0, 0.7),
    0 0 50px rgba(99, 102, 241, 0.1);
}

.cw-tilt-left .cw-card {
  box-shadow:
    -14px 28px 70px rgba(0, 0, 0, 0.7),
    0 0 50px rgba(99, 102, 241, 0.1);
}

.cw-wrapper:hover .cw-card {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 0 60px rgba(99, 102, 241, 0.18),
    0 28px 60px rgba(0, 0, 0, 0.5);
}

.cw-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #111114;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.cw-filename {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Menlo', 'Consolas', monospace;
}

.cw-lang {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 4px;
  padding: 2px 7px;
}

.cw-pre {
  margin: 0;
  padding: 24px;
  font-size: 13.5px;
  line-height: 1.75;
  font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
  overflow-x: auto;
  background: transparent;
}

/* Syntax token colors */
.cw-k    { color: #818cf8; }
.cw-v    { color: #e2e8f0; }
.cw-fn   { color: #a5b4fc; }
.cw-prop { color: #c4b5fd; }
.cw-s    { color: #86efac; }
.cw-c    { color: #4b5563; }
.cw-op   { color: #94a3b8; }
.cw-p    { color: #64748b; }
</style>

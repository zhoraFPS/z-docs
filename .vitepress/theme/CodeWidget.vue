<!-- .vitepress/theme/CodeWidget.vue -->
<template>
  <div class="cw-card">
    <div class="cw-bar">
      <span class="cw-filename">exports.ts</span>
      <span class="cw-lang">TS</span>
    </div>
    <pre class="cw-pre" aria-label="Z-Core API usage example in TypeScript"><code><span class="cw-k">const</span> <span class="cw-v">player</span> <span class="cw-op">=</span> <span class="cw-v">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">]</span>
  <span class="cw-p">.</span><span class="cw-fn">GetPlayer</span><span class="cw-p">(</span><span class="cw-v">source</span><span class="cw-p">)</span>

<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">name</span>   <span class="cw-c">// "John_Doe"</span>
<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">job</span>    <span class="cw-c">// &#123; name: "police", grade: 2 &#125;</span>
<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">money</span>  <span class="cw-c">// &#123; cash: 5000, bank: 200 &#125;</span>
<span class="cw-v">player</span><span class="cw-p">.</span><span class="cw-prop">coords</span> <span class="cw-c">// &#123; x: 123.4, y: -456.7, z: 28.1 &#125;</span>

<span class="cw-c">// Works identically on ESX, QBCore, ox_core</span>
<span class="cw-k">const</span> <span class="cw-v">framework</span> <span class="cw-op">=</span> <span class="cw-v">exports</span><span class="cw-p">[</span><span class="cw-s">'z-core'</span><span class="cw-p">]</span>
  <span class="cw-p">.</span><span class="cw-fn">GetFramework</span><span class="cw-p">()</span> <span class="cw-c">// "esx" | "qb" | "ox" | "standalone"</span></code></pre>
  </div>
</template>

<style scoped>
.cw-card {
  background: #0d0d10;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
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

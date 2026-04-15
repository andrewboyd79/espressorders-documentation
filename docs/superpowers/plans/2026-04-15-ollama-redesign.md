# Ollama-Inspired Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full reconstruction of all 6 site pages from a dark Charcoal/Emerald/Blue theme to the Ollama-inspired grayscale design system defined in `DESIGN.md`.

**Architecture:** Single CSS file rewrite (`css/style.css`) provides the complete new design system. Each HTML file is reconstructed with updated structure — nav GitHub CTA, hero section, chapter tab strip, sidebar, ADR component, and prev/next bottom nav. `js/timeline.js` receives targeted updates to remove per-stage colour and use CSS classes instead.

**Tech Stack:** Vanilla HTML, CSS custom properties, vanilla JavaScript. No build tools. Verify with a local HTTP server (`python3 -m http.server 8080` from repo root).

**Spec:** `docs/superpowers/specs/2026-04-15-ollama-redesign-design.md`

---

## Task 1: Rewrite `css/style.css`

**Files:**
- Modify: `css/style.css` (full rewrite)

- [ ] **Step 1: Start a local server for visual verification throughout**

```bash
cd /path/to/espressorders-documentation
python3 -m http.server 8080
```

Open http://localhost:8080 in a browser. Leave it running for all tasks.

- [ ] **Step 2: Replace `css/style.css` with the complete new stylesheet**

```css
/* === CSS Custom Properties === */
:root {
  --color-black: #000000;
  --color-near-black: #262626;
  --color-mid-dark: #404040;
  --color-mid: #525252;
  --color-stone: #737373;
  --color-silver: #a3a3a3;
  --color-light-gray: #e5e5e5;
  --color-snow: #fafafa;
  --color-white: #ffffff;
  --radius-container: 12px;
  --radius-pill: 9999px;
}

/* === Reset & Base === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
  color: var(--color-black);
  background: var(--color-white);
  line-height: 1.5;
}
a { color: inherit; text-decoration: none; }

/* === Layout === */
.container { max-width: 1024px; margin: 0 auto; padding: 0 48px; }

/* === Eyebrow label === */
.eyebrow {
  display: block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-silver);
  margin-bottom: 16px;
}

/* === Buttons === */
.btn-black, .btn-gray, .btn-ghost {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 24px;
  border-radius: var(--radius-pill);
  line-height: 1;
  text-decoration: none;
}
.btn-black { background: var(--color-black); color: var(--color-white); }
.btn-black:hover { background: var(--color-near-black); }
.btn-gray { background: var(--color-light-gray); color: var(--color-near-black); border: 1px solid var(--color-light-gray); }
.btn-ghost { background: var(--color-white); color: var(--color-near-black); border: 1px solid var(--color-light-gray); }
.btn-sm { font-size: 13px; padding: 8px 18px; }

/* === Tags === */
.tag {
  display: inline-block;
  background: var(--color-light-gray);
  color: var(--color-near-black);
  font-size: 11px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
}
.tech-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }

/* === Callout === */
.callout {
  background: var(--color-snow);
  border-left: 3px solid var(--color-light-gray);
  border-radius: 0 var(--radius-container) var(--radius-container) 0;
  padding: 16px 20px;
  margin: 24px 0;
}
.callout p { font-size: 15px; font-style: italic; color: var(--color-mid); margin: 0; }

/* === Nav === */
.site-nav { background: var(--color-white); border-bottom: 1px solid var(--color-light-gray); padding: 16px 0; }
.site-nav .container { display: flex; align-items: center; gap: 32px; }
.site-nav .logo { font-size: 16px; font-weight: 600; color: var(--color-black); margin-right: auto; }
.site-nav .nav-link { font-size: 14px; color: var(--color-stone); }
.site-nav .nav-link:hover { color: var(--color-black); }
.nav-cta { font-size: 13px; padding: 8px 18px; }

/* === Footer === */
.site-footer { background: var(--color-white); border-top: 1px solid var(--color-light-gray); padding: 32px 0; }
.site-footer p { font-size: 13px; color: var(--color-silver); text-align: center; }
.site-footer a { color: var(--color-stone); }
.site-footer a:hover { color: var(--color-black); }


/* ==========================================
   HOMEPAGE
   ========================================== */

.hero { padding: 96px 0 80px; border-bottom: 1px solid var(--color-light-gray); }
.hero h1 {
  font-family: 'SF Pro Rounded', system-ui, -apple-system, sans-serif;
  font-size: 48px; font-weight: 500; line-height: 1.0;
  color: var(--color-black); letter-spacing: -0.5px;
  margin: 16px 0 24px; max-width: 680px;
}
.hero p { font-size: 18px; color: var(--color-stone); line-height: 1.56; max-width: 580px; margin-bottom: 36px; }
.hero-actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }

.section { padding: 72px 0; border-bottom: 1px solid var(--color-light-gray); }
.section:last-child { border-bottom: none; }
.section h2 {
  font-family: 'SF Pro Rounded', system-ui, -apple-system, sans-serif;
  font-size: 30px; font-weight: 500; line-height: 1.2; color: var(--color-black); margin-bottom: 12px;
}
.section > p { font-size: 16px; color: var(--color-stone); line-height: 1.6; max-width: 640px; margin-bottom: 16px; }

/* Timeline */
.timeline-section { padding: 72px 0; border-bottom: 1px solid var(--color-light-gray); }
.timeline-track {
  position: relative; display: flex; justify-content: space-between;
  align-items: flex-start; margin: 32px 0 28px;
}
.timeline-track::before {
  content: ''; position: absolute; top: 22px; left: 44px; right: 44px;
  height: 1px; background: var(--color-light-gray); z-index: 0;
}
.stage-node { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; position: relative; z-index: 1; cursor: pointer; }
.stage-dot {
  width: 44px; height: 44px; border-radius: var(--radius-pill);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-white); font-size: 14px; font-weight: 500;
  transition: transform 0.15s ease;
}
.dot-1 { background: var(--color-silver); }
.dot-2 { background: var(--color-stone); }
.dot-3 { background: var(--color-mid-dark); }
.dot-4 { background: var(--color-black); }
.stage-node:hover .stage-dot { transform: scale(1.1); }
.stage-node.active .stage-dot { outline: 3px solid var(--color-black); outline-offset: 3px; }
.stage-label { font-size: 13px; color: var(--color-stone); text-align: center; }
.stage-node.active .stage-label { color: var(--color-near-black); font-weight: 500; }
.stage-chapter { font-size: 11px; color: var(--color-silver); text-align: center; }
.timeline-hint { font-size: 12px; color: var(--color-silver); text-align: center; margin-top: 20px; }

.stage-card { display: none; border: 1px solid var(--color-light-gray); border-radius: var(--radius-container); padding: 24px; margin-top: 4px; animation: fadeIn 0.2s ease; }
.stage-card.visible { display: block; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
.stage-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; }
.stage-card h3 { font-size: 20px; font-weight: 500; color: var(--color-black); }
.chapter-badge { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-silver); padding-top: 4px; }
.stage-card .tagline { font-size: 15px; font-style: italic; color: var(--color-stone); margin-bottom: 12px; }
.stage-card .summary { font-size: 14px; color: var(--color-mid); line-height: 1.6; margin-bottom: 16px; }
.card-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; }

/* Decision cards */
.cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 28px; }
.decision-card { background: var(--color-snow); border: 1px solid var(--color-light-gray); border-radius: var(--radius-container); padding: 20px; }
.decision-card .card-eyebrow { display: block; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-silver); margin-bottom: 8px; }
.decision-card h4 { font-size: 15px; font-weight: 500; color: var(--color-black); margin-bottom: 6px; }
.decision-card p { font-size: 13px; color: var(--color-stone); line-height: 1.5; margin: 0; }

/* Platform band */
.platform-band { background: var(--color-snow); border-top: 1px solid var(--color-light-gray); padding: 72px 0; }
.platform-band h2 { font-family: 'SF Pro Rounded', system-ui, -apple-system, sans-serif; font-size: 28px; font-weight: 500; color: var(--color-black); margin-bottom: 12px; }
.platform-band p { font-size: 16px; color: var(--color-stone); line-height: 1.6; max-width: 600px; margin-bottom: 24px; }


/* ==========================================
   CHAPTER PAGES
   ========================================== */

/* Chapter tab strip */
.chapter-nav { background: var(--color-white); border-bottom: 1px solid var(--color-light-gray); position: sticky; top: 0; z-index: 10; }
.chapter-nav .container { display: flex; align-items: center; overflow-x: auto; scrollbar-width: none; padding: 0 32px; }
.chapter-nav .container::-webkit-scrollbar { display: none; }
.chapter-tab { display: flex; align-items: center; gap: 8px; padding: 14px 16px; font-size: 13px; color: var(--color-stone); border-bottom: 2px solid transparent; white-space: nowrap; cursor: pointer; flex-shrink: 0; text-decoration: none; }
.chapter-tab:hover { color: var(--color-black); }
.chapter-tab.active { color: var(--color-black); font-weight: 500; border-bottom-color: var(--color-black); }
.mini-dot { width: 16px; height: 16px; border-radius: var(--radius-pill); display: inline-flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 600; color: var(--color-white); flex-shrink: 0; }
.mini-dot-1 { background: var(--color-silver); }
.mini-dot-2 { background: var(--color-stone); }
.mini-dot-3 { background: var(--color-mid-dark); }
.mini-dot-4 { background: var(--color-black); }
.mini-dot-infra { background: var(--color-near-black); border-radius: 4px; }
.chapter-tab-spacer { margin-left: auto; }

/* Page layout */
.page-layout { display: grid; grid-template-columns: 220px 1fr; max-width: 1024px; margin: 0 auto; }

/* Sidebar */
.sidebar { background: var(--color-snow); border-right: 1px solid var(--color-light-gray); padding: 32px 24px; position: sticky; top: 53px; align-self: start; max-height: calc(100vh - 53px); overflow-y: auto; }
.sidebar-label { display: block; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-silver); margin-bottom: 16px; }
.sidebar-link { display: block; font-size: 13px; color: var(--color-stone); padding: 6px 0 6px 12px; margin-left: -12px; border-left: 2px solid transparent; text-decoration: none; line-height: 1.4; }
.sidebar-link:hover { color: var(--color-near-black); }
.sidebar-link.active { color: var(--color-black); font-weight: 500; border-left-color: var(--color-black); }

/* Content area */
.content { padding: 48px 56px; min-width: 0; }

/* Chapter header */
.chapter-header { margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid var(--color-light-gray); }
.chapter-header h1 { font-family: 'SF Pro Rounded', system-ui, -apple-system, sans-serif; font-size: 36px; font-weight: 500; line-height: 1.1; color: var(--color-black); margin-bottom: 12px; }
.chapter-header p { font-size: 16px; color: var(--color-stone); line-height: 1.6; max-width: 540px; }

/* Content body */
.content-body h3 { font-size: 18px; font-weight: 500; color: var(--color-black); margin: 36px 0 10px; }
.content-body h3:first-child { margin-top: 0; }
.content-body p { font-size: 15px; color: var(--color-mid); line-height: 1.7; margin-bottom: 16px; max-width: 600px; }
.content-body ul { padding-left: 20px; margin-bottom: 16px; }
.content-body ul li { font-size: 15px; color: var(--color-mid); line-height: 1.7; margin-bottom: 4px; }
.content-body a { color: var(--color-stone); text-decoration: underline; text-underline-offset: 2px; }
.content-body a:hover { color: var(--color-black); }
.content-body code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; background: var(--color-snow); border: 1px solid var(--color-light-gray); border-radius: 4px; padding: 1px 5px; color: var(--color-near-black); }

/* Diagrams */
.diagram { background: var(--color-snow); border: 1px solid var(--color-light-gray); border-radius: var(--radius-container); padding: 24px; margin: 24px 0; overflow-x: auto; }
.diagram-row { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
.diagram-row:last-child { margin-bottom: 0; }
.diagram-box { background: var(--color-white); border: 1px solid var(--color-light-gray); border-radius: 8px; padding: 8px 14px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; font-weight: 500; text-align: center; min-width: 80px; color: var(--color-near-black); }
.diagram-box.strong { border-color: var(--color-silver); }
.diagram-box.primary { border-color: var(--color-black); color: var(--color-black); }
.diagram-arrow { color: var(--color-silver); font-size: 13px; flex-shrink: 0; white-space: nowrap; }

/* ADR component */
.adr { border: 1px solid var(--color-light-gray); border-radius: var(--radius-container); overflow: hidden; margin: 36px 0; }
.adr-header { background: var(--color-snow); border-bottom: 1px solid var(--color-light-gray); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; }
.adr-title { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-silver); }
.adr-badge { background: var(--color-light-gray); color: var(--color-near-black); font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: var(--radius-pill); }
.adr-body { padding: 20px; }
.adr-body h4 { font-size: 16px; font-weight: 500; color: var(--color-black); margin-bottom: 16px; }
.adr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.adr-section-label { display: block; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-silver); margin-bottom: 6px; }
.adr-section p { font-size: 13px; color: var(--color-mid); line-height: 1.6; margin: 0; }

/* Bottom chapter nav */
.chapter-nav-bottom { max-width: 1024px; margin: 0 auto; padding: 32px 56px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-light-gray); }


/* ==========================================
   RESPONSIVE
   ========================================== */

@media (max-width: 1024px) {
  .container { padding: 0 32px; }
  .content { padding: 40px 40px; }
  .chapter-nav-bottom { padding: 28px 40px; }
}

@media (max-width: 768px) {
  .page-layout { grid-template-columns: 1fr; max-width: 100%; }
  .sidebar { position: static; height: auto; max-height: none; border-right: none; border-bottom: 1px solid var(--color-light-gray); top: 0; }
  .cards-grid { grid-template-columns: 1fr; }
  .hero h1 { font-size: 36px; }
  .container { padding: 0 24px; }
  .hero { padding: 64px 0 56px; }
  .content { padding: 32px 24px; }
  .chapter-nav-bottom { padding: 24px; flex-direction: column; gap: 10px; align-items: flex-start; }
  .adr-grid { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .hero h1 { font-size: 30px; }
  .site-nav .nav-link { display: none; }
  .chapter-tab { padding: 12px 10px; font-size: 12px; }
}
```

- [ ] **Step 3: Verify base styles**

Reload http://localhost:8080. The page will look broken (wrong HTML classes still in place) but the background should be white, and `body` text should be black. No dark charcoal background should be visible.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "style: replace dark theme with Ollama grayscale design system"
```

---

## Task 2: Update `js/timeline.js`

**Files:**
- Modify: `js/timeline.js`

- [ ] **Step 1: Update the `buildTimeline` function — change eyebrow class and add index to forEach**

Replace lines 58–92 (the `buildTimeline` function body) with:

```js
function buildTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;

  const label = document.createElement('div');
  label.className = 'eyebrow';
  label.textContent = 'Engineering Journey';
  container.appendChild(label);

  const track = document.createElement('div');
  track.className = 'timeline-track';

  STAGES.forEach((stage, index) => {
    const node = document.createElement('div');
    node.className = 'stage-node';
    node.dataset.id = stage.id;
    node.setAttribute('role', 'button');
    node.setAttribute('aria-label', `View ${stage.label} details`);

    const dot = document.createElement('div');
    dot.className = `stage-dot dot-${index + 1}`;
    dot.textContent = stage.number;

    const lbl = document.createElement('div');
    lbl.className = 'stage-label';
    lbl.textContent = stage.label;

    const ch = document.createElement('div');
    ch.className = 'stage-chapter';
    ch.textContent = stage.chapter;

    node.appendChild(dot);
    node.appendChild(lbl);
    node.appendChild(ch);

    node.addEventListener('click', () => toggleStage(stage.id));
    track.appendChild(node);
  });

  container.appendChild(track);

  const cardContainer = document.createElement('div');
  cardContainer.id = 'stage-card-container';
  container.appendChild(cardContainer);

  const hint = document.createElement('p');
  hint.className = 'timeline-hint';
  hint.textContent = 'Click any stage to explore';
  container.appendChild(hint);

  toggleStage(STAGES[0].id);
}
```

- [ ] **Step 2: Update the `toggleStage` function — remove colour inline styles, use pill button classes**

Replace the entire `toggleStage` function with:

```js
function toggleStage(id) {
  const stage = STAGES.find(s => s.id === id);
  const container = document.getElementById('stage-card-container');
  const nodes = document.querySelectorAll('.stage-node');

  if (activeStage === id) {
    activeStage = null;
    container.innerHTML = '';
    nodes.forEach(n => n.classList.remove('active'));
    return;
  }

  activeStage = id;
  nodes.forEach(n => {
    n.classList.toggle('active', n.dataset.id === id);
  });

  container.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'stage-card visible';

  const tags = stage.tech.map(t => `<span class="tag">${t}</span>`).join('');

  const adrBtn = stage.adrLink
    ? `<a href="${stage.adrLink}" class="btn-gray btn-sm">Decision record →</a>`
    : '';

  card.innerHTML = `
    <div class="stage-card-header">
      <h3>${stage.label}</h3>
      <span class="chapter-badge">${stage.chapter}</span>
    </div>
    <p class="tagline">${stage.tagline}</p>
    <p class="summary">${stage.summary}</p>
    <div class="tech-tags">${tags}</div>
    <div class="card-actions">
      <a href="${stage.docLink}" class="btn-black btn-sm">Read chapter →</a>
      ${adrBtn}
    </div>
  `;

  container.appendChild(card);
}
```

- [ ] **Step 3: Verify timeline renders correctly**

Reload http://localhost:8080. The timeline section (still has old HTML classes) won't be positioned correctly yet, but the timeline card should appear with:
- Black text heading (no coloured `style="color:..."`)
- Gray pill tags
- Black pill "Read chapter →" button
- No border colour on the card

- [ ] **Step 4: Commit**

```bash
git add js/timeline.js
git commit -m "feat: update timeline to use CSS classes instead of per-stage colour"
```

---

## Task 3: Rewrite `index.html`

**Files:**
- Modify: `index.html` (full rewrite)

- [ ] **Step 1: Replace `index.html` with the complete new markup**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Andrew Boyd — Platform Engineering Leader</title>
  <meta name="description" content="Platform engineering leader specialising in resilient, scalable infrastructure systems through cloud-native architectures, DevOps practices, and automated deployment pipelines.">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav class="site-nav">
    <div class="container">
      <a href="index.html" class="logo">Andrew Boyd</a>
      <a href="index.html" class="nav-link">Overview</a>
      <a href="docs/infrastructure-automation.html" class="nav-link">Infrastructure &amp; Automation</a>
      <a href="https://github.com/andrewboyd79" class="btn-black nav-cta" target="_blank" rel="noopener">GitHub →</a>
    </div>
  </nav>

  <div class="hero">
    <div class="container">
      <span class="eyebrow">Platform Engineering Leadership</span>
      <h1>Building systems that enable teams to move fast.</h1>
      <p>Cloud-native architectures, DevOps automation, and internal developer platforms — documented through a real project, from monolith to mobile.</p>
      <div class="hero-actions">
        <a href="#timeline" class="btn-black">Explore the journey →</a>
        <a href="docs/infrastructure-automation.html" class="btn-gray">Platform approach</a>
      </div>
    </div>
  </div>

  <div class="container">

    <div class="section">
      <span class="eyebrow">Expertise</span>
      <h2>Platform engineering, cloud-native architecture, and DevOps automation.</h2>
      <p>Focused on creating reliable infrastructure that removes bottlenecks and enables teams to deliver value consistently.</p>
      <p>Deep expertise in translating business requirements into technical architectures that balance innovation with operational excellence, reliability, and scalability.</p>
      <div class="callout">
        <p>"Infrastructure should be an enabler, not a constraint — designed to disappear so teams can focus on building great products."</p>
      </div>
    </div>

    <div id="timeline" class="timeline-section"></div>

    <div class="section">
      <span class="eyebrow">Architectural Approach</span>
      <h2>Platform-first thinking.</h2>
      <p>Every decision made with platform sustainability in mind — considering long-term operability, team cognitive load, and system evolvability.</p>
      <div class="cards-grid">
        <div class="decision-card">
          <span class="card-eyebrow">Platform Strategy</span>
          <h4>Internal Developer Platforms</h4>
          <p>Building paved paths that abstract infrastructure complexity while maintaining flexibility for advanced use cases.</p>
        </div>
        <div class="decision-card">
          <span class="card-eyebrow">Reliability Engineering</span>
          <h4>Observability-Driven Design</h4>
          <p>Instrumenting systems for deep visibility into performance, errors, and business impact from the outset.</p>
        </div>
        <div class="decision-card">
          <span class="card-eyebrow">Automation Focus</span>
          <h4>GitOps and Infrastructure as Code</h4>
          <p>Treating infrastructure as software — version-controlled, tested, and deployed through automated pipelines.</p>
        </div>
      </div>
    </div>

  </div>

  <div class="platform-band">
    <div class="container">
      <span class="eyebrow">Platform as a Product</span>
      <h2>Infrastructure built like software.</h2>
      <p>Platforms should be treated as products — with clear APIs, documentation, SLAs, and feedback loops with their users (engineering teams). The best platforms enable self-service while providing guardrails for safety and compliance.</p>
      <a href="docs/infrastructure-automation.html" class="btn-black">Explore the platform approach →</a>
    </div>
  </div>

  <footer class="site-footer">
    <div class="container">
      <p>Andrew Boyd · Platform Engineering Leader · <a href="https://github.com/andrewboyd79">github.com/andrewboyd79</a></p>
    </div>
  </footer>

  <script src="js/timeline.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify the homepage**

Reload http://localhost:8080. Check:
- White background, black text — no dark theme anywhere
- SemiBold "Andrew Boyd" logo left; "GitHub →" black pill right
- Hero: large rounded heading, Stone descriptor, two pill buttons
- Expertise section with neutral blockquote (gray left border, no green)
- Timeline: silver→black progressive dots, outline ring on active, gray pill tags, black pill button in expanded card
- 3-column Snow-background decision cards
- Snow platform band (not dark)
- Minimal gray footer

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: reconstruct homepage with Ollama design system"
```

---

## Task 4: Reconstruct `docs/chapter-1-monolith.html`

**Files:**
- Modify: `docs/chapter-1-monolith.html` (full rewrite)

- [ ] **Step 1: Replace with complete new markup**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chapter 1: Platform Foundation — Andrew Boyd</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <nav class="site-nav">
    <div class="container">
      <a href="../index.html" class="logo">Andrew Boyd</a>
      <a href="../index.html" class="nav-link">Overview</a>
      <a href="infrastructure-automation.html" class="nav-link">Infrastructure &amp; Automation</a>
      <a href="https://github.com/andrewboyd79" class="btn-black nav-cta" target="_blank" rel="noopener">GitHub →</a>
    </div>
  </nav>

  <nav class="chapter-nav">
    <div class="container">
      <a href="chapter-1-monolith.html" class="chapter-tab active">
        <span class="mini-dot mini-dot-1">1</span> Monolith
      </a>
      <a href="chapter-2-4-decomposition.html" class="chapter-tab">
        <span class="mini-dot mini-dot-2">2</span> Decomposition
      </a>
      <a href="chapter-5-7-maturity.html" class="chapter-tab">
        <span class="mini-dot mini-dot-3">3</span> Maturity
      </a>
      <a href="chapter-9-mobile.html" class="chapter-tab">
        <span class="mini-dot mini-dot-4">4</span> Mobile
      </a>
      <a href="infrastructure-automation.html" class="chapter-tab chapter-tab-spacer">
        <span class="mini-dot mini-dot-infra">⚙</span> Infrastructure
      </a>
    </div>
  </nav>

  <div class="page-layout">

    <aside class="sidebar">
      <span class="sidebar-label">On this page</span>
      <a href="#problem" class="sidebar-link active">The problem</a>
      <a href="#what-was-built" class="sidebar-link">What was built</a>
      <a href="#constraint" class="sidebar-link">The constraint</a>
      <a href="#trade-offs" class="sidebar-link">Key trade-offs</a>
    </aside>

    <div class="content">
      <div class="chapter-header">
        <span class="eyebrow">Chapter 1 · Monolith</span>
        <h1>Establishing the Platform Foundation</h1>
        <p>How working with existing systems builds deeper engineering insight than greenfield projects.</p>
        <div class="tech-tags">
          <span class="tag">Django</span>
          <span class="tag">AWS ECS</span>
          <span class="tag">Aurora PostgreSQL</span>
          <span class="tag">Infrastructure as Code</span>
          <span class="tag">Platform Engineering</span>
        </div>
      </div>

      <div class="content-body">

        <h3 id="problem">The problem</h3>
        <p>EspressOrders began as my final project for a Diploma in Full Stack Web Development at the Code Institute — a standard Django application with a PostgreSQL database, S3 for static and media assets, and a session-based authentication system. It was functional, reasonably structured, and entirely typical of a monolithic web application.</p>
        <p>It was also not designed to be decomposed. The codebase had the normal accumulation of assumptions that any real project develops: tightly coupled views and models, session-based auth that would not translate easily to stateless microservices, and no API layer because none was needed at the time.</p>
        <p>Rather than start from a clean demo project, I chose to work with this existing codebase. That constraint was the point — real DevOps and cloud engineering work happens on imperfect codebases, not greenfield ones.</p>

        <h3 id="what-was-built">What was built in this chapter</h3>
        <p>The monolith was containerised and deployed to AWS ECS behind an Application Load Balancer, with Aurora PostgreSQL as the database and S3 for static file serving. The infrastructure was defined in CloudFormation, following the same repeatable pattern used by every subsequent service.</p>

        <div class="diagram">
          <div class="diagram-row">
            <div class="diagram-box">Browser</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-box">Route 53</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-box">ALB</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-box strong">ECS · Django</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box strong">Django</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-box">Aurora PostgreSQL</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box strong">Django</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-box">S3 (static/media)</div>
          </div>
        </div>

        <h3 id="constraint">The constraint that shaped everything</h3>
        <p>Django's session-based authentication stores session tokens in a cookie. Mobile clients and other services cannot easily consume cookie-based auth. This constraint — inherited from the original codebase — drove the later decision to build a dedicated JWT identity service rather than modify the monolith's auth system.</p>
        <p>That is what makes this chapter interesting from an engineering perspective: the monolith was not cleaned up or idealised. It was deployed as-is, and every constraint it introduced was addressed downstream through deliberate architectural decisions.</p>

        <h3 id="trade-offs">Key trade-offs</h3>
        <ul>
          <li>The monolith continued running throughout the decomposition — the Strangler Fig pattern required it</li>
          <li>Session-based auth was left in place rather than rewritten — a deliberate deferral, not an oversight</li>
          <li>No API layer was added at this stage — that came with <a href="chapter-2-4-decomposition.html">espressorders-ms in Chapter 2</a></li>
        </ul>

      </div>
    </div>

  </div>

  <div class="chapter-nav-bottom">
    <span></span>
    <a href="chapter-2-4-decomposition.html" class="btn-black">Chapter 2: Decomposition →</a>
  </div>

  <footer class="site-footer">
    <div class="container">
      <p>Andrew Boyd · Platform Engineering Leader · <a href="https://github.com/andrewboyd79">github.com/andrewboyd79</a></p>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify at http://localhost:8080/docs/chapter-1-monolith.html**

Check:
- Site nav matches homepage (logo SemiBold, nav links, GitHub pill)
- Chapter tab strip sticky at top: tab 1 "Monolith" has black underline + black text; others are Stone
- Sidebar visible left: "On this page" with 4 links, Snow background
- Chapter header: eyebrow "Chapter 1 · Monolith", large rounded heading, subtitle, gray pill tags
- Diagram: Snow background, white boxes with light gray borders — no coloured boxes
- Bottom nav: only "Chapter 2: Decomposition →" black pill (no previous)

- [ ] **Step 3: Commit**

```bash
git add docs/chapter-1-monolith.html
git commit -m "feat: reconstruct chapter 1 with chapter shell and Ollama design"
```

---

## Task 5: Reconstruct `docs/chapter-2-4-decomposition.html`

**Files:**
- Modify: `docs/chapter-2-4-decomposition.html` (full rewrite)

- [ ] **Step 1: Replace with complete new markup**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chapter 2: Decomposition — Andrew Boyd</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <nav class="site-nav">
    <div class="container">
      <a href="../index.html" class="logo">Andrew Boyd</a>
      <a href="../index.html" class="nav-link">Overview</a>
      <a href="infrastructure-automation.html" class="nav-link">Infrastructure &amp; Automation</a>
      <a href="https://github.com/andrewboyd79" class="btn-black nav-cta" target="_blank" rel="noopener">GitHub →</a>
    </div>
  </nav>

  <nav class="chapter-nav">
    <div class="container">
      <a href="chapter-1-monolith.html" class="chapter-tab">
        <span class="mini-dot mini-dot-1">1</span> Monolith
      </a>
      <a href="chapter-2-4-decomposition.html" class="chapter-tab active">
        <span class="mini-dot mini-dot-2">2</span> Decomposition
      </a>
      <a href="chapter-5-7-maturity.html" class="chapter-tab">
        <span class="mini-dot mini-dot-3">3</span> Maturity
      </a>
      <a href="chapter-9-mobile.html" class="chapter-tab">
        <span class="mini-dot mini-dot-4">4</span> Mobile
      </a>
      <a href="infrastructure-automation.html" class="chapter-tab chapter-tab-spacer">
        <span class="mini-dot mini-dot-infra">⚙</span> Infrastructure
      </a>
    </div>
  </nav>

  <div class="page-layout">

    <aside class="sidebar">
      <span class="sidebar-label">On this page</span>
      <a href="#scaling-challenge" class="sidebar-link active">The scaling challenge</a>
      <a href="#platform-strategy" class="sidebar-link">Platform strategy</a>
      <a href="#platform-services" class="sidebar-link">Platform services</a>
      <a href="#event-driven" class="sidebar-link">Event-driven reliability</a>
      <a href="#trade-offs" class="sidebar-link">Key trade-offs</a>
      <a href="#decision-record" class="sidebar-link">Decision record</a>
    </aside>

    <div class="content">
      <div class="chapter-header">
        <span class="eyebrow">Chapter 2 · Decomposition</span>
        <h1>Platform Evolution Through Strategic Decomposition</h1>
        <p>How incremental platform improvements enable scaling without disruption.</p>
        <div class="tech-tags">
          <span class="tag">FastAPI</span>
          <span class="tag">ECS</span>
          <span class="tag">DynamoDB</span>
          <span class="tag">SNS/SQS</span>
          <span class="tag">Strangler Fig</span>
          <span class="tag">Event-Driven</span>
        </div>
      </div>

      <div class="content-body">

        <h3 id="scaling-challenge">The scaling challenge</h3>
        <p>As systems grow, the tension between deployment simplicity and operational scalability becomes a critical platform engineering concern. This chapter examines how the Strangler Fig pattern enabled evolutionary platform improvement without disrupting ongoing operations — a key capability for platform teams managing live systems.</p>
        <p>The challenge wasn't technical decomposition itself, but doing so while maintaining service continuity, team velocity, and business value delivery.</p>

        <h3 id="platform-strategy">Platform strategy: Strangler Fig pattern</h3>
        <p>The Strangler Fig pattern represents a platform engineering approach to system evolution: delivering incremental value while maintaining system stability and enabling safe experimentation. Rather than viewing it as a technical tactic, it's a philosophy of platform improvement that respects existing investments while enabling future capability.</p>
        <p><code>espressorders-ms</code> served as an evolutionary platform layer — progressively enabling new capabilities while preserving existing functionality. This approach aligns with platform principles of making change safe, reversible, and value-delivering at every step.</p>

        <div class="diagram">
          <div class="diagram-row">
            <div class="diagram-box">ALB</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-box primary">espressorders-ms (facade)</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box primary">Facade</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-box">Catalogue Service</div>
            <div class="diagram-arrow">&nbsp;</div>
            <div class="diagram-box">Data Store</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box primary">Facade</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-box">Processing Service</div>
            <div class="diagram-arrow">&nbsp;</div>
            <div class="diagram-box">State Store</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box primary">Facade</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-box">Transaction Service</div>
            <div class="diagram-arrow">&nbsp;</div>
            <div class="diagram-box">Event Stream</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box">&nbsp;</div>
            <div class="diagram-arrow">&nbsp;</div>
            <div class="diagram-box">Delivery Service</div>
            <div class="diagram-arrow">&nbsp;</div>
            <div class="diagram-box">Notification Channel</div>
          </div>
        </div>

        <h3 id="platform-services">Platform services identified</h3>
        <ul>
          <li><strong>Read services</strong> — FastAPI services for catalog data, backed by scalable storage, consumed through the evolutionary facade</li>
          <li><strong>State services</strong> — FastAPI services managing session state with appropriate storage choices for access patterns and scale requirements</li>
          <li><strong>Transaction services</strong> — FastAPI services handling business processes and external integrations, emitting events for downstream processing</li>
          <li><strong>Delivery services</strong> — FastAPI services consuming event streams to perform side effects like notifications and communications</li>
        </ul>

        <h3 id="event-driven">Platform patterns: event-driven reliability</h3>
        <p>Business processes that span multiple services require reliable coordination patterns. The Saga pattern — implemented via event streaming (SNS/SQS) — provides a platform-native approach to distributed transactions that maintains loose coupling while ensuring recoverability. Each service publishes events on success; interested services consume and act asynchronously, with compensating actions triggered by failure events.</p>

        <h3 id="trade-offs">Key trade-offs</h3>
        <ul>
          <li>The monolith remained deployed throughout — operational overhead, but zero migration risk</li>
          <li>DynamoDB for cart state was chosen over Aurora for horizontal scalability and session-scoped access patterns</li>
          <li>Asynchronous notification via SNS/SQS means emails may arrive seconds after order confirmation — acceptable for this use case</li>
        </ul>

        <div id="decision-record" class="adr">
          <div class="adr-header">
            <span class="adr-title">Architectural Decision Record · ADR-002</span>
            <span class="adr-badge">Accepted</span>
          </div>
          <div class="adr-body">
            <h4>Adopt Strangler Fig pattern for incremental service extraction</h4>
            <div class="adr-grid">
              <div class="adr-section">
                <span class="adr-section-label">Context</span>
                <p>Decomposing the monolith without downtime required a migration strategy that preserved existing functionality throughout. A big-bang rewrite would have introduced unacceptable risk to a live system.</p>
              </div>
              <div class="adr-section">
                <span class="adr-section-label">Decision</span>
                <p>Extract services one at a time behind the ALB. Route traffic progressively to new FastAPI services. Deprecate monolith routes only after each new service is stable in production.</p>
              </div>
            </div>
            <div class="adr-grid" style="margin-top: 16px;">
              <div class="adr-section" style="grid-column: 1 / -1;">
                <span class="adr-section-label">Consequences</span>
                <p>Zero-downtime migration achieved. Monolith remained deployed throughout, adding operational overhead. Each extraction provided a clear rollback point if the new service encountered issues.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>

  <div class="chapter-nav-bottom">
    <a href="chapter-1-monolith.html" class="btn-ghost">← Chapter 1: Monolith</a>
    <a href="chapter-5-7-maturity.html" class="btn-black">Chapter 3: Maturity →</a>
  </div>

  <footer class="site-footer">
    <div class="container">
      <p>Andrew Boyd · Platform Engineering Leader · <a href="https://github.com/andrewboyd79">github.com/andrewboyd79</a></p>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify at http://localhost:8080/docs/chapter-2-4-decomposition.html**

Check:
- Tab strip: tab 2 "Decomposition" is active (black underline)
- Sidebar: 6 links including "Decision record"
- Facade diagram uses `.primary` class (black border) for the facade boxes, default light gray for other boxes — no coloured boxes
- ADR component: Snow header, "ADR-002" label, "Accepted" pill badge, 2-column context/decision grid
- Bottom nav: ghost pill "← Chapter 1: Monolith" left, black pill "Chapter 3: Maturity →" right

- [ ] **Step 3: Commit**

```bash
git add docs/chapter-2-4-decomposition.html
git commit -m "feat: reconstruct chapter 2 with ADR component and chapter shell"
```

---

## Task 6: Reconstruct `docs/chapter-5-7-maturity.html`

**Files:**
- Modify: `docs/chapter-5-7-maturity.html` (full rewrite)

- [ ] **Step 1: Replace with complete new markup**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chapter 3: Maturity — Andrew Boyd</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <nav class="site-nav">
    <div class="container">
      <a href="../index.html" class="logo">Andrew Boyd</a>
      <a href="../index.html" class="nav-link">Overview</a>
      <a href="infrastructure-automation.html" class="nav-link">Infrastructure &amp; Automation</a>
      <a href="https://github.com/andrewboyd79" class="btn-black nav-cta" target="_blank" rel="noopener">GitHub →</a>
    </div>
  </nav>

  <nav class="chapter-nav">
    <div class="container">
      <a href="chapter-1-monolith.html" class="chapter-tab">
        <span class="mini-dot mini-dot-1">1</span> Monolith
      </a>
      <a href="chapter-2-4-decomposition.html" class="chapter-tab">
        <span class="mini-dot mini-dot-2">2</span> Decomposition
      </a>
      <a href="chapter-5-7-maturity.html" class="chapter-tab active">
        <span class="mini-dot mini-dot-3">3</span> Maturity
      </a>
      <a href="chapter-9-mobile.html" class="chapter-tab">
        <span class="mini-dot mini-dot-4">4</span> Mobile
      </a>
      <a href="infrastructure-automation.html" class="chapter-tab chapter-tab-spacer">
        <span class="mini-dot mini-dot-infra">⚙</span> Infrastructure
      </a>
    </div>
  </nav>

  <div class="page-layout">

    <aside class="sidebar">
      <span class="sidebar-label">On this page</span>
      <a href="#problem" class="sidebar-link active">The problem</a>
      <a href="#operations-console" class="sidebar-link">Operations console</a>
      <a href="#identity-service" class="sidebar-link">Identity service</a>
      <a href="#cicd-pipeline" class="sidebar-link">CI/CD pipeline</a>
      <a href="#integration-tests" class="sidebar-link">Integration tests</a>
      <a href="#trade-offs" class="sidebar-link">Key trade-offs</a>
      <a href="#decision-record" class="sidebar-link">Decision record</a>
    </aside>

    <div class="content">
      <div class="chapter-header">
        <span class="eyebrow">Chapter 3 · Maturity</span>
        <h1>Platform Observability and Reliability Engineering</h1>
        <p>Building operable platforms that teams can trust and operate confidently.</p>
        <div class="tech-tags">
          <span class="tag">FastAPI</span>
          <span class="tag">RS256 JWT</span>
          <span class="tag">Server-Sent Events</span>
          <span class="tag">AWS CodeBuild</span>
          <span class="tag">CloudFormation</span>
          <span class="tag">pytest</span>
        </div>
      </div>

      <div class="content-body">

        <h3 id="problem">The problem</h3>
        <p>A distributed system that works is not the same as a distributed system that is operable. After decomposition, EspressOrders had five independently deployed services with no shared visibility into order state, no standardised authentication across services, and no automated pipeline to validate that changes to one service did not break others.</p>
        <p>These chapters addressed operational maturity: the work that turns a proof of concept into something you could hand to an on-call engineer at 3am.</p>

        <h3 id="operations-console">Operations console</h3>
        <p>The operations console is a FastAPI service providing a real-time order queue for staff — orders appear as they are placed, without polling. This is implemented using Server-Sent Events (SSE): a persistent HTTP connection over which the server pushes updates to the client. Simpler than WebSockets for unidirectional data, and sufficient for this use case.</p>
        <p>Access is protected by staff authentication — a separate concern from customer identity, handled within the operations service itself.</p>

        <h3 id="identity-service">Identity service</h3>
        <p>The mobile client (Chapter 4) required stateless authentication — JWT tokens rather than session cookies. Rather than modify the monolith's auth system, a dedicated identity service was built: a FastAPI service issuing RS256-signed JWTs, with public key verification available to any consuming service.</p>
        <p>RS256 (asymmetric signing) was chosen over HS256 (symmetric) so that services can verify tokens without access to the signing key. Any service can verify; only the identity service can issue.</p>

        <div class="diagram">
          <div class="diagram-row">
            <div class="diagram-box">Client</div>
            <div class="diagram-arrow">→ POST /token</div>
            <div class="diagram-box primary">Identity service</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box primary">Identity service</div>
            <div class="diagram-arrow">→ RS256 JWT</div>
            <div class="diagram-box">Client</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box">Client</div>
            <div class="diagram-arrow">→ Bearer token</div>
            <div class="diagram-box">Any service</div>
          </div>
        </div>

        <h3 id="cicd-pipeline">CI/CD pipeline</h3>
        <p>Each service has its own CodeBuild project, triggered by a push to the relevant GitHub branch. Buildspecs are centralised in a dedicated repository and synced to S3 — a single source of truth for build configuration across all services. The same pipeline pattern is used for every service, including the mobile app added in Chapter 4.</p>

        <h3 id="integration-tests">Integration tests</h3>
        <p>A dedicated integration test suite exercises the full system end-to-end — placing orders, verifying state across services, confirming notifications. These run against a deployed environment (not mocked), providing confidence that the service boundaries behave correctly under real network conditions.</p>

        <h3 id="trade-offs">Key trade-offs</h3>
        <ul>
          <li>SSE over WebSockets for the operations console — simpler protocol, sufficient for unidirectional updates</li>
          <li>RS256 over HS256 for JWT signing — slightly more complex to set up, but the right choice for a multi-service architecture</li>
          <li>Centralised buildspecs over per-repo buildspecs — one place to update pipeline configuration, at the cost of an S3 sync step on change</li>
        </ul>

        <div id="decision-record" class="adr">
          <div class="adr-header">
            <span class="adr-title">Architectural Decision Record · ADR-003</span>
            <span class="adr-badge">Accepted</span>
          </div>
          <div class="adr-body">
            <h4>Use RS256 asymmetric signing for the JWT identity service</h4>
            <div class="adr-grid">
              <div class="adr-section">
                <span class="adr-section-label">Context</span>
                <p>Services needed to verify JWT tokens without access to the signing key. A symmetric scheme (HS256) would require sharing the secret with every consuming service, creating a wide blast radius if any service were compromised.</p>
              </div>
              <div class="adr-section">
                <span class="adr-section-label">Decision</span>
                <p>Build a dedicated identity service issuing RS256-signed JWTs. Any service can verify using the public key; only the identity service holds the private key and can issue tokens.</p>
              </div>
            </div>
            <div class="adr-grid" style="margin-top: 16px;">
              <div class="adr-section" style="grid-column: 1 / -1;">
                <span class="adr-section-label">Consequences</span>
                <p>Clean separation of concerns — verification and issuance are independent operations. Slightly more complex key management than HS256, but appropriate for a multi-service architecture where services should not share secrets.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>

  <div class="chapter-nav-bottom">
    <a href="chapter-2-4-decomposition.html" class="btn-ghost">← Chapter 2: Decomposition</a>
    <a href="chapter-9-mobile.html" class="btn-black">Chapter 4: Mobile →</a>
  </div>

  <footer class="site-footer">
    <div class="container">
      <p>Andrew Boyd · Platform Engineering Leader · <a href="https://github.com/andrewboyd79">github.com/andrewboyd79</a></p>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify at http://localhost:8080/docs/chapter-5-7-maturity.html**

Check:
- Tab strip: tab 3 "Maturity" active (`.mini-dot-3` is `#404040` — mid-dark gray)
- JWT diagram uses `.primary` for the Identity service boxes (black border), default for others
- ADR-003 present with RS256 context, 2-column grid, "Accepted" badge
- Bottom nav: ghost ← Chapter 2, black pill → Chapter 4

- [ ] **Step 3: Commit**

```bash
git add docs/chapter-5-7-maturity.html
git commit -m "feat: reconstruct chapter 3 with ADR component and chapter shell"
```

---

## Task 7: Reconstruct `docs/chapter-9-mobile.html`

**Files:**
- Modify: `docs/chapter-9-mobile.html` (full rewrite)

- [ ] **Step 1: Replace with complete new markup**

Note: the existing file had "EspressOrders" as the logo text — corrected to "Andrew Boyd" here.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chapter 4: Mobile — Andrew Boyd</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <nav class="site-nav">
    <div class="container">
      <a href="../index.html" class="logo">Andrew Boyd</a>
      <a href="../index.html" class="nav-link">Overview</a>
      <a href="infrastructure-automation.html" class="nav-link">Infrastructure &amp; Automation</a>
      <a href="https://github.com/andrewboyd79" class="btn-black nav-cta" target="_blank" rel="noopener">GitHub →</a>
    </div>
  </nav>

  <nav class="chapter-nav">
    <div class="container">
      <a href="chapter-1-monolith.html" class="chapter-tab">
        <span class="mini-dot mini-dot-1">1</span> Monolith
      </a>
      <a href="chapter-2-4-decomposition.html" class="chapter-tab">
        <span class="mini-dot mini-dot-2">2</span> Decomposition
      </a>
      <a href="chapter-5-7-maturity.html" class="chapter-tab">
        <span class="mini-dot mini-dot-3">3</span> Maturity
      </a>
      <a href="chapter-9-mobile.html" class="chapter-tab active">
        <span class="mini-dot mini-dot-4">4</span> Mobile
      </a>
      <a href="infrastructure-automation.html" class="chapter-tab chapter-tab-spacer">
        <span class="mini-dot mini-dot-infra">⚙</span> Infrastructure
      </a>
    </div>
  </nav>

  <div class="page-layout">

    <aside class="sidebar">
      <span class="sidebar-label">On this page</span>
      <a href="#problem" class="sidebar-link active">The problem</a>
      <a href="#zero-backend-changes" class="sidebar-link">Zero backend changes</a>
      <a href="#technology-decisions" class="sidebar-link">Technology decisions</a>
      <a href="#cicd-pipeline" class="sidebar-link">CI/CD pipeline</a>
      <a href="#trade-offs" class="sidebar-link">Key trade-offs</a>
      <a href="#decision-record" class="sidebar-link">Decision record</a>
    </aside>

    <div class="content">
      <div class="chapter-header">
        <span class="eyebrow">Chapter 4 · Mobile</span>
        <h1>Mobile Client</h1>
        <p>A React Native app built against an existing API — the point where every earlier design decision either pays off or costs you.</p>
        <div class="tech-tags">
          <span class="tag">React Native</span>
          <span class="tag">Expo</span>
          <span class="tag">EAS Build</span>
          <span class="tag">AWS CodeBuild</span>
          <span class="tag">Stripe React Native SDK</span>
          <span class="tag">SecureStore</span>
        </div>
      </div>

      <div class="content-body">

        <h3 id="problem">The problem</h3>
        <p>A coffee ordering platform without a mobile client is incomplete. The web application works, but in 2026 consumers expect to order from their phone — and the portfolio needed to demonstrate cross-platform thinking alongside the backend and infrastructure work.</p>
        <p>The question was whether the backend, built without a mobile client in mind, would support one without modification. API-first design is only proven when a second consumer arrives.</p>

        <h3 id="zero-backend-changes">The result: zero backend changes</h3>
        <p>The mobile client was built against the existing APIs without modification to any backend service. Every design decision made in earlier chapters — stateless JWT authentication, RESTful service boundaries, Stripe payment intent API — mapped cleanly to mobile patterns. The backend required no changes.</p>
        <p>This was not luck. It was the consequence of building services with clean interfaces rather than interface-per-consumer — a discipline that is easy to skip when there is only one consumer.</p>

        <div class="diagram">
          <div class="diagram-row">
            <div class="diagram-box strong">React Native app</div>
            <div class="diagram-arrow">→ JWT</div>
            <div class="diagram-box">Identity service</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box strong">React Native app</div>
            <div class="diagram-arrow">→ REST</div>
            <div class="diagram-box">Catalogue · Cart · Order</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box strong">React Native app</div>
            <div class="diagram-arrow">→ Payment sheet</div>
            <div class="diagram-box">Stripe SDK</div>
          </div>
        </div>

        <h3 id="technology-decisions">Technology decisions</h3>
        <p><strong>Expo over bare React Native</strong> — managed workflow removes native build toolchain complexity for a portfolio project. EAS Build handles iOS and Android compilation on Expo's infrastructure.</p>
        <p><strong>JWT in SecureStore</strong> — tokens are stored in the device's secure enclave, not in AsyncStorage. The same security posture as the browser's httpOnly cookie, implemented for a native context.</p>
        <p><strong>Preview profile (iOS simulator) over App Store</strong> — a full App Store distribution build requires an Apple Developer Program account ($99/year). The <code>preview</code> profile produces an iOS simulator build via EAS without requiring certificates or a paid account. The CI/CD pipeline is fully demonstrated; the final distribution step is a known, documented prerequisite.</p>

        <h3 id="cicd-pipeline">CI/CD pipeline</h3>
        <p>The mobile app uses the same CodeBuild + GitHub webhook pattern as every other service. Two jobs: a CI job on the <code>dev</code> branch (TypeScript type check, Jest tests) and a release job on the <code>prod</code> branch (CI + EAS simulator build). The EAS token and API credentials are pulled from SSM Parameter Store at build time — stored in the Infra account where CodeBuild runs.</p>

        <h3 id="trade-offs">Key trade-offs</h3>
        <ul>
          <li>Expo managed workflow over bare React Native — less control, significantly less complexity for a solo portfolio project</li>
          <li>Preview (simulator) build over production build — documented gap, not a hidden limitation</li>
          <li>Polling for order status (10-second interval) over WebSocket — simpler to implement, sufficient for the demo use case</li>
        </ul>

        <div id="decision-record" class="adr">
          <div class="adr-header">
            <span class="adr-title">Architectural Decision Record · ADR-004</span>
            <span class="adr-badge">Accepted</span>
          </div>
          <div class="adr-body">
            <h4>Use Expo managed workflow with preview build profile for mobile distribution</h4>
            <div class="adr-grid">
              <div class="adr-section">
                <span class="adr-section-label">Context</span>
                <p>Full App Store distribution requires an Apple Developer Program account ($99/year). The portfolio needed to demonstrate a complete CI/CD pipeline without creating an undocumented dependency on a paid account.</p>
              </div>
              <div class="adr-section">
                <span class="adr-section-label">Decision</span>
                <p>Use Expo EAS with a <code>preview</code> profile to produce iOS simulator builds via CodeBuild. The CI/CD pipeline is fully configured; the production distribution step is explicitly documented as a known prerequisite.</p>
              </div>
            </div>
            <div class="adr-grid" style="margin-top: 16px;">
              <div class="adr-section" style="grid-column: 1 / -1;">
                <span class="adr-section-label">Consequences</span>
                <p>The full build pipeline is demonstrated end-to-end. The simulator build validates the complete build chain including EAS integration. The gap (App Store distribution) is documented transparently in the chapter rather than hidden.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>

  <div class="chapter-nav-bottom">
    <a href="chapter-5-7-maturity.html" class="btn-ghost">← Chapter 3: Maturity</a>
    <a href="infrastructure-automation.html" class="btn-black">Infrastructure &amp; Automation →</a>
  </div>

  <footer class="site-footer">
    <div class="container">
      <p>Andrew Boyd · Platform Engineering Leader · <a href="https://github.com/andrewboyd79">github.com/andrewboyd79</a></p>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify at http://localhost:8080/docs/chapter-9-mobile.html**

Check:
- Logo says "Andrew Boyd" (not "EspressOrders" — this was a bug in the original)
- Tab 4 "Mobile" active (`.mini-dot-4` is pure black)
- Mobile diagram uses `.strong` (Silver border) for React Native app boxes
- ADR-004 present with Expo/preview context
- Bottom nav: ← Chapter 3 ghost, "Infrastructure & Automation →" black pill

- [ ] **Step 3: Commit**

```bash
git add docs/chapter-9-mobile.html
git commit -m "feat: reconstruct chapter 4, fix logo name, add ADR component"
```

---

## Task 8: Reconstruct `docs/infrastructure-automation.html`

**Files:**
- Modify: `docs/infrastructure-automation.html` (full rewrite)

- [ ] **Step 1: Replace with complete new markup**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Infrastructure &amp; Automation — Andrew Boyd</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <nav class="site-nav">
    <div class="container">
      <a href="../index.html" class="logo">Andrew Boyd</a>
      <a href="../index.html" class="nav-link">Overview</a>
      <a href="infrastructure-automation.html" class="nav-link">Infrastructure &amp; Automation</a>
      <a href="https://github.com/andrewboyd79" class="btn-black nav-cta" target="_blank" rel="noopener">GitHub →</a>
    </div>
  </nav>

  <nav class="chapter-nav">
    <div class="container">
      <a href="chapter-1-monolith.html" class="chapter-tab">
        <span class="mini-dot mini-dot-1">1</span> Monolith
      </a>
      <a href="chapter-2-4-decomposition.html" class="chapter-tab">
        <span class="mini-dot mini-dot-2">2</span> Decomposition
      </a>
      <a href="chapter-5-7-maturity.html" class="chapter-tab">
        <span class="mini-dot mini-dot-3">3</span> Maturity
      </a>
      <a href="chapter-9-mobile.html" class="chapter-tab">
        <span class="mini-dot mini-dot-4">4</span> Mobile
      </a>
      <a href="infrastructure-automation.html" class="chapter-tab active chapter-tab-spacer">
        <span class="mini-dot mini-dot-infra">⚙</span> Infrastructure
      </a>
    </div>
  </nav>

  <div class="page-layout">

    <aside class="sidebar">
      <span class="sidebar-label">On this page</span>
      <a href="#platform-consistency" class="sidebar-link active">Platform consistency</a>
      <a href="#repo-pattern" class="sidebar-link">Repo pattern</a>
      <a href="#shared-infrastructure" class="sidebar-link">Shared infrastructure</a>
      <a href="#cicd-pattern" class="sidebar-link">CI/CD pattern</a>
      <a href="#environment-management" class="sidebar-link">Environment management</a>
      <a href="#why-it-matters" class="sidebar-link">Why it matters</a>
    </aside>

    <div class="content">
      <div class="chapter-header">
        <span class="eyebrow">Platform Automation</span>
        <h1>Platform Automation and Environment Orchestration</h1>
        <p>Building self-service platforms that enable teams to move fast while maintaining governance and compliance.</p>
      </div>

      <div class="content-body">

        <h3 id="platform-consistency">Platform consistency as force multiplier</h3>
        <p>Platform engineering excellence begins with establishing clear, repeatable patterns that reduce cognitive load and accelerate delivery. This case study examines how defining infrastructure patterns upfront creates compounding benefits across the entire platform lifecycle.</p>
        <p>This approach delivers three platform advantages:</p>
        <ul>
          <li><strong>Reduced cognitive load</strong> — teams can focus on business value rather than relearning infrastructure patterns</li>
          <li><strong>Accelerated delivery</strong> — new capabilities can be added by copying proven patterns rather than redesigning from scratch</li>
          <li><strong>Enhanced AI assistance</strong> — predictable structures enable AI tools to provide meaningful context-aware suggestions</li>
        </ul>

        <div class="callout">
          <p>"Decide the pattern once. Every repo follows it. Only diverge when you have a genuine reason."</p>
        </div>

        <h3 id="repo-pattern">The repo pattern</h3>
        <p>Every microservice follows a two-repo structure: an application repo (the service code) and a service-config repo (the CloudFormation infrastructure for that service). All eight service-config repos are structurally identical:</p>

        <div class="diagram">
          <div class="diagram-row">
            <div class="diagram-box strong">espressorders-[service]</div>
            <div class="diagram-arrow">+</div>
            <div class="diagram-box primary">espressorders-[service]-service-config</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box">Application code<br><small style="color:#a3a3a3">dev / prod branches</small></div>
            <div class="diagram-arrow">&nbsp;</div>
            <div class="diagram-box">CloudFormation stack<br><small style="color:#a3a3a3">ECS service · TG · listener rule</small></div>
          </div>
        </div>

        <p>Both repos use the same branch model: <code>dev</code> for active development, <code>prod</code> for stable releases. The same CodeBuild pipeline pattern triggers on push to each branch.</p>

        <h3 id="shared-infrastructure">Shared infrastructure</h3>
        <p>Beneath the service layer, shared infrastructure is managed in dedicated repos — also following consistent patterns:</p>
        <ul>
          <li><strong>ecs-infrastructure</strong> — ECS cluster, Application Load Balancer, Route 53 A record. Deployed once; all services attach to it</li>
          <li><strong>vpc-infrastructure</strong> — VPC, subnets, security groups. The network foundation everything runs on</li>
          <li><strong>task-definition</strong> — ECS task definitions for all services. The primary pipeline trigger: push here to kick off a rolling deployment</li>
          <li><strong>parameters</strong> — All SSM parameters managed as infrastructure-as-code. No ad-hoc CLI parameter creation; every secret and config value is tracked in this repo</li>
          <li><strong>buildspecs</strong> — Centralised CodeBuild YAML for all services. Synced to S3 on push to <code>dev</code>; CodeBuild reads from S3 at build time</li>
          <li><strong>deployment-cli</strong> — CloudFormation templates for CodeBuild projects and ECR repository policies. The tooling that creates the pipelines</li>
        </ul>

        <h3 id="cicd-pattern">CI/CD pipeline pattern</h3>
        <p>Every service uses the same pipeline pattern: a CodeBuild project with a GitHub webhook trigger, parameterised by branch, deployed via CloudFormation from <code>deployment-cli</code>. The buildspec lives in the centralised <code>buildspecs</code> repo rather than the application repo — a single place to update build configuration across the entire platform.</p>

        <div class="diagram">
          <div class="diagram-row">
            <div class="diagram-box">Push to GitHub</div>
            <div class="diagram-arrow">→ webhook</div>
            <div class="diagram-box">CodeBuild</div>
            <div class="diagram-arrow">→ reads from S3</div>
            <div class="diagram-box primary">Buildspec YAML</div>
          </div>
          <div class="diagram-row">
            <div class="diagram-box">CodeBuild</div>
            <div class="diagram-arrow">→ image push</div>
            <div class="diagram-box">ECR</div>
            <div class="diagram-arrow">→ rolling deploy</div>
            <div class="diagram-box">ECS service</div>
          </div>
        </div>

        <h3 id="environment-management">One-command environment management</h3>
        <p>Running nine ECS services continuously is expensive. For a portfolio project, the environment needs to be spun up for demonstrations and shut down afterwards. The <code>espressorders-spinup-automation</code> repo provides this: a Step Function that orchestrates the spin-up or spin-down of the entire environment in strict dependency order, triggered by a single CLI command.</p>

        <div class="callout">
          <p>"This is the same pattern a platform engineering team would put behind a 'Start Environment' button in an internal developer portal — complex orchestration abstracted to a single, repeatable action."</p>
        </div>

        <p>The dependency order matters: the ECS cluster must exist before services can attach to it; the ALB must exist before listener rules can be created; Aurora must be running before services that depend on it start. The Step Function enforces this order automatically, eliminating the manual coordination that would otherwise be required.</p>

        <h3 id="why-it-matters">Why this matters for production</h3>
        <p>The patterns here are not academic. The two-repo structure, centralised buildspecs, infrastructure-as-code parameters, and automated environment orchestration are all patterns that translate directly to enterprise platform engineering:</p>
        <ul>
          <li>A new team service can be onboarded in hours by copying the existing pattern</li>
          <li>Environment promotion (dev → prod) is a single parameter change, not a process document</li>
          <li>The platform is auditable — every parameter, every pipeline, every infrastructure change is tracked in version control</li>
          <li>It can be torn down and rebuilt from scratch — which means it can be ported to another project or organisation</li>
        </ul>

      </div>
    </div>

  </div>

  <div class="chapter-nav-bottom">
    <a href="../index.html" class="btn-ghost">← Overview</a>
    <span></span>
  </div>

  <footer class="site-footer">
    <div class="container">
      <p>Andrew Boyd · Platform Engineering Leader · <a href="https://github.com/andrewboyd79">github.com/andrewboyd79</a></p>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify at http://localhost:8080/docs/infrastructure-automation.html**

Check:
- "Infrastructure" tab is active (right-aligned, `chapter-tab-spacer` pushes it right)
- Sidebar: 6 section anchors, no ADR link (this page has no ADR)
- Two diagrams: both use Snow background, white boxes. Repo pattern diagram uses `.strong` (Silver border) for app repo and `.primary` (black border) for service-config repo. CI/CD diagram uses `.primary` for Buildspec YAML
- Two callout blocks with neutral gray left border
- Bottom nav: "← Overview" ghost pill left; no next button (empty `<span>`)

- [ ] **Step 3: Commit**

```bash
git add docs/infrastructure-automation.html
git commit -m "feat: reconstruct infrastructure-automation page with chapter shell"
```

---

## Task 9: Final cross-page verification

**Files:** None modified — verification only.

- [ ] **Step 1: Verify the complete navigation flow**

Walk through every page in sequence and confirm:

1. http://localhost:8080 — homepage
   - White background throughout, no dark surfaces
   - Nav: SemiBold logo, Stone links, black pill GitHub button
   - Hero: large rounded heading, Stone body text, black + gray pill CTAs
   - Timeline: silver/stone/mid-dark/black progressive dots; outline ring on active stage; gray pill tags; black pill "Read chapter →" and gray pill "Decision record →" buttons in expanded card
   - Decision cards: Snow background, no colour
   - Platform band: Snow background (not dark), black pill CTA

2. http://localhost:8080/docs/chapter-1-monolith.html
   - Chapter tab strip sticky: tab 1 active (black underline, `mini-dot-1` silver)
   - Sidebar visible, Snow background, 4 anchor links
   - Diagram: light boxes, `.strong` for Django boxes
   - Bottom nav: only next button (no previous)

3. http://localhost:8080/docs/chapter-2-4-decomposition.html
   - Tab 2 active (`mini-dot-2` Stone)
   - ADR component visible, Snow header, 2-column grid, "Accepted" badge
   - Sidebar includes "Decision record" link
   - Prev + next buttons both present

4. http://localhost:8080/docs/chapter-5-7-maturity.html
   - Tab 3 active (`mini-dot-3` `#404040`)
   - ADR-003 present with RS256 content
   - JWT diagram: `.primary` border on Identity service boxes

5. http://localhost:8080/docs/chapter-9-mobile.html
   - Tab 4 active (`mini-dot-4` black)
   - Logo shows "Andrew Boyd" (not "EspressOrders")
   - ADR-004 present with Expo content
   - React Native boxes use `.strong` (Silver border)
   - Next button links to "Infrastructure & Automation"

6. http://localhost:8080/docs/infrastructure-automation.html
   - Infrastructure tab active (right-aligned)
   - No ADR section
   - Bottom nav: only "← Overview" ghost pill

- [ ] **Step 2: Verify responsive behaviour at 768px**

In browser DevTools, set viewport to 768px width and check:
- Chapter pages: sidebar moves above content (no longer side-by-side)
- Homepage: decision cards stack single column
- Hero heading reduces to 36px

- [ ] **Step 3: Verify no chromatic colour remains**

Open DevTools, inspect a few elements. Confirm:
- No `#10b981` (old Emerald) in computed styles
- No `#3b82f6` (Electric Blue, except focus ring on `:focus-visible`)
- No `#1f2937` (old Charcoal) anywhere
- All backgrounds are `#fff`, `#fafafa`, or `#e5e5e5`

- [ ] **Step 4: Add `.superpowers/` to `.gitignore`**

```bash
echo ".superpowers/" >> .gitignore
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm directory"
```

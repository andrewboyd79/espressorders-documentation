# Design Spec: Ollama-Inspired Full Site Redesign

**Date:** 2026-04-15  
**Status:** Approved  
**Scope:** All 6 HTML pages — `index.html`, `docs/infrastructure-automation.html`, `docs/chapter-1-monolith.html`, `docs/chapter-2-4-decomposition.html`, `docs/chapter-5-7-maturity.html`, `docs/chapter-9-mobile.html`  
**Design system reference:** `DESIGN.md`  
**Approach:** Full reconstruction — CSS rewrite + HTML restructure + JS updates + improved information hierarchy

---

## 1. Design System Summary

This redesign replaces the dark Charcoal/Emerald/Blue brand with the Ollama-inspired system defined in `DESIGN.md`. The previous `brand-guidelines.md` no longer applies.

### Colour palette (grayscale only)

| Token | Hex | Use |
|---|---|---|
| Pure Black | `#000000` | Primary text, active states, black pill CTAs |
| Near Black | `#262626` | Button text on light surfaces |
| Darkest Surface | `#090909` | (Reserved — not used in this site) |
| Pure White | `#ffffff` | Page background |
| Snow | `#fafafa` | Section backgrounds, sidebar, diagram backgrounds, card hover |
| Light Gray | `#e5e5e5` | Borders, button backgrounds (gray pill), diagram box borders |
| Stone | `#737373` | Secondary body text, nav links, descriptor text |
| Mid Gray | `#525252` | Emphasized body text, content paragraphs |
| Silver | `#a3a3a3` | Tertiary text, eyebrow labels, chapter badges, placeholders |
| Button Text Dark | `#404040` | Timeline stage 3 dot (progressive shading) |
| Ring Blue | `#3b82f6` at 50% | Focus ring only — never visible in normal interaction |

**No chromatic colour anywhere** — not even for semantic states. The blue focus ring is the sole exception and is only visible during keyboard navigation.

### Typography

| Role | Font | Size | Weight | Line-height |
|---|---|---|---|---|
| Display / hero heading | SF Pro Rounded, system-ui fallback | 48px | 500 | 1.0 |
| Section heading | SF Pro Rounded | 30–36px | 500 | 1.1–1.2 |
| Sub-heading / card title | ui-sans-serif | 18–20px | 500 | 1.3 |
| Body large | ui-sans-serif | 16–18px | 400 | 1.56–1.6 |
| Body / nav | ui-sans-serif | 14–15px | 400–500 | 1.5–1.6 |
| Caption / metadata | ui-sans-serif | 11–13px | 400–600 | 1.4 |
| Code / monospace | ui-monospace | 13–14px | 400 | 1.5 |

### Border radius

Binary system — no intermediate values:

- **12px** — all non-interactive containers: cards, diagrams, ADR blocks, expanded timeline cards
- **9999px (pill)** — all interactive elements: buttons, tags, timeline dots, chapter mini-dots, status badges, nav CTA

### Shadows

Zero. No element has a shadow. Depth is communicated through background-color shifts (white → Snow) and single-pixel `#e5e5e5` borders only.

### Buttons

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Black pill | `#000` | `#fff` | none | Primary CTA, nav GitHub button, "next chapter" |
| Gray pill | `#e5e5e5` | `#262626` | `1px solid #e5e5e5` | Secondary action, "platform approach" |
| Ghost pill | `#fff` | `#262626` | `1px solid #e5e5e5` | "← previous chapter" nav |

All buttons: `padding: 10px 24px`, `border-radius: 9999px`, `font-size: 14–15px`, `font-weight: 500`.

---

## 2. Shared Components

### Navigation bar

- Background: transparent (sits on white page)
- Bottom border: `1px solid #e5e5e5`
- Left: **"Andrew Boyd"** wordmark — `font-size: 16px`, `font-weight: 600`, `color: #000`
- Centre: text links "Overview" and "Infrastructure & Automation" — `font-size: 14px`, `color: #737373`
- Right: **"GitHub →"** black pill CTA — links to `https://github.com/andrewboyd79`
- Container: `max-width: 1024px`, centred, `padding: 0 48px`

### Footer

- Top border: `1px solid #e5e5e5`
- Background: `#fff`
- Content: `"Andrew Boyd · Platform Engineering Leader · github.com/andrewboyd79"` — `font-size: 13px`, `color: #a3a3a3`, centred
- GitHub link: `color: #737373`

### Tags (tech stack pills)

- Background: `#e5e5e5`, text: `#262626`
- `font-size: 11px`, `font-weight: 500`, `padding: 4px 12px`, `border-radius: 9999px`

### Blockquote / callout

- Background: `#fafafa`
- Left border: `3px solid #e5e5e5`
- Radius: `0 8px 8px 0`
- Text: `font-style: italic`, `color: #525252`, `font-size: 15px`
- No coloured left accent

---

## 3. Homepage (`index.html`)

### Hero

- Full-width, `padding: 96px 48px 80px`
- Eyebrow: `"Platform Engineering Leadership"` — 11px, uppercase, letter-spaced, Silver (`#a3a3a3`)
- Headline: `"Building systems that enable teams to move fast."` — 48px, SF Pro Rounded, weight 500, line-height 1.0, Pure Black
- Descriptor: Stone (`#737373`), 18px, max-width 580px
- Two CTAs: black pill `"Explore the journey →"` + gray pill `"Platform approach"`

### Expertise section

- Eyebrow label: "Expertise"
- Section heading: 30px SF Pro Rounded
- Body paragraphs: `#525252`, 15px
- Blockquote callout with neutral left-border rule (no coloured accent)
- `border-bottom: 1px solid #e5e5e5`

### Engineering Journey (timeline)

- Eyebrow: "Engineering Journey"
- Track line: `1px solid #e5e5e5`, from node to node
- **Progressive shading** for dots (all `border-radius: 9999px`, `44×44px`):
  - Stage 1 (Monolith): Silver `#a3a3a3`
  - Stage 2 (Decomposition): Stone `#737373`
  - Stage 3 (Maturity): `#404040`
  - Stage 4 (Mobile): Pure Black `#000`
- Active node: `outline: 3px solid #000; outline-offset: 3px`
- Stage labels: 13px, `#262626`, weight 500 when active / `#737373` inactive
- Chapter label below: 11px, Silver
- Expanded card: `border: 1px solid #e5e5e5`, `border-radius: 12px`, `padding: 24px`
  - Heading: 20px, weight 500, Pure Black
  - Chapter badge: 10px uppercase, Silver
  - Tagline: italic, Stone
  - Summary: 14px, `#525252`
  - Tech tags: gray pills
  - CTA: black pill `"Read chapter →"`
  - For stages with ADR: gray pill `"Decision record →"`
- Hint text: `"Click any stage to explore"` — 12px, Silver, centred
- Stage 1 auto-expands on load (existing behaviour preserved)

### Platform-first thinking

- Eyebrow: "Architectural Approach"
- Heading: "Platform-first thinking."
- 3-column decision cards grid: Snow (`#fafafa`) background, `1px solid #e5e5e5` border, `12px` radius
  - Card eyebrow: 10px uppercase Silver
  - Card heading: 15px, weight 500, Pure Black
  - Card body: 13px, Stone

### Platform as a Product band

- Background: Snow (`#fafafa`) — replaces current dark `infra-band`
- Top border: `1px solid #e5e5e5`
- Eyebrow: "Platform as a Product"
- Heading: "Infrastructure built like software." — 28px SF Pro Rounded
- Body: Stone, 16px
- CTA: black pill `"Explore the platform approach →"` — links to `docs/infrastructure-automation.html`

---

## 4. Chapter Pages (all four chapter HTML files)

All chapter pages share this layout:

### Chapter tab strip (sticky)

- Position: sticky, below site nav, `z-index: 10`
- Background: `#fff`, `border-bottom: 1px solid #e5e5e5`
- Tabs for: 1 Monolith · 2 Decomposition · 3 Maturity · 4 Mobile · Infrastructure (right-aligned, separated by `margin-left: auto`)
- Each tab shows a mini dot (16×16px pill, matching the homepage progressive shading) + chapter name
- Active tab: `color: #000`, `font-weight: 500`, `border-bottom: 2px solid #000`
- Inactive tab: `color: #737373`, `border-bottom: 2px solid transparent`
- Infrastructure tab dot: solid `#262626` square-ish pill with a ⚙ glyph

### Two-column layout

- Left: **Sidebar** (220px fixed) — Snow background, `border-right: 1px solid #e5e5e5`
  - "On this page" eyebrow
  - Section anchor links: 13px, Stone by default; active = Pure Black, weight 500, `border-left: 2px solid #000`
- Right: **Content area** — `padding: 48px 56px`, white background

### Page header (within content area)

- Eyebrow: `"Chapter N · [Name]"` — 10px uppercase Silver
- Heading: chapter title — 36px SF Pro Rounded, weight 500, line-height 1.1
- Subtitle: 16px Stone, max-width 540px
- `border-bottom: 1px solid #e5e5e5`, `padding-bottom: 32px`, `margin-bottom: 48px`

### Body content

- `h3` section headings: 18px, weight 500, Pure Black
- Body paragraphs: 15px, `#525252`, line-height 1.7, max-width 600px
- Lists: same colour as paragraphs
- Blockquote callouts: shared callout component (see §2)

### Diagrams

- Background: Snow `#fafafa`, `border: 1px solid #e5e5e5`, `border-radius: 12px`, `padding: 24px`
- Diagram boxes: white background, `1px solid #e5e5e5` border, `border-radius: 8px`
  - `.strong` variant: `border-color: #a3a3a3`
  - `.primary` variant: `border-color: #000`, `color: #000`
- Font: `ui-monospace`, 12px, weight 500
- Arrows: Silver `#a3a3a3`
- **No chromatic accent colours** — the existing `accent-indigo`, `accent-sky`, `accent-emerald`, `accent-amber` classes are replaced with `strong` and `primary` gray variants

### ADR (Architectural Decision Record) component

A purpose-built card replacing the current plain anchor + link:

- Outer: `border: 1px solid #e5e5e5`, `border-radius: 12px`, `overflow: hidden`
- Header row: Snow background, `border-bottom: 1px solid #e5e5e5`, `padding: 16px 20px`
  - Left: `"Architectural Decision Record · ADR-NNN"` — 11px uppercase Silver
  - Right: status badge (pill) — e.g. `"Accepted"` — `background: #e5e5e5`, `color: #262626`
- Body: `padding: 20px`
  - Decision title: 16px, weight 500, Pure Black
  - 2-column grid: Context | Decision (each with 10px uppercase eyebrow + 13px Stone body)
  - Second row: Consequences (full width)
- `id="decision-record"` anchor on the wrapping element for deep-link compatibility

### Bottom chapter navigation

- Full-width, `border-top: 1px solid #e5e5e5`, `padding: 32px 56px`
- Left: ghost pill button `"← Chapter N: [Previous]"` — links to previous chapter
- Right: black pill button `"Chapter N: [Next] →"` — links to next chapter
- First and last chapters: show only the relevant direction button

---

## 5. Infrastructure & Automation Page (`docs/infrastructure-automation.html`)

Same shell as chapter pages (site nav + chapter tab strip with Infrastructure tab active + sidebar + content area + bottom nav).

### Differences from chapter pages

- Chapter tab strip: Infrastructure tab is active (right-aligned tab)
- Sidebar: sections specific to this page — "Platform consistency", "Repo pattern", "Shared infrastructure", "CI/CD pattern", "Environment management", "Why it matters"
- Page header eyebrow: `"Platform Automation"` (no chapter number)
- Bottom nav: ghost pill `"← Overview"` links to `index.html`; no "next" button

### Diagram treatment

Same diagram component as chapter pages. The two existing pipeline diagrams are re-skinned:
- Box backgrounds: white, `1px solid #e5e5e5`
- `.accent-sky` → `.strong` (border: `#a3a3a3`)
- `.accent-emerald` → `.primary` (border: `#000`)
- All other boxes: default gray border

---

## 6. JavaScript (`js/timeline.js`)

The timeline JS needs two changes:

1. **Remove per-stage colour** — the `colour` property is no longer used for dot backgrounds. Dot backgrounds are set in CSS via `.dot-1`, `.dot-2`, `.dot-3`, `.dot-4` classes applied by the JS based on stage index.
2. **Remove inline colour styles from the expanded card** — `stage.colour` is currently used for heading colour, tagline colour, card border colour, and link colours. All replaced with Pure Black headings, Stone taglines, `#e5e5e5` card border, and standard pill button classes.

The `colour` property can be kept in the data for reference but must not be applied as inline styles.

---

## 7. Stylesheet (`css/style.css`)

The existing stylesheet is replaced wholesale. New stylesheet implements:

- CSS custom properties for all colour tokens
- Reset and base styles (system font stack, Pure White body bg, Pure Black text)
- Layout: `.container` max-width 1024px, `.page-layout` two-column grid
- All shared components (nav, footer, buttons, tags, callout, diagram, ADR)
- Homepage-specific sections (hero, timeline, decision cards, platform band)
- Chapter-specific sections (chapter tab strip, sidebar, page header, content body)
- Responsive breakpoints matching DESIGN.md: 640 / 768 / 850 / 1024 / 1280px
  - Mobile: single column, stacked nav (hamburger), hero headline scales to 30px
  - Chapter pages: sidebar collapses to top-of-page anchor list on mobile
  - Chapter tab strip: horizontal scroll on mobile

---

## 8. Files Changed

| File | Change type |
|---|---|
| `css/style.css` | Full rewrite |
| `js/timeline.js` | Targeted updates (remove colour, update card HTML template) |
| `index.html` | Reconstruct: hero, section structure, CTA copy |
| `docs/chapter-1-monolith.html` | Add chapter strip, sidebar, ADR component, bottom nav |
| `docs/chapter-2-4-decomposition.html` | Add chapter strip, sidebar, ADR component, bottom nav |
| `docs/chapter-5-7-maturity.html` | Add chapter strip, sidebar, ADR component, bottom nav |
| `docs/chapter-9-mobile.html` | Add chapter strip, sidebar, ADR component, bottom nav |
| `docs/infrastructure-automation.html` | Add chapter strip, sidebar, restyle diagrams, bottom nav |

---

## 9. Out of Scope

- Content edits beyond what is shown in the approved hero copy
- New pages or sections not currently in the site
- Dark mode
- Any JavaScript beyond the timeline colour fix
- `.gitignore` and CI/CD changes

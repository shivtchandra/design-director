---
name: portfolio-effects
description: "A database of portfolio interaction recipes across 9 categories (Text & Type, Scroll, Cursor, Card / Object, Ambient, Audio, Loading, Navigation, Easter Egg). Supports pure HTML/CSS/JS and React/Framer Motion. Query using `node scripts/search-effects.js` to find effects and copy code directly into workspace files. For full visual planning (mood, colors, fonts, then motion), use the design-director skill instead."
---

# Portfolio Effects Playground - AI Agent Skill

This skill provides access to a searchable database of high-quality portfolio interaction recipes and visual micro-interactions. Use this database to copy, adapt, or build interactive components in portfolio websites, landing pages, or user interfaces.

For end-to-end design direction (mood → palette → type → layout → motion), use **`design-director`** via `npx skills add shivtchandra/design-director --skill design-director`.

## When to Apply

Use this skill when the task involves adding **motion effects, custom cursor interactions, audio feedback, loading animations, custom scroll-driven animations, or micro-interactions** to the client-side code — and the visual system is already decided.

### Primary Use Cases

- **Text & Typography**: Scramble reveals, typewriter loops, word warp animations, odometer counts, gradient text sweeps, VHS glitch text.
- **Scroll Animations**: Ambient glows, reading progress indicators, marquee tickers, section counters, parallax layers, vertical SVG line draws, sticky section headers.
- **Cursors & Pointers**: Elastic SVG cursors, custom pointer follow labels, magnetic attraction buttons, canvas trail particles, hover ripples.
- **Cards & Objects**: 3D holographic tilt, spotlight gradients, double-click card flips, hover border traces, audio vinyl record scratching, tag scatter on hover.
- **Ambient & Audio**: Sound effect synthesizers (clicks, chimes, drones), live availability status dots, starfield canvases, time-of-day backgrounds.
- **Navigation & Loading**: Letterpress page introductions, cinematic curtain openers, page transition morphs, active section nav highlights, needle-lift back-to-top buttons.
- **Easter Eggs**: Konami code overlays, dev console signatures, rage-click surprises, idle disco screens.

---

## Core Guidelines & Quality Checks

When selecting or writing code based on these effects, you MUST enforce the following guidelines:

### 1. Accessibility (WCAG & Platform Idioms)
- **Reduced Motion**: Always wrap complex animations (especially scroll-jacking, glitches, canvas starfields) in media queries or hooks checking `prefers-reduced-motion`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .animated-el {
      animation: none;
      transform: none;
      transition: none;
    }
  }
  ```
- **Focus Rings**: Never remove outline/focus states on interactive buttons or clickable elements without providing a distinct custom focus ring.
- **Labels**: Ensure all icon-only triggers (audio toggle, back-to-top needle) have descriptive `aria-label` or `aria-live` attributes.
- **Keyboard Navigation**: Any modal or overlay (like the Konami code modal) must be dismissible with the `Escape` key and support full keyboard focus traversal.

### 2. Interaction & Spacing
- **Touch Targets**: Minimum interactive size must be `44x44px` with a minimum of `8px` spacing between adjacent triggers.
- **Sound Activation**: Any Web Audio effect (UI clicks, hover chimes, drones) MUST be gated behind an initial user gesture (e.g. an "Enable Audio" speaker button) to avoid browser blocking and user annoyance. Keep gain/volumes very low (e.g., `0.04` - `0.08`).

### 3. Performance & Rendering
- **Main Thread Budget**: Keep per-frame updates under `16.7ms` (60fps). Batch DOM reads and writes; avoid layout thrashing.
- **Transform & Opacity**: Animate positions, scales, and fades using GPU-accelerated properties (`transform` and `opacity`). Avoid animating layout properties (`width`, `height`, `top`, `left`) which trigger reflows.
- **Viewport Bounds**: Ensure canvas/trail elements use `ResizeObserver` or dynamic window-size updates to prevent scrollbars or content cropping.

---

## Querying the Database

To search the database or retrieve clean code snippets, run the search command in the shell:

```bash
node scripts/search-effects.js "<query>" [options]
```

### Options
- `-c, --cat <category>`: Filter by category (e.g., "Scroll", "Text & Type", "Cursor", "Audio", "Loading").
- `-t, --tech <tech>`: Filter by technology keywords (e.g., "Framer Motion", "Canvas", "SVG", "Web Audio API").
- `-x, --complexity <level>`: Filter by complexity ("easy", "medium", "hard").
- `-s, --html`: Include full standalone HTML/CSS/JS snippet code in the output.
- `-r, --react`: Include clean, copy-paste ready React component/hook snippet code in the output.

### Examples

1. **Find all glitch-related effects**:
   ```bash
   node scripts/search-effects.js "glitch"
   ```

2. **Retrieve the React code for a scramble heading reveal**:
   ```bash
   node scripts/search-effects.js "01" --react
   ```

3. **Browse all easy cursor effects**:
   ```bash
   node scripts/search-effects.js --cat "Cursor" --complexity "easy"
   ```

4. **Retrieve HTML code for a magnetic button**:
   ```bash
   node scripts/search-effects.js "24" --html
   ```

Once you have queried the matching snippet, integrate the code directly into the target project files, matching the layout structure, CSS framework, and packaging conventions of the host repository.

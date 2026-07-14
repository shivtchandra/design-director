# Example prompts

Copy-paste these into Cursor / Claude / Codex chat. Always **name the skill** and say **plan first**.

## Formula

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then …
```

### What to include in a good prompt

- Brand / product name
- Tone (3 adjectives max)
- New build vs **revamp**
- Keep vs replace: copy, URL/structure, colors, fonts, layout
- Where the page lives (URL, `@path/to/File.jsx`, or “new route”)
- Whether you want code after the brief, or **brief only**

**Revamps:** Ask the agent to inspect the existing page/files before locking a new direction so it does not blindly overwrite brand assets.

**Motion code:** After planning effects, agents retrieve snippets from the skill scripts folder with `--html` / `--react` (bundled in the install):

```bash
node scripts/search-effects.js "magnetic"
node scripts/search-effects.js "24" --react
```

---

## Recipes

### 1. New landing page

**When:** Greenfield brand page, nothing built yet.

```
Use the design-director skill. Design a landing page for a boutique running brand called “Voltstride” — dark, athletic, editorial. Plan first (brief + tokens + 2–3 effects), then build a single page.
```

### 2. New portfolio / product site

**When:** Creator, studio, or product marketing site from scratch.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a single-page site for “North Loom”, a ceramic studio. Audience: collectors and interior designers. Tone: quiet, tactile, warm-minimal. Prefer photography-led layout, not a dashboard. Use React + Tailwind if the repo already has them.
```

### 3. Revamp an existing live site

**When:** Brand already has a page and wants a visual redesign.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then revamp our marketing homepage.

Current site: https://example.com
Keep: URL structure, section order (Hero → Features → Pricing → FAQ → Footer), and all existing copy.
Replace: visual system (palette, type, spacing) and add 2–3 tasteful motion effects.
Constraints: no purple-gradient SaaS look; must stay on-brand for a fintech trust audience.
Inspect the current page feel from my description / screenshots before locking tokens.
```

### 4. Revamp an in-repo page

**When:** Code already exists in the workspace.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then revamp @src/pages/HomePage.jsx (and its main template if needed).

Keep: routing, component tree shape, and existing copy strings.
Replace: colors, typography, hero composition, and motion.
Tone: dark, cinematic, technical. Avoid AI-slop defaults (see anti-defaults).
```

### 5. Brand already has tokens / DESIGN.md

**When:** You have a catalog slug or local design tokens and want evolution, not a random new system.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then restyle our landing page.

Base tokens on catalog slug `cursor` (run search-designs --slug cursor), but evolve them for a darker athletic product site — keep the orange primary energy, swap the cream canvas for near-black.
Keep existing section content in @src/pages/HomePage.jsx; only change the look and 2 micro-interactions.
```

Or with a local file:

```
Use the design-director skill. Plan first. Start from @src/data/designs/prmpt/DESIGN.md as the token source, then adapt for a lighter editorial product launch page. Don’t write code until the brief is filled.
```

### 6. Plan only (no code yet)

**When:** You want alignment before implementation.

```
Use the design-director skill. For a boutique running brand “Voltstride” — dark, athletic, editorial — write only the design brief (brief + tokens from search-designs + 2–3 effects from search-effects). Do not write any UI code yet.
```

### 7. Light touch (palette + type + tiny motion)

**When:** Layout and copy stay; look needs a refresh.

```
Use the design-director skill. Plan first (brief + tokens + 1–2 effects). Light-touch restyle of @src/pages/HomePage.jsx: do not change layout or copy — only palette, typography, and 1–2 micro-interactions. Tone: confident, minimal, modern.
```

### 8. Effects already decided

**When:** Visual system is locked; you only need interaction recipes.

Do **not** use design-director. Use the sibling skill:

```
Use the portfolio-effects skill. Find a magnetic button and a scroll-linked marquee; give me React snippets and integrate them into @src/components/Hero.jsx.
```

---

## After updating skill docs

Re-install so the global agent copy picks up new files:

```bash
npx skills add . --skill design-director -g -y
```

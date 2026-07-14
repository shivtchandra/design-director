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
- Whether you want code after the brief, **brief only**, and/or **imagery**
- Mobile-first or desktop-first (optional)

**Revamps:** Ask the agent to inspect existing pages/files before locking a new direction.

**Motion:** After planning, retrieve snippets with `--html` / `--react` from the skill scripts folder.

**Imagery:** After tokens lock — 1 full-bleed hero + up to 2 supporting stills (see [imagery.md](imagery.md)).

---

## A. Greenfield by vertical

### Boutique product landing

**When:** Consumer brand splash from scratch.

```
Use the design-director skill. Design a landing page for a boutique running brand called “Voltstride” — dark, athletic, editorial. Plan first (brief + tokens + 2–3 effects), then build a single page.
```

### Studio / portfolio

**When:** Creator or ceramics / design studio site.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a single-page site for “North Loom”, a ceramic studio. Audience: collectors and interior designers. Tone: quiet, tactile, warm-minimal. Prefer photography-led layout, not a dashboard. Use React + Tailwind if the repo already has them.
```

### SaaS waitlist / product marketing

**When:** B2B or prosumer product launch / waitlist.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a waitlist landing page for “Relaykit” — a team inbox for async video updates. Tone: calm, precise, product-led. Audience: remote eng managers. One hero, short proof strip, email CTA — no dashboard chrome. Enforce site uniformity.
```

### Agency / services

**When:** Studio selling strategy + build work.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a services site for “Hearth & Grid”, a brand-and-build agency. Tone: sharp, editorial, confident. Sections: work, process, retainer CTA. Dark canvas; no purple SaaS look.
```

### Restaurant / hospitality

**When:** Place-led site with atmosphere.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a one-page site for “Casa Meridian”, a seaside restaurant. Tone: warm, luminous, late-evening. Emphasize atmosphere imagery (generate or prompt after tokens). Reservation CTA. Mobile-first menus and hours.
```

### Ecommerce collection / splash

**When:** Product drop or capsule collection page.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a capsule-collection page for “Fold Line” apparel. Tone: stark, geometric, archival. Grid of products with one magnetic CTA. Keep uniformity across cards (same radius, type, motion).
```

### Event / conference

**When:** Single-event marketing page.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build an event page for “Northbound Conf 2026”. Tone: kinetic, night-city, technical. Include date, venue, speakers teaser, ticket CTA. Prefer scroll motion over cursor spectacles for mobile.
```

### Personal brand / resume site

**When:** Individual portfolio.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a personal site for a product designer named “Mira Chen”. Tone: lucid, quiet, precise. Work grid + short about + contact. Avoid emoji and stock-people hero; abstract or process imagery only.
```

### Fintech / trust-heavy B2B

**When:** Credibility and clarity over flash.

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a marketing homepage for “Ledgerlane”, SMB bookkeeping. Tone: trustworthy, clear, restrained. Strong hierarchy, readable type, minimal motion (1–2 effects). No neon, no purple gradients.
```

---

## B. Imagery-forward

### Generate hero after tokens

```
Use the design-director skill. Same Voltstride brief — dark, athletic, editorial. After locking tokens, generate a full-bleed hero image (and up to 2 supporting stills) matching the palette, then implement.
```

### Photography-led editorial + gens

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build an editorial landing for “Oak & Filament” furniture. Tone: material, slow, warm. After tokens, generate photography-style stills of wood grain / product close-ups (1 hero + 2 supporting), then implement full-bleed hero. Enforce imagery grade uniformity.
```

### No image tool — CSS atmosphere only

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a landing for “Signal Yard”. Tone: nocturnal, radio, spare. Do not generate images — use CSS atmosphere from locked tokens for the hero. Still fill the imagery brief section as “fallback: CSS”.
```

---

## C. Revamp

### Live URL revamp

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then revamp our marketing homepage.

Current site: https://example.com
Keep: URL structure, section order (Hero → Features → Pricing → FAQ → Footer), and all existing copy.
Replace: visual system (palette, type, spacing) and add 2–3 tasteful motion effects.
Constraints: no purple-gradient SaaS look; must stay on-brand for a fintech trust audience.
Inspect the current page feel from my description / screenshots before locking tokens.
```

### In-repo page

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then revamp @src/pages/HomePage.jsx (and its main template if needed).

Keep: routing, component tree shape, and existing copy strings.
Replace: colors, typography, hero composition, and motion.
Tone: dark, cinematic, technical. Avoid AI-slop defaults (see anti-defaults).
```

### Multi-page unify

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then unify visual system across @src/pages/HomePage.jsx, @src/pages/PricingPage.jsx, and @src/pages/AboutPage.jsx.

Keep routes and copy. One shared theme tokens file — no per-page palette drift. Same type roles and 2–3 shared motion recipes site-wide.
```

### Partial restyle (one section)

```
Use the design-director skill. Plan first (brief + tokens + 1–2 effects). Partial restyle only: @src/pages/HomePage.jsx hero section. Keep below-the-fold as-is. Document the uniformity boundary in the brief (hero = new system; rest = legacy until later).
```

---

## D. Tokens-first

### Catalog slug evolve

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then restyle our landing page.

Base tokens on catalog slug `cursor` (run search-designs --slug cursor), but evolve them for a darker athletic product site — keep the orange primary energy, swap the cream canvas for near-black.
Keep existing section content in @src/pages/HomePage.jsx; only change the look and 2 micro-interactions.
```

### Local DESIGN.md

```
Use the design-director skill. Plan first. Start from @src/data/designs/prmpt/DESIGN.md as the token source, then adapt for a lighter editorial product launch page. Don’t write code until the brief is filled.
```

### Match a mood via search query

```
Use the design-director skill. Plan first. Run search-designs for “dark cinematic mono technical”, lock the best-fit slug, then build a product page for “Aperture Wire”. Tone: forensic, sleek, nocturnal. Then implement.
```

---

## E. Scope controls

### Plan only (no code)

```
Use the design-director skill. For a boutique running brand “Voltstride” — dark, athletic, editorial — write only the design brief (brief + tokens from search-designs + 2–3 effects from search-effects). Do not write any UI code yet.
```

### Light touch

```
Use the design-director skill. Plan first (brief + tokens + 1–2 effects). Light-touch restyle of @src/pages/HomePage.jsx: do not change layout or copy — only palette, typography, and 1–2 micro-interactions. Tone: confident, minimal, modern.
```

### Mobile-first

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a landing for “Pocket Ferry” transit app. Tone: civic, clear, daylight. Design and implement mobile-first at ~375px, then enhance desktop. Prefer tap-friendly motion; degrade cursor effects. Pass mobile guardrails before done.
```

### Brief + image prompts only (no code, no gen)

```
Use the design-director skill. Plan first for “Voltstride” — dark, athletic, editorial. Fill the brief including imagery section, but do not write UI code and do not call an image tool — emit Midjourney/Flux prompts for 1 hero + 2 supporting stills matching locked tokens.
```

---

## F. Effects already decided

**When:** Visual system is locked; you only need interaction recipes.

Do **not** use design-director. Use the sibling skill:

```
Use the portfolio-effects skill. Find a magnetic button and a scroll-linked marquee; give me React snippets and integrate them into @src/components/Hero.jsx.
```

---

## After updating skill docs

```bash
npx skills add shivtchandra/design-director -g -y
```

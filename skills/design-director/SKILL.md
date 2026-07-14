---
name: design-director
description: >-
  Plans visual direction for UIs and landing pages — mood, colors, fonts, layout,
  and motion — then queries real design-system and portfolio-effect catalogs.
  Use when building or restyling pages, picking a brand look, choosing palettes
  or typography, or when the user asks an agent to think through design before coding.
---

# Design Director

Autonomous design planning skill. **Plan before you code.** Pull tokens and motion recipes from searchable catalogs instead of inventing generic AI defaults.

## When to Apply

- User asks to build/restyle a landing page, portfolio, marketing site, or branded UI
- User wants help choosing colors, fonts, mood, or interaction style
- Brief is vague (“make it premium”, “dark and cinematic”, “brutalist”) and needs a locked direction

For **effects-only** retrieval (already know the palette), prefer the sibling `portfolio-effects` skill.

## Example prompts

Users get better results when they name this skill and say **plan first**. Full library (SaaS, unconventional poster/sticker flavors, revamp, imagery, …): [references/example-prompts.md](references/example-prompts.md).

```
Use the design-director skill. Design a landing page for a boutique running brand called “Voltstride” — dark, athletic, editorial. Plan first (brief + tokens + 2–3 effects), then build a single page.
```

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a landing for “Peel & Static” sticker club. Flavor: sticker-paste zine — die-cut collage, locked sticker palette, mixed display lettering. Intentional sticker exception; uniform site-wide.
```

```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then build a landing for “POST ROOM”. Flavor: oversized poster — type fills the hero; 2–3 spot colors only.
```

## Workflow (required order)

Copy and complete the checklist:

```
Design Director Progress:
- [ ] 1. Brief (5 bullets)
- [ ] 2. Direction (one sentence + anti-defaults check)
- [ ] 3. Tokens via search-designs
- [ ] 4. Motion via search-effects (2–4 max)
- [ ] 5. Write design brief artifact
- [ ] 6. Imagery (if needed)
- [ ] 7. Implement
- [ ] 8. Mobile / responsive guardrails
- [ ] 9. Site uniformity
```

### 1. Brief

Extract from the user (infer only what is obvious; ask only if blocked):

- Product / brand
- Audience
- Tone (3 adjectives max)
- Constraints (framework, light/dark, no video, etc.)
- Success look (one reference mood, not a full brand)

### 2. Direction

Pick **one** visual direction. Read [references/anti-defaults.md](references/anti-defaults.md) and reject banned clusters.

### 3. Tokens

Resolve script path relative to this skill folder:

```bash
node scripts/search-designs.js "<mood or brand keywords>"
node scripts/search-designs.js --slug <slug>          # full token dump
node scripts/search-designs.js "<query>" --tokens     # tokens for top hits
```

Rules:

- Prefer one catalog system as the base; remix only if the brief needs it
- Lock: canvas, ink, primary, 1–2 accents, display + body (+ mono if needed)
- Use open-licensed Google Fonts or system stacks when the catalog font is proprietary (note the substitution in the brief)

### 4. Motion

Skill-local search includes bundled HTML (all effects) and React snippets when available:

```bash
node scripts/search-effects.js "<interaction keywords>"
node scripts/search-effects.js --cat "Scroll" --complexity easy
node scripts/search-effects.js "24" --react
node scripts/search-effects.js "05" --html
```

In this widgets monorepo you can also use the root duplicate:

```bash
npm run search:effects -- "<id>" --react
```

Pick **2–4** effects that serve the brief. Do not stack every category. Prefer `--react` when present; otherwise use `--html` and adapt.

### 5. Design brief artifact

Before writing UI code, fill [references/brief-template.md](references/brief-template.md) (in chat or a short markdown file the user can see). Do not skip this step.

### 6. Imagery (if needed)

For landing / marketing / portfolio heroes, follow [references/imagery.md](references/imagery.md).

- Decide after tokens are locked whether a real visual anchor is required
- Budget: **1 full-bleed hero + up to 2 supporting** stills
- Generate with the host image tool when available; otherwise emit prompts or use CSS / brand-asset fallbacks
- Match locked palette and mood; no empty hero when imagery was required

### 7. Implement

Apply locked tokens as **global** CSS variables / Tailwind theme tokens — one theme entry for the whole page/site. Match the host project stack. Reuse that theme in every section; do not restyle components with one-off colors or fonts. Wire generated or fallback imagery into the hero (full-bleed). Wrap motion in `prefers-reduced-motion`. Never remove focus rings without a replacement.

### 8. Mobile / responsive guardrails

Required before calling the work done. See [references/mobile-guardrails.md](references/mobile-guardrails.md).

- Layout holds at ~375px width — **no horizontal scroll**
- Primary actions work without hover (`click` / `tap`); touch targets ≥ **44×44px**
- Body type stays readable on small screens; first viewport remains one clear composition
- Cursor / magnet / canvas-heavy effects **degrade or disable** on coarse pointers and under `prefers-reduced-motion`
- Fixed `100vh` heroes and sticky chrome must not hide content under mobile browser chrome

### 9. Site uniformity

Required. See [references/uniformity.md](references/uniformity.md).

- One locked system for the **entire** deliverable (not per-section vibes)
- Shared tokens for color, type, radius, spacing
- Motion limited to the brief’s 2–4 effects with a coherent feel
- Imagery grade matches the same system (no mid-page art-style hop)

## Quality bar

- One composition in the first viewport (not a dashboard) unless asked for a dashboard
- Brand or product name is hero-level when it is a branded page
- Animate `transform` / `opacity`; avoid layout thrash
- Sound only after a user gesture
- Pass the mobile / responsive checklist above
- **One visual system across the site** — no section-level palette/font/motion drift
- **No empty hero** when imagery was required; gens or fallbacks match the locked palette

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/search-designs.js` | Search ~74 design systems (colors, type) |
| `scripts/search-effects.js` | Search ~71 effect recipes + print HTML/React snippets |
| `scripts/build-indexes.js` | Regenerate JSON indexes (designs + effects + snippets) from this repo’s sources |

## Additional resources

- [references/example-prompts.md](references/example-prompts.md)
- [references/brief-template.md](references/brief-template.md)
- [references/anti-defaults.md](references/anti-defaults.md)
- [references/mobile-guardrails.md](references/mobile-guardrails.md)
- [references/uniformity.md](references/uniformity.md)
- [references/imagery.md](references/imagery.md)

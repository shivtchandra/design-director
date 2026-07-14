# Site uniformity

The locked brief is **one system for the whole deliverable**. Do not invent a new palette, type stack, radius, or motion language per section.

## Rules

1. **One source** — Base the entire page/site on the locked `search-designs` system (or explicit remix named in the brief). No mid-page brand switches.
2. **Shared tokens** — Put canvas, ink, primary, accents, fonts, radius, and spacing on CSS variables / theme tokens. Components consume tokens — no one-off hex or random `font-family` in leaf components.
3. **Fixed type roles** — Display / body / (optional) mono only. Do not introduce a third display face halfway down the page.
4. **Consistent spacing & radius** — Use the same scale section-to-section (padding, gaps, corner radii).
5. **Coherent motion** — Stick to the brief’s 2–4 effects and similar easing/duration family. Do not stack unrelated interaction styles on every block.
6. **Imagery grade** — Generated or chosen images share one lighting/grade language with the locked tokens (see [imagery.md](imagery.md)). No second art style mid-page.
7. **Revamps** — Apply the locked system across touched surfaces. Do not leave half the page on the old look unless the user asked for a **partial** restyle (then document the boundary).

## Anti-patterns

- Hero in System A, footer in System B
- New accent color “just for this card”
- Mixing Inter + three display serifs without a brief reason
- Different button radii / shadows in every section
- Magnetic cursor in one block, glitch type in another, vinyl scratch elsewhere with no shared language

## Quick check

```
Uniformity:
- [ ] One catalog source / locked remix named in the brief
- [ ] Theme tokens used site-wide (no stray hex/fonts)
- [ ] Type roles unchanged across sections
- [ ] Spacing + radius scale consistent
- [ ] Motion set limited to the brief’s 2–4 effects
- [ ] Imagery grade matches the locked system (if used)
```

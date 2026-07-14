# Imagery

Optional step **after tokens are locked**. Landing and portfolio pages need a real visual anchor — not empty gray boxes or generic purple gradients.

## When

- **Do:** marketing / landing / portfolio heroes and product atmosphere
- **Skip:** pure dashboards, admin docs, or when the user supplies brand photography
- **Ask** only if imagery need is unclear and it blocks a finished-looking hero

## Budget

- **1 full-bleed hero** + **up to 2 supporting** stills unless the user asks for more
- Prefer one coherent art direction over a collage of styles

## After tokens

Image briefs must include locked mood + palette cues (canvas / primary hex or named grade) so generations match the system:

- Subject (product, place, material, or abstract atmosphere)
- Lighting / grade (tied to brief tone)
- Aspect (hero often `16:9` or `21:9`; avoid tiny squares for heroes)
- What to avoid (stock crowds, glow purple UI chrome, random faces unless people are in the brief)

## Tooling

1. If the agent has an image-generation tool, invoke it with the brief above and save assets into the project.
2. If not, emit Midjourney / Flux–style prompts (copy-paste ready) for the user and wait or use fallbacks.
3. **Fallback:** thematic CSS gradient / pattern from locked tokens, or ask for brand assets — never broken `<img>` srcs or “lorem image” placeholders.

## Composition & a11y

- Hero media is an **edge-to-edge** visual plane (not an inset rounded card in the first viewport by default)
- No detached badges / promo stickers over hero media
- Meaningful `alt` for content images; empty `alt` when decorative
- `max-width: 100%`; plan a sensible mobile crop

## Uniformity

Same lighting and grade language across all gens. Do not introduce a second art style mid-page. See [uniformity.md](uniformity.md).

## Quick check

```
Imagery:
- [ ] Needed? If yes, hero brief written after tokens locked
- [ ] Budget respected (1 hero + ≤2 supporting)
- [ ] Palette / mood embedded in prompts or gens
- [ ] Tool used OR prompts emitted OR CSS/brand fallback
- [ ] Alt text + responsive; no broken placeholders
```

# Anti-Defaults

Hard bans for AI-generic looks. If the brief drifts toward these, pick a sharper direction from `search-designs` instead.

## Banned visual clusters

1. **Purple-on-white / purple-to-indigo gradient tech themes** — default SaaS AI look
2. **Warm cream canvas (~#F4F1EA) + high-contrast serif + terracotta accent** — default “editorial AI” look (allowed only when the brief explicitly asks for warm brutalist / Monolith-like architecture)
3. **Broadsheet newspaper layout** — hairline rules, zero radius, dense multi-column news aesthetic as a default

## Also avoid unless asked

- Flat single-color backgrounds with no atmosphere
- Default stacks only: Inter, Roboto, Arial, system-ui as the entire brand voice
- Dark mode “because it looks cool”
- Glow / neon purple borders, rounded-full pill clusters, multi-layer soft shadows as decoration
- Emoji as design
- Cards in the hero; card-grid dashboards for marketing heroes
- Detached badges, floating promo stickers, or info chips over hero media
- Stats strips, schedule snippets, and secondary promo blocks in the first viewport

## Prefer

- One clear visual direction grounded in a catalog system (`search-designs`)
- Expressive, purposeful type (from catalog or deliberate Google Font substitutes)
- Atmosphere: gradients, photography, texture, or pattern — not empty white/black alone
- Motion that earns its place (2–4 effects) with reduced-motion fallbacks
- Layouts that hold at ~375px without hover-only primary actions (see mobile-guardrails.md)

## Intentional exceptions

Sticker-paste, oversized poster type, utility signage, receipt/blueprint/scoreboard, broadsheet-as-concept, and similar looks are **allowed only when the user prompt or brief names that flavor**. Document the exception in the brief; still enforce [uniformity.md](uniformity.md) (one system site-wide) and [mobile-guardrails.md](mobile-guardrails.md). See example-prompts **section G**.

Without an explicit flavor name, the bans above still apply.

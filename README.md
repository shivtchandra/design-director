# Design Director

**Agent skill:** plan mood → colors → fonts → motion from real catalogs, then ship UI code — instead of inventing purple-gradient defaults.

Installable via [`npx skills`](https://github.com/vercel-labs/skills) for Cursor, Claude Code, Codex, and 60+ agents.

## Install

```bash
npx skills add shivtchandra/design-director -g
```

List what’s in the package:

```bash
npx skills add shivtchandra/design-director --list
```

Skills included:

| Skill | Role |
|-------|------|
| `design-director` | Full visual planning + token/effect search + HTML/React snippets |
| `portfolio-effects` | Effects-only retrieval when the look is already locked |

## Why this exists

Most design skills are prose (“be tasteful”, “audit against guidelines”).  
**Design Director ships data + CLIs:**

- ~74 design systems (colors, fonts) searchable by mood/brand  
- ~71 portfolio motion recipes with **bundled HTML (all) + React (many) snippets**  
- A forced plan-first workflow (brief → tokens → 2–4 effects → implement)

Use alongside Anthropic `frontend-design` or Vercel `web-design-guidelines` — those guide taste/review; this locks concrete tokens and interactions.

## Example prompts

**New landing page**
```
Use the design-director skill. Design a landing page for a boutique running brand called “Voltstride” — dark, athletic, editorial. Plan first (brief + tokens + 2–3 effects), then build a single page.
```

**Revamp an existing page**
```
Use the design-director skill. Plan first (brief + tokens + 2–3 effects), then revamp @src/pages/HomePage.jsx. Keep routing and copy; replace palette, type, and motion. Tone: dark, cinematic, technical.
```

More recipes (plan-only, light touch, live-site revamp):  
[`skills/design-director/references/example-prompts.md`](skills/design-director/references/example-prompts.md)

## CLI (after install)

Resolve paths relative to the installed skill folder (e.g. `~/.agents/skills/design-director/`):

```bash
node scripts/search-designs.js "dark cinematic"
node scripts/search-designs.js --slug cursor

node scripts/search-effects.js "magnetic"
node scripts/search-effects.js "24" --react
node scripts/search-effects.js "05" --html
```

Indexes and snippets ship in `scripts/data/` — no monorepo required at runtime.

## Discoverability

Once installs appear on [skills.sh](https://skills.sh), this package will show in Design & UI rankings via the open agent skills ecosystem.

## License

MIT — see [LICENSE](LICENSE).

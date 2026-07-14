# Mobile / responsive guardrails

Short mandatory checks. Not a full responsive curriculum — stop desktop-only shipping.

## Must pass

1. **~375px width** — no horizontal overflow; images/videos `max-width: 100%`
2. **Touch** — primary CTAs work with tap; targets ≥ 44×44px; ≥ 8px gap between controls
3. **No hover-only UX** — never make the only path to navigate/submit a hover state; fine as enhancement
4. **Type** — body readable on small screens (avoid tiny locked desktop sizes); avoid multi-column text that collapses unreadably
5. **First viewport** — still one composition on mobile: brand, headline, support line, CTA — not a jammed dashboard
6. **Motion** — wrap complex animation in `prefers-reduced-motion`; disable or simplify cursor/magnetic/canvas trails when `(pointer: coarse)` or no fine pointer
7. **Viewport chrome** — beware `100vh` and sticky headers covering content on iOS; prefer `min-height` + safe padding where needed
8. **Focus** — keep visible focus rings; overlays dismissible with Escape and usable with keyboard where interactive

## Effect selection on mobile

Prefer scroll/CSS/tap-friendly recipes over desktop cursor spectacles when the brief is phone-first. If a cursor effect is iconic, keep it for fine pointers and provide a static or tap alternative for coarse pointers.

## Quick self-check

```
Mobile check:
- [ ] 375px: no horizontal scroll
- [ ] CTAs tappable; targets ≥ 44px
- [ ] No hover-only primary path
- [ ] Reduced-motion + coarse-pointer fallbacks for fancy motion
- [ ] Hero readable without pinching
```

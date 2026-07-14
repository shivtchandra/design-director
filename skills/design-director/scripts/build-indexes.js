#!/usr/bin/env node
/**
 * Build slim JSON indexes for the design-director skill (self-contained).
 *
 * Usage (from repo root):
 *   node skills/design-director/scripts/build-indexes.js
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const ROOT = join(__dirname, '..', '..', '..');

mkdirSync(DATA_DIR, { recursive: true });

function fontFamilies(typography = {}) {
  const set = new Set();
  for (const value of Object.values(typography)) {
    if (value && typeof value === 'object' && value.fontFamily) {
      const primary = String(value.fontFamily).split(',')[0].replace(/['"]/g, '').trim();
      if (primary) set.add(primary);
    }
  }
  return [...set];
}

function pickColors(colors = {}) {
  const keys = [
    'primary', 'canvas', 'ink', 'body', 'muted', 'accent',
    'surface', 'surface-soft', 'surface-card', 'on-primary', 'border',
  ];
  const out = {};
  for (const k of keys) {
    if (colors[k]) out[k] = colors[k];
  }
  if (Object.keys(out).length < 4) {
    for (const [k, v] of Object.entries(colors)) {
      if (!(k in out) && typeof v === 'string' && v.startsWith('#')) {
        out[k] = v;
        if (Object.keys(out).length >= 8) break;
      }
    }
  }
  return out;
}

async function buildDesigns() {
  const catalogUrl = pathToFileURL(join(ROOT, 'src/data/designsCatalog.js')).href;
  const { designs } = await import(catalogUrl);

  const index = designs.map((d) => {
    const p = d.parsed || {};
    const meta = p.meta || {};
    return {
      slug: d.slug,
      name: meta.name || d.slug,
      description: meta.description || '',
      colors: pickColors(p.colors || {}),
      fonts: fontFamilies(p.typography || {}),
      spacing: p.spacing || {},
      rounded: p.rounded || {},
    };
  });

  const outPath = join(DATA_DIR, 'designs-index.json');
  writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), total: index.length, designs: index }, null, 2));
  console.log(`✓ designs-index.json (${index.length} systems) → ${outPath}`);
}

async function buildEffects() {
  const metaUrl = pathToFileURL(join(ROOT, 'src/effectsMeta.js')).href;
  const htmlUrl = pathToFileURL(join(ROOT, 'src/effectsSnippets.js')).href;
  const reactUrl = pathToFileURL(join(ROOT, 'src/reactSnippets.js')).href;

  const { EFFECTS } = await import(metaUrl);
  const { EFFECT_SNIPPETS } = await import(htmlUrl);
  const { REACT_SNIPPETS } = await import(reactUrl);

  const htmlMap = {};
  const reactMap = {};
  for (const [k, v] of Object.entries(EFFECT_SNIPPETS || {})) {
    if (typeof v === 'string') htmlMap[k] = v;
  }
  for (const [k, v] of Object.entries(REACT_SNIPPETS || {})) {
    if (typeof v === 'string') reactMap[k] = v;
  }

  const index = EFFECTS.map((e) => ({
    n: e.n,
    cat: e.cat,
    complexity: e.complexity,
    title: e.title,
    tech: e.tech || [],
    desc: e.desc || '',
    example: e.example || '',
    isNew: !!e.isNew,
    hasHtml: !!htmlMap[e.n],
    hasReact: !!reactMap[e.n],
  }));

  const generatedAt = new Date().toISOString();

  const indexPath = join(DATA_DIR, 'effects-index.json');
  writeFileSync(indexPath, JSON.stringify({ generatedAt, total: index.length, effects: index }, null, 2));
  console.log(`✓ effects-index.json (${index.length} effects) → ${indexPath}`);

  const htmlPath = join(DATA_DIR, 'effects-html.json');
  writeFileSync(htmlPath, JSON.stringify({ generatedAt, total: Object.keys(htmlMap).length, snippets: htmlMap }, null, 2));
  console.log(`✓ effects-html.json (${Object.keys(htmlMap).length} snippets) → ${htmlPath}`);

  const reactPath = join(DATA_DIR, 'effects-react.json');
  writeFileSync(reactPath, JSON.stringify({ generatedAt, total: Object.keys(reactMap).length, snippets: reactMap }, null, 2));
  console.log(`✓ effects-react.json (${Object.keys(reactMap).length} snippets) → ${reactPath}`);
}

await buildDesigns();
await buildEffects();
console.log('Done.');

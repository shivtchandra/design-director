#!/usr/bin/env node
/**
 * Design Director — design systems search
 *
 * Usage:
 *   node scripts/search-designs.js "<query>"
 *   node scripts/search-designs.js "<query>" --tokens
 *   node scripts/search-designs.js --slug airbnb
 *   node scripts/search-designs.js --help
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INDEX_PATH = join(__dirname, 'data', 'designs-index.json');

const args = process.argv.slice(2);
const flags = {
  query: [],
  slug: null,
  tokens: false,
  limit: 8,
  help: false,
};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--help' || arg === '-h') {
    flags.help = true;
  } else if (arg === '--slug' || arg === '-s') {
    flags.slug = args[++i];
  } else if (arg === '--tokens' || arg === '-t') {
    flags.tokens = true;
  } else if (arg === '--limit' || arg === '-n') {
    flags.limit = parseInt(args[++i], 10) || 8;
  } else if (arg.startsWith('-')) {
    console.error(`Unknown flag: ${arg}. Use -h for help.`);
    process.exit(1);
  } else {
    flags.query.push(arg);
  }
}

const queryStr = flags.query.join(' ').trim().toLowerCase();

if (flags.help || (args.length === 0 && !flags.slug)) {
  console.log(`
Design Director — Design Systems Search
=======================================
Usage:
  node scripts/search-designs.js "<query>" [options]
  node scripts/search-designs.js --slug <slug>

Options:
  -s, --slug <slug>   Dump one system by slug
  -t, --tokens        Include color/font tokens for matches
  -n, --limit <n>     Max results (default 8)
  -h, --help          Show help

Examples:
  node scripts/search-designs.js "brutalist editorial"
  node scripts/search-designs.js "dark cinematic" --tokens
  node scripts/search-designs.js --slug cursor
`);
  process.exit(0);
}

if (!existsSync(INDEX_PATH)) {
  console.error(`Missing ${INDEX_PATH}\nRun: node scripts/build-indexes.js (from repo root)`);
  process.exit(1);
}

const { designs } = JSON.parse(readFileSync(INDEX_PATH, 'utf8'));

function scoreDesign(d, terms) {
  const blob = [
    d.slug,
    d.name,
    d.description,
    ...(d.fonts || []),
    ...Object.keys(d.colors || {}),
    ...Object.values(d.colors || {}),
  ].join(' ').toLowerCase();

  let score = 0;
  for (const term of terms) {
    if (!term || term.length < 2) continue;
    if (d.slug === term) score += 50;
    if (d.slug.includes(term)) score += 20;
    if ((d.name || '').toLowerCase().includes(term)) score += 10;
    const matches = blob.split(term).length - 1;
    score += matches * 3;
    // Soft stem: match term prefixes inside words (e.g. brutal → brutalist)
    if (term.length >= 4) {
      const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\w*`, 'gi');
      const soft = blob.match(re);
      if (soft) score += soft.length * 2;
    }
  }
  return score;
}

function printDesign(d, withTokens) {
  console.log(`### ${d.slug}`);
  console.log(`- **Name:** ${d.name}`);
  if (d.description) {
    const short = d.description.length > 280 ? d.description.slice(0, 277) + '…' : d.description;
    console.log(`- **Description:** ${short}`);
  }
  const primary = d.colors?.primary || d.colors?.ink || '—';
  const canvas = d.colors?.canvas || '—';
  console.log(`- **Primary / canvas:** ${primary} / ${canvas}`);
  console.log(`- **Fonts:** ${(d.fonts || []).join(', ') || '—'}`);
  if (withTokens) {
    console.log(`- **Colors:**`);
    console.log('```json');
    console.log(JSON.stringify(d.colors || {}, null, 2));
    console.log('```');
    if (d.fonts?.length) {
      console.log(`- **Font families:** ${d.fonts.join(' | ')}`);
    }
    if (d.spacing && Object.keys(d.spacing).length) {
      console.log(`- **Spacing keys:** ${Object.keys(d.spacing).join(', ')}`);
    }
    if (d.rounded && Object.keys(d.rounded).length) {
      console.log(`- **Rounded:** ${JSON.stringify(d.rounded)}`);
    }
  }
  console.log();
}

if (flags.slug) {
  const hit = designs.find((d) => d.slug === flags.slug.toLowerCase());
  if (!hit) {
    console.log(`No design system with slug "${flags.slug}".`);
    const near = designs.filter((d) => d.slug.includes(flags.slug.toLowerCase())).slice(0, 10);
    if (near.length) {
      console.log('Did you mean:');
      near.forEach((d) => console.log(`  - ${d.slug}`));
    }
    process.exit(0);
  }
  printDesign(hit, true);
  process.exit(0);
}

const terms = queryStr.split(/\s+/).filter(Boolean);
const ranked = designs
  .map((d) => ({ d, score: scoreDesign(d, terms) }))
  .filter((x) => x.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, flags.limit);

if (ranked.length === 0) {
  console.log('No design systems matched your query.');
  process.exit(0);
}

console.log(`## Design Systems (${ranked.length} shown)\n`);
if (!flags.tokens) {
  console.log('| Slug | Primary | Fonts | Score |');
  console.log('|---|---|---|---|');
  ranked.forEach(({ d, score }) => {
    const primary = d.colors?.primary || d.colors?.ink || '—';
    const fonts = (d.fonts || []).slice(0, 2).join(', ') || '—';
    console.log(`| ${d.slug} | ${primary} | ${fonts} | ${score} |`);
  });
  console.log(`\nRe-run with --tokens or --slug <slug> for full token dumps.`);
} else {
  ranked.forEach(({ d }) => printDesign(d, true));
}

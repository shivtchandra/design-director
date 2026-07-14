#!/usr/bin/env node
/**
 * Design Director — portfolio effects search (meta + bundled snippets)
 *
 * Usage:
 *   node scripts/search-effects.js "<query>"
 *   node scripts/search-effects.js "24" --react
 *   node scripts/search-effects.js "05" --html
 *   node scripts/search-effects.js --cat "Cursor" --complexity easy
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INDEX_PATH = join(__dirname, 'data', 'effects-index.json');
const HTML_PATH = join(__dirname, 'data', 'effects-html.json');
const REACT_PATH = join(__dirname, 'data', 'effects-react.json');

const args = process.argv.slice(2);
const flags = {
  query: [],
  cat: null,
  tech: null,
  complexity: null,
  showHtml: false,
  showReact: false,
  help: false,
};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--help' || arg === '-h') {
    flags.help = true;
  } else if (arg === '--cat' || arg === '-c') {
    flags.cat = args[++i];
  } else if (arg === '--tech' || arg === '-t') {
    flags.tech = args[++i];
  } else if (arg === '--complexity' || arg === '-x') {
    flags.complexity = args[++i];
  } else if (arg === '--html' || arg === '-s') {
    flags.showHtml = true;
  } else if (arg === '--react' || arg === '-r') {
    flags.showReact = true;
  } else if (arg.startsWith('-')) {
    console.error(`Unknown flag: ${arg}. Use -h for help.`);
    process.exit(1);
  } else {
    flags.query.push(arg);
  }
}

const queryStr = flags.query.join(' ').trim().toLowerCase();

if (flags.help || (args.length === 0 && !flags.cat && !flags.tech && !flags.complexity)) {
  console.log(`
Design Director — Portfolio Effects Search
==========================================
Usage:
  node scripts/search-effects.js "<query>" [options]

Options:
  -c, --cat <category>       Text & Type, Scroll, Cursor, Card / Object,
                             Ambient, Audio, Loading, Navigation, Easter Egg
  -t, --tech <tech>          e.g. Canvas, CSS, Framer Motion
  -x, --complexity <level>   easy | medium | hard
  -s, --html                 Output HTML/CSS/JS snippet(s)
  -r, --react                Output React snippet(s) when available
  -h, --help

Examples:
  node scripts/search-effects.js "magnetic"
  node scripts/search-effects.js "24" --react
  node scripts/search-effects.js "05" --html
  node scripts/search-effects.js --cat "Scroll" --complexity easy
`);
  process.exit(0);
}

function loadJson(path) {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
}

if (!existsSync(INDEX_PATH)) {
  console.error(`Missing ${INDEX_PATH}\nRun: node scripts/build-indexes.js (from repo root)`);
  process.exit(1);
}

const { effects } = JSON.parse(readFileSync(INDEX_PATH, 'utf8'));
const htmlBundle = loadJson(HTML_PATH);
const reactBundle = loadJson(REACT_PATH);
const htmlSnippets = htmlBundle?.snippets || {};
const reactSnippets = reactBundle?.snippets || {};

const results = effects.filter((effect) => {
  if (queryStr) {
    // Pure numeric / zero-padded IDs match by effect number only
    const idOnly = /^\d{1,3}$/.test(queryStr);
    if (idOnly) {
      const numberMatch = effect.n === queryStr || effect.n === queryStr.padStart(2, '0');
      const numberIntMatch = parseInt(effect.n, 10) === parseInt(queryStr, 10);
      return numberMatch || numberIntMatch;
    }
    const titleMatch = effect.title?.toLowerCase().includes(queryStr);
    const descMatch = effect.desc?.toLowerCase().includes(queryStr);
    const exampleMatch = effect.example?.toLowerCase().includes(queryStr);
    const techMatch = effect.tech?.some((t) => t.toLowerCase().includes(queryStr));
    if (!titleMatch && !descMatch && !exampleMatch && !techMatch) {
      return false;
    }
  }
  if (flags.cat && !effect.cat?.toLowerCase().includes(flags.cat.toLowerCase())) return false;
  if (flags.tech) {
    const techSearch = flags.tech.toLowerCase();
    if (!effect.tech?.some((t) => t.toLowerCase().includes(techSearch))) return false;
  }
  if (flags.complexity && effect.complexity?.toLowerCase() !== flags.complexity.toLowerCase()) {
    return false;
  }
  return true;
});

if (results.length === 0) {
  console.log('No portfolio effects matched your query.');
  process.exit(0);
}

function printSnippet(effect, { forceHtml, forceReact }) {
  console.log(`### ${effect.n}. ${effect.title} (${effect.cat})`);
  console.log(`- **Description:** ${effect.desc}`);
  console.log(`- **Example:** ${effect.example}`);
  console.log(`- **Technology:** ${effect.tech?.join(', ')}`);
  console.log(`- **Complexity:** ${effect.complexity}`);
  console.log(`- **Snippets:** HTML ${effect.hasHtml ? 'yes' : 'no'} · React ${effect.hasReact ? 'yes' : 'no'}`);
  console.log();

  const wantHtml = forceHtml || (!forceReact && results.length === 1);
  const wantReact = forceReact || (results.length === 1 && !forceHtml);

  if (wantHtml || (forceReact && !reactSnippets[effect.n])) {
    const html = htmlSnippets[effect.n];
    if (html) {
      console.log(`#### Standalone HTML/CSS/JS`);
      console.log('```html');
      console.log(html);
      console.log('```\n');
    } else if (forceHtml) {
      console.log('*(No HTML snippet for this effect)*\n');
    }
  }

  if (wantReact) {
    const react = reactSnippets[effect.n];
    if (react) {
      console.log(`#### React Hook/Component`);
      console.log('```jsx');
      console.log(react);
      console.log('```\n');
    } else if (forceReact) {
      console.log('*(No React snippet — HTML shown above if available. Adapt or use HTML.)*\n');
    }
  }
}

const detailMode = flags.showHtml || flags.showReact || results.length === 1;

if (!detailMode) {
  console.log(`## Effects (${results.length} matched)\n`);
  console.log('| ID | Category | Title | Tech | Complexity | HTML | React |');
  console.log('|---|---|---|---|---|---|---|');
  results.forEach((e) => {
    console.log(`| ${e.n} | ${e.cat} | ${e.title} | ${e.tech?.join(', ')} | ${e.complexity} | ${e.hasHtml ? '✓' : '—'} | ${e.hasReact ? '✓' : '—'} |`);
  });
  console.log(`\nRe-run with a single ID, or --html / --react, to print snippets.`);
} else {
  console.log(`## Effects (${results.length} matched)\n`);
  results.forEach((effect) => {
    printSnippet(effect, { forceHtml: flags.showHtml, forceReact: flags.showReact });
  });
}

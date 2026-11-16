import fs from 'node:fs';
import path from 'node:path';
import { loadDesignSystemTokens } from '../src/design-system/tokens.ts';
import { COMPONENT_REGISTRY } from '../src/design-system/registry.ts';

const ROOT = process.cwd();
let failures = 0;

function fail(msg) {
  console.error(`[FAIL] ${msg}`);
  failures++;
}

function pass(msg) {
  console.log(`[PASS] ${msg}`);
}

// 1. Check every .tsx file in src/components/ (excluding src/components/design-system/)
//    is referenced by sourcePath in src/design-system/registry.ts
const componentsDir = path.join(ROOT, 'src', 'components');
function walkTsx(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      if (rel === 'src/components/design-system') continue;
      results.push(...walkTsx(full));
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      results.push(rel);
    }
  }
  return results;
}

const componentFiles = walkTsx(componentsDir).sort();
const registeredPaths = new Set(COMPONENT_REGISTRY.map((c) => c.sourcePath));

const missingComponents = componentFiles.filter((f) => !registeredPaths.has(f));
if (missingComponents.length > 0) {
  fail(
    `Unregistered component files in src/components/: ${missingComponents.join(', ')}`
  );
} else {
  pass(
    `All ${componentFiles.length} component files in src/components/ are registered in COMPONENT_REGISTRY.`
  );
}

// 2. Check every --* CSS custom property defined in brand/tokens-color.css
//    is parsed and included in loadDesignSystemTokens() output
const colorCss = fs.readFileSync(path.join(ROOT, 'brand', 'tokens-color.css'), 'utf8');
const strippedCss = colorCss.replace(/\/\*[\s\S]*?\*\//g, '');
const cssVarsInFile = new Set();
const varRegex = /(--[a-zA-Z0-9_-]+)\s*:/g;
let match;
while ((match = varRegex.exec(strippedCss)) !== null) {
  cssVarsInFile.add(match[1]);
}

const payload = loadDesignSystemTokens();
const parsedVars = new Set([
  ...payload.primitives.map((p) => p.name),
  ...Object.keys(payload.semanticDefaults),
  ...Object.values(payload.surfaces).flatMap((s) => Object.keys(s.tokens)),
  ...payload.allColorCssVars,
]);

const missingVars = [...cssVarsInFile].filter((v) => !parsedVars.has(v));
if (missingVars.length > 0) {
  fail(
    `CSS custom properties in brand/tokens-color.css missing from tokens.ts output: ${missingVars.join(', ')}`
  );
} else {
  pass(
    `All ${cssVarsInFile.size} CSS custom properties in brand/tokens-color.css are parsed by tokens.ts.`
  );
}

// 3. Grep src/ and public/ to ensure ZERO links/hrefs to /design-system exist anywhere
function walkAllFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkAllFiles(full));
    } else if (entry.isFile()) {
      results.push(full);
    }
  }
  return results;
}

const searchTargets = [
  ...walkAllFiles(path.join(ROOT, 'src')),
  ...walkAllFiles(path.join(ROOT, 'public')),
];

const linkMatches = [];
const linkPattern = /(?:href|to|pathname|url)\s*[:=]\s*['"`][^'"`]*\/design-system|['"`]\/design-system['"`]/i;

for (const filePath of searchTargets) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  // Ignore the route file itself and next-env/binary files
  if (/\.(png|jpg|jpeg|webp|avif|woff2|ico)$/i.test(rel)) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  lines.forEach((line, idx) => {
    if (linkPattern.test(line)) {
      linkMatches.push(`${rel}:${idx + 1}: ${line.trim()}`);
    }
  });
}

if (linkMatches.length > 0) {
  fail(
    `Found forbidden reference/link to /design-system in src/ or public/:\n  ${linkMatches.join('\n  ')}`
  );
} else {
  pass('Zero links or hrefs to /design-system found in src/ or public/.');
}

if (failures > 0) {
  console.error(`\nds:check failed with ${failures} error(s).`);
  process.exit(1);
}

console.log('\nds:check passed (100%).');
process.exit(0);

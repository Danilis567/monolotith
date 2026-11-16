import fs from 'node:fs';
import path from 'node:path';

function parseHexColor(hex: string): [number, number, number] | null {
  const clean = hex.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return [r, g, b];
  }
  if (/^[0-9a-fA-F]{6}$/.test(clean)) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return [r, g, b];
  }
  return null;
}

function computeRelativeLuminance(hex: string): number {
  const rgb = parseHexColor(hex);
  if (!rgb) return 0;
  const [r8, g8, b8] = rgb;
  const toLinear = (c8: number) => {
    const s = c8 / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r8) + 0.7152 * toLinear(g8) + 0.0722 * toLinear(b8);
}

export type SurfaceIslandId = 'void' | 'basalt' | 'plaster' | 'limestone';

export interface PrimitiveToken {
  name: string;
  value: string;
  comment: string;
  group: 'concrete' | 'vermilion' | 'other';
  luminance: number | null;
}

export interface SemanticTokenEntry {
  name: string;
  rawValue: string;
  resolvedValue: string;
  comment: string;
}

export interface SurfaceIslandTokens {
  id: SurfaceIslandId;
  label: string;
  colorScheme: 'dark' | 'light';
  selector: string;
  tokens: Record<string, SemanticTokenEntry>;
}

export interface TypographyRoleToken {
  role: string;
  selector: string;
  fontFamily: string;
  fontSizeToken: string | null;
  fontSizeValue: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  textTransform: string;
  fontStyle: string;
}

export interface LayoutToken {
  name: string;
  value: string;
  category: 'grid' | 'header' | 'type-scale';
}

export interface DesignSystemTokensPayload {
  primitives: PrimitiveToken[];
  primitiveMap: Record<string, string>;
  semanticDefaults: Record<string, SemanticTokenEntry>;
  surfaces: Record<SurfaceIslandId, SurfaceIslandTokens>;
  typographyRoles: TypographyRoleToken[];
  layoutTokens: LayoutToken[];
  allColorCssVars: string[];
}

function stripCssComments(input: string): string {
  return input.replace(/\/\*[\s\S]*?\*\//g, '');
}

/**
 * Extracts declarations (`--var: val;`) and optional trailing inline comments
 * from a specific CSS rule block body.
 */
function parseDeclarationsFromBlock(blockBody: string): Array<{
  name: string;
  value: string;
  comment: string;
}> {
  const results: Array<{ name: string; value: string; comment: string }> = [];
  const lines = blockBody.split(/\r?\n/);
  for (const rawLine of lines) {
    const commentMatch = rawLine.match(/\/\*(.*?)\*\//);
    const comment = commentMatch ? commentMatch[1].trim() : '';
    const lineWithoutComments = rawLine.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    const declMatch = lineWithoutComments.match(/^(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);/);
    if (declMatch) {
      results.push({
        name: declMatch[1].trim(),
        value: declMatch[2].trim(),
        comment,
      });
    }
  }
  return results;
}

/**
 * Finds the body of the first CSS rule matching `selectorRegex` (outside @media / @supports).
 */
function extractTopLevelRuleBlock(css: string, selectorExact: string): string {
  // Walk braces at depth 0 so we don't accidentally match inside @media / @supports
  let i = 0;
  while (i < css.length) {
    // Skip comments
    if (css[i] === '/' && css[i + 1] === '*') {
      const endComment = css.indexOf('*/', i + 2);
      i = endComment === -1 ? css.length : endComment + 2;
      continue;
    }

    const openBrace = css.indexOf('{', i);
    if (openBrace === -1) break;

    const header = stripCssComments(css.slice(i, openBrace)).trim();
    // Find matching closing brace
    let depth = 1;
    let j = openBrace + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === '/' && css[j + 1] === '*') {
        const endC = css.indexOf('*/', j + 2);
        j = endC === -1 ? css.length : endC + 2;
        continue;
      }
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }

    const body = css.slice(openBrace + 1, j - 1);
    const normalizedHeader = header.replace(/\s+/g, ' ').trim();
    if (normalizedHeader === selectorExact) {
      return body;
    }

    i = j;
  }
  return '';
}

function resolveCssVarValue(rawValue: string, lookup: Record<string, string>): string {
  const varMatch = rawValue.match(/^var\((--[a-zA-Z0-9_-]+)\)$/);
  if (varMatch && lookup[varMatch[1]]) {
    return lookup[varMatch[1]];
  }
  return rawValue;
}

function parseRulePropertyMap(blockBody: string): Record<string, string> {
  const clean = stripCssComments(blockBody);
  const map: Record<string, string> = {};
  for (const part of clean.split(';')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    const prop = trimmed.slice(0, colonIdx).trim();
    const val = trimmed.slice(colonIdx + 1).trim();
    if (prop) {
      map[prop] = val;
    }
  }
  return map;
}

const SURFACE_META: Array<{
  id: SurfaceIslandId;
  label: string;
  colorScheme: 'dark' | 'light';
  selector: string;
}> = [
  {
    id: 'void',
    label: 'Void Concrete',
    colorScheme: 'dark',
    selector: '[data-surface="dark"], [data-surface="void"]',
  },
  {
    id: 'basalt',
    label: 'Basalt',
    colorScheme: 'dark',
    selector: '[data-surface="basalt"]',
  },
  {
    id: 'plaster',
    label: 'Raw Plaster',
    colorScheme: 'light',
    selector: '[data-surface="light"], [data-surface="plaster"]',
  },
  {
    id: 'limestone',
    label: 'Limestone',
    colorScheme: 'light',
    selector: '[data-surface="limestone"]',
  },
];

const TYPOGRAPHY_SELECTORS = [
  { role: 'Monolith', selector: '.type-monolith' },
  { role: 'Display', selector: '.type-display' },
  { role: 'Quote', selector: '.type-quote' },
  { role: 'Subhead', selector: '.type-subhead' },
  { role: 'Body Lead', selector: '.type-body-lead' },
  { role: 'Body', selector: '.type-body' },
  { role: 'UI Label', selector: '.type-ui-label' },
  { role: 'Colophon', selector: '.type-colophon' },
];

export function loadDesignSystemTokens(): DesignSystemTokensPayload {
  const rootDir = process.cwd();
  const colorCssPath = path.join(rootDir, 'brand', 'tokens-color.css');
  const globalsCssPath = path.join(rootDir, 'src', 'app', 'globals.css');

  const colorCss = fs.readFileSync(colorCssPath, 'utf8');
  const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');

  // Collect every --* custom property declared anywhere in brand/tokens-color.css
  const allVarSet = new Set<string>();
  const varDeclRegex = /(--[a-zA-Z0-9_-]+)\s*:/g;
  let m: RegExpExecArray | null;
  while ((m = varDeclRegex.exec(stripCssComments(colorCss))) !== null) {
    allVarSet.add(m[1]);
  }

  // Parse :root block from brand/tokens-color.css
  const rootColorBlock = extractTopLevelRuleBlock(colorCss, ':root');
  const rootDecls = parseDeclarationsFromBlock(rootColorBlock);

  const primitives: PrimitiveToken[] = [];
  const primitiveMap: Record<string, string> = {};
  const semanticDefaults: Record<string, SemanticTokenEntry> = {};

  for (const decl of rootDecls) {
    if (decl.name.startsWith('--concrete-') || decl.name.startsWith('--signal-vermilion-')) {
      const group: PrimitiveToken['group'] = decl.name.startsWith('--concrete-')
        ? 'concrete'
        : decl.name.startsWith('--signal-vermilion-')
          ? 'vermilion'
          : 'other';
      const isHex = parseHexColor(decl.value) !== null;
      primitives.push({
        name: decl.name,
        value: decl.value,
        comment: decl.comment,
        group,
        luminance: isHex ? Number(computeRelativeLuminance(decl.value).toFixed(6)) : null,
      });
      primitiveMap[decl.name] = decl.value;
    } else {
      semanticDefaults[decl.name] = {
        name: decl.name,
        rawValue: decl.value,
        resolvedValue: resolveCssVarValue(decl.value, primitiveMap),
        comment: decl.comment,
      };
    }
  }

  // Parse the 4 surface islands
  const surfaces = {} as Record<SurfaceIslandId, SurfaceIslandTokens>;
  for (const meta of SURFACE_META) {
    const block = extractTopLevelRuleBlock(colorCss, meta.selector);
    const decls = parseDeclarationsFromBlock(block);
    const tokens: Record<string, SemanticTokenEntry> = {};
    for (const decl of decls) {
      tokens[decl.name] = {
        name: decl.name,
        rawValue: decl.value,
        resolvedValue: resolveCssVarValue(decl.value, primitiveMap),
        comment: decl.comment,
      };
    }
    surfaces[meta.id] = {
      id: meta.id,
      label: meta.label,
      colorScheme: meta.colorScheme,
      selector: meta.selector,
      tokens,
    };
  }

  // Parse layout & type scale tokens from :root in src/app/globals.css
  const rootGlobalsBlock = extractTopLevelRuleBlock(globalsCss, ':root');
  const globalsDecls = parseDeclarationsFromBlock(rootGlobalsBlock);
  const globalsVarMap: Record<string, string> = {};
  const layoutTokens: LayoutToken[] = [];

  for (const decl of globalsDecls) {
    globalsVarMap[decl.name] = decl.value;
    const category: LayoutToken['category'] = decl.name.startsWith('--type-')
      ? 'type-scale'
      : decl.name.startsWith('--header-')
        ? 'header'
        : 'grid';
    layoutTokens.push({
      name: decl.name,
      value: decl.value,
      category,
    });
  }

  // Parse typography role classes from src/app/globals.css
  const typographyRoles: TypographyRoleToken[] = TYPOGRAPHY_SELECTORS.map(({ role, selector }) => {
    const block = extractTopLevelRuleBlock(globalsCss, selector);
    const props = parseRulePropertyMap(block);
    const rawFontSize = props['font-size'] ?? '';
    const fontSizeVarMatch = rawFontSize.match(/^var\((--[a-zA-Z0-9_-]+)\)$/);
    const fontSizeToken = fontSizeVarMatch ? fontSizeVarMatch[1] : null;
    const fontSizeValue = fontSizeToken ? (globalsVarMap[fontSizeToken] ?? rawFontSize) : rawFontSize;

    return {
      role,
      selector,
      fontFamily: props['font-family'] ?? 'inherit',
      fontSizeToken,
      fontSizeValue,
      fontWeight: props['font-weight'] ?? '400',
      lineHeight: props['line-height'] ?? '1.5',
      letterSpacing: props['letter-spacing'] ?? 'normal',
      textTransform: props['text-transform'] ?? 'none',
      fontStyle: props['font-style'] ?? 'normal',
    };
  });

  return {
    primitives,
    primitiveMap,
    semanticDefaults,
    surfaces,
    typographyRoles,
    layoutTokens,
    allColorCssVars: Array.from(allVarSet).sort(),
  };
}

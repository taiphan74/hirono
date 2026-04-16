import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

type TokenNode = {
  $type?: string;
  $value?: unknown;
  $extensions?: Record<string, unknown>;
  [key: string]: unknown;
};

type FlatToken = {
  path: string[];
  value: unknown;
  aliasName?: string;
};

type ThemeName = "light" | "dark" | "glass";

const INPUTS = {
  primitives: "/home/muoi/Downloads/Color Promitives/ColorPromitives.json",
  light: "/home/muoi/Downloads/Colors/Light.tokens.json",
  dark: "/home/muoi/Downloads/Colors/Dark.tokens.json",
  glass: "/home/muoi/Downloads/Colors/Glass.tokens.json",
};

const OUTPUT_FILE = path.resolve(process.cwd(), "app/generated-tokens.css");

const REQUIRED_SEMANTIC = [
  "background",
  "foreground",
  "card",
  "popover",
  "primary",
  "secondary",
  "muted",
  "accent",
  "destructive",
  "border",
  "input",
  "ring",
] as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toKebab(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function flattenTokens(node: unknown, currentPath: string[] = [], out: FlatToken[] = []): FlatToken[] {
  if (!isObject(node)) return out;

  const maybeValue = (node as TokenNode).$value;
  if (maybeValue !== undefined) {
    const ext = (node as TokenNode).$extensions;
    const aliasData = isObject(ext) && isObject(ext["com.figma.aliasData"]) ? ext["com.figma.aliasData"] : undefined;
    const aliasName = isObject(aliasData) && typeof aliasData.targetVariableName === "string"
      ? String(aliasData.targetVariableName)
      : undefined;

    out.push({ path: currentPath, value: maybeValue, aliasName });
    return out;
  }

  for (const [key, child] of Object.entries(node)) {
    flattenTokens(child, [...currentPath, key], out);
  }

  return out;
}

function normalizeHex(value: unknown): string | null {
  if (typeof value === "string" && /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)) {
    return value.toLowerCase();
  }

  if (isObject(value) && typeof value.hex === "string" && /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value.hex)) {
    return String(value.hex).toLowerCase();
  }

  return null;
}

function buildValueMap(tokens: FlatToken[]): Map<string, FlatToken> {
  const map = new Map<string, FlatToken>();
  for (const token of tokens) {
    map.set(token.path.join("/"), token);
  }
  return map;
}

function resolveAliasName(aliasName: string): string {
  const cleaned = aliasName
    .replace(/[{}]/g, "")
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .join("/");

  return cleaned;
}

function buildAliasCandidates(aliasName: string): string[] {
  const clean = resolveAliasName(aliasName);
  const candidates = new Set<string>();

  if (clean) {
    candidates.add(clean);
    candidates.add(clean.replace(/\./g, "/"));
    candidates.add(clean.replace(/\//g, "."));

    const kebab = clean
      .split("/")
      .map((segment) => toKebab(segment))
      .join("/");

    candidates.add(kebab);
    candidates.add(kebab.replace(/\//g, "."));
  }

  return [...candidates].filter(Boolean);
}

function resolveTokenHex(
  tokenKey: string,
  tokenMap: Map<string, FlatToken>,
  aliasIndex: Map<string, string>,
  stack: string[] = []
): string {
  if (stack.includes(tokenKey)) {
    throw new Error(`Alias cycle detected: ${[...stack, tokenKey].join(" -> ")}`);
  }

  const token = tokenMap.get(tokenKey);
  if (!token) {
    throw new Error(`Missing token: ${tokenKey}`);
  }

  const directHex = normalizeHex(token.value);
  if (directHex) return directHex;

  if (!token.aliasName) {
    throw new Error(`Token has no resolvable color value: ${tokenKey}`);
  }

  const candidates = buildAliasCandidates(token.aliasName);
  let aliasKey: string | undefined;
  for (const candidate of candidates) {
    const matched = aliasIndex.get(candidate);
    if (matched) {
      aliasKey = matched;
      break;
    }
  }

  if (!aliasKey) {
    throw new Error(`Alias target not found for ${tokenKey}: ${token.aliasName}`);
  }

  return resolveTokenHex(aliasKey, tokenMap, aliasIndex, [...stack, tokenKey]);
}

function mapSemanticKey(tokenPath: string[]): string {
  const slash = tokenPath.join("/").toLowerCase();
  const key = tokenPath.join("-").toLowerCase();

  const explicitPathMap: Record<string, string> = {
    "surface/default/default": "background",
    "text/default/default": "foreground",
    "surface/default/secondary": "card",
    "surface/default/tertiary": "popover",
    "surface/primary/default": "primary",
    "surface/secondary/default": "secondary",
    "surface/neutral/secondary": "muted",
    "surface/primary/secondary": "accent",
    "surface/error/default": "destructive",
    "border/default/default": "border",
    "border/default/secondary": "input",
    "border/primary/default": "ring",
  };

  if (explicitPathMap[slash]) return explicitPathMap[slash];

  if (key.includes("surface") && key.includes("default") && !key.includes("hover")) return "background";
  if (key.includes("text") && key.includes("default") && !key.includes("secondary")) return "foreground";
  if (key.includes("surface") && key.includes("card")) return "card";
  if (key.includes("surface") && key.includes("popover")) return "popover";
  if (key.includes("action") && key.includes("primary")) return "primary";
  if (key.includes("action") && key.includes("secondary")) return "secondary";
  if (key.includes("surface") && key.includes("muted")) return "muted";
  if (key.includes("action") && key.includes("accent")) return "accent";
  if ((key.includes("status") && key.includes("danger")) || key.includes("destructive") || key.includes("error")) return "destructive";
  if (key.includes("border")) return "border";
  if (key.includes("input")) return "input";
  if (key.includes("focus") || key.includes("ring")) return "ring";

  return "";
}

function buildThemeSemanticMap(
  themeTokens: FlatToken[],
  primitiveMap: Map<string, FlatToken>,
  lightSemantic?: Map<string, string>
): { semantic: Map<string, string>; warnings: string[] } {
  const warnings: string[] = [];
  const tokenMap = buildValueMap(themeTokens);

  const combinedMap = new Map<string, FlatToken>([...primitiveMap, ...tokenMap]);
  const aliasIndex = new Map<string, string>();

  for (const [key, token] of combinedMap.entries()) {
    aliasIndex.set(key, key);

    const slashPath = token.path.join("/");
    const dottedPath = token.path.join(".");
    aliasIndex.set(slashPath, key);
    aliasIndex.set(dottedPath, key);

    const kebabSlashPath = token.path.map((segment) => toKebab(segment)).join("/");
    const kebabDottedPath = token.path.map((segment) => toKebab(segment)).join(".");
    aliasIndex.set(kebabSlashPath, key);
    aliasIndex.set(kebabDottedPath, key);

    if (token.aliasName) {
      for (const candidate of buildAliasCandidates(token.aliasName)) {
        aliasIndex.set(candidate, key);
      }
    }
  }

  const semantic = new Map<string, string>();
  for (const token of themeTokens) {
    const semanticKey = mapSemanticKey(token.path);
    if (!semanticKey) continue;

    const key = token.path.join("/");
    try {
      const hex = resolveTokenHex(key, combinedMap, aliasIndex);
      semantic.set(semanticKey, hex);
    } catch {
      continue;
    }
  }

  if (lightSemantic) {
    for (const [k, v] of lightSemantic.entries()) {
      if (!semantic.has(k)) {
        semantic.set(k, v);
        warnings.push(`Fallback used for semantic token '${k}'`);
      }
    }
  }

  return { semantic, warnings };
}

function cssBlock(selector: string, vars: Map<string, string>): string {
  const lines = [...vars.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `  --${k}: ${v};`);

  return `${selector} {\n${lines.join("\n")}\n}`;
}

function validateRequired(semantic: Map<string, string>, theme: ThemeName): void {
  const missing = REQUIRED_SEMANTIC.filter((k) => !semantic.has(k));
  if (missing.length > 0) {
    throw new Error(`Missing required semantic tokens for ${theme}: ${missing.join(", ")}`);
  }
}

function readJson(file: string): unknown {
  return JSON.parse(readFileSync(file, "utf8"));
}

function main(): void {
  const primitives = flattenTokens(readJson(INPUTS.primitives));
  const light = flattenTokens(readJson(INPUTS.light));
  const dark = flattenTokens(readJson(INPUTS.dark));
  const glass = flattenTokens(readJson(INPUTS.glass));

  const primitiveMap = buildValueMap(primitives);

  const lightResult = buildThemeSemanticMap(light, primitiveMap);
  validateRequired(lightResult.semantic, "light");

  const darkResult = buildThemeSemanticMap(dark, primitiveMap, lightResult.semantic);
  validateRequired(darkResult.semantic, "dark");

  const glassResult = buildThemeSemanticMap(glass, primitiveMap, lightResult.semantic);
  validateRequired(glassResult.semantic, "glass");

  const header = [
    "/* AUTO-GENERATED FILE. DO NOT EDIT MANUALLY. */",
    "/* Generated by scripts/build-color-tokens.ts */",
  ].join("\n");

  const body = [
    cssBlock(":root", lightResult.semantic),
    cssBlock(".dark", darkResult.semantic),
    cssBlock(".glass", glassResult.semantic),
  ].join("\n\n");

  writeFileSync(OUTPUT_FILE, `${header}\n\n${body}\n`, "utf8");

  [...darkResult.warnings, ...glassResult.warnings].forEach((warning) => {
    console.warn(`[tokens:build] ${warning}`);
  });

  console.log(`[tokens:build] Generated ${OUTPUT_FILE}`);
}

main();

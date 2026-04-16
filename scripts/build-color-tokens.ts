import { existsSync, readFileSync, writeFileSync } from "node:fs";
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

type InputKey = keyof typeof DEFAULT_INPUTS;

type InputPaths = Record<InputKey, string>;

type BuildOptions = {
  inputs: InputPaths;
};

type BuildResolveError = {
  semanticKey: string;
  tokenPath: string;
  message: string;
};

type BuildThemeResult = {
  semantic: Map<string, string>;
  warnings: string[];
  errors: BuildResolveError[];
};

const DEFAULT_INPUTS = {
  primitives: path.resolve(process.cwd(), "tokens/ColorPromitives.json"),
  light: path.resolve(process.cwd(), "tokens/Light.tokens.json"),
  dark: path.resolve(process.cwd(), "tokens/Dark.tokens.json"),
  glass: path.resolve(process.cwd(), "tokens/Glass.tokens.json"),
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
  theme: ThemeName,
  themeTokens: FlatToken[],
  primitiveMap: Map<string, FlatToken>,
  lightSemantic?: Map<string, string>
): BuildThemeResult {
  const warnings: string[] = [];
  const errors: BuildResolveError[] = [];
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
  const semanticSourcePath = new Map<string, string>();

  for (const token of themeTokens) {
    const semanticKey = mapSemanticKey(token.path);
    if (!semanticKey) continue;

    const key = token.path.join("/");
    const existingPath = semanticSourcePath.get(semanticKey);
    if (existingPath && existingPath !== key) {
      warnings.push(
        `Semantic collision in ${theme}: '${semanticKey}' mapped by both '${existingPath}' and '${key}'. Using latest value from '${key}'.`
      );
    }

    try {
      const hex = resolveTokenHex(key, combinedMap, aliasIndex);
      semantic.set(semanticKey, hex);
      semanticSourcePath.set(semanticKey, key);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      if (semantic.has(semanticKey)) {
        warnings.push(
          `Skipping unresolved collision candidate '${key}' for semantic '${semanticKey}' in ${theme}: ${reason}`
        );
        continue;
      }

      errors.push({ semanticKey, tokenPath: key, message: reason });
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

  return { semantic, warnings, errors };
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

function resolveInputPath(args: string[], key: InputKey): string {
  const prefix = `--${key}=`;
  const argValue = args.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
  const envValue = process.env[`TOKENS_${key.toUpperCase()}_FILE`];
  const candidate = argValue || envValue || DEFAULT_INPUTS[key];
  return path.resolve(process.cwd(), candidate);
}

function resolveInputs(args: string[]): InputPaths {
  return {
    primitives: resolveInputPath(args, "primitives"),
    light: resolveInputPath(args, "light"),
    dark: resolveInputPath(args, "dark"),
    glass: resolveInputPath(args, "glass"),
  };
}

function ensureInputFiles(inputs: InputPaths): void {
  const missing = Object.entries(inputs).filter(([, filePath]) => !existsSync(filePath));
  if (missing.length > 0) {
    const details = missing.map(([name, filePath]) => `${name}: ${filePath}`).join("\n");
    throw new Error(
      `Missing required token input file(s):\n${details}\n` +
      "Provide --primitives= --light= --dark= --glass= args or TOKENS_*_FILE env vars."
    );
  }
}

function main(options: BuildOptions): void {
  ensureInputFiles(options.inputs);

  const primitives = flattenTokens(readJson(options.inputs.primitives));
  const light = flattenTokens(readJson(options.inputs.light));
  const dark = flattenTokens(readJson(options.inputs.dark));
  const glass = flattenTokens(readJson(options.inputs.glass));

  const primitiveMap = buildValueMap(primitives);

  const lightResult = buildThemeSemanticMap("light", light, primitiveMap);
  validateRequired(lightResult.semantic, "light");

  const darkResult = buildThemeSemanticMap("dark", dark, primitiveMap, lightResult.semantic);
  validateRequired(darkResult.semantic, "dark");

  const glassResult = buildThemeSemanticMap("glass", glass, primitiveMap, lightResult.semantic);
  validateRequired(glassResult.semantic, "glass");

  const errors = [...lightResult.errors, ...darkResult.errors, ...glassResult.errors];
  const requiredErrorSet = new Set(REQUIRED_SEMANTIC);
  const requiredErrors = errors.filter((error) => requiredErrorSet.has(error.semanticKey as (typeof REQUIRED_SEMANTIC)[number]));

  errors.forEach((error) => {
    console.error(
      `[tokens:build] Failed resolving token '${error.tokenPath}' for semantic '${error.semanticKey}': ${error.message}`
    );
  });

  if (requiredErrors.length > 0) {
    throw new Error(`[tokens:build] Unresolved required semantic mappings: ${requiredErrors.length}`);
  }

  if (errors.length > requiredErrors.length) {
    console.warn(`[tokens:build] Ignored ${errors.length - requiredErrors.length} unresolved non-required mappings.`);
  }

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

  [...lightResult.warnings, ...darkResult.warnings, ...glassResult.warnings].forEach((warning) => {
    console.warn(`[tokens:build] ${warning}`);
  });

  console.log(`[tokens:build] Generated ${OUTPUT_FILE}`);
}

main({ inputs: resolveInputs(process.argv.slice(2)) });

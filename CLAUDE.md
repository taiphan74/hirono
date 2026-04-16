# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository-specific constraints

- Read and follow `AGENTS.md` before modifying code.
- This project uses **Next.js 16.2.4** (breaking changes vs older Next.js versions). Before implementing framework-level changes, read relevant docs in `node_modules/next/dist/docs/`.

## Common commands

- Install dependencies:
  - `npm install`
- Start local development server:
  - `npm run dev`
- Build production bundle:
  - `npm run build`
- Run production server locally:
  - `npm run start`
- Lint:
  - `npm run lint`
- Reliable lint/build from non-repo CWD:
  - `npm --prefix "/home/muoi/project/Tech_Solve/hirono" run lint && npm --prefix "/home/muoi/project/Tech_Solve/hirono" run build`

### Command gotchas

- `npm run dev` - Runs `predev` and fails if `app/generated-tokens.css` is missing.

### Tests

- There is currently **no test runner configured** in `package.json` (`test` script is absent).
- Single-test execution is therefore not available yet in the current codebase setup.

## High-level architecture

This repository is currently a minimal App Router Next.js application with TypeScript and Tailwind CSS v4.

- **Framework/runtime**
  - Next.js app using the **App Router** (`app/` directory).
  - React 19 + TypeScript, strict mode enabled (`tsconfig.json`).

- **Entry points and rendering structure**
  - `app/layout.tsx`: root HTML/body shell, global font setup via `next/font/google` (Geist + Geist Mono), and global CSS import.
  - `app/page.tsx`: main homepage server component for `/` route.
  - `app/globals.css`: global styles and Tailwind v4 import (`@import "tailwindcss"`), plus theme variables.

- **Styling model**
  - Tailwind CSS utility classes are used directly in components.
  - Global CSS variables (`--background`, `--foreground`) are mapped into Tailwind theme tokens via `@theme inline`.
  - Primitive color tokens live at root-level `styles/tokens.css` and are imported in `app/globals.css` via `@import "../styles/tokens.css"`.

- **Static assets**
  - Public assets are served from `public/` and referenced by components (e.g., logo SVGs used in `app/page.tsx`).

- **Configuration**
  - `next.config.ts`: Next.js configuration scaffold (currently default/no custom options).
  - `eslint.config.mjs`: uses `eslint-config-next` (`core-web-vitals` + TypeScript presets).
  - `tsconfig.json`: strict TS + path alias `@/* -> ./*`.

## Notes for future expansion

- The app is still close to `create-next-app` baseline, so major architectural patterns (data layer, feature modules, API routes, testing strategy) are not established yet. Keep additions explicit and consistent as those patterns are introduced.

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.

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

- **Static assets**
  - Public assets are served from `public/` and referenced by components (e.g., logo SVGs used in `app/page.tsx`).

- **Configuration**
  - `next.config.ts`: Next.js configuration scaffold (currently default/no custom options).
  - `eslint.config.mjs`: uses `eslint-config-next` (`core-web-vitals` + TypeScript presets).
  - `tsconfig.json`: strict TS + path alias `@/* -> ./*`.

## Notes for future expansion

- The app is still close to `create-next-app` baseline, so major architectural patterns (data layer, feature modules, API routes, testing strategy) are not established yet. Keep additions explicit and consistent as those patterns are introduced.

# CLAUDE.md

## Project overview

Public Node.js example demonstrating the Signus v1 API document lifecycle — list templates, create documents, send for signature, download signed PDFs.

## Tech stack

- TypeScript, Node.js (v18+)
- Jest + ts-jest for testing
- ESLint + Prettier for linting/formatting
- Native `fetch` (no HTTP client dependency)
- Signus API (`https://api.signus.ai`)

## Setup

- Copy `.env.example` to `.env` and fill in values
- `npm install`

## Commands

- `npm test` — runs the full-flow test against the live Signus API
- `npm run build` — compiles TypeScript to `dist/`
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` / `npm run format:fix` — Prettier
- `npm run valid` — runs format + lint + build + test

## Project structure

- `src/types.ts` — API type definitions
- `src/config.ts` — loads .env, exports typed config
- `src/signus-client.ts` — `SignusClient` class wrapping the v1 API
- `src/index.ts` — re-exports
- `test/full-flow.test.ts` — sequential test walking through the document lifecycle

## API docs

- https://api.signus.ai/docs

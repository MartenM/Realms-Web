# Realms Web

A SvelteKit frontend for the PixelWalker Realms browser.

This app is a client for exploring published worlds, viewing leaderboards, checking player profiles, and browsing realm statistics.

## Features

- Browse rated realms and featured worlds
- Search by world name, builder, difficulty, and ranking
- View world minimaps and play dialogs
- See highscores for builder and speedrun categories
- Inspect player profiles and published worlds
- Track global realm stats and ongoing activity
- Manage local profile settings (username/session)

## Tech stack

- SvelteKit + Vite
- TypeScript
- Chart.js
- dotenv for environment configuration
- Svelte stores for client-side state

## Getting started

```bash
cd Realms-Web
pnpm install
```

> `pnpm` is recommended because this repository includes `pnpm-lock.yaml`, but `npm install` also works.

### Environment variables

The app expects a public API base URL via `PUBLIC_API_URL`.

Create a `.env` file in the project root with:

```env
PUBLIC_API_URL=https://your-api-base-url.example
```

## Development

Start the local development server:

```bash
pnpm dev
```

Open the provided localhost URL in your browser.

## Build

Create a production bundle:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Checks

Run Svelte type checking and diagnostics:

```bash
pnpm check
```

Watch checks during development:

```bash
pnpm check:watch
```

## Project structure

- `src/routes` — page routes and layouts
- `src/lib/components` — reusable UI components
- `src/lib/stores` — client-side state management
- `src/lib/DifficultyImages.ts` — difficulty metadata and assets
- `src/routes/(wide)` — main wide-screen route layout
- `src/routes/(sidebar)` — fallback or alternate layout

## Notes

- The app loads content from the configured `PUBLIC_API_URL` backend.
- Player profile and session state are stored locally in the browser.
- The repository uses `@sveltejs/adapter-auto` by default, so deployment is flexible.

# AGENTS.md — ModelRadar Developer Guide

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Vite 6 |
| Routing | TanStack React Router v1 |
| Data Fetching | TanStack React Query v5 |
| Table Component | TanStack React Table v8 |
| Styling | Tailwind CSS v4 (CSS variables theming) |
| Backend/Auth | Supabase (Auth + Database for favorites) |
| Language | TypeScript (strict mode) |
| Linting | Biome |
| Deployment | Vercel (Nitro preset) |

## Developer Commands

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Preview production build
pnpm typecheck    # TypeScript checking
pnpm check        # Biome linting & formatting
```

**Command order:** `pnpm check` → `pnpm typecheck` → `pnpm build` → verify with browser

## After Every Change

1. Run `pnpm check` to lint/format
2. Run `pnpm typecheck` to catch type errors
3. Run `pnpm build` to verify production build
4. Push commit + deploy to Vercel
5. Verify at `https://modelradar.dev` with chrome-devtools

## Architecture

```
src/
├── data/              # Core data layer — static model/provider data
│   ├── schema/        # TypeScript interfaces (DO NOT MODIFY unless schema changes)
│   ├── models/        # ONE file per model = ModelEntry = model + all provider offers
│   │   └── {creator}/ # Creator folder (anthropic, openai, google, etc.)
│   ├── providers/     # ONE file per provider
│   ├── families/      # Model family definitions
│   └── index.ts       # Helper functions (getModelById, getOffersForModel, etc.)
├── components/        # Reusable UI components
│   ├── table/         # DataTable (virtualized, sticky columns, drag-to-reorder)
│   ├── model/         # modelColumns, ModelRow
│   └── ...
├── lib/               # Utility hooks (auth, favorites, formatting)
├── routes/            # TanStack Router file-based routes
└── styles/           # Tailwind + CSS custom properties
```

## Model Column Rules (LOCKED)

The "Model" column (`name`) is **locked** and must always:
- Be the **first column** (leftmost) in the table
- Be **sticky** (pinned left) so it stays visible on horizontal scroll
- Have a **distinct elevated background** (`--color-surface-elevated`) to separate it visually
- **Never be hideable** — it cannot be toggled off in preferences
- **Never be draggable** — it cannot be reordered
- Have a **minimum width of 280px** (`size: 280` in modelColumns.tsx)

## Data Model Key Points

- **1 model = 1 file = 1 atomic edit** in `src/data/models/{creator}/{model-id}.ts`
- `model_id` in offers is auto-injected from `model.id` by the aggregator
- `model.cost` = reference pricing from creator, `offers[].input_per_mtok` = provider-specific pricing
- Variable names must be valid JS identifiers (camelCase, no hyphens): `claudeSonnet4`, not `claude-sonnet-4`

## Adding New Models

See `AGENTS_UPDATER.md` — the complete guide for AI agents updating ModelRadar data.

## Adding New Providers

Files to touch: 2
1. Create `src/data/providers/{provider-id}.ts`
2. Add import + entry to `src/data/providers/index.ts`

## Validation

After any data change, run `pnpm build`. Build will fail if:
- Required field is missing
- Type is wrong (e.g., wrong category value)
- Import is broken

## Common Mistakes

1. **Don't add `model_id` to offers** — auto-injected from `model.id`
2. **Don't forget to export** from creator's `index.ts`
3. **Don't duplicate pricing** — `model.cost` is reference, `offers[]` is provider-specific
4. **Don't use `any` types** — strict TypeScript, build will catch errors
5. **Don't modify `models/index.ts`** unless adding a new creator
6. **Don't modify schema files** unless the data structure needs to change

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Both are optional — the app works without Supabase (favorites won't persist).




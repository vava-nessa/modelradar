# ModelRadar 🤖

Compare LLM models — pricing, capabilities, benchmarks, and provider availability for coding LLMs.

**Stack:** React 19 + Vite 6 · TanStack Router v1 · TanStack Query v5 · TanStack Table v8 · Tailwind CSS v4 · Supabase · Vercel

---

## What This Is

A searchable catalog of coding LLMs. Each model entry contains:
- Intrinsic properties (capabilities, benchmarks, context limits, pricing)
- All provider offers (provider-specific pricing, rate limits, latency)

**1 model = 1 file = 1 atomic edit.** All data is static — no API calls at runtime.

---

## Architecture

```
src/
├── data/                    # Static model/provider data
│   ├── schema/             # TypeScript interfaces (model.ts, provider.ts, offer.ts)
│   ├── models/             # ONE file per model
│   │   └── {creator}/      # anthropic/, openai/, google/, meta/, etc.
│   │       └── {id}.ts     # ModelEntry = model + offers[]
│   ├── providers/           # ONE file per provider (openrouter.ts, bedrock.ts, etc.)
│   ├── families/            # Model family groupings (Claude Sonnet, GPT-4o, etc.)
│   └── index.ts            # Helpers: getModelById, getOffersForModel, getModelsForProvider
│
├── components/              # Reusable UI
│   ├── table/              # DataTable (virtualized, sticky first column, drag-reorder)
│   ├── model/              # modelColumns.tsx — all column definitions
│   ├── auth/               # AuthButton, AuthGuard
│   └── favorites/           # FavoriteButton
│
├── lib/                    # Hooks & utilities
│   ├── auth.ts            # useAuth, useSignIn*, useSignOut (Supabase)
│   ├── favorites.ts       # useFavorites, useToggleFavorite (Supabase)
│   └── format.ts          # formatTokens, formatPrice, formatDate
│
└── routes/                 # TanStack Router file-based routes
    ├── index.tsx           # Main table page (/ )
    ├── favorites.tsx        # Auth-guarded favorites (/favorites)
    ├── login.tsx           # Auth pages
    └── models/$modelId.tsx # Model detail (/models/:id)
```

---

## Key Conventions

| Convention | Rule |
|------------|------|
| Model file name | kebab-case, matches `model.id` |
| Variable export | camelCase: `claudeSonnet4` not `claude-sonnet-4` |
| Offers | No `model_id` field — auto-injected from `model.id` |
| Pricing | `model.cost` = creator reference · `offers[]` = provider-specific |
| Capabilities | `vision` field is **required** (boolean) |
| Optional strings | Use `undefined`, never `null` |

---

## Model Column Rules (LOCKED)

The "Model" column is **locked**:
- First column, sticky left, elevated background
- Never hideable, never reorderable
- Min width: 280px (`size: 280` in modelColumns.tsx)

---

## Adding / Updating Models

→ See `AGENTS_UPDATER.md` — the complete data update guide

Quick ref:
```bash
# 1. Edit or create: src/data/models/{creator}/{model-id}.ts
# 2. Export from:     src/data/models/{creator}/index.ts
# 3. Verify:          pnpm build
```

---

## Dev Commands

```bash
pnpm dev        # Dev server (http://localhost:5173) — NOTE: port may vary if 5173 is in use
pnpm build      # Production build
pnpm typecheck  # TypeScript check
pnpm check      # Biome lint
```

**After every change:** `pnpm check` → `pnpm typecheck` → `pnpm build`

---

## Important Files

| File | Purpose |
|------|---------|
| `src/data/schema/model.ts` | Model, ModelEntry, ModelCapabilities, ModelBenchmarks types |
| `src/data/schema/provider.ts` | Provider type |
| `src/data/schema/offer.ts` | ProviderOffer type |
| `src/components/table/DataTable.tsx` | Virtualized table with sticky columns |
| `src/components/model/modelColumns.tsx` | All column definitions (benchmarks, pricing, etc.) |
| `src/lib/useTablePreferences.ts` | Column order/visibility/presets (localStorage) |

---

## Environment Variables

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
Optional — app works without them (favorites require Supabase).

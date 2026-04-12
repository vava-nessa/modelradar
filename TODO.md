# ModelRadar v1 - Development Status

> Last Updated: 2026-04-12

## Phase 1 - Current Scope

### ✅ Phase 1.1: Setup project (TanStack Start, Tailwind, Biome, pnpm)
- [x] package.json with all dependencies
- [x] tsconfig.json with strict mode and @/* path alias
- [x] vite.config.ts for TanStack Start with file-based routing
- [x] biome.json for linting/formatting
- [x] .env.local with Supabase placeholder vars
- [x] Directory structure created
- [x] Build passes ✅

### ✅ Phase 1.2: Data layer (schema types, model/provider/offer data, helpers)
- [x] src/data/schema/model.ts - Model types, ModelCapabilities, ModelBenchmarks
- [x] src/data/schema/provider.ts - Provider types
- [x] src/data/schema/offer.ts - ProviderOffer types
- [x] src/data/schema/index.ts - re-exports
- [x] src/data/models/anthropic.ts - Claude Sonnet 4, Claude Opus 4
- [x] src/data/models/openai.ts - GPT-4o, o3
- [x] src/data/models/google.ts - Gemini 2.5 Pro
- [x] src/data/models/meta.ts - Llama 4 Maverick
- [x] src/data/models/index.ts - allModels array
- [x] src/data/providers/index.ts - allProviders (Anthropic, OpenAI, OpenRouter, Bedrock)
- [x] src/data/offers/index.ts - allOffers (12 offers)
- [x] src/data/index.ts - exports + helpers (getOffersForModel, getModelsForProvider, etc.)

### ✅ Phase 1.3: Layout and navigation (root layout, Header, routes)
- [x] src/styles/globals.css - Tailwind v4 with custom design tokens, dark mode support
- [x] src/routes/__root.tsx - root layout with QueryClientProvider, Header, Outlet
- [x] src/components/layout/Header.tsx - 48px sticky header with nav links and auth
- [x] src/components/layout/Container.tsx - max-width wrapper
- [x] src/components/layout/ThemeToggle.tsx - dark/light/auto mode toggle
- [x] src/router.tsx - TanStack Router configuration
- [x] Routes: /, /models/:modelId, /providers, /providers/:providerId, /login, /favorites

### ✅ Phase 1.4: Models table (DataTable, ModelTable, sorting, filtering, virtualization)
- [x] src/components/table/DataTable.tsx - generic table with TanStack Table + Virtual
- [x] src/components/model/modelColumns.tsx - column definitions for models table
- [x] src/routes/index.tsx - home page with models table
- [x] Sorting by column header click, multi-sort with Shift
- [x] Virtual scrolling for smooth performance

### ✅ Phase 1.5: Model detail page
- [x] src/routes/models/$modelId.tsx - model detail page with offers
- [x] src/components/offer/OfferTable.tsx - offer table component
- [x] Capabilities display as badges
- [x] Benchmarks display as cards
- [x] FavoriteButton integration

### ✅ Phase 1.6: Providers table
- [x] src/routes/providers/index.tsx - providers list page with inline column defs

### ✅ Phase 1.7: Provider detail page
- [x] src/routes/providers/$providerId.tsx - provider detail with models list

### 🔄 Phase 1.8: Supabase auth (needs real credentials)
- [x] src/lib/supabase.ts - Supabase client singleton
- [x] src/lib/auth.ts - useAuth, useSignInWithEmail, useSignInWithGithub, useSignOut hooks
- [x] src/routes/login.tsx - login page with magic link and GitHub OAuth
- [x] supabase/migrations/001_create_favorites.sql - favorites table with RLS
- [ ] **NEEDS: Real Supabase project** - Create project at supabase.com, get URL + anon key, update .env.local

### ✅ Phase 1.9: Favorites system (scaffolded, needs Supabase)
- [x] src/lib/favorites.ts - useFavorites, useToggleFavorite, useIsFavorite with optimistic updates
- [x] src/components/favorites/FavoriteButton.tsx - star toggle button (★/☆)
- [x] src/components/auth/AuthGuard.tsx - redirect to /login if not authenticated
- [x] src/routes/favorites.tsx - favorites page (auth guarded)
- [x] **FavoriteButton integrated in models table and model detail page**

### ✅ Phase 1.10: Polish
- [x] Dark mode support with system preference detection
- [x] ThemeToggle component (☀️/🌙/🌓) in header
- [x] Meta tags: charSet, viewport, description
- [x] SSR-ready architecture
- [x] Build passes

---

## What's Working

- [x] Models table with all 5 models displayed
- [x] Model detail pages with capabilities, benchmarks, and provider offers
- [x] Providers table and detail pages
- [x] Dark/light/auto theme toggle
- [x] Login page (UI ready, needs Supabase)
- [x] Favorites page (UI ready, needs Supabase)
- [x] FavoriteButton on models table and detail pages
- [x] Virtual scrolling for performance
- [x] Column sorting (click header, shift+click for multi)

## To Complete Phase 1.8

1. Create a Supabase project at https://app.supabase.com
2. Get the `SUPABASE_URL` and `SUPABASE_ANON_KEY` from project settings
3. Update `.env.local` with real values:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
4. Run the SQL migration in Supabase SQL Editor (or via CLI):
   ```bash
   npx supabase db push
   ```
5. Test magic link login and GitHub OAuth

---

## Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Lint check
pnpm check

# Preview production
pnpm preview
```

---

## Phase 2 - Future (not in scope)
- [ ] Add 100+ models with all data
- [ ] Add 15+ providers
- [ ] Automated data collection
- [ ] Last updated timestamps per model
- [ ] Price change alerts

## Phase 3 - Future (not in scope)
- [ ] Side-by-side model comparison
- [ ] Cost calculator
- [ ] Benchmark charts
- [ ] Public API
- [ ] Price history
- [ ] Community ratings

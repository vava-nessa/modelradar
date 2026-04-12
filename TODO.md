# ModelRadar v1 - Development Status

> Last Updated: 2026-04-12

## Phase 1 - Current Scope

### ✅ Phase 1.1: Setup project (TanStack Start, Tailwind, Biome, pnpm)
- [x] package.json with all dependencies
- [x] tsconfig.json with strict mode and @/* path alias
- [x] app.config.ts for TanStack Start
- [x] vite.config.ts
- [x] biome.json for linting/formatting
- [x] tsr.config.json for TanStack Router
- [x] .env.local with Supabase placeholder vars
- [x] Directory structure created
- [x] pnpm install completed

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
- [ ] Verify: `pnpm typecheck` passes without error

### 🔄 Phase 1.3: Layout and navigation (root layout, Header, routes)
- [x] src/styles/globals.css - Tailwind v4 with custom design tokens, dark mode
- [x] src/routes/__root.tsx - root layout with QueryClientProvider, Header, Outlet
- [x] src/components/layout/Header.tsx - 48px sticky header with nav links and auth
- [x] src/components/layout/Container.tsx - max-width wrapper
- [ ] File-based routes setup (TanStack Router convention)
- [ ] Verify routes work: /, /models/:modelId, /providers, /providers/:providerId, /login, /favorites

### 🔄 Phase 1.4: Models table (DataTable, ModelTable, sorting, filtering, virtualization)
- [x] src/components/table/DataTable.tsx - generic table with TanStack Table + Virtual
- [x] src/components/model/modelColumns.ts - column definitions for models table
- [x] src/components/model/ModelRow.tsx - row rendering (note: currently unused, inlined in DataTable)
- [x] src/routes/index.tsx - home page with models table
- [ ] Fix DataTable component (has bugs)
- [ ] Implement proper column filters UI
- [ ] Implement multi-column sorting (Shift+click)
- [ ] Implement URL sync for filters/sorting
- [ ] Implement column visibility toggle menu
- [ ] Mobile: switch to cards view

### 🔄 Phase 1.5: Model detail page (CapabilitiesBadges, BenchmarkBar, OfferTable)
- [x] src/routes/models/$modelId.tsx - model detail page
- [x] src/components/offer/OfferTable.tsx - offer table component
- [ ] Create CapabilitiesBadges.tsx component
- [ ] Create BenchmarkBar.tsx component
- [ ] Add benchmark visualization bars
- [ ] Handle model not found (404)

### 🔄 Phase 1.6: Providers table (ProviderTable, ProviderBadge)
- [x] src/routes/providers/index.tsx - providers list page
- [ ] Create ProviderBadge.tsx component
- [ ] Implement ProviderTable with proper columns

### 🔄 Phase 1.7: Provider detail page
- [x] src/routes/providers/$providerId.tsx - provider detail page
- [ ] Handle provider not found (404)

### 🔄 Phase 1.8: Supabase auth (supabase client, auth hooks, login page)
- [x] src/lib/supabase.ts - Supabase client singleton
- [x] src/lib/auth.ts - useAuth, useSignInWithEmail, useSignInWithGithub, useSignOut
- [x] src/routes/login.tsx - login page with magic link and GitHub OAuth
- [x] supabase/migrations/001_create_favorites.sql - favorites table with RLS
- [ ] Create Supabase project and get real keys
- [ ] Test magic link flow
- [ ] Test GitHub OAuth flow
- [ ] Test logout flow

### 🔄 Phase 1.9: Favorites system (CRUD hooks, FavoriteButton, /favorites page)
- [x] src/lib/favorites.ts - useFavorites, useToggleFavorite, useIsFavorite with optimistic updates
- [x] src/components/favorites/FavoriteButton.tsx - star toggle button
- [x] src/components/auth/AuthGuard.tsx - redirect to /login if not authenticated
- [x] src/routes/favorites.tsx - favorites page (auth guarded)
- [ ] Integrate FavoriteButton in models table column
- [ ] Integrate FavoriteButton in model detail page
- [ ] Test add/remove favorite flow
- [ ] Run SQL migration in Supabase

### 🔄 Phase 1.10: Polish and SSR (dark mode, meta tags, mobile)
- [ ] Verify SSR works (data rendered server-side)
- [ ] Dark mode toggle or system preference
- [ ] Meta tags per page
- [ ] Performance: FCP < 1s
- [ ] Mobile table usability

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

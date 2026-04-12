# ModelRadar 🤖

**Compare LLM models** — A comprehensive, searchable catalog of Large Language Models with pricing, capabilities, benchmarks, and provider availability.

---

## Overview

ModelRadar is a web application that helps developers, researchers, and AI enthusiasts compare LLM models across multiple dimensions:
- Pricing (input/output tokens per million)
- Context windows and output limits
- Capabilities (vision, function calling, streaming, etc.)
- Benchmarks (MMLU, HumanEval, SWE-Bench, etc.)
- Access modes (Free, API, Subscription, Local)
- Provider availability

Built with **React 19**, **TanStack Stack** (Router, Query, Table), and **Tailwind CSS v4**.

---

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

---

## Project Architecture

```
modelradar/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── auth/             # Authentication (AuthButton, AuthGuard)
│   │   ├── favorites/        # Favorites system (FavoriteButton)
│   │   ├── layout/           # Layout components (Header, Container, ThemeToggle)
│   │   ├── model/            # Model-specific components (modelColumns)
│   │   ├── offer/            # Provider offer table (OfferTable)
│   │   ├── provider/         # Provider-specific components
│   │   └── table/            # Generic DataTable component
│   │
│   ├── data/                 # Core data layer (types + static data)
│   │   ├── schema/           # TypeScript interfaces & enums
│   │   │   ├── model.ts      # Model, ModelEntry, ModelFamily, Capabilities, Benchmarks
│   │   │   ├── provider.ts  # Provider interface
│   │   │   └── offer.ts     # ProviderOffer interface
│   │   │
│   │   ├── families/         # Model family definitions
│   │   │   └── index.ts     # allFamilies (Claude Sonnet, GPT-4o, etc.)
│   │   │
│   │   ├── models/           # ONE file per model (ModelEntry = model + offers)
│   │   │   ├── anthropic/   # Creator folder
│   │   │   │   ├── claude-sonnet-4.ts  # Model data + provider offers
│   │   │   │   ├── claude-opus-4.ts
│   │   │   │   └── index.ts            # Re-exports
│   │   │   ├── openai/
│   │   │   │   ├── gpt-4o.ts
│   │   │   │   ├── o3.ts
│   │   │   │   └── index.ts
│   │   │   ├── google/, meta/, mistral/, deepseek/, microsoft/
│   │   │   └── index.ts     # Aggregates all → allModels + allOffers
│   │   │
│   │   ├── providers/        # ONE file per provider
│   │   │   ├── anthropic.ts  # Provider metadata
│   │   │   ├── openai.ts
│   │   │   ├── openrouter.ts, bedrock.ts, mistral.ts, deepseek.ts, azure.ts
│   │   │   └── index.ts     # Aggregates → allProviders
│   │   │
│   │   └── index.ts         # Main data exports + helper functions
│   │
│   ├── lib/                 # Utility libraries
│   │   ├── auth.ts          # Auth hooks (useAuth, useSignIn, etc.)
│   │   ├── favorites.ts    # Favorites hooks (useFavorites, etc.)
│   │   ├── format.ts       # Formatting utilities (formatPrice, formatTokens)
│   │   └── supabase.ts     # Supabase client setup
│   │
│   ├── routes/              # Page routes (TanStack Router file-based)
│   │   ├── __root.tsx       # Root layout with providers
│   │   ├── index.tsx        # Main models listing page
│   │   ├── favorites.tsx   # User's favorite models (auth-guarded)
│   │   ├── login.tsx       # Login page
│   │   ├── models/
│   │   │   └── $modelId.tsx # Model detail page
│   │   └── providers/
│   │       ├── index.tsx    # Providers listing
│   │       └── $providerId.tsx # Provider detail
│   │
│   ├── styles/
│   │   └── globals.css      # Tailwind + CSS custom properties
│   │
│   └── router.tsx           # Router configuration
│
├── public/                  # Static assets
├── dist/                    # Build output
└── package.json
```

---

## Data Structure

> **Scope:** Coding LLMs only — no image gen, audio, or video models.

### Model Interface (`src/data/schema/model.ts`)

The `Model` interface represents a coding LLM's intrinsic properties, independent of any specific provider:

```typescript
interface Model {
  // === Identity ===
  id: string;                        // Unique slug (e.g., "claude-sonnet-4")
  name: string;                      // Display name (e.g., "Claude Sonnet 4")
  family: string;                    // FK → ModelFamily.id (e.g., "claude-sonnet")
  creator: string;                   // Creator name (e.g., "anthropic")
  category: ModelCategory;           // Primary category
  secondary_categories?: ModelCategory[]; // e.g., o3 is "reasoning" + "flagship"

  // === Lifecycle ===
  status: ModelStatus;               // active | deprecated | legacy
  successor?: string;                // ID of replacement model

  // === Modalities (coding-relevant) ===
  modality_input: Modality[];        // text | image | pdf | code
  modality_output: Modality[];

  // === Limits ===
  context_window: number;            // Total context window in tokens
  context_window_extended?: number;  // Extended context mode (if supported)
  max_output_tokens?: number;

  // === Inference Parameters ===
  reasoning?: boolean;               // Chain-of-thought model
  temperature?: boolean;             // Supports temperature parameter

  // === Dates ===
  release_date: string;              // ISO 8601
  last_updated?: string;
  knowledge?: string;                // Training data cutoff

  // === Architecture ===
  parameters?: string;               // e.g., "14B", "400B (17B active)"
  architecture?: string;             // e.g., "dense transformer", "MoE"

  // === Open Weights ===
  is_open_source: boolean;
  license?: string;
  weights_url?: string;              // HuggingFace URL
  quantizations?: string[];          // e.g., ["Q4_K_M", "GGUF", "AWQ"]

  // === Languages ===
  multilingual?: string[];           // Languages the model handles well

  // === Capabilities ===
  capabilities: ModelCapabilities;

  // === Benchmarks ===
  benchmarks?: ModelBenchmarks;

  // === Pricing Reference ===
  cost?: ModelCost;                  // { input, output, cache_read?, cache_write? } $/Mtok

  // === URLs ===
  description?: string;
  url?: string;
  documentation_url?: string;

  // === Access ===
  supportedOn: AccessType[];
  tags?: string[];
}
```

### Type Aliases

| Type | Values | Description |
|------|--------|-------------|
| `ModelStatus` | `active`, `deprecated`, `legacy` | Model lifecycle status |
| `ModelCategory` | `flagship`, `mid`, `small`, `reasoning`, `code`, `agentic` | Model tier/category |
| `AccessType` | `free`, `api`, `sub`, `local` | How the model can be accessed |
| `Modality` | `text`, `image`, `pdf`, `code` | Input/output modalities (coding-relevant) |

### ModelFamily (`src/data/schema/model.ts`)

Groups model versions into lineages. The `family` field on `Model` is a FK to `ModelFamily.id`.

```typescript
interface ModelFamily {
  id: string;            // "claude-sonnet" — matches Model.family
  name: string;          // "Claude Sonnet"
  creator: string;       // "anthropic"
  description?: string;  // Line description
  url?: string;          // Official family page
}
```

### ModelCapabilities

```typescript
interface ModelCapabilities {
  // Core API features
  streaming: boolean;
  function_calling: boolean;
  json_mode?: boolean;
  json_schema?: boolean;
  system_prompt?: boolean;
  vision: boolean;
  structured_output?: boolean;   // Broader than json_schema (YAML, XML, etc.)

  // Coding & agentic features
  code_execution?: boolean;
  web_search?: boolean;
  mcp?: boolean;
  computer_use?: boolean;
  extended_thinking?: boolean;
  citations?: boolean;
  prompt_caching?: boolean;
  batch_api?: boolean;
  fine_tuning?: boolean;

  // Advanced agent capabilities
  parallel_tool_calls?: boolean; // Multiple tool calls in one response
  file_search?: boolean;         // Native RAG on files
  canvas?: boolean;              // Collaborative code editing (Canvas, Artifacts)
  diff_output?: boolean;         // Can output diffs/patches
}
```

### ModelBenchmarks

```typescript
interface ModelBenchmarks {
  // ============ GENERAL REASONING ============
  mmlu?: number;                  // Massive Multitask Language Understanding
  mmlu_pro?: number;              // Harder variant with more challenging questions
  gpqa_diamond?: number;          // Graduate-Level Google-Proof Q&A (expert-level)
  arc_challenge?: number;         // Abstraction and Reasoning Corpus (AI2)
  big_bench_hard?: number;       // BIG-Bench Hard subset
  hellaswag?: number;            // Commonsense reasoning
  truthfulqa?: number;           // Truthfulness against misleading questions

  // ============ MATH ============
  gsm8k?: number;                // Grade School Math 8K
  gsm8k_plus?: number;           // Harder variant
  math?: number;                 // Competition mathematics (AMC, AIME level)
  math_500?: number;             // MATH benchmark (500 problems)
  frontier_math?: number;        // Novel math problems
  aime_2025?: number;            // American Invitational Mathematics Examination

  // ============ CODING ============
  humaneval?: number;            // OpenAI's Python coding benchmark
  mbpp?: number;                 // Mostly Basic Python Problems
  mbpp_plus?: number;            // Harder variant
  swe_bench?: number;            // Software Engineering (GitHub issues)
  verified_swe_bench?: number;   // Filtered SWE-Bench subset
  swe_bench_lite?: number;       // Faster variant (500 samples)
  multi_swe_bench?: number;      // Multi-file scenarios
  bigcodebench?: number;         // Improved coding benchmark
  bigcodebench_hard?: number;    // Harder variant
  aider_polyglot?: number;       // Multi-language coding (12 languages)
  livecodebench?: number;        // Continuous evaluation
  sandbox_eval?: number;          // Sandboxed coding
  simpler_eval?: number;          // Simplified coding
  bfcl?: number;                 // Berkeley Function Calling
  nexus?: number;                // Code editing

  // ============ AGENTIC ============
  tau_bench?: number;            // Tool-augmented reasoning
  tau_bench_human?: number;      // Human-evaluated tool usage
  webarena?: number;             // Web shopping/forum tasks
  miniwoz?: number;              // Dialogue tasks
  weblinx?: number;              // Web instruction following
  terminal_bench?: number;       // CLI/terminal tasks
  os_bench?: number;             // OS task completion
  swe_agent?: number;             // Software engineering agent
  ml_bench?: number;             // ML task execution

  // ============ CYBERSECURITY ============
  cybench?: number;              // Cybersecurity CTF-style
  crack_bench?: number;          // Password cracking

  // ============ MULTIMODAL ============
  mmmu?: number;                 // Multi-modal understanding
  mathvista?: number;             // Visual math reasoning
  chart_qa?: number;              // Chart understanding
  docvqa?: number;               // Document VQA

  // ============ SAFETY ============
  prompt_injection?: number;     // Adversarial prompts
  owase_bench?: number;          // Agent safety evaluation

  // ============ COMPOSITE & ARENA ============
  arena_elo?: number;            // Chatbot Arena (LMSYS)
  livebench?: number;            // Continuous evaluation
  tier_list?: number;            // TIER List (coding-focused)
  scale_leaderboard?: number;    // Scale AI coding leaderboard

  // ============ KNOWLEDGE ============
  humanity_last_exam?: number;   // Terminal knowledge (beyond training)
  c_eval?: number;               // Chinese evaluation
  cmmlu?: number;                // Chinese MMLU

  // ============ CUSTOM ============
  custom?: Record<string, number>;
}
```

> 📖 **See also:** [modelradar.ai/benchmarks](https://modelradar.ai/benchmarks) — glossary with full descriptions and scoring methodology.

### Provider Interface (`src/data/schema/provider.ts`)

Represents an API provider platform:

```typescript
interface Provider {
  id: string;
  name: string;
  description?: string;              // Short description
  type: ProviderType;                // direct | aggregator | cloud | self_hosted
  status: ProviderStatus;            // active | maintenance | sunset
  logo_url?: string;
  url?: string;
  regions?: string[];
  auth_type?: string;
  has_free_tier?: boolean;
  billing_model?: BillingModel;      // pay_per_token | subscription | credits | enterprise
  sdk?: string[];
  openai_compatible: boolean;
  compliance?: string[];             // ["SOC2", "HIPAA", "GDPR", "FedRAMP"]
}
```

### ProviderOffer Interface (`src/data/schema/offer.ts`)

Links a model to a provider with pricing and availability:

```typescript
interface ProviderOffer {
  model_id: string;
  provider_id: string;
  provider_model_id: string;          // Exact model ID in provider's API

  // Pricing
  input_per_mtok: number;
  output_per_mtok: number;
  cache_read_per_mtok?: number;
  cache_write_per_mtok?: number;
  batch_input_per_mtok?: number;
  batch_output_per_mtok?: number;

  // Provider-specific limits (can differ from model defaults)
  context_window?: number;
  max_output_tokens?: number;

  // Rate limits & performance
  rate_limit_rpm?: number;
  rate_limit_tpm?: number;
  latency_ttft_ms?: number;
  tokens_per_second?: number;

  // Availability
  status: OfferStatus;                // ga | preview | beta | deprecated
  available_since?: string;
  last_price_update?: string;         // When pricing last changed

  // Features
  fine_tuning_available?: boolean;
  regions?: string[];                 // Regions specific to this offer
  notes?: string;
}
```

---

## Data Flow

```
┌───────────────────────────────────────────────────────────────────┐
│                         src/data/                                 │
│                                                                   │
│  models/{creator}/{model-id}.ts     providers/{provider-id}.ts   │
│  ┌──────────────────────────┐       ┌─────────────────────────┐  │
│  │      ModelEntry          │       │       Provider          │  │
│  │  ┌──────────────────┐    │       │  name, type, regions,   │  │
│  │  │  model (Model)   │    │       │  compliance, SDK, ...   │  │
│  │  │  id, name, caps, │    │       └─────────────────────────┘  │
│  │  │  benchmarks, ... │    │                  │                  │
│  │  ├──────────────────┤    │                  │                  │
│  │  │  offers[]        │    │    offer.provider_id ──────────┘   │
│  │  │  provider_id ────┼────┼──►                                 │
│  │  │  pricing, limits │    │                                    │
│  │  └──────────────────┘    │       families/index.ts            │
│  └──────────────────────────┘       ┌─────────────────────────┐  │
│              │                      │  ModelFamily             │  │
│              │ auto-flatten         │  model.family ──────────┤  │
│              ▼                      └─────────────────────────┘  │
│    models/index.ts                                               │
│    allEntries[] → allModels[] + allOffers[]                      │
│              │                                                   │
│              ▼                                                   │
│    src/data/index.ts (helpers: getModelById, getOffersForModel)  │
└───────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                       src/routes/
              (DataTable, model detail, etc.)
```

---

## Features

### Model Catalog
- Browse all available LLM models in a sortable, filterable table
- Filter by category, creator, access type, pricing range
- Full-text search on model names

### Provider Offers
- Each model can be available through multiple providers
- Providers offer different pricing, rate limits, and latency
- Compare offers side-by-side

### Favorites
- Star models to save them for later (requires Supabase auth)
- View favorites in dedicated page

### Dark/Light Theme
- Toggle between light, dark, and auto theme
- Theme preference persisted in localStorage

---

## Available Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm start

# Type checking
pnpm typecheck

# Linting & formatting
pnpm check
```

---

## Adding New Models

> See [`AGENTS_UPDATER.md`](./AGENTS_UPDATER.md) for the complete guide (designed for AI agents).

1. **Create** `src/data/models/{creator}/{model-id}.ts` — one file per model
2. **Export** from `src/data/models/{creator}/index.ts`
3. **Run `pnpm build`** to verify

Example model entry:

```typescript
// src/data/models/anthropic/claude-sonnet-4.ts
import type { ModelEntry } from "@/data/schema";

export const claudeSonnet4: ModelEntry = {
  model: {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4",
    family: "claude-sonnet",
    creator: "anthropic",
    category: "flagship",
    status: "active",
    modality_input: ["text", "image", "pdf"],
    modality_output: ["text"],
    context_window: 200000,
    max_output_tokens: 16000,
    is_open_source: false,
    release_date: "2025-05-14",
    reasoning: true,
    capabilities: { streaming: true, function_calling: true, vision: true, mcp: true, /* ... */ },
    cost: { input: 3, output: 15 },
    supportedOn: ["api"],
  },
  offers: [
    { provider_id: "anthropic", provider_model_id: "claude-sonnet-4-20250514", input_per_mtok: 3.0, output_per_mtok: 15.0, status: "ga" },
    { provider_id: "openrouter", provider_model_id: "anthropic/claude-sonnet-4", input_per_mtok: 3.0, output_per_mtok: 15.0, status: "ga" },
  ],
};
```

---

## Column Reference

### Main Table Columns

> 📖 Table supports horizontal scroll with sticky first column (Model name).

| Column | Field | Sortable | Filterable | Filter Type |
|--------|-------|----------|------------|-------------|
| Model | `name` | ✅ | ✅ | text |
| Family | `family` | ✅ | ✅ | select |
| Creator | `creator` | ✅ | ✅ | select |
| Cat | `category` | ✅ | ✅ | multi-select |
| Access | `supportedOn` | ❌ | ✅ | multi-select |
| Context | `context_window` | ✅ | ✅ | range |
| In | `cost.input` | ✅ | ✅ | range |
| Out | `cost.output` | ✅ | ✅ | range |
| R | `reasoning` | ✅ | ✅ | boolean |
| TC | `capabilities.function_calling` | ✅ | ✅ | boolean |
| Open | `is_open_source` | ❌ | ✅ | boolean |

### Benchmark Columns

| Column | Field | Sortable | Description |
|--------|-------|----------|-------------|
| **SWE** | `benchmarks.swe_bench` | ✅ | SWE-Bench software engineering |
| **SWE✓** | `benchmarks.verified_swe_bench` | ✅ | SWE-Bench Verified (filtered) |
| **HE** | `benchmarks.humaneval` | ✅ | HumanEval Python coding |
| **MBPP** | `benchmarks.mbpp` | ✅ | Mostly Basic Python Problems |
| **BCB** | `benchmarks.bigcodebench` | ✅ | BigCodeBench coding |
| **Aider** | `benchmarks.aider_polyglot` | ✅ | Multi-language coding |
| **BFCL** | `benchmarks.bfcl` | ✅ | Berkeley Function Calling |
| **MMLU** | `benchmarks.mmlu` | ✅ | Massive Multitask Language |
| **GPQA** | `benchmarks.gpqa_diamond` | ✅ | Graduate-level reasoning |
| **Math** | `benchmarks.math_500` | ✅ | Competition math |
| **GSM8K** | `benchmarks.gsmm8k` | ✅ | Grade school math |
| **AIME** | `benchmarks.aime_2025` | ✅ | Math competition |
| **Arena** | `benchmarks.arena_elo` | ✅ | Chatbot Arena ELO |
| **Live** | `benchmarks.livebench` | ✅ | LiveBench continuous |
| **TIER** | `benchmarks.tier_list` | ✅ | TIER List coding score |
| **HLE** | `benchmarks.humanity_last_exam` | ✅ | Humanity's Last Exam |
| **TAU** | `benchmarks.tau_bench` | ✅ | Tool-augmented reasoning |
| **Term** | `benchmarks.terminal_bench` | ✅ | Terminal/CLI tasks |
| **Knt** | `knowledge` | ✅ | Training knowledge cutoff |
| **Rel** | `release_date` | ✅ | Release date |
| **Docs** | `documentation_url` | ❌ | Documentation link |
| ★ | — (display) | ❌ | Favorite toggle |

> 📖 See [ModelBenchmarks interface](#modelbenchmarks) for full list of supported benchmarks.

---

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Both are optional — the app works without Supabase (favorites won't persist).

---

## License

Private — all rights reserved.

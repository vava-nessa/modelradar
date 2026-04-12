# ModelRadar v1 — Product Requirements Document

> **Document version:** 1.0  
> **Date:** 2026-04-12  
> **Author:** Vanechacha (vava.dev)  
> **Purpose:** Spec technique complète pour le développement de ModelRadar v1 par un agent de code autonome.  
> **Scope:** Système fonctionnel avec 5-6 modèles d'exemple. Le contenu exhaustif sera ajouté en phase 2.

---

## Table des matières

1. [Vision produit](#1-vision-produit)
2. [Stack technologique](#2-stack-technologique)
3. [Architecture données](#3-architecture-données)
4. [Types TypeScript complets](#4-types-typescript-complets)
5. [Données d'exemple](#5-données-dexemple)
6. [Structure des fichiers](#6-structure-des-fichiers)
7. [Pages et routes](#7-pages-et-routes)
8. [UI et design](#8-ui-et-design)
9. [Authentification et favoris (Supabase)](#9-authentification-et-favoris-supabase)
10. [TanStack Table — colonnes et fonctionnalités](#10-tanstack-table--colonnes-et-fonctionnalités)
11. [Phases de développement](#11-phases-de-développement)

---

## 1. Vision produit

ModelRadar est un comparateur de modèles LLM qui sépare deux couches d'information :

- **Les modèles** : leurs capacités intrinsèques, benchmarks, specs techniques, context window — ce qui ne change pas selon où on les utilise.
- **Les providers** : les plateformes qui vendent l'accès à ces modèles (Anthropic API, OpenRouter, AWS Bedrock, etc.) — avec leurs prix, rate limits, latence, et particularités.

L'utilisateur peut :
1. Comparer les modèles entre eux (capacités, benchmarks, context window)
2. Pour un modèle donné, voir tous les providers disponibles avec leurs prix
3. Comparer les providers entre eux
4. Se connecter pour sauvegarder des modèles en favoris
5. Filtrer et trier de larges quantités de données dans des tables virtualisées

**Référence design :** [models.dev](https://models.dev) — interface minimaliste, header fin, 100% axé sur les données.

---

## 2. Stack technologique

### Framework et build

| Outil | Version | Rôle |
|---|---|---|
| **TanStack Start** | v1.x (stable) | Meta-framework React full-stack, SSR, server functions |
| **TanStack Router** | v1.x | Routing type-safe, search params typés |
| **TanStack Table** | v8.x | Datagrid headless : tri, filtres, colonnes |
| **TanStack Virtual** | v3.x | Virtualisation des lignes pour les grandes tables |
| **TanStack Query** | v5.x | Data fetching, cache, sync avec Supabase |
| **Vite** | v8.x | Build tool (Rolldown + Oxc sous le capot) |
| **React** | v19.x | UI library |
| **TypeScript** | v5.x | Typage strict sur tout le projet |

### Backend et auth

| Outil | Rôle |
|---|---|
| **Supabase** | Auth (email + GitHub OAuth) + base de données favoris |
| **Supabase JS SDK** | `@supabase/supabase-js` v2.x pour le client |

### Styling

| Outil | Rôle |
|---|---|
| **Tailwind CSS** | v4.x, utility-first |
| **Design tokens** | Couleurs custom dans la config Tailwind |

### Package manager et tooling

| Outil | Rôle |
|---|---|
| **pnpm** | Package manager (strict, pas npm ni yarn) |
| **Biome** | Linter + formatter (pas ESLint/Prettier) |

### Déploiement

| Outil | Rôle |
|---|---|
| **Vercel** ou **Cloudflare Pages** | Hébergement (TanStack Start supporte les deux) |

### Règles pour l'agent de code

- Utiliser `pnpm` exclusivement, jamais `npm` ni `yarn`.
- Ne jamais faire de `git commit` automatique.
- Utiliser JSDoc sur toutes les fonctions exportées.
- TypeScript strict mode activé, pas de `any`.
- Pas de fichiers `.js`, tout en `.ts` / `.tsx`.
- Imports avec `@/` comme alias pour `src/`.

---

## 3. Architecture données

### Principe fondamental

Les données des modèles et providers sont **statiques et versionnées dans le repo Git** sous forme de fichiers TypeScript. Il n'y a **pas de base de données** pour le catalogue. Seuls les favoris utilisateur sont stockés dans Supabase.

### Les 3 entités

```
┌─────────────┐       ┌─────────────────┐       ┌─────────────┐
│   Model     │◄──────│  ProviderOffer   │──────►│  Provider   │
│             │  1:N  │  (table jointure)│  N:1  │             │
│ id          │       │ model_id (FK)    │       │ id          │
│ name        │       │ provider_id (FK) │       │ name        │
│ capabilities│       │ pricing          │       │ type        │
│ benchmarks  │       │ rate_limits      │       │ regions     │
│ context     │       │ latency          │       │ ...         │
│ ...         │       │ ...              │       │             │
└─────────────┘       └─────────────────┘       └─────────────┘
                              │
                              │ (Supabase uniquement)
                              ▼
                      ┌─────────────────┐
                      │  UserFavorite   │
                      │ user_id (FK)    │
                      │ model_id        │
                      │ provider_id?    │
                      │ created_at      │
                      └─────────────────┘
```

**Pourquoi cette séparation :**

- Un **Model** (Claude Sonnet 4) a des capacités fixes : son context window, ses benchmarks, ses modalités. Ça ne change pas selon le provider.
- Un **Provider** (OpenRouter, AWS Bedrock) a ses propres caractéristiques : régions, type d'auth, compatibilité OpenAI, modèle de facturation.
- Un **ProviderOffer** est le lien entre les deux : le prix de Claude Sonnet 4 chez OpenRouter, son model ID chez Bedrock, sa latence chez Anthropic direct. C'est une relation **many-to-many** : un modèle est dispo chez N providers, un provider propose N modèles.

---

## 4. Types TypeScript complets

### `src/data/schema/model.ts`

```typescript
/** Catégorie principale du modèle */
export type ModelCategory =
  | "flagship"
  | "mid"
  | "small"
  | "embedding"
  | "reasoning"
  | "code"
  | "image"
  | "audio"
  | "video";

/** Modalités d'entrée/sortie */
export type Modality = "text" | "image" | "audio" | "video" | "pdf" | "code";

/** Capacités API du modèle */
export interface ModelCapabilities {
  streaming: boolean;
  function_calling: boolean;
  json_mode?: boolean;
  json_schema?: boolean;
  system_prompt?: boolean;
  vision: boolean;
  image_gen?: boolean;
  audio_input?: boolean;
  audio_output?: boolean;
  code_execution?: boolean;
  web_search?: boolean;
  mcp?: boolean;
  computer_use?: boolean;
  extended_thinking?: boolean;
}

/**
 * 📖 Scores de benchmarks — coding & reasoning focused
 * Tous optionnels car chaque modèle publie des scores différents.
 *
 * Catégories de benchmarks :
 * - General Reasoning: MMLU, MMLU Pro, GPQA, ARC, BIG-Bench Hard, HellaSwag, TruthfulQA
 * - Math: GSM8K, GSM8K Plus, MATH, FrontierMath, AIME
 * - Coding: HumanEval, MBPP, SWE-Bench, BigCodeBench, Aider, CyberSec
 * - Agentic: TAU-Bench, WebArena, MiniWoz, BFCL
 * - Multimodal: MMMU, MMT, MathVista
 * - Safety: Prompt Injection, OWASE-Bench
 * - Composite: LiveBench, Chatbot Arena (LMSYS), TIER List
 * - Knowledge: Humanity's Last Exam (HLE)
 */
export interface ModelBenchmarks {
  // ============ GENERAL REASONING ============
  mmlu?: number;                  // Massive Multitask Language Understanding
  mmlu_pro?: number;              // Harder variant with challenging questions
  gpqa_diamond?: number;          // Graduate-Level Google-Proof Q&A
  arc_challenge?: number;         // Abstraction and Reasoning Corpus
  big_bench_hard?: number;       // BIG-Bench Hard subset
  hellaswag?: number;            // Commonsense reasoning
  truthfulqa?: number;           // Truthfulness evaluation

  // ============ MATH ============
  gsm8k?: number;                // Grade School Math 8K
  gsm8k_plus?: number;           // Harder variant
  math?: number;                 // Competition mathematics
  math_500?: number;             // MATH benchmark (500 problems)
  frontier_math?: number;         // Novel math problems
  aime_2025?: number;            // American Invitational Mathematics Exam

  // ============ CODING ============
  humaneval?: number;            // OpenAI Python coding benchmark
  mbpp?: number;                // Mostly Basic Python Problems
  mbpp_plus?: number;            // Harder variant
  swe_bench?: number;           // Software Engineering (GitHub issues)
  verified_swe_bench?: number;   // Filtered SWE-Bench subset
  swe_bench_lite?: number;      // Faster variant (500 samples)
  multi_swe_bench?: number;     // Multi-file scenarios
  bigcodebench?: number;        // Improved coding benchmark
  bigcodebench_hard?: number;   // Harder variant
  aider_polyglot?: number;      // Multi-language coding
  livecodebench?: number;        // Continuous evaluation
  sandbox_eval?: number;         // Sandboxed coding
  simpler_eval?: number;        // Simplified coding
  bfcl?: number;               // Berkeley Function Calling
  nexus?: number;              // Code editing

  // ============ AGENTIC ============
  tau_bench?: number;           // Tool-augmented reasoning
  tau_bench_human?: number;     // Human-evaluated tool usage
  webarena?: number;            // Web shopping/forum tasks
  miniwoz?: number;           // Dialogue tasks
  weblinx?: number;            // Web instruction following
  terminal_bench?: number;      // CLI/terminal tasks
  os_bench?: number;           // OS task completion
  swe_agent?: number;          // Software engineering agent
  ml_bench?: number;           // ML task execution

  // ============ CYBERSECURITY ============
  cybench?: number;             // Cybersecurity CTF-style
  crack_bench?: number;         // Password cracking

  // ============ MULTIMODAL ============
  mmmu?: number;               // Multi-modal understanding
  mathvista?: number;           // Visual math reasoning
  chart_qa?: number;            // Chart understanding
  docvqa?: number;             // Document VQA

  // ============ SAFETY ============
  prompt_injection?: number;    // Adversarial prompts
  owase_bench?: number;         // Agent safety evaluation

  // ============ COMPOSITE & ARENA ============
  arena_elo?: number;           // Chatbot Arena (LMSYS)
  livebench?: number;           // Continuous evaluation
  tier_list?: number;           // TIER List (coding-focused)
  scale_leaderboard?: number;   // Scale AI coding leaderboard

  // ============ KNOWLEDGE ============
  humanity_last_exam?: number;   // Terminal knowledge (beyond training)
  c_eval?: number;              // Chinese evaluation
  cmmlu?: number;               // Chinese MMLU

  // ============ CUSTOM ============
  custom?: Record<string, number>;
}

/** Un modèle LLM — ses capacités intrinsèques, indépendantes du provider */
export interface Model {
  /** Slug unique, ex: "claude-sonnet-4" */
  id: string;
  /** Nom d'affichage, ex: "Claude Sonnet 4" */
  name: string;
  /** Créateur du modèle (pas le provider), ex: "anthropic" */
  creator: string;
  /** Catégorie principale */
  category: ModelCategory;
  /** Modalités acceptées en entrée */
  modality_input: Modality[];
  /** Modalités en sortie */
  modality_output: Modality[];
  /** Fenêtre de contexte totale (tokens) */
  context_window: number;
  /** Max tokens en sortie */
  max_output_tokens?: number;
  /** Open-source ou open-weight */
  is_open_source: boolean;
  /** Type de licence */
  license?: string;
  /** Nombre de paramètres (si publié), ex: "~70B" */
  parameters?: string;
  /** Architecture, ex: "dense transformer", "MoE" */
  architecture?: string;
  /** Date de cutoff des données d'entraînement */
  training_cutoff?: string;
  /** Date de sortie (ISO 8601) */
  release_date: string;
  /** Capacités API */
  capabilities: ModelCapabilities;
  /** Scores de benchmarks */
  benchmarks?: ModelBenchmarks;
  /** Description courte */
  description?: string;
  /** Lien vers la doc officielle */
  url?: string;
  /** Tags libres pour le filtrage */
  tags?: string[];
}
```

### `src/data/schema/provider.ts`

```typescript
/** Type de provider */
export type ProviderType = "direct" | "aggregator" | "cloud" | "self_hosted";

/** Modèle de facturation */
export type BillingModel = "pay_per_token" | "subscription" | "credits" | "enterprise";

/** Une plateforme qui vend l'accès à des modèles via API */
export interface Provider {
  /** Slug unique, ex: "openrouter" */
  id: string;
  /** Nom d'affichage, ex: "OpenRouter" */
  name: string;
  /** Type de provider */
  type: ProviderType;
  /** URL du logo */
  logo_url?: string;
  /** Site web / documentation */
  url?: string;
  /** Régions disponibles */
  regions?: string[];
  /** Type d'authentification */
  auth_type?: string;
  /** Propose un tier gratuit */
  has_free_tier?: boolean;
  /** Modèle de facturation */
  billing_model?: BillingModel;
  /** SDKs officiels disponibles */
  sdk?: string[];
  /** API compatible format OpenAI */
  openai_compatible: boolean;
}
```

### `src/data/schema/offer.ts`

```typescript
/** Statut de disponibilité */
export type OfferStatus = "ga" | "preview" | "beta" | "deprecated";

/** Le lien entre un modèle et un provider — c'est ici que vivent le pricing et les rate limits */
export interface ProviderOffer {
  /** FK vers Model.id */
  model_id: string;
  /** FK vers Provider.id */
  provider_id: string;
  /** ID exact du modèle dans l'API du provider */
  provider_model_id: string;
  /** Coût input par million de tokens ($) */
  input_per_mtok: number;
  /** Coût output par million de tokens ($) */
  output_per_mtok: number;
  /** Coût lecture cache par Mtok ($) */
  cache_read_per_mtok?: number;
  /** Coût écriture cache par Mtok ($) */
  cache_write_per_mtok?: number;
  /** Coût batch input par Mtok ($) */
  batch_input_per_mtok?: number;
  /** Coût batch output par Mtok ($) */
  batch_output_per_mtok?: number;
  /** Coût par image générée ($) */
  image_per_unit?: number;
  /** Description des limites du free tier */
  free_tier_limits?: string;
  /** Rate limit requests/min */
  rate_limit_rpm?: number;
  /** Rate limit tokens/min */
  rate_limit_tpm?: number;
  /** Time to first token moyen (ms) */
  latency_ttft_ms?: number;
  /** Vitesse de génération (tokens/s) */
  tokens_per_second?: number;
  /** Statut de disponibilité */
  status: OfferStatus;
  /** Disponible chez ce provider depuis (ISO 8601) */
  available_since?: string;
  /** Particularités chez ce provider */
  notes?: string;
}
```

### `src/data/schema/index.ts`

```typescript
export type { Model, ModelCategory, Modality, ModelCapabilities, ModelBenchmarks } from "./model";
export type { Provider, ProviderType, BillingModel } from "./provider";
export type { ProviderOffer, OfferStatus } from "./offer";
```

---

## 5. Données d'exemple

> Ces données sont réelles et vérifiées. Elles servent à tester le système en v1.
> Le contenu exhaustif (100+ modèles, 15+ providers) sera ajouté en phase 2.

### 5 modèles

#### `src/data/models/anthropic.ts`

```typescript
import type { Model } from "@/data/schema";

export const anthropicModels: Model[] = [
  {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4",
    creator: "anthropic",
    category: "flagship",
    modality_input: ["text", "image", "pdf"],
    modality_output: ["text"],
    context_window: 200000,
    max_output_tokens: 16000,
    is_open_source: false,
    license: "proprietary",
    architecture: "dense transformer",
    training_cutoff: "2025-03",
    release_date: "2025-05-14",
    capabilities: {
      streaming: true,
      function_calling: true,
      json_mode: true,
      json_schema: true,
      system_prompt: true,
      vision: true,
      image_gen: false,
      audio_input: false,
      audio_output: false,
      code_execution: true,
      web_search: true,
      mcp: true,
      computer_use: true,
      extended_thinking: true,
    },
    benchmarks: {
      swe_bench: 72.7,
      arena_elo: 1305,
      gpqa_diamond: 70.1,
      humaneval: 93.0,
      aider_polyglot: 65.4,
    },
    description: "Best combination of performance, speed, and cost. Excels at coding, analysis, and complex reasoning.",
    url: "https://docs.anthropic.com/en/docs/about-claude/models",
    tags: ["frontier", "coding", "reasoning", "agentic"],
  },
  {
    id: "claude-opus-4",
    name: "Claude Opus 4",
    creator: "anthropic",
    category: "flagship",
    modality_input: ["text", "image", "pdf"],
    modality_output: ["text"],
    context_window: 200000,
    max_output_tokens: 32000,
    is_open_source: false,
    license: "proprietary",
    architecture: "dense transformer",
    training_cutoff: "2025-03",
    release_date: "2025-05-14",
    capabilities: {
      streaming: true,
      function_calling: true,
      json_mode: true,
      json_schema: true,
      system_prompt: true,
      vision: true,
      image_gen: false,
      audio_input: false,
      audio_output: false,
      code_execution: true,
      web_search: true,
      mcp: true,
      computer_use: true,
      extended_thinking: true,
    },
    benchmarks: {
      swe_bench: 79.4,
      arena_elo: 1410,
      gpqa_diamond: 74.8,
      humaneval: 95.0,
      tau_bench: 62.5,
    },
    description: "Most capable model for complex tasks, deep analysis, and extended autonomous coding sessions.",
    url: "https://docs.anthropic.com/en/docs/about-claude/models",
    tags: ["frontier", "coding", "reasoning", "agentic", "premium"],
  },
];
```

#### `src/data/models/openai.ts`

```typescript
import type { Model } from "@/data/schema";

export const openaiModels: Model[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    creator: "openai",
    category: "flagship",
    modality_input: ["text", "image", "audio"],
    modality_output: ["text", "audio"],
    context_window: 128000,
    max_output_tokens: 16384,
    is_open_source: false,
    license: "proprietary",
    training_cutoff: "2024-10",
    release_date: "2024-05-13",
    capabilities: {
      streaming: true,
      function_calling: true,
      json_mode: true,
      json_schema: true,
      system_prompt: true,
      vision: true,
      image_gen: false,
      audio_input: true,
      audio_output: true,
      code_execution: true,
      web_search: true,
      mcp: false,
      computer_use: false,
      extended_thinking: false,
    },
    benchmarks: {
      mmlu: 88.7,
      gpqa_diamond: 53.6,
      humaneval: 90.2,
      arena_elo: 1286,
      math_500: 76.6,
    },
    description: "OpenAI's versatile multimodal flagship model with strong all-around performance.",
    url: "https://platform.openai.com/docs/models/gpt-4o",
    tags: ["multimodal", "audio", "versatile"],
  },
  {
    id: "o3",
    name: "o3",
    creator: "openai",
    category: "reasoning",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 200000,
    max_output_tokens: 100000,
    is_open_source: false,
    license: "proprietary",
    training_cutoff: "2025-05",
    release_date: "2025-04-16",
    capabilities: {
      streaming: true,
      function_calling: true,
      json_mode: true,
      json_schema: true,
      system_prompt: true,
      vision: true,
      image_gen: false,
      audio_input: false,
      audio_output: false,
      code_execution: true,
      web_search: true,
      mcp: false,
      computer_use: false,
      extended_thinking: true,
    },
    benchmarks: {
      swe_bench: 69.1,
      gpqa_diamond: 79.7,
      arena_elo: 1415,
      math_500: 96.7,
      aime_2025: 88.9,
    },
    description: "OpenAI's most powerful reasoning model with extended chain-of-thought capabilities.",
    url: "https://platform.openai.com/docs/models/o3",
    tags: ["frontier", "reasoning", "math", "science"],
  },
];
```

#### `src/data/models/google.ts`

```typescript
import type { Model } from "@/data/schema";

export const googleModels: Model[] = [
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    creator: "google",
    category: "flagship",
    modality_input: ["text", "image", "audio", "video", "pdf"],
    modality_output: ["text"],
    context_window: 1048576,
    max_output_tokens: 65536,
    is_open_source: false,
    license: "proprietary",
    training_cutoff: "2025-01",
    release_date: "2025-03-25",
    capabilities: {
      streaming: true,
      function_calling: true,
      json_mode: true,
      json_schema: true,
      system_prompt: true,
      vision: true,
      image_gen: true,
      audio_input: true,
      audio_output: true,
      code_execution: true,
      web_search: true,
      mcp: false,
      computer_use: false,
      extended_thinking: true,
    },
    benchmarks: {
      swe_bench: 63.8,
      gpqa_diamond: 68.9,
      arena_elo: 1380,
      math_500: 90.2,
      humaneval: 91.4,
      aime_2025: 86.7,
    },
    description: "Google's most capable model with 1M context window and native multimodal capabilities.",
    url: "https://ai.google.dev/gemini-api/docs/models#gemini-2.5-pro",
    tags: ["frontier", "reasoning", "multimodal", "long-context"],
  },
];
```

#### `src/data/models/meta.ts`

```typescript
import type { Model } from "@/data/schema";

export const metaModels: Model[] = [
  {
    id: "llama-4-maverick",
    name: "Llama 4 Maverick",
    creator: "meta",
    category: "flagship",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 1048576,
    max_output_tokens: 65536,
    is_open_source: true,
    license: "llama-4-community",
    parameters: "400B (17B active)",
    architecture: "MoE",
    training_cutoff: "2025-03",
    release_date: "2025-04-05",
    capabilities: {
      streaming: true,
      function_calling: true,
      json_mode: true,
      json_schema: false,
      system_prompt: true,
      vision: true,
      image_gen: false,
      audio_input: false,
      audio_output: false,
      code_execution: false,
      web_search: false,
      mcp: false,
      computer_use: false,
      extended_thinking: false,
    },
    benchmarks: {
      mmlu: 87.2,
      gpqa_diamond: 62.4,
      humaneval: 88.5,
      arena_elo: 1320,
      math_500: 78.1,
    },
    description: "Meta's open-weight MoE model with 1M context window. 400B total params, 17B active per forward pass.",
    url: "https://llama.meta.com",
    tags: ["open-source", "MoE", "long-context"],
  },
];
```

#### `src/data/models/index.ts`

```typescript
import { anthropicModels } from "./anthropic";
import { openaiModels } from "./openai";
import { googleModels } from "./google";
import { metaModels } from "./meta";
import type { Model } from "@/data/schema";

export const allModels: Model[] = [
  ...anthropicModels,
  ...openaiModels,
  ...googleModels,
  ...metaModels,
];
```

### 4 providers

#### `src/data/providers/index.ts`

```typescript
import type { Provider } from "@/data/schema";

export const allProviders: Provider[] = [
  {
    id: "anthropic",
    name: "Anthropic API",
    type: "direct",
    url: "https://console.anthropic.com",
    regions: ["us", "eu"],
    auth_type: "api_key",
    has_free_tier: true,
    billing_model: "pay_per_token",
    sdk: ["python", "typescript"],
    openai_compatible: false,
  },
  {
    id: "openai",
    name: "OpenAI Platform",
    type: "direct",
    url: "https://platform.openai.com",
    regions: ["us", "eu", "asia"],
    auth_type: "api_key",
    has_free_tier: true,
    billing_model: "pay_per_token",
    sdk: ["python", "typescript", "dotnet", "java"],
    openai_compatible: true,
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    type: "aggregator",
    url: "https://openrouter.ai",
    regions: ["us"],
    auth_type: "api_key",
    has_free_tier: true,
    billing_model: "pay_per_token",
    sdk: [],
    openai_compatible: true,
  },
  {
    id: "bedrock",
    name: "AWS Bedrock",
    type: "cloud",
    url: "https://aws.amazon.com/bedrock",
    regions: ["us-east-1", "us-west-2", "eu-west-1", "ap-northeast-1"],
    auth_type: "iam",
    has_free_tier: false,
    billing_model: "pay_per_token",
    sdk: ["python", "typescript", "java", "dotnet"],
    openai_compatible: false,
  },
];
```

### Offers (table de jointure)

#### `src/data/offers/index.ts`

```typescript
import type { ProviderOffer } from "@/data/schema";

export const allOffers: ProviderOffer[] = [
  // --- Claude Sonnet 4 ---
  {
    model_id: "claude-sonnet-4",
    provider_id: "anthropic",
    provider_model_id: "claude-sonnet-4-20250514",
    input_per_mtok: 3.0,
    output_per_mtok: 15.0,
    cache_read_per_mtok: 0.3,
    cache_write_per_mtok: 3.75,
    batch_input_per_mtok: 1.5,
    batch_output_per_mtok: 7.5,
    rate_limit_rpm: 4000,
    rate_limit_tpm: 400000,
    status: "ga",
    available_since: "2025-05-14",
  },
  {
    model_id: "claude-sonnet-4",
    provider_id: "openrouter",
    provider_model_id: "anthropic/claude-sonnet-4",
    input_per_mtok: 3.0,
    output_per_mtok: 15.0,
    status: "ga",
    available_since: "2025-05-14",
    notes: "OpenAI-compatible endpoint",
  },
  {
    model_id: "claude-sonnet-4",
    provider_id: "bedrock",
    provider_model_id: "anthropic.claude-sonnet-4-20250514-v1:0",
    input_per_mtok: 3.0,
    output_per_mtok: 15.0,
    rate_limit_rpm: 1000,
    status: "ga",
    available_since: "2025-05-20",
    notes: "Cross-region inference available",
  },

  // --- Claude Opus 4 ---
  {
    model_id: "claude-opus-4",
    provider_id: "anthropic",
    provider_model_id: "claude-opus-4-20250514",
    input_per_mtok: 15.0,
    output_per_mtok: 75.0,
    cache_read_per_mtok: 1.5,
    cache_write_per_mtok: 18.75,
    batch_input_per_mtok: 7.5,
    batch_output_per_mtok: 37.5,
    rate_limit_rpm: 2000,
    rate_limit_tpm: 200000,
    status: "ga",
    available_since: "2025-05-14",
  },
  {
    model_id: "claude-opus-4",
    provider_id: "openrouter",
    provider_model_id: "anthropic/claude-opus-4",
    input_per_mtok: 15.0,
    output_per_mtok: 75.0,
    status: "ga",
    available_since: "2025-05-15",
  },

  // --- GPT-4o ---
  {
    model_id: "gpt-4o",
    provider_id: "openai",
    provider_model_id: "gpt-4o",
    input_per_mtok: 2.5,
    output_per_mtok: 10.0,
    rate_limit_rpm: 10000,
    rate_limit_tpm: 30000000,
    status: "ga",
    available_since: "2024-05-13",
  },
  {
    model_id: "gpt-4o",
    provider_id: "openrouter",
    provider_model_id: "openai/gpt-4o",
    input_per_mtok: 2.5,
    output_per_mtok: 10.0,
    status: "ga",
    available_since: "2024-05-13",
  },

  // --- o3 ---
  {
    model_id: "o3",
    provider_id: "openai",
    provider_model_id: "o3",
    input_per_mtok: 2.0,
    output_per_mtok: 8.0,
    status: "ga",
    available_since: "2025-04-16",
  },
  {
    model_id: "o3",
    provider_id: "openrouter",
    provider_model_id: "openai/o3",
    input_per_mtok: 2.0,
    output_per_mtok: 8.0,
    status: "ga",
    available_since: "2025-04-18",
  },

  // --- Gemini 2.5 Pro ---
  {
    model_id: "gemini-2.5-pro",
    provider_id: "openrouter",
    provider_model_id: "google/gemini-2.5-pro-preview",
    input_per_mtok: 1.25,
    output_per_mtok: 10.0,
    status: "preview",
    available_since: "2025-03-26",
  },

  // --- Llama 4 Maverick ---
  {
    model_id: "llama-4-maverick",
    provider_id: "openrouter",
    provider_model_id: "meta-llama/llama-4-maverick",
    input_per_mtok: 0.22,
    output_per_mtok: 0.88,
    status: "ga",
    available_since: "2025-04-06",
  },
  {
    model_id: "llama-4-maverick",
    provider_id: "bedrock",
    provider_model_id: "meta.llama4-maverick-17b-instruct-v1:0",
    input_per_mtok: 0.22,
    output_per_mtok: 0.88,
    status: "ga",
    available_since: "2025-04-10",
  },
];
```

### Data helpers

#### `src/data/index.ts`

```typescript
import { allModels } from "./models";
import { allProviders } from "./providers";
import { allOffers } from "./offers";
import type { Model, Provider, ProviderOffer } from "./schema";

export { allModels, allProviders, allOffers };
export type { Model, Provider, ProviderOffer };

/** Toutes les offres pour un modèle donné, enrichies avec les infos provider */
export function getOffersForModel(modelId: string): (ProviderOffer & { provider: Provider })[] {
  return allOffers
    .filter((o) => o.model_id === modelId)
    .map((o) => ({
      ...o,
      provider: allProviders.find((p) => p.id === o.provider_id)!,
    }));
}

/** Tous les modèles disponibles chez un provider, enrichis avec l'offre */
export function getModelsForProvider(providerId: string): (Model & { offer: ProviderOffer })[] {
  return allOffers
    .filter((o) => o.provider_id === providerId)
    .map((o) => ({
      ...allModels.find((m) => m.id === o.model_id)!,
      offer: o,
    }));
}

/** Trouver un modèle par son ID */
export function getModelById(id: string): Model | undefined {
  return allModels.find((m) => m.id === id);
}

/** Trouver un provider par son ID */
export function getProviderById(id: string): Provider | undefined {
  return allProviders.find((p) => p.id === id);
}

/** Prix le plus bas pour un modèle (input) tous providers confondus */
export function getCheapestInputPrice(modelId: string): number | null {
  const offers = allOffers.filter((o) => o.model_id === modelId);
  if (offers.length === 0) return null;
  return Math.min(...offers.map((o) => o.input_per_mtok));
}

/** Prix le plus bas pour un modèle (output) tous providers confondus */
export function getCheapestOutputPrice(modelId: string): number | null {
  const offers = allOffers.filter((o) => o.model_id === modelId);
  if (offers.length === 0) return null;
  return Math.min(...offers.map((o) => o.output_per_mtok));
}

/** Nombre de providers disponibles pour un modèle */
export function getProviderCount(modelId: string): number {
  return allOffers.filter((o) => o.model_id === modelId).length;
}
```

---

## 6. Structure des fichiers

```
modelradar/
├── app.config.ts                    # Config TanStack Start
├── tsr.config.json                  # Config TanStack Router (file-based routing)
├── vite.config.ts                   # Config Vite 8
├── tailwind.config.ts               # Tailwind v4 config + design tokens
├── tsconfig.json                    # TypeScript strict
├── package.json
├── .env.local                       # VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
│
├── src/
│   ├── data/                        # === DONNÉES STATIQUES (pas de DB) ===
│   │   ├── schema/
│   │   │   ├── model.ts             # Types Model, Capabilities, Benchmarks
│   │   │   ├── provider.ts          # Types Provider
│   │   │   ├── offer.ts             # Types ProviderOffer
│   │   │   └── index.ts             # Re-exports
│   │   ├── models/
│   │   │   ├── anthropic.ts         # Données modèles Anthropic
│   │   │   ├── openai.ts            # Données modèles OpenAI
│   │   │   ├── google.ts            # Données modèles Google
│   │   │   ├── meta.ts              # Données modèles Meta
│   │   │   └── index.ts             # allModels: Model[]
│   │   ├── providers/
│   │   │   └── index.ts             # allProviders: Provider[]
│   │   ├── offers/
│   │   │   └── index.ts             # allOffers: ProviderOffer[]
│   │   └── index.ts                 # Exports + helpers (getOffersForModel, etc.)
│   │
│   ├── routes/                      # === PAGES (file-based routing TanStack Router) ===
│   │   ├── __root.tsx               # Layout racine (header + outlet)
│   │   ├── index.tsx                # / → page d'accueil = table des modèles
│   │   ├── models/
│   │   │   └── $modelId.tsx         # /models/:modelId → fiche modèle + offres
│   │   ├── providers/
│   │   │   ├── index.tsx            # /providers → table des providers
│   │   │   └── $providerId.tsx      # /providers/:providerId → fiche provider + modèles
│   │   ├── login.tsx                # /login → page de connexion
│   │   └── favorites.tsx            # /favorites → modèles favoris (auth required)
│   │
│   ├── components/                  # === COMPOSANTS UI ===
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Barre header fine (logo, nav, auth)
│   │   │   └── Container.tsx        # Wrapper de contenu avec max-width
│   │   ├── table/
│   │   │   ├── DataTable.tsx        # Composant table générique (TanStack Table + Virtual)
│   │   │   ├── ColumnFilter.tsx     # Filtre par colonne (text, range, select)
│   │   │   ├── SortHeader.tsx       # Header de colonne cliquable pour tri
│   │   │   └── Pagination.tsx       # Contrôles de pagination (si pas virtualisation)
│   │   ├── model/
│   │   │   ├── ModelTable.tsx        # Table des modèles avec column defs
│   │   │   ├── ModelCard.tsx         # Card résumé d'un modèle (fiche détail)
│   │   │   ├── CapabilitiesBadges.tsx # Badges pour les capabilities (vision, MCP...)
│   │   │   └── BenchmarkBar.tsx      # Barre de progression pour un score
│   │   ├── provider/
│   │   │   ├── ProviderTable.tsx     # Table des providers
│   │   │   └── ProviderBadge.tsx     # Badge type (direct, aggregator, cloud)
│   │   ├── offer/
│   │   │   └── OfferTable.tsx        # Table des offres pour un modèle
│   │   ├── auth/
│   │   │   ├── AuthButton.tsx        # Bouton login/logout dans le header
│   │   │   └── AuthGuard.tsx         # Wrapper qui redirige si pas connecté
│   │   └── favorites/
│   │       ├── FavoriteButton.tsx    # Bouton étoile pour ajouter/retirer un favori
│   │       └── FavoritesList.tsx     # Liste des favoris de l'utilisateur
│   │
│   ├── lib/                         # === UTILITAIRES ===
│   │   ├── supabase.ts              # Client Supabase (singleton)
│   │   ├── auth.ts                  # Hooks et helpers d'authentification
│   │   ├── favorites.ts             # CRUD favoris via Supabase + TanStack Query
│   │   └── format.ts                # Formatage prix, nombres, dates
│   │
│   └── styles/
│       └── globals.css              # Tailwind directives + variables custom
│
└── supabase/
    └── migrations/
        └── 001_create_favorites.sql # Migration Supabase
```

---

## 7. Pages et routes

### Route `/` — Table des modèles (page d'accueil)

C'est la page principale. Elle affiche une TanStack Table virtualisée avec tous les modèles.

**Colonnes visibles par défaut :**

| Colonne | Source | Tri | Filtre |
|---|---|---|---|
| Nom | `model.name` | alpha | text search |
| Créateur | `model.creator` | alpha | select (anthropic, openai, google, meta...) |
| Catégorie | `model.category` | alpha | multi-select |
| Context window | `model.context_window` | numérique | range slider |
| Prix input (min) | calculé via `getCheapestInputPrice()` | numérique | range |
| Prix output (min) | calculé via `getCheapestOutputPrice()` | numérique | range |
| Nb providers | calculé via `getProviderCount()` | numérique | — |
| Open source | `model.is_open_source` | — | toggle |
| Release | `model.release_date` | date | — |
| Favori | UserFavorite (Supabase) | — | toggle "mes favoris" |

**Colonnes optionnelles (masquées, activables) :**
- Chaque capability individuellement (vision, MCP, tool use...)
- Chaque benchmark
- Max output tokens
- Architecture

**Comportement :**
- Clic sur une ligne → navigation vers `/models/:modelId`
- Tri multi-colonnes avec Shift+clic
- Filtres persistés dans les search params de l'URL (partageables)
- Virtualisation via TanStack Virtual (smooth scroll, pas de pagination)

### Route `/models/:modelId` — Fiche modèle

Page de détail d'un modèle. Deux sections :

1. **Header de fiche** : nom, créateur, catégorie, description, badges capabilities, date de sortie, lien doc officielle, bouton favori
2. **Tableau des offres** : TanStack Table de `ProviderOffer[]` filtré sur ce modèle, colonnes : provider name, type, input price, output price, cache prices, rate limits, latency, status

### Route `/providers` — Table des providers

TanStack Table avec tous les providers.

**Colonnes :**

| Colonne | Source | Tri | Filtre |
|---|---|---|---|
| Nom | `provider.name` | alpha | text |
| Type | `provider.type` | alpha | select |
| Nb modèles | calculé | numérique | — |
| Free tier | `provider.has_free_tier` | — | toggle |
| OpenAI compatible | `provider.openai_compatible` | — | toggle |
| Billing | `provider.billing_model` | — | select |

### Route `/providers/:providerId` — Fiche provider

Page de détail d'un provider. Deux sections :

1. **Header de fiche** : nom, type, description, régions, SDKs, lien
2. **Tableau des modèles** : tous les modèles dispo chez ce provider avec le pricing spécifique

### Route `/login` — Connexion

Page minimaliste avec :
- Connexion par email (magic link Supabase)
- Connexion par GitHub OAuth
- Pas de formulaire d'inscription séparé (magic link crée le compte automatiquement)

### Route `/favorites` — Favoris (auth required)

Table des modèles favoris de l'utilisateur. Même colonnes que la table principale mais filtrée sur les favoris. Protégée par `AuthGuard` (redirection vers `/login` si non connecté).

---

## 8. UI et design

### Principes

- **Data-first** : l'interface est au service des données, pas l'inverse.
- **Minimaliste** : header fin, pas de sidebar, pas de hero section, pas de marketing.
- **Dense mais lisible** : les tables sont compactes avec un bon contraste.
- **Référence visuelle** : [models.dev](https://models.dev) — header fin en haut, et dessous c'est 100% data.

### Header

```
┌─────────────────────────────────────────────────────────────────────┐
│  ◆ ModelRadar          Models   Providers            [★] [Login]   │
└─────────────────────────────────────────────────────────────────────┘
```

- **Hauteur :** 48px max, une seule ligne
- **Gauche :** logo (icône + "ModelRadar"), liens nav (Models, Providers)
- **Droite :** bouton favoris (★, visible si connecté), bouton auth (Login / avatar)
- **Style :** border-bottom fine, fond neutre, texte sobre
- **Sticky :** reste fixé en haut au scroll

### Table design

- **Lignes :** hauteur 40-44px, hover avec fond légèrement teinté
- **Headers :** fond neutre, texte uppercase 11px, sticky en haut
- **Filtres :** barre horizontale au-dessus de la table avec les filtres actifs affichés comme des chips
- **Tri :** indicateur flèche dans le header, actif = accentué
- **Densité :** compact par défaut, pas de whitespace gaspillé
- **Virtualisation :** TanStack Virtual, fenêtre visible de ~20 lignes, scroll smooth

### Couleurs

Palette sobre et professionnelle. Dark mode supporté.

```
--color-bg:         #ffffff (light) / #0a0a0a (dark)
--color-surface:    #f8f8f8 (light) / #141414 (dark)
--color-border:     #e5e5e5 (light) / #2a2a2a (dark)
--color-text:       #171717 (light) / #ededed (dark)
--color-text-muted: #737373 (light) / #a3a3a3 (dark)
--color-accent:     #2563eb (blue, liens et actions)
--color-positive:   #16a34a (true, GA, positif)
--color-warning:    #ca8a04 (preview, beta)
--color-negative:   #dc2626 (deprecated, false)
```

### Responsive

- **Desktop (>1024px) :** table complète avec toutes les colonnes
- **Tablet (768-1024px) :** colonnes secondaires masquées, scroll horizontal possible
- **Mobile (<768px) :** basculer en vue cards plutôt que table

---

## 9. Authentification et favoris (Supabase)

### Setup Supabase

Variables d'environnement dans `.env.local` :

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJI...
```

### Client Supabase

#### `src/lib/supabase.ts`

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Migration SQL

#### `supabase/migrations/001_create_favorites.sql`

```sql
-- Table des favoris utilisateur
create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  model_id text not null,
  provider_id text, -- optionnel : favori d'une offre spécifique
  created_at timestamptz default now() not null,

  -- Un utilisateur ne peut pas mettre le même modèle en favori deux fois
  unique(user_id, model_id, provider_id)
);

-- RLS : chaque utilisateur ne voit que ses propres favoris
alter table public.favorites enable row level security;

create policy "Users can view own favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert own favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own favorites"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- Index pour les requêtes fréquentes
create index favorites_user_id_idx on public.favorites(user_id);
create index favorites_model_id_idx on public.favorites(model_id);
```

### Hooks d'authentification

#### `src/lib/auth.ts`

```typescript
/**
 * Hook React pour l'état d'authentification.
 * Utilise TanStack Query pour cache et revalidation.
 */
// useAuth() → { user, isLoading, signIn, signOut }
// signIn via magic link (email) ou GitHub OAuth
// signOut via supabase.auth.signOut()
// Écoute onAuthStateChange pour les mises à jour en temps réel
```

### CRUD favoris

#### `src/lib/favorites.ts`

```typescript
/**
 * Hooks TanStack Query pour les favoris.
 *
 * useFavorites() → { data: string[], isLoading }
 *   Retourne la liste des model_id favoris de l'utilisateur connecté.
 *
 * useToggleFavorite() → { mutate(modelId: string) }
 *   Ajoute ou retire un modèle des favoris (toggle).
 *   Optimistic update : le UI change immédiatement, rollback si erreur.
 *
 * useIsFavorite(modelId: string) → boolean
 *   Raccourci pour savoir si un modèle est en favori.
 */
```

---

## 10. TanStack Table — colonnes et fonctionnalités

### Column definitions pour la table des modèles

```typescript
import { createColumnHelper } from "@tanstack/react-table";
import type { Model } from "@/data/schema";
import { getCheapestInputPrice, getCheapestOutputPrice, getProviderCount } from "@/data";

const columnHelper = createColumnHelper<Model>();

export const modelColumns = [
  columnHelper.accessor("name", {
    header: "Model",
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),

  columnHelper.accessor("creator", {
    header: "Creator",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "equals",
    meta: { filterVariant: "select" },
  }),

  columnHelper.accessor("category", {
    header: "Category",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "arrIncludes",
    meta: { filterVariant: "multi-select" },
  }),

  columnHelper.accessor("context_window", {
    header: "Context",
    cell: (info) => formatTokens(info.getValue()),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    meta: { filterVariant: "range" },
  }),

  columnHelper.accessor((row) => getCheapestInputPrice(row.id), {
    id: "price_input",
    header: "Input $/Mtok",
    cell: (info) => info.getValue() !== null ? `$${info.getValue()}` : "—",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    meta: { filterVariant: "range" },
  }),

  columnHelper.accessor((row) => getCheapestOutputPrice(row.id), {
    id: "price_output",
    header: "Output $/Mtok",
    cell: (info) => info.getValue() !== null ? `$${info.getValue()}` : "—",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    meta: { filterVariant: "range" },
  }),

  columnHelper.accessor((row) => getProviderCount(row.id), {
    id: "provider_count",
    header: "Providers",
    enableSorting: true,
  }),

  columnHelper.accessor("is_open_source", {
    header: "Open",
    cell: (info) => info.getValue() ? "✓" : "—",
    enableColumnFilter: true,
    filterFn: "equals",
    meta: { filterVariant: "boolean" },
  }),

  columnHelper.accessor("release_date", {
    header: "Released",
    cell: (info) => formatDate(info.getValue()),
    enableSorting: true,
    sortingFn: "datetime",
  }),

  // Colonne favori (conditionnelle, visible si user connecté)
  columnHelper.display({
    id: "favorite",
    header: "★",
    cell: (info) => /* <FavoriteButton modelId={info.row.original.id} /> */,
  }),
];
```

### Fonctionnalités requises sur toutes les tables

- **Tri** : clic sur header, Shift+clic pour multi-tri
- **Filtres** : par colonne, type adapté (text search, select, multi-select, range, boolean toggle)
- **Virtualisation** : TanStack Virtual avec `useVirtualizer`, window virtualization, ~20 lignes visibles
- **URL sync** : les filtres et tris sont sérialisés dans les search params de l'URL via TanStack Router
- **Column visibility** : possibilité de masquer/afficher des colonnes via un menu
- **Responsive** : sur mobile, basculer en vue cards

---

## 11. Phases de développement

### Phase 1 — Fondations (CURRENT SCOPE)

> Objectif : système fonctionnel de bout en bout avec les 5-6 modèles d'exemple.

#### 1.1 Setup projet

- [ ] Initialiser le projet TanStack Start avec `npx @tanstack/cli@latest create`
- [ ] Configurer TypeScript strict mode
- [ ] Installer et configurer Tailwind CSS v4
- [ ] Configurer pnpm comme package manager
- [ ] Configurer Biome (linter + formatter)
- [ ] Configurer les alias d'import (`@/` → `src/`)
- [ ] Créer le `.env.local` avec les variables Supabase (placeholder)
- [ ] Vérifier que `pnpm dev` démarre sans erreur

#### 1.2 Data layer

- [ ] Créer `src/data/schema/model.ts` avec tous les types
- [ ] Créer `src/data/schema/provider.ts` avec tous les types
- [ ] Créer `src/data/schema/offer.ts` avec tous les types
- [ ] Créer `src/data/schema/index.ts` (re-exports)
- [ ] Créer les fichiers de données modèles (`anthropic.ts`, `openai.ts`, `google.ts`, `meta.ts`)
- [ ] Créer `src/data/models/index.ts` (barrel)
- [ ] Créer `src/data/providers/index.ts` avec les 4 providers
- [ ] Créer `src/data/offers/index.ts` avec toutes les offres
- [ ] Créer `src/data/index.ts` avec les helpers (`getOffersForModel`, `getModelsForProvider`, `getCheapestInputPrice`, etc.)
- [ ] Vérifier le typage : `tsc --noEmit` passe sans erreur

#### 1.3 Layout et navigation

- [ ] Créer `src/routes/__root.tsx` avec le layout global (header + outlet)
- [ ] Créer le composant `Header.tsx` (48px, sticky, logo + nav + auth placeholder)
- [ ] Configurer les routes file-based : `/`, `/models/$modelId`, `/providers`, `/providers/$providerId`, `/login`, `/favorites`
- [ ] Vérifier que la navigation fonctionne entre toutes les routes

#### 1.4 Table des modèles (page d'accueil)

- [ ] Créer le composant `DataTable.tsx` générique (TanStack Table + Virtual)
- [ ] Implémenter la virtualisation avec `useVirtualizer` de TanStack Virtual
- [ ] Créer `ModelTable.tsx` avec les column definitions
- [ ] Implémenter le tri (clic header, multi-tri avec Shift)
- [ ] Implémenter les filtres par colonne :
  - [ ] Text search (nom du modèle)
  - [ ] Select (créateur, catégorie)
  - [ ] Range slider (context window, prix)
  - [ ] Boolean toggle (open source)
- [ ] Créer le composant `ColumnFilter.tsx`
- [ ] Créer le composant `SortHeader.tsx`
- [ ] Synchroniser les filtres/tris avec les search params de l'URL
- [ ] Implémenter la visibilité des colonnes (menu toggle)
- [ ] Clic sur une ligne → navigation vers `/models/:modelId`
- [ ] Vérifier le rendu avec les 5-6 modèles d'exemple

#### 1.5 Fiche modèle

- [ ] Créer `src/routes/models/$modelId.tsx`
- [ ] Afficher les infos du modèle (nom, créateur, catégorie, description, capabilities, benchmarks)
- [ ] Créer `CapabilitiesBadges.tsx` (badges colorés pour chaque capability true)
- [ ] Créer `BenchmarkBar.tsx` (barre de progression avec le score)
- [ ] Afficher le tableau des offres (`OfferTable.tsx`) filtré sur ce modèle
- [ ] Colonnes offres : provider name, type, input price, output price, rate limits, status
- [ ] Gérer le cas modèle non trouvé (404)

#### 1.6 Table des providers

- [ ] Créer `src/routes/providers/index.tsx`
- [ ] Créer `ProviderTable.tsx` avec les column definitions
- [ ] Créer `ProviderBadge.tsx` (badge type : direct, aggregator, cloud, self_hosted)
- [ ] Clic sur une ligne → `/providers/:providerId`

#### 1.7 Fiche provider

- [ ] Créer `src/routes/providers/$providerId.tsx`
- [ ] Afficher les infos du provider (nom, type, régions, billing, SDKs)
- [ ] Afficher le tableau des modèles disponibles chez ce provider avec le pricing
- [ ] Gérer le cas provider non trouvé (404)

#### 1.8 Authentification Supabase

- [ ] Créer le projet Supabase et récupérer les clés
- [ ] Créer `src/lib/supabase.ts` (client singleton)
- [ ] Créer `src/lib/auth.ts` avec le hook `useAuth()`
- [ ] Implémenter le login par magic link (email)
- [ ] Implémenter le login par GitHub OAuth
- [ ] Créer `AuthButton.tsx` dans le header (login/logout/avatar)
- [ ] Créer la page `/login`
- [ ] Créer `AuthGuard.tsx` pour protéger `/favorites`
- [ ] Tester le flow complet : inscription → connexion → déconnexion

#### 1.9 Système de favoris

- [ ] Exécuter la migration SQL `001_create_favorites.sql` dans Supabase
- [ ] Créer `src/lib/favorites.ts` avec les hooks TanStack Query :
  - [ ] `useFavorites()` — liste les model_id favoris
  - [ ] `useToggleFavorite()` — toggle avec optimistic update
  - [ ] `useIsFavorite(modelId)` — raccourci boolean
- [ ] Créer `FavoriteButton.tsx` (étoile cliquable)
- [ ] Intégrer `FavoriteButton` dans la table des modèles et la fiche modèle
- [ ] Créer la page `/favorites` avec la table des modèles favoris
- [ ] Tester : ajouter un favori, le voir dans `/favorites`, le retirer

#### 1.10 Polish et SSR

- [ ] Vérifier que le SSR fonctionne (données modèles rendues côté serveur)
- [ ] Vérifier le dark mode (toggle ou respect du système)
- [ ] Ajouter les meta tags (title, description) par page
- [ ] Vérifier les performances : First Contentful Paint < 1s
- [ ] Tester sur mobile : vérifier que les tables sont utilisables
- [ ] Corriger les bugs visuels et d'interaction

---

### Phase 2 — Contenu (FUTURE)

> Non inclus dans ce document. Sera spécifié séparément.

- [ ] Ajouter 100+ modèles avec toutes les données
- [ ] Ajouter 15+ providers
- [ ] Automatiser la collecte de données (scraping pricing pages, API checks)
- [ ] Ajouter un système de "dernière mise à jour" par modèle
- [ ] Alertes de changement de prix

### Phase 3 — Features avancées (FUTURE)

- [ ] Comparaison côte-à-côte (sélectionner 2-3 modèles)
- [ ] Calculateur de coût (estimer le coût mensuel selon l'usage)
- [ ] Graphiques de benchmarks (charts comparatifs)
- [ ] API publique ModelRadar
- [ ] Historique des prix
- [ ] Notation communautaire / avis utilisateurs

---

## Annexes

### A. Formatage des valeurs

```typescript
/** Formater un nombre de tokens en format lisible */
export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

/** Formater un prix avec 2 décimales */
export function formatPrice(n: number | null): string {
  if (n === null) return "—";
  return `$${n.toFixed(2)}`;
}

/** Formater une date ISO en format court */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** Formater un score de benchmark */
export function formatBenchmark(score: number, max: number = 100): string {
  return `${score.toFixed(1)}${max !== 100 ? ` / ${max}` : "%"}`;
}
```

### B. Commandes de référence

```bash
# Installer les dépendances
pnpm install

# Développement
pnpm dev

# Build production
pnpm build

# Type check
pnpm typecheck   # tsc --noEmit

# Lint + format
pnpm check       # biome check

# Preview production build
pnpm preview
```

### C. Packages à installer

```bash
# Framework
pnpm add @tanstack/react-start @tanstack/react-router @tanstack/react-table @tanstack/react-virtual @tanstack/react-query

# Supabase
pnpm add @supabase/supabase-js

# Styling
pnpm add tailwindcss @tailwindcss/vite

# Dev
pnpm add -D typescript @types/react @types/react-dom @biomejs/biome vite
```

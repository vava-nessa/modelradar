# AGENTS_UPDATER.md — Guide for AI Agents that update ModelRadar data

> This file is the **single source of truth** for AI agents responsible for keeping ModelRadar data up to date.
> Read this ENTIRELY before making any changes.

---

## Architecture Overview

```
src/data/
├── schema/                     # TypeScript types (DO NOT MODIFY unless schema changes)
│   ├── model.ts                # Model, ModelEntry, ModelFamily, ModelCapabilities, ModelBenchmarks
│   ├── provider.ts             # Provider, ProviderStatus, ProviderType
│   └── offer.ts                # ProviderOffer, OfferStatus
│
├── models/                     # ONE file per model — the main data source
│   ├── {creator}/              # Folder per creator (anthropic, openai, google, meta, etc.)
│   │   ├── {model-id}.ts       # ModelEntry = model data + all provider offers
│   │   └── index.ts            # Re-exports all models from this creator
│   └── index.ts                # Aggregates all creators → allModels + allOffers
│
├── providers/                  # ONE file per provider
│   ├── {provider-id}.ts        # Provider metadata (name, regions, compliance, etc.)
│   └── index.ts                # Aggregates all providers → allProviders
│
├── families/                   # Model family definitions
│   └── index.ts                # All families in one file (small dataset)
│
└── index.ts                    # Helpers (getModelById, getOffersForModel, etc.)
```

### Key Principle

**1 model = 1 file = 1 atomic edit.**

The file `src/data/models/{creator}/{model-id}.ts` contains EVERYTHING about a model:
- Its intrinsic properties (capabilities, benchmarks, architecture)
- All its provider offers (pricing, rate limits, availability)

The `model.id` is the **UUID / primary key** that links everything together.

---

## Operations

### 1. Add a new model

**Files to touch: 2**

#### Step 1 — Create the model file

Create `src/data/models/{creator}/{model-id}.ts`:

```typescript
import type { ModelEntry } from "@/data/schema";

export const myNewModel: ModelEntry = {
  model: {
    // === REQUIRED FIELDS ===
    id: "model-slug",                    // Unique ID, used as URL slug
    name: "Model Display Name",          // Human-readable name
    creator: "creator-slug",             // Must match folder name
    family: "family-slug",               // FK → ModelFamily.id
    category: "flagship",                // flagship | mid | small | reasoning | code | agentic
    status: "active",                    // active | deprecated | legacy
    modality_input: ["text", "image"],   // text | image | pdf | code
    modality_output: ["text"],
    context_window: 200000,              // Total context in tokens
    is_open_source: false,
    release_date: "2025-06-01",          // ISO 8601
    supportedOn: ["api"],                // free | api | sub | local
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
      // ... see ModelCapabilities in schema/model.ts for all fields
    },

    // === OPTIONAL BUT RECOMMENDED ===
    max_output_tokens: 16000,
    reasoning: true,                     // Is a chain-of-thought model?
    temperature: true,                   // Supports temperature parameter?
    knowledge: "2025-03",                // Training data cutoff (YYYY-MM)
    license: "proprietary",              // or "apache-2.0", "mit", etc.
    architecture: "dense transformer",   // or "MoE"
    parameters: "70B",                   // If published
    description: "Short description of what this model excels at.",
    url: "https://...",                  // Official model page
    documentation_url: "https://...",    // Docs link
    tags: ["coding", "reasoning"],       // Free-form tags for filtering
    cost: {                              // Reference pricing from creator
      input: 3,                          // $/Mtok
      output: 15,
      cache_read: 0.3,                   // Optional
      cache_write: 3.75,                 // Optional
    },
    benchmarks: {
      swe_bench: 72.7,
      humaneval: 93.0,
      // ... see ModelBenchmarks in schema/model.ts for all fields
    },

    // === OPEN-SOURCE MODELS ONLY ===
    weights_url: "https://huggingface.co/...",
    quantizations: ["Q4_K_M", "Q8_0", "GGUF"],

    // === OPTIONAL ===
    secondary_categories: ["agentic", "reasoning"],
    context_window_extended: 1000000,
    multilingual: ["en", "fr", "zh", "ja"],
    last_updated: "2025-06-15",
    successor: "newer-model-id",         // When this model is deprecated
  },
  offers: [
    // One entry per provider that offers this model
    {
      provider_id: "anthropic",            // FK → Provider.id
      provider_model_id: "model-20250601", // Exact API model ID at this provider
      input_per_mtok: 3.0,
      output_per_mtok: 15.0,
      status: "ga",                        // ga | preview | beta | deprecated

      // Optional pricing
      cache_read_per_mtok: 0.3,
      cache_write_per_mtok: 3.75,
      batch_input_per_mtok: 1.5,
      batch_output_per_mtok: 7.5,

      // Optional limits & performance
      rate_limit_rpm: 4000,
      rate_limit_tpm: 400000,
      latency_ttft_ms: 800,
      tokens_per_second: 120,
      context_window: 200000,              // If different from model default
      max_output_tokens: 16000,            // If different from model default

      // Optional metadata
      available_since: "2025-06-01",
      last_price_update: "2025-06-01",
      fine_tuning_available: false,
      regions: ["us", "eu"],
      notes: "Cross-region inference available",
    },
    {
      provider_id: "openrouter",
      provider_model_id: "creator/model-name",
      input_per_mtok: 3.0,
      output_per_mtok: 15.0,
      status: "ga",
    },
  ],
};
```

> **IMPORTANT:** Do NOT include `model_id` in the offers. It is automatically injected from `model.id` by the aggregation layer.

#### Step 2 — Register in the creator's index

Add the export to `src/data/models/{creator}/index.ts`:

```typescript
export { myNewModel } from "./model-slug";
```

That's it. The aggregation in `models/index.ts` auto-collects it.

#### Step 3 — If new creator folder

If the creator folder doesn't exist yet:
1. Create `src/data/models/{creator}/` directory
2. Create the model file inside it
3. Create `src/data/models/{creator}/index.ts` with the export
4. Add the import to `src/data/models/index.ts`:

```typescript
import * as newcreator from "./newcreator";

// Add to allEntries array:
export const allEntries: ModelEntry[] = [
  ...Object.values(anthropic),
  // ...existing...
  ...Object.values(newcreator),  // ← add here
];
```

#### Step 4 — If new family

Add to `src/data/families/index.ts`:

```typescript
{
  id: "family-slug",       // Must match model.family
  name: "Family Name",
  creator: "creator-slug",
  description: "Short description of this model lineage.",
  url: "https://...",
},
```

---

### 2. Update pricing for a model

**Files to touch: 1**

Open `src/data/models/{creator}/{model-id}.ts` and update the relevant offer's `input_per_mtok`, `output_per_mtok`, etc.

Set `last_price_update` to today's date.

---

### 3. Deprecate a model

**Files to touch: 1**

Open the model file and:
1. Set `model.status` to `"deprecated"`
2. Set `model.successor` to the ID of the replacement model
3. Optionally set each offer's `status` to `"deprecated"`

---

### 4. Add a new provider

**Files to touch: 2**

1. Create `src/data/providers/{provider-id}.ts`:

```typescript
import type { Provider } from "@/data/schema";

export const newProvider: Provider = {
  id: "provider-slug",
  name: "Provider Name",
  description: "Short description.",
  type: "direct",           // direct | aggregator | cloud | self_hosted
  status: "active",         // active | maintenance | sunset
  url: "https://...",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
  compliance: ["SOC2"],     // Optional
};
```

2. Add import + entry to `src/data/providers/index.ts`:

```typescript
import { newProvider } from "./provider-slug";

export const allProviders: Provider[] = [
  // ...existing...
  newProvider,
];
```

---

### 5. Add a provider offer to an existing model

**Files to touch: 1**

Open `src/data/models/{creator}/{model-id}.ts` and add a new entry to the `offers` array.

---

### 6. Update provider metadata

**Files to touch: 1**

Edit `src/data/providers/{provider-id}.ts`.

---

## Validation

After any change, run:

```bash
pnpm build
```

The build will fail if:
- A required field is missing
- A type is wrong (e.g., wrong category value)
- An import is broken

---

## Type Reference (quick lookup)

### ModelCategory
`"flagship" | "mid" | "small" | "reasoning" | "code" | "agentic"`

### ModelStatus
`"active" | "deprecated" | "legacy"`

### AccessType
`"free" | "api" | "sub" | "local"`

### Modality
`"text" | "image" | "pdf" | "code"`

### OfferStatus
`"ga" | "preview" | "beta" | "deprecated"`

### ProviderType
`"direct" | "aggregator" | "cloud" | "self_hosted"`

### ProviderStatus
`"active" | "maintenance" | "sunset"`

### BillingModel
`"pay_per_token" | "subscription" | "credits" | "enterprise"`

---

## File Naming Conventions

| Entity | File name | Example |
|--------|-----------|---------|
| Model | `{model-id}.ts` (slug) | `claude-sonnet-4.ts` |
| Provider | `{provider-id}.ts` | `openrouter.ts` |
| Creator folder | `{creator-slug}/` | `anthropic/` |

- Use kebab-case for all file names
- Model file name must match the `model.id` value
- Provider file name must match the `provider.id` value

---

## Data Sources for Updates

When updating model data, verify against these official sources:

| Creator | Pricing & specs |
|---------|----------------|
| Anthropic | https://docs.anthropic.com/en/docs/about-claude/models |
| OpenAI | https://platform.openai.com/docs/models |
| Google | https://ai.google.dev/gemini-api/docs/models |
| Meta | https://llama.meta.com |
| Mistral | https://docs.mistral.ai/models |
| DeepSeek | https://api-docs.deepseek.com |
| Microsoft | https://huggingface.co/microsoft |

For aggregator pricing:
| Provider | Pricing page |
|----------|-------------|
| OpenRouter | https://openrouter.ai/models |
| AWS Bedrock | https://aws.amazon.com/bedrock/pricing |
| Azure AI | https://azure.microsoft.com/pricing/details/cognitive-services/openai-service |

---

## Common Mistakes to Avoid

1. **Don't add `model_id` to offers** — it's auto-injected from `model.id`
2. **Don't forget to export** from the creator's `index.ts`
3. **Don't duplicate pricing** — `model.cost` is reference pricing from the creator, `offers[].input_per_mtok` is provider-specific pricing
4. **Don't use `any` types** — strict TypeScript, the build will catch errors
5. **Don't modify `models/index.ts`** unless adding a new creator
6. **Don't modify schema files** unless the data structure itself needs to change
7. **Variable names** must be valid JS identifiers (camelCase, no hyphens): `claudeSonnet4`, not `claude-sonnet-4`

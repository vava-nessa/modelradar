# Changelog

## [Unreleased]

### Changed
- **Schema: Coding LLMs only** — Removed all image gen, audio, and video related types and fields. ModelRadar is now exclusively focused on coding/text LLMs.
- **ModelCategory**: Removed `embedding`, `image`, `audio`, `video`. Added `agentic`.
- **Modality**: Removed `audio`, `video`. Kept `text`, `image` (vision), `pdf`, `code`.
- **ModelCapabilities**: Removed `image_gen`, `audio_input`, `audio_output`. Added `citations`, `prompt_caching`, `batch_api`, `fine_tuning`, `structured_output`, `parallel_tool_calls`, `file_search`, `canvas`, `diff_output`.
- **Model interface**: Removed redundant `limits` sub-object (was duplicating `context_window`/`max_output_tokens`). Removed `attachment` (vague) and `tool_call` (duplicated `capabilities.function_calling`).
- **Provider interface**: Added `description`, `status` (`ProviderStatus`), `compliance` fields.
- **ProviderOffer interface**: Added `context_window`, `max_output_tokens` (provider-specific limits), `fine_tuning_available`, `regions`, `last_price_update`. Removed `image_per_unit`.

### Architecture
- **Data migration: 1 model = 1 file** — Migrated from flat arrays (`models/anthropic.ts` with all models) to one file per model (`models/anthropic/claude-sonnet-4.ts`). Each file is a `ModelEntry` bundling model data + provider offers. Offers no longer live in a separate `offers/` directory.
- **Provider files split** — Each provider now has its own file (`providers/anthropic.ts`) instead of one big array.
- **`ModelEntry`** type — New interface that bundles `Model` + `ProviderOffer[]`. The `model_id` in offers is auto-injected by the aggregation layer.
- **`AGENTS_UPDATER.md`** — Complete guide for AI agents that update the data, with procedures for every operation (add model, update pricing, deprecate, add provider).

### Added
- **`ModelFamily`** interface — groups model versions into lineages (e.g., "Claude Sonnet" groups Sonnet 3.5, 4, 4.6). New `src/data/families/` data layer with `allFamilies` export and `getFamilyById`/`getModelsForFamily` helpers.
- **`ModelStatus`** type: `active | deprecated | legacy` — model lifecycle tracking.
- **`ProviderStatus`** type: `active | maintenance | sunset` — provider lifecycle tracking.
- **`status`** field on Model — required, tracks whether a model is still active.
- **`successor`** field on Model — points to the replacement model when deprecated.
- **`secondary_categories`** field on Model — a model can be `flagship` + `agentic` + `reasoning`.
- **`context_window_extended`** field on Model — for models with an extended context mode.
- **`weights_url`** field on Model — HuggingFace download link for open-weight models.
- **`quantizations`** field on Model — available quantizations for local inference (`Q4_K_M`, `GGUF`, `AWQ`, etc.).
- **`multilingual`** field on Model — languages the model supports well.
- **Benchmarks**: `mbpp`, `verified_swe_bench`, `multi_swe_bench`, `bigcodebench`, `polyglot_benchmark`, `terminal_bench`, `cybench`.
- Cache pricing (`cache_read`, `cache_write`) moved from `ProviderOffer`-only to also live in `ModelCost` as reference pricing.

### Removed
- **`ModelLimits`** interface — redundant with root-level `context_window` and `max_output_tokens`.
- **`ModelMetadata`**, **`ModelReleaseInfo`**, **`ModelInferenceParams`**, **`ModelWeights`** sub-interfaces — were defined but never composed into `Model`.
- **`src/data/offers/`** directory — offers now live inside each model's `ModelEntry` file.

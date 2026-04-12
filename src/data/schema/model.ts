/**
 * @file Model schema — core types for coding-focused LLM catalog
 * @description Defines the data structure for ModelRadar's coding LLM comparator.
 * 📖 All types describe intrinsic model properties, independent of any provider.
 * 📖 Scope: text/code LLMs only — no image gen, audio, or video models.
 *
 * @exports ModelStatus, ModelCategory, AccessType, Modality
 * @exports ModelCapabilities, ModelCost, ModelBenchmarks
 * @exports ModelFamily, Model, ModelEntry (main interfaces)
 */

// 📖 Lifecycle status of the model
export type ModelStatus = "active" | "deprecated" | "legacy";

/**
 * 📖 Catégorie principale du modèle (coding LLMs only)
 * - flagship: Most capable all-around (Claude Opus 4, GPT-4.1, Gemini 2.5 Pro)
 * - mid: Strong but more compact (Mistral Small, DeepSeek Chat)
 * - small: Lightweight, optimized for speed/cost (Phi-4, Haiku)
 * - reasoning: Advanced chain-of-thought specialists (o3, DeepSeek R1)
 * - code: Code-specialized models (Codestral, StarCoder)
 * - agentic: Designed for autonomous multi-step agent workflows
 */
export type ModelCategory =
  | "flagship"
  | "mid"
  | "small"
  | "reasoning"
  | "code"
  | "agentic";

/**
 * 📖 Mode d'accès au modèle
 * - free: Gratuit (tiers gratuits, NVIDIA NIM, etc.)
 * - api: Payant par tokens via API
 * - sub: Accessible par abonnement (ChatGPT Plus, Claude Pro, etc.)
 * - local: Exécutable localement (ollama, llama.cpp, etc.)
 */
export type AccessType = "free" | "api" | "sub" | "local";

/**
 * 📖 Modalités d'entrée/sortie (coding-relevant only)
 * - text: Standard text
 * - image: Vision (screenshots, diagrams, UI mockups)
 * - pdf: Document processing
 * - code: Source code (explicit code modality)
 */
export type Modality = "text" | "image" | "pdf" | "code";

/**
 * 📖 Capacités API du modèle (coding-focused)
 * Toutes ces capacités sont intrinsèques au modèle, indépendantes du provider.
 */
export interface ModelCapabilities {
  // 📖 Core API features
  streaming: boolean;
  function_calling: boolean;
  json_mode?: boolean;
  json_schema?: boolean;
  system_prompt?: boolean;

  // 📖 Input capabilities
  vision: boolean;

  // 📖 Structured output — plus large que json_schema (YAML, XML, etc.)
  structured_output?: boolean;

  // 📖 Coding & agentic features
  code_execution?: boolean;
  web_search?: boolean;
  mcp?: boolean;
  computer_use?: boolean;
  extended_thinking?: boolean;
  citations?: boolean;
  prompt_caching?: boolean;
  batch_api?: boolean;
  fine_tuning?: boolean;

  // 📖 Advanced agent capabilities
  /** 📖 Peut appeler plusieurs outils en parallèle dans une seule réponse */
  parallel_tool_calls?: boolean;
  /** 📖 RAG natif sur fichiers (ex: OpenAI Assistants file_search) */
  file_search?: boolean;
  /** 📖 Édition collaborative de code (ChatGPT Canvas, Claude Artifacts) */
  canvas?: boolean;
  /** 📖 Le modèle peut produire des diffs/patches (pertinent pour les coding tools) */
  diff_output?: boolean;
}

/**
 * 📖 Coûts par million de tokens en USD (reference pricing from creator)
 * Provider-specific pricing lives in ProviderOffer.
 */
export interface ModelCost {
  input: number;
  output: number;
  cache_read?: number;
  cache_write?: number;
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
 *
 * @see https://modelradar.ai/benchmarks — glossary and descriptions
 */
export interface ModelBenchmarks {
  // ============ GENERAL REASONING ============
  /** 📖 MMLU — Massive Multitask Language Understanding (5-shot, ~0.6% random) */
  mmlu?: number;
  /** 📖 MMLU Pro — Harder variant with more challenging questions */
  mmlu_pro?: number;
  /** 📖 GPQA Diamond — Graduate-Level Google-Proof Q&A (expert-level) */
  gpqa_diamond?: number;
  /** 📖 ARC Challenge — Abstraction and Reasoning Corpus (AI2) */
  arc_challenge?: number;
  /** 📖 BIG-Bench Hard — Subset of BIG-Bench with deterministic scoring */
  big_bench_hard?: number;
  /** 📖 HellaSwag — Commonsense reasoning (10-shot, ~50% random) */
  hellaswag?: number;
  /** 📖 TruthfulQA — Truthfulness against misleading questions */
  truthfulqa?: number;

  // ============ MATH ============
  /** 📖 GSM8K — Grade School Math 8K (district-level) */
  gsm8k?: number;
  /** 📖 GSM8K Plus — Harder variant with more complex reasoning */
  gsm8k_plus?: number;
  /** 📖 MATH — Competition mathematics (AMC, AIME level) */
  math?: number;
  /** 📖 MATH 500 — MATH benchmark with 500 problems (standard dataset) */
  math_500?: number;
  /** 📖 FrontierMath — Novel math problems requiring extended reasoning */
  frontier_math?: number;
  /** 📖 AIME 2025 — American Invitational Mathematics Examination */
  aime_2025?: number;

  // ============ CODING ============
  /** 📖 HumanEval — OpenAI's Python coding benchmark (0-shot) */
  humaneval?: number;
  /** 📖 MBPP — Mostly Basic Python Problems (San Francisco基準) */
  mbpp?: number;
  /** 📖 MBPP Plus — Harder variant requiring more complex solutions */
  mbpp_plus?: number;
  /** 📖 SWE-Bench — Software Engineering challenges from real GitHub issues */
  swe_bench?: number;
  /** 📖 SWE-Bench Verified — Filtered subset with reliable annotations */
  verified_swe_bench?: number;
  /** 📖 SWE-Bench Lite — Faster variant with 500 samples */
  swe_bench_lite?: number;
  /** 📖 Multi-repo SWE-Bench — Multi-file scenarios, more realistic */
  multi_swe_bench?: number;
  /** 📖 BigCodeBench — Improved coding benchmark (Hard subset) */
  bigcodebench?: number;
  /** 📖 BigCodeBench Hard — Harder variant requiring deeper reasoning */
  bigcodebench_hard?: number;
  /** 📖 Aider Polyglot — Multi-language coding (12 languages) */
  aider_polyglot?: number;
  /** 📖 LiveCodeBench — Aggregate across time (fresh problems) */
  livecodebench?: number;
  /** 📖 SandboxEval — Autonomous coding in sandboxed environments */
  sandbox_eval?: number;
  /** 📖 SimplerEval — Simplified coding benchmark */
  simpler_eval?: number;
  /** 📖 BFCL — Berkeley Function Calling Leaderboard */
  bfcl?: number;
  /** 📖 Nexus — Code editing benchmark */
  nexus?: number;

  // ============ AGENTIC ============
  /** 📖 TAU-Bench — Tool-augmented reasoning (Airline, Weather) */
  tau_bench?: number;
  /** 📖 TAU-Bench Human — Human-evaluated tool usage */
  tau_bench_human?: number;
  /** 📖 WebArena — Web shopping, forum navigation tasks */
  webarena?: number;
  /** 📖 MiniWoz — Mini WoZ dialogue tasks */
  miniwoz?: number;
  /** 📖 WebLINX — Web-based instruction following */
  weblinx?: number;
  /** 📖 Terminal Bench — CLI/terminal task completion */
  terminal_bench?: number;
  /** 📖 OS-Bench — Operating system task completion */
  os_bench?: number;
  /** 📖 SWE-Agent — Software engineering agent tasks */
  swe_agent?: number;
  /** 📖 ML-Bench — Machine learning task execution */
  ml_bench?: number;

  // ============ CYBERSECURITY ============
  /** 📖 CyBench — Cybersecurity CTF-style challenges */
  cybench?: number;
  /** 📖 Crack-bench — Password cracking and crypto challenges */
  crack_bench?: number;

  // ============ MULTIMODAL ============
  /** 📖 MMMU — Multi-modal Multi-disciplinary Understanding */
  mmmu?: number;
  /** 📖 MathVista — Mathematical visual reasoning */
  mathvista?: number;
  /** 📖 Chart QA — Chart understanding and question answering */
  chart_qa?: number;
  /** 📖 DocVQA — Document visual question answering */
  docvqa?: number;

  // ============ SAFETY & ALIGNMENT ============
  /** 📖 Prompt Injection — Instruction-following under adversarial prompts */
  prompt_injection?: number;
  /** 📖 OWASE-Bench — Open-world agent safety evaluation */
  owase_bench?: number;

  // ============ COMPOSITE & ARENA ============
  /** 📖 Chatbot Arena (LMSYS) — Human preference ranking (Elo) */
  arena_elo?: number;
  /** 📖 LiveBench — Continuous evaluation with recent data */
  livebench?: number;
  /** 📖 TIER List — Coding-focused evaluation from the community */
  tier_list?: number;
  /** 📖 Scale AI Leaderboard — Aggregated coding leaderboard */
  scale_leaderboard?: number;

  // ============ KNOWLEDGE & EDUCATION ============
  /** 📖 Humanity's Last Exam — Terminal knowledge benchmark (beyond training) */
  humanity_last_exam?: number;
  /** 📖 MMLU 5-shot (standard, redundant with mmlu but explicit) */
  mmlu_5shot?: number;
  /** 📖 C-Eval — Chinese evaluation benchmark */
  c_eval?: number;
  /** 📖 CMMLU — Chinese Massive Multitask Language Understanding */
  cmmlu?: number;

  // ============ CUSTOM / OTHER ============
  /** 📖 Catch-all for benchmarks not covered above (custom benchmarks) */
  custom?: Record<string, number>;
}

/**
 * 📖 Famille de modèles — regroupe les versions d'une même lignée
 * Ex: "Claude Sonnet" regroupe Sonnet 3.5, Sonnet 3.5 v2, Sonnet 4, Sonnet 4.6
 * Permet de grouper/filtrer avec du contexte au lieu de simples strings.
 */
export interface ModelFamily {
  /** 📖 Slug unique, ex: "claude-sonnet" — correspond au champ `family` de Model */
  id: string;
  /** 📖 Nom d'affichage, ex: "Claude Sonnet" */
  name: string;
  /** 📖 Créateur de la famille, ex: "anthropic" */
  creator: string;
  /** 📖 Description courte de la lignée */
  description?: string;
  /** 📖 Lien vers la page officielle de la famille */
  url?: string;
}

/**
 * 📖 Un modèle LLM pour le coding — ses capacités intrinsèques
 *
 * Design decisions:
 * - Flat structure (no nested sub-interfaces) for easy TanStack Table accessors
 * - `cost` is reference pricing from the creator, provider-specific pricing is in ProviderOffer
 * - No `limits` sub-object — `context_window` and `max_output_tokens` live at root (no duplication)
 * - `function_calling` lives only in `capabilities` (not duplicated as root `tool_call`)
 * - `family` is a string FK to ModelFamily.id
 */
export interface Model {
  // === Identity ===
  /** 📖 Slug unique, ex: "claude-sonnet-4" */
  id: string;
  /** 📖 Nom d'affichage, ex: "Claude Sonnet 4" */
  name: string;
  /** 📖 FK vers ModelFamily.id, ex: "claude-sonnet", "gpt-4o" */
  family: string;
  /** 📖 Créateur du modèle (pas le provider), ex: "anthropic" */
  creator: string;
  /** 📖 Catégorie principale */
  category: ModelCategory;
  /** 📖 Catégories secondaires (un modèle peut être flagship + agentic + reasoning) */
  secondary_categories?: ModelCategory[];

  // === Lifecycle ===
  /** 📖 Statut actuel du modèle */
  status: ModelStatus;
  /** 📖 ID du modèle successeur (quand deprecated/legacy) */
  successor?: string;

  // === Modalities ===
  /** 📖 Modalités acceptées en entrée */
  modality_input: Modality[];
  /** 📖 Modalités en sortie */
  modality_output: Modality[];

  // === Limits ===
  /** 📖 Fenêtre de contexte totale (tokens) */
  context_window: number;
  /** 📖 Fenêtre de contexte étendue si le modèle supporte un mode extended */
  context_window_extended?: number;
  /** 📖 Max tokens en sortie */
  max_output_tokens?: number;

  // === Inference Parameters ===
  /** 📖 Est un modèle de raisonnement (chain-of-thought) */
  reasoning?: boolean;
  /** 📖 Supporte le paramètre temperature */
  temperature?: boolean;

  // === Dates ===
  /** 📖 Date de sortie (ISO 8601) */
  release_date: string;
  /** 📖 Date de dernière mise à jour (ISO 8601) */
  last_updated?: string;
  /** 📖 Date de cutoff des données d'entraînement */
  knowledge?: string;

  // === Architecture ===
  /** 📖 Nombre de paramètres (si publié), ex: "14B", "400B (17B active)" */
  parameters?: string;
  /** 📖 Architecture, ex: "dense transformer", "MoE" */
  architecture?: string;

  // === Open Weights ===
  /** 📖 Le modèle est open-source ou open-weight */
  is_open_source: boolean;
  /** 📖 Type de licence, ex: "apache-2.0", "llama-4-community" */
  license?: string;
  /** 📖 URL de téléchargement des poids (HuggingFace, etc.) */
  weights_url?: string;
  /** 📖 Quantizations disponibles pour run local, ex: ["Q4_K_M", "Q8_0", "GGUF", "AWQ"] */
  quantizations?: string[];

  // === Languages ===
  /** 📖 Langues supportées — pertinent car les modèles codent pas aussi bien dans toutes les langues */
  multilingual?: string[];

  // === Capabilities ===
  /** 📖 Capacités API du modèle */
  capabilities: ModelCapabilities;

  // === Benchmarks ===
  /** 📖 Scores de benchmarks */
  benchmarks?: ModelBenchmarks;

  // === Pricing (reference) ===
  /** 📖 Coût par million de tokens en USD — prix de référence du créateur */
  cost?: ModelCost;

  // === URLs & Description ===
  /** 📖 Description courte */
  description?: string;
  /** 📖 Lien vers la page officielle du modèle */
  url?: string;
  /** 📖 Lien vers la documentation officielle */
  documentation_url?: string;
  /** 📖 Modes d'accès disponibles */
  supportedOn: AccessType[];
  /** 📖 Tags libres pour le filtrage */
  tags?: string[];
}

/**
 * 📖 Unité atomique de données dans ModelRadar
 * Bundle un modèle avec toutes ses offres provider dans un seul fichier.
 * Chaque fichier dans `data/models/{creator}/{model-id}.ts` exporte un ModelEntry.
 *
 * - `model_id` dans chaque offer est automatiquement inféré depuis `model.id`
 *   par l'agrégateur (pas besoin de le répéter dans les offers).
 * - L'agent IA n'a qu'UN fichier à créer/éditer par modèle.
 */
export interface ModelEntry {
  /** 📖 Données intrinsèques du modèle */
  model: Model;
  /** 📖 Offres de chaque provider pour ce modèle (pricing, rate limits, etc.) */
  offers: Omit<ProviderOffer, "model_id">[];
}

// 📖 Re-import du type ProviderOffer pour le Omit ci-dessus
import type { ProviderOffer } from "./offer";

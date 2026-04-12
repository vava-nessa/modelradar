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

/** Scores de benchmarks (tous optionnels car chaque modèle publie des scores différents) */
export interface ModelBenchmarks {
  mmlu?: number;
  mmlu_pro?: number;
  gpqa_diamond?: number;
  humaneval?: number;
  swe_bench?: number;
  math_500?: number;
  aime_2025?: number;
  arena_elo?: number;
  livebench?: number;
  tau_bench?: number;
  aider_polyglot?: number;
  /** Benchmarks custom non couverts par les champs ci-dessus */
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

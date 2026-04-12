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

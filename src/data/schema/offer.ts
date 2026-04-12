/**
 * @file ProviderOffer schema — the link between a Model and a Provider
 * @description Defines pricing, rate limits, and availability for a model at a specific provider.
 * 📖 This is where provider-specific data lives (pricing can differ from creator reference pricing).
 *
 * @exports OfferStatus, ProviderOffer
 */

/** 📖 Statut de disponibilité */
export type OfferStatus = "ga" | "preview" | "beta" | "deprecated";

/** 📖 Le lien entre un modèle et un provider — c'est ici que vivent le pricing et les rate limits */
export interface ProviderOffer {
  /** 📖 FK vers Model.id */
  model_id: string;
  /** 📖 FK vers Provider.id */
  provider_id: string;
  /** 📖 ID exact du modèle dans l'API du provider */
  provider_model_id: string;

  // === Pricing ===
  /** 📖 Coût input par million de tokens ($) */
  input_per_mtok: number;
  /** 📖 Coût output par million de tokens ($) */
  output_per_mtok: number;
  /** 📖 Coût lecture cache par Mtok ($) */
  cache_read_per_mtok?: number;
  /** 📖 Coût écriture cache par Mtok ($) */
  cache_write_per_mtok?: number;
  /** 📖 Coût batch input par Mtok ($) */
  batch_input_per_mtok?: number;
  /** 📖 Coût batch output par Mtok ($) */
  batch_output_per_mtok?: number;
  /** 📖 Description des limites du free tier */
  free_tier_limits?: string;

  // === Limits (provider-specific, can differ from model defaults) ===
  /** 📖 Context window chez ce provider (peut être plus petit que le modèle natif) */
  context_window?: number;
  /** 📖 Max output tokens chez ce provider */
  max_output_tokens?: number;

  // === Rate Limits ===
  /** 📖 Rate limit requests/min */
  rate_limit_rpm?: number;
  /** 📖 Rate limit tokens/min */
  rate_limit_tpm?: number;

  // === Performance ===
  /** 📖 Time to first token moyen (ms) */
  latency_ttft_ms?: number;
  /** 📖 Vitesse de génération (tokens/s) */
  tokens_per_second?: number;

  // === Availability ===
  /** 📖 Statut de disponibilité */
  status: OfferStatus;
  /** 📖 Disponible chez ce provider depuis (ISO 8601) */
  available_since?: string;
  /** ��� Dernière mise à jour du pricing (ISO 8601) */
  last_price_update?: string;

  // === Features (provider-specific) ===
  /** 📖 Fine-tuning disponible chez ce provider pour ce modèle */
  fine_tuning_available?: boolean;
  /** 📖 Régions spécifiques à cette offre (peut différer du provider global) */
  regions?: string[];

  // === Notes ===
  /** 📖 Particularités chez ce provider */
  notes?: string;
}

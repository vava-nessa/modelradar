/**
 * @file Provider schema — types for API platforms that serve LLM models
 * @description Defines the data structure for providers (Anthropic, OpenAI, OpenRouter, etc.)
 * 📖 A Provider is a platform where you can access models via API.
 *
 * @exports ProviderAccessType, ProviderType, ProviderStatus, BillingModel, Provider
 */

/** 📖 Type d'accès au provider — comment on y accède */
export type ProviderAccessType = "free" | "api" | "sub" | "local";

/** 📖 Type de provider */
export type ProviderType = "direct" | "aggregator" | "cloud" | "self_hosted";

/** 📖 Statut du provider */
export type ProviderStatus = "active" | "maintenance" | "sunset";

/** 📖 Modèle de facturation */
export type BillingModel =
  | "pay_per_token"
  | "subscription"
  | "credits"
  | "enterprise";

/** 📖 Une plateforme qui vend l'accès à des modèles via API */
export interface Provider {
  /** 📖 Boolean indicating if the provider can be installed via a CLI/SDK (default true) */
  installable?: boolean;
  /** 📖 Slug unique, ex: "openrouter" */
  id: string;
  /** 📖 Nom d'affichage, ex: "OpenRouter" */
  name: string;
  /** 📖 Description courte du provider */
  description?: string;
  /** 📖 Type de provider (architectural) */
  type: ProviderType;
  /** 📖 Type d'accès au provider */
  provider_access_type: ProviderAccessType;
  /** 📖 Statut du provider */
  status: ProviderStatus;
  /** 📖 URL du logo */
  logo_url?: string;
  /** 📖 Site web / documentation */
  url?: string;
  /** 📖 Régions disponibles */
  regions?: string[];
  /** 📖 Type d'authentification */
  auth_type?: string;
  /** 📖 Propose un tier gratuit */
  has_free_tier?: boolean;
  /** 📖 Modèle de facturation */
  billing_model?: BillingModel;
  /** 📖 SDKs officiels disponibles */
  sdk?: string[];
  /** 📖 API compatible format OpenAI */
  openai_compatible: boolean;
  /** 📖 Certifications de conformité, ex: ["SOC2", "HIPAA", "GDPR"] */
  compliance?: string[];
}

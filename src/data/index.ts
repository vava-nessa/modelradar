/**
 * @file Main data exports + helper functions
 * @description Aggregates models, providers, families, and offers into a unified API.
 * 📖 allModels and allOffers are derived from ModelEntry files (one file per model).
 * 📖 model_id is automatically injected into offers from the parent ModelEntry.
 *
 * @functions
 *   getOffersForModel → enriched offers with provider data
 *   getModelsForProvider → models available at a provider
 *   getModelById → find model by ID
 *   getProviderById → find provider by ID
 *   getFamilyById → find family by ID
 *   getModelsForFamily → all models in a family
 *   getCheapestInputPrice → lowest input price across providers
 *   getCheapestOutputPrice → lowest output price across providers
 *   getProviderCount → number of providers for a model
 */

import { allFamilies } from "./families";
import { allEntries, allModels, allOffers } from "./models";
import { allProviders } from "./providers";
import type { Model, ModelEntry, ModelFamily, Provider, ProviderOffer } from "./schema";

export { allEntries, allFamilies, allModels, allOffers, allProviders };
export type { Model, ModelEntry, ModelFamily, Provider, ProviderOffer };

/** 📖 Toutes les offres pour un modèle donné, enrichies avec les infos provider */
export function getOffersForModel(
  modelId: string,
): (ProviderOffer & { provider: Provider })[] {
  return allOffers
    .filter((o) => o.model_id === modelId)
    .map((o) => {
      const provider = allProviders.find((p) => p.id === o.provider_id);
      if (!provider) {
        throw new Error(`Provider not found: ${o.provider_id}`);
      }
      return { ...o, provider };
    });
}

/** 📖 Tous les modèles disponibles chez un provider, enrichis avec l'offre */
export function getModelsForProvider(
  providerId: string,
): (Model & { offer: ProviderOffer })[] {
  return allOffers
    .filter((o) => o.provider_id === providerId)
    .map((o) => {
      const model = allModels.find((m) => m.id === o.model_id);
      if (!model) {
        throw new Error(`Model not found: ${o.model_id}`);
      }
      return { ...model, offer: o };
    });
}

/** 📖 Trouver un modèle par son ID */
export function getModelById(id: string): Model | undefined {
  return allModels.find((m) => m.id === id);
}

/** 📖 Trouver un provider par son ID */
export function getProviderById(id: string): Provider | undefined {
  return allProviders.find((p) => p.id === id);
}

/** 📖 Trouver une famille par son ID */
export function getFamilyById(id: string): ModelFamily | undefined {
  return allFamilies.find((f) => f.id === id);
}

/** 📖 Tous les modèles d'une famille donnée */
export function getModelsForFamily(familyId: string): Model[] {
  return allModels.filter((m) => m.family === familyId);
}

/** 📖 Prix le plus bas pour un modèle (input) tous providers confondus */
export function getCheapestInputPrice(modelId: string): number | null {
  const offers = allOffers.filter((o) => o.model_id === modelId);
  if (offers.length === 0) return null;
  return Math.min(...offers.map((o) => o.input_per_mtok));
}

/** 📖 Prix le plus bas pour un modèle (output) tous providers confondus */
export function getCheapestOutputPrice(modelId: string): number | null {
  const offers = allOffers.filter((o) => o.model_id === modelId);
  if (offers.length === 0) return null;
  return Math.min(...offers.map((o) => o.output_per_mtok));
}

/** 📖 Nombre de providers disponibles pour un modèle */
export function getProviderCount(modelId: string): number {
  return allOffers.filter((o) => o.model_id === modelId).length;
}

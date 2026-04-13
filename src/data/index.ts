/**
 * @file Main data exports and helper functions
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

/** 📖 Returns all offers for a given model, enriched with provider info */
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

/** 📖 Returns all models available at a provider, enriched with the provider offer */
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

/** 📖 Find a model by its ID */
export function getModelById(id: string): Model | undefined {
  return allModels.find((m) => m.id === id);
}

/** 📖 Find a provider by its ID */
export function getProviderById(id: string): Provider | undefined {
  return allProviders.find((p) => p.id === id);
}

/** 📖 Find a family by its ID */
export function getFamilyById(id: string): ModelFamily | undefined {
  return allFamilies.find((f) => f.id === id);
}

/** 📖 Returns all models belonging to a given family */
export function getModelsForFamily(familyId: string): Model[] {
  return allModels.filter((m) => m.family === familyId);
}

/** 📖 Returns the cheapest input price for a model across all providers */
export function getCheapestInputPrice(modelId: string): number | null {
  const offers = allOffers.filter((o) => o.model_id === modelId);
  if (offers.length === 0) return null;
  return Math.min(...offers.map((o) => o.input_per_mtok));
}

/** 📖 Returns the cheapest output price for a model across all providers */
export function getCheapestOutputPrice(modelId: string): number | null {
  const offers = allOffers.filter((o) => o.model_id === modelId);
  if (offers.length === 0) return null;
  return Math.min(...offers.map((o) => o.output_per_mtok));
}

/** 📖 Returns the number of providers available for a model */
export function getProviderCount(modelId: string): number {
  return allOffers.filter((o) => o.model_id === modelId).length;
}

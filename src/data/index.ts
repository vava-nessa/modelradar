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

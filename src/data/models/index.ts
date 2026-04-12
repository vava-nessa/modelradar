/**
 * @file Models aggregation — flattens all ModelEntry files into allModels + allOffers
 * @description Imports every model entry from creator subdirectories and produces
 * the flat arrays consumed by the rest of the app.
 * 📖 To add a model: create a new file in the creator folder, then re-export it
 * from that folder's index.ts. This file auto-aggregates.
 *
 * @exports allEntries → ModelEntry[]
 * @exports allModels → Model[]
 * @exports allOffers → ProviderOffer[]
 */

import type { Model, ModelEntry, ProviderOffer } from "@/data/schema";

import * as anthropic from "./anthropic";
import * as deepseek from "./deepseek";
import * as google from "./google";
import * as meta from "./meta";
import * as microsoft from "./microsoft";
import * as mistral from "./mistral";
import * as openai from "./openai";

// 📖 Collects every ModelEntry from all creator modules
export const allEntries: ModelEntry[] = [
  ...Object.values(anthropic),
  ...Object.values(openai),
  ...Object.values(google),
  ...Object.values(meta),
  ...Object.values(mistral),
  ...Object.values(deepseek),
  ...Object.values(microsoft),
];

// 📖 Flat list of all models (intrinsic data only)
export const allModels: Model[] = allEntries.map((e) => e.model);

// 📖 Flat list of all offers with model_id injected from the parent entry
export const allOffers: ProviderOffer[] = allEntries.flatMap((e) =>
  e.offers.map((o) => ({ ...o, model_id: e.model.id })),
);

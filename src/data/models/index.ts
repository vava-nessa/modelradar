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
import * as cohere from "./cohere";
import * as deepseek from "./deepseek";
import * as fireworks_ai from "./fireworks-ai";
import * as google from "./google";
import * as groq from "./groq";
import * as meta from "./meta";
import * as microsoft from "./microsoft";
import * as mistral from "./mistral";
import * as novita_ai from "./novita-ai";
import * as openai from "./openai";
import * as perplexity from "./perplexity";
import * as togetherai from "./togetherai";
import * as upstage from "./upstage";
import * as vercel from "./vercel";
import * as xai from "./xai";
import * as minimaxai from "./minimaxai";
import * as moonshotai from "./moonshotai";
import * as stepfunai from "./stepfunai";
import * as zhipuai from "./zhipuai";
import * as qwen from "./qwen";

// 📖 Collects every ModelEntry from all creator modules
export const allEntries: ModelEntry[] = [
  ...Object.values(anthropic),
  ...Object.values(openai),
  ...Object.values(google),
  ...Object.values(meta),
  ...Object.values(mistral),
  ...Object.values(deepseek),
  ...Object.values(microsoft),
  ...Object.values(cohere),
  ...Object.values(xai),
  ...Object.values(groq),
  ...Object.values(novita_ai),
  ...Object.values(fireworks_ai),
  ...Object.values(togetherai),
  ...Object.values(perplexity),
  ...Object.values(upstage),
  ...Object.values(vercel),
  ...Object.values(minimaxai),
  ...Object.values(moonshotai),
  ...Object.values(stepfunai),
  ...Object.values(zhipuai),
  ...Object.values(qwen),
];

// 📖 Flat list of all models (intrinsic data only)
export const allModels: Model[] = allEntries.map((e) => e.model);

// 📖 Flat list of all offers with model_id injected from the parent entry
export const allOffers: ProviderOffer[] = allEntries.flatMap((e) =>
  e.offers.map((o) => ({ ...o, model_id: e.model.id })),
);

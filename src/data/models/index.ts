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
import * as deepseek_ai from "./deepseek-ai";
import * as fireworks_ai from "./fireworks-ai";
import * as google from "./google";
import * as groq from "./groq";
import * as meta from "./meta";
import * as microsoft from "./microsoft";
import * as mistral from "./mistral";
import * as mistralai from "./mistralai";
import * as novita_ai from "./novita-ai";
import * as openai from "./openai";
import * as perplexity from "./perplexity";
import * as togetherai from "./togetherai";
import * as upstage from "./upstage";
import * as vercel from "./vercel";
import * as xai from "./xai";
import * as xai_creator from "./x-ai";
import * as minimaxai from "./minimaxai";
import * as moonshotai from "./moonshotai";
import * as stepfunai from "./stepfunai";
import * as zhipuai from "./zhipuai";
import * as qwen from "./qwen";
import * as amazon from "./amazon";
import * as black_forest_labs from "./black-forest-labs";
import * as nvidia from "./nvidia";
import * as zai from "./z-ai";
import * as stepfun_ai from "./stepfun-ai";
import { freeCodingEntries } from "./freecoding/freecodingModels";

// 📖 Collects every ModelEntry from all creator modules
export const allEntries: ModelEntry[] = [
  ...Object.values(anthropic) as ModelEntry[],
  ...Object.values(openai) as ModelEntry[],
  ...Object.values(google) as ModelEntry[],
  ...Object.values(meta) as ModelEntry[],
  ...Object.values(mistral) as ModelEntry[],
  ...Object.values(mistralai) as ModelEntry[],
  ...Object.values(deepseek) as ModelEntry[],
  ...Object.values(deepseek_ai) as ModelEntry[],
  ...Object.values(microsoft) as ModelEntry[],
  ...Object.values(cohere) as ModelEntry[],
  ...Object.values(xai) as ModelEntry[],
  ...Object.values(xai_creator) as ModelEntry[],
  ...Object.values(groq) as ModelEntry[],
  ...Object.values(novita_ai) as ModelEntry[],
  ...Object.values(fireworks_ai) as ModelEntry[],
  ...Object.values(togetherai) as ModelEntry[],
  ...Object.values(perplexity) as ModelEntry[],
  ...Object.values(upstage) as ModelEntry[],
  ...Object.values(vercel) as ModelEntry[],
  ...Object.values(minimaxai) as ModelEntry[],
  ...Object.values(moonshotai) as ModelEntry[],
  ...Object.values(stepfunai) as ModelEntry[],
  ...Object.values(stepfun_ai) as ModelEntry[],
  ...Object.values(zhipuai) as ModelEntry[],
  ...Object.values(qwen) as ModelEntry[],
  ...Object.values(amazon) as ModelEntry[],
  ...Object.values(black_forest_labs) as ModelEntry[],
  ...Object.values(nvidia) as ModelEntry[],
  ...Object.values(zai) as ModelEntry[],
  ...freeCodingEntries,
];

// 📖 Flat list of all models (intrinsic data only)
export const allModels: Model[] = allEntries.map((e) => e.model);

// 📖 Flat list of all offers with model_id injected from the parent entry
export const allOffers: ProviderOffer[] = allEntries.flatMap((e) =>
  e.offers.map((o) => ({ ...o, model_id: e.model.id })),
);

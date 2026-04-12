import { anthropicModels } from "./anthropic";
import { openaiModels } from "./openai";
import { googleModels } from "./google";
import { metaModels } from "./meta";
import type { Model } from "@/data/schema";

export const allModels: Model[] = [
  ...anthropicModels,
  ...openaiModels,
  ...googleModels,
  ...metaModels,
];

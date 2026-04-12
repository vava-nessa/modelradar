import type { Model } from "@/data/schema";
import { anthropicModels } from "./anthropic";
import { googleModels } from "./google";
import { metaModels } from "./meta";
import { openaiModels } from "./openai";

export const allModels: Model[] = [
  ...anthropicModels,
  ...openaiModels,
  ...googleModels,
  ...metaModels,
];

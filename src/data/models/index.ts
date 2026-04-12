import type { Model } from "@/data/schema";
import { anthropicModels } from "./anthropic";
import { googleModels } from "./google";
import { metaModels } from "./meta";
import { mistralModels } from "./mistral";
import { deepseekModels } from "./deepseek";
import { microsoftModels } from "./microsoft";
import { openaiModels } from "./openai";

export const allModels: Model[] = [
  ...anthropicModels,
  ...openaiModels,
  ...googleModels,
  ...metaModels,
  ...mistralModels,
  ...deepseekModels,
  ...microsoftModels,
];

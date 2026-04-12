/**
 * @file Providers aggregation
 * @description Collects all individual provider files into a single array.
 * 📖 To add a provider: create a new file in this folder, then add it here.
 *
 * @exports allProviders → Provider[]
 */

import type { Provider } from "@/data/schema";

import { anthropic } from "./anthropic";
import { azure } from "./azure";
import { bedrock } from "./bedrock";
import { deepseek } from "./deepseek";
import { mistral } from "./mistral";
import { openai } from "./openai";
import { openrouter } from "./openrouter";

export const allProviders: Provider[] = [
  anthropic,
  openai,
  openrouter,
  bedrock,
  mistral,
  deepseek,
  azure,
];

import type { ModelEntry, ModelCategory } from "@/data/schema";
import { MODELS } from "./freecodingSources";

/**
 * Free tier providers — these provide free access to their models
 * (either completely free or have a free quota/tier)
 */
const FREE_PROVIDERS = new Set([
  "groq",           // Free API keys
  "cerebras",       // Free API keys
  "openrouter",     // :free models are free
  "huggingface",    // Free monthly credits
  "deepinfra",      // Free tier available
  "codestral",      // Free (30 req/min, 2000/day)
  "scaleway",       // 1M free tokens
  "googleai",       // Free Gemma models
  "zai",            // Free API keys
  "cloudflare",     // Free plan with daily quota
  "qwen",           // Free tier 1M tokens (Singapore)
  "iflow",          // Free for individual users
  "chutes",         // Truly free (community GPU)
  "ovhcloud",       // Free sandbox
  "rovo",           // Free tier 5M tokens/day
  "gemini",         // Free 1000 req/day
  "opencode-zen",   // Free on Zen platform
  "fireworks",      // $1 free trial
  "hyperbolic",     // $1 free trial
  "sambanova",      // $5 free trial credits
]);

/**
 * CLI-only providers — models that only work via CLI tool, not API
 */
const CLI_ONLY_PROVIDERS = new Set(["rovo", "gemini"]);

/**
 * Extract creator from model_id (e.g., "deepseek-ai/deepseek-v3.2" → "deepseek-ai")
 */
function extractCreator(modelId: string, providerKey: string): string {
  if (modelId.includes("/")) {
    return modelId.split("/")[0];
  }
  return providerKey;
}

/**
 * Convert context window string to number of tokens
 */
function parseContextWindow(ctx: string): number {
  const lowered = ctx.toLowerCase();
  if (lowered.endsWith("k")) return Number(lowered.replace("k", "")) * 1000;
  if (lowered.endsWith("m")) return Number(lowered.replace("m", "")) * 1_000_000;
  return Number(lowered);
}

/**
 * Convert tier string to ModelCategory
 * S+ and S tier → flagship (most capable)
 * A+ tier → mid (strong but more compact)
 * A tier → mid
 * A- tier → small (lightweight)
 * B+ and B tier → small
 * C tier → small (lightweight edge)
 */
function tierToCategory(tier: string): ModelCategory {
  switch (tier) {
    case "S+":
    case "S":
      return "flagship";
    case "A+":
    case "A":
      return "mid";
    case "A-":
    case "B+":
    case "B":
    case "C":
      return "small";
    default:
      return "mid";
  }
}

/**
 * Parse SWE-bench score string to number
 */
function parseSweScore(score: string): number {
  return Number(score.replace("%", ""));
}

/**
 * Generate a ModelEntry from free-coding-models data
 */
function makeEntry(
  modelId: string,
  label: string,
  tier: string,
  sweScore: string,
  ctx: string,
  providerKey: string
): ModelEntry {
  const creator = extractCreator(modelId, providerKey);
  const isFree = FREE_PROVIDERS.has(providerKey);
  const isCliOnly = CLI_ONLY_PROVIDERS.has(providerKey);

  // Determine supportedOn access types
  const supportedOn: ("free" | "api" | "sub" | "local")[] = [];
  if (isFree) supportedOn.push("free");
  if (!isCliOnly) supportedOn.push("api");

  // Clean provider_model_id (remove :free suffix for openrouter)
  const providerModelId = modelId.replace(/:free$/, "");

  return {
    model: {
      id: `${providerKey}/${providerModelId}`.toLowerCase().replace(/\//g, "-"),
      name: label,
      creator,
      family: creator,
      category: tierToCategory(tier),
      status: "active",
      modality_input: ["text", "code"],
      modality_output: ["text"],
      context_window: parseContextWindow(ctx),
      release_date: "2025-01-01",
      is_open_source: false,
      capabilities: {
        streaming: true,
        function_calling: true,
        json_mode: true,
        vision: false,
      },
      benchmarks: {
        verified_swe_bench: parseSweScore(sweScore),
      },
      supportedOn,
    },
    offers: [
      {
        provider_id: providerKey,
        provider_model_id: providerModelId,
        input_per_mtok: 0,
        output_per_mtok: 0,
        status: "ga",
        available_since: undefined,
      },
    ],
  };
}

export const freeCodingEntries: ModelEntry[] = MODELS.map((m) =>
  makeEntry(m[0], m[1], m[2], m[3], m[4], m[5])
);

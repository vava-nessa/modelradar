/**
 * @file Cost Calculator utilities
 * @description Pure functions for computing monthly LLM API costs based on token volume.
 * 📖 No side effects — all functions are deterministic given the same inputs.
 * 📖 Designed for the /cost page and model detail "Simulate costs" deep-link.
 *
 * @functions
 *   calculateCosts → compute monthly cost for each provider offer
 *   calculateBreakeven → compute subscription vs API breakeven token volume
 *
 * @exports CostInputs, CostResult, BreakevenResult
 */

import type { Model, Provider, ProviderOffer } from "@/data/schema";

/** 📖 User inputs for the cost simulation */
export interface CostInputs {
  /** 📖 Total tokens consumed per month (input + output combined) */
  totalTokensPerMonth: number;
  /** 📖 Fraction of total tokens that are input tokens (0–1), e.g. 0.7 */
  inputRatio: number;
  /** 📖 Whether to factor in prompt caching for eligible offers */
  includeCacheRead: boolean;
  /** 📖 Fraction of input tokens that hit the cache (0–1), e.g. 0.5 */
  cacheHitRatio: number;
}

/** 📖 A single computed cost row for a model+provider combination */
export interface CostResult {
  modelId: string;
  modelName: string;
  providerId: string;
  providerName: string;
  providerType: string;
  inputCost: number;
  outputCost: number;
  /** 📖 Amount saved vs regular input cost when cache_read_per_mtok is defined */
  cacheReadSavings: number;
  totalMonthly: number;
  /** 📖 Shown as a badge when the offer has free_tier_limits */
  freeTierNote: string | undefined;
  /** 📖 Whether the offer supports prompt caching pricing */
  supportsCacheRead: boolean;
}

/** 📖 Subscription vs API breakeven analysis for a model */
export interface BreakevenResult {
  modelId: string;
  modelName: string;
  /** 📖 Monthly subscription price (e.g. $20 for ChatGPT Plus) */
  subscriptionPrice: number;
  /** 📖 Cheapest API cost per token (output, $/token) */
  cheapestApiCostPerToken: number;
  /** 📖 Token volume at which API becomes cheaper than sub */
  breakevenTokens: number;
}

/** 📖 Enriched offer type with its associated provider and model */
type EnrichedOffer = ProviderOffer & { provider: Provider; model: Model };

/**
 * 📖 Compute monthly costs for all given offers based on user inputs.
 * Sorted cheapest-first by totalMonthly.
 *
 * Formula:
 *   inputTokens = total * inputRatio
 *   outputTokens = total * (1 - inputRatio)
 *   inputCost = (inputTokens / 1M) * input_per_mtok
 *   cacheReadSavings = (inputTokens * cacheHitRatio / 1M) * (input_per_mtok - cache_read_per_mtok)
 *   outputCost = (outputTokens / 1M) * output_per_mtok
 *   total = inputCost - cacheReadSavings + outputCost
 */
export function calculateCosts(
  inputs: CostInputs,
  offers: EnrichedOffer[],
): CostResult[] {
  const inputTokens = inputs.totalTokensPerMonth * inputs.inputRatio;
  const outputTokens = inputs.totalTokensPerMonth * (1 - inputs.inputRatio);

  const results: CostResult[] = offers
    // 📖 Skip deprecated offers
    .filter((o) => o.status !== "deprecated")
    .map((o) => {
      const inputCost = (inputTokens / 1_000_000) * o.input_per_mtok;
      const outputCost = (outputTokens / 1_000_000) * o.output_per_mtok;

      // 📖 Cache savings: only applicable when offer has a cache_read price AND user enabled it
      const supportsCacheRead = o.cache_read_per_mtok !== undefined;
      let cacheReadSavings = 0;
      if (inputs.includeCacheRead && supportsCacheRead && o.cache_read_per_mtok !== undefined) {
        cacheReadSavings =
          (inputTokens * inputs.cacheHitRatio / 1_000_000) *
          (o.input_per_mtok - o.cache_read_per_mtok);
      }

      const totalMonthly = Math.max(0, inputCost - cacheReadSavings + outputCost);

      return {
        modelId: o.model.id,
        modelName: o.model.name,
        providerId: o.provider_id,
        providerName: o.provider.name,
        providerType: o.provider.type,
        inputCost,
        outputCost,
        cacheReadSavings,
        totalMonthly,
        freeTierNote: o.free_tier_limits,
        supportsCacheRead,
      };
    });

  // 📖 Sort cheapest first
  results.sort((a, b) => a.totalMonthly - b.totalMonthly);
  return results;
}

/**
 * 📖 Preset token volume options for the cost simulator UI
 * Values represent total tokens per month
 */
export const TOKEN_PRESETS: { label: string; value: number }[] = [
  { label: "100K", value: 100_000 },
  { label: "1M", value: 1_000_000 },
  { label: "10M", value: 10_000_000 },
  { label: "100M", value: 100_000_000 },
  { label: "1B", value: 1_000_000_000 },
];

import type { ModelEntry } from "@/data/schema";
import { MODELS } from "./freecodingSources";

/**
 * Minimal helper to convert a context window string like "128k" or "1M" to a number of tokens.
 */
function parseContextWindow(ctx: string): number {
  const lowered = ctx.toLowerCase();
  if (lowered.endsWith("k")) return Number(lowered.replace("k", "")) * 1000;
  if (lowered.endsWith("m")) return Number(lowered.replace("m", "")) * 1_000_000;
  return Number(lowered);
}

/**
 * Generate a ModelEntry with sane defaults for free‑coding‑models data.
 * Many fields are populated with generic placeholders because the upstream dataset
 * does not include the full schema required by ModelRadar.
 */
function makeEntry(
  modelId: string,
  label: string,
  tier: string,
  sweScore: string,
  ctx: string,
  providerKey: string
): ModelEntry {
  return {
    model: {
      id: modelId,
      name: label,
      creator: providerKey,
      family: "generic",
      category: "code",
      status: "active",
      modality_input: ["text", "code"],
      modality_output: ["text"],
      context_window: parseContextWindow(ctx),
      release_date: "2025-01-01",
      is_open_source: false,
      capabilities: {
        streaming: true,
        function_calling: true,
        vision: false,
      },
      supportedOn: ["api"],
    },
    offers: [
      {
        provider_id: providerKey,
        provider_model_id: modelId,
        // Pricing details are unknown – leave undefined so UI can handle missing data.
        input_per_mtok: undefined,
        output_per_mtok: undefined,
        status: "ga",
        available_since: undefined,
      },
    ],
  };
}

export const freeCodingEntries: ModelEntry[] = MODELS.map((m) =>
  makeEntry(m[0], m[1], m[2], m[3], m[4], m[5])
);

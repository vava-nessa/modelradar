import type { ModelEntry } from "@/data/schema";

export const v015Lg: ModelEntry = {
  model: {
    id: "v0-1.5-lg",
    name: "v0 1.5 Large",
    creator: "vercel",
    family: "v0",
    category: "flagship",
    status: "active",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 512000,
    max_output_tokens: 32000,
    is_open_source: false,
    release_date: "2025-06-09",
    last_updated: "2025-06-09",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
    },
    description:
      "Vercel's flagship v0 model with 512k context window. Best for complex full-stack application development.",
    supportedOn: ["api"],
    cost: { input: 15, output: 75 },
  },
  offers: [
    {
      provider_id: "v0",
      provider_model_id: "v0-1.5-lg",
      input_per_mtok: 15.0,
      output_per_mtok: 75.0,
      status: "ga",
    },
  ],
};
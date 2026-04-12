import type { ModelEntry } from "@/data/schema";

export const v015Md: ModelEntry = {
  model: {
    id: "v0-1.5-md",
    name: "v0 1.5 Medium",
    creator: "vercel",
    family: "v0",
    category: "mid",
    status: "active",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 128000,
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
      "Vercel's v0 1.5 medium model for web development with improved reasoning and code quality.",
    supportedOn: ["api"],
    cost: { input: 3, output: 15 },
  },
  offers: [
    {
      provider_id: "v0",
      provider_model_id: "v0-1.5-md",
      input_per_mtok: 3.0,
      output_per_mtok: 15.0,
      status: "ga",
    },
  ],
};
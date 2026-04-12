import type { ModelEntry } from "@/data/schema";

export const grok4: ModelEntry = {
  model: {
    id: "grok-4",
    name: "Grok 4",
    creator: "x-ai",
    family: "grok",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 256000,
    max_output_tokens: 64000,
    is_open_source: false,
    release_date: "2025-07-09",
    reasoning: true,
    temperature: true,
    knowledge: "2025-07",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "xAI's Grok 4 - reasoning model with real-time knowledge access.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "fastrouter",
      provider_model_id: "x-ai/grok-4",
      input_per_mtok: 3.0,
      output_per_mtok: 15.0,
      cache_read_per_mtok: 0.75,
      cache_write_per_mtok: 15.0,
      status: "ga",
    },
  ],
};
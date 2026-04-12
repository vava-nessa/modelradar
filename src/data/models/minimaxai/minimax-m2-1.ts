import type { ModelEntry } from "@/data/schema";

export const minimaxM21: ModelEntry = {
  model: {
    id: "minimax-m2-1",
    name: "MiniMax-M2.1",
    creator: "minimaxai",
    family: "minimax",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 204800,
    max_output_tokens: 131072,
    is_open_source: true,
    release_date: "2025-12-23",
    last_updated: "2025-12-23",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    cost: {
      input: 0.3,
      output: 1.2,
      cache_read: 0.03,
      cache_write: 0.375,
    },
    tags: ["reasoning", "coding"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "minimax",
      provider_model_id: "MiniMax-M2.1",
      input_per_mtok: 0.3,
      output_per_mtok: 1.2,
      cache_read_per_mtok: 0.03,
      cache_write_per_mtok: 0.375,
      status: "ga",
      available_since: "2025-12-23",
    },
  ],
};

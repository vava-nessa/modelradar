import type { ModelEntry } from "@/data/schema";

export const minimaxM27Highspeed: ModelEntry = {
  model: {
    id: "minimax-m2-7-highspeed",
    name: "MiniMax-M2.7-highspeed",
    creator: "minimaxai",
    family: "minimax",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 204800,
    max_output_tokens: 131072,
    is_open_source: true,
    release_date: "2026-03-18",
    last_updated: "2026-03-18",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    cost: {
      input: 0.6,
      output: 2.4,
      cache_read: 0.06,
      cache_write: 0.375,
    },
    tags: ["reasoning", "coding", "highspeed"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "minimax",
      provider_model_id: "MiniMax-M2.7-highspeed",
      input_per_mtok: 0.6,
      output_per_mtok: 2.4,
      cache_read_per_mtok: 0.06,
      cache_write_per_mtok: 0.375,
      status: "ga",
      available_since: "2026-03-18",
    },
  ],
};

import type { ModelEntry } from "@/data/schema";

export const kimiK2Thinking: ModelEntry = {
  model: {
    id: "kimi-k2-thinking",
    name: "Kimi K2 Thinking",
    creator: "moonshotai",
    family: "kimi-thinking",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 262144,
    is_open_source: true,
    release_date: "2025-11-06",
    last_updated: "2025-11-06",
    knowledge: "2024-08",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    cost: {
      input: 0.6,
      output: 2.5,
      cache_read: 0.15,
    },
    tags: ["reasoning", "coding"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "moonshotai",
      provider_model_id: "kimi-k2-thinking",
      input_per_mtok: 0.6,
      output_per_mtok: 2.5,
      cache_read_per_mtok: 0.15,
      status: "ga",
      available_since: "2025-11-06",
    },
  ],
};

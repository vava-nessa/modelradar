import type { ModelEntry } from "@/data/schema";

export const kimiK2ThinkingTurbo: ModelEntry = {
  model: {
    id: "kimi-k2-thinking-turbo",
    name: "Kimi K2 Thinking Turbo",
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
      input: 1.15,
      output: 8.0,
      cache_read: 0.15,
    },
    tags: ["reasoning", "coding"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "moonshotai",
      provider_model_id: "kimi-k2-thinking-turbo",
      input_per_mtok: 1.15,
      output_per_mtok: 8.0,
      cache_read_per_mtok: 0.15,
      status: "ga",
      available_since: "2025-11-06",
    },
  ],
};

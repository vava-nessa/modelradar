import type { ModelEntry } from "@/data/schema";

export const kimiK25: ModelEntry = {
  model: {
    id: "kimi-k2-5",
    name: "Kimi K2.5",
    creator: "moonshotai",
    family: "kimi",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 262144,
    is_open_source: true,
    release_date: "2026-01",
    last_updated: "2026-01",
    knowledge: "2025-01",
    reasoning: true,
    temperature: false,
    capabilities: {
      streaming: true,
      function_calling: true,
      structured_output: true,
      vision: false,
    },
    cost: {
      input: 0.6,
      output: 3.0,
      cache_read: 0.1,
    },
    tags: ["reasoning", "coding", "vision"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "moonshotai",
      provider_model_id: "kimi-k2.5",
      input_per_mtok: 0.6,
      output_per_mtok: 3.0,
      cache_read_per_mtok: 0.1,
      status: "ga",
      available_since: "2026-01",
    },
  ],
};

import type { ModelEntry } from "@/data/schema";

export const kimiK2Turbo: ModelEntry = {
  model: {
    id: "kimi-k2-turbo",
    name: "Kimi K2 Turbo",
    creator: "moonshotai",
    family: "kimi",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 262144,
    is_open_source: true,
    release_date: "2025-09-05",
    last_updated: "2025-09-05",
    knowledge: "2024-10",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    cost: {
      input: 2.4,
      output: 10.0,
      cache_read: 0.6,
    },
    tags: ["coding"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "moonshotai",
      provider_model_id: "kimi-k2-turbo",
      input_per_mtok: 2.4,
      output_per_mtok: 10.0,
      cache_read_per_mtok: 0.6,
      status: "preview",
      available_since: "2025-09-05",
    },
  ],
};

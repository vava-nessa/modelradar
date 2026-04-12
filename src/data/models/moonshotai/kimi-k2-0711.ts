import type { ModelEntry } from "@/data/schema";

export const kimiK20711: ModelEntry = {
  model: {
    id: "kimi-k2-0711",
    name: "Kimi K2 0711",
    creator: "moonshotai",
    family: "kimi",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 16384,
    is_open_source: true,
    release_date: "2025-07-14",
    last_updated: "2025-07-14",
    knowledge: "2024-10",
    reasoning: false,
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
    tags: ["coding"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "moonshotai",
      provider_model_id: "kimi-k2-0711",
      input_per_mtok: 0.6,
      output_per_mtok: 2.5,
      cache_read_per_mtok: 0.15,
      status: "preview",
      available_since: "2025-07-14",
    },
  ],
};

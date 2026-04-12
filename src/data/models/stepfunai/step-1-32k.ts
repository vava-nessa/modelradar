import type { ModelEntry } from "@/data/schema";

export const step1_32k: ModelEntry = {
  model: {
    id: "step-1-32k",
    name: "Step 1 (32K)",
    creator: "stepfunai",
    family: "step",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 32768,
    max_output_tokens: 32768,
    is_open_source: false,
    release_date: "2025-01-01",
    last_updated: "2026-02-13",
    knowledge: "2024-06",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    cost: {
      input: 2.05,
      output: 9.59,
      cache_read: 0.41,
    },
    tags: ["coding"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "stepfun",
      provider_model_id: "Step-1-32k",
      input_per_mtok: 2.05,
      output_per_mtok: 9.59,
      cache_read_per_mtok: 0.41,
      status: "ga",
      available_since: "2025-01-01",
    },
  ],
};

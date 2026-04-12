import type { ModelEntry } from "@/data/schema";

export const step2_16k: ModelEntry = {
  model: {
    id: "step-2-16k",
    name: "Step 2 (16K)",
    creator: "stepfunai",
    family: "step",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 16384,
    max_output_tokens: 8192,
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
      input: 5.21,
      output: 16.44,
      cache_read: 1.04,
    },
    tags: ["coding"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "stepfun",
      provider_model_id: "Step-2-16k",
      input_per_mtok: 5.21,
      output_per_mtok: 16.44,
      cache_read_per_mtok: 1.04,
      status: "ga",
      available_since: "2025-01-01",
    },
  ],
};

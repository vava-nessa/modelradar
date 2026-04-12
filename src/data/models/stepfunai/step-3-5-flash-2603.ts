import type { ModelEntry } from "@/data/schema";

export const step35Flash2603: ModelEntry = {
  model: {
    id: "step-3-5-flash-2603",
    name: "Step 3.5 Flash 2603",
    creator: "stepfunai",
    family: "step",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 256000,
    max_output_tokens: 256000,
    is_open_source: true,
    release_date: "2026-04-02",
    last_updated: "2026-04-02",
    knowledge: "2025-01",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    cost: {
      input: 0.1,
      output: 0.3,
      cache_read: 0.02,
    },
    tags: ["reasoning", "coding", "fast"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "stepfun",
      provider_model_id: "Step-3.5-Flash-2603",
      input_per_mtok: 0.1,
      output_per_mtok: 0.3,
      cache_read_per_mtok: 0.02,
      status: "ga",
      available_since: "2026-04-02",
    },
  ],
};

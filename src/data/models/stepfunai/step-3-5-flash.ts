import type { ModelEntry } from "@/data/schema";

export const step35Flash: ModelEntry = {
  model: {
    id: "step-3-5-flash",
    name: "Step 3.5 Flash",
    creator: "stepfunai",
    family: "step",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 256000,
    max_output_tokens: 256000,
    is_open_source: true,
    release_date: "2026-01-29",
    last_updated: "2026-02-13",
    knowledge: "2025-01",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    cost: {
      input: 0.096,
      output: 0.288,
      cache_read: 0.019,
    },
    tags: ["reasoning", "coding", "fast"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "stepfun",
      provider_model_id: "Step-3.5-Flash",
      input_per_mtok: 0.096,
      output_per_mtok: 0.288,
      cache_read_per_mtok: 0.019,
      status: "ga",
      available_since: "2026-01-29",
    },
  ],
};

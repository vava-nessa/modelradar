import type { ModelEntry } from "@/data/schema";

export const glm5: ModelEntry = {
  model: {
    id: "glm-5",
    name: "GLM-5",
    creator: "zhipuai",
    family: "glm",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 204800,
    max_output_tokens: 131072,
    is_open_source: true,
    release_date: "2026-02-11",
    last_updated: "2026-02-11",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    cost: {
      input: 1.0,
      output: 3.2,
      cache_read: 0.2,
      cache_write: 0,
    },
    tags: ["reasoning", "coding"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "zhipuai",
      provider_model_id: "GLM-5",
      input_per_mtok: 1.0,
      output_per_mtok: 3.2,
      cache_read_per_mtok: 0.2,
      cache_write_per_mtok: 0,
      status: "ga",
      available_since: "2026-02-11",
    },
  ],
};

import type { ModelEntry } from "@/data/schema";

export const glm51: ModelEntry = {
  model: {
    id: "glm-5-1",
    name: "GLM-5.1",
    creator: "zhipuai",
    family: "glm",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 200000,
    max_output_tokens: 131072,
    is_open_source: false,
    release_date: "2026-03-27",
    last_updated: "2026-03-27",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      structured_output: true,
      vision: false,
    },
    cost: {
      input: 6.0,
      output: 24.0,
      cache_read: 1.3,
      cache_write: 0,
    },
    tags: ["reasoning", "coding"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "zhipuai",
      provider_model_id: "GLM-5.1",
      input_per_mtok: 6.0,
      output_per_mtok: 24.0,
      cache_read_per_mtok: 1.3,
      cache_write_per_mtok: 0,
      status: "ga",
      available_since: "2026-03-27",
    },
  ],
};

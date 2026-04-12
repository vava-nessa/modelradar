import type { ModelEntry } from "@/data/schema";

export const glm5vTurbo: ModelEntry = {
  model: {
    id: "glm-5v-turbo",
    name: "GLM-5V Turbo",
    creator: "zhipuai",
    family: "glm",
    category: "flagship",
    status: "active",
    modality_input: ["text", "image", "pdf"],
    modality_output: ["text"],
    context_window: 200000,
    max_output_tokens: 131072,
    is_open_source: false,
    release_date: "2026-04-01",
    last_updated: "2026-04-01",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      structured_output: true,
      vision: true,
    },
    cost: {
      input: 5.0,
      output: 22.0,
      cache_read: 1.2,
      cache_write: 0,
    },
    tags: ["coding", "vision", "multimodal"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "zhipuai",
      provider_model_id: "glm-5v-turbo",
      input_per_mtok: 5.0,
      output_per_mtok: 22.0,
      cache_read_per_mtok: 1.2,
      cache_write_per_mtok: 0,
      status: "ga",
      available_since: "2026-04-01",
    },
  ],
};

import type { ModelEntry } from "@/data/schema";

export const glm5Fastrouter: ModelEntry = {
  model: {
    id: "glm-5-fastrouter",
    name: "GLM-5",
    creator: "z-ai",
    family: "glm",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 204800,
    max_output_tokens: 131072,
    is_open_source: true,
    release_date: "2026-02-11",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "Zet's GLM-5 - latest in the GLM series with advanced reasoning.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "fastrouter",
      provider_model_id: "z-ai/glm-5",
      input_per_mtok: 0.95,
      output_per_mtok: 3.15,
      status: "ga",
    },
  ],
};
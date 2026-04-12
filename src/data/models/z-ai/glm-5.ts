import type { ModelEntry } from "@/data/schema";

export const glm5: ModelEntry = {
  model: {
    id: "glm-5",
    name: "GLM-5",
    creator: "z-ai",
    family: "glm",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 202752,
    max_output_tokens: 131000,
    is_open_source: true,
    release_date: "2026-02-12",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      structured_output: true,
      prompt_caching: true,
    },
    description: "Zet's flagship GLM-5 reasoning model with advanced capabilities.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "z-ai/glm-5",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
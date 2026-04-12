import type { ModelEntry } from "@/data/schema";

export const glm47: ModelEntry = {
  model: {
    id: "glm-4.7",
    name: "GLM-4.7",
    creator: "z-ai",
    family: "glm",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 204800,
    max_output_tokens: 131072,
    is_open_source: true,
    release_date: "2025-12-22",
    reasoning: true,
    temperature: true,
    knowledge: "2025-04",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "Zet's GLM-4.7 reasoning model with interleaved thinking.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "z-ai/glm-4.7",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
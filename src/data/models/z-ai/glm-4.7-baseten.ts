import type { ModelEntry } from "@/data/schema";

export const glm47Baseten: ModelEntry = {
  model: {
    id: "glm-4.7-baseten",
    name: "GLM-4.7",
    creator: "z-ai",
    family: "glm",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 200000,
    max_output_tokens: 128000,
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
    description: "Zet's GLM-4.7 available on Baseten.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "baseten",
      provider_model_id: "zai-org/GLM-4.7",
      input_per_mtok: 0.60,
      output_per_mtok: 2.20,
      status: "ga",
    },
  ],
};
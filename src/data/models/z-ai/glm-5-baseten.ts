import type { ModelEntry } from "@/data/schema";

export const glm5Baseten: ModelEntry = {
  model: {
    id: "glm-5-baseten",
    name: "GLM-5",
    creator: "z-ai",
    family: "glm",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 200000,
    max_output_tokens: 128000,
    is_open_source: true,
    release_date: "2026-02-12",
    reasoning: true,
    temperature: true,
    knowledge: "2026-01",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      structured_output: true,
      prompt_caching: true,
    },
    description: "Zet's GLM-5 available on Baseten.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "baseten",
      provider_model_id: "zai-org/GLM-5",
      input_per_mtok: 0.95,
      output_per_mtok: 3.15,
      status: "ga",
    },
  ],
};
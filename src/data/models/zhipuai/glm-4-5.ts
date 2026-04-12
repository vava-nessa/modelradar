import type { ModelEntry } from "@/data/schema";

export const glm45: ModelEntry = {
  model: {
    id: "glm-4-5",
    name: "GLM-4.5",
    creator: "zhipuai",
    family: "glm",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 98304,
    is_open_source: true,
    release_date: "2025-07-28",
    last_updated: "2025-07-28",
    knowledge: "2025-04",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    cost: {
      input: 0,
      output: 0,
    },
    tags: ["reasoning", "coding"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "modelscope",
      provider_model_id: "ZhipuAI/GLM-4.5",
      input_per_mtok: 0,
      output_per_mtok: 0,
      status: "ga",
      available_since: "2025-07-28",
    },
  ],
};

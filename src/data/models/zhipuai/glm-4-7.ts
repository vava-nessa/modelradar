import type { ModelEntry } from "@/data/schema";

export const glm_4_7: ModelEntry = {
  model: {
    id: "glm-4-7",
    name: "GLM-4.7",
    creator: "zhipuai",
    family: "glm-4",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 204800,
    max_output_tokens: 131072,
    is_open_source: true,
    knowledge: "2025-04",
    release_date: "2025-12-22",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Zhipu AI's GLM-4.7 frontier model with 200K context and strong reasoning via chain-of-thought.",
    url: "https://open.bigmodel.cn",
    supportedOn: ["api", "local"],
    cost: { input: 3.5, output: 14 },
  },
  offers: [
    {
      provider_id: "moark",
      provider_model_id: "GLM-4.7",
      input_per_mtok: 3.5,
      output_per_mtok: 14,
      status: "ga",
      available_since: "2025-12-22",
    },
  ],
};
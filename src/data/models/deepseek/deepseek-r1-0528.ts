import type { ModelEntry } from "@/data/schema";

export const deepseekR1_0528: ModelEntry = {
  model: {
    id: "deepseek-r1-0528",
    name: "DeepSeek R1 0528",
    creator: "deepseek",
    family: "deepseek-thinking",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 16384,
    is_open_source: false,
    knowledge: "2024-07",
    release_date: "2025-05-28",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "DeepSeek R1 version 0528 with 131K context and improved reasoning capabilities.",
    url: "https://deepseek.com",
    supportedOn: ["api"],
    cost: { input: 0.574, output: 2.294 },
  },
  offers: [
    {
      provider_id: "alibaba-cn",
      provider_model_id: "deepseek-r1-0528",
      input_per_mtok: 0.574,
      output_per_mtok: 2.294,
      status: "ga",
      available_since: "2025-05-28",
    },
  ],
};
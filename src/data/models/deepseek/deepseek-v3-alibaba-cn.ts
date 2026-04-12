import type { ModelEntry } from "@/data/schema";

export const deepseekV3_alibaba_cn: ModelEntry = {
  model: {
    id: "deepseek-v3-alibaba-cn",
    name: "DeepSeek V3",
    creator: "deepseek",
    family: "deepseek",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 65536,
    max_output_tokens: 8192,
    is_open_source: false,
    knowledge: "2024-12",
    release_date: "2024-12-01",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "DeepSeek V3 via Alibaba Cloud China with strong performance at competitive pricing.",
    url: "https://deepseek.com",
    supportedOn: ["api"],
    cost: { input: 0.287, output: 1.147 },
  },
  offers: [
    {
      provider_id: "alibaba-cn",
      provider_model_id: "deepseek-v3",
      input_per_mtok: 0.287,
      output_per_mtok: 1.147,
      context_window: 65536,
      status: "ga",
      available_since: "2024-12-01",
    },
  ],
};
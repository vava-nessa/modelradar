import type { ModelEntry } from "@/data/schema";

export const kimi_k2_instruct_cortecs: ModelEntry = {
  model: {
    id: "kimi-k2-instruct-cortecs",
    name: "Kimi K2 Instruct",
    creator: "moonshotai",
    family: "kimi",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131000,
    max_output_tokens: 131000,
    is_open_source: true,
    knowledge: "2024-07",
    release_date: "2025-07-11",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Moonshot AI's Kimi K2 model with 131K context and strong instruction following.",
    url: "https://platform.moonshot.cn",
    supportedOn: ["api"],
    cost: { input: 0.551, output: 2.646 },
  },
  offers: [
    {
      provider_id: "cortecs",
      provider_model_id: "kimi-k2-instruct",
      input_per_mtok: 0.551,
      output_per_mtok: 2.646,
      status: "ga",
      available_since: "2025-07-11",
    },
  ],
};
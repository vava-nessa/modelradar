import type { ModelEntry } from "@/data/schema";

export const qwen3_14b_alibaba: ModelEntry = {
  model: {
    id: "qwen3-14b-alibaba",
    name: "Qwen3 14B",
    creator: "qwen",
    family: "qwen",
    category: "small",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 8192,
    is_open_source: true,
    knowledge: "2025-04",
    release_date: "2025-04-01",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Alibaba's Qwen3 14B model balanced between performance and efficiency.",
    url: "https://qwenlm.github.io",
    supportedOn: ["api", "local"],
    cost: { input: 0.35, output: 1.4 },
  },
  offers: [
    {
      provider_id: "alibaba",
      provider_model_id: "qwen3-14b",
      input_per_mtok: 0.35,
      output_per_mtok: 1.4,
      status: "ga",
      available_since: "2025-04-01",
    },
  ],
};
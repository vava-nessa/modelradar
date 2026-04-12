import type { ModelEntry } from "@/data/schema";

export const qwen_qwq_32b: ModelEntry = {
  model: {
    id: "qwen-qwq-32b",
    name: "QwQ 32B",
    creator: "qwen",
    family: "qwen",
    category: "reasoning",
    status: "deprecated",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 16384,
    is_open_source: true,
    knowledge: "2024-09",
    release_date: "2024-11-27",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Alibaba's QwQ 32B reasoning model with chain-of-thought capabilities. Deprecated in favor of Qwen3 with thinking mode.",
    url: "https://qwenlm.github.io",
    supportedOn: ["api", "local"],
    cost: { input: 0.29, output: 0.39 },
  },
  offers: [
    {
      provider_id: "groq",
      provider_model_id: "qwen-qwq-32b",
      input_per_mtok: 0.29,
      output_per_mtok: 0.39,
      status: "deprecated",
      available_since: "2024-11-27",
    },
  ],
};
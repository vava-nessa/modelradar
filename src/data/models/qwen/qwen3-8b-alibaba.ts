import type { ModelEntry } from "@/data/schema";

export const qwen3_8b_alibaba: ModelEntry = {
  model: {
    id: "qwen3-8b-alibaba",
    name: "Qwen3 8B",
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
      "Alibaba's compact Qwen3 8B model optimized for efficient inference with strong reasoning.",
    url: "https://qwenlm.github.io",
    supportedOn: ["api", "local"],
    cost: { input: 0.18, output: 0.7 },
  },
  offers: [
    {
      provider_id: "alibaba",
      provider_model_id: "qwen3-8b",
      input_per_mtok: 0.18,
      output_per_mtok: 0.7,
      status: "ga",
      available_since: "2025-04-01",
    },
  ],
};
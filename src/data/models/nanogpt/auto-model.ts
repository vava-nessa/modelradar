import type { ModelEntry } from "@/data/schema";

export const auto_model: ModelEntry = {
  model: {
    id: "auto-model",
    name: "Auto Model",
    creator: "nanogpt",
    family: "auto-model",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 1000000,
    max_output_tokens: 1000000,
    is_open_source: false,
    release_date: "2024-06-01",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: false,
      system_prompt: true,
      vision: false,
    },
    description:
      "Auto-select model with 1M context window. Free tier for text processing.",
    url: "https://nano-gpt.ai",
    supportedOn: ["api"],
    cost: { input: 0, output: 0 },
  },
  offers: [
    {
      provider_id: "nano-gpt",
      provider_model_id: "auto-model",
      input_per_mtok: 0,
      output_per_mtok: 0,
      status: "ga",
      available_since: "2024-06-01",
    },
  ],
};
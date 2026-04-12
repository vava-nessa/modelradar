import type { ModelEntry } from "@/data/schema";

export const auto_model_basic: ModelEntry = {
  model: {
    id: "auto-model-basic",
    name: "Auto Model (Basic)",
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
      "Auto-select model (Basic tier) with 1M context window for diverse text processing.",
    url: "https://nano-gpt.ai",
    supportedOn: ["api"],
    cost: { input: 9.996, output: 19.992 },
  },
  offers: [
    {
      provider_id: "nano-gpt",
      provider_model_id: "auto-model-basic",
      input_per_mtok: 9.996,
      output_per_mtok: 19.992,
      status: "ga",
      available_since: "2024-06-01",
    },
  ],
};
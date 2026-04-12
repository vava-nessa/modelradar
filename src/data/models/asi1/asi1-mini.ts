import type { ModelEntry } from "@/data/schema";

export const asi1_mini: ModelEntry = {
  model: {
    id: "asi1-mini",
    name: "ASI1 Mini",
    creator: "asi1",
    family: "asi1",
    category: "small",
    status: "active",
    modality_input: ["text", "pdf"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 16384,
    is_open_source: false,
    release_date: "2025-03-25",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: false,
      system_prompt: true,
      vision: false,
    },
    description:
      "ASI1 Mini is a compact model with PDF support, designed for efficient text processing.",
    url: "https://asi1.ai",
    supportedOn: ["api"],
    cost: { input: 1, output: 1 },
  },
  offers: [
    {
      provider_id: "nano-gpt",
      provider_model_id: "asi1-mini",
      input_per_mtok: 1,
      output_per_mtok: 1,
      status: "ga",
      available_since: "2025-03-25",
    },
  ],
};
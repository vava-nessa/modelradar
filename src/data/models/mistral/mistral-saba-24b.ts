import type { ModelEntry } from "@/data/schema";

export const mistral_saba_24b: ModelEntry = {
  model: {
    id: "mistral-saba-24b",
    name: "Mistral Saba 24B",
    creator: "mistral",
    family: "mistral",
    category: "mid",
    status: "deprecated",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 32768,
    max_output_tokens: 32768,
    is_open_source: false,
    knowledge: "2024-08",
    release_date: "2025-02-06",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Mistral's Saba model specialized for Middle East and Arabic language tasks. Deprecated.",
    url: "https://mistral.ai",
    supportedOn: ["api"],
    cost: { input: 0.79, output: 0.79 },
  },
  offers: [
    {
      provider_id: "groq",
      provider_model_id: "mistral-saba-24b",
      input_per_mtok: 0.79,
      output_per_mtok: 0.79,
      status: "deprecated",
      available_since: "2025-02-06",
    },
  ],
};
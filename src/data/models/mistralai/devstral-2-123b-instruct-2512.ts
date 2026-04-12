import type { ModelEntry } from "@/data/schema";

export const devstral2123bInstruct2512: ModelEntry = {
  model: {
    id: "devstral-2-123b-instruct-2512",
    name: "Devstral 2 123B Instruct 2512",
    creator: "mistralai",
    family: "devstral",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 262144,
    is_open_source: true,
    release_date: "2025-12-08",
    reasoning: true,
    temperature: true,
    knowledge: "2025-12",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      structured_output: true,
      prompt_caching: true,
    },
    description: "Mistral's Devstral 2 123B - a code-specialized model with reasoning.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "mistralai/devstral-2-123b-instruct-2512",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
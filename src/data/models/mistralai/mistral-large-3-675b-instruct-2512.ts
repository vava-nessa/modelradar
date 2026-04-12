import type { ModelEntry } from "@/data/schema";

export const mistralLarge3675bInstruct2512: ModelEntry = {
  model: {
    id: "mistral-large-3-675b-instruct-2512",
    name: "Mistral Large 3 675B Instruct 2512",
    creator: "mistralai",
    family: "mistral-large",
    category: "flagship",
    status: "active",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 262144,
    is_open_source: true,
    release_date: "2025-12-02",
    temperature: true,
    knowledge: "2025-01",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
      structured_output: true,
      prompt_caching: true,
    },
    description: "Mistral's largest flagship model - Mistral Large 3 675B.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "mistralai/mistral-large-3-675b-instruct-2512",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
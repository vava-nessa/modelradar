import type { ModelEntry } from "@/data/schema";

export const ministral14bInstruct2512: ModelEntry = {
  model: {
    id: "ministral-14b-instruct-2512",
    name: "Ministral 14B Instruct 2512",
    creator: "mistralai",
    family: "ministral",
    category: "mid",
    status: "active",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 262144,
    is_open_source: true,
    release_date: "2025-12-01",
    temperature: true,
    knowledge: "2025-12",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
      structured_output: true,
    },
    description: "Mistral's Ministral 14B instruction model with multimodal support.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "mistralai/ministral-14b-instruct-2512",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
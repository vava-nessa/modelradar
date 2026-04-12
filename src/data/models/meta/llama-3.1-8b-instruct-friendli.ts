import type { ModelEntry } from "@/data/schema";

export const llama31_8bInstructFriendli: ModelEntry = {
  model: {
    id: "llama-3.1-8b-instruct-friendli",
    name: "Llama 3.1 8B Instruct",
    creator: "meta",
    family: "llama",
    category: "small",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 8000,
    is_open_source: true,
    license: "llama-3.1",
    release_date: "2024-08-01",
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      structured_output: true,
    },
    description: "Meta's Llama 3.1 8B instruction model - efficient for lightweight tasks.",
    supportedOn: ["api", "local"],
  },
  offers: [
    {
      provider_id: "friendli",
      provider_model_id: "meta-llama/Llama-3.1-8B-Instruct",
      input_per_mtok: 0.1,
      output_per_mtok: 0.1,
      status: "ga",
    },
  ],
};
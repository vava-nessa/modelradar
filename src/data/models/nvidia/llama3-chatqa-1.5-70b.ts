import type { ModelEntry } from "@/data/schema";

export const llama3Chatqa15_70b: ModelEntry = {
  model: {
    id: "llama3-chatqa-1.5-70b",
    name: "Llama3 ChatQA 1.5 70B",
    creator: "nvidia",
    family: "llama",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2024-01-01",
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    description: "NVIDIA's Llama3-based ChatQA 1.5 70B model for conversational AI.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "nvidia/llama3-chatqa-1.5-70b",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
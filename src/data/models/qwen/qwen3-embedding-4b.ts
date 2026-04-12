import type { ModelEntry } from "@/data/schema";

export const qwen3Embedding4b: ModelEntry = {
  model: {
    id: "qwen3-embedding-4b",
    name: "Qwen3 Embedding 4B",
    creator: "qwen",
    family: "qwen",
    category: "small",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 32000,
    max_output_tokens: 2560,
    is_open_source: true,
    release_date: "2025-06-06",
    temperature: true,
    knowledge: "2025-06",
    capabilities: {
      streaming: false,
      function_calling: false,
      vision: false,
    },
    description: "Qwen's 4B parameter embedding model for text similarity tasks.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "privatemode-ai",
      provider_model_id: "qwen3-embedding-4b",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
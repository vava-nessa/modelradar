import type { ModelEntry } from "@/data/schema";

export const llamaEmbedNemotron8b: ModelEntry = {
  model: {
    id: "llama-embed-nemotron-8b",
    name: "Llama Embed Nemotron 8B",
    creator: "nvidia",
    family: "llama",
    category: "small",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 32768,
    max_output_tokens: 2048,
    is_open_source: false,
    release_date: "2025-03-18",
    temperature: false,
    capabilities: {
      streaming: false,
      function_calling: false,
      vision: false,
    },
    description: "NVIDIA's Llama-based embedding model with Nemotron optimization.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "nvidia/llama-embed-nemotron-8b",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const llama31NemotronUltra253bV1: ModelEntry = {
  model: {
    id: "llama-3.1-nemotron-ultra-253b-v1",
    name: "Llama 3.1 Nemotron Ultra 253B V1",
    creator: "nvidia",
    family: "llama",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 8192,
    is_open_source: false,
    release_date: "2024-07-01",
    reasoning: true,
    temperature: true,
    knowledge: "2024-07",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "NVIDIA's Llama 3.1-based Nemotron Ultra 253B model with reasoning.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "nvidia/llama-3.1-nemotron-ultra-253b-v1",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};

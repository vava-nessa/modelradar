import type { ModelEntry } from "@/data/schema";

export const llama31Nemotron51bInstruct: ModelEntry = {
  model: {
    id: "llama-3.1-nemotron-51b-instruct",
    name: "Llama 3.1 Nemotron 51B Instruct",
    creator: "nvidia",
    family: "llama",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2024-09-22",
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      structured_output: true,
    },
    description: "NVIDIA's Llama 3.1-based Nemotron 51B instruction model.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "nvidia/llama-3.1-nemotron-51b-instruct",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};

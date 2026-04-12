import type { ModelEntry } from "@/data/schema";

export const llama4MaverickIonet: ModelEntry = {
  model: {
    id: "llama-4-maverick-17b-128e-instruct-fp8",
    name: "Llama 4 Maverick 17B 128E Instruct FP8",
    creator: "meta",
    family: "llama",
    category: "mid",
    status: "active",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 430000,
    max_output_tokens: 4096,
    is_open_source: true,
    release_date: "2025-01-15",
    temperature: true,
    knowledge: "2024-12",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
      structured_output: true,
      prompt_caching: true,
    },
    description: "Meta's Llama 4 Maverick with FP8 quantization on IO.net.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "io-net",
      provider_model_id: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
      input_per_mtok: 0.15,
      output_per_mtok: 0.6,
      cache_read_per_mtok: 0.075,
      cache_write_per_mtok: 0.3,
      status: "ga",
    },
  ],
};
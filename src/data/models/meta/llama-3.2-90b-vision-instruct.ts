import type { ModelEntry } from "@/data/schema";

export const llama32_90bVisionInstruct: ModelEntry = {
  model: {
    id: "llama-3.2-90b-vision-instruct",
    name: "Llama 3.2 90B Vision Instruct",
    creator: "meta",
    family: "llama",
    category: "flagship",
    status: "active",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 16000,
    max_output_tokens: 4096,
    is_open_source: true,
    release_date: "2024-09-25",
    temperature: true,
    knowledge: "2023-12",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
    },
    description: "Meta's Llama 3.2 90B Vision - large multimodal model.",
    supportedOn: ["api", "local"],
  },
  offers: [
    {
      provider_id: "io-net",
      provider_model_id: "meta-llama/Llama-3.2-90B-Vision-Instruct",
      input_per_mtok: 0.35,
      output_per_mtok: 0.4,
      cache_read_per_mtok: 0.175,
      cache_write_per_mtok: 0.7,
      status: "ga",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const llama33NemotronSuper49bV15: ModelEntry = {
  model: {
    id: "llama-3.3-nemotron-super-49b-v1.5",
    name: "Llama 3.3 Nemotron Super 49B V1.5",
    creator: "nvidia",
    family: "nemotron",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2025-03-16",
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: false,
      vision: false,
    },
    description: "NVIDIA's Llama 3.3-based Nemotron Super 49B model v1.5.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "meta/llama-3.3-nemotron-super-49b-v1.5",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
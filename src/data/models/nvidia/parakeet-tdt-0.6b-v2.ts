import type { ModelEntry } from "@/data/schema";

export const parakeetTdt06bV2: ModelEntry = {
  model: {
    id: "parakeet-tdt-0.6b-v2",
    name: "Parakeet TDT 0.6B v2",
    creator: "nvidia",
    family: "parakeet",
    category: "small",
    status: "active",
    modality_input: ["audio"],
    modality_output: ["text"],
    context_window: 0,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2024-01-01",
    temperature: false,
    knowledge: "2024-01",
    capabilities: {
      streaming: true,
      function_calling: false,
      vision: false,
    },
    description: "NVIDIA's Parakeet TDT speech-to-text model v2.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "nvidia/parakeet-tdt-0.6b-v2",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
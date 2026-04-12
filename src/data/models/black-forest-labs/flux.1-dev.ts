import type { ModelEntry } from "@/data/schema";

export const flux1Dev: ModelEntry = {
  model: {
    id: "flux.1-dev",
    name: "FLUX.1-dev",
    creator: "black-forest-labs",
    family: "flux",
    category: "small",
    status: "active",
    modality_input: ["text"],
    modality_output: ["image"],
    context_window: 4096,
    max_output_tokens: 0,
    is_open_source: false,
    release_date: "2024-08-01",
    temperature: true,
    knowledge: "2024-08",
    capabilities: {
      streaming: false,
      function_calling: false,
      vision: false,
    },
    description: "Black Forest Labs' FLUX.1-dev image generation model.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "black-forest-labs/flux.1-dev",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
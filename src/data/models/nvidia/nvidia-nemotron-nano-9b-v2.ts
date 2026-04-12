import type { ModelEntry } from "@/data/schema";

export const nvidiaNemotronNano9bV2: ModelEntry = {
  model: {
    id: "nvidia-nemotron-nano-9b-v2",
    name: "NVIDIA Nemotron Nano 9B V2",
    creator: "nvidia",
    family: "nemotron",
    category: "small",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 131072,
    is_open_source: true,
    release_date: "2025-08-18",
    reasoning: true,
    temperature: true,
    knowledge: "2024-09",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "NVIDIA's efficient Nemotron Nano 9B model v2 for lightweight inference.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "nvidia/nemotron-nano-9b-v2",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};

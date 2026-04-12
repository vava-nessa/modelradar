import type { ModelEntry } from "@/data/schema";

export const nemotron3Nano30bA3b: ModelEntry = {
  model: {
    id: "nemotron-3-nano-30b-a3b",
    name: "Nemotron 3 Nano 30B A3B",
    creator: "nvidia",
    family: "nemotron",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 131072,
    is_open_source: true,
    release_date: "2024-12",
    reasoning: true,
    temperature: true,
    knowledge: "2024-09",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "NVIDIA's compact Nemotron 3 Nano 30B model with aggressive quantization.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "nvidia/nemotron-3-nano-30b-a3b",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};

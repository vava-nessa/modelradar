import type { ModelEntry } from "@/data/schema";

export const nemotron3Super120bA12b: ModelEntry = {
  model: {
    id: "nemotron-3-super-120b-a12b",
    name: "Nemotron 3 Super 120B A12B",
    creator: "nvidia",
    family: "nemotron",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 262144,
    is_open_source: true,
    release_date: "2026-03-11",
    reasoning: true,
    temperature: true,
    knowledge: "2024-04",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "NVIDIA's Nemotron 3 Super 120B model with reasoning capabilities.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "nvidia/nemotron-3-super-120b-a12b",
      input_per_mtok: 0.20,
      output_per_mtok: 0.80,
      status: "ga",
      available_since: "2026-03-11",
    },
  ],
};

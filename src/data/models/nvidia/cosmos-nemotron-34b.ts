import type { ModelEntry } from "@/data/schema";

export const cosmosNemotron34b: ModelEntry = {
  model: {
    id: "cosmos-nemotron-34b",
    name: "Cosmos Nemotron 34B",
    creator: "nvidia",
    family: "nemotron",
    category: "mid",
    status: "active",
    modality_input: ["text", "image", "video"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 8192,
    is_open_source: false,
    release_date: "2024-01-01",
    reasoning: true,
    temperature: true,
    knowledge: "2024-01",
    capabilities: {
      streaming: true,
      function_calling: false,
      vision: true,
    },
    description: "NVIDIA's Cosmos Nemotron 34B model for video understanding.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "nvidia/cosmos-nemotron-34b",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};

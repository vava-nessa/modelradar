import type { ModelEntry } from "@/data/schema";

export const nemotron4_340bInstruct: ModelEntry = {
  model: {
    id: "nemotron-4-340b-instruct",
    name: "Nemotron 4 340B Instruct",
    creator: "nvidia",
    family: "nemotron",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2024-06-13",
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      json_mode: true,
      json_schema: true,
      system_prompt: true,
      vision: false,
      structured_output: true,
    },
    description: "NVIDIA's Nemotron 4 340B instruction-following model.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "nvidia/nemotron-4-340b-instruct",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
      available_since: "2024-06-13",
    },
  ],
};

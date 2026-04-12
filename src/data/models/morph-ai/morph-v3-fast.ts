import type { ModelEntry } from "@/data/schema";

export const morph_v3_fast: ModelEntry = {
  model: {
    id: "morph-v3-fast",
    name: "Morph v3 Fast",
    creator: "morph-ai",
    family: "morph",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 16000,
    max_output_tokens: 16000,
    is_open_source: false,
    release_date: "2024-08-15",
    reasoning: false,
    temperature: false,
    capabilities: {
      streaming: false,
      function_calling: false,
      system_prompt: true,
      vision: false,
    },
    description:
      "Morph v3 Fast is an efficient text processing model optimized for speed.",
    url: "https://morph.ai",
    supportedOn: ["api"],
    cost: { input: 0.8, output: 1.2 },
  },
  offers: [
    {
      provider_id: "morph",
      provider_model_id: "morph-v3-fast",
      input_per_mtok: 0.8,
      output_per_mtok: 1.2,
      status: "ga",
      available_since: "2024-08-15",
    },
  ],
};
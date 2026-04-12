import type { ModelEntry } from "@/data/schema";

export const morph_v3_large: ModelEntry = {
  model: {
    id: "morph-v3-large",
    name: "Morph v3 Large",
    creator: "morph-ai",
    family: "morph",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 32000,
    max_output_tokens: 32000,
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
      "Morph v3 Large offers larger context window for more complex text processing tasks.",
    url: "https://morph.ai",
    supportedOn: ["api"],
    cost: { input: 0.9, output: 1.9 },
  },
  offers: [
    {
      provider_id: "morph",
      provider_model_id: "morph-v3-large",
      input_per_mtok: 0.9,
      output_per_mtok: 1.9,
      status: "ga",
      available_since: "2024-08-15",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const devstral_2512: ModelEntry = {
  model: {
    id: "devstral-2512",
    name: "Devstral 2 2512",
    creator: "devstral",
    family: "devstral",
    category: "code",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262000,
    max_output_tokens: 262000,
    is_open_source: true,
    knowledge: "2025-12",
    release_date: "2025-12-09",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Devstral 2 is an open-source code generation model optimized for long context coding tasks with up to 262K context.",
    url: "https://devstral.ai",
    supportedOn: ["api", "local"],
    cost: { input: 0, output: 0 },
  },
  offers: [
    {
      provider_id: "cortecs",
      provider_model_id: "devstral-2512",
      input_per_mtok: 0,
      output_per_mtok: 0,
      status: "ga",
      available_since: "2025-12-09",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const devstral_small_2512: ModelEntry = {
  model: {
    id: "devstral-small-2512",
    name: "Devstral Small 2 2512",
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
      "Devstral Small 2 is a compact open-source code generation model with long context support.",
    url: "https://devstral.ai",
    supportedOn: ["api", "local"],
    cost: { input: 0, output: 0 },
  },
  offers: [
    {
      provider_id: "cortecs",
      provider_model_id: "devstral-small-2512",
      input_per_mtok: 0,
      output_per_mtok: 0,
      status: "ga",
      available_since: "2025-12-09",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const allam_2_7b: ModelEntry = {
  model: {
    id: "allam-2-7b",
    name: "ALLaM-2-7B",
    creator: "allam",
    family: "allam",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 4096,
    max_output_tokens: 4096,
    is_open_source: false,
    knowledge: "2024-09",
    release_date: "2024-09-01",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: false,
      system_prompt: true,
      vision: false,
    },
    description:
      "ALLaM-2-7B is an Arabic-focused large language model. Available free of charge.",
    url: "https://allam.ai",
    supportedOn: ["api"],
    cost: { input: 0, output: 0 },
  },
  offers: [
    {
      provider_id: "groq",
      provider_model_id: "allam-2-7b",
      input_per_mtok: 0,
      output_per_mtok: 0,
      status: "ga",
      available_since: "2024-09-01",
    },
  ],
};
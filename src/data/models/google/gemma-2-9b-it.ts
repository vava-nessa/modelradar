import type { ModelEntry } from "@/data/schema";

export const gemma2_9b_it: ModelEntry = {
  model: {
    id: "gemma-2-9b-it",
    name: "Gemma 2 9B",
    creator: "google",
    family: "gemma-2",
    category: "small",
    status: "deprecated",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 8192,
    max_output_tokens: 8192,
    is_open_source: true,
    knowledge: "2024-06",
    release_date: "2024-06-27",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Google's Gemma 2 9B instruction-tuned model. Deprecated in favor of Gemma 3.",
    url: "https://ai.google.dev/gemma",
    supportedOn: ["api", "local"],
    cost: { input: 0.2, output: 0.2 },
  },
  offers: [
    {
      provider_id: "groq",
      provider_model_id: "gemma2-9b-it",
      input_per_mtok: 0.2,
      output_per_mtok: 0.2,
      status: "deprecated",
      available_since: "2024-06-27",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const llama_guard_3_8b: ModelEntry = {
  model: {
    id: "llama-guard-3-8b",
    name: "Llama Guard 3 8B",
    creator: "meta",
    family: "llama-guard",
    category: "small",
    status: "deprecated",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 8192,
    max_output_tokens: 8192,
    is_open_source: true,
    knowledge: "2023-07",
    release_date: "2024-07-23",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: false,
      system_prompt: true,
      vision: false,
    },
    description:
      "Meta's Llama Guard 3 safety model for content moderation. Deprecated.",
    url: "https://llama.meta.com",
    supportedOn: ["api", "local"],
    cost: { input: 0.2, output: 0.2 },
  },
  offers: [
    {
      provider_id: "groq",
      provider_model_id: "llama-guard-3-8b",
      input_per_mtok: 0.2,
      output_per_mtok: 0.2,
      status: "deprecated",
      available_since: "2024-07-23",
    },
  ],
};
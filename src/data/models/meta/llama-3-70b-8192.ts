import type { ModelEntry } from "@/data/schema";

export const llama3_70b_8192: ModelEntry = {
  model: {
    id: "llama-3-70b-8192",
    name: "Llama 3 70B",
    creator: "meta",
    family: "llama",
    category: "mid",
    status: "deprecated",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 8192,
    max_output_tokens: 8192,
    is_open_source: true,
    knowledge: "2023-03",
    release_date: "2024-04-18",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Meta's Llama 3 70B model with 8K context window. Deprecated in favor of Llama 3.3.",
    url: "https://llama.meta.com",
    supportedOn: ["api", "local"],
    cost: { input: 0.59, output: 0.79 },
  },
  offers: [
    {
      provider_id: "groq",
      provider_model_id: "llama3-70b-8192",
      input_per_mtok: 0.59,
      output_per_mtok: 0.79,
      status: "deprecated",
      available_since: "2024-04-18",
    },
  ],
};
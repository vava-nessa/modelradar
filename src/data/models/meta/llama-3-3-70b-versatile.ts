import type { ModelEntry } from "@/data/schema";

export const llama33_70b_versatile: ModelEntry = {
  model: {
    id: "llama-3-3-70b-versatile",
    name: "Llama 3.3 70B Versatile",
    creator: "meta",
    family: "llama",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 32768,
    is_open_source: true,
    knowledge: "2023-12",
    release_date: "2024-12-06",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Meta's open-weight Llama 3.3 70B model with strong all-around performance at competitive pricing.",
    url: "https://llama.meta.com",
    supportedOn: ["api", "local"],
    cost: { input: 0.59, output: 0.79 },
  },
  offers: [
    {
      provider_id: "groq",
      provider_model_id: "llama-3.3-70b-versatile",
      input_per_mtok: 0.59,
      output_per_mtok: 0.79,
      status: "ga",
      available_since: "2024-12-06",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const llama31_8b_instant: ModelEntry = {
  model: {
    id: "llama-3-1-8b-instant",
    name: "Llama 3.1 8B Instant",
    creator: "meta",
    family: "llama",
    category: "small",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 131072,
    is_open_source: true,
    knowledge: "2023-12",
    release_date: "2024-07-23",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Meta's open-weight Llama 3.1 8B model optimized for fast, cost-effective inference.",
    url: "https://llama.meta.com",
    supportedOn: ["api", "local"],
    cost: { input: 0.05, output: 0.08 },
  },
  offers: [
    {
      provider_id: "groq",
      provider_model_id: "llama-3.1-8b-instant",
      input_per_mtok: 0.05,
      output_per_mtok: 0.08,
      status: "ga",
      available_since: "2024-07-23",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const sonarPro: ModelEntry = {
  model: {
    id: "sonar-pro",
    name: "Sonar Pro",
    creator: "perplexity",
    family: "sonar-pro",
    category: "flagship",
    status: "active",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 200000,
    max_output_tokens: 8192,
    is_open_source: false,
    release_date: "2024-01-01",
    last_updated: "2025-09-01",
    knowledge: "2025-09-01",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
      citations: true,
    },
    description:
      "Perplexity's most capable Sonar model with vision support and real-time web search for factually accurate answers.",
    supportedOn: ["api"],
    cost: { input: 3, output: 15 },
  },
  offers: [
    {
      provider_id: "perplexity",
      provider_model_id: "sonar-pro",
      input_per_mtok: 3.0,
      output_per_mtok: 15.0,
      status: "ga",
    },
    {
      provider_id: "helicone",
      provider_model_id: "sonar-pro",
      input_per_mtok: 3,
      output_per_mtok: 15,
      status: "ga",
      available_since: "2025-01-27",
    },
  ],
};
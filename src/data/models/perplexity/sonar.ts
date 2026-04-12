import type { ModelEntry } from "@/data/schema";

export const sonar: ModelEntry = {
  model: {
    id: "sonar",
    name: "Sonar",
    creator: "perplexity",
    family: "sonar",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2024-01-01",
    last_updated: "2025-09-01",
    knowledge: "2025-09-01",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      citations: true,
    },
    description:
      "Perplexity's base Sonar model optimized for real-time web search and natural language responses with citations.",
    supportedOn: ["api"],
    cost: { input: 1, output: 1 },
  },
  offers: [
    {
      provider_id: "perplexity",
      provider_model_id: "sonar",
      input_per_mtok: 1.0,
      output_per_mtok: 1.0,
      status: "ga",
    },
    {
      provider_id: "helicone",
      provider_model_id: "sonar",
      input_per_mtok: 1,
      output_per_mtok: 1,
      status: "ga",
      available_since: "2025-01-27",
    },
  ],
};
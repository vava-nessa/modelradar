import type { ModelEntry } from "@/data/schema";

export const sonarReasoningPro: ModelEntry = {
  model: {
    id: "sonar-reasoning-pro",
    name: "Sonar Reasoning Pro",
    creator: "perplexity",
    family: "sonar-reasoning",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 127000,
    max_output_tokens: 8000,
    is_open_source: false,
    release_date: "2025-02-19",
    last_updated: "2025-02-19",
    knowledge: "2025-09-01",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: false,
      vision: false,
    },
    description:
      "Perplexity's advanced reasoning model with deeper chain-of-thought capabilities and web search integration.",
    supportedOn: ["api"],
    cost: { input: 2, output: 8 },
  },
  offers: [
    {
      provider_id: "perplexity",
      provider_model_id: "sonar-reasoning-pro",
      input_per_mtok: 2.0,
      output_per_mtok: 8.0,
      status: "ga",
    },
  ],
};
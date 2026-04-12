import type { ModelEntry } from "@/data/schema";

export const sonarReasoning: ModelEntry = {
  model: {
    id: "sonar-reasoning",
    name: "Sonar Reasoning",
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
    },
    description:
      "Perplexity's reasoning model optimized for chain-of-thought tasks with real-time web search integration.",
    supportedOn: ["api"],
    cost: { input: 1, output: 5 },
  },
  offers: [
    {
      provider_id: "perplexity",
      provider_model_id: "sonar-reasoning",
      input_per_mtok: 1.0,
      output_per_mtok: 5.0,
      status: "ga",
    },
  ],
};
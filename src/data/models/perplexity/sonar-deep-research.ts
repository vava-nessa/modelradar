import type { ModelEntry } from "@/data/schema";

export const sonarDeepResearch: ModelEntry = {
  model: {
    id: "sonar-deep-research",
    name: "Sonar Deep Research",
    creator: "perplexity",
    family: "sonar-deep-research",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 32768,
    is_open_source: false,
    release_date: "2025-02-01",
    last_updated: "2025-09-01",
    knowledge: "2025-01-01",
    reasoning: true,
    temperature: false,
    capabilities: {
      streaming: true,
      citations: true,
    },
    description:
      "Perplexity's deep research model optimized for comprehensive web research and long-form analytical outputs.",
    supportedOn: ["api"],
    cost: { input: 2, output: 8 },
  },
  offers: [
    {
      provider_id: "perplexity",
      provider_model_id: "sonar-deep-research",
      input_per_mtok: 2.0,
      output_per_mtok: 8.0,
      status: "ga",
    },
  ],
};
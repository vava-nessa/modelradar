import type { ModelEntry } from "@/data/schema";

export const minimaxM25Friendli: ModelEntry = {
  model: {
    id: "minimax-m2.5-friendli",
    name: "MiniMax-M2.5",
    creator: "minimaxai",
    family: "minimax",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 204000,
    max_output_tokens: 204000,
    is_open_source: true,
    release_date: "2026-02-12",
    reasoning: true,
    temperature: true,
    knowledge: "2026-01",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "MiniMax's M2.5 model - available on Friendli.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "friendli",
      provider_model_id: "MiniMaxAI/MiniMax-M2.5",
      input_per_mtok: 0.3,
      output_per_mtok: 1.2,
      status: "ga",
    },
  ],
};
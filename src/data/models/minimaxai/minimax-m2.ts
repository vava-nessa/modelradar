import type { ModelEntry } from "@/data/schema";

export const minimaxM2: ModelEntry = {
  model: {
    id: "minimax-m2",
    name: "MiniMax-M2",
    creator: "minimaxai",
    family: "minimax",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 196608,
    max_output_tokens: 128000,
    is_open_source: true,
    release_date: "2025-10-27",
    last_updated: "2025-10-27",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    cost: {
      input: 0.3,
      output: 1.2,
    },
    tags: ["reasoning", "coding"],
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "minimax",
      provider_model_id: "MiniMax-M2",
      input_per_mtok: 0.3,
      output_per_mtok: 1.2,
      status: "ga",
      available_since: "2025-10-27",
    },
  ],
};

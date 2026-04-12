import type { ModelEntry } from "@/data/schema";

export const qwen330BA3BThinking2507: ModelEntry = {
  model: {
    id: "qwen3-30b-a3b-thinking-2507",
    name: "Qwen3 30B A3B Thinking 2507",
    creator: "qwen",
    family: "qwen",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 32768,
    is_open_source: true,
    release_date: "2025-07-30",
    last_updated: "2025-07-30",
    knowledge: "2025-04",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    description: "Qwen3 thinking model with 30B parameters and A3B architecture for advanced reasoning.",
    tags: ["reasoning", "coding"],
    supportedOn: ["api"],
    cost: {
      input: 0,
      output: 0,
    },
  },
  offers: [
    {
      provider_id: "modelscope",
      provider_model_id: "Qwen/Qwen3-30B-A3B-Thinking-2507",
      input_per_mtok: 0,
      output_per_mtok: 0,
      status: "ga",
      available_since: "2025-07-30",
    },
  ],
};

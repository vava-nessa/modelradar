import type { ModelEntry } from "@/data/schema";

export const qwen3235BA22BInstruct2507: ModelEntry = {
  model: {
    id: "qwen3-235b-a22b-instruct-2507",
    name: "Qwen3 235B A22B Instruct 2507",
    creator: "qwen",
    family: "qwen",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 131072,
    is_open_source: true,
    release_date: "2025-04-28",
    last_updated: "2025-07-21",
    knowledge: "2025-04",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    description: "Qwen3 large instruction-following model with 235B parameters and A22B architecture.",
    tags: ["coding"],
    supportedOn: ["api"],
    cost: {
      input: 0,
      output: 0,
    },
  },
  offers: [
    {
      provider_id: "modelscope",
      provider_model_id: "Qwen/Qwen3-235B-A22B-Instruct-2507",
      input_per_mtok: 0,
      output_per_mtok: 0,
      status: "ga",
      available_since: "2025-04-28",
    },
  ],
};

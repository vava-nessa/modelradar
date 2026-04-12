import type { ModelEntry } from "@/data/schema";

export const qwen330BA3BInstruct2507: ModelEntry = {
  model: {
    id: "qwen3-30b-a3b-instruct-2507",
    name: "Qwen3 30B A3B Instruct 2507",
    creator: "qwen",
    family: "qwen",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 16384,
    is_open_source: true,
    release_date: "2025-07-30",
    last_updated: "2025-07-30",
    knowledge: "2025-04",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    description: "Qwen3 instruction-following model with 30B parameters and A3B architecture.",
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
      provider_model_id: "Qwen/Qwen3-30B-A3B-Instruct-2507",
      input_per_mtok: 0,
      output_per_mtok: 0,
      status: "ga",
      available_since: "2025-07-30",
    },
  ],
};

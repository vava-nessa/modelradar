import type { ModelEntry } from "@/data/schema";

export const qwen3Coder30BA3BInstruct: ModelEntry = {
  model: {
    id: "qwen3-coder-30b-a3b-instruct",
    name: "Qwen3 Coder 30B A3B Instruct",
    creator: "qwen",
    family: "qwen",
    category: "code",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 65536,
    is_open_source: true,
    release_date: "2025-07-31",
    last_updated: "2025-07-31",
    knowledge: "2025-04",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    description: "Qwen3 Coder model with 30B parameters and A3B architecture for code generation and completion.",
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
      provider_model_id: "Qwen/Qwen3-Coder-30B-A3B-Instruct",
      input_per_mtok: 0,
      output_per_mtok: 0,
      status: "ga",
      available_since: "2025-07-31",
    },
  ],
};

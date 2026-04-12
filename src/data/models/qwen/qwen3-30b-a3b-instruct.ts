import type { ModelEntry } from "@/data/schema";

export const qwen330BA3BInstruct: ModelEntry = {
  model: {
    id: "qwen3-30b-a3b-instruct",
    name: "Qwen3 30B A3B Instruct",
    creator: "qwen",
    family: "qwen",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262000,
    max_output_tokens: 262000,
    is_open_source: true,
    license: "qwen3-community",
    parameters: "30B total (3B active)",
    architecture: "MoE",
    knowledge: "2025-04",
    release_date: "2025-07-29",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      json_mode: true,
      json_schema: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Qwen3 30B MoE model optimized for instruction following and conversational tasks.",
    url: "https://qwenlm.github.io",
    documentation_url: "https://qwenlm.github.io",
    tags: ["open-source", "MoE", "conversational"],
    supportedOn: ["api"],
    cost: { input: 0.2, output: 0.8 },
  },
  offers: [
    {
      provider_id: "openrouter",
      provider_model_id: "qwen/qwen3-30b-a3b-instruct-2507",
      input_per_mtok: 0.2,
      output_per_mtok: 0.8,
      status: "ga",
      available_since: "2025-07-29",
    },
  ],
};

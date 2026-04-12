import type { ModelEntry } from "@/data/schema";

export const qwen3_235b_a22b_alibaba: ModelEntry = {
  model: {
    id: "qwen3-235b-a22b-alibaba",
    name: "Qwen3 235B-A22B",
    creator: "qwen",
    family: "qwen",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 16384,
    is_open_source: true,
    knowledge: "2025-04",
    release_date: "2025-04-01",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "Alibaba's Qwen3 235B MoE model with 22B active parameters. Strong reasoning at competitive pricing.",
    url: "https://qwenlm.github.io",
    supportedOn: ["api", "local"],
    cost: { input: 0.7, output: 2.8 },
  },
  offers: [
    {
      provider_id: "alibaba",
      provider_model_id: "qwen3-235b-a22b",
      input_per_mtok: 0.7,
      output_per_mtok: 2.8,
      status: "ga",
      available_since: "2025-04-01",
    },
  ],
};
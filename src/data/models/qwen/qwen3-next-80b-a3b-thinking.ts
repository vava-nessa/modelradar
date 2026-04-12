import type { ModelEntry } from "@/data/schema";

export const qwen3Next80bA3bThinking: ModelEntry = {
  model: {
    id: "qwen3-next-80b-a3b-thinking",
    name: "Qwen3 Next 80B A3B Thinking",
    creator: "qwen",
    family: "qwen",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 16384,
    is_open_source: true,
    release_date: "2024-12-01",
    reasoning: true,
    temperature: true,
    knowledge: "2024-12",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "Qwen's thinking model variant of Qwen3 Next 80B with agentic capabilities.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "qwen/qwen3-next-80b-a3b-thinking",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const qwen35_397bA17b: ModelEntry = {
  model: {
    id: "qwen3.5-397b-a17b",
    name: "Qwen3.5 397B A17B",
    creator: "qwen",
    family: "qwen",
    category: "flagship",
    status: "active",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 262144,
    max_output_tokens: 8192,
    is_open_source: true,
    release_date: "2026-02-16",
    reasoning: true,
    temperature: true,
    knowledge: "2026-01",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
      structured_output: true,
      prompt_caching: true,
    },
    description: "Qwen's largest multimodal model - 397B with A17B architecture.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "qwen/qwen3.5-397b-a17b",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
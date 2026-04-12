import type { ModelEntry } from "@/data/schema";

export const deepseekV32: ModelEntry = {
  model: {
    id: "deepseek-v3.2",
    name: "DeepSeek V3.2",
    creator: "deepseek-ai",
    family: "deepseek",
    category: "flagship",
    status: "deprecated",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 163840,
    max_output_tokens: 65536,
    is_open_source: true,
    release_date: "2025-12-01",
    last_updated: "2026-03-06",
    reasoning: true,
    temperature: true,
    knowledge: "2025-10",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "DeepSeek V3.2 - a reasoning-optimized variant with large context.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "baseten",
      provider_model_id: "deepseek-ai/DeepSeek-V3.2",
      input_per_mtok: 0.30,
      output_per_mtok: 0.45,
      status: "deprecated",
    },
  ],
};
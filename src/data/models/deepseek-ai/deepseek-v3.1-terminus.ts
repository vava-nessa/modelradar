import type { ModelEntry } from "@/data/schema";

export const deepseekV31Terminus: ModelEntry = {
  model: {
    id: "deepseek-v3.1-terminus",
    name: "DeepSeek V3.1 Terminus",
    creator: "deepseek-ai",
    family: "deepseek",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 8192,
    is_open_source: false,
    release_date: "2025-09-22",
    reasoning: true,
    temperature: true,
    knowledge: "2025-01",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "DeepSeek V3.1 Terminus - a reasoning-optimized variant available on NVIDIA NIM.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "deepseek-ai/deepseek-v3.1-terminus",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
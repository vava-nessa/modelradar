import type { ModelEntry } from "@/data/schema";

export const deepseekR10528: ModelEntry = {
  model: {
    id: "deepseek-r1-0528",
    name: "DeepSeek R1 0528",
    creator: "deepseek-ai",
    family: "deepseek-thinking",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 4096,
    is_open_source: true,
    release_date: "2025-05-28",
    reasoning: true,
    temperature: true,
    knowledge: "2024-07",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      structured_output: true,
      prompt_caching: true,
    },
    description: "DeepSeek R1 variant with May 2025 knowledge cutoff.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "io-net",
      provider_model_id: "deepseek-ai/DeepSeek-R1-0528",
      input_per_mtok: 2.0,
      output_per_mtok: 8.75,
      cache_read_per_mtok: 1.0,
      cache_write_per_mtok: 4.0,
      status: "ga",
    },
  ],
};
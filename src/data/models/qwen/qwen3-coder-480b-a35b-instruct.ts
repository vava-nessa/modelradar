import type { ModelEntry } from "@/data/schema";

export const qwen3Coder480bA35b: ModelEntry = {
  model: {
    id: "qwen3-coder-480b-a35b-instruct",
    name: "Qwen3 Coder 480B A35B Instruct",
    creator: "qwen",
    family: "qwen",
    category: "code",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 106000,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2025-01-15",
    temperature: true,
    knowledge: "2024-12",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "Qwen's massive 480B code model with A35B architecture.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "io-net",
      provider_model_id: "Intel/Qwen3-Coder-480B-A35B-Instruct-int4-mixed-ar",
      input_per_mtok: 0.22,
      output_per_mtok: 0.95,
      cache_read_per_mtok: 0.11,
      cache_write_per_mtok: 0.44,
      status: "ga",
    },
  ],
};
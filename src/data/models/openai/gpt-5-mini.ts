import type { ModelEntry } from "@/data/schema";

export const gpt5Mini: ModelEntry = {
  model: {
    id: "gpt-5-mini",
    name: "GPT-5 Mini",
    creator: "openai",
    family: "gpt-mini",
    category: "mid",
    status: "active",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 400000,
    max_output_tokens: 128000,
    is_open_source: false,
    release_date: "2025-08-07",
    reasoning: true,
    temperature: true,
    knowledge: "2024-10-01",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
      json_mode: true,
      json_schema: true,
      system_prompt: true,
      structured_output: true,
      prompt_caching: true,
      batch_api: true,
    },
    description: "OpenAI's compact GPT-5 variant with strong performance and lower cost.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "fastrouter",
      provider_model_id: "openai/gpt-5-mini",
      input_per_mtok: 0.25,
      output_per_mtok: 2.0,
      cache_read_per_mtok: 0.025,
      status: "ga",
    },
  ],
};
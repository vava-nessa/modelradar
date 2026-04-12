import type { ModelEntry } from "@/data/schema";

export const gpt41: ModelEntry = {
  model: {
    id: "gpt-4.1",
    name: "GPT-4.1",
    creator: "openai",
    family: "gpt",
    category: "flagship",
    status: "active",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 1047576,
    max_output_tokens: 32768,
    is_open_source: false,
    release_date: "2025-04-14",
    temperature: true,
    knowledge: "2024-04",
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
    description: "OpenAI's GPT-4.1 with extended context and improved instruction following.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "fastrouter",
      provider_model_id: "openai/gpt-4.1",
      input_per_mtok: 2.0,
      output_per_mtok: 8.0,
      cache_read_per_mtok: 0.5,
      status: "ga",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const gemini25Pro: ModelEntry = {
  model: {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    creator: "google",
    family: "gemini-pro",
    category: "flagship",
    status: "active",
    modality_input: ["text", "image", "pdf"],
    modality_output: ["text"],
    context_window: 1048576,
    max_output_tokens: 65536,
    is_open_source: false,
    release_date: "2025-06-17",
    reasoning: true,
    temperature: true,
    knowledge: "2025-01",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
      system_prompt: true,
      structured_output: true,
      prompt_caching: true,
      computer_use: false,
    },
    description: "Google's Gemini 2.5 Pro - most capable Gemini model for complex tasks.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "fastrouter",
      provider_model_id: "google/gemini-2.5-pro",
      input_per_mtok: 1.25,
      output_per_mtok: 10.0,
      cache_read_per_mtok: 0.31,
      status: "ga",
    },
  ],
};
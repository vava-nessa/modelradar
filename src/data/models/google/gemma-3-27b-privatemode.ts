import type { ModelEntry } from "@/data/schema";

export const gemma327bPrivatemode: ModelEntry = {
  model: {
    id: "gemma-3-27b-privatemode",
    name: "Gemma 3 27B",
    creator: "google",
    family: "gemma",
    category: "mid",
    status: "active",
    modality_input: ["text", "image"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 8192,
    is_open_source: true,
    release_date: "2025-03-12",
    temperature: true,
    knowledge: "2024-08",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
      structured_output: true,
    },
    description: "Google's Gemma 3 27B - available via PrivateMode AI.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "privatemode-ai",
      provider_model_id: "gemma-3-27b",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
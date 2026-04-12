import type { ModelEntry } from "@/data/schema";

export const MagistralSmall2506: ModelEntry = {
  model: {
    id: "magistral-small-2506",
    name: "Magistral Small 2506",
    creator: "mistralai",
    family: "magistral-small",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2025-06-01",
    temperature: true,
    knowledge: "2025-01",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "Mistral's Magistral Small - small frontier model for efficient tasks.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "io-net",
      provider_model_id: "mistralai/Magistral-Small-2506",
      input_per_mtok: 0.5,
      output_per_mtok: 1.5,
      cache_read_per_mtok: 0.25,
      cache_write_per_mtok: 1.0,
      status: "ga",
    },
  ],
};
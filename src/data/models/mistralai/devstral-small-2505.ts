import type { ModelEntry } from "@/data/schema";

export const devstralSmall2505: ModelEntry = {
  model: {
    id: "devstral-small-2505",
    name: "Devstral Small 2505",
    creator: "mistralai",
    family: "devstral",
    category: "code",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2025-05-01",
    temperature: true,
    knowledge: "2024-12",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "Mistral's code-specialized Devstral Small model.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "io-net",
      provider_model_id: "mistralai/Devstral-Small-2505",
      input_per_mtok: 0.05,
      output_per_mtok: 0.22,
      cache_read_per_mtok: 0.025,
      cache_write_per_mtok: 0.1,
      status: "ga",
    },
  ],
};
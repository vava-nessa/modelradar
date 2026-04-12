import type { ModelEntry } from "@/data/schema";

export const kimiK2Ionet: ModelEntry = {
  model: {
    id: "kimi-k2-io",
    name: "Kimi K2",
    creator: "moonshotai",
    family: "kimi",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 32768,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2024-09-05",
    temperature: true,
    knowledge: "2024-08",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      prompt_caching: true,
    },
    description: "Moonshot AI's Kimi K2 available on IO.net.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "io-net",
      provider_model_id: "moonshotai/Kimi-K2-Instruct-0905",
      input_per_mtok: 0.39,
      output_per_mtok: 1.9,
      cache_read_per_mtok: 0.195,
      cache_write_per_mtok: 0.78,
      status: "ga",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const kimiK2: ModelEntry = {
  model: {
    id: "kimi-k2",
    name: "Kimi K2",
    creator: "moonshotai",
    family: "kimi",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 32768,
    is_open_source: true,
    release_date: "2025-07-11",
    temperature: true,
    knowledge: "2024-10",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    description: "Moonshot AI's Kimi K2 - code-optimized model with strong reasoning.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "fastrouter",
      provider_model_id: "moonshotai/kimi-k2",
      input_per_mtok: 0.55,
      output_per_mtok: 2.20,
      status: "ga",
    },
  ],
};
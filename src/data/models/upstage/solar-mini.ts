import type { ModelEntry } from "@/data/schema";

export const solarMini: ModelEntry = {
  model: {
    id: "solar-mini",
    name: "Solar Mini",
    creator: "upstage",
    family: "solar-mini",
    category: "small",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 32768,
    max_output_tokens: 4096,
    is_open_source: false,
    release_date: "2024-06-12",
    last_updated: "2025-04-22",
    knowledge: "2024-09-01",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
    },
    description:
      "Upstage's compact model delivering strong performance with high efficiency on single GPU.",
    supportedOn: ["api"],
    cost: { input: 0.15, output: 0.15 },
  },
  offers: [
    {
      provider_id: "upstage",
      provider_model_id: "solar-mini",
      input_per_mtok: 0.15,
      output_per_mtok: 0.15,
      status: "ga",
    },
  ],
};
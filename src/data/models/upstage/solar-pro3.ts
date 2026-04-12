import type { ModelEntry } from "@/data/schema";

export const solarPro3: ModelEntry = {
  model: {
    id: "solar-pro3",
    name: "Solar Pro 3",
    creator: "upstage",
    family: "solar-pro",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 8192,
    is_open_source: false,
    architecture: "MoE",
    release_date: "2026-01-01",
    last_updated: "2026-01-01",
    knowledge: "2025-03-01",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
    },
    description:
      "Upstage's latest MoE model with 102B total parameters and 12B active. Improved reasoning and instruction following.",
    supportedOn: ["api"],
    cost: { input: 0.25, output: 0.25 },
  },
  offers: [
    {
      provider_id: "upstage",
      provider_model_id: "solar-pro3",
      input_per_mtok: 0.25,
      output_per_mtok: 0.25,
      status: "ga",
    },
  ],
};
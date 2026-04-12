import type { ModelEntry } from "@/data/schema";

export const solarPro2: ModelEntry = {
  model: {
    id: "solar-pro2",
    name: "Solar Pro 2",
    creator: "upstage",
    family: "solar-pro",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 65536,
    max_output_tokens: 8192,
    is_open_source: false,
    release_date: "2025-05-20",
    last_updated: "2025-05-20",
    knowledge: "2025-03-01",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
    },
    description:
      "Upstage's 31B reasoning model that rivals 70B+ models. Hybrid reasoning mode with high efficiency.",
    supportedOn: ["api"],
    cost: { input: 0.25, output: 0.25 },
  },
  offers: [
    {
      provider_id: "upstage",
      provider_model_id: "solar-pro2",
      input_per_mtok: 0.25,
      output_per_mtok: 0.25,
      status: "ga",
    },
  ],
};
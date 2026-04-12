import type { ModelEntry } from "@/data/schema";

export const step35Flash: ModelEntry = {
  model: {
    id: "step-3.5-flash",
    name: "Step 3.5 Flash",
    creator: "stepfun-ai",
    family: "step",
    category: "mid",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 256000,
    max_output_tokens: 16384,
    is_open_source: true,
    release_date: "2026-02-02",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
    },
    description: "Stepfun AI's Step 3.5 Flash model with reasoning capabilities.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nvidia",
      provider_model_id: "stepfun-ai/step-3.5-flash",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
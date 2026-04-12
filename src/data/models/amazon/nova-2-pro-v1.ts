import type { ModelEntry } from "@/data/schema";

export const nova2ProV1: ModelEntry = {
  model: {
    id: "nova-2-pro-v1",
    name: "Nova 2 Pro",
    creator: "amazon",
    family: "nova-pro",
    category: "flagship",
    status: "active",
    modality_input: ["text", "image", "pdf"],
    modality_output: ["text"],
    context_window: 1000000,
    max_output_tokens: 64000,
    is_open_source: false,
    release_date: "2025-12-03",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
      structured_output: true,
      prompt_caching: true,
    },
    description: "Amazon's Nova 2 Pro - multimodal flagship with 1M context.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nova",
      provider_model_id: "nova-2-pro-v1",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
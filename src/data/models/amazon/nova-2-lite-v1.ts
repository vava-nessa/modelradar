import type { ModelEntry } from "@/data/schema";

export const nova2LiteV1: ModelEntry = {
  model: {
    id: "nova-2-lite-v1",
    name: "Nova 2 Lite",
    creator: "amazon",
    family: "nova-lite",
    category: "mid",
    status: "active",
    modality_input: ["text", "image", "pdf"],
    modality_output: ["text"],
    context_window: 1000000,
    max_output_tokens: 64000,
    is_open_source: false,
    release_date: "2025-12-01",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: true,
      structured_output: true,
      prompt_caching: true,
    },
    description: "Amazon's Nova 2 Lite - cost-effective multimodal model.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "nova",
      provider_model_id: "nova-2-lite-v1",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
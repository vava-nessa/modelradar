import type { ModelEntry } from "@/data/schema";

export const gptOss120bPrivatemode: ModelEntry = {
  model: {
    id: "gpt-oss-120b",
    name: "GPT-OSS 120B",
    creator: "openai",
    family: "gpt-oss",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 128000,
    is_open_source: true,
    release_date: "2025-08-04",
    reasoning: true,
    temperature: true,
    knowledge: "2025-08",
    capabilities: {
      streaming: true,
      function_calling: true,
      vision: false,
      structured_output: true,
    },
    description: "OpenAI's GPT-OSS 120B - open-source large model.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "privatemode-ai",
      provider_model_id: "gpt-oss-120b",
      input_per_mtok: 0.0,
      output_per_mtok: 0.0,
      status: "ga",
    },
  ],
};
import type { ModelEntry } from "@/data/schema";

export const grok_3: ModelEntry = {
  model: {
    id: "grok-3",
    name: "xAI Grok 3",
    creator: "x-ai",
    family: "grok",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 131072,
    max_output_tokens: 131072,
    is_open_source: false,
    knowledge: "2024-06",
    release_date: "2024-06-01",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "xAI's Grok 3 model with real-time web search and strong reasoning capabilities.",
    url: "https://x.ai/grok",
    supportedOn: ["api"],
    cost: { input: 3, output: 15, cache_read: 0.75 },
  },
  offers: [
    {
      provider_id: "helicone",
      provider_model_id: "grok-3",
      input_per_mtok: 3,
      output_per_mtok: 15,
      cache_read_per_mtok: 0.75,
      status: "ga",
      available_since: "2024-06-01",
    },
  ],
};
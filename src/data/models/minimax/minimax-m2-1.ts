import type { ModelEntry } from "@/data/schema";

export const minimax_m2_1: ModelEntry = {
  model: {
    id: "minimax-m2-1",
    name: "MiniMax-M2.1",
    creator: "minimax",
    family: "minimax",
    category: "flagship",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 204800,
    max_output_tokens: 131072,
    is_open_source: true,
    knowledge: "2025-12",
    release_date: "2025-12-23",
    reasoning: true,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: true,
      system_prompt: true,
      vision: false,
    },
    description:
      "MiniMax M2.1 is a frontier reasoning model with 200K+ context window and strong coding capabilities.",
    url: "https://hailo.ai",
    supportedOn: ["api", "local"],
    cost: { input: 2.1, output: 8.4 },
  },
  offers: [
    {
      provider_id: "moark",
      provider_model_id: "MiniMax-M2.1",
      input_per_mtok: 2.1,
      output_per_mtok: 8.4,
      status: "ga",
      available_since: "2025-12-23",
    },
  ],
};
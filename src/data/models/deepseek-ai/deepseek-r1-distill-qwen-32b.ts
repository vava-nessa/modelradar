import type { ModelEntry } from "@/data/schema";

export const deepseekR1DistillQwen32b: ModelEntry = {
  model: {
    id: "deepseek-r1-distill-qwen-32b",
    name: "DeepSeek R1 Distill Qwen 32B",
    creator: "deepseek-ai",
    family: "deepseek-thinking",
    category: "reasoning",
    status: "active",
    modality_input: ["text"],
    modality_output: ["text"],
    context_window: 128000,
    max_output_tokens: 16384,
    is_open_source: false,
    release_date: "2025-04-03",
    reasoning: false,
    temperature: true,
    capabilities: {
      streaming: true,
      function_calling: false,
      vision: false,
    },
    description: "DeepSeek R1 distilled into Qwen 32B - available via Cloudflare Workers AI.",
    supportedOn: ["api"],
  },
  offers: [
    {
      provider_id: "cloudflare-ai-gateway",
      provider_model_id: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      input_per_mtok: 0.5,
      output_per_mtok: 4.88,
      status: "ga",
    },
  ],
};
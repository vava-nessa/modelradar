import type { Provider } from "@/data/schema";

export const mixlayer: Provider = {
  id: "mixlayer",
  name: "MixLayer",
  description:
    "AI API platform aggregating Qwen and other Chinese open-source models with OpenAI-compatible endpoints for text generation and reasoning.",
  type: "aggregator",
  status: "active",
  url: "https://mixlayer.ai",
  auth_type: "api_key",
  billing_model: "pay_per_token",
  openai_compatible: true,
};

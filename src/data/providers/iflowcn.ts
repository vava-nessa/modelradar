import type { Provider } from "@/data/schema";

export const iflowcn: Provider = {
  id: "iflowcn",
  name: "iFlow",
  description:
    "Chinese AI model aggregation platform offering free access to models like Kimi K2, Qwen3 Coder, and DeepSeek v3. OpenAI-compatible API with a free model marketplace.",
  type: "aggregator",
  provider_access_type: "api",
  status: "sunset",
  url: "https://platform.iflow.cn",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "credits",
  sdk: ["python"],
  openai_compatible: true,
};

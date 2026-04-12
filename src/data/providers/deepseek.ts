import type { Provider } from "@/data/schema";

export const deepseek: Provider = {
  id: "deepseek",
  name: "DeepSeek",
  description: "Direct API access to DeepSeek models. Ultra-competitive pricing, OpenAI-compatible.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://deepseek.com",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

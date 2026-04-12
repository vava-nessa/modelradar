import type { Provider } from "@/data/schema";

export const xai: Provider = {
  id: "xai",
  name: "xAI",
  description: "Direct API access to Grok models. Real-time knowledge up to 2024, strong reasoning capabilities.",
  type: "direct",
  status: "active",
  url: "https://x.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

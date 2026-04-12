import type { Provider } from "@/data/schema";

export const aihubmix: Provider = {
  id: "aihubmix",
  name: "AIHubMix",
  description:
    "Chinese AI aggregator platform offering unified API access to multiple model providers including OpenAI, Claude, Gemini, and Chinese models.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: "https://www.aihubmix.com",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

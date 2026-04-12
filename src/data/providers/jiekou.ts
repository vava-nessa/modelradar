import type { Provider } from "@/data/schema";

export const jiekou: Provider = {
  id: "jiekou",
  name: "Jiekou.AI",
  description:
    "Chinese AI aggregator platform offering unified API access to multiple model providers including OpenAI, Anthropic, Google, and Chinese models.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: "https://www.jiekou.ai",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

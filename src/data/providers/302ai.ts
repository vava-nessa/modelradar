import type { Provider } from "@/data/schema";

export const ai302: Provider = {
  id: "302ai",
  name: "302.AI",
  description:
    "Chinese AI aggregator platform offering pay-per-use access to multiple AI providers and models with no subscription required.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: "https://302.ai",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

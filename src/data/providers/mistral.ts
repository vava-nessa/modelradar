import type { Provider } from "@/data/schema";

export const mistral: Provider = {
  id: "mistral",
  name: "Mistral AI",
  description: "Direct API access to Mistral models. OpenAI-compatible, fast inference, EU-hosted options.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://mistral.ai",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
  compliance: ["GDPR"],
};

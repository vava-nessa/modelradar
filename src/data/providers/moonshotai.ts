import type { Provider } from "@/data/schema";

export const moonshotai: Provider = {
  id: "moonshotai",
  name: "Moonshot AI",
  description:
    "Chinese AI company behind the Kimi series of models. Offers direct API access to Kimi K2 and earlier models with OpenAI-compatible endpoints.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://platform.moonshot.ai",
  regions: ["us", "cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

import type { Provider } from "@/data/schema";

export const dinference: Provider = {
  id: "dinference",
  name: "Dinference",
  description:
    "Dinference is an AI inference platform offering access to open-source and proprietary models with a focus on developer experience and competitive pricing.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://dinference.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python"],
  openai_compatible: true,
};

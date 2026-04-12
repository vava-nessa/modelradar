import type { Provider } from "@/data/schema";

export const privatemodeAi: Provider = {
  id: "privatemode-ai",
  name: "PrivateMode AI",
  description:
    "PrivateMode AI provides private and secure AI inference services with a focus on data privacy and compliance. Offers access to open-source models with enhanced privacy controls.",
  type: "direct",
  status: "active",
  url: "https://privatemode.ai",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python"],
  openai_compatible: true,
};

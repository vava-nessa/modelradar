import type { Provider } from "@/data/schema";

export const togetherai: Provider = {
  id: "togetherai",
  name: "Together AI",
  description: "Cloud platform for training and serving open-source models. Finely tuned models and instant inference.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://together.ai",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "go"],
  openai_compatible: true,
};

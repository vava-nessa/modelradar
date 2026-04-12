import type { Provider } from "@/data/schema";

export const novita_ai: Provider = {
  id: "novita-ai",
  name: "Novita AI",
  description: "Multi-provider AI API with access to hundreds of models. Competitive pricing, fast inference.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: "https://novita.ai",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "go"],
  openai_compatible: true,
};

import type { Provider } from "@/data/schema";

export const openrouter: Provider = {
  id: "openrouter",
  name: "OpenRouter",
  description: "Model aggregator with unified OpenAI-compatible API. Access 200+ models from a single endpoint.",
  type: "aggregator",
  status: "active",
  url: "https://openrouter.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: [],
  openai_compatible: true,
};

import type { Provider } from "@/data/schema";

export const openrouter: Provider = {
  id: "openrouter",
  name: "OpenRouter",
  description:
    "Model aggregator with unified OpenAI-compatible API. Access 300+ models from 60+ providers through a single endpoint.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: "https://openrouter.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "credits",
  sdk: [],
  openai_compatible: true,
};

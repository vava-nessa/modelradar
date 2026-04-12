import type { Provider } from "@/data/schema";

export const abacus: Provider = {
  id: "abacus",
  name: "Abacus",
  description:
    "AI aggregator platform offering access to a wide range of models including OpenAI, Anthropic, Google, Meta, and Chinese models via RouteLLM.",
  type: "aggregator",
  status: "active",
  url: "https://abacus.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

import type { Provider } from "@/data/schema";

export const kilo: Provider = {
  id: "kilo",
  name: "Kilo",
  description:
    "Universal AI inference gateway that intelligently routes requests across top-tier providers (Anthropic, OpenAI, Mistral, and 500+ models). OpenAI-compatible API with unified access.",
  type: "aggregator",
  status: "active",
  url: "https://kilo.ai/gateway",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "go"],
  openai_compatible: true,
};

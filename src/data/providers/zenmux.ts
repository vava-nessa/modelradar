import type { Provider } from "@/data/schema";

export const zenmux: Provider = {
  id: "zenmux",
  name: "ZenMux",
  description:
    "Multi-provider AI router that aggregates models from OpenAI, Anthropic, Google and other providers with automatic routing for cost optimization. Supports OpenAI, Anthropic Messages, and Google Vertex protocols.",
  type: "aggregator",
  status: "active",
  url: "https://zenmux.ai",
  auth_type: "api_key",
  billing_model: "credits",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

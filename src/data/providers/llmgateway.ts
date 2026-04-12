import type { Provider } from "@/data/schema";

export const llmgateway: Provider = {
  id: "llmgateway",
  name: "LLM Gateway",
  description:
    "Unified API gateway for multiple LLM providers. Access 180+ models from OpenAI, Anthropic, Google and more through a single OpenAI-compatible endpoint.",
  type: "aggregator",
  status: "active",
  url: "https://llmgateway.io",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};
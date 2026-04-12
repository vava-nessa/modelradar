import type { Provider } from "@/data/schema";

export const perplexityAgent: Provider = {
  id: "perplexity-agent",
  name: "Perplexity Agent",
  description:
    "Perplexity's agentic AI platform that combines web search with multiple frontier models (Claude, Gemini, GPT, Grok) for autonomous research and task completion.",
  type: "direct",
  status: "active",
  url: "https://perplexity.ai",
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["typescript", "python"],
  openai_compatible: true,
};
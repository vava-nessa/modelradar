import type { Provider } from "@/data/schema";

export const moark: Provider = {
  id: "moark",
  name: "MoArk",
  description:
    "AI platform aggregating Chinese AI models including GLM and MiniMax, offering serverless API access with OpenAI-compatible endpoints.",
  type: "aggregator",
  status: "active",
  url: "https://moark.ai",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};
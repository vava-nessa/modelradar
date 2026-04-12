import type { Provider } from "@/data/schema";

export const quantumML: Provider = {
  id: "quantumml",
  name: "QuantumML",
  description:
    "QuantumML is an AI inference provider offering access to various large language models via OpenAI-compatible API. Focuses on delivering fast and cost-effective model inference for production workloads.",
  type: "direct",
  status: "active",
  url: "https://quantumml.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python"],
  openai_compatible: true,
};

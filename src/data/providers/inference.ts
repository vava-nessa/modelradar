import type { Provider } from "@/data/schema";

export const inference: Provider = {
  id: "inference",
  name: "Inference",
  description:
    "Inference is a direct AI inference provider offering OpenAI-compatible API access to various LLM models. Provides pay-per-token pricing for developers building AI-powered applications.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://inference.net",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

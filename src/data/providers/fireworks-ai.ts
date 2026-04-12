import type { Provider } from "@/data/schema";

export const fireworks_ai: Provider = {
  id: "fireworks-ai",
  name: "Fireworks AI",
  description: "High-performance inference for open-source models. Extremely fast, OpenAI-compatible API.",
  type: "direct",
  status: "active",
  url: "https://fireworks.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

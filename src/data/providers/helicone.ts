import type { Provider } from "@/data/schema";

export const helicone: Provider = {
  id: "helicone",
  name: "Helicone",
  description:
    "AI observability platform providing proxy routing, analytics, and cost management for LLM applications. Supports 300+ models.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: "https://helicone.ai",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "go", "java"],
  openai_compatible: true,
};
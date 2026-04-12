import type { Provider } from "@/data/schema";

export const requesty: Provider = {
  id: "requesty",
  name: "Requesty",
  description:
    "Unified LLM gateway with intelligent routing, automatic failover, and real-time observability. Access 400+ models with geo-based routing, policy controls, and PII detection. EU hosting available.",
  type: "aggregator",
  status: "active",
  url: "https://requesty.ai",
  regions: ["us", "eu", "apac"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: [],
  openai_compatible: true,
};

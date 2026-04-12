import type { Provider } from "@/data/schema";

export const fastrouter: Provider = {
  id: "fastrouter",
  name: "FastRouter",
  description:
    "FastRouter is a unified API gateway for LLMs that routes requests across 100+ models from top providers. Offers automatic provider selection for cost optimization, load balancing, and real-time cost tracking.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: "https://fastrouter.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "credits",
  sdk: [],
  openai_compatible: true,
};

import type { Provider } from "@/data/schema";

export const iflow: Provider = {
  id: "iflow",
  name: "iFlow ⚠️",
  description:
    "High-performance Chinese AI gateway. Shutting down April 17, 2026 — migrate to alternative providers.",
  type: "direct",
  provider_access_type: "api",
  status: "sunset",
  url: "https://platform.iflow.cn",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "credits",
  sdk: ["python"],
  openai_compatible: true,
};

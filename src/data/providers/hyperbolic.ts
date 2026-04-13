import type { Provider } from "@/data/schema";

export const hyperbolic: Provider = {
  id: "hyperbolic",
  name: "Hyperbolic",
  description:
    "High-performance AI inference at competitive prices. Specializes in open models with excellent throughput.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://app.hyperbolic.xyz",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

import type { Provider } from "@/data/schema";

export const friendli: Provider = {
  id: "friendli",
  name: "Friendli",
  description:
    "Friendli is a serverless AI inference platform optimized for high-performance and cost-effective GPU computing. Offers pay-per-token pricing with automatic scaling for production workloads.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://friendli.ai",
  regions: ["us", "eu", "asia"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "go"],
  openai_compatible: true,
};

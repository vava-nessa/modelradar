import type { Provider } from "@/data/schema";

export const replicate: Provider = {
  id: "replicate",
  name: "Replicate",
  description:
    "Platform for running open-source models. Uses predictions endpoint with simple token authentication.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://replicate.com",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "go"],
  openai_compatible: false,
};

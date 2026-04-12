import type { Provider } from "@/data/schema";

export const baseten: Provider = {
  id: "baseten",
  name: "Baseten",
  description:
    "Baseten is a platform for deploying and scaling machine learning models. Provides serverless inference for LLMs with support for open-source models, custom inference endpoints, and GPU acceleration.",
  type: "direct",
  status: "active",
  url: "https://baseten.co",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

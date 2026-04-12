import type { Provider } from "@/data/schema";

export const huggingface: Provider = {
  id: "huggingface",
  name: "Hugging Face",
  description:
    "Platform for ML models with Inference Providers — access 200+ models from leading AI providers with unified API and no markup.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: "https://huggingface.co/docs/api-inference",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "credits",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

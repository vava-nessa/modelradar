import type { Provider } from "@/data/schema";

export const cerebras: Provider = {
  id: "cerebras",
  name: "Cerebras",
  description:
    "Wafer-scale engine inference delivering 10-20x faster than GPU solutions. Runs open models like Llama 3.1 70B at 2,100 tokens/sec.",
  type: "cloud",
  provider_access_type: "api",
  status: "active",
  url: "https://cerebras.ai/inference",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "javascript"],
  openai_compatible: true,
};

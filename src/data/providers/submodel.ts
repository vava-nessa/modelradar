import type { Provider } from "@/data/schema";

export const submodel: Provider = {
  id: "submodel",
  name: "SubModel",
  description:
    "GPU cloud platform offering high-performance inference for open-source models including DeepSeek, Qwen, and GLM. Provides pay-per-token pricing with OpenAI-compatible API.",
  type: "cloud",
  status: "active",
  url: "https://submodel.ai",
  auth_type: "api_key",
  billing_model: "pay_per_token",
  sdk: [],
  openai_compatible: true,
};

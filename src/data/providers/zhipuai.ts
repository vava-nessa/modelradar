import type { Provider } from "@/data/schema";

export const zhipuai: Provider = {
  id: "zhipuai",
  name: "Zhipu AI",
  description:
    "Chinese AI company behind the GLM series of models. Direct API access to GLM-4 and GLM-5 models with OpenAI-compatible endpoints.",
  type: "direct",
  status: "active",
  url: "https://www.zhipuai.cn",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

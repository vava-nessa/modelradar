import type { Provider } from "@/data/schema";

export const modelscope: Provider = {
  id: "modelscope",
  name: "ModelScope",
  description:
    "Chinese AI platform by Alibaba's Damo Academy offering API access to Qwen, GLM, and other models. Integrates many open-source models.",
  type: "direct",
  status: "active",
  url: "https://modelscope.cn",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

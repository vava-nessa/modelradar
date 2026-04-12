import type { Provider } from "@/data/schema";

export const alibabaCn: Provider = {
  id: "alibaba-cn",
  name: "Alibaba Cloud China",
  description:
    "Alibaba Cloud's China region offering featuring DashScope API for Qwen and DeepSeek models, optimized for Chinese market.",
  type: "cloud",
  status: "active",
  url: "https://help.aliyun.com",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "java"],
  openai_compatible: true,
};
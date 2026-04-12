import type { Provider } from "@/data/schema";

export const alibaba: Provider = {
  id: "alibaba",
  name: "Alibaba Cloud",
  description:
    "Alibaba Cloud's Model Studio offering access to Qwen models through their international cloud platform.",
  type: "cloud",
  status: "active",
  url: "https://www.alibabacloud.com/en/solutions/generative-ai/qwen",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "java"],
  openai_compatible: true,
};
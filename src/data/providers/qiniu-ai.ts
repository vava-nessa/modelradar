import type { Provider } from "@/data/schema";

export const qiniuAi: Provider = {
  id: "qiniu-ai",
  name: "Qiniu AI",
  description:
    "Chinese AI infrastructure provider offering Qwen and other open-source models through a pay-per-token API.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://qiniu.com",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};
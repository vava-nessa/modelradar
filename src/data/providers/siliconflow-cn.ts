import type { Provider } from "@/data/schema";

export const siliconflowCn: Provider = {
  id: "siliconflow-cn",
  name: "SiliconFlow (China)",
  description:
    "Chinese AI aggregator platform for China region, offering unified API access to multiple model providers.",
  type: "aggregator",
  status: "active",
  url: "https://cloud.siliconflow.com",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

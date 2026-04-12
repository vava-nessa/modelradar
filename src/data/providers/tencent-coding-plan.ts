import type { Provider } from "@/data/schema";

export const tencentCodingPlan: Provider = {
  id: "tencent-coding-plan",
  name: "Tencent Cloud Coding Plan",
  description:
    "Tencent Cloud's AI coding assistant powered by Hunyuan and混元 models. Integrated with Tencent Cloud development tools for Chinese developers.",
  type: "direct",
  provider_access_type: "sub",
  status: "active",
  url: "https://cloud.tencent.com/product/coding",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "subscription",
  sdk: [],
  openai_compatible: false,
};

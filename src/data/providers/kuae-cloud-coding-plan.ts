import type { Provider } from "@/data/schema";

export const kuaeCloudCodingPlan: Provider = {
  id: "kuae-cloud-coding-plan",
  name: "Kuae Cloud Coding Plan",
  description:
    "Chinese cloud-based AI coding assistant platform offering access to coding-specialized models including Kimi K2. Provides code completion and AI-assisted development features.",
  type: "direct",
  provider_access_type: "sub",
  status: "active",
  url: "https://kuae.cn",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "subscription",
  sdk: [],
  openai_compatible: false,
};

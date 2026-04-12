import type { Provider } from "@/data/schema";

export const zaiCodingPlan: Provider = {
  id: "zai-coding-plan",
  name: "Z.ai Coding Plan",
  description:
    "Z.ai's coding-focused subscription plan offering discounted access to GLM models optimized for software development and code generation tasks.",
  type: "direct",
  provider_access_type: "sub",
  status: "active",
  url: "https://platform.z.ai",
  auth_type: "api_key",
  billing_model: "subscription",
  openai_compatible: true,
};

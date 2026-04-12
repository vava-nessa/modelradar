import type { Provider } from "@/data/schema";

export const kimiForCoding: Provider = {
  id: "kimi-for-coding",
  name: "Kimi for Coding",
  description:
    "Kimi for Coding is Moonshot AI's code-specialized API service offering access to Kimi K2 and K2.5 models optimized for software development tasks including code completion, debugging, and refactoring.",
  type: "direct",
  status: "active",
  url: "https://platform.moonshot.ai/docs/kimi-code",
  regions: ["us", "asia"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

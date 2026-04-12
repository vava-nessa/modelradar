import type { Provider } from "@/data/schema";

export const moonshotaiCn: Provider = {
  id: "moonshotai-cn",
  name: "Moonshot AI CN",
  description:
    "Moonshot AI's China-region specific deployment offering Kimi K2 and related models to Chinese developers. OpenAI-compatible API with CN data residency.",
  type: "direct",
  status: "active",
  url: "https://platform.moonshot.cn",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

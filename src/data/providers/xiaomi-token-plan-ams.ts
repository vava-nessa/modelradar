import type { Provider } from "@/data/schema";

export const xiaomiTokenPlanAms: Provider = {
  id: "xiaomi-token-plan-ams",
  name: "Xiaomi MiMo (AMS)",
  description:
    "Xiaomi MiMo API platform deployed on AMS (Amazon Marketing Services) region, offering token-based billing for MiMo-V2 models including Pro, Omni, and TTS.",
  type: "direct",
  status: "active",
  url: "https://platform.xiaomimimo.com",
  regions: ["us"],
  auth_type: "api_key",
  billing_model: "pay_per_token",
  openai_compatible: true,
};

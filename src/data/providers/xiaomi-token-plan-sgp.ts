import type { Provider } from "@/data/schema";

export const xiaomiTokenPlanSgp: Provider = {
  id: "xiaomi-token-plan-sgp",
  name: "Xiaomi MiMo (SGP)",
  description:
    "Xiaomi MiMo API platform for Singapore region with token-based billing, offering access to MiMo-V2 Pro, Omni, and TTS models.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://platform.xiaomimimo.com",
  regions: ["sg"],
  auth_type: "api_key",
  billing_model: "pay_per_token",
  openai_compatible: true,
};

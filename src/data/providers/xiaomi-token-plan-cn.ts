import type { Provider } from "@/data/schema";

export const xiaomiTokenPlanCn: Provider = {
  id: "xiaomi-token-plan-cn",
  name: "Xiaomi MiMo (CN)",
  description:
    "Xiaomi MiMo API platform for China region with token-based billing, offering access to MiMo-V2 series models through minimaxi.com endpoint.",
  type: "direct",
  status: "active",
  url: "https://platform.xiaomimimo.com",
  regions: ["cn"],
  auth_type: "api_key",
  billing_model: "pay_per_token",
  openai_compatible: true,
};

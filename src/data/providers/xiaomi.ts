import type { Provider } from "@/data/schema";

export const xiaomi: Provider = {
  id: "xiaomi",
  name: "Xiaomi MiMo",
  description:
    "Xiaomi's MiMo model family API platform offering access to MiMo-V2 series models including Pro, Omni, Flash, and TTS. OpenAI-compatible API with multimodal and reasoning capabilities.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://platform.xiaomimimo.com",
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

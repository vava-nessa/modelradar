import type { Provider } from "@/data/schema";

export const firmware: Provider = {
  id: "firmware",
  name: "Firmware",
  description:
    "AI model provider offering access to proprietary and open-source models including Claude, GPT, Gemini, and Grok. Provides OpenAI-compatible API for seamless integration.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://firmware.ai",
  auth_type: "api_key",
  billing_model: "pay_per_token",
  sdk: [],
  openai_compatible: true,
};

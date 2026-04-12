import type { Provider } from "@/data/schema";

export const qihangAi: Provider = {
  id: "qihang-ai",
  name: "QiHang AI",
  description:
    "QiHang AI is a Chinese LLM inference provider offering access to various AI models via an OpenAI-compatible API. Provides pay-per-token pricing for developers integrating AI capabilities.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://www.qhaigc.net",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python"],
  openai_compatible: true,
};

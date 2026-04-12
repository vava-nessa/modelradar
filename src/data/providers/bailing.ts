import type { Provider } from "@/data/schema";

export const bailing: Provider = {
  id: "bailing",
  name: "Bailing",
  description:
    "Bailing is an AI inference service by Ant Group / Alipay, providing access to large language models via the TBox platform. Offers OpenAI-compatible API for seamless integration.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://alipay.com",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python"],
  openai_compatible: true,
};

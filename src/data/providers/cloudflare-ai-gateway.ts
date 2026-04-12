import type { Provider } from "@/data/schema";

export const cloudflareAiGateway: Provider = {
  id: "cloudflare-ai-gateway",
  name: "Cloudflare AI Gateway",
  description:
    "Cloudflare AI Gateway provides unified API access to multiple AI models via Workers AI and external providers. Offers edge-native inference with global distribution, caching, and rate limiting.",
  type: "aggregator",
  status: "active",
  url: "https://developers.cloudflare.com/ai-gateway/",
  regions: ["global"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["typescript", "python", "rust"],
  openai_compatible: true,
  compliance: ["SOC2", "GDPR", "HIPAA"],
};

import type { Provider } from "@/data/schema";

export const perplexity: Provider = {
  id: "perplexity",
  name: "Perplexity",
  description:
    "AI search engine and API platform. Provides Sonar family models optimized for real-time web-grounded answers with citations. Offers both API and Pro subscription.",
  type: "direct",
  status: "active",
  url: "https://perplexity.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["typescript", "python"],
  openai_compatible: true,
};
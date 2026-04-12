import type { Provider } from "@/data/schema";

export const cloudferroSherlock: Provider = {
  id: "cloudferro-sherlock",
  name: "CloudFerro Sherlock",
  description:
    "CloudFerro's fully managed Generative AI service with OpenAI-compatible endpoints. Provides curated language models through Sherlock AI Hub with high security and privacy standards.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://console.sherlock.cloudferro.com",
  regions: ["eu-central", "eu-west"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "enterprise",
  sdk: ["python", "typescript", "rest"],
  openai_compatible: true,
};

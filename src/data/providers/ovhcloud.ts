import type { Provider } from "@/data/schema";

export const ovhcloud: Provider = {
  id: "ovhcloud",
  name: "OVHcloud",
  description:
    "European sovereign cloud provider offering AI Endpoints — serverless inference API for LLMs, voice processing, document analysis, and image analysis. Supports 40+ open-weight models with zero data retention.",
  type: "cloud",
  status: "active",
  url: "https://www.ovhcloud.com/en/public-cloud/ai-endpoints/",
  regions: ["eu"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: [],
  openai_compatible: true,
  compliance: ["ISO 27000", "SOC"],
};

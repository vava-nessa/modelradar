import type { Provider } from "@/data/schema";

export const berget: Provider = {
  id: "berget",
  name: "Berget.AI",
  description:
    "Berget.AI is a European AI inference provider focused on AI sovereignty and sustainability. Offers access to powerful open-source models with per-response CO2e emission tracking, optimized for agentic applications.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://berget.ai",
  regions: ["eu"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

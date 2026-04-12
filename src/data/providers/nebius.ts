import type { Provider } from "@/data/schema";

export const nebius: Provider = {
  id: "nebius",
  name: "Nebius Token Factory",
  description:
    "Production inference platform for open-source models. Sub-second latency, autoscaling, 99.9% SLA, and fine-tuning support.",
  type: "cloud",
  provider_access_type: "api",
  status: "active",
  url: "https://tokenfactory.nebius.com",
  regions: ["eu", "us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
  compliance: ["SOC2", "HIPAA", "ISO27001"],
};

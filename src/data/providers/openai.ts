import type { Provider } from "@/data/schema";

export const openai: Provider = {
  id: "openai",
  name: "OpenAI Platform",
  description: "Direct API access to GPT and o-series models. Includes Assistants API, fine-tuning, and batch processing.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://platform.openai.com",
  regions: ["us", "eu", "asia"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "dotnet", "java"],
  openai_compatible: true,
  compliance: ["SOC2", "HIPAA", "GDPR"],
};

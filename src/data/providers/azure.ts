import type { Provider } from "@/data/schema";

export const azure: Provider = {
  id: "azure",
  name: "Azure AI Foundry",
  description:
    "Microsoft's enterprise AI platform offering OpenAI models with Azure's security, compliance, and private networking.",
  type: "cloud",
  provider_access_type: "api",
  status: "active",
  url: "https://azure.microsoft.com/services/ai-foundry",
  regions: ["us-east", "us-west", "eu-west", "uk-south"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "rest"],
  openai_compatible: true,
  compliance: ["SOC2", "HIPAA", "GDPR", "ISO27001"],
};

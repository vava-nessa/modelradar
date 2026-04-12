import type { Provider } from "@/data/schema";

export const azure: Provider = {
  id: "azure",
  name: "Azure AI",
  description: "Microsoft Azure managed service for OpenAI and open-source models. Enterprise compliance and global regions.",
  type: "cloud",
  status: "active",
  url: "https://azure.microsoft.com/services/cognitive-services/openai",
  regions: ["us", "eu", "asia"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "dotnet", "java"],
  openai_compatible: true,
  compliance: ["SOC2", "HIPAA", "GDPR", "FedRAMP"],
};

import type { Provider } from "@/data/schema";

export const azureCognitiveServices: Provider = {
  id: "azure-cognitive-services",
  name: "Azure Cognitive Services",
  description:
    "Microsoft's broad suite of AI services including Speech, Language, Vision, and Decision APIs. Provides managed AI capabilities via REST APIs with enterprise security.",
  type: "cloud",
  provider_access_type: "api",
  status: "active",
  url: "https://azure.microsoft.com/services/cognitive-services",
  regions: ["global"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["rest", ".net", "python", "javascript"],
  openai_compatible: false,
  compliance: ["SOC2", "HIPAA", "GDPR", "ISO27001"],
};

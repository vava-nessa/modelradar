import type { Provider } from "@/data/schema";

export const cohere: Provider = {
  id: "cohere",
  name: "Cohere",
  description: "Direct API access to Command R models. Enterprise-focused with strong RAG and tool-use capabilities.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://cohere.com",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "go", "java"],
  openai_compatible: true,
  compliance: ["SOC2", "GDPR", "ISO27001"],
};

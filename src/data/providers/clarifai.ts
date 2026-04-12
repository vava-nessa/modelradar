import type { Provider } from "@/data/schema";

export const clarifai: Provider = {
  id: "clarifai",
  name: "Clarifai",
  description:
    "Enterprise AI platform with full lifecycle capabilities. Supports 500+ models with compute orchestration, RAG, and multi-cloud deployment.",
  type: "cloud",
  status: "active",
  url: "https://clarifai.com",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "java", "go"],
  openai_compatible: true,
  compliance: ["SOC2", "HIPAA", "GDPR"],
};

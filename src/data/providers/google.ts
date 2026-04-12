import type { Provider } from "@/data/schema";

export const google: Provider = {
  id: "google",
  name: "Google AI",
  description: "Direct API access to Gemini models via Google AI Studio. Multimodal with massive context windows.",
  type: "direct",
  status: "active",
  url: "https://ai.google.dev",
  regions: ["us", "eu", "asia"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "go", "java", "kotlin"],
  openai_compatible: true,
  compliance: ["SOC2", "GDPR", "HIPAA", "ISO27001"],
};

import type { Provider } from "@/data/schema";

export const stackit: Provider = {
  id: "stackit",
  name: "STACKIT",
  description:
    "German sovereign cloud from Schwarz Group offering AI Model Serving. GDPR-compliant European cloud hosting open-source models like Llama, Qwen, and Gemma.",
  type: "cloud",
  provider_access_type: "api",
  status: "active",
  url: "https://www.stackit.de",
  regions: ["eu"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
  compliance: ["GDPR", "SOC2"],
};
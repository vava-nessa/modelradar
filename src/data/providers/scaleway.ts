import type { Provider } from "@/data/schema";

export const scaleway: Provider = {
  id: "scaleway",
  name: "Scaleway",
  description:
    "French cloud provider offering AI Model Serving with GDPR-compliant infrastructure. Hosts open-source models like Llama, Mistral, Qwen, and Whisper.",
  type: "cloud",
  status: "active",
  url: "https://www.scaleway.com",
  regions: ["eu"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
  compliance: ["GDPR"],
};
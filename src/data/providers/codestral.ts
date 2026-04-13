import type { Provider } from "@/data/schema";

export const codestral: Provider = {
  id: "codestral",
  name: "Codestral",
  description:
    "Mistral's dedicated coding model API. Designed specifically for code generation and completion tasks with a 256k context window.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://codestral.mistral.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

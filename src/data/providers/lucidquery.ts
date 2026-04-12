import type { Provider } from "@/data/schema";

export const lucidquery: Provider = {
  id: "lucidquery",
  name: "LucidQuery",
  description:
    "AI inference platform specializing in code generation models including LucidNova RF1 100B and Nexus Coder. Provides OpenAI-compatible API for coding tasks.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://lucidquery.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

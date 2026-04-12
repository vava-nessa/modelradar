import type { Provider } from "@/data/schema";

export const inception: Provider = {
  id: "inception",
  name: "Inception Labs",
  description:
    "Fast inference platform specializing in Mercury, the fastest reasoning LLM. Offers Mercury 2 for chat and Mercury Edit 2 for code editing with FIM and next-edit capabilities.",
  type: "direct",
  status: "active",
  url: "https://www.inceptionlabs.ai",
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: [],
  openai_compatible: true,
};

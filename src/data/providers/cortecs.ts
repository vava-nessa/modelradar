import type { Provider } from "@/data/schema";

export const cortecs: Provider = {
  id: "cortecs",
  name: "Cortecs",
  description:
    "AI infrastructure provider offering access to frontier models with a focus on coding and reasoning capabilities.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://cortecs.ai",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};
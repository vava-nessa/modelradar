import type { Provider } from "@/data/schema";

export const morph: Provider = {
  id: "morph",
  name: "Morph",
  description:
    "AI model provider specializing in efficient text processing with context windows up to 32K tokens.",
  type: "direct",
  status: "active",
  url: "https://morph.ai",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};
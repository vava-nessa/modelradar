import type { Provider } from "@/data/schema";

export const v0: Provider = {
  id: "v0",
  name: "v0",
  description:
    "Vercel's AI code generator specialized in web development. Generates React, Vue, Svelte, and HTML/CSS code from text prompts.",
  type: "direct",
  status: "active",
  url: "https://v0.app",
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["typescript"],
  openai_compatible: true,
};
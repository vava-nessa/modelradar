import type { Provider } from "@/data/schema";

export const vercel: Provider = {
  id: "vercel",
  name: "Vercel",
  description:
    "Cloud platform offering AI model access through Vercel AI SDK. Aggregates multiple providers including OpenAI, Anthropic, Google, Mistral, and more.",
  type: "aggregator",
  status: "active",
  url: "https://vercel.com",
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["typescript", "python"],
  openai_compatible: true,
};
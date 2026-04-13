import type { Provider } from "@/data/schema";

export const gemini: Provider = {
  id: "gemini",
  name: "Gemini CLI",
  description: "CLI‑only Gemini client – installation required via npm. Provides free tier of 1,000 requests/day for Gemini 3.1 Pro and related models.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: undefined,
  has_free_tier: true,
  // CLI‑only – not installable via standard API key workflow
  installable: false,
  openai_compatible: true,
};
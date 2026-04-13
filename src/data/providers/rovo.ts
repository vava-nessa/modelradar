import type { Provider } from "@/data/schema";

export const rovo: Provider = {
  id: "rovo",
  name: "Rovo Dev CLI",
  description: "CLI‑only AI coding assistant – requires the Rovo Dev CLI binary. Provides free tier of 5M tokens/day for Claude Sonnet 4 and other models.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: undefined,
  has_free_tier: true,
  // CLI‑only – not installable via standard API keys
  installable: false,
  openai_compatible: true,
};
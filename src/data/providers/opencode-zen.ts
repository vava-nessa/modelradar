import type { Provider } from "@/data/schema";

export const opencodeZen: Provider = {
  id: "opencode-zen",
  name: "OpenCode Zen",
  description: "Free models hosted on the OpenCode Zen gateway – accessed via OpenCode CLI/Desktop. No traditional API key, but requires OpenCode Zen API key for the Zen endpoint.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: "https://opencode.ai/zen",
  has_free_tier: true,
  // Installable via OpenCode CLI – consider true (default)
  openai_compatible: true,
};
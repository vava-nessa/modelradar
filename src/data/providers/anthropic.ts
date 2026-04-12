import type { Provider } from "@/data/schema";

export const anthropic: Provider = {
  id: "anthropic",
  name: "Anthropic API",
  description: "Direct API access to Claude models. Best for Claude-native features (MCP, computer use, prompt caching).",
  type: "direct",
  status: "active",
  url: "https://console.anthropic.com",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: false,
  compliance: ["SOC2", "HIPAA"],
};

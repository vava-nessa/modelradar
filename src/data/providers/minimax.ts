import type { Provider } from "@/data/schema";

export const minimax: Provider = {
  id: "minimax",
  name: "MiniMax",
  description:
    "Chinese AI company offering direct API access to MiniMax models including the M2 series with reasoning capabilities.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://platform.minimax.io",
  regions: ["us", "cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

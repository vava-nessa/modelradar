import type { Provider } from "@/data/schema";

export const meganova: Provider = {
  id: "meganova",
  name: "MegaNova",
  description:
    "AI model provider offering a diverse catalog of models including DeepSeek, Meta Llama, MiniMax, Mistral, and Moonshot models via OpenAI-compatible API endpoints.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://meganova.ai",
  regions: ["us", "cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

import type { Provider } from "@/data/schema";

export const synthetic: Provider = {
  id: "synthetic",
  name: "Synthetic",
  description:
    "AI platform offering curated models including MiniMax, Moonshot, NVIDIA, DeepSeek, and Qwen via subscription. Includes Always-On models, LoRA adapters, and embedding models with usage-based pricing available.",
  type: "direct",
  status: "active",
  url: "https://synthetic.new",
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "subscription",
  sdk: [],
  openai_compatible: true,
};

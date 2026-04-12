import type { Provider } from "@/data/schema";

export const wandb: Provider = {
  id: "wandb",
  name: "Weights & Biases",
  description:
    "ML experiment tracking platform now offering API access to open-source models including Llama, DeepSeek, Qwen, Phi, and MiniMax through W&B Inference.",
  type: "direct",
  status: "active",
  url: "https://wandb.ai",
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python"],
  openai_compatible: true,
};
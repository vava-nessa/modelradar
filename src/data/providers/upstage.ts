import type { Provider } from "@/data/schema";

export const upstage: Provider = {
  id: "upstage",
  name: "Upstage",
  description:
    "South Korean AI company offering Solar Pro family of models. Solar Pro 3 is a 102B MoE model rivaling frontier models, running efficiently on single GPU.",
  type: "direct",
  status: "active",
  url: "https://www.upstage.ai",
  regions: ["us", "eu", "ap"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};
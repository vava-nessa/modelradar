import type { Provider } from "@/data/schema";

export const chutes: Provider = {
  id: "chutes",
  name: "Chutes",
  description:
    "Chutes is a serverless AI compute platform for open-source models. Provides high-performance inference with ephemeral jobs, batch processing, and a curated registry of SOTA open-source models accessible via OpenAI-compatible API.",
  type: "direct",
  status: "active",
  url: "https://chutes.ai",
  regions: ["us", "global"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

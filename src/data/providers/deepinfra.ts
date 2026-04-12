import type { Provider } from "@/data/schema";

export const deepinfra: Provider = {
  id: "deepinfra",
  name: "Deep Infra",
  description:
    "Low-cost AI inference platform with OpenAI-compatible API. 100+ hosted models on H100/A100 GPUs with pay-per-token pricing.",
  type: "cloud",
  status: "active",
  url: "https://deepinfra.com",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
  compliance: ["SOC2", "ISO27001"],
};

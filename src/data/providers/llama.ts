import type { Provider } from "@/data/schema";

export const llama: Provider = {
  id: "llama",
  name: "Llama.com",
  description:
    "Llama.com is Meta's official platform for accessing Llama models via API. Provides direct access to open-source Llama models including Llama 3, 3.1, 3.2, 3.3 and 4 families with enterprise support options.",
  type: "direct",
  status: "active",
  url: "https://llama.com",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "go"],
  openai_compatible: true,
};

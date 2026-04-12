import type { Provider } from "@/data/schema";

export const ollamaCloud: Provider = {
  id: "ollama-cloud",
  name: "Ollama Cloud",
  description:
    "Cloud-hosted Ollama models accessible via the same API as local Ollama. Run large models like Qwen3 Coder 480B without local GPU.",
  type: "cloud",
  provider_access_type: "sub",
  status: "active",
  url: "https://docs.ollama.com/cloud",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "subscription",
  sdk: ["python", "javascript", "go"],
  openai_compatible: true,
};

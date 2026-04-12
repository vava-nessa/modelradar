import type { Provider } from "@/data/schema";

export const groq: Provider = {
  id: "groq",
  name: "Groq",
  description: "Fast inference API powered by LPU chips. Extremely low latency for Llama and other models.",
  type: "direct",
  status: "active",
  url: "https://console.groq.com",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

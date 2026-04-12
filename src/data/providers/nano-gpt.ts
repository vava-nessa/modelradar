import type { Provider } from "@/data/schema";

export const nanoGpt: Provider = {
  id: "nano-gpt",
  name: "NanoGPT",
  description:
    "Lightweight AI provider offering access to ASI and auto-select models with competitive pricing for text processing.",
  type: "direct",
  status: "active",
  url: "https://nano-gpt.ai",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};
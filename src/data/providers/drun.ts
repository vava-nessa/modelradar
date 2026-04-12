import type { Provider } from "@/data/schema";

export const drun: Provider = {
  id: "drun",
  name: "Drun",
  description:
    "AI inference provider offering serverless API access to open-weight models including DeepSeek R1 and V3 with reasoning capabilities.",
  type: "direct",
  status: "active",
  url: "https://drun.io",
  auth_type: "api_key",
  billing_model: "pay_per_token",
  openai_compatible: true,
};

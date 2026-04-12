import type { Provider } from "@/data/schema";

export const minimaxCodingPlan: Provider = {
  id: "minimax-coding-plan",
  name: "MiniMax Coding Plan",
  description:
    "MiniMax's subscription-based coding plan offering discounted access to M2.5 and M2.7 series models optimized for software development workflows.",
  type: "direct",
  status: "active",
  url: "https://platform.minimax.io",
  auth_type: "api_key",
  billing_model: "subscription",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

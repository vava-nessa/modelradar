import type { Provider } from "@/data/schema";

export const minimaxCn: Provider = {
  id: "minimax-cn",
  name: "MiniMax (CN)",
  description:
    "MiniMax's China-specific API platform (api.minimaxi.com) offering access to MiniMax M2 series models with Anthropic-compatible API for text generation.",
  type: "direct",
  status: "active",
  url: "https://platform.minimaxi.com",
  regions: ["cn"],
  auth_type: "api_key",
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

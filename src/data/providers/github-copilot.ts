import type { Provider } from "@/data/schema";

export const githubCopilot: Provider = {
  id: "github-copilot",
  name: "GitHub Copilot",
  description:
    "GitHub's AI pair programmer offering access to multiple frontier models including Claude, GPT, Gemini, and Grok through Copilot subscriptions.",
  type: "direct",
  status: "active",
  url: "https://github.com/features/copilot",
  auth_type: "oauth",
  has_free_tier: false,
  billing_model: "subscription",
  openai_compatible: false,
};
import type { Provider } from "@/data/schema";

export const githubModels: Provider = {
  id: "github-models",
  name: "GitHub Models",
  description:
    "GitHub's model marketplace providing API access to open-source and frontier models. Part of GitHub Copilot ecosystem with OAuth authentication.",
  type: "aggregator",
  provider_access_type: "api",
  status: "active",
  url: "https://github.com/marketplace/models",
  auth_type: "oauth",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["typescript", "python", "dotnet", "java"],
  openai_compatible: true,
};
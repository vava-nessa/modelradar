import type { Provider } from "@/data/schema";

export const gitlab: Provider = {
  id: "gitlab",
  name: "GitLab Duo Chat",
  description:
    "GitLab's AI-powered coding assistant integrated into the GitLab DevOps platform. Provides AI chat and code completion within GitLab's CI/CD and repository workflows.",
  type: "aggregator",
  provider_access_type: "sub",
  status: "active",
  url: "https://about.gitlab.com/gitlab-duo",
  regions: ["us", "eu"],
  auth_type: "oauth",
  has_free_tier: true,
  billing_model: "subscription",
  sdk: [],
  openai_compatible: false,
};

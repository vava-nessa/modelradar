import type { Provider } from "@/data/schema";

export const opencode_go: Provider = {
  id: "opencode-go",
  name: "OpenCode Go",
  description:
    "Low-cost subscription service for coding agents offering reliable access to open-source models like GLM-5.1, GLM-5, Kimi K2.5, and MiniMax M2.5. Built for international users with models hosted in the US, EU, and Singapore.",
  type: "direct",
  status: "active",
  url: "https://opencode.ai/go",
  regions: ["us", "eu", "sgp"],
  auth_type: "api_key",
  billing_model: "subscription",
  sdk: [],
  openai_compatible: true,
};

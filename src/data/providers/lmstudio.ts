import type { Provider } from "@/data/schema";

export const lmstudio: Provider = {
  id: "lmstudio",
  name: "LM Studio",
  description:
    "Desktop app and local API server for running open-source LLMs locally. OpenAI-compatible API with privacy-first approach.",
  type: "self_hosted",
  provider_access_type: "local",
  status: "active",
  url: "https://lmstudio.ai",
  regions: [],
  auth_type: "local_only",
  has_free_tier: true,
  billing_model: "subscription",
  sdk: ["typescript", "python"],
  openai_compatible: true,
};

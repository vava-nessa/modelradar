import type { Provider } from "@/data/schema";

export const sambanova: Provider = {
  id: "sambanova",
  name: "SambaNova",
  description:
    "Enterprise AI platform offering high-performance inference. Known for Data流动 architecture and quick deployment of foundation models.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://cloud.sambanova.ai",
  regions: ["us"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "credits",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

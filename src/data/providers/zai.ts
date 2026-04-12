import type { Provider } from "@/data/schema";

export const zai: Provider = {
  id: "zai",
  name: "Z.ai",
  description:
    "AI platform offering access to Zhipu GLM models including GLM-4.5 and GLM-4.6 series with reasoning and multimodal capabilities. Focuses on coding and agentic workflows.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://z.ai",
  auth_type: "api_key",
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

import type { Provider } from "@/data/schema";

export const vivgrid: Provider = {
  id: "vivgrid",
  name: "Vivgrid",
  description:
    "AI agent infrastructure platform offering observability, debugging, evaluation, and globally distributed inference. Supports models like GPT-5, GLM-5, and DeepSeek with geo-distributed acceleration for low latency.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://www.vivgrid.com",
  regions: ["us", "eu", "apac"],
  auth_type: "api_key",
  billing_model: "pay_per_token",
  sdk: [],
  openai_compatible: true,
};

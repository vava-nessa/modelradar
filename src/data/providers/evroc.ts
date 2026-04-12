import type { Provider } from "@/data/schema";

export const evroc: Provider = {
  id: "evroc",
  name: "evroc",
  description:
    "European sovereign AI platform offering access to frontier models with data residency within EU borders. Provides shared and dedicated AI model endpoints through their Think platform.",
  type: "direct",
  status: "active",
  url: "https://evroc.com",
  regions: ["eu"],
  auth_type: "api_key",
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

import type { Provider } from "@/data/schema";

export const ionet: Provider = {
  id: "io-net",
  name: "IO.net",
  description:
    "IO.net is a distributed GPU cloud for AI inference. Offers access to distributed compute resources for running AI models at scale with competitive pricing.",
  type: "cloud",
  status: "active",
  url: "https://ionet.com",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

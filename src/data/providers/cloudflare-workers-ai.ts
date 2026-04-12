import type { Provider } from "@/data/schema";

export const cloudflareWorkersAI: Provider = {
  id: "cloudflare-workers-ai",
  name: "Cloudflare Workers AI",
  description:
    "Serverless GPU inference on Cloudflare's global network. Run open-source models close to users with pay-per-request pricing.",
  type: "cloud",
  status: "active",
  url: "https://developers.cloudflare.com/workers-ai",
  regions: ["global"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["typescript", "python", "rust"],
  openai_compatible: true,
};

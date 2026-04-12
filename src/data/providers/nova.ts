import type { Provider } from "@/data/schema";

export const nova: Provider = {
  id: "nova",
  name: "Amazon Nova",
  description:
    "Amazon Nova is a family of foundation models from AWS offering state-of-the-art intelligence and industry-leading price-performance. Available via Amazon Bedrock and nova.amazon.com for text and multimodal tasks.",
  type: "cloud",
  provider_access_type: "api",
  status: "active",
  url: "https://aws.amazon.com/nova/",
  regions: ["us", "eu", "asia"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "java"],
  openai_compatible: false,
  compliance: ["SOC2", "HIPAA", "GDPR"],
};

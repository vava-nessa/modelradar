import type { Provider } from "@/data/schema";

export const bedrock: Provider = {
  id: "bedrock",
  name: "AWS Bedrock",
  description: "AWS managed service for foundation models. Enterprise-grade with IAM, VPC, and cross-region inference.",
  type: "cloud",
  status: "active",
  url: "https://aws.amazon.com/bedrock",
  regions: ["us-east-1", "us-west-2", "eu-west-1", "ap-northeast-1"],
  auth_type: "iam",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript", "java", "dotnet"],
  openai_compatible: false,
  compliance: ["SOC2", "HIPAA", "GDPR", "FedRAMP"],
};

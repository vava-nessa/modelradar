import type { Provider } from "@/data/schema";

export const stepfun: Provider = {
  id: "stepfun",
  name: "StepFun",
  description:
    "Chinese AI company offering Step series models via direct API. Step models are OpenAI-compatible with competitive pricing.",
  type: "direct",
  status: "active",
  url: "https://platform.stepfun.com",
  regions: ["cn"],
  auth_type: "api_key",
  has_free_tier: false,
  billing_model: "pay_per_token",
  sdk: ["python", "typescript"],
  openai_compatible: true,
};

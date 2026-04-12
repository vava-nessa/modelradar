import type { Provider } from "@/data/schema";

export const venice: Provider = {
  id: "venice",
  name: "Venice",
  description:
    "Uncensored AI model API provider. Offers open-source models like Llama, Mistral, Qwen, and MiniMax with relaxed content policies. Focus on privacy and uncensored outputs.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://venice.ai",
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "pay_per_token",
  sdk: ["typescript", "python"],
  openai_compatible: true,
};
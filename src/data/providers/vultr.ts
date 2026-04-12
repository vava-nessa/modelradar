import type { Provider } from "@/data/schema";

export const vultr: Provider = {
  id: "vultr",
  name: "Vultr",
  description:
    "Serverless inference platform for GenAI applications with global, self-optimizing AI model deployment. Deploy on AMD MI355X or NVIDIA GPUs with OpenAI-compatible API, turnkey RAG, and private cluster options.",
  type: "cloud",
  status: "active",
  url: "https://www.vultr.com/products/cloud-inference/",
  regions: ["us", "eu", "apac"],
  auth_type: "api_key",
  billing_model: "pay_per_token",
  sdk: [],
  openai_compatible: true,
};

import type { Provider } from "@/data/schema";

export const nvidia: Provider = {
  id: "nvidia",
  name: "NVIDIA NIM",
  description:
    "NVIDIA NIM (NVIDIA Inference Microservices) provides optimized containers for self-hosting GPU-accelerated AI models. Offers enterprise-grade inference with prebuilt, optimized containers for pretrained and customized AI models across clouds, data centers, RTX AI PCs and workstations.",
  type: "cloud",
  provider_access_type: "api",
  status: "active",
  url: "https://developer.nvidia.com/nim",
  regions: ["us", "eu"],
  auth_type: "api_key",
  has_free_tier: true,
  billing_model: "enterprise",
  sdk: ["python", "typescript"],
  openai_compatible: true,
  compliance: ["SOC2"],
};

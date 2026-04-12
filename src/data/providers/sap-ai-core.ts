import type { Provider } from "@/data/schema";

export const sapAiCore: Provider = {
  id: "sap-ai-core",
  name: "SAP AI Core",
  description:
    "Enterprise AI platform from SAP providing access to foundation models through the Generative AI Hub. Integrates with SAP business processes.",
  type: "cloud",
  status: "active",
  url: "https://www.sap.com/products/artificial-intelligence/generative-ai-hub.html",
  billing_model: "enterprise",
  sdk: ["python"],
  openai_compatible: true,
};
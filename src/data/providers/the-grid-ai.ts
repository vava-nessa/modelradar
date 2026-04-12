import type { Provider } from "@/data/schema";

export const the_grid_ai: Provider = {
  id: "the-grid-ai",
  name: "The Grid AI",
  description:
    "AI models platform offering text generation models optimized for various use cases. Now part of Lightning AI. Provides text-max, text-prime, and text-standard models via OpenAI-compatible API.",
  type: "direct",
  provider_access_type: "api",
  status: "active",
  url: "https://www.grid.ai",
  auth_type: "api_key",
  sdk: [],
  openai_compatible: true,
};

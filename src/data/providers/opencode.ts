import type { Provider } from "@/data/schema";

export const opencode: Provider = {
  id: "opencode",
  name: "OpenCode",
  description:
    "Open source AI coding agent for terminal, IDE, and desktop. Access 75+ LLM providers through Models.dev integration, or use built-in free models. Supports any model from any provider including Claude, GPT, and Gemini.",
  type: "aggregator",
  status: "active",
  url: "https://opencode.ai",
  auth_type: "api_key",
  has_free_tier: true,
  sdk: [],
  openai_compatible: true,
};

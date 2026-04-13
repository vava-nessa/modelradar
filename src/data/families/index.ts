/**
 * @file Model families — groups model versions into the same lineage
 * @description Each family corresponds to a `family` field in Model.
 * 📖 Allows grouping/filtering models by lineage with context (name, description, creator).
 *
 * @exports allFamilies → ModelFamily[]
 */

import type { ModelFamily } from "@/data/schema";

export const allFamilies: ModelFamily[] = [
  // 📖 Anthropic
  {
    id: "claude-opus",
    name: "Claude Opus",
    creator: "anthropic",
    description:
      "Anthropic's most capable line — deep reasoning, complex analysis, extended autonomous coding.",
    url: "https://docs.anthropic.com/en/docs/about-claude/models",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet",
    creator: "anthropic",
    description:
      "Anthropic's balanced line — best mix of performance, speed, and cost for daily coding.",
    url: "https://docs.anthropic.com/en/docs/about-claude/models",
  },

  // 📖 OpenAI
  {
    id: "gpt-4o",
    name: "GPT-4o",
    creator: "openai",
    description:
      "OpenAI's versatile multimodal line with strong all-around performance.",
    url: "https://platform.openai.com/docs/models",
  },
  {
    id: "o3",
    name: "o3",
    creator: "openai",
    description:
      "OpenAI's advanced reasoning line with extended chain-of-thought.",
    url: "https://platform.openai.com/docs/models",
  },

  // 📖 Google
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    creator: "google",
    description:
      "Google's most capable line with massive context window and native multimodal.",
    url: "https://ai.google.dev/gemini-api/docs/models",
  },

  // 📖 Meta
  {
    id: "llama-4",
    name: "Llama 4",
    creator: "meta",
    description:
      "Meta's latest open-weight MoE family with massive context windows.",
    url: "https://llama.meta.com",
  },

  // 📖 Mistral
  {
    id: "mistral-small",
    name: "Mistral Small",
    creator: "mistral",
    description:
      "Mistral's efficient mid-size line — fast inference, good instruction following.",
    url: "https://docs.mistral.ai/models",
  },
  {
    id: "mistral-nemo",
    name: "Mistral Nemo",
    creator: "mistral",
    description:
      "Open-source 12B model optimized for efficiency and low cost.",
    url: "https://mistral.ai/news/mistral-nemo",
  },

  // 📖 DeepSeek
  {
    id: "deepseek-chat",
    name: "DeepSeek Chat",
    creator: "deepseek",
    description:
      "DeepSeek's conversational line — extremely competitive pricing.",
    url: "https://deepseek.com",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    creator: "deepseek",
    description:
      "DeepSeek's reasoning line — chain-of-thought with open-source variants.",
    url: "https://deepseek.com",
  },

  // 📖 Microsoft
  {
    id: "phi-4",
    name: "Phi-4",
    creator: "microsoft",
    description:
      "Microsoft's small model line — strong reasoning for its size.",
    url: "https://huggingface.co/microsoft/phi-4",
  },
  {
    id: "phi-4-mini",
    name: "Phi-4 Mini",
    creator: "microsoft",
    description: "Ultra-compact model for speed and edge deployment.",
    url: "https://huggingface.co/microsoft/phi-4-mini",
  },
];

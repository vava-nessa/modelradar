/**
 * @file sources.js — copied from free-coding-models repository
 * @description All model definitions organized by provider/source.
 * Each source has models array with [model_id, display_label, tier, swe_score, ctx].
 *
 * Tier scale (based on SWE-bench Verified):
 * - S+: 70%+ (elite frontier coders)
 * - S:  60-70% (excellent)
 * - A+: 50-60% (great)
 * - A:  40-50% (good)
 * - A-: 35-40% (decent)
 * - B+: 30-35% (average)
 * - B:  20-30% (below average)
 * - C:  <20% (lightweight/edge)
 *
 * @exports MODELS — flat array of [modelId, label, tier, sweScore, ctx, providerKey]
 */

export const MODELS: [string, string, string, string, string, string][] = [
  // ── NVIDIA NIM ──
  ["deepseek-ai/deepseek-v3.2", "DeepSeek V3.2", "S+", "73.1%", "128k", "nvidia"],
  ["moonshotai/kimi-k2.5", "Kimi K2.5", "S+", "76.8%", "128k", "nvidia"],
  ["z-ai/glm5", "GLM 5", "S+", "77.8%", "128k", "nvidia"],
  ["z-ai/glm4.7", "GLM 4.7", "S+", "73.8%", "200k", "nvidia"],
  ["moonshotai/kimi-k2-thinking", "Kimi K2 Thinking", "S+", "71.3%", "256k", "nvidia"],
  ["minimaxai/minimax-m2.1", "MiniMax M2.1", "S+", "74.0%", "200k", "nvidia"],
  ["minimaxai/minimax-m2.5", "MiniMax M2.5", "S+", "80.2%", "200k", "nvidia"],
  ["stepfun-ai/step-3.5-flash", "Step 3.5 Flash", "S+", "74.4%", "256k", "nvidia"],
  ["qwen/qwen3-coder-480b-a35b-instruct", "Qwen3 Coder 480B", "S+", "70.6%", "256k", "nvidia"],
  ["qwen/qwen3-235b-a22b", "Qwen3 235B", "S+", "70.0%", "128k", "nvidia"],
  ["mistralai/devstral-2-123b-instruct-2512", "Devstral 2 123B", "S+", "72.2%", "256k", "nvidia"],
  ["deepseek-ai/deepseek-v3.1-terminus", "DeepSeek V3.1 Term", "S", "68.4%", "128k", "nvidia"],
  ["moonshotai/kimi-k2-instruct-0905", "Kimi K2 Instruct 0905", "S", "65.8%", "256k", "nvidia"],
  ["moonshotai/kimi-k2-instruct", "Kimi K2 Instruct", "S", "65.8%", "128k", "nvidia"],
  ["minimaxai/minimax-m2", "MiniMax M2", "S", "69.4%", "128k", "nvidia"],
  ["qwen/qwen3-next-80b-a3b-thinking", "Qwen3 80B Thinking", "S", "68.0%", "128k", "nvidia"],
  ["qwen/qwen3-next-80b-a3b-instruct", "Qwen3 80B Instruct", "S", "65.0%", "128k", "nvidia"],
  ["qwen/qwen3.5-397b-a17b", "Qwen3.5 400B VLM", "S", "68.0%", "128k", "nvidia"],
  ["openai/gpt-oss-120b", "GPT OSS 120B", "S", "60.0%", "128k", "nvidia"],
  ["meta/llama-4-maverick-17b-128e-instruct", "Llama 4 Maverick", "S", "62.0%", "1M", "nvidia"],
  ["deepseek-ai/deepseek-v3.1", "DeepSeek V3.1", "S", "62.0%", "128k", "nvidia"],
  ["nvidia/llama-3.1-nemotron-ultra-253b-v1", "Nemotron Ultra 253B", "A+", "56.0%", "128k", "nvidia"],
  ["mistralai/mistral-large-3-675b-instruct-2512", "Mistral Large 675B", "A+", "58.0%", "256k", "nvidia"],
  ["qwen/qwq-32b", "QwQ 32B", "A+", "50.0%", "131k", "nvidia"],
  ["igenius/colosseum_355b_instruct_16k", "Colosseum 355B", "A+", "52.0%", "16k", "nvidia"],
  ["mistralai/mistral-medium-3-instruct", "Mistral Medium 3", "A", "48.0%", "128k", "nvidia"],
  ["mistralai/magistral-small-2506", "Magistral Small", "A", "45.0%", "32k", "nvidia"],
  ["nvidia/llama-3.3-nemotron-super-49b-v1.5", "Nemotron Super 49B", "A", "49.0%", "128k", "nvidia"],
  ["meta/llama-4-scout-17b-16e-instruct", "Llama 4 Scout", "A", "44.0%", "10M", "nvidia"],
  ["nvidia/nemotron-3-nano-30b-a3b", "Nemotron Nano 30B", "A", "43.0%", "128k", "nvidia"],
  ["deepseek-ai/deepseek-r1-distill-qwen-32b", "R1 Distill 32B", "A", "43.9%", "128k", "nvidia"],
  ["openai/gpt-oss-20b", "GPT OSS 20B", "A", "42.0%", "128k", "nvidia"],
  ["qwen/qwen2.5-coder-32b-instruct", "Qwen2.5 Coder 32B", "A", "46.0%", "32k", "nvidia"],
  ["meta/llama-3.1-405b-instruct", "Llama 3.1 405B", "A", "44.0%", "128k", "nvidia"],
  ["meta/llama-3.3-70b-instruct", "Llama 3.3 70B", "A-", "39.5%", "128k", "nvidia"],
  ["deepseek-ai/deepseek-r1-distill-qwen-14b", "R1 Distill 14B", "A-", "37.7%", "64k", "nvidia"],
  ["bytedance/seed-oss-36b-instruct", "Seed OSS 36B", "A-", "38.0%", "32k", "nvidia"],
  ["stockmark/stockmark-2-100b-instruct", "Stockmark 100B", "A-", "36.0%", "32k", "nvidia"],
  ["mistralai/mixtral-8x22b-instruct-v0.1", "Mixtral 8x22B", "B+", "32.0%", "64k", "nvidia"],
  ["mistralai/ministral-14b-instruct-2512", "Ministral 14B", "B+", "34.0%", "32k", "nvidia"],
  ["ibm/granite-34b-code-instruct", "Granite 34B Code", "B+", "30.0%", "32k", "nvidia"],
  ["deepseek-ai/deepseek-r1-distill-llama-8b", "R1 Distill 8B", "B", "28.2%", "32k", "nvidia"],
  ["deepseek-ai/deepseek-r1-distill-qwen-7b", "R1 Distill 7B", "B", "22.6%", "32k", "nvidia"],
  ["google/gemma-2-9b-it", "Gemma 2 9B", "C", "18.0%", "8k", "nvidia"],
  ["microsoft/phi-3.5-mini-instruct", "Phi 3.5 Mini", "C", "12.0%", "128k", "nvidia"],
  ["microsoft/phi-4-mini-instruct", "Phi 4 Mini", "C", "14.0%", "128k", "nvidia"],

  // ── Groq ──
  ["llama-3.3-70b-versatile", "Llama 3.3 70B", "A-", "39.5%", "128k", "groq"],
  ["meta-llama/llama-4-scout-17b-16e-instruct", "Llama 4 Scout", "A", "44.0%", "131k", "groq"],
  ["llama-3.1-8b-instant", "Llama 3.1 8B", "B", "28.8%", "128k", "groq"],
  ["openai/gpt-oss-120b", "GPT OSS 120B", "S", "60.0%", "128k", "groq"],
  ["openai/gpt-oss-20b", "GPT OSS 20B", "A", "42.0%", "128k", "groq"],
  ["qwen/qwen3-32b", "Qwen3 32B", "A+", "50.0%", "131k", "groq"],
  ["groq/compound", "Groq Compound", "A", "45.0%", "131k", "groq"],
  ["groq/compound-mini", "Groq Compound Mini", "B+", "32.0%", "131k", "groq"],

  // ── Cerebras ──
  ["gpt-oss-120b", "GPT OSS 120B", "S", "60.0%", "128k", "cerebras"],
  ["qwen-3-235b-a22b-instruct-2507", "Qwen3 235B", "S+", "70.0%", "128k", "cerebras"],
  ["llama3.1-8b", "Llama 3.1 8B", "B", "28.8%", "128k", "cerebras"],
  ["zai-glm-4.7", "GLM 4.7", "S+", "73.8%", "200k", "cerebras"],

  // ── SambaNova ──
  ["MiniMax-M2.5", "MiniMax M2.5", "S+", "74.0%", "160k", "sambanova"],
  ["DeepSeek-R1-0528", "DeepSeek R1 0528", "S", "61.0%", "128k", "sambanova"],
  ["DeepSeek-V3.1", "DeepSeek V3.1", "S", "62.0%", "128k", "sambanova"],
  ["DeepSeek-V3-0324", "DeepSeek V3 0324", "S", "62.0%", "128k", "sambanova"],
  ["DeepSeek-V3.2", "DeepSeek V3.2", "S+", "73.1%", "8k", "sambanova"],
  ["Llama-4-Maverick-17B-128E-Instruct", "Llama 4 Maverick", "S", "62.0%", "1M", "sambanova"],
  ["gpt-oss-120b", "GPT OSS 120B", "S", "60.0%", "128k", "sambanova"],
  ["DeepSeek-V3.1-Terminus", "DeepSeek V3.1 Term", "S", "68.4%", "128k", "sambanova"],
  ["Qwen3-32B", "Qwen3 32B", "A+", "50.0%", "128k", "sambanova"],
  ["Qwen3-235B-A22B-Instruct-2507", "Qwen3 235B Instruct 2507", "S+", "70.0%", "64k", "sambanova"],
  ["DeepSeek-R1-Distill-Llama-70B", "R1 Distill 70B", "A", "43.9%", "128k", "sambanova"],
  ["Meta-Llama-3.3-70B-Instruct", "Llama 3.3 70B", "A-", "39.5%", "128k", "sambanova"],
  ["Meta-Llama-3.1-8B-Instruct", "Llama 3.1 8B", "B", "28.8%", "128k", "sambanova"],

  // ── OpenRouter (FREE models) ──
  ["qwen/qwen3.6-plus:free", "Qwen3.6 Plus", "S+", "78.8%", "1M", "openrouter"],
  ["qwen/qwen3-coder:free", "Qwen3 Coder 480B", "S+", "70.6%", "262k", "openrouter"],
  ["minimax/minimax-m2.5:free", "MiniMax M2.5", "S+", "74.0%", "197k", "openrouter"],
  ["z-ai/glm-4.5-air:free", "GLM 4.5 Air", "S+", "72.0%", "131k", "openrouter"],
  ["stepfun/step-3.5-flash:free", "Step 3.5 Flash", "S+", "74.4%", "256k", "openrouter"],
  ["arcee-ai/trinity-large-preview:free", "Arcee Trinity Large", "S+", "60.0%", "131k", "openrouter"],
  ["xiaomi/mimo-v2-flash:free", "MiMo V2 Flash", "S+", "73.4%", "262k", "openrouter"],
  ["deepseek/deepseek-r1-0528:free", "DeepSeek R1 0528", "S", "61.0%", "164k", "openrouter"],
  ["nvidia/nemotron-3-super-120b-a12b:free", "Nemotron 3 Super", "A+", "56.0%", "262k", "openrouter"],
  ["qwen/qwen3-next-80b-a3b-instruct:free", "Qwen3 80B Instruct", "S", "65.0%", "131k", "openrouter"],
  ["arcee-ai/trinity-mini:free", "Arcee Trinity Mini", "A", "40.0%", "131k", "openrouter"],
  ["nvidia/nemotron-nano-12b-v2-vl:free", "Nemotron Nano 12B VL", "A", "20.0%", "128k", "openrouter"],
  ["nvidia/nemotron-nano-9b-v2:free", "Nemotron Nano 9B", "B+", "18.0%", "128k", "openrouter"],
  ["nousresearch/hermes-3-llama-3.1-405b:free", "Hermes 3 405B", "A", "44.0%", "131k", "openrouter"],
  ["openai/gpt-oss-120b:free", "GPT OSS 120B", "S", "60.0%", "131k", "openrouter"],
  ["openai/gpt-oss-20b:free", "GPT OSS 20B", "A", "42.0%", "131k", "openrouter"],
  ["nvidia/nemotron-3-nano-30b-a3b:free", "Nemotron Nano 30B", "A", "43.0%", "128k", "openrouter"],
  ["cognitivecomputations/dolphin-mistral-24b-venice-edition:free", "Dolphin Mistral 24B", "B+", "30.0%", "33k", "openrouter"],
  ["meta-llama/llama-3.3-70b-instruct:free", "Llama 3.3 70B", "A-", "39.5%", "131k", "openrouter"],
  ["mistralai/mistral-small-3.1-24b-instruct:free", "Mistral Small 3.1", "B+", "30.0%", "128k", "openrouter"],
  ["google/gemma-3-27b-it:free", "Gemma 3 27B", "B", "22.0%", "131k", "openrouter"],
  ["google/gemma-3-12b-it:free", "Gemma 3 12B", "C", "15.0%", "131k", "openrouter"],
  ["qwen/qwen3-4b:free", "Qwen3 4B", "C", "15.0%", "41k", "openrouter"],
  ["google/gemma-3n-e4b-it:free", "Gemma 3n E4B", "C", "10.0%", "8k", "openrouter"],
  ["google/gemma-3-4b-it:free", "Gemma 3 4B", "C", "10.0%", "33k", "openrouter"],

  // ── Hugging Face ──
  ["deepseek-ai/DeepSeek-V3-0324", "DeepSeek V3 0324", "S", "62.0%", "128k", "huggingface"],
  ["Qwen/Qwen2.5-Coder-32B-Instruct", "Qwen2.5 Coder 32B", "A", "46.0%", "32k", "huggingface"],

  // ── Replicate ──
  ["deepseek-ai/DeepSeek-V3-0324", "DeepSeek V3 0324", "S", "62.0%", "128k", "replicate"],
  ["meta/llama-3.3-70b-instruct", "Llama 3.3 70B", "A-", "39.5%", "128k", "replicate"],

  // ── DeepInfra ──
  ["nvidia/Nemotron-3-Super", "Nemotron 3 Super", "A+", "56.0%", "128k", "deepinfra"],
  ["deepseek-ai/DeepSeek-V3-0324", "DeepSeek V3 0324", "S", "62.0%", "128k", "deepinfra"],
  ["Qwen/Qwen3-235B-A22B", "Qwen3 235B", "S+", "70.0%", "128k", "deepinfra"],
  ["meta-llama/Meta-Llama-3.1-70B-Instruct", "Llama 3.1 70B", "A-", "39.5%", "128k", "deepinfra"],

  // ── Fireworks AI ──
  ["accounts/fireworks/models/deepseek-v3", "DeepSeek V3", "S", "62.0%", "128k", "fireworks"],
  ["accounts/fireworks/models/deepseek-r1", "DeepSeek R1", "S", "61.0%", "128k", "fireworks"],
  ["accounts/fireworks/models/llama4-maverick-instruct-basic", "Llama 4 Maverick", "S", "62.0%", "1M", "fireworks"],
  ["accounts/fireworks/models/qwen3-235b-a22b", "Qwen3 235B", "S+", "70.0%", "128k", "fireworks"],

  // ── Codestral (Mistral) ──
  ["codestral-latest", "Codestral", "B+", "34.0%", "256k", "codestral"],

  // ── Hyperbolic ──
  ["qwen/qwen3-coder-480b-a35b-instruct", "Qwen3 Coder 480B", "S+", "70.6%", "256k", "hyperbolic"],
  ["deepseek-ai/DeepSeek-R1-0528", "DeepSeek R1 0528", "S", "61.0%", "128k", "hyperbolic"],
  ["moonshotai/Kimi-K2-Instruct", "Kimi K2 Instruct", "S", "65.8%", "131k", "hyperbolic"],
  ["openai/gpt-oss-120b", "GPT OSS 120B", "S", "60.0%", "128k", "hyperbolic"],
  ["Qwen/Qwen3-235B-A22B-Instruct-2507", "Qwen3 235B 2507", "S+", "70.0%", "262k", "hyperbolic"],
  ["Qwen/Qwen3-235B-A22B", "Qwen3 235B", "S+", "70.0%", "128k", "hyperbolic"],
  ["qwen/qwen3-next-80b-a3b-instruct", "Qwen3 80B Instruct", "S", "65.0%", "128k", "hyperbolic"],
  ["Qwen/Qwen3-Next-80B-A3B-Thinking", "Qwen3 80B Thinking", "S", "68.0%", "128k", "hyperbolic"],
  ["deepseek-ai/DeepSeek-V3-0324", "DeepSeek V3 0324", "S", "62.0%", "128k", "hyperbolic"],
  ["openai/gpt-oss-20b", "GPT OSS 20B", "A", "42.0%", "131k", "hyperbolic"],
  ["Qwen/Qwen2.5-Coder-32B-Instruct", "Qwen2.5 Coder 32B", "A", "46.0%", "32k", "hyperbolic"],
  ["meta-llama/Llama-3.3-70B-Instruct", "Llama 3.3 70B", "A-", "39.5%", "128k", "hyperbolic"],
  ["meta-llama/Meta-Llama-3.1-405B-Instruct", "Llama 3.1 405B", "A", "44.0%", "128k", "hyperbolic"],

  // ── Scaleway ──
  ["devstral-2-123b-instruct-2512", "Devstral 2 123B", "S+", "72.2%", "256k", "scaleway"],
  ["qwen3.5-397b-a17b", "Qwen3.5 400B VLM", "S", "68.0%", "250k", "scaleway"],
  ["mistral/mistral-large-3-675b-instruct-2512", "Mistral Large 675B", "A+", "58.0%", "250k", "scaleway"],
  ["qwen3-235b-a22b-instruct-2507", "Qwen3 235B", "S+", "70.0%", "128k", "scaleway"],
  ["gpt-oss-120b", "GPT OSS 120B", "S", "60.0%", "131k", "scaleway"],
  ["qwen3-coder-30b-a3b-instruct", "Qwen3 Coder 30B", "A+", "55.0%", "32k", "scaleway"],
  ["holo2-30b-a3b", "Holo2 30B", "A+", "52.0%", "131k", "scaleway"],
  ["llama-3.3-70b-instruct", "Llama 3.3 70B", "A-", "39.5%", "128k", "scaleway"],
  ["deepseek-r1-distill-llama-70b", "R1 Distill 70B", "A", "43.9%", "128k", "scaleway"],
  ["mistral-small-3.2-24b-instruct-2506", "Mistral Small 3.2", "B+", "30.0%", "128k", "scaleway"],

  // ── Google AI Studio ──
  ["gemma-4-31b-it", "Gemma 4 31B", "B+", "45.0%", "256k", "googleai"],
  ["gemma-4-26b-a4b-it", "Gemma 4 26B MoE", "B+", "42.0%", "256k", "googleai"],
  ["gemma-3-27b-it", "Gemma 3 27B", "B", "22.0%", "128k", "googleai"],
  ["gemma-3-12b-it", "Gemma 3 12B", "C", "15.0%", "128k", "googleai"],
  ["gemma-4-e4b-it", "Gemma 4 E4B", "C", "12.0%", "128k", "googleai"],
  ["gemma-3-4b-it", "Gemma 3 4B", "C", "10.0%", "128k", "googleai"],

  // ── ZAI ──
  ["zai/glm-5", "GLM-5", "S+", "77.8%", "128k", "zai"],
  ["zai/glm-4.7", "GLM-4.7", "S+", "73.8%", "200k", "zai"],
  ["zai/glm-4.7-flash", "GLM-4.7-Flash", "S", "59.2%", "200k", "zai"],
  ["zai/glm-4.5", "GLM-4.5", "S+", "75.0%", "128k", "zai"],
  ["zai/glm-4.5-air", "GLM-4.5-Air", "S+", "72.0%", "128k", "zai"],
  ["zai/glm-4.5-flash", "GLM-4.5-Flash", "S", "59.2%", "128k", "zai"],
  ["zai/glm-4.6", "GLM-4.6", "S+", "70.0%", "128k", "zai"],

  // ── SiliconFlow ──
  ["Qwen/Qwen3-Coder-480B-A35B-Instruct", "Qwen3 Coder 480B", "S+", "70.6%", "256k", "siliconflow"],
  ["deepseek-ai/DeepSeek-V3.2", "DeepSeek V3.2", "S+", "73.1%", "128k", "siliconflow"],
  ["Qwen/Qwen3-235B-A22B", "Qwen3 235B", "S+", "70.0%", "128k", "siliconflow"],
  ["deepseek-ai/DeepSeek-R1", "DeepSeek R1", "S", "61.0%", "128k", "siliconflow"],
  ["Qwen/Qwen3-Coder-30B-A3B-Instruct", "Qwen3 Coder 30B", "A+", "55.0%", "32k", "siliconflow"],
  ["Qwen/Qwen2.5-Coder-32B-Instruct", "Qwen2.5 Coder 32B", "A", "46.0%", "32k", "siliconflow"],

  // ── Together AI ──
  ["moonshotai/Kimi-K2.5", "Kimi K2.5", "S+", "76.8%", "128k", "together"],
  ["MiniMaxAI/MiniMax-M2.5", "MiniMax M2.5", "S+", "80.2%", "228k", "together"],
  ["zai-org/GLM-5", "GLM-5", "S+", "77.8%", "128k", "together"],
  ["Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8", "Qwen3 Coder 480B", "S+", "70.6%", "256k", "together"],
  ["deepseek-ai/DeepSeek-V3.2", "DeepSeek V3.2", "S+", "73.1%", "164k", "together"],
  ["MiniMaxAI/MiniMax-M2.1", "MiniMax M2.1", "S+", "74.0%", "197k", "together"],
  ["Qwen/Qwen3.5-397B-A17B", "Qwen3.5 400B VLM", "S", "68.0%", "250k", "together"],
  ["deepseek-ai/DeepSeek-V3.1", "DeepSeek V3.1", "S", "62.0%", "164k", "together"],
  ["deepseek-ai/DeepSeek-V3.1-Terminus", "DeepSeek V3.1 Term", "S", "68.4%", "164k", "together"],
  ["deepseek-ai/DeepSeek-R1", "DeepSeek R1", "S", "61.0%", "164k", "together"],
  ["openai/gpt-oss-120b", "GPT OSS 120B", "S", "60.0%", "131k", "together"],
  ["Qwen/Qwen3-235B-A22B-Instruct-2507", "Qwen3 235B 2507", "S+", "70.0%", "131k", "together"],
  ["MiniMaxAI/MiniMax-M2", "MiniMax M2", "S", "69.4%", "197k", "together"],
  ["nvidia/Nemotron-3-Super-120B-A12B", "Nemotron 3 Super", "A+", "56.0%", "128k", "together"],
  ["nvidia/Nemotron-3-Nano-30B-A3B", "Nemotron Nano 30B", "A", "43.0%", "262k", "together"],
  ["Qwen/Qwen3-Coder-30B-A3B-Instruct", "Qwen3 Coder 30B", "A+", "55.0%", "160k", "together"],
  ["meta-llama/Llama-4-Scout-17B-16E-Instruct", "Llama 4 Scout", "A", "44.0%", "328k", "together"],
  ["openai/gpt-oss-20b", "GPT OSS 20B", "A", "42.0%", "131k", "together"],
  ["meta-llama/Llama-3.3-70B-Instruct-Turbo", "Llama 3.3 70B", "A-", "39.5%", "128k", "together"],

  // ── Cloudflare Workers AI ──
  ["@cf/moonshotai/kimi-k2.5", "Kimi K2.5", "S+", "76.8%", "256k", "cloudflare"],
  ["@cf/zhipu/glm-4.7-flash", "GLM-4.7-Flash", "S", "59.2%", "131k", "cloudflare"],
  ["@cf/openai/gpt-oss-120b", "GPT OSS 120B", "S", "60.0%", "128k", "cloudflare"],
  ["@cf/qwen/qwq-32b", "QwQ 32B", "A+", "50.0%", "131k", "cloudflare"],
  ["@cf/meta/llama-4-scout-17b-16e-instruct", "Llama 4 Scout", "A", "44.0%", "131k", "cloudflare"],
  ["@cf/nvidia/nemotron-3-120b-a12b", "Nemotron 3 Super", "A+", "56.0%", "128k", "cloudflare"],
  ["@cf/qwen/qwen3-30b-a3b-fp8", "Qwen3 30B MoE", "A", "45.0%", "128k", "cloudflare"],
  ["@cf/qwen/qwen2.5-coder-32b-instruct", "Qwen2.5 Coder 32B", "A", "46.0%", "32k", "cloudflare"],
  ["@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", "R1 Distill 32B", "A", "43.9%", "128k", "cloudflare"],
  ["@cf/openai/gpt-oss-20b", "GPT OSS 20B", "A", "42.0%", "128k", "cloudflare"],
  ["@cf/meta/llama-3.3-70b-instruct-fp8-fast", "Llama 3.3 70B", "A-", "39.5%", "128k", "cloudflare"],
  ["@cf/google/gemma-4-26b-a4b-it", "Gemma 4 26B MoE", "A-", "38.0%", "256k", "cloudflare"],
  ["@cf/mistralai/mistral-small-3.1-24b-instruct", "Mistral Small 3.1", "B+", "30.0%", "128k", "cloudflare"],
  ["@cf/ibm/granite-4.0-h-micro", "Granite 4.0 Micro", "B+", "30.0%", "128k", "cloudflare"],
  ["@cf/meta/llama-3.1-8b-instruct", "Llama 3.1 8B", "B", "28.8%", "128k", "cloudflare"],

  // ── Perplexity ──
  ["sonar-reasoning-pro", "Sonar Reasoning Pro", "A+", "50.0%", "128k", "perplexity"],
  ["sonar-reasoning", "Sonar Reasoning", "A", "45.0%", "128k", "perplexity"],
  ["sonar-pro", "Sonar Pro", "B+", "32.0%", "128k", "perplexity"],
  ["sonar", "Sonar", "B", "25.0%", "128k", "perplexity"],

  // ── Alibaba DashScope (Qwen) ──
  ["qwen3.6-plus", "Qwen3.6 Plus", "S+", "78.8%", "1M", "qwen"],
  ["qwen3-coder-plus", "Qwen3 Coder Plus", "S+", "69.6%", "256k", "qwen"],
  ["qwen3-coder-480b-a35b-instruct", "Qwen3 Coder 480B", "S+", "70.6%", "256k", "qwen"],
  ["qwen3.5-plus", "Qwen3.5 Plus", "S", "68.0%", "1M", "qwen"],
  ["qwen3-coder-max", "Qwen3 Coder Max", "S", "67.0%", "256k", "qwen"],
  ["qwen3-coder-next", "Qwen3 Coder Next", "S", "65.0%", "256k", "qwen"],
  ["qwen3-235b-a22b-instruct", "Qwen3 235B", "S", "70.0%", "256k", "qwen"],
  ["qwen3-next-80b-a3b-instruct", "Qwen3 80B Instruct", "S", "65.0%", "128k", "qwen"],
  ["qwen3-32b", "Qwen3 32B", "A+", "50.0%", "128k", "qwen"],
  ["qwen2.5-coder-32b-instruct", "Qwen2.5 Coder 32B", "A", "46.0%", "32k", "qwen"],
  ["qwen3.5-flash", "Qwen3.5 Flash", "B+", "55.0%", "1M", "qwen"],

  // ── iFlow ──
  ["TBStars2-200B-A13B", "TBStars2 200B", "S+", "77.8%", "128k", "iflow"],
  ["deepseek-v3.2", "DeepSeek V3.2", "S+", "73.1%", "128k", "iflow"],
  ["qwen3-coder-plus", "Qwen3 Coder Plus", "S+", "72.0%", "256k", "iflow"],
  ["qwen3-235b-a22b-instruct", "Qwen3 235B", "S+", "70.0%", "256k", "iflow"],
  ["deepseek-r1", "DeepSeek R1", "S+", "70.6%", "128k", "iflow"],
  ["kimi-k2", "Kimi K2", "S", "65.8%", "128k", "iflow"],
  ["kimi-k2-0905", "Kimi K2 0905", "S", "68.0%", "256k", "iflow"],
  ["glm-4.6", "GLM 4.6", "S", "62.0%", "200k", "iflow"],
  ["deepseek-v3", "DeepSeek V3", "S", "62.0%", "128k", "iflow"],
  ["qwen3-32b", "Qwen3 32B", "A+", "50.0%", "128k", "iflow"],
  ["qwen3-max", "Qwen3 Max", "A+", "55.0%", "256k", "iflow"],

  // ── Chutes AI ──
  ["deepseek-ai/DeepSeek-R1", "DeepSeek R1", "S", "61.0%", "64k", "chutes"],
  ["meta-llama/Llama-3.1-70B-Instruct", "Llama 3.1 70B", "A-", "39.5%", "128k", "chutes"],
  ["Qwen/Qwen2.5-72B-Instruct", "Qwen 2.5 72B", "A", "42.0%", "32k", "chutes"],
  ["Qwen/Qwen2.5-Coder-32B-Instruct", "Qwen2.5 Coder 32B", "A", "46.0%", "32k", "chutes"],

  // ── OVHcloud ──
  ["Qwen3-Coder-30B-A3B-Instruct", "Qwen3 Coder 30B MoE", "A+", "55.0%", "256k", "ovhcloud"],
  ["gpt-oss-120b", "GPT OSS 120B", "S", "60.0%", "131k", "ovhcloud"],
  ["gpt-oss-20b", "GPT OSS 20B", "A", "42.0%", "131k", "ovhcloud"],
  ["Meta-Llama-3_3-70B-Instruct", "Llama 3.3 70B", "A-", "39.5%", "131k", "ovhcloud"],
  ["Qwen3-32B", "Qwen3 32B", "A+", "50.0%", "32k", "ovhcloud"],
  ["DeepSeek-R1-Distill-Llama-70B", "R1 Distill 70B", "A-", "40.0%", "131k", "ovhcloud"],
  ["Mistral-Small-3.2-24B-Instruct-2506", "Mistral Small 3.2", "B+", "34.0%", "131k", "ovhcloud"],
  ["Llama-3.1-8B-Instruct", "Llama 3.1 8B", "B", "28.8%", "131k", "ovhcloud"],

  // ── Rovo Dev CLI (CLI only, no API) ──
  ["anthropic/claude-sonnet-4.6", "Claude Sonnet 4.6", "S+", "75.0%", "200k", "rovo"],
  ["anthropic/claude-opus-4.6", "Claude Opus 4.6", "S+", "80.0%", "200k", "rovo"],
  ["openai/gpt-5.2", "GPT-5.2", "S+", "72.0%", "400k", "rovo"],
  ["openai/gpt-5.2-codex", "GPT-5.2 Codex", "S+", "74.0%", "400k", "rovo"],
  ["anthropic/claude-haiku-4.5", "Claude Haiku 4.5", "A+", "50.0%", "200k", "rovo"],

  // ── Gemini CLI (CLI only, no API) ──
  ["google/gemini-3.1-pro", "Gemini 3.1 Pro", "S+", "78.0%", "1M", "gemini"],
  ["google/gemini-2.5-pro", "Gemini 2.5 Pro", "S+", "63.2%", "1M", "gemini"],
  ["google/gemini-2.5-flash", "Gemini 2.5 Flash", "A+", "50.0%", "1M", "gemini"],

  // ── OpenCode Zen (OpenCode only, free) ──
  ["big-pickle", "Big Pickle", "S+", "72.0%", "200k", "opencode-zen"],
  ["mimo-v2-pro-free", "MiMo V2 Pro Free", "S+", "75.0%", "1M", "opencode-zen"],
  ["mimo-v2-flash-free", "MiMo V2 Flash Free", "S+", "73.4%", "262k", "opencode-zen"],
  ["mimo-v2-omni-free", "MiMo V2 Omni Free", "S+", "73.0%", "262k", "opencode-zen"],
  ["gpt-5-nano", "GPT 5 Nano", "S", "65.0%", "400k", "opencode-zen"],
  ["minimax-m2.5-free", "MiniMax M2.5 Free", "S+", "80.2%", "200k", "opencode-zen"],
  ["nemotron-3-super-free", "Nemotron 3 Super Free", "A+", "52.0%", "1M", "opencode-zen"],
];

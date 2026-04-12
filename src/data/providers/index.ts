/**
 * @file Providers aggregation
 * @description Collects all individual provider files into a single array.
 * 📖 To add a provider: create a new file in this folder, then add it here.
 *
 * @exports allProviders → Provider[]
 */

import type { Provider } from "@/data/schema";

import { anthropic } from "./anthropic";
import { azure } from "./azure";
import { bedrock } from "./bedrock";
import { cerebras } from "./cerebras";
import { clarifai } from "./clarifai";
import { cloudflareWorkersAI } from "./cloudflare-workers-ai";
import { cohere } from "./cohere";
import { deepinfra } from "./deepinfra";
import { deepseek } from "./deepseek";
import { fireworks_ai } from "./fireworks-ai";
import { githubCopilot } from "./github-copilot";
import { githubModels } from "./github-models";
import { google } from "./google";
import { groq } from "./groq";
import { helicone } from "./helicone";
import { sapAiCore } from "./sap-ai-core";
import { cortecs } from "./cortecs";
import { drun } from "./drun";
import { evroc } from "./evroc";
import { moark } from "./moark";
import { mixlayer } from "./mixlayer";
import { nanoGpt } from "./nano-gpt";
import { llmgateway } from "./llmgateway";
import { morph } from "./morph";
import { qiniuAi } from "./qiniu-ai";
import { alibaba } from "./alibaba";
import { alibabaCn } from "./alibaba-cn";
import { huggingface } from "./huggingface";
import { lmstudio } from "./lmstudio";
import { mistral } from "./mistral";
import { nebius } from "./nebius";
import { novita_ai } from "./novita-ai";
import { ollamaCloud } from "./ollama-cloud";
import { openai } from "./openai";
import { openrouter } from "./openrouter";
import { perplexity } from "./perplexity";
import { perplexityAgent } from "./perplexity-agent";
import { scaleway } from "./scaleway";
import { stackit } from "./stackit";
import { togetherai } from "./togetherai";
import { upstage } from "./upstage";
import { v0 } from "./v0";
import { venice } from "./venice";
import { wandb } from "./wandb";
import { vercel } from "./vercel";
import { xai } from "./xai";
import { xiaomi } from "./xiaomi";
import { xiaomiTokenPlanAms } from "./xiaomi-token-plan-ams";
import { xiaomiTokenPlanCn } from "./xiaomi-token-plan-cn";
import { xiaomiTokenPlanSgp } from "./xiaomi-token-plan-sgp";
import { minimax } from "./minimax";
import { moonshotai } from "./moonshotai";
import { stepfun } from "./stepfun";
import { zhipuai } from "./zhipuai";
import { modelscope } from "./modelscope";
import { siliconflow } from "./siliconflow";
import { siliconflowCn } from "./siliconflow-cn";
import { abacus } from "./abacus";
import { aihubmix } from "./aihubmix";
import { ai302 } from "./302ai";
import { jiekou } from "./jiekou";
import { baseten } from "./baseten";
import { cloudflareAiGateway } from "./cloudflare-ai-gateway";
import { dinference } from "./dinference";
import { fastrouter } from "./fastrouter";
import { friendli } from "./friendli";
import { ionet } from "./io-net";
import { kimiForCoding } from "./kimi-for-coding";
import { llama } from "./llama";
import { nvidia } from "./nvidia";
import { nova } from "./nova";
import { privatemodeAi } from "./privatemode-ai";
import { opencode_go } from "./opencode-go";
import { opencode } from "./opencode";
import { inception } from "./inception";
import { ovhcloud } from "./ovhcloud";
import { requesty } from "./requesty";
import { the_grid_ai } from "./the-grid-ai";
import { submodel } from "./submodel";
import { synthetic } from "./synthetic";
import { vivgrid } from "./vivgrid";
import { vultr } from "./vultr";
import { firmware } from "./firmware";

export const allProviders: Provider[] = [
  anthropic,
  openai,
  openrouter,
  bedrock,
  mistral,
  deepseek,
  azure,
  cerebras,
  clarifai,
  cloudflareWorkersAI,
  cohere,
  deepinfra,
  google,
  groq,
  huggingface,
  lmstudio,
  nebius,
  novita_ai,
  ollamaCloud,
  xai,
  fireworks_ai,
  togetherai,
  v0,
  vercel,
  githubCopilot,
  githubModels,
  perplexity,
  perplexityAgent,
  wandb,
  venice,
  upstage,
  scaleway,
  stackit,
  minimax,
  moonshotai,
  stepfun,
  zhipuai,
  modelscope,
  siliconflow,
  siliconflowCn,
  abacus,
  aihubmix,
  ai302,
  jiekou,
  helicone,
  sapAiCore,
  cortecs,
  moark,
  nanoGpt,
  llmgateway,
  morph,
  qiniuAi,
  alibaba,
  alibabaCn,
  baseten,
  cloudflareAiGateway,
  dinference,
  fastrouter,
  friendli,
  ionet,
  kimiForCoding,
  llama,
  nvidia,
  nova,
  privatemodeAi,
  opencode_go,
  opencode,
  inception,
  ovhcloud,
  requesty,
  the_grid_ai,
  submodel,
  synthetic,
  vivgrid,
  vultr,
  firmware,
];

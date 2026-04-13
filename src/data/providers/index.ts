/**
 * @file Providers aggregation
 * @description Collects all individual provider files into a single array.
 * 📖 To add a provider: create a new file in this folder, then add it here.
 *
 * @exports allProviders → Provider[]
 */

import type { Provider } from "@/data/schema";

import { ai302 } from "./302ai";
import { abacus } from "./abacus";
import { aihubmix } from "./aihubmix";
import { alibaba } from "./alibaba";
import { alibabaCn } from "./alibaba-cn";
import { anthropic } from "./anthropic";
import { azure } from "./azure";
import { azureCognitiveServices } from "./azure-cognitive-services";
import { bailing } from "./bailing";
import { baseten } from "./baseten";
import { bedrock } from "./bedrock";
import { berget } from "./berget";
import { cerebras } from "./cerebras";
import { chutes } from "./chutes";
import { clarifai } from "./clarifai";
import { cloudferroSherlock } from "./cloudferro-sherlock";
import { cloudflareAiGateway } from "./cloudflare-ai-gateway";
import { cloudflareWorkersAI } from "./cloudflare-workers-ai";
import { cohere } from "./cohere";
import { cortecs } from "./cortecs";
import { deepinfra } from "./deepinfra";
import { deepseek } from "./deepseek";
import { dinference } from "./dinference";
import { drun } from "./drun";
import { evroc } from "./evroc";
import { fastrouter } from "./fastrouter";
import { fireworks_ai } from "./fireworks-ai";
import { firmware } from "./firmware";
import { friendli } from "./friendli";
import { githubCopilot } from "./github-copilot";
import { githubModels } from "./github-models";
import { gitlab } from "./gitlab";
import { google } from "./google";
import { groq } from "./groq";
import { helicone } from "./helicone";
import { huggingface } from "./huggingface";
import { iflowcn } from "./iflowcn";
import { inception } from "./inception";
import { inference } from "./inference";
import { ionet } from "./io-net";
import { jiekou } from "./jiekou";
import { kilo } from "./kilo";
import { kimiForCoding } from "./kimi-for-coding";
import { kuaeCloudCodingPlan } from "./kuae-cloud-coding-plan";
import { llama } from "./llama";
import { llmgateway } from "./llmgateway";
import { lmstudio } from "./lmstudio";
import { lucidquery } from "./lucidquery";
import { meganova } from "./meganova";
import { minimax } from "./minimax";
import { minimaxCn } from "./minimax-cn";
import { minimaxCodingPlan } from "./minimax-coding-plan";
import { mistral } from "./mistral";
import { mixlayer } from "./mixlayer";
import { moark } from "./moark";
import { modelscope } from "./modelscope";
import { moonshotai } from "./moonshotai";
import { moonshotaiCn } from "./moonshotai-cn";
import { morph } from "./morph";
import { nanoGpt } from "./nano-gpt";
import { nebius } from "./nebius";
import { nova } from "./nova";
import { novita_ai } from "./novita-ai";
import { nvidia } from "./nvidia";
import { ollamaCloud } from "./ollama-cloud";
import { openai } from "./openai";
import { opencode } from "./opencode";
import { opencode_go } from "./opencode-go";
import { openrouter } from "./openrouter";
import { ovhcloud } from "./ovhcloud";
import { perplexity } from "./perplexity";
import { perplexityAgent } from "./perplexity-agent";
import { privatemodeAi } from "./privatemode-ai";
import { qihangAi } from "./qihang-ai";
import { qiniuAi } from "./qiniu-ai";
import { quantumML } from "./quantumml";
import { requesty } from "./requesty";
import { sapAiCore } from "./sap-ai-core";
import { scaleway } from "./scaleway";
import { siliconflow } from "./siliconflow";
import { siliconflowCn } from "./siliconflow-cn";
import { stackit } from "./stackit";
import { stepfun } from "./stepfun";
import { submodel } from "./submodel";
import { synthetic } from "./synthetic";
import { tencentCodingPlan } from "./tencent-coding-plan";
import { the_grid_ai } from "./the-grid-ai";
import { togetherai } from "./togetherai";
import { upstage } from "./upstage";
import { v0 } from "./v0";
import { venice } from "./venice";
import { vercel } from "./vercel";
import { vivgrid } from "./vivgrid";
import { vultr } from "./vultr";
import { wandb } from "./wandb";
import { xai } from "./xai";
import { xiaomi } from "./xiaomi";
import { xiaomiTokenPlanAms } from "./xiaomi-token-plan-ams";
import { xiaomiTokenPlanCn } from "./xiaomi-token-plan-cn";
import { xiaomiTokenPlanSgp } from "./xiaomi-token-plan-sgp";
import { zenmux } from "./zenmux";
import { rovo } from "./rovo";
import { gemini } from "./gemini";
import { opencodeZen } from "./opencode-zen";
import { zai } from "./zai";
import { zaiCodingPlan } from "./zai-coding-plan";
import { zhipuai } from "./zhipuai";

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
  minimaxCn,
  minimaxCodingPlan,
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
  qihangAi,
  quantumML,
  bailing,
  berget,
  chutes,
  inference,
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
  azureCognitiveServices,
  gitlab,
  cloudferroSherlock,
  iflowcn,
  kilo,
  kuaeCloudCodingPlan,
  lucidquery,
  meganova,
  moonshotaiCn,
  tencentCodingPlan,
  zenmux,
  rovo,
  gemini,
  opencodeZen,
  zai,
  zaiCodingPlan,
];

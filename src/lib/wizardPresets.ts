/**
 * @file Wizard presets — use-case definitions for the "Find My Model" wizard
 * @description Defines use-case presets with scoring bonuses for model matching.
 * 📖 Each preset specifies which model categories and capabilities score bonus points.
 * 📖 Used by wizardScoring.ts to rank models based on user answers.
 *
 * @exports UseCasePreset (interface), USE_CASE_PRESETS (preset definitions)
 */

import type { ModelCategory } from "@/data/schema";
import type { ModelCapabilities } from "@/data/schema";

export interface UseCasePreset {
  id: string;
  label: string;
  description: string;
  /** 📖 ModelCategory values that score bonus points */
  categoryBonus: ModelCategory[];
  /** 📖 Capability keys that score bonus points */
  capabilityBonus: (keyof ModelCapabilities)[];
  /** 📖 Higher = more relevant for large context models */
  contextBonus: boolean;
}

export const USE_CASE_PRESETS: UseCasePreset[] = [
  {
    id: "agentic-coding",
    label: "Agentic Coding",
    description: "Autonomous coding agents, multi-step tasks",
    categoryBonus: ["agentic", "flagship"],
    capabilityBonus: ["function_calling", "mcp", "computer_use", "code_execution", "parallel_tool_calls"],
    contextBonus: true,
  },
  {
    id: "code-gen",
    label: "Code Generation",
    description: "Writing and completing code, pair programming",
    categoryBonus: ["code", "flagship", "mid"],
    capabilityBonus: ["function_calling", "streaming", "diff_output"],
    contextBonus: false,
  },
  {
    id: "rag",
    label: "RAG / Documents",
    description: "Retrieval-augmented generation, large file processing",
    categoryBonus: ["flagship", "mid"],
    capabilityBonus: ["prompt_caching", "file_search", "citations", "vision"],
    contextBonus: true,
  },
  {
    id: "reasoning",
    label: "Complex Reasoning",
    description: "Math, logic, research, advanced problem solving",
    categoryBonus: ["reasoning", "flagship"],
    capabilityBonus: ["extended_thinking"],
    contextBonus: false,
  },
  {
    id: "local-private",
    label: "Local / Private",
    description: "Self-hosted, offline, or privacy-sensitive workloads",
    categoryBonus: ["small", "mid", "code"],
    capabilityBonus: [],
    contextBonus: false,
  },
];

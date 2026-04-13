/**
 * @file Wizard scoring — model ranking engine for the "Find My Model" wizard
 * @description Pure scoring function that filters and ranks models based on wizard answers.
 * 📖 Two-phase process: hard filters (eliminate ineligible) then soft scoring (0–100 points).
 * 📖 Hard filters: budget, deployment mode, required capabilities.
 * 📖 Soft scoring: use-case match, cost efficiency, provider availability, model status.
 *
 * @functions
 *   scoreModels → filter + rank models by wizard answers, returns sorted ScoredModel[]
 *
 * @exports WizardAnswers, ScoredModel, scoreModels
 */

import type { Model, ModelCapabilities, AccessType } from "@/data/schema";
import type { ProviderOffer } from "@/data/schema";
import type { UseCasePreset } from "./wizardPresets";

export interface WizardAnswers {
  budget: "free" | "under1" | "under5" | "any";
  useCases: string[]; // UseCasePreset IDs
  requiredFeatures: (keyof ModelCapabilities)[];
  deployment: AccessType | "any";
}

export interface ScoredModel {
  model: Model;
  score: number;
  reasons: string[];
}

/**
 * 📖 Score and rank models based on wizard answers.
 * Hard filters are applied first (eliminates ineligible models).
 * Soft scoring assigns 0–100 points for fit.
 * Returns models sorted by score descending.
 */
export function scoreModels(
  models: Model[],
  offers: ProviderOffer[],
  answers: WizardAnswers,
  presets: UseCasePreset[],
): ScoredModel[] {
  const results: ScoredModel[] = [];

  for (const model of models) {
    const modelOffers = offers.filter((o) => o.model_id === model.id && o.status !== "deprecated");
    const cheapestInput = modelOffers.length > 0
      ? Math.min(...modelOffers.map((o) => o.input_per_mtok))
      : Infinity;

    // === HARD FILTERS ===

    // 📖 Budget filter
    if (answers.budget === "free") {
      const hasFree = model.supportedOn.includes("free") || modelOffers.some((o) => o.free_tier_limits);
      if (!hasFree) continue;
    } else if (answers.budget === "under1") {
      if (cheapestInput > 1.0 && !model.supportedOn.includes("free")) continue;
    } else if (answers.budget === "under5") {
      if (cheapestInput > 5.0 && !model.supportedOn.includes("free")) continue;
    }

    // 📖 Deployment filter
    if (answers.deployment !== "any") {
      if (!model.supportedOn.includes(answers.deployment)) continue;
    }

    // 📖 Required features filter — model must have ALL selected caps set to true
    const caps = model.capabilities as unknown as Record<string, boolean | undefined>;
    const missingFeature = answers.requiredFeatures.some((f) => !caps[f]);
    if (missingFeature) continue;

    // === SOFT SCORING (0–100) ===
    let score = 0;
    const reasons: string[] = [];

    // 📖 Use-case preset match — up to 40 points
    const selectedPresets = presets.filter((p) => answers.useCases.includes(p.id));
    for (const preset of selectedPresets) {
      const allCategories = [model.category, ...(model.secondary_categories ?? [])];
      if (preset.categoryBonus.some((c) => allCategories.includes(c))) {
        score += 15;
        reasons.push(`Good fit for ${preset.label}`);
      }
      const matchedCaps = preset.capabilityBonus.filter((cap) => caps[cap]);
      score += matchedCaps.length * 5;
      if (matchedCaps.length > 0) {
        reasons.push(`Has ${matchedCaps.length} relevant capabilities`);
      }
      if (preset.contextBonus && model.context_window >= 128_000) {
        score += 10;
        reasons.push("Large context window");
      }
    }

    // 📖 "local-private" preset — favor open source
    if (answers.useCases.includes("local-private") && model.is_open_source) {
      score += 15;
      reasons.push("Open source / self-hostable");
    }

    // 📖 Cost efficiency bonus — cheaper is better, max 20 pts
    if (cheapestInput < Infinity) {
      if (cheapestInput <= 0.5) { score += 20; reasons.push("Very low cost"); }
      else if (cheapestInput <= 2) { score += 12; }
      else if (cheapestInput <= 5) { score += 6; }
    }

    // 📖 Provider availability bonus — more providers = more flexible
    if (modelOffers.length >= 3) { score += 5; reasons.push(`${modelOffers.length} providers`); }
    else if (modelOffers.length >= 2) { score += 2; }

    // 📖 Active status bonus
    if (model.status === "active") score += 5;

    results.push({ model, score, reasons: [...new Set(reasons)] });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

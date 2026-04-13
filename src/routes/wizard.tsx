/**
 * @file Wizard page route — "Find My Model" multi-step wizard
 * @description 4-step wizard that collects budget, use case, features, and deployment preferences
 * to generate personalized model recommendations using the scoring engine.
 * 📖 Steps: Budget → Use Case → Features → Deployment → Results.
 * 📖 All state is local — no persistence, stateless wizard.
 *
 * @functions
 *   WizardPage → /wizard route component orchestrating 4 steps + results
 *
 * @exports Route (TanStack Router file route)
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { StepBudget } from "@/components/wizard/steps/StepBudget";
import { StepUseCase } from "@/components/wizard/steps/StepUseCase";
import { StepFeatures } from "@/components/wizard/steps/StepFeatures";
import { StepDeployment } from "@/components/wizard/steps/StepDeployment";
import { WizardResults } from "@/components/wizard/WizardResults";
import { scoreModels, type WizardAnswers } from "@/lib/wizardScoring";
import { USE_CASE_PRESETS } from "@/lib/wizardPresets";
import { allModels, allOffers } from "@/data";
import type { ModelCapabilities } from "@/data/schema";

export const Route = createFileRoute("/wizard")({
  component: WizardPage,
});

// 📖 Default answers — least restrictive so any step is a valid starting point
const DEFAULT_ANSWERS: WizardAnswers = {
  budget: "any",
  useCases: [],
  requiredFeatures: [],
  deployment: "any",
};

function WizardPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | "results">(1);
  const [answers, setAnswers] = useState<WizardAnswers>(DEFAULT_ANSWERS);

  const results = useMemo(
    () =>
      step === "results"
        ? scoreModels(allModels, allOffers, answers, USE_CASE_PRESETS)
        : [],
    [step, answers],
  );

  const update = <K extends keyof WizardAnswers>(key: K, value: WizardAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setAnswers(DEFAULT_ANSWERS);
    setStep(1);
  };

  return (
    <Container>
      <div className="py-6">
        {step !== "results" && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Find My Model</h1>
            <p className="mt-1 text-[var(--color-text-muted)]">
              Answer 4 quick questions to get personalized model recommendations.
            </p>
          </div>
        )}

        {step === 1 && (
          <StepBudget
            value={answers.budget}
            onChange={(v) => update("budget", v)}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepUseCase
            values={answers.useCases}
            onChange={(v) => update("useCases", v)}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <StepFeatures
            values={answers.requiredFeatures as (keyof ModelCapabilities)[]}
            onChange={(v) => update("requiredFeatures", v)}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <StepDeployment
            value={answers.deployment}
            onChange={(v) => update("deployment", v)}
            onBack={() => setStep(3)}
            onNext={() => setStep("results")}
          />
        )}
        {step === "results" && (
          <WizardResults results={results} onReset={reset} />
        )}
      </div>
    </Container>
  );
}

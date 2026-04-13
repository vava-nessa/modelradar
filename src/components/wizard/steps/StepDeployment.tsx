/**
 * @file StepDeployment — deployment mode selection step in the wizard
 * @description Fourth wizard step where users choose their preferred access type.
 * 📖 Single-select radio-style buttons for 5 deployment modes.
 * 📖 "See results" button triggers scoring and transitions to results view.
 *
 * @functions
 *   StepDeployment → radio-style deployment mode cards
 *
 * @exports StepDeployment
 */

import { WizardStep } from "../WizardStep";
import type { WizardAnswers } from "@/lib/wizardScoring";

const OPTIONS: { value: WizardAnswers["deployment"]; label: string; desc: string }[] = [
  { value: "any", label: "Any / Don't care", desc: "Show all options" },
  { value: "api", label: "Cloud API", desc: "Pay per token via REST API" },
  { value: "sub", label: "Subscription", desc: "ChatGPT Plus, Claude Pro, Gemini Advanced…" },
  { value: "free", label: "Free tier", desc: "Free cloud API or playground" },
  { value: "local", label: "Local / Self-hosted", desc: "Run on your own hardware (Ollama, llama.cpp…)" },
];

interface Props {
  value: WizardAnswers["deployment"];
  onChange: (v: WizardAnswers["deployment"]) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepDeployment({ value, onChange, onBack, onNext }: Props) {
  return (
    <WizardStep
      step={4}
      totalSteps={4}
      title="How do you want to access it?"
      onBack={onBack}
      onNext={onNext}
      nextLabel="See results →"
    >
      <div className="grid gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={value === opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              value === opt.value
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                : "border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface)]"
            }`}
          >
            <div className="font-medium">{opt.label}</div>
            <div className="mt-0.5 text-sm text-[var(--color-text-muted)]">{opt.desc}</div>
          </button>
        ))}
      </div>
    </WizardStep>
  );
}

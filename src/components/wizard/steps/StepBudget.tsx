/**
 * @file StepBudget — budget selection step in the wizard
 * @description First wizard step where users select their budget constraint.
 * 📖 Single-select radio-style buttons for 4 budget tiers.
 *
 * @functions
 *   StepBudget → budget selection with radio-style cards
 *
 * @exports StepBudget
 */

import { WizardStep } from "../WizardStep";
import type { WizardAnswers } from "@/lib/wizardScoring";

const OPTIONS: { value: WizardAnswers["budget"]; label: string; desc: string }[] = [
  { value: "free", label: "Free only", desc: "Free tiers, free APIs, no credit card" },
  { value: "under1", label: "Under $1 / Mtok input", desc: "Budget-friendly paid options" },
  { value: "under5", label: "Under $5 / Mtok input", desc: "Mid-range, good value" },
  { value: "any", label: "No limit", desc: "Show me the best regardless of price" },
];

interface Props {
  value: WizardAnswers["budget"];
  onChange: (v: WizardAnswers["budget"]) => void;
  onNext: () => void;
}

export function StepBudget({ value, onChange, onNext }: Props) {
  return (
    <WizardStep step={1} totalSteps={4} title="What's your budget?" onNext={onNext}>
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

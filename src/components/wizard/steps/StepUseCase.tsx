/**
 * @file StepUseCase — use-case selection step in the wizard
 * @description Second wizard step where users choose their primary use cases.
 * 📖 Multi-select checkbox-style buttons from USE_CASE_PRESETS.
 * 📖 At least one selection required to proceed.
 *
 * @functions
 *   StepUseCase → multi-select use-case cards with toggle behavior
 *
 * @exports StepUseCase
 */

import { WizardStep } from "../WizardStep";
import { USE_CASE_PRESETS } from "@/lib/wizardPresets";

interface Props {
  values: string[];
  onChange: (v: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepUseCase({ values, onChange, onBack, onNext }: Props) {
  const toggle = (id: string) => {
    onChange(values.includes(id) ? values.filter((v) => v !== id) : [...values, id]);
  };

  return (
    <WizardStep
      step={2}
      totalSteps={4}
      title="What are you building?"
      subtitle="Select all that apply."
      onBack={onBack}
      onNext={onNext}
      nextDisabled={values.length === 0}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {USE_CASE_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            role="checkbox"
            aria-checked={values.includes(p.id)}
            onClick={() => toggle(p.id)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              values.includes(p.id)
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                : "border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface)]"
            }`}
          >
            <div className="font-medium">{p.label}</div>
            <div className="mt-0.5 text-sm text-[var(--color-text-muted)]">{p.description}</div>
          </button>
        ))}
      </div>
    </WizardStep>
  );
}

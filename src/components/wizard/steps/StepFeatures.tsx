/**
 * @file StepFeatures — required capabilities step in the wizard
 * @description Third wizard step where users select required model capabilities.
 * 📖 Multi-select checkbox-style buttons for 9 key features.
 * 📖 Optional — users can skip without selecting any features.
 *
 * @functions
 *   StepFeatures → multi-select feature cards with toggle behavior
 *
 * @exports StepFeatures
 */

import { WizardStep } from "../WizardStep";
import type { ModelCapabilities } from "@/data/schema";

const FEATURES: { key: keyof ModelCapabilities; label: string; desc: string }[] = [
  { key: "function_calling", label: "Tool / Function Calling", desc: "Use external tools and APIs" },
  { key: "vision", label: "Vision", desc: "Process images and screenshots" },
  { key: "mcp", label: "MCP Support", desc: "Model Context Protocol for agent tools" },
  { key: "extended_thinking", label: "Extended Thinking", desc: "Deep reasoning before responding" },
  { key: "computer_use", label: "Computer Use", desc: "Autonomously control a computer" },
  { key: "prompt_caching", label: "Prompt Caching", desc: "Cache repeated context for cost savings" },
  { key: "batch_api", label: "Batch API", desc: "Process large volumes asynchronously" },
  { key: "web_search", label: "Web Search", desc: "Native real-time web browsing" },
  { key: "code_execution", label: "Code Execution", desc: "Run code in a sandbox" },
];

interface Props {
  values: (keyof ModelCapabilities)[];
  onChange: (v: (keyof ModelCapabilities)[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepFeatures({ values, onChange, onBack, onNext }: Props) {
  const toggle = (key: keyof ModelCapabilities) => {
    onChange(values.includes(key) ? values.filter((v) => v !== key) : [...values, key]);
  };

  return (
    <WizardStep
      step={3}
      totalSteps={4}
      title="Required capabilities?"
      subtitle="Only show models that support these. Leave blank for no restrictions."
      onBack={onBack}
      onNext={onNext}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <button
            key={f.key}
            type="button"
            role="checkbox"
            aria-checked={values.includes(f.key)}
            onClick={() => toggle(f.key)}
            className={`rounded-lg border p-3 text-left transition-colors ${
              values.includes(f.key)
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                : "border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface)]"
            }`}
          >
            <div className="text-sm font-medium">{f.label}</div>
            <div className="mt-0.5 text-xs text-[var(--color-text-muted)]">{f.desc}</div>
          </button>
        ))}
      </div>
    </WizardStep>
  );
}

/**
 * @file CostInputPanel — user controls for the cost simulator
 * @description Form panel with token volume, input/output split, and cache toggle.
 * 📖 All state is lifted — this is a pure controlled component, no internal state.
 * 📖 Displays model filter when modelId is pre-selected via URL param.
 *
 * @functions
 *   CostInputPanel → controlled form for cost simulation inputs
 *
 * @exports CostInputPanel
 */

import type { CostInputs } from "@/lib/costCalc";
import { TOKEN_PRESETS } from "@/lib/costCalc";
import { formatTokenVolume } from "@/lib/format";
import { allModels } from "@/data";

interface CostInputPanelProps {
  inputs: CostInputs;
  onChange: (next: CostInputs) => void;
  /** 📖 When set, filters results to a specific model (pre-selected via URL) */
  selectedModelId: string;
  onModelChange: (id: string) => void;
}

export function CostInputPanel({
  inputs,
  onChange,
  selectedModelId,
  onModelChange,
}: CostInputPanelProps) {
  const inputPct = Math.round(inputs.inputRatio * 100);
  const outputPct = 100 - inputPct;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h2 className="mb-5 text-base font-semibold">Simulation Parameters</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* 📖 Token volume input with presets */}
        <div className="lg:col-span-2">
          <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
            Tokens per Month
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1000}
              step={1000}
              value={inputs.totalTokensPerMonth}
              onChange={(e) =>
                onChange({
                  ...inputs,
                  totalTokensPerMonth: Math.max(1000, Number(e.target.value)),
                })
              }
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
            />
          </div>
          {/* 📖 Quick preset buttons */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TOKEN_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() =>
                  onChange({ ...inputs, totalTokensPerMonth: p.value })
                }
                className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                  inputs.totalTokensPerMonth === p.value
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">
            = {formatTokenVolume(inputs.totalTokensPerMonth)} total tokens/month
          </p>
        </div>

        {/* 📖 Input/Output split slider */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
            Input / Output Split
          </label>
          <input
            type="range"
            min={10}
            max={90}
            step={5}
            value={inputPct}
            onChange={(e) =>
              onChange({ ...inputs, inputRatio: Number(e.target.value) / 100 })
            }
            className="mt-2 w-full accent-[var(--color-accent)]"
          />
          <div className="mt-1.5 flex justify-between text-xs text-[var(--color-text-muted)]">
            <span className="font-medium text-[var(--color-text)]">
              {inputPct}% input
            </span>
            <span className="font-medium text-[var(--color-text)]">
              {outputPct}% output
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            Typical chat: 70% in / 30% out
          </p>
        </div>

        {/* 📖 Cache + Model filter */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              Filter Model
            </label>
            <select
              value={selectedModelId}
              onChange={(e) => onModelChange(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
            >
              <option value="">All models</option>
              {allModels
                .filter((m) => m.status === "active")
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              Prompt Caching
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={inputs.includeCacheRead}
                onClick={() =>
                  onChange({
                    ...inputs,
                    includeCacheRead: !inputs.includeCacheRead,
                  })
                }
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${
                  inputs.includeCacheRead
                    ? "bg-[var(--color-accent)]"
                    : "bg-[var(--color-border)]"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    inputs.includeCacheRead ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-sm text-[var(--color-text-muted)]">
                {inputs.includeCacheRead ? "Enabled" : "Disabled"}
              </span>
            </div>
            {inputs.includeCacheRead && (
              <div className="mt-2">
                <label className="mb-1 block text-xs text-[var(--color-text-muted)]">
                  Cache hit ratio: {Math.round(inputs.cacheHitRatio * 100)}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={90}
                  step={10}
                  value={Math.round(inputs.cacheHitRatio * 100)}
                  onChange={(e) =>
                    onChange({
                      ...inputs,
                      cacheHitRatio: Number(e.target.value) / 100,
                    })
                  }
                  className="w-full accent-[var(--color-accent)]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

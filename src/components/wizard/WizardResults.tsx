/**
 * @file WizardResults — ranked model recommendations from the wizard
 * @description Displays the top 10 scored models with score bars, reasons, and action links.
 * 📖 Each result card links to model detail, compare, and cost simulator.
 * 📖 Shows an empty state when no models match the criteria.
 *
 * @functions
 *   WizardResults → scored model list with action buttons and score visualization
 *
 * @exports WizardResults
 */

import type { ScoredModel } from "@/lib/wizardScoring";
import { formatPrice } from "@/lib/format";
import { getCheapestInputPrice, getCheapestOutputPrice } from "@/data";
import { Link } from "@tanstack/react-router";

interface Props {
  results: ScoredModel[];
  onReset: () => void;
}

export function WizardResults({ results, onReset }: Props) {
  const top = results.slice(0, 10);
  const maxScore = results[0]?.score ?? 1;

  if (results.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
        <div className="mb-2 text-4xl">🤔</div>
        <p className="font-medium">No models match your criteria.</p>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">Try relaxing the budget or feature requirements.</p>
        <button type="button" onClick={onReset} className="mt-4 text-sm text-[var(--color-accent)] hover:underline">
          ← Start over
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {results.length} model{results.length !== 1 ? "s" : ""} found
        </h2>
        <button type="button" onClick={onReset} className="text-sm text-[var(--color-accent)] hover:underline">
          ← Start over
        </button>
      </div>

      <div className="grid gap-3">
        {top.map((item, i) => {
          const cheapIn = getCheapestInputPrice(item.model.id);
          const cheapOut = getCheapestOutputPrice(item.model.id);
          const scoreWidth = maxScore > 0 ? (item.score / maxScore) * 100 : 0;

          return (
            <div
              key={item.model.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[var(--color-text-muted)]">
                    #{i + 1}
                  </span>
                  <div>
                    <Link
                      to="/models/$modelId"
                      params={{ modelId: item.model.id }}
                      className="font-semibold hover:text-[var(--color-accent)] hover:underline"
                    >
                      {item.model.name}
                    </Link>
                    <div className="mt-0.5 text-xs text-[var(--color-text-muted)] capitalize">
                      {item.model.creator} · {item.model.category}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    to="/compare"
                    search={{ models: item.model.id }}
                    className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs hover:bg-[var(--color-bg)]"
                  >
                    Compare
                  </Link>
                  <Link
                    to="/cost"
                    search={{ model: item.model.id }}
                    className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs hover:bg-[var(--color-bg)]"
                  >
                    Cost sim
                  </Link>
                </div>
              </div>

              {/* Score bar */}
              <div className="mt-3">
                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-accent)]"
                    style={{ width: `${scoreWidth}%` }}
                  />
                </div>
              </div>

              {/* Reasons + pricing */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {item.reasons.slice(0, 3).map((r) => (
                  <span key={r} className="rounded-full bg-[var(--color-bg)] px-2 py-0.5 text-xs text-[var(--color-text-muted)] border border-[var(--color-border)]">
                    {r}
                  </span>
                ))}
                {cheapIn !== null && (
                  <span className="ml-auto text-xs text-[var(--color-text-muted)]">
                    from {formatPrice(cheapIn)} / {formatPrice(cheapOut)} per Mtok
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

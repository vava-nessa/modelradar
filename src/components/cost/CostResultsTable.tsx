/**
 * @file CostResultsTable — results table for the cost simulator
 * @description Displays monthly cost estimates sorted cheapest first.
 * 📖 Highlights the cheapest option with a green left border.
 * 📖 Supports pagination via showAll prop (default: top 20).
 *
 * @functions
 *   CostResultsTable → renders cost comparison table with model+provider rows
 *
 * @exports CostResultsTable
 */

import type { CostResult } from "@/lib/costCalc";
import { formatMonthlyCost, formatPrice } from "@/lib/format";
import { Link } from "@tanstack/react-router";

interface Props {
  results: CostResult[];
  /** Show all rows or just top 20 */
  showAll?: boolean;
}

export function CostResultsTable({ results, showAll = false }: Props) {
  const rows = showAll ? results : results.slice(0, 20);
  const cheapest = results[0]?.totalMonthly ?? 0;

  if (results.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-[var(--color-text-muted)]">
        No offers match the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
            <th className="px-4 py-3 text-left font-medium text-[var(--color-text-muted)]">Model</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--color-text-muted)]">Provider</th>
            <th className="px-4 py-3 text-right font-medium text-[var(--color-text-muted)]">Input cost</th>
            <th className="px-4 py-3 text-right font-medium text-[var(--color-text-muted)]">Output cost</th>
            <th className="px-4 py-3 text-right font-medium text-[var(--color-text-muted)]">Cache savings</th>
            <th className="px-4 py-3 text-right font-medium text-[var(--color-text-muted)]">Total/mo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isCheapest = row.totalMonthly === cheapest && cheapest > 0;
            return (
              <tr
                key={`${row.modelId}-${row.providerId}`}
                className={`border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-surface)] ${
                  isCheapest ? "border-l-2 border-l-green-500" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <Link
                    to="/models/$modelId"
                    params={{ modelId: row.modelId }}
                    className="font-medium hover:text-[var(--color-accent)] hover:underline"
                  >
                    {row.modelName}
                  </Link>
                  {row.freeTierNote && (
                    <span className="ml-2 rounded-full bg-green-500/15 px-2 py-0.5 text-xs text-green-600">
                      Free tier
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-[var(--color-text-muted)]">{row.providerName}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatMonthlyCost(row.inputCost)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatMonthlyCost(row.outputCost)}</td>
                <td className="px-4 py-3 text-right tabular-nums text-green-600">
                  {row.cacheReadSavings > 0 ? `−${formatMonthlyCost(row.cacheReadSavings)}` : "—"}
                </td>
                <td className={`px-4 py-3 text-right font-semibold tabular-nums ${isCheapest ? "text-green-600" : ""}`}>
                  {formatMonthlyCost(row.totalMonthly)}
                  {isCheapest && i === 0 && (
                    <span className="ml-1.5 text-xs font-normal text-green-600">cheapest</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!showAll && results.length > 20 && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-center text-xs text-[var(--color-text-muted)]">
          Showing 20 of {results.length} offers
        </div>
      )}
    </div>
  );
}

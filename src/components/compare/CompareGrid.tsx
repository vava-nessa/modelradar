/**
 * @file CompareGrid — full comparison table with multi-section layout
 * @description Renders a comprehensive side-by-side comparison of 2–4 models.
 * 📖 Sections: Overview, Limits, Pricing (cheapest provider), Capabilities, Benchmarks.
 * 📖 Benchmarks section only shows keys present in ALL selected models (intersection).
 * 📖 Uses CompareRow for each data row with optional best-value highlighting.
 *
 * @functions
 *   CompareGrid → full comparison table component
 *
 * @exports CompareGrid
 */

import type { Model } from "@/data/schema";
import { CompareRow } from "./CompareRow";
import { getOffersForModel, getSharedBenchmarkKeys } from "@/data";
import { formatTokens, formatPrice } from "@/lib/format";

interface Props {
  models: Model[];
}

// 📖 Friendly display names for benchmarks
const BENCHMARK_LABELS: Record<string, string> = {
  swe_bench: "SWE-Bench",
  verified_swe_bench: "SWE Verified",
  humaneval: "HumanEval",
  mbpp: "MBPP",
  bigcodebench: "BigCodeBench",
  aider_polyglot: "Aider",
  bfcl: "BFCL",
  mmlu: "MMLU",
  gpqa_diamond: "GPQA ◆",
  math_500: "MATH-500",
  aime_2025: "AIME 2025",
  arena_elo: "Arena ELO",
  livebench: "LiveBench",
  livecodebench: "LiveCode",
};

// 📖 Capability display names
const CAP_LABELS: Record<string, string> = {
  streaming: "Streaming",
  function_calling: "Tool Calling",
  vision: "Vision",
  code_execution: "Code Execution",
  web_search: "Web Search",
  mcp: "MCP",
  computer_use: "Computer Use",
  extended_thinking: "Ext. Thinking",
  prompt_caching: "Prompt Caching",
  batch_api: "Batch API",
  json_mode: "JSON Mode",
  parallel_tool_calls: "Parallel Tools",
  fine_tuning: "Fine-Tuning",
};

export function CompareGrid({ models }: Props) {
  if (models.length < 2) return null;

  // 📖 Gather offers for each model (cheapest input price)
  const cheapestInput = models.map((m) => {
    const offers = getOffersForModel(m.id);
    if (offers.length === 0) return null;
    return Math.min(...offers.map((o) => o.input_per_mtok));
  });
  const cheapestOutput = models.map((m) => {
    const offers = getOffersForModel(m.id);
    if (offers.length === 0) return null;
    return Math.min(...offers.map((o) => o.output_per_mtok));
  });
  const providerCounts = models.map((m) => getOffersForModel(m.id).length);

  // 📖 Only show benchmarks that exist on ALL selected models
  const sharedBenchmarks = getSharedBenchmarkKeys(models);

  const capKeys = Object.keys(CAP_LABELS) as (keyof typeof CAP_LABELS)[];

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="w-full text-sm">
        <colgroup>
          <col className="w-36" />
          {models.map((m) => (
            <col key={m.id} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
            {/* 📖 Sticky label column header */}
            <th className="sticky left-0 z-10 bg-[var(--color-surface)] px-4 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide" />
            {models.map((m) => (
              <th key={m.id} className="px-4 py-3 text-center font-semibold">
                {m.name}
                <div className="mt-0.5 text-xs font-normal text-[var(--color-text-muted)] capitalize">
                  {m.creator} · {m.category}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* OVERVIEW SECTION */}
          <tr className="bg-[var(--color-surface)]/50">
            <td colSpan={models.length + 1} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Overview
            </td>
          </tr>
          <CompareRow label="Status" values={models.map((m) => m.status)} />
          <CompareRow label="Category" values={models.map((m) => m.category)} />
          <CompareRow
            label="Open Source"
            values={models.map((m) => m.is_open_source)}
          />
          <CompareRow
            label="Release Date"
            values={models.map((m) => m.release_date ? new Date(m.release_date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : null)}
          />
          <CompareRow
            label="Knowledge Cutoff"
            values={models.map((m) => m.knowledge ?? null)}
          />
          <CompareRow
            label="Parameters"
            values={models.map((m) => m.parameters ?? null)}
          />

          {/* LIMITS SECTION */}
          <tr className="bg-[var(--color-surface)]/50">
            <td colSpan={models.length + 1} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Limits
            </td>
          </tr>
          <CompareRow
            label="Context Window"
            values={models.map((m) => m.context_window)}
            highlight="higher-is-better"
            format={(v) => (typeof v === "number" ? formatTokens(v) : "—")}
          />
          <CompareRow
            label="Max Output"
            values={models.map((m) => m.max_output_tokens ?? null)}
            highlight="higher-is-better"
            format={(v) => (typeof v === "number" ? formatTokens(v) : "—")}
          />
          <CompareRow
            label="Reasoning"
            values={models.map((m) => m.reasoning ?? false)}
          />

          {/* PRICING SECTION */}
          <tr className="bg-[var(--color-surface)]/50">
            <td colSpan={models.length + 1} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Pricing (cheapest provider)
            </td>
          </tr>
          <CompareRow
            label="Input $/Mtok"
            values={cheapestInput}
            highlight="lower-is-better"
            format={(v) => (typeof v === "number" ? `$${v.toFixed(2)}` : "—")}
          />
          <CompareRow
            label="Output $/Mtok"
            values={cheapestOutput}
            highlight="lower-is-better"
            format={(v) => (typeof v === "number" ? `$${v.toFixed(2)}` : "—")}
          />
          <CompareRow
            label="Providers"
            values={providerCounts}
            highlight="higher-is-better"
            format={(v) => (typeof v === "number" ? v.toString() : "—")}
          />

          {/* CAPABILITIES SECTION */}
          <tr className="bg-[var(--color-surface)]/50">
            <td colSpan={models.length + 1} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Capabilities
            </td>
          </tr>
          {capKeys.map((key) => (
            <CompareRow
              key={key}
              label={CAP_LABELS[key]}
              values={models.map((m) => (m.capabilities as unknown as Record<string, boolean | undefined>)[key] ?? false)}
            />
          ))}

          {/* BENCHMARKS SECTION — only shared keys */}
          {sharedBenchmarks.length > 0 && (
            <>
              <tr className="bg-[var(--color-surface)]/50">
                <td colSpan={models.length + 1} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Benchmarks
                </td>
              </tr>
              {sharedBenchmarks.map((key) => (
                <CompareRow
                  key={key}
                  label={BENCHMARK_LABELS[key] ?? key.replace(/_/g, " ")}
                  values={models.map((m) => (m.benchmarks as Record<string, number | undefined> | undefined)?.[key] ?? null)}
                  highlight="higher-is-better"
                  format={(v) => (typeof v === "number" ? v.toFixed(1) : "—")}
                />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

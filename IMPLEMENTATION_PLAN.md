# ModelRadar — Implementation Plan
> 3 new features: Cost Simulator, Compare Page, Wizard

**Stack:** React 19, TanStack Router v1 (file-based routing), TanStack Table v8, Tailwind CSS v4 (CSS variables only — `var(--color-*)` tokens), TypeScript strict (no `any`).

**Already done (do NOT redo):**
- `src/lib/format.ts` — `formatMonthlyCost` and `formatTokenVolume` already added
- `src/lib/costCalc.ts` — already created (pure cost calc utilities, `CostInputs`, `CostResult`, `calculateCosts`, `TOKEN_PRESETS`)
- `src/components/cost/CostInputPanel.tsx` — already created (controlled form for simulator inputs)

---

## Key existing patterns to follow

### Route creation pattern
```tsx
// src/routes/my-page.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/my-page")({
  component: MyPage,
});

function MyPage() {
  return <Container>...</Container>;
}
```

### Route with URL search params
```tsx
export const Route = createFileRoute("/my-page")({
  validateSearch: (search: Record<string, unknown>) => ({
    models: typeof search.models === "string" ? search.models : "",
  }),
  component: MyPage,
});

function MyPage() {
  const { models } = Route.useSearch();
  const { navigate } = Route.useNavigate(); // or use useNavigate from router
}
```

### Navigation
```tsx
import { useNavigate } from "@tanstack/react-router";
const navigate = useNavigate();
navigate({ to: "/compare", search: { models: "claude-sonnet-4,gpt-4o" } });
```

### CSS tokens — ALWAYS use these, never raw Tailwind colors
```
var(--color-bg)          — page background
var(--color-surface)     — card/panel background
var(--color-border)      — borders
var(--color-text)        — primary text
var(--color-text-muted)  — secondary/muted text
var(--color-accent)      — brand accent color
```

### Data helpers (from `src/data/index.ts`)
```ts
import { allModels, allOffers, allProviders, getModelById, getOffersForModel } from "@/data";
```

### Container component
```tsx
import { Container } from "@/components/layout/Container";
// Wraps content with max-w-7xl and responsive padding
```

---

## FEATURE 1 — Cost Simulator (`/cost`)

### Files to create

#### `src/components/cost/CostResultsTable.tsx`
A results table showing monthly costs sorted cheapest first.

```tsx
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
```

#### `src/routes/cost.tsx`
Main page. Reads `?model=` from URL. Computes costs live from user inputs.

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { CostInputPanel } from "@/components/cost/CostInputPanel";
import { CostResultsTable } from "@/components/cost/CostResultsTable";
import { calculateCosts, type CostInputs } from "@/lib/costCalc";
import { allModels, allOffers, allProviders, getModelById } from "@/data";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/cost")({
  validateSearch: (search: Record<string, unknown>) => ({
    model: typeof search.model === "string" ? search.model : "",
  }),
  component: CostPage,
});

// 📖 Default inputs — 10M tokens/month, 70/30 split, no caching
const DEFAULT_INPUTS: CostInputs = {
  totalTokensPerMonth: 10_000_000,
  inputRatio: 0.7,
  includeCacheRead: false,
  cacheHitRatio: 0.5,
};

function CostPage() {
  const { model: preselectedModelId } = Route.useSearch();
  const [inputs, setInputs] = useState<CostInputs>(DEFAULT_INPUTS);
  const [selectedModelId, setSelectedModelId] = useState(preselectedModelId ?? "");
  const [showAll, setShowAll] = useState(false);

  // 📖 Enrich offers with provider + model data for the calculator
  const enrichedOffers = useMemo(() => {
    return allOffers
      .filter((o) => !selectedModelId || o.model_id === selectedModelId)
      .map((o) => {
        const provider = allProviders.find((p) => p.id === o.provider_id);
        const model = allModels.find((m) => m.id === o.model_id);
        if (!provider || !model) return null;
        return { ...o, provider, model };
      })
      .filter((o): o is NonNullable<typeof o> => o !== null);
  }, [selectedModelId]);

  const results = useMemo(
    () => calculateCosts(inputs, enrichedOffers),
    [inputs, enrichedOffers],
  );

  const preselectedModel = selectedModelId ? getModelById(selectedModelId) : undefined;

  return (
    <Container>
      <div className="py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Cost Simulator</h1>
          <p className="mt-1 text-[var(--color-text-muted)]">
            Estimate your monthly API costs across all models and providers.
            {preselectedModel && (
              <span> Filtered to <strong>{preselectedModel.name}</strong>.</span>
            )}
          </p>
        </div>

        <div className="mb-6">
          <CostInputPanel
            inputs={inputs}
            onChange={setInputs}
            selectedModelId={selectedModelId}
            onModelChange={setSelectedModelId}
          />
        </div>

        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-[var(--color-text-muted)]">
            {results.length} offer{results.length !== 1 ? "s" : ""} found
          </p>
          {results.length > 20 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              {showAll ? "Show less" : `Show all ${results.length}`}
            </button>
          )}
        </div>

        <CostResultsTable results={results} showAll={showAll} />
      </div>
    </Container>
  );
}
```

---

## FEATURE 2 — Compare Page (`/compare`)

### Add helper to `src/data/index.ts`
Add these two functions at the bottom of the file (before the last empty line):

```ts
/** 📖 Fetch multiple models by IDs, preserving order, silently skipping unknowns */
export function getModelsByIds(ids: string[]): Model[] {
  return ids
    .map((id) => allModels.find((m) => m.id === id))
    .filter((m): m is Model => m !== undefined);
}

/** 📖 Return benchmark keys present on ALL given models (intersection) */
export function getSharedBenchmarkKeys(models: Model[]): string[] {
  if (models.length === 0) return [];
  const sets = models.map((m) =>
    new Set(Object.keys(m.benchmarks ?? {}).filter((k) => k !== "custom")),
  );
  const first = sets[0];
  return [...first].filter((k) => sets.every((s) => s.has(k)));
}
```

### Files to create

#### `src/components/compare/ModelPicker.tsx`
Searchable input that lets user add models to the comparison (max 4). Writes back via `onSelect` callback. Shows selected models as removable chips.

```tsx
import { useState } from "react";
import { allModels } from "@/data";
import type { Model } from "@/data/schema";

interface Props {
  selected: string[]; // model IDs
  onSelect: (ids: string[]) => void;
  maxModels?: number;
}

export function ModelPicker({ selected, onSelect, maxModels = 4 }: Props) {
  const [query, setQuery] = useState("");

  const filtered = query.length > 0
    ? allModels
        .filter(
          (m) =>
            !selected.includes(m.id) &&
            m.name.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 8)
    : [];

  const selectedModels = allModels.filter((m) => selected.includes(m.id));

  const add = (model: Model) => {
    if (selected.length >= maxModels) return;
    onSelect([...selected, model.id]);
    setQuery("");
  };

  const remove = (id: string) => {
    onSelect(selected.filter((s) => s !== id));
  };

  return (
    <div>
      {/* 📖 Selected model chips */}
      {selectedModels.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedModels.map((m) => (
            <span
              key={m.id}
              className="flex items-center gap-1.5 rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-sm font-medium text-[var(--color-accent)]"
            >
              {m.name}
              <button
                type="button"
                onClick={() => remove(m.id)}
                aria-label={`Remove ${m.name}`}
                className="ml-0.5 text-[var(--color-accent)]/70 hover:text-[var(--color-accent)]"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* 📖 Search input — hidden once max models selected */}
      {selected.length < maxModels && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search and add a model…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
          />
          {filtered.length > 0 && (
            <ul className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] shadow-lg">
              {filtered.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => add(m)}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-[var(--color-surface)]"
                  >
                    <span>{m.name}</span>
                    <span className="text-xs text-[var(--color-text-muted)] capitalize">
                      {m.creator} · {m.category}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {selected.length > 0 && selected.length < 2 && (
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">Add at least one more model to compare.</p>
      )}
      {selected.length >= maxModels && (
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">Max {maxModels} models. Remove one to add another.</p>
      )}
    </div>
  );
}
```

#### `src/components/compare/CompareRow.tsx`
A single row in the comparison grid. Highlights the best value.

```tsx
interface Props {
  label: string;
  values: (string | number | boolean | null | undefined)[];
  /** 📖 "higher-is-better" → green for max, "lower-is-better" → green for min, "none" → no highlight */
  highlight?: "higher-is-better" | "lower-is-better" | "none";
  /** 📖 Format function for display */
  format?: (v: string | number | boolean | null | undefined) => string;
}

const defaultFormat = (v: string | number | boolean | null | undefined): string => {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "✓" : "✗";
  if (typeof v === "number") return v.toString();
  return v;
};

export function CompareRow({ label, values, highlight = "none", format = defaultFormat }: Props) {
  const numericValues = values
    .filter((v): v is number => typeof v === "number");

  const best =
    highlight === "higher-is-better"
      ? numericValues.length > 0 ? Math.max(...numericValues) : null
      : highlight === "lower-is-better"
      ? numericValues.length > 0 ? Math.min(...numericValues) : null
      : null;

  return (
    <tr className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]/50">
      <td className="sticky left-0 z-10 bg-[var(--color-bg)] px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide whitespace-nowrap">
        {label}
      </td>
      {values.map((v, i) => {
        const isBest =
          best !== null &&
          typeof v === "number" &&
          v === best &&
          numericValues.filter((n) => n === best).length < values.length; // don't highlight if all same
        return (
          <td
            // biome-ignore lint/suspicious/noArrayIndexKey: stable column order
            key={i}
            className={`px-4 py-3 text-center text-sm tabular-nums ${
              isBest
                ? "font-semibold text-green-600"
                : typeof v === "boolean" && v
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            {isBest ? (
              <span className="rounded-md bg-green-500/10 px-2 py-0.5">
                {format(v)}
              </span>
            ) : (
              format(v)
            )}
          </td>
        );
      })}
    </tr>
  );
}
```

#### `src/components/compare/CompareGrid.tsx`
The full comparison table with sections: Overview, Limits, Pricing, Capabilities, Benchmarks, Providers.

```tsx
import type { Model, ProviderOffer, Provider } from "@/data/schema";
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
              values={models.map((m) => (m.capabilities as Record<string, boolean | undefined>)[key] ?? false)}
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
```

#### `src/routes/compare.tsx`
Main compare page. URL-driven model selection.

```tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { ModelPicker } from "@/components/compare/ModelPicker";
import { CompareGrid } from "@/components/compare/CompareGrid";
import { getModelsByIds } from "@/data";

export const Route = createFileRoute("/compare")({
  // 📖 models param is a comma-separated list of model IDs in the URL
  validateSearch: (search: Record<string, unknown>) => ({
    models: typeof search.models === "string" ? search.models : "",
  }),
  component: ComparePage,
});

function ComparePage() {
  const { models: modelsParam } = Route.useSearch();
  const navigate = useNavigate();

  // 📖 Parse comma-separated IDs from URL
  const selectedIds = modelsParam ? modelsParam.split(",").filter(Boolean) : [];
  const models = getModelsByIds(selectedIds);

  const handleSelect = (ids: string[]) => {
    navigate({
      to: "/compare",
      search: { models: ids.join(",") },
      replace: true,
    });
  };

  return (
    <Container>
      <div className="py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Compare Models</h1>
          <p className="mt-1 text-[var(--color-text-muted)]">
            Select 2–4 models to compare side by side.
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <ModelPicker selected={selectedIds} onSelect={handleSelect} maxModels={4} />
        </div>

        {models.length >= 2 ? (
          <CompareGrid models={models} />
        ) : (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center text-[var(--color-text-muted)]">
            <div className="mb-2 text-4xl">⚖️</div>
            <p className="font-medium">Add at least 2 models to start comparing.</p>
            <p className="mt-1 text-sm">Use the search above to find models.</p>
          </div>
        )}
      </div>
    </Container>
  );
}
```

---

## FEATURE 3 — Find My Model Wizard (`/wizard`)

### Files to create

#### `src/lib/wizardPresets.ts`
Configuration for use-case presets and scoring weights.

```ts
import type { ModelCategory } from "@/data/schema";
import type { ModelCapabilities } from "@/data/schema";

export interface UseCasePreset {
  id: string;
  label: string;
  description: string;
  /** 📖 ModelCategory values that score bonus points */
  categoryBonus: ModelCategory[];
  /** 📖 Capability keys that score bonus points */
  capabilityBonus: (keyof ModelCapabilities)[];
  /** 📖 Higher = more relevant for large context models */
  contextBonus: boolean;
}

export const USE_CASE_PRESETS: UseCasePreset[] = [
  {
    id: "agentic-coding",
    label: "Agentic Coding",
    description: "Autonomous coding agents, multi-step tasks",
    categoryBonus: ["agentic", "flagship"],
    capabilityBonus: ["function_calling", "mcp", "computer_use", "code_execution", "parallel_tool_calls"],
    contextBonus: true,
  },
  {
    id: "code-gen",
    label: "Code Generation",
    description: "Writing and completing code, pair programming",
    categoryBonus: ["code", "flagship", "mid"],
    capabilityBonus: ["function_calling", "streaming", "diff_output"],
    contextBonus: false,
  },
  {
    id: "rag",
    label: "RAG / Documents",
    description: "Retrieval-augmented generation, large file processing",
    categoryBonus: ["flagship", "mid"],
    capabilityBonus: ["prompt_caching", "file_search", "citations", "vision"],
    contextBonus: true,
  },
  {
    id: "reasoning",
    label: "Complex Reasoning",
    description: "Math, logic, research, advanced problem solving",
    categoryBonus: ["reasoning", "flagship"],
    capabilityBonus: ["extended_thinking"],
    contextBonus: false,
  },
  {
    id: "local-private",
    label: "Local / Private",
    description: "Self-hosted, offline, or privacy-sensitive workloads",
    categoryBonus: ["small", "mid", "code"],
    capabilityBonus: [],
    contextBonus: false,
  },
];
```

#### `src/lib/wizardScoring.ts`
Pure scoring function that filters and ranks models based on wizard answers.

```ts
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
    const caps = model.capabilities as Record<string, boolean | undefined>;
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
```

#### `src/components/wizard/WizardStep.tsx`
Shell with progress bar, back/next navigation.

```tsx
interface Props {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export function WizardStep({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "Next →",
  nextDisabled = false,
}: Props) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs text-[var(--color-text-muted)]">
          <span>Step {step} of {totalSteps}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="mb-1 text-xl font-bold">{title}</h2>
      {subtitle && <p className="mb-6 text-[var(--color-text-muted)]">{subtitle}</p>}

      <div className="mb-8">{children}</div>

      <div className="flex gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm hover:bg-[var(--color-surface)]"
          >
            ← Back
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="rounded-lg bg-[var(--color-accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
```

#### `src/components/wizard/steps/StepBudget.tsx`
```tsx
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
```

#### `src/components/wizard/steps/StepUseCase.tsx`
```tsx
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
```

#### `src/components/wizard/steps/StepFeatures.tsx`
```tsx
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
```

#### `src/components/wizard/steps/StepDeployment.tsx`
```tsx
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
```

#### `src/components/wizard/WizardResults.tsx`
Ranked results list with score bar, compare link, and model detail link.

```tsx
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
```

#### `src/routes/wizard.tsx`
Multi-step wizard orchestrator.

```tsx
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
```

---

## MODIFICATIONS to existing files

### `src/data/index.ts` — add 2 helpers at the bottom
```ts
/** 📖 Fetch multiple models by IDs, preserving order, silently skipping unknowns */
export function getModelsByIds(ids: string[]): Model[] {
  return ids
    .map((id) => allModels.find((m) => m.id === id))
    .filter((m): m is Model => m !== undefined);
}

/** 📖 Return benchmark keys present on ALL given models (intersection) — used by CompareGrid */
export function getSharedBenchmarkKeys(models: Model[]): string[] {
  if (models.length === 0) return [];
  const sets = models.map(
    (m) => new Set(Object.keys(m.benchmarks ?? {}).filter((k) => k !== "custom")),
  );
  const first = sets[0];
  return [...first].filter((k) => sets.every((s) => s.has(k)));
}
```

### `src/components/layout/Header.tsx` — add 3 nav links
In the `<nav className="flex items-center gap-4 text-sm">` block, add after the Providers link:

```tsx
<Link
  to="/compare"
  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
  activeProps={{ className: "text-[var(--color-text)]" }}
>
  Compare
</Link>
<Link
  to="/cost"
  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
  activeProps={{ className: "text-[var(--color-text)]" }}
>
  Cost Sim
</Link>
<Link
  to="/wizard"
  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
  activeProps={{ className: "text-[var(--color-text)]" }}
>
  Find My Model
</Link>
```

### `src/routes/models/$modelId.tsx` — add "Simulate costs" link
After the `<OfferTable offers={offers} />` line, add:
```tsx
<div className="mt-4">
  <Link
    to="/cost"
    search={{ model: model.id }}
    className="text-sm text-[var(--color-accent)] hover:underline"
  >
    Simulate costs for {model.name} →
  </Link>
</div>
```

### `src/routes/index.tsx` — add wizard CTA
Add this above the `<DataTable>`:
```tsx
<div className="mb-4 flex items-center justify-between">
  <p className="text-sm text-[var(--color-text-muted)]">
    {allModels.length} models tracked
  </p>
  <Link
    to="/wizard"
    className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
  >
    ✦ Find My Model
  </Link>
</div>
```
(Also import `Link` from `@tanstack/react-router` and `allModels` from `@/data` if not already imported.)

---

## Final checklist

- [ ] `src/lib/costCalc.ts` — ✅ already done
- [ ] `src/lib/format.ts` — ✅ already done (formatMonthlyCost, formatTokenVolume added)
- [ ] `src/components/cost/CostInputPanel.tsx` — ✅ already done
- [ ] `src/components/cost/CostResultsTable.tsx` — create
- [ ] `src/routes/cost.tsx` — create
- [ ] `src/data/index.ts` — add getModelsByIds + getSharedBenchmarkKeys
- [ ] `src/components/compare/ModelPicker.tsx` — create
- [ ] `src/components/compare/CompareRow.tsx` — create
- [ ] `src/components/compare/CompareGrid.tsx` — create
- [ ] `src/routes/compare.tsx` — create
- [ ] `src/lib/wizardPresets.ts` — create
- [ ] `src/lib/wizardScoring.ts` — create
- [ ] `src/components/wizard/WizardStep.tsx` — create
- [ ] `src/components/wizard/steps/StepBudget.tsx` — create
- [ ] `src/components/wizard/steps/StepUseCase.tsx` — create
- [ ] `src/components/wizard/steps/StepFeatures.tsx` — create
- [ ] `src/components/wizard/steps/StepDeployment.tsx` — create
- [ ] `src/components/wizard/WizardResults.tsx` — create
- [ ] `src/routes/wizard.tsx` — create
- [ ] `src/components/layout/Header.tsx` — add 3 nav links
- [ ] `src/routes/models/$modelId.tsx` — add "Simulate costs" link
- [ ] `src/routes/index.tsx` — add wizard CTA + import Link

After all files are created, run `pnpm build` to verify TypeScript and no errors.

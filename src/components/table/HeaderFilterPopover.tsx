/**
 * @file HeaderFilterPopover — hover dropdown filter/sort UI inside header cells
 *
 * Appears on mouse hover over a header cell. Contains:
 * - text: live search input
 * - multi-select (Access, Category, Creator): checkbox pills with colors
 * - range (Context, Cost, benchmarks): min/max inputs + smart presets
 * - boolean: toggle switch
 * - Sort ASC / DESC / Clear controls
 * - Active filter dot indicator on header when filtered
 */

import { useState, useEffect, useCallback } from "react";
import type { Column } from "@tanstack/react-table";

/* ─── Icons ──────────────────────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="5.5" cy="5.5" r="4" />
      <line x1="8.5" y1="8.5" x2="12" y2="12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="1.5,5.5 4,8 9.5,2.5" />
    </svg>
  );
}

function SortAscIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="2" y1="9" x2="10" y2="9" />
      <line x1="2" y1="6" x2="10" y2="6" />
      <line x1="2" y1="3" x2="10" y2="3" />
      <polyline points="8,1 10,3 12,1" />
    </svg>
  );
}

function SortDescIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="2" y1="3" x2="10" y2="3" />
      <line x1="2" y1="6" x2="10" y2="6" />
      <line x1="2" y1="9" x2="10" y2="9" />
      <polyline points="8,11 10,9 12,11" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="2" y1="2" x2="9" y2="9" />
      <line x1="9" y1="2" x2="2" y2="9" />
    </svg>
  );
}

/* ─── Shared option lists ──────────────────────────────────────────────── */

export const ACCESS_OPTIONS = [
  { value: "api",   label: "API",   icon: "🔑", color: "text-red-400",   bg: "bg-red-500/10"   },
  { value: "free",  label: "Free",  icon: "🆓", color: "text-green-400",  bg: "bg-green-500/10" },
  { value: "local", label: "Local", icon: "💻", color: "text-blue-400",   bg: "bg-blue-500/10"  },
  { value: "sub",   label: "Sub",   icon: "💎", color: "text-violet-400", bg: "bg-violet-500/10"},
] as const;

export const CATEGORY_OPTIONS = [
  { value: "chat",        label: "Chat",        icon: undefined, color: undefined },
  { value: "reasoning",   label: "Reasoning",   icon: undefined, color: undefined },
  { value: "coding",      label: "Coding",      icon: undefined, color: undefined },
  { value: "vision",      label: "Vision",      icon: undefined, color: undefined },
  { value: "embedding",   label: "Embedding",   icon: undefined, color: undefined },
  { value: "multimodal",  label: "Multimodal",  icon: undefined, color: undefined },
  { value: "audio",       label: "Audio",       icon: undefined, color: undefined },
  { value: "fast",        label: "Fast",         icon: undefined, color: undefined },
  { value: "long-context",label: "LongCtx",     icon: undefined, color: undefined },
] as const;

export const CONTEXT_PRESETS = [
  { label: "< 32K",   min: 0,       max: 32_000   },
  { label: "32–128K", min: 32_000,  max: 128_000  },
  { label: "128K+",   min: 128_000, max: undefined},
];

export const BENCHMARK_PRESETS = [
  { label: "< 50",  min: 0,  max: 50  },
  { label: "50–70", min: 50, max: 70  },
  { label: "70–90", min: 70, max: 90  },
  { label: "90+",   min: 90, max: 100 },
];

const BENCHMARK_IDS = new Set([
  "swe_bench","verified_swe_bench","humaneval","mbpp","bigcodebench",
  "aider_polyglot","bfcl","mmlu","gpqa_diamond","math_500","gsm8k",
  "aime_2025","arena_elo","livebench","tier_list","humanity_last_exam",
  "tau_bench","terminal_bench",
]);

/* ─── ColumnMeta types ────────────────────────────────────────────────── */

interface ColumnMeta {
  filterVariant?: "text" | "multi-select" | "range" | "boolean" | "select";
  options?: { value: string; label: string; icon?: string; color?: string }[];
}

/* ─── Props ───────────────────────────────────────────────────────────── */

interface HeaderFilterPopoverProps {
  column: Column<unknown, unknown>;
  isSorted: false | "asc" | "desc";
  onSort: (dir: "asc" | "desc" | false) => void;
  filterValue: unknown;
  onFilterChange: (val: unknown) => void;
}

/* ─── Component ───────────────────────────────────────────────────────── */

export function HeaderFilterPopover({
  column,
  isSorted,
  onSort,
  filterValue,
  onFilterChange,
}: HeaderFilterPopoverProps) {
  const meta = column.columnDef.meta as ColumnMeta | undefined;
  const variant = meta?.filterVariant ?? "text";
  const canSort = column.getCanSort();
  const colId = column.id;

  const isContext   = colId === "context_window";
  const isBenchmark = BENCHMARK_IDS.has(colId);

  /* ── Multi-select ────────────────────────────── */
  const selectedValues = Array.isArray(filterValue) ? (filterValue as string[]) : [];

  const toggleValue = useCallback((val: string) => {
    const next = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];
    onFilterChange(next.length > 0 ? next : undefined);
  }, [selectedValues, onFilterChange]);

  /* ── Range ───────────────────────────────────── */
  const getRange = (): [number | undefined, number | undefined] => {
    if (typeof filterValue === "object" && filterValue !== null && !Array.isArray(filterValue)) {
      const r = filterValue as { min?: number; max?: number };
      return [r.min, r.max];
    }
    return [undefined, undefined];
  };

  const [rangeMin, rangeMax] = getRange();
  const [localMin, setLocalMin] = useState<number | undefined>(rangeMin);
  const [localMax, setLocalMax] = useState<number | undefined>(rangeMax);

  useEffect(() => {
    setLocalMin(rangeMin);
    setLocalMax(rangeMax);
  }, [rangeMin, rangeMax]);

  const applyRange = (min: number | undefined, max: number | undefined) => {
    onFilterChange(min === undefined && max === undefined ? undefined : { min, max });
  };

  /* ── Boolean ─────────────────────────────────── */
  const boolVal = filterValue === true || filterValue === "true" || filterValue === 1;

  /* ── Text ─────────────────────────────────────── */
  const textVal = (filterValue as string) ?? "";

  /* ── Select ──────────────────────────────────── */
  const selectVal = (filterValue as string) ?? "";

  /* ── Active state ──────────────────────────────── */
  const hasActiveFilter = (() => {
    if (variant === "multi-select") return selectedValues.length > 0;
    if (variant === "range" || isContext || isBenchmark) {
      return rangeMin !== undefined || rangeMax !== undefined;
    }
    if (variant === "boolean") return boolVal;
    if (variant === "select") return selectVal !== "";
    return textVal.length > 0;
  })();

  const handleClear = () => {
    if (variant === "multi-select") onFilterChange(undefined);
    else if (variant === "range" || isContext || isBenchmark) {
      onFilterChange(undefined);
      setLocalMin(undefined);
      setLocalMax(undefined);
    }
    else if (variant === "boolean") onFilterChange(undefined);
    else if (variant === "select") onFilterChange("");
    else onFilterChange("");
  };

  /* ── Options ─────────────────────────────────── */
  const multiOptions = colId === "supportedOn"
    ? ACCESS_OPTIONS
    : colId === "category"
    ? CATEGORY_OPTIONS
    : meta?.options ?? [];

  const presets = isContext ? CONTEXT_PRESETS : isBenchmark ? BENCHMARK_PRESETS : [];

  return (
    <div className="flex flex-col gap-2.5 p-3 min-w-[180px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Filter
        </span>
        {hasActiveFilter && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-[var(--color-text-muted)] hover:bg-[var(--color-border)] transition-colors"
          >
            <ClearIcon /> Clear
          </button>
        )}
      </div>

      {/* TEXT */}
      {variant === "text" && (
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={textVal}
            onChange={(e) => onFilterChange(e.target.value || undefined)}
            placeholder="Search..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] py-1.5 pl-7 pr-2.5 text-xs placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
          />
        </div>
      )}

      {/* SELECT (radio) */}
      {variant === "select" && (
        <div className="flex flex-col gap-1">
          {multiOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs hover:bg-[var(--color-surface)] transition-colors"
            >
              <input
                type="radio"
                name={`filter-${colId}`}
                value={opt.value}
                checked={selectVal === opt.value}
                onChange={() => onFilterChange(selectVal === opt.value ? undefined : opt.value)}
                className="peer hidden"
              />
              <span className="peer-checked:border-[var(--color-accent)] peer-checked:bg-[var(--color-accent)] flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-transparent transition-colors">
                {selectVal === opt.value && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>
              <span className="flex-1">
                {opt.icon && <span className="mr-1">{opt.icon}</span>}
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      )}

      {/* MULTI-SELECT (checkboxes) */}
      {variant === "multi-select" && (
        <div className="flex flex-col gap-1">
          {multiOptions.map((opt) => {
            const checked = selectedValues.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs hover:bg-[var(--color-surface)] transition-colors"
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={checked}
                  onChange={() => toggleValue(opt.value)}
                  className="peer hidden"
                />
                <span className={`peer-checked:border-[var(--color-accent)] peer-checked:bg-[var(--color-accent)] peer-checked:text-white flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border border-[var(--color-border)] bg-transparent transition-colors ${checked ? "text-white" : ""}`}>
                  {checked && <CheckIcon />}
                </span>
                <span className={`flex-1 ${opt.color ?? ""}`}>
                  {opt.icon && <span className="mr-1">{opt.icon}</span>}
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      )}

      {/* RANGE (number inputs) */}
      {(variant === "range" || isContext || isBenchmark) && (
        <div className="flex flex-col gap-2">
          {/* Preset pills */}
          {presets.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {presets.map((preset) => {
                const active = rangeMin === preset.min && rangeMax === preset.max;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setLocalMin(preset.min);
                      setLocalMax(preset.max);
                      applyRange(preset.min, preset.max);
                    }}
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors ${
                      active
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          )}
          {/* Min / Max */}
          <div className="flex items-center gap-1.5">
            <div className="flex-1">
              <input
                type="number"
                aria-label="Minimum value"
                placeholder="Min"
                value={localMin ?? ""}
                onChange={(e) => setLocalMin(e.target.value ? Number(e.target.value) : undefined)}
                onBlur={() => applyRange(localMin, localMax)}
                onKeyDown={(e) => { if (e.key === "Enter") applyRange(localMin, localMax); }}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1 text-xs [appearance:textfield] focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>
            <span className="text-[var(--color-text-muted)] text-xs">–</span>
            <div className="flex-1">
              <input
                type="number"
                aria-label="Maximum value"
                placeholder="Max"
                value={localMax ?? ""}
                onChange={(e) => setLocalMax(e.target.value ? Number(e.target.value) : undefined)}
                onBlur={() => applyRange(localMin, localMax)}
                onKeyDown={(e) => { if (e.key === "Enter") applyRange(localMin, localMax); }}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1 text-xs [appearance:textfield] focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* BOOLEAN */}
      {variant === "boolean" && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={boolVal}
            onClick={() => onFilterChange(boolVal ? undefined : true)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full border transition-colors ${
              boolVal
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                : "border-[var(--color-border)] bg-transparent"
            }`}
          >
            <span
              className={`inline-block h-3 w-3 rounded-full bg-white shadow transition-transform ${
                boolVal ? "translate-x-4" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-xs text-[var(--color-text-muted)]">
            {boolVal ? "✓ Yes" : "Any"}
          </span>
        </div>
      )}

      {/* SORT */}
      {canSort && (
        <div className="border-t border-[var(--color-border)] pt-2">
          <span className="mb-1.5 flex text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Sort
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => onSort(isSorted === "asc" ? false : "asc")}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg border py-1.5 px-2 text-xs transition-colors ${
                isSorted === "asc"
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]"
              }`}
            >
              <SortAscIcon /> Asc
            </button>
            <button
              type="button"
              onClick={() => onSort(isSorted === "desc" ? false : "desc")}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg border py-1.5 px-2 text-xs transition-colors ${
                isSorted === "desc"
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]"
              }`}
            >
              <SortDescIcon /> Desc
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

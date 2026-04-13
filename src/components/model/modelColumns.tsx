import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import {
  getCheapestInputPrice,
  getCheapestOutputPrice,
  getProviderCount,
} from "@/data";
import type { Model } from "@/data/schema";
import { formatPrice, formatTokens } from "@/lib/format";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Model>();

/** 📖 Compact benchmark score cell with color coding */
function BenchmarkCell({ score, max = 100 }: { score: number; max?: number }) {
  const pct = score / max;
  const colorClass =
    pct >= 0.9
      ? "text-emerald-400 font-semibold"
      : pct >= 0.7
        ? "text-green-400"
        : pct >= 0.5
          ? "text-yellow-400"
          : "text-[var(--color-text-muted)]";
  return (
    <span className={colorClass} title={`${score}/${max}`}>
      {score.toFixed(score % 1 === 0 ? 0 : 1)}
    </span>
  );
}

/** 📖 SWE score cell with special styling */
function SweBenchmarkCell({ score }: { score: number }) {
  return (
    <span
      className={
        score >= 70
          ? "text-emerald-400 font-semibold"
          : score >= 50
            ? "text-green-400"
            : "text-[var(--color-text-muted)]"
      }
      title={`SWE-Bench: ${score}%`}
    >
      {score.toFixed(1)}
    </span>
  );
}

/** 📖 Arena ELO cell with ranking colors */
function ArenaCell({ score }: { score: number }) {
  return (
    <span
      className={
        score >= 1400
          ? "text-purple-400 font-semibold"
          : score >= 1300
            ? "text-blue-400"
            : "text-[var(--color-text-muted)]"
      }
      title={`Arena ELO: ${score}`}
    >
      {score}
    </span>
  );
}

export const modelColumns = [
  // ============ IDENTITY ============
  columnHelper.accessor("name", {
    header: "Model",
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "includesString",
    size: 280,
  }),

  columnHelper.accessor("family", {
    header: "Family",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "equals",
  }),

  columnHelper.accessor("creator", {
    header: "Creator",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "equals",
    meta: { filterVariant: "select" },
  }),

  columnHelper.accessor("category", {
    header: "Cat",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "arrIncludes",
    meta: { filterVariant: "multi-select" },
  }),

  columnHelper.accessor("supportedOn", {
    header: "Access",
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: "arrIncludes",
    meta: { filterVariant: "multi-select" },
    cell: (info) => {
      const types = info.getValue();
      const config: Record<string, { icon: string; label: string; bg: string; text: string }> = {
        api:  { icon: "🔑", label: "API",  bg: "bg-red-500/10",   text: "text-red-400"   },
        free: { icon: "🆓", label: "Free", bg: "bg-green-500/10", text: "text-green-400"  },
        sub:  { icon: "💎", label: "Sub",  bg: "bg-violet-500/10",text: "text-violet-400" },
        local:{ icon: "💻", label: "Local",bg: "bg-blue-500/10",  text: "text-blue-400"   },
      };
      return (
        <div className="flex flex-wrap gap-1">
          {types.map((type) => {
            const c = config[type] ?? { icon: "•", label: type, bg: "bg-gray-500/10", text: "text-gray-400" };
            return (
              <span
                key={type}
                className={`inline-flex items-center gap-1 rounded ${c.bg} ${c.text} px-1.5 py-0.5 text-xs font-medium`
                }
              >
                <span>{c.icon}</span><span>{c.label}</span>
              </span>
            );
          })}
        </div>
      );
    },
  }),

  // ============ CONTEXT & COST ============
  columnHelper.accessor("context_window", {
    header: "Context",
    cell: (info) => formatTokens(info.getValue()),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    meta: { filterVariant: "range" },
  }),

  columnHelper.accessor("cost", {
    id: "cost_input",
    header: "In",
    cell: (info) => {
      const cost = info.getValue();
      return cost ? `$${cost.input}` : "—";
    },
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    meta: { filterVariant: "range" },
  }),

  columnHelper.accessor("cost", {
    id: "cost_output",
    header: "Out",
    cell: (info) => {
      const cost = info.getValue();
      return cost ? `$${cost.output}` : "—";
    },
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    meta: { filterVariant: "range" },
  }),

  // ============ CAPABILITIES ============
  columnHelper.accessor("reasoning", {
    header: "R",
    cell: (info) => (info.getValue() ? "✓" : "—"),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "equals",
    meta: { filterVariant: "boolean" },
  }),

  columnHelper.accessor((row) => row.capabilities.function_calling, {
    id: "function_calling",
    header: "TC",
    cell: (info) => (info.getValue() ? "✓" : "—"),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "equals",
    meta: { filterVariant: "boolean" },
  }),

  columnHelper.accessor("is_open_source", {
    header: "Open",
    cell: (info) => (info.getValue() ? "✓" : "—"),
    enableColumnFilter: true,
    filterFn: "equals",
    meta: { filterVariant: "boolean" },
  }),

  // ============ CODING BENCHMARKS ============
  columnHelper.accessor((row) => row.benchmarks?.swe_bench, {
    id: "swe_bench",
    header: "SWE",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <SweBenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.verified_swe_bench, {
    id: "verified_swe_bench",
    header: "SWE✓",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <SweBenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.humaneval, {
    id: "humaneval",
    header: "HE",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.mbpp, {
    id: "mbpp",
    header: "MBPP",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.bigcodebench, {
    id: "bigcodebench",
    header: "BCB",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.aider_polyglot, {
    id: "aider_polyglot",
    header: "Aider",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.bfcl, {
    id: "bfcl",
    header: "BFCL",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  // ============ REASONING & MATH ============
  columnHelper.accessor((row) => row.benchmarks?.mmlu, {
    id: "mmlu",
    header: "MMLU",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.gpqa_diamond, {
    id: "gpqa_diamond",
    header: "GPQA",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.math_500, {
    id: "math_500",
    header: "Math",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.gsm8k, {
    id: "gsm8k",
    header: "GSM8K",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.aime_2025, {
    id: "aime_2025",
    header: "AIME",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  // ============ ARENA & COMPOSITE ============
  columnHelper.accessor((row) => row.benchmarks?.arena_elo, {
    id: "arena_elo",
    header: "Arena",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <ArenaCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.livebench, {
    id: "livebench",
    header: "Live",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.tier_list, {
    id: "tier_list",
    header: "TIER",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  // ============ KNOWLEDGE ============
  columnHelper.accessor((row) => row.benchmarks?.humanity_last_exam, {
    id: "humanity_last_exam",
    header: "HLE",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  // ============ AGENTIC ============
  columnHelper.accessor((row) => row.benchmarks?.tau_bench, {
    id: "tau_bench",
    header: "TAU",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  columnHelper.accessor((row) => row.benchmarks?.terminal_bench, {
    id: "terminal_bench",
    header: "Term",
    cell: (info) => {
      const score = info.getValue();
      if (score === undefined) return "—";
      return <BenchmarkCell score={score} />;
    },
    enableSorting: true,
    enableColumnFilter: false,
  }),

  // ============ DATES & LINKS ============
  columnHelper.accessor("knowledge", {
    header: "Knt",
    cell: (info) => info.getValue() || "—",
    enableSorting: true,
  }),

  columnHelper.accessor("release_date", {
    header: "Rel",
    cell: (info) =>
      new Date(info.getValue()).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    enableSorting: true,
    sortingFn: "datetime",
  }),

  columnHelper.accessor("documentation_url", {
    header: "Docs",
    cell: (info) => {
      const url = info.getValue();
      if (!url) return "—";
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          🔗
        </a>
      );
    },
    enableSorting: false,
  }),

  columnHelper.display({
    id: "favorite",
    header: "★",
    cell: (info) => <FavoriteButton modelId={info.row.original.id} />,
  }),
];
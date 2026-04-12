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

export const modelColumns = [
  columnHelper.accessor("name", {
    header: "Model",
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "includesString",
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
    header: "Category",
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
      const labels: Record<string, string> = {
        free: "Free",
        api: "API",
        sub: "Sub",
        local: "Local",
      };
      return (
        <div className="flex flex-wrap gap-1">
          {types.map((type) => (
            <span
              key={type}
              className="inline-flex items-center rounded bg-[var(--color-accent)]/10 px-1.5 py-0.5 text-xs font-medium text-[var(--color-accent)]"
            >
              {labels[type] ?? type}
            </span>
          ))}
        </div>
      );
    },
  }),

  columnHelper.accessor("context_window", {
    header: "Context",
    cell: (info) => formatTokens(info.getValue()),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    meta: { filterVariant: "range" },
  }),

  columnHelper.accessor("cost", {
    header: "In $/M",
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
    header: "Out $/M",
    cell: (info) => {
      const cost = info.getValue();
      return cost ? `$${cost.output}` : "—";
    },
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    meta: { filterVariant: "range" },
  }),

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

  columnHelper.accessor("knowledge", {
    header: "Knowledge",
    cell: (info) => info.getValue() || "—",
    enableSorting: true,
  }),

  columnHelper.accessor("release_date", {
    header: "Released",
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
import {
  getCheapestInputPrice,
  getCheapestOutputPrice,
  getProviderCount,
} from "@/data";
import type { Model } from "@/data/schema";
import { formatPrice, formatTokens } from "@/lib/format";
import { createColumnHelper } from "@tanstack/react-table";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";

const columnHelper = createColumnHelper<Model>();

export const modelColumns = [
  columnHelper.accessor("name", {
    header: "Model",
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "includesString",
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

  columnHelper.accessor("context_window", {
    header: "Context",
    cell: (info) => formatTokens(info.getValue()),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    meta: { filterVariant: "range" },
  }),

  columnHelper.accessor((row) => getCheapestInputPrice(row.id), {
    id: "price_input",
    header: "Input $/Mtok",
    cell: (info) => formatPrice(info.getValue()),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    meta: { filterVariant: "range" },
  }),

  columnHelper.accessor((row) => getCheapestOutputPrice(row.id), {
    id: "price_output",
    header: "Output $/Mtok",
    cell: (info) => formatPrice(info.getValue()),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    meta: { filterVariant: "range" },
  }),

  columnHelper.accessor((row) => getProviderCount(row.id), {
    id: "provider_count",
    header: "Providers",
    enableSorting: true,
  }),

  columnHelper.accessor("is_open_source", {
    header: "Open",
    cell: (info) => (info.getValue() ? "✓" : "—"),
    enableColumnFilter: true,
    filterFn: "equals",
    meta: { filterVariant: "boolean" },
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

  columnHelper.display({
    id: "favorite",
    header: "★",
    cell: (info) => <FavoriteButton modelId={info.row.original.id} />,
  }),
];

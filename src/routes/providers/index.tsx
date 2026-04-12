import { DataTable } from "@/components/table/DataTable";
import { allProviders, getModelsForProvider } from "@/data";
import type { Provider } from "@/data/schema";
import { createFileRoute } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

export const Route = createFileRoute("/providers/")({
  component: ProvidersIndex,
});

const columnHelper = createColumnHelper<Provider>();

const providerColumns = [
  columnHelper.accessor("name", {
    header: "Provider",
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "equals",
    meta: { filterVariant: "select" },
  }),
  columnHelper.display({
    id: "model_count",
    header: "Models",
    cell: (info) => getModelsForProvider(info.row.original.id).length,
  }),
  columnHelper.accessor("has_free_tier", {
    header: "Free Tier",
    cell: (info) => (info.getValue() ? "✓" : "—"),
    enableColumnFilter: true,
    filterFn: "equals",
    meta: { filterVariant: "boolean" },
  }),
  columnHelper.accessor("openai_compatible", {
    header: "OpenAI",
    cell: (info) => (info.getValue() ? "✓" : "—"),
    enableColumnFilter: true,
    filterFn: "equals",
    meta: { filterVariant: "boolean" },
  }),
];

function ProvidersIndex() {
  return (
    <main className="px-4 py-6">
      <DataTable
          data={allProviders}
          columns={providerColumns}
          onRowClick={(provider) => {
            window.location.href = `/providers/${provider.id}`;
          }}
        />
    </main>
  );
}

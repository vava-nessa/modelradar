import { modelColumns } from "@/components/model/modelColumns";
import { DataTable } from "@/components/table/DataTable";
import { allModels } from "@/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-semibold">Models</h1>
        <DataTable
          data={allModels}
          columns={modelColumns}
          onRowClick={(model) => {
            window.location.href = `/models/${model.id}`;
          }}
        />
      </div>
    </main>
  );
}

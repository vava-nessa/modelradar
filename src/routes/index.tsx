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
      <DataTable
        data={allModels}
        columns={modelColumns}
        onRowClick={(model) => {
          window.location.href = `/models/${model.id}`;
        }}
        stickyFirstColumn={true}
      />
    </main>
  );
}

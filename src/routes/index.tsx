import { modelColumns } from "@/components/model/modelColumns";
import { DataTable } from "@/components/table/DataTable";
import { allModels } from "@/data";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="px-4 py-6">
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


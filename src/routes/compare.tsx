/**
 * @file Compare page route
 * @description Side-by-side model comparison page with URL-driven model selection.
 * 📖 Models are specified via ?models= comma-separated IDs in the URL.
 * 📖 Uses ModelPicker for selection and CompareGrid for the comparison table.
 * 📖 Supports 2–4 models simultaneously.
 *
 * @functions
 *   ComparePage → /compare route component with picker and grid
 *
 * @exports Route (TanStack Router file route)
 */

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

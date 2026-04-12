import { Container } from "@/components/layout/Container";
import { modelColumns } from "@/components/model/modelColumns";
import { DataTable } from "@/components/table/DataTable";
import { allModels } from "@/data";
import { useAuth } from "@/lib/auth";
import { useFavorites } from "@/lib/favorites";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw new Navigate({ to: "/login" });
    }
  },
});

function FavoritesPage() {
  const { data: user, isLoading: authLoading } = useAuth();
  const { data: favoriteIds = [], isLoading: favoritesLoading } = useFavorites();

  if (authLoading || favoritesLoading) {
    return (
      <Container>
        <main className="flex min-h-[60vh] items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 text-4xl">☆</div>
            <p className="text-[var(--color-text-muted)]">Loading favorites...</p>
          </div>
        </main>
      </Container>
    );
  }

  if (!user) {
    throw new Navigate({ to: "/login" });
  }

  const favoritesModels = allModels.filter((m) => favoriteIds.includes(m.id));

  if (favoritesModels.length === 0) {
    return (
      <Container>
        <main className="py-12">
          <h1 className="mb-6 text-2xl font-semibold">Favorites</h1>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
            <p className="mb-4 text-4xl">☆</p>
            <p className="mb-2 text-lg font-medium">No favorites yet</p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Star models you like to see them here.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block text-[var(--color-accent)] hover:underline"
            >
              Browse Models →
            </Link>
          </div>
        </main>
      </Container>
    );
  }

  return (
    <Container>
      <main className="py-6">
        <h1 className="mb-6 text-2xl font-semibold">
          Favorites ({favoritesModels.length})
        </h1>
        <DataTable
          data={favoritesModels}
          columns={modelColumns}
          onRowClick={(model) => {
            window.location.href = `/models/${model.id}`;
          }}
        />
      </main>
    </Container>
  );
}
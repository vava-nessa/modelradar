import { useIsFavorite, useToggleFavorite } from "@/lib/favorites";

interface FavoriteButtonProps {
  modelId: string;
}

export function FavoriteButton({ modelId }: FavoriteButtonProps) {
  const isFavorite = useIsFavorite(modelId);
  const toggleFavorite = useToggleFavorite();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite.mutate(modelId);
      }}
      className={`text-lg ${isFavorite ? "text-yellow-500" : "text-[var(--color-text-muted)]"} hover:opacity-80`}
      disabled={toggleFavorite.isPending}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}

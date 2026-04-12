import { useState } from "react";
import { useIsFavorite, useToggleFavorite } from "@/lib/favorites";
import { useAuth, isSupabaseConfigured } from "@/lib/auth";
import { Link } from "@tanstack/react-router";

interface FavoriteButtonProps {
  modelId: string;
}

export function FavoriteButton({ modelId }: FavoriteButtonProps) {
  const { data: user } = useAuth();
  const isFavorite = useIsFavorite(modelId);
  const toggleFavorite = useToggleFavorite();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    if (!isSupabaseConfigured()) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    toggleFavorite.mutate(modelId);
  };

  const isConfigured = isSupabaseConfigured();

  if (!user || !isConfigured) {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={handleClick}
          className="text-lg text-[var(--color-text-muted)] hover:opacity-80"
          title={!user ? "Sign in to save favorites" : "Favorites not configured"}
        >
          ☆
        </button>
        {showTooltip && (
          <div className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--color-text)] px-3 py-1.5 text-xs text-[var(--color-bg)]">
            {!user ? (
              <Link to="/login" className="hover:underline">
                Sign in to save favorites
              </Link>
            ) : (
              "Favorites not available"
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleClick}
        disabled={toggleFavorite.isPending}
        className={`text-lg transition-opacity ${isFavorite ? "text-yellow-500" : "text-[var(--color-text-muted)]"} ${toggleFavorite.isPending ? "cursor-wait opacity-50" : "hover:opacity-80"}`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "★" : "☆"}
      </button>
      {toggleFavorite.isError && (
        <div className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-red-600 px-3 py-1.5 text-xs text-white">
          Failed to update favorite
        </div>
      )}
    </div>
  );
}
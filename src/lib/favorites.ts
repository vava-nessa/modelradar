import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, isSupabaseConfigured } from "./auth";
import { getSupabase } from "./supabase";

export interface FavoriteResult {
  success: boolean;
  error?: string;
}

/** Hook to get all favorite model IDs for the current user.
 * Returns empty array if not authenticated or Supabase not configured.
 */
export function useFavorites() {
  const { data: user } = useAuth();

  return useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async (): Promise<string[]> => {
      if (!user) return [];
      if (!isSupabaseConfigured()) {
        console.warn("Favorites: Supabase not configured, returning empty array");
        return [];
      }

      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("favorites")
        .select("model_id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Favorites query error:", error.message);
        throw new Error(`Failed to load favorites: ${error.message}`);
      }

      return data.map((f) => f.model_id as string);
    },
    enabled: !!user && isSupabaseConfigured(),
    staleTime: 1000 * 60,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
}

/** Hook to check if a specific model is a favorite.
 * Returns false if not authenticated or Supabase not configured.
 */
export function useIsFavorite(modelId: string): boolean {
  const { data: favorites = [] } = useFavorites();
  return favorites.includes(modelId);
}

/** Hook to add or remove a model from favorites.
 * Uses optimistic update for immediate UI feedback.
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { data: user } = useAuth();
  const { data: favorites = [] } = useFavorites();

  return useMutation({
    mutationFn: async (modelId: string): Promise<void> => {
      if (!user) {
        throw new Error("You must be signed in to manage favorites");
      }
      if (!isSupabaseConfigured()) {
        throw new Error("Favorites are not available. Please contact support.");
      }

      const supabase = getSupabase();
      const isFavorite = favorites.includes(modelId);

      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("model_id", modelId);

        if (error) {
          console.error("Remove favorite error:", error.message);
          throw new Error(`Failed to remove favorite: ${error.message}`);
        }
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, model_id: modelId });

        if (error) {
          console.error("Add favorite error:", error.message);
          throw new Error(`Failed to add favorite: ${error.message}`);
        }
      }
    },

    onMutate: async (modelId) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", user?.id] });

      const previousFavorites = queryClient.getQueryData<string[]>(["favorites", user?.id]);

      queryClient.setQueryData<string[]>(["favorites", user?.id], (old = []) => {
        if (old.includes(modelId)) {
          return old.filter((id) => id !== modelId);
        }
        return [...old, modelId];
      });

      return { previousFavorites };
    },

    onError: (_err, _modelId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites", user?.id], context.previousFavorites);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
    },

    retry: 1,
  });
}
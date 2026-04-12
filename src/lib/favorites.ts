import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./auth";
import { supabase } from "./supabase";

/** Hooks TanStack Query pour les favoris.
 *
 * useFavorites() → { data: string[], isLoading }
 *   Retourne la liste des model_id favoris de l'utilisateur connecté.
 *
 * useToggleFavorite() → { mutate(modelId: string) }
 *   Ajoute ou retire un modèle des favoris (toggle).
 *   Optimistic update : le UI change immédiatement, rollback si erreur.
 *
 * useIsFavorite(modelId: string) → boolean
 *   Raccourci pour savoir si un modèle est en favori.
 */

export function useFavorites() {
  const { data: user } = useAuth();

  return useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("favorites")
        .select("model_id")
        .eq("user_id", user.id);
      if (error) throw error;
      return data.map((f) => f.model_id as string);
    },
    enabled: !!user,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { data: user } = useAuth();
  const { data: favorites = [] } = useFavorites();

  return useMutation({
    mutationFn: async (modelId: string) => {
      if (!user) throw new Error("Not authenticated");

      const isFavorite = favorites.includes(modelId);

      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("model_id", modelId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, model_id: modelId });
        if (error) throw error;
      }
    },
    onMutate: async (modelId) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", user?.id] });

      const previousFavorites = queryClient.getQueryData<string[]>([
        "favorites",
        user?.id,
      ]);

      queryClient.setQueryData<string[]>(
        ["favorites", user?.id],
        (old = []) => {
          if (old.includes(modelId)) {
            return old.filter((id) => id !== modelId);
          }
          return [...old, modelId];
        },
      );

      return { previousFavorites };
    },
    onError: (_err, _modelId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          ["favorites", user?.id],
          context.previousFavorites,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
    },
  });
}

export function useIsFavorite(modelId: string) {
  const { data: favorites = [] } = useFavorites();
  return favorites.includes(modelId);
}

import type { User } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./supabase";

/** Hook React pour l'état d'authentification.
 * Utilise TanStack Query pour cache et revalidation.
 */
export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
    staleTime: 1000 * 60 * 5,
  });
}

/** S'inscrire ou se connecter via magic link */
export function useSignInWithEmail() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    },
  });
}

/** Se connecter avec GitHub OAuth */
export function useSignInWithGithub() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    },
  });
}

/** Se déconnecter */
export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

/** Écouter les changements d'état d'authentification */
export function useOnAuthStateChange(callback: (user: User | null) => void) {
  useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      callback(user);
      return user;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

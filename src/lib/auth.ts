import type { AuthError, User } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSupabase, isSupabaseConfigured } from "./supabase";

/** Check if Supabase is properly configured with real credentials */
export { isSupabaseConfigured } from "./supabase";

/** Hook React pour l'état d'authentification.
 * Utilise TanStack Query pour cache et revalidation.
 */
export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async (): Promise<User | null> => {
      if (!isSupabaseConfigured()) {
        return null;
      }
      try {
        const supabase = getSupabase();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          console.error("Auth getUser error:", error.message);
          throw error;
        }
        return user;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}

/** Format auth error messages for user display */
export function formatAuthError(error: AuthError | Error | null): string {
  if (!error) return "An unknown error occurred";

  const message = error instanceof Error ? error.message : error.message;

  switch (message) {
    case "Invalid login credentials":
    case "Invalid credentials":
      return "Invalid email or password";
    case "Email not confirmed":
      return "Please confirm your email address first";
    case "User already registered":
      return "An account with this email already exists";
    case "Invalid email":
      return "Please enter a valid email address";
    case "Signup is disabled":
      return "Sign up is currently disabled";
    case "OAuth signin is disabled":
      return "Social login is currently disabled";
    case "Signup requires valid metadata":
      return "Invalid signup information";
    case "A user with this email address has already been registered":
      return "An account with this email already exists";
    case "Invalid token":
    case "Email link is invalid or has expired":
      return "The authentication link has expired or is invalid";
    case "Refresh token not found":
      return "Your session has expired. Please sign in again";
    case "Password should be at least 6 characters":
      return "Password must be at least 6 characters";
    case "Unable to reset password":
      return "Unable to reset password. The link may have expired";
    case "Password recovery link expired":
      return "Password reset link has expired. Please request a new one";
    default:
      if (message.includes("network")) {
        return "Network error. Please check your connection";
      }
      if ((error as AuthError).status === 429) {
        return "Too many requests. Please wait a moment and try again";
      }
      return message;
  }
}

/** S'inscrire avec email + password */
export function useSignUpWithEmail() {
  return useMutation({
    mutationFn: async (params: { email: string; password: string }): Promise<void> => {
      if (!isSupabaseConfigured()) {
        throw new Error("Authentication is not configured. Please contact support.");
      }
      const supabase = getSupabase();
      const { error } = await supabase.auth.signUp({
        email: params.email,
        password: params.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      if (error) {
        throw error;
      }
    },
    retry: 0,
  });
}

/** Se connecter avec email + password */
export function useSignInWithPassword() {
  return useMutation({
    mutationFn: async (params: { email: string; password: string }): Promise<void> => {
      if (!isSupabaseConfigured()) {
        throw new Error("Authentication is not configured. Please contact support.");
      }
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword({
        email: params.email,
        password: params.password,
      });
      if (error) {
        throw error;
      }
    },
    retry: 0,
  });
}

/** S'inscrire ou se connecter via magic link */
export function useSignInWithEmail() {
  return useMutation({
    mutationFn: async (email: string): Promise<void> => {
      if (!isSupabaseConfigured()) {
        throw new Error("Authentication is not configured. Please contact support.");
      }
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      if (error) {
        throw error;
      }
    },
    retry: 0,
  });
}

/** Se connecter avec GitHub OAuth */
export function useSignInWithGithub() {
  return useMutation({
    mutationFn: async (): Promise<void> => {
      if (!isSupabaseConfigured()) {
        throw new Error("Authentication is not configured. Please contact support.");
      }
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) {
        throw error;
      }
    },
    retry: 0,
  });
}

/** Mot de passe oublié - envoie un email de réinitialisation */
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string): Promise<void> => {
      if (!isSupabaseConfigured()) {
        throw new Error("Authentication is not configured. Please contact support.");
      }
      const supabase = getSupabase();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        throw error;
      }
    },
    retry: 0,
  });
}

/** Réinitialiser le mot de passe avec le nouveau mot de passe */
export function useResetPassword() {
  return useMutation({
    mutationFn: async (newPassword: string): Promise<void> => {
      if (!isSupabaseConfigured()) {
        throw new Error("Authentication is not configured. Please contact support.");
      }
      const supabase = getSupabase();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw error;
      }
    },
    retry: 0,
  });
}

/** Se déconnecter */
export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<void> => {
      if (!isSupabaseConfigured()) {
        return;
      }
      const supabase = getSupabase();
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.clear();
    },
    retry: 1,
  });
}
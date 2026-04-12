import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Vb7MWzfw.js
var supabaseUrl = "https://ublsavbiftwxpsxfyyyg.supabase.co";
var supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVibHNhdmJpZnR3eHBzeGZ5eXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzQ5MzcsImV4cCI6MjA4OTQ1MDkzN30.I2s5g22apzciZgILqazFqZZKyulirSHX7PN9vWyMi-k";
function isSupabaseConfigured() {
	return !!(supabaseUrl !== "placeholder" && supabaseAnonKey !== "placeholder_anon_key");
}
if (!isSupabaseConfigured()) console.warn("Supabase is using placeholder credentials. Authentication features will not work until real credentials are configured.");
var supabaseInstance = null;
function getSupabase() {
	if (!isSupabaseConfigured()) throw new Error("Supabase is not configured with real credentials. Please update your .env.local file.");
	if (!supabaseInstance) supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, { auth: {
		persistSession: true,
		autoRefreshToken: true
	} });
	return supabaseInstance;
}
/** Hook React pour l'état d'authentification.
* Utilise TanStack Query pour cache et revalidation.
*/
function useAuth() {
	return useQuery({
		queryKey: ["auth"],
		queryFn: async () => {
			if (!isSupabaseConfigured()) return null;
			try {
				const { data: { user }, error } = await getSupabase().auth.getUser();
				if (error) {
					console.error("Auth getUser error:", error.message);
					throw error;
				}
				return user;
			} catch {
				return null;
			}
		},
		staleTime: 1e3 * 60 * 5,
		retry: 1,
		retryDelay: (attemptIndex) => Math.min(1e3 * 2 ** attemptIndex, 1e4)
	});
}
/** Format auth error messages for user display */
function formatAuthError(error) {
	if (!error) return "An unknown error occurred";
	const message = error instanceof Error ? error.message : error.message;
	switch (message) {
		case "Invalid login credentials":
		case "Invalid credentials": return "Invalid email or password";
		case "Email not confirmed": return "Please confirm your email address first";
		case "User already registered": return "An account with this email already exists";
		case "Invalid email": return "Please enter a valid email address";
		case "Signup is disabled": return "Sign up is currently disabled";
		case "OAuth signin is disabled": return "Social login is currently disabled";
		case "Signup requires valid metadata": return "Invalid signup information";
		case "A user with this email address has already been registered": return "An account with this email already exists";
		case "Invalid token":
		case "Email link is invalid or has expired": return "The authentication link has expired or is invalid";
		case "Refresh token not found": return "Your session has expired. Please sign in again";
		case "Password should be at least 6 characters": return "Password must be at least 6 characters";
		case "Unable to reset password": return "Unable to reset password. The link may have expired";
		case "Password recovery link expired": return "Password reset link has expired. Please request a new one";
		default:
			if (message.includes("network")) return "Network error. Please check your connection";
			if (error.status === 429) return "Too many requests. Please wait a moment and try again";
			return message;
	}
}
/** S'inscrire avec email + password */
function useSignUpWithEmail() {
	return useMutation({
		mutationFn: async (params) => {
			if (!isSupabaseConfigured()) throw new Error("Authentication is not configured. Please contact support.");
			const { error } = await getSupabase().auth.signUp({
				email: params.email,
				password: params.password,
				options: { emailRedirectTo: `${window.location.origin}/` }
			});
			if (error) throw error;
		},
		retry: 0
	});
}
/** Se connecter avec email + password */
function useSignInWithPassword() {
	return useMutation({
		mutationFn: async (params) => {
			if (!isSupabaseConfigured()) throw new Error("Authentication is not configured. Please contact support.");
			const { error } = await getSupabase().auth.signInWithPassword({
				email: params.email,
				password: params.password
			});
			if (error) throw error;
		},
		retry: 0
	});
}
/** S'inscrire ou se connecter via magic link */
function useSignInWithEmail() {
	return useMutation({
		mutationFn: async (email) => {
			if (!isSupabaseConfigured()) throw new Error("Authentication is not configured. Please contact support.");
			const { error } = await getSupabase().auth.signInWithOtp({
				email,
				options: { emailRedirectTo: `${window.location.origin}/` }
			});
			if (error) throw error;
		},
		retry: 0
	});
}
/** Se connecter avec GitHub OAuth */
function useSignInWithGithub() {
	return useMutation({
		mutationFn: async () => {
			if (!isSupabaseConfigured()) throw new Error("Authentication is not configured. Please contact support.");
			const { error } = await getSupabase().auth.signInWithOAuth({
				provider: "github",
				options: { redirectTo: `${window.location.origin}/` }
			});
			if (error) throw error;
		},
		retry: 0
	});
}
/** Mot de passe oublié - envoie un email de réinitialisation */
function useForgotPassword() {
	return useMutation({
		mutationFn: async (email) => {
			if (!isSupabaseConfigured()) throw new Error("Authentication is not configured. Please contact support.");
			const { error } = await getSupabase().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
			if (error) throw error;
		},
		retry: 0
	});
}
/** Réinitialiser le mot de passe avec le nouveau mot de passe */
function useResetPassword() {
	return useMutation({
		mutationFn: async (newPassword) => {
			if (!isSupabaseConfigured()) throw new Error("Authentication is not configured. Please contact support.");
			const { error } = await getSupabase().auth.updateUser({ password: newPassword });
			if (error) throw error;
		},
		retry: 0
	});
}
/** Se déconnecter */
function useSignOut() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			if (!isSupabaseConfigured()) return;
			const { error } = await getSupabase().auth.signOut();
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.clear();
		},
		retry: 1
	});
}
//#endregion
export { useForgotPassword as a, useSignInWithGithub as c, useSignUpWithEmail as d, useAuth as i, useSignInWithPassword as l, getSupabase as n, useResetPassword as o, isSupabaseConfigured as r, useSignInWithEmail as s, formatAuthError as t, useSignOut as u };

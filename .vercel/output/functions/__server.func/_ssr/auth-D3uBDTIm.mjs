import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-D3uBDTIm.js
var supabaseUrl = "https://placeholder.supabase.co";
var supabaseAnonKey = "placeholder_anon_key";
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
	switch (error.message) {
		case "Invalid login credentials": return "Invalid email or password";
		case "Email not confirmed": return "Please confirm your email address first";
		case "User already registered": return "An account with this email already exists";
		case "Invalid email": return "Please enter a valid email address";
		case "Signup is disabled": return "Sign up is currently disabled";
		case "OAuth signin is disabled": return "Social login is currently disabled";
		case "Signup requires valid metadata": return "Invalid signup information";
		case "A user with this email address has already been registered": return "An account with this email already exists";
		case "Invalid token": return "The authentication link has expired or is invalid";
		case "Refresh token not found": return "Your session has expired. Please sign in again";
		default:
			if (error.message.includes("network")) return "Network error. Please check your connection";
			if (error.status === 429) return "Too many requests. Please wait a moment and try again";
			return error.message;
	}
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
export { useSignInWithEmail as a, useAuth as i, getSupabase as n, useSignInWithGithub as o, isSupabaseConfigured as r, useSignOut as s, formatAuthError as t };

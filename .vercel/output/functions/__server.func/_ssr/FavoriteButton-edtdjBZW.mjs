import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useAuth, n as getSupabase, r as isSupabaseConfigured } from "./auth-D3uBDTIm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FavoriteButton-edtdjBZW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Hook to get all favorite model IDs for the current user.
* Returns empty array if not authenticated or Supabase not configured.
*/
function useFavorites() {
	const { data: user } = useAuth();
	return useQuery({
		queryKey: ["favorites", user?.id],
		queryFn: async () => {
			if (!user) return [];
			if (!isSupabaseConfigured()) {
				console.warn("Favorites: Supabase not configured, returning empty array");
				return [];
			}
			const { data, error } = await getSupabase().from("favorites").select("model_id").eq("user_id", user.id).order("created_at", { ascending: false });
			if (error) {
				console.error("Favorites query error:", error.message);
				throw new Error(`Failed to load favorites: ${error.message}`);
			}
			return data.map((f) => f.model_id);
		},
		enabled: !!user && isSupabaseConfigured(),
		staleTime: 1e3 * 60,
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1e3 * 2 ** attemptIndex, 5e3)
	});
}
/** Hook to check if a specific model is a favorite.
* Returns false if not authenticated or Supabase not configured.
*/
function useIsFavorite(modelId) {
	const { data: favorites = [] } = useFavorites();
	return favorites.includes(modelId);
}
/** Hook to add or remove a model from favorites.
* Uses optimistic update for immediate UI feedback.
*/
function useToggleFavorite() {
	const queryClient = useQueryClient();
	const { data: user } = useAuth();
	const { data: favorites = [] } = useFavorites();
	return useMutation({
		mutationFn: async (modelId) => {
			if (!user) throw new Error("You must be signed in to manage favorites");
			if (!isSupabaseConfigured()) throw new Error("Favorites are not available. Please contact support.");
			const supabase = getSupabase();
			if (favorites.includes(modelId)) {
				const { error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("model_id", modelId);
				if (error) {
					console.error("Remove favorite error:", error.message);
					throw new Error(`Failed to remove favorite: ${error.message}`);
				}
			} else {
				const { error } = await supabase.from("favorites").insert({
					user_id: user.id,
					model_id: modelId
				});
				if (error) {
					console.error("Add favorite error:", error.message);
					throw new Error(`Failed to add favorite: ${error.message}`);
				}
			}
		},
		onMutate: async (modelId) => {
			await queryClient.cancelQueries({ queryKey: ["favorites", user?.id] });
			const previousFavorites = queryClient.getQueryData(["favorites", user?.id]);
			queryClient.setQueryData(["favorites", user?.id], (old = []) => {
				if (old.includes(modelId)) return old.filter((id) => id !== modelId);
				return [...old, modelId];
			});
			return { previousFavorites };
		},
		onError: (_err, _modelId, context) => {
			if (context?.previousFavorites) queryClient.setQueryData(["favorites", user?.id], context.previousFavorites);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
		},
		retry: 1
	});
}
function FavoriteButton({ modelId }) {
	const { data: user } = useAuth();
	const isFavorite = useIsFavorite(modelId);
	const toggleFavorite = useToggleFavorite();
	const [showTooltip, setShowTooltip] = (0, import_react.useState)(false);
	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!user) {
			setShowTooltip(true);
			setTimeout(() => setShowTooltip(false), 3e3);
			return;
		}
		if (!isSupabaseConfigured()) {
			setShowTooltip(true);
			setTimeout(() => setShowTooltip(false), 3e3);
			return;
		}
		toggleFavorite.mutate(modelId);
	};
	const isConfigured = isSupabaseConfigured();
	if (!user || !isConfigured) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative inline-block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: handleClick,
			className: "text-lg text-[var(--color-text-muted)] hover:opacity-80",
			title: !user ? "Sign in to save favorites" : "Favorites not configured",
			children: "☆"
		}), showTooltip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--color-text)] px-3 py-1.5 text-xs text-[var(--color-bg)]",
			children: !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "hover:underline",
				children: "Sign in to save favorites"
			}) : "Favorites not available"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative inline-block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: handleClick,
			disabled: toggleFavorite.isPending,
			className: `text-lg transition-opacity ${isFavorite ? "text-yellow-500" : "text-[var(--color-text-muted)]"} ${toggleFavorite.isPending ? "cursor-wait opacity-50" : "hover:opacity-80"}`,
			title: isFavorite ? "Remove from favorites" : "Add to favorites",
			children: isFavorite ? "★" : "☆"
		}), toggleFavorite.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-red-600 px-3 py-1.5 text-xs text-white",
			children: "Failed to update favorite"
		})]
	});
}
//#endregion
export { useFavorites as n, FavoriteButton as t };

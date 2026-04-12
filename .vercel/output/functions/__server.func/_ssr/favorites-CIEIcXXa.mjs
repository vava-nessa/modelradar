import { t as allModels } from "./data-D7EWEMVj.mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as Navigate, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Container } from "./Container-CgY9s-MS.mjs";
import { i as useAuth } from "./auth-DtuNQAhG.mjs";
import { n as useFavorites } from "./FavoriteButton-DTylPTvu.mjs";
import { t as modelColumns } from "./modelColumns-DYfQ6Q60.mjs";
import { t as DataTable } from "./DataTable-CL-yjd2J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-CIEIcXXa.js
var import_jsx_runtime = require_jsx_runtime();
function FavoritesPage() {
	const { data: user, isLoading: authLoading } = useAuth();
	const { data: favoriteIds = [], isLoading: favoritesLoading } = useFavorites();
	if (authLoading || favoritesLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-[60vh] items-center justify-center py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 text-4xl",
				children: "☆"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[var(--color-text-muted)]",
				children: "Loading favorites..."
			})]
		})
	}) });
	if (!user) throw new Navigate({ to: "/login" });
	const favoritesModels = allModels.filter((m) => favoriteIds.includes(m.id));
	if (favoritesModels.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-6 text-2xl font-semibold",
			children: "Favorites"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-4xl",
					children: "☆"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-lg font-medium",
					children: "No favorites yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[var(--color-text-muted)]",
					children: "Star models you like to see them here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-4 inline-block text-[var(--color-accent)] hover:underline",
					children: "Browse Models →"
				})
			]
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "mb-6 text-2xl font-semibold",
			children: [
				"Favorites (",
				favoritesModels.length,
				")"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			data: favoritesModels,
			columns: modelColumns,
			onRowClick: (model) => {
				window.location.href = `/models/${model.id}`;
			}
		})]
	}) });
}
//#endregion
export { FavoritesPage as component };

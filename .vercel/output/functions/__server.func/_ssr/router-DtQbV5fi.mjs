import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { a as createRouter, c as createFileRoute, d as Navigate, l as createRootRoute, n as Scripts, o as Outlet, r as HeadContent, s as lazyRouteComponent, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$5 } from "../_modelId-BCSTlzuj.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as useAuth, s as useSignOut } from "./auth-D3uBDTIm.mjs";
import { t as Route$6 } from "../_providerId-D0eRY7V-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DtQbV5fi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ThemeToggle() {
	const [theme, setTheme] = (0, import_react.useState)("auto");
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem("theme");
		if (stored) setTheme(stored);
	}, []);
	const toggleTheme = () => {
		const next = theme === "light" ? "dark" : theme === "dark" ? "auto" : "light";
		setTheme(next);
		localStorage.setItem("theme", next);
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const resolved = next === "auto" ? prefersDark ? "dark" : "light" : next;
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(resolved);
		document.documentElement.setAttribute("data-theme", next === "auto" ? "" : next);
		document.documentElement.style.colorScheme = resolved;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: toggleTheme,
		className: "rounded-md p-1.5 text-sm hover:bg-[var(--color-surface)]",
		title: `Current: ${theme}`,
		children: [
			theme === "light" && "☀️",
			theme === "dark" && "🌙",
			theme === "auto" && "🌓"
		]
	});
}
function Header() {
	const { data: user, isLoading, error } = useAuth();
	const signOut = useSignOut();
	const handleSignOut = async () => {
		try {
			await signOut.mutateAsync();
		} catch (err) {
			console.error("Sign out error:", err);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-50 h-12 border-b border-[var(--color-border)] bg-[var(--color-bg)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-full max-w-7xl items-center justify-between px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[var(--color-accent)]",
						children: "◆"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ModelRadar" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
						activeProps: { className: "text-[var(--color-text)]" },
						children: "Models"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/providers",
						className: "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
						activeProps: { className: "text-[var(--color-text)]" },
						children: "Providers"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[var(--color-text-muted)]",
					children: "..."
				}) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/favorites",
						className: "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
						children: "★ Favorites"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "max-w-[150px] truncate text-[var(--color-text-muted)]",
						children: user.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleSignOut,
						disabled: signOut.isPending,
						className: "rounded-md px-2 py-1 text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] disabled:cursor-not-allowed",
						children: signOut.isPending ? "..." : "Logout"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-white hover:opacity-90",
					children: "Login"
				})]
			})]
		})
	});
}
var THEME_INIT_SCRIPT = `(function(){
  try {
    var stored = window.localStorage.getItem('theme');
    var mode = (stored === 'light' || stored === 'dark' || stored === 'auto') 
      ? stored 
      : 'auto';
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode;
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    if (mode === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', mode);
    }
    root.style.colorScheme = resolved;
  } catch(e) {}
})();`;
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ModelRadar" },
			{
				name: "description",
				content: "Compare LLM models and providers"
			}
		],
		scripts: [{
			children: THEME_INIT_SCRIPT,
			suppressHydrationWarning: true
		}]
	}),
	component: RootDocument
});
function RootDocument() {
	const [queryClient] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: { staleTime: 1e3 * 60 * 5 } } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
			lang: "en",
			suppressHydrationWarning: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
				suppressHydrationWarning: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
				]
			})]
		})
	});
}
var $$splitComponentImporter$3 = () => import("./login-Dlg0EGNl.mjs");
var Route$3 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./favorites-CcxlzOt1.mjs");
var Route$2 = createFileRoute("/favorites")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	beforeLoad: ({ context }) => {
		if (!context.user) throw new Navigate({ to: "/login" });
	}
});
var $$splitComponentImporter$1 = () => import("./routes-BNPYiF4M.mjs");
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./providers-unNC9hnI.mjs");
var Route = createFileRoute("/providers/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var LoginRoute = Route$3.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$4
});
var FavoritesRoute = Route$2.update({
	id: "/favorites",
	path: "/favorites",
	getParentRoute: () => Route$4
});
var IndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$4
});
var ProvidersIndexRoute = Route.update({
	id: "/providers/",
	path: "/providers/",
	getParentRoute: () => Route$4
});
var ProvidersProviderIdRoute = Route$6.update({
	id: "/providers/$providerId",
	path: "/providers/$providerId",
	getParentRoute: () => Route$4
});
var rootRouteChildren = {
	IndexRoute,
	FavoritesRoute,
	LoginRoute,
	ModelsModelIdRoute: Route$5.update({
		id: "/models/$modelId",
		path: "/models/$modelId",
		getParentRoute: () => Route$4
	}),
	ProvidersProviderIdRoute,
	ProvidersIndexRoute
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
}
//#endregion
export { getRouter };

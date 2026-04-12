import { a as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { f as notFound, u as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as getModelsForProvider, o as getProviderById } from "./_ssr/data-DnJsm7Vj.mjs";
import { t as Container } from "./_ssr/Container-CgY9s-MS.mjs";
import { t as formatPrice } from "./_ssr/format-J35ANvIi.mjs";
import { t as Route } from "./_providerId-DSWvpYYQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_providerId-CNCIJ0h3.js
var import_jsx_runtime = require_jsx_runtime();
function ProviderPage() {
	const provider = getProviderById(Route.useParams().providerId);
	if (!provider) throw notFound();
	const models = getModelsForProvider(provider.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/providers",
				className: "mb-4 text-sm text-[var(--color-accent)] hover:underline",
				children: "← Back to Providers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mb-2 text-3xl font-bold",
						children: provider.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center gap-4 text-sm text-[var(--color-text-muted)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "capitalize rounded-full bg-[var(--color-surface)] px-3 py-1",
							children: provider.type
						}), provider.openai_compatible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-[var(--color-surface)] px-3 py-1",
							children: "OpenAI Compatible"
						})]
					}),
					provider.url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: provider.url,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-[var(--color-accent)] hover:underline",
						children: "Visit Website →"
					})
				]
			}),
			provider.regions && provider.regions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-sm font-semibold uppercase text-[var(--color-text-muted)]",
					children: "Regions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: provider.regions.map((region) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-[var(--color-surface)] px-3 py-1 text-sm",
						children: region
					}, region))
				})]
			}),
			provider.sdk && provider.sdk.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-sm font-semibold uppercase text-[var(--color-text-muted)]",
					children: "SDKs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: provider.sdk.map((sdk) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-[var(--color-surface)] px-3 py-1 text-sm",
						children: sdk
					}, sdk))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 text-lg font-semibold",
				children: "Available Models"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-md border border-[var(--color-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-[var(--color-surface)] text-xs uppercase text-[var(--color-text-muted)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left font-medium",
								children: "Model"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left font-medium",
								children: "Creator"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-right font-medium",
								children: "Input $/Mtok"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-right font-medium",
								children: "Output $/Mtok"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-center font-medium",
								children: "Status"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "text-sm",
						children: models.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-[var(--color-border)] hover:bg-[var(--color-surface)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/models/$modelId",
										params: { modelId: model.id },
										className: "text-[var(--color-accent)] hover:underline",
										children: model.name
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 capitalize",
									children: model.creator
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-right",
									children: formatPrice(model.offer.input_per_mtok)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-right",
									children: formatPrice(model.offer.output_per_mtok)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-2 py-0.5 text-xs ${model.offer.status === "ga" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : model.offer.status === "preview" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : model.offer.status === "beta" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`,
										children: model.offer.status
									})
								})
							]
						}, model.id))
					})]
				})
			})] })
		]
	}) });
}
//#endregion
export { ProviderPage as component };

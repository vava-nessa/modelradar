import { a as getOffersForModel, r as getModelById } from "./_ssr/data-D7EWEMVj.mjs";
import { a as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { f as notFound, u as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_modelId-BCSTlzuj.mjs";
import { t as Container } from "./_ssr/Container-CgY9s-MS.mjs";
import { t as FavoriteButton } from "./_ssr/FavoriteButton-edtdjBZW.mjs";
import { n as formatRateLimit, t as formatPrice } from "./_ssr/format-J35ANvIi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_modelId-B88ZywIl.js
var import_jsx_runtime = require_jsx_runtime();
function OfferTable({ offers }) {
	if (offers.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[var(--color-text-muted)]",
		children: "No offers available."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-md border border-[var(--color-border)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-[var(--color-surface)] text-xs uppercase text-[var(--color-text-muted)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-left font-medium",
						children: "Provider"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-left font-medium",
						children: "Type"
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
						className: "px-3 py-2 text-right font-medium",
						children: "Rate Limit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-center font-medium",
						children: "Status"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
				className: "text-sm",
				children: offers.map((offer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-[var(--color-border)] hover:bg-[var(--color-surface)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/providers/$providerId",
								params: { providerId: offer.provider_id },
								className: "text-[var(--color-accent)] hover:underline",
								children: offer.provider.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 capitalize",
							children: offer.provider.type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-right",
							children: formatPrice(offer.input_per_mtok)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-right",
							children: formatPrice(offer.output_per_mtok)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-right",
							children: formatRateLimit(offer.rate_limit_rpm)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-2 py-0.5 text-xs ${offer.status === "ga" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : offer.status === "preview" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : offer.status === "beta" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`,
								children: offer.status
							})
						})
					]
				}, `${offer.provider_id}-${offer.model_id}`))
			})]
		})
	});
}
function ModelPage() {
	const model = getModelById(Route.useParams().modelId);
	if (!model) throw notFound();
	const offers = getOffersForModel(model.id);
	const capabilityLabels = {
		streaming: "Streaming",
		function_calling: "Function Calling",
		json_mode: "JSON Mode",
		json_schema: "JSON Schema",
		system_prompt: "System Prompt",
		vision: "Vision",
		code_execution: "Code Execution",
		web_search: "Web Search",
		mcp: "MCP",
		computer_use: "Computer Use",
		extended_thinking: "Extended Thinking",
		citations: "Citations",
		prompt_caching: "Prompt Caching",
		batch_api: "Batch API",
		fine_tuning: "Fine-Tuning"
	};
	const trueCapabilities = Object.entries(model.capabilities).filter(([, value]) => value === true).map(([key]) => capabilityLabels[key] || key);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mb-4 text-sm text-[var(--color-accent)] hover:underline",
				children: "← Back to Models"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold",
							children: model.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteButton, { modelId: model.id })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center gap-4 text-sm text-[var(--color-text-muted)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "capitalize",
								children: model.creator
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "capitalize",
								children: model.category
							}),
							model.release_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Released",
								" ",
								new Date(model.release_date).toLocaleDateString("en-US", {
									month: "long",
									year: "numeric"
								})
							] })
						]
					}),
					model.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--color-text-muted)]",
						children: model.description
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-lg font-semibold",
					children: "Capabilities"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: trueCapabilities.map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-[var(--color-surface)] px-3 py-1 text-sm",
						children: cap
					}, cap))
				})]
			}),
			model.benchmarks && Object.keys(model.benchmarks).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-lg font-semibold",
					children: "Benchmarks"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
					children: Object.entries(model.benchmarks).filter(([, value]) => value !== void 0).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-[var(--color-border)] p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-xs uppercase text-[var(--color-text-muted)]",
							children: key.replace(/_/g, " ")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold",
							children: typeof value === "number" ? value.toFixed(1) : value
						})]
					}, key))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 text-lg font-semibold",
				children: "Provider Offers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferTable, { offers })] })
		]
	}) });
}
//#endregion
export { ModelPage as component };

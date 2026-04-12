import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as FavoriteButton } from "./FavoriteButton-edtdjBZW.mjs";
import { r as formatTokens } from "./format-J35ANvIi.mjs";
import { r as createColumnHelper } from "../_libs/@tanstack/react-table+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modelColumns-DzDWLAk7.js
var import_jsx_runtime = require_jsx_runtime();
var columnHelper = createColumnHelper();
var modelColumns = [
	columnHelper.accessor("name", {
		header: "Model",
		cell: (info) => info.getValue(),
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "includesString"
	}),
	columnHelper.accessor("family", {
		header: "Family",
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "equals"
	}),
	columnHelper.accessor("creator", {
		header: "Creator",
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "equals",
		meta: { filterVariant: "select" }
	}),
	columnHelper.accessor("category", {
		header: "Category",
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "arrIncludes",
		meta: { filterVariant: "multi-select" }
	}),
	columnHelper.accessor("supportedOn", {
		header: "Access",
		enableSorting: false,
		enableColumnFilter: true,
		filterFn: "arrIncludes",
		meta: { filterVariant: "multi-select" },
		cell: (info) => {
			const types = info.getValue();
			const labels = {
				free: "Free",
				api: "API",
				sub: "Sub",
				local: "Local"
			};
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1",
				children: types.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center rounded bg-[var(--color-accent)]/10 px-1.5 py-0.5 text-xs font-medium text-[var(--color-accent)]",
					children: labels[type] ?? type
				}, type))
			});
		}
	}),
	columnHelper.accessor("context_window", {
		header: "Context",
		cell: (info) => formatTokens(info.getValue()),
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "inNumberRange",
		meta: { filterVariant: "range" }
	}),
	columnHelper.accessor("cost", {
		header: "In $/M",
		cell: (info) => {
			const cost = info.getValue();
			return cost ? `$${cost.input}` : "—";
		},
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "inNumberRange",
		meta: { filterVariant: "range" }
	}),
	columnHelper.accessor("cost", {
		header: "Out $/M",
		cell: (info) => {
			const cost = info.getValue();
			return cost ? `$${cost.output}` : "—";
		},
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "inNumberRange",
		meta: { filterVariant: "range" }
	}),
	columnHelper.accessor("reasoning", {
		header: "R",
		cell: (info) => info.getValue() ? "✓" : "—",
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "equals",
		meta: { filterVariant: "boolean" }
	}),
	columnHelper.accessor((row) => row.capabilities.function_calling, {
		id: "function_calling",
		header: "TC",
		cell: (info) => info.getValue() ? "✓" : "—",
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "equals",
		meta: { filterVariant: "boolean" }
	}),
	columnHelper.accessor("is_open_source", {
		header: "Open",
		cell: (info) => info.getValue() ? "✓" : "—",
		enableColumnFilter: true,
		filterFn: "equals",
		meta: { filterVariant: "boolean" }
	}),
	columnHelper.accessor("knowledge", {
		header: "Knowledge",
		cell: (info) => info.getValue() || "—",
		enableSorting: true
	}),
	columnHelper.accessor("release_date", {
		header: "Released",
		cell: (info) => new Date(info.getValue()).toLocaleDateString("en-US", {
			month: "short",
			year: "numeric"
		}),
		enableSorting: true,
		sortingFn: "datetime"
	}),
	columnHelper.accessor("documentation_url", {
		header: "Docs",
		cell: (info) => {
			const url = info.getValue();
			if (!url) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: url,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "text-[var(--color-accent)] hover:underline",
				onClick: (e) => e.stopPropagation(),
				children: "🔗"
			});
		},
		enableSorting: false
	}),
	columnHelper.display({
		id: "favorite",
		header: "★",
		cell: (info) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteButton, { modelId: info.row.original.id })
	})
];
//#endregion
export { modelColumns as t };

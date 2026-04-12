import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as getModelsForProvider, n as allProviders } from "./data-DnJsm7Vj.mjs";
import { t as Container } from "./Container-CgY9s-MS.mjs";
import { r as createColumnHelper } from "../_libs/@tanstack/react-table+[...].mjs";
import { t as DataTable } from "./DataTable-CL-yjd2J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/providers-mVlnBGjO.js
var import_jsx_runtime = require_jsx_runtime();
var columnHelper = createColumnHelper();
var providerColumns = [
	columnHelper.accessor("name", {
		header: "Provider",
		cell: (info) => info.getValue(),
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "includesString"
	}),
	columnHelper.accessor("type", {
		header: "Type",
		cell: (info) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "capitalize",
			children: info.getValue()
		}),
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "equals",
		meta: { filterVariant: "select" }
	}),
	columnHelper.display({
		id: "model_count",
		header: "Models",
		cell: (info) => getModelsForProvider(info.row.original.id).length
	}),
	columnHelper.accessor("has_free_tier", {
		header: "Free Tier",
		cell: (info) => info.getValue() ? "✓" : "—",
		enableColumnFilter: true,
		filterFn: "equals",
		meta: { filterVariant: "boolean" }
	}),
	columnHelper.accessor("openai_compatible", {
		header: "OpenAI",
		cell: (info) => info.getValue() ? "✓" : "—",
		enableColumnFilter: true,
		filterFn: "equals",
		meta: { filterVariant: "boolean" }
	})
];
function ProvidersIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-6 text-2xl font-semibold",
			children: "Providers"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			data: allProviders,
			columns: providerColumns,
			onRowClick: (provider) => {
				window.location.href = `/providers/${provider.id}`;
			}
		})]
	}) });
}
//#endregion
export { ProvidersIndex as component };

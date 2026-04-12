import { i as getModelsForProvider, n as allProviders } from "./data-D7EWEMVj.mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as createColumnHelper } from "../_libs/@tanstack/react-table+[...].mjs";
import { t as DataTable } from "./DataTable-CoYvbyZJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/providers-SHuf_gHY.js
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			data: allProviders,
			columns: providerColumns,
			onRowClick: (provider) => {
				window.location.href = `/providers/${provider.id}`;
			}
		})
	});
}
//#endregion
export { ProvidersIndex as component };

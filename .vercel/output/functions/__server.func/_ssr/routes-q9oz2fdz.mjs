import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as allModels } from "./data-DnJsm7Vj.mjs";
import { t as modelColumns } from "./modelColumns-DzDWLAk7.mjs";
import { t as DataTable } from "./DataTable-CL-yjd2J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-q9oz2fdz.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mb-6 text-2xl font-semibold",
				children: "Models"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				data: allModels,
				columns: modelColumns,
				onRowClick: (model) => {
					window.location.href = `/models/${model.id}`;
				}
			})]
		})
	});
}
//#endregion
export { Index as component };

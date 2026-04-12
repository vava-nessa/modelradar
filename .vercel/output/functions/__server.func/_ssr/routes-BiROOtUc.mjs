import { t as allModels } from "./data-D7EWEMVj.mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as modelColumns } from "./modelColumns-DYfQ6Q60.mjs";
import { t as DataTable } from "./DataTable-CL-yjd2J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BiROOtUc.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			data: allModels,
			columns: modelColumns,
			onRowClick: (model) => {
				window.location.href = `/models/${model.id}`;
			}
		})
	});
}
//#endregion
export { Index as component };

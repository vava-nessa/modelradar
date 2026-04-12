import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as getFilteredRowModel, i as getCoreRowModel, n as useReactTable, o as getSortedRowModel, t as flexRender } from "../_libs/@tanstack/react-table+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DataTable-CoYvbyZJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DataTable({ data, columns, onRowClick, stickyFirstColumn = false }) {
	const [sorting, setSorting] = (0, import_react.useState)([]);
	const [columnFilters, setColumnFilters] = (0, import_react.useState)([]);
	const [columnVisibility, setColumnVisibility] = (0, import_react.useState)({});
	const containerRef = (0, import_react.useRef)(null);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		enableMultiSort: true
	});
	const { rows } = table.getRowModel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: containerRef,
			className: "relative overflow-auto rounded-md border border-[var(--color-border)]",
			style: { maxHeight: "70vh" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "sticky top-0 z-20 bg-[var(--color-surface)] text-xs uppercase text-[var(--color-text-muted)]",
					children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headerGroup.headers.map((header, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: `
                      px-3 py-2 text-left font-medium
                      ${stickyFirstColumn && i === 0 ? "sticky left-0 z-30 bg-[var(--color-surface)]" : ""}
                    `,
						onClick: header.column.getCanSort() ? header.column.getToggleSortingHandler() : void 0,
						style: { cursor: header.column.getCanSort() ? "pointer" : "default" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [flexRender(header.column.columnDef.header, header.getContext()), header.column.getIsSorted() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[var(--color-accent)]",
								children: header.column.getIsSorted() === "asc" ? "↑" : "↓"
							})]
						})
					}, header.id)) }, headerGroup.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "text-sm",
					children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "cursor-pointer border-t border-[var(--color-border)] hover:bg-[var(--color-surface)]",
						onClick: () => onRowClick?.(row.original),
						children: row.getVisibleCells().map((cell, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: `
                      px-3 py-2
                      ${stickyFirstColumn && i === 0 ? "sticky left-0 z-10 bg-[var(--color-bg)]" : ""}
                    `,
							children: flexRender(cell.column.columnDef.cell, cell.getContext())
						}, cell.id))
					}, row.id))
				})]
			})
		})
	});
}
//#endregion
export { DataTable as t };

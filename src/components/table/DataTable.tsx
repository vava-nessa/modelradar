/**
 * @file DataTable — generic sortable/filterable table with persisted column prefs
 *
 * Features:
 * - Sortable columns with multi-sort support
 * - Column visibility, order & presets persisted to localStorage
 * - Preferences modal (Prefs button top-right)
 * - Sticky first column for horizontal scroll context
 */

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRef, useState } from "react";
import { useTablePreferences } from "@/lib/useTablePreferences";
import { TablePreferencesModal, TablePrefsButton } from "@/components/table/TablePreferencesModal";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  onRowClick?: (row: TData) => void;
  /** 📖 Sticky first column (e.g. model name) for horizontal scroll context */
  stickyFirstColumn?: boolean;
}

export function DataTable<TData>({
  data,
  columns,
  onRowClick,
  stickyFirstColumn = false,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPrefs, setShowPrefs] = useState(false);

  /* Derive column ids + labels from column defs */
  const allColumnIds = columns.map((c) => (c as { id?: string }).id ?? "");
  const allColumnLabels = columns.map((c) => {
    if (typeof c.header === "string") return c.header;
    return (c as { id?: string }).id ?? "";
  });
  const allColumns = allColumnIds.map((id, i) => ({
    id,
    label: allColumnLabels[i] || id,
  })).filter((c) => c.id);

  /* Table preferences hook — handles visibility, order & presets */
  const prefs = useTablePreferences({ allColumnIds });

  /* Build visibility from prefs */
  const columnVisibility: VisibilityState = prefs.visibility;

  /* Reorder columns based on prefs order */
  const orderedColumns = prefs.getColumnOrder(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns as any,
  );

  const table = useReactTable({
    // @ts-expect-error – orderedColumns is Column<unknown, unknown>[] which is assignable
    columns: orderedColumns,
    data,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: (updater) => {
      // Sync back to prefs — when table internally updates visibility
      const next = typeof updater === "function" ? updater(columnVisibility) : updater;
      // prefs.visibility is updated by the toggle function directly
      void next;
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiSort: true,
  });

  const { rows } = table.getRowModel();

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar: prefs button */}
      <div className="flex items-center justify-end">
        <TablePrefsButton
          onClick={() => setShowPrefs(true)}
          activePreset={prefs.activePreset || undefined}
        />
      </div>

      {/* Table */}
      <div
        ref={containerRef}
        className="relative overflow-auto rounded-md border border-[var(--color-border)] shadow-sm"
        style={{ maxHeight: "calc(100vh - 7rem)" }}
      >
        <table className="w-full">
          <thead className="sticky top-0 z-20 bg-[var(--color-surface)] text-xs uppercase tracking-wider text-[var(--color-text-muted)] shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => (
                  <th
                    key={header.id}
                    className={`
                      px-2.5 py-2 text-left font-medium border-x border-[var(--color-border)] first:border-l-0 last:border-r-0
                      ${header.column.getIsSorted() ? "bg-[var(--color-accent)]/10" : ""}
                      ${stickyFirstColumn && i === 0 ? "sticky left-0 z-30 bg-[var(--color-surface)] border-r" : ""}
                    `}
                    style={{ width: stickyFirstColumn && i === 0 ? header.getSize() : undefined }}
                  >
                    <div
                      className={`flex items-center gap-1 ${header.column.getCanSort() ? "cursor-pointer select-none hover:opacity-80" : ""}`}
                      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (header.column.getCanSort()) {
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }
                      }}
                      tabIndex={header.column.getCanSort() ? 0 : undefined}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="inline-block w-4 text-center select-none">
                        {header.column.getIsSorted() ? (
                          <span className="text-[var(--color-accent)]">
                            {header.column.getIsSorted() === "asc" ? "↑" : "↓"}
                          </span>
                        ) : (
                          header.column.getCanSort() ? (
                            <span className="opacity-0">↑</span>
                          ) : null
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer border-t border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors duration-150"
                onClick={() => onRowClick?.(row.original)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onRowClick?.(row.original);
                  }
                }}
                tabIndex={0}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <td
                    key={cell.id}
                    className={`
                      px-2.5 py-1.5 border-x border-[var(--color-border)] first:border-l-0 last:border-r-0
                      ${stickyFirstColumn && i === 0 ? "sticky left-0 z-10 bg-[var(--color-bg)] border-r" : ""}
                    `}
                    style={
                      stickyFirstColumn && i === 0
                        ? { width: cell.column.getSize(), minWidth: cell.column.getSize() }
                        : undefined
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preferences modal */}
      {showPrefs && (
        <TablePreferencesModal
          prefs={prefs}
          allColumns={allColumns}
          onClose={() => setShowPrefs(false)}
        />
      )}
    </div>
  );
}

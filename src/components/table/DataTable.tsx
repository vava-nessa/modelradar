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
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiSort: true,
  });

  const { rows } = table.getRowModel();

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="relative overflow-auto"
        style={{ height: "100%" }}
      >
        <table className="w-full">
          <thead className="sticky top-0 z-20 bg-[var(--color-surface)] text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => (
                  <th
                    key={header.id}
                    className={`
                      px-4 py-3 text-left font-medium border-x border-[var(--color-border)] first:border-l-0 last:border-r-0
                      ${stickyFirstColumn && i === 0 ? "sticky left-0 z-30 bg-[var(--color-surface)] border-r" : ""}
                    `}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (header.column.getCanSort()) {
                          header.column.getToggleSortingHandler()?.(e);
                        }
                      }
                    }}
                    tabIndex={header.column.getCanSort() ? 0 : undefined}
                    style={{ cursor: header.column.getCanSort() ? "pointer" : "default", width: stickyFirstColumn && i === 0 ? header.getSize() : undefined }}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="inline-block w-4 text-center select-none">
                        {header.column.getIsSorted() ? (
                          <span className="text-[var(--color-accent)]">
                            {header.column.getIsSorted() === "asc" ? "↑" : "↓"}
                          </span>
                        ) : (
                          header.column.getCanSort() ? <span className="opacity-0">↑</span> : null
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
                  if (e.key === 'Enter' || e.key === ' ') {
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
                      px-4 py-3 border-x border-[var(--color-border)] first:border-l-0 last:border-r-0
                      ${stickyFirstColumn && i === 0 ? "sticky left-0 z-10 bg-[var(--color-bg)] border-r" : ""}
                    `}
                    style={stickyFirstColumn && i === 0 ? { width: cell.column.getSize(), minWidth: cell.column.getSize() } : undefined}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

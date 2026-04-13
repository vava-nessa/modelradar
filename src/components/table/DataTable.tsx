/**
 * @file DataTable — virtualized sortable/filterable table with hover popovers
 *
 * Features:
 * - Virtualized tbody via @tanstack/react-virtual (fixed 44px rows, 10 overscan)
 * - Drag & drop column reordering via header cells
 * - Hover-triggered filter/sort popover per header cell
 * - Column visibility, order & presets persisted to localStorage
 * - Locked columns (e.g. "name"/Model) — pinned, always visible, non-draggable
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
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState } from "react";
import { useTablePreferences, LOCKED_COLUMN_IDS } from "@/lib/useTablePreferences";
import { TablePreferencesModal, TablePrefsButton } from "@/components/table/TablePreferencesModal";
import { HeaderFilterPopover } from "@/components/table/HeaderFilterPopover";

/* ─── Fixed row height for virtualization ──────────────────────────────── */
const ROW_HEIGHT = 44;

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  onRowClick?: (row: TData) => void;
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

  /* Active filter popover column index */
  const [hoveredColIdx, setHoveredColIdx] = useState<number | null>(null);

  /* Header drag state */
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  /* Column ids + labels */
  const allColumnIds = columns.map((c) => (c as { id?: string }).id ?? "");
  const allColumnLabels = columns.map((c) =>
    typeof c.header === "string" ? c.header : (c as { id?: string }).id ?? "",
  );
  const allColumns = allColumnIds
    .map((id, i) => ({ id, label: allColumnLabels[i] || id }))
    .filter((c) => c.id);

  /* Preferences */
  const prefs = useTablePreferences({ allColumnIds });
  const columnVisibility: VisibilityState = prefs.visibility;

  // @ts-ignore – getColumnOrder accepts Column<unknown,unknown>[] which is compatible
  const orderedColumns = prefs.getColumnOrder(columns);

  /* ── TanStack table ─────────────────────────────────────────────── */
  const table = useReactTable({
    // @ts-expect-error – orderedColumns type mismatch with generic
    columns: orderedColumns,
    data,
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: () => { /* visibility managed via prefs */ },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiSort: true,
  });

  const { rows } = table.getRowModel();

  /* ── Virtualizer ─────────────────────────────────────────────────── */
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  /* ── Header drag handlers ─────────────────────────────────────────── */
  const handleHeaderDragStart = (e: React.DragEvent, visualIdx: number) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggingIdx(visualIdx);
  };

  const handleHeaderDragOver = (e: React.DragEvent, visualIdx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIdx(visualIdx);
  };

  const handleHeaderDrop = (e: React.DragEvent, toVisualIdx: number) => {
    e.preventDefault();
    if (draggingIdx !== null && draggingIdx !== toVisualIdx) {
      prefs.moveColumn(draggingIdx, toVisualIdx);
    }
    setDraggingIdx(null);
    setDragOverIdx(null);
  };

  const handleHeaderDragEnd = () => {
    setDraggingIdx(null);
    setDragOverIdx(null);
  };

  /* ── Filter helpers ──────────────────────────────────────────────── */
  const getColumnFilter = (colId: string): unknown => {
    const found = columnFilters.find((f) => f.id === colId);
    return found?.value;
  };

  const setColumnFilter = (colId: string, value: unknown) => {
    const cleaned = value === undefined || value === "" || (Array.isArray(value) && value.length === 0)
      ? columnFilters.filter((f) => f.id !== colId)
      : [
          ...columnFilters.filter((f) => f.id !== colId),
          { id: colId, value },
        ];
    setColumnFilters(cleaned as ColumnFiltersState);
  };

  /* ── Render ───────────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex items-center justify-end">
        <TablePrefsButton
          onClick={() => setShowPrefs(true)}
          activePreset={prefs.activePreset || undefined}
        />
      </div>

      {/* Scrollable table container */}
      <div
        ref={containerRef}
        className="relative overflow-auto rounded-md border border-[var(--color-border)] shadow-sm"
        style={{ maxHeight: "calc(100vh - 7rem)" }}
      >
        <table className="w-full">
          {/* ── THEAD (sticky) ─────────────────────────────────────── */}
          <thead className="sticky top-0 z-30 bg-[var(--color-surface)] text-xs uppercase tracking-wider text-[var(--color-text-muted)] shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, visualIdx) => {
                  const colId = header.column.id;
                  const isLocked = LOCKED_COLUMN_IDS.includes(colId as typeof LOCKED_COLUMN_IDS[number]);
                  const isSorted = header.column.getIsSorted();
                  const isHovered = hoveredColIdx === visualIdx;
                  const hasActiveFilter = getColumnFilter(colId) !== undefined;

                  return (
                    <th
                      key={header.id}
                      draggable={!isLocked}
                      onDragStart={(e) => handleHeaderDragStart(e, visualIdx)}
                      onDragOver={(e) => handleHeaderDragOver(e, visualIdx)}
                      onDrop={(e) => handleHeaderDrop(e, visualIdx)}
                      onDragEnd={handleHeaderDragEnd}
                      onMouseEnter={() => setHoveredColIdx(visualIdx)}
                      onMouseLeave={() => setHoveredColIdx(null)}
                      className={`
                        relative px-2.5 py-2 text-left font-medium border-x border-[var(--color-border)]
                        first:border-l-0 last:border-r-0
                        ${isSorted ? "bg-[var(--color-accent)]/10" : ""}
                        ${draggingIdx === visualIdx ? "opacity-40" : ""}
                        ${dragOverIdx === visualIdx && draggingIdx !== null && draggingIdx !== visualIdx ? "border-l-2 border-[var(--color-accent)]" : ""}
                        ${stickyFirstColumn && visualIdx === 0 ? "sticky left-0 z-40 bg-[var(--color-surface)] border-r" : ""}
                        ${isLocked ? "cursor-default" : "cursor-grab active:cursor-grabbing"}
                      `}
                      style={{
                        width: stickyFirstColumn && visualIdx === 0 ? header.getSize() : undefined,
                        minWidth: stickyFirstColumn && visualIdx === 0 ? header.getSize() : undefined,
                      }}
                    >
                      <div
                        className={`flex items-center gap-1 ${header.column.getCanSort() && !isLocked ? "cursor-pointer select-none" : ""}`}
                        onClick={
                          header.column.getCanSort() && !isLocked
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        onKeyDown={(e) => {
                          if ((e.key === "Enter" || e.key === " ") && header.column.getCanSort() && !isLocked) {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={header.column.getCanSort() && !isLocked ? 0 : undefined}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}

                        {/* Sort indicator */}
                        <span className="inline-block w-4 text-center select-none">
                          {isSorted ? (
                            <span className="text-[var(--color-accent)]">
                              {isSorted === "asc" ? "↑" : "↓"}
                            </span>
                          ) : header.column.getCanSort() ? (
                            <span className="opacity-0">↑</span>
                          ) : null}
                        </span>

                        {/* Active filter dot */}
                        {hasActiveFilter && !isSorted && (
                          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                        )}
                      </div>

                      {/* ── Hover popover ── */}
                      {isHovered && (
                        <div
                          className="absolute left-0 top-full z-50 mt-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xl"
                          onMouseEnter={() => setHoveredColIdx(visualIdx)}
                          onMouseLeave={() => setHoveredColIdx(null)}
                        >
                          <HeaderFilterPopover
                            column={header.column}
                            isSorted={isSorted}
                            onSort={(dir) => {
                              if (dir === false) {
                                setSorting((s) => s.filter((x) => x.id !== colId));
                              } else {
                                setSorting((s) => {
                                  const without = s.filter((x) => x.id !== colId);
                                  return [...without, { id: colId, desc: dir === "desc" }];
                                });
                              }
                            }}
                            filterValue={getColumnFilter(colId)}
                            onFilterChange={(val) => setColumnFilter(colId, val)}
                          />
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* ── TBODY (virtualized) ─────────────────────────────────── */}
          <tbody>
            {/* Virtualizer spacer — sets tbody scroll height */}
            <tr style={{ height: totalSize, padding: 0, border: 0 }}>
              <td colSpan={orderedColumns.length} style={{ padding: 0, border: 0, height: "100%" }} />
            </tr>

            {/* Only render visible rows */}
            {virtualItems.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  className="cursor-pointer border-t border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors duration-100"
                  onClick={() => onRowClick?.(row.original)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onRowClick?.(row.original);
                    }
                  }}
                  tabIndex={0}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: ROW_HEIGHT,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell, visualIdx) => (
                    <td
                      key={cell.id}
                      className={`
                        px-2.5 py-2 border-x border-[var(--color-border)] first:border-l-0 last:border-r-0
                        ${stickyFirstColumn && visualIdx === 0 ? "sticky left-0 z-10 bg-[var(--color-bg)] border-r" : ""}
                      `}
                      style={
                        stickyFirstColumn && visualIdx === 0
                          ? { width: cell.column.getSize(), minWidth: cell.column.getSize() }
                          : undefined
                      }
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
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

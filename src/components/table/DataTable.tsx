/**
 * @file DataTable — virtualized sortable/filterable table with hover popovers
 *
 * 📖 Architecture: single scroll container with CSS Grid rows
 * - Header + body share the same overflow:auto container so horizontal scroll is synced
 * - Header row uses `position: sticky; top: 0` to stay pinned vertically
 * - Model column (first) uses `position: sticky; left: 0` to stay pinned horizontally
 * - Corner cell (header + first col) gets highest z-index (z-30)
 * - Only ~15 visible rows are in the DOM at once via @tanstack/react-virtual
 *
 * @features
 * → Virtualized rows via @tanstack/react-virtual
 * → Drag & drop column reordering via header cells
 * → Hover-triggered filter/sort popover per header cell
 * → Column visibility, order & presets persisted to localStorage
 * → Locked columns (Model) — pinned, always visible, non-draggable
 *
 * Z-index layering:
 * - z-0:  regular body cells
 * - z-10: sticky first-column body cells
 * - z-20: sticky header cells
 * - z-30: corner cell (header + first column)
 * - z-50: hover popovers
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
import { useRef, useState, useCallback } from "react";
import { useTablePreferences, LOCKED_COLUMN_IDS } from "@/lib/useTablePreferences";
import { TablePreferencesModal, TablePrefsButton } from "@/components/table/TablePreferencesModal";
import { HeaderFilterPopover } from "@/components/table/HeaderFilterPopover";

const ROW_HEIGHT = 44;
const HEADER_HEIGHT = 41;

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showPrefs, setShowPrefs] = useState(false);
  const [hoveredColIdx, setHoveredColIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  // 📖 Extract column id: explicit `id` takes priority, then `accessorKey` for string accessors
  const getColId = (c: ColumnDef<TData, unknown>): string =>
    (c as { id?: string }).id ?? (c as { accessorKey?: string }).accessorKey ?? "";
  const allColumnIds = columns.map(getColId);
  const allColumnLabels = columns.map((c) =>
    typeof c.header === "string" ? c.header : getColId(c),
  );
  const allColumns = allColumnIds
    .map((id, i) => ({ id, label: allColumnLabels[i] || id }))
    .filter((c) => c.id);

  const prefs = useTablePreferences({ allColumnIds });
  const columnVisibility: VisibilityState = prefs.visibility;

  const orderedColumns = prefs.getColumnOrder(
    columns as unknown as Parameters<typeof prefs.getColumnOrder>[0],
  );

  const table = useReactTable({
    // @ts-ignore – type mismatch with generic ColumnDef
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

  /* ── Virtualizer ─────────────────────────────────────────────── */
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  // 📖 Build grid template from column sizes defined in columnDef
  const headerGroups = table.getHeaderGroups();
  const visibleHeaders = headerGroups[0]?.headers ?? [];
  const gridTemplateColumns = visibleHeaders
    .map((h) => {
      const size = h.column.getSize();
      // TanStack default size is 150; use minmax for those, explicit px for custom sizes
      return size !== 150 ? `${size}px` : "minmax(80px, 1fr)";
    })
    .join(" ");

  // 📖 Total width: sum of all column sizes for the inner container
  const totalWidth = visibleHeaders.reduce((sum, h) => {
    const size = h.column.getSize();
    return sum + (size !== 150 ? size : 120);
  }, 0);

  /* ── Header drag handlers ──────────────────────────────────────── */
  const handleHeaderDragStart = (e: React.DragEvent, idx: number) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggingIdx(idx);
  };
  const handleHeaderDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIdx(idx);
  };
  const handleHeaderDrop = (e: React.DragEvent, toIdx: number) => {
    e.preventDefault();
    if (draggingIdx !== null && draggingIdx !== toIdx) {
      prefs.moveColumn(draggingIdx, toIdx);
    }
    setDraggingIdx(null);
    setDragOverIdx(null);
  };
  const handleHeaderDragEnd = () => {
    setDraggingIdx(null);
    setDragOverIdx(null);
  };

  /* ── Filter helpers ────────────────────────────────────────────── */
  const getColumnFilter = (colId: string): unknown => {
    return columnFilters.find((f) => f.id === colId)?.value;
  };
  const setColumnFilter = (colId: string, value: unknown) => {
    setColumnFilters((prev: ColumnFiltersState) => {
      const without = prev.filter((f) => f.id !== colId);
      if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) return without;
      return ([...without, { id: colId, value }] as ColumnFiltersState);
    });
  };

  const handleSort = useCallback((colId: string, dir: "asc" | "desc" | false) => {
    setSorting((prev) => {
      const without = prev.filter((x) => x.id !== colId);
      if (dir === false) return without;
      return [...without, { id: colId, desc: dir === "desc" }];
    });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex items-center justify-end">
        <TablePrefsButton
          onClick={() => setShowPrefs(true)}
          activePreset={prefs.activePreset || undefined}
        />
      </div>

      {/* ── Single scroll container for header + body ──────────────── */}
      <div
        ref={scrollRef}
        className="overflow-auto rounded-md border border-[var(--color-border)] shadow-sm"
        style={{ maxHeight: "calc(100vh - 7rem)" }}
      >
        {/* Inner width container — sets the full scrollable width */}
        <div style={{ width: totalWidth, minWidth: "100%", position: "relative" }}>

          {/* ── STICKY HEADER ROW ────────────────────────────────────── */}
          <div
            className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]"
            style={{
              display: "grid",
              gridTemplateColumns,
              position: "sticky",
              top: 0,
              zIndex: 20,
              height: HEADER_HEIGHT,
              backgroundColor: "var(--color-surface)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((header, visualIdx) => {
                const colId = header.column.id;
                const isLocked = LOCKED_COLUMN_IDS.includes(colId as typeof LOCKED_COLUMN_IDS[number]);
                const isSorted = header.column.getIsSorted();
                const isHovered = hoveredColIdx === visualIdx;
                const hasActiveFilter = getColumnFilter(colId) !== undefined;
                // 📖 Corner cell (header + first col) gets z-30, other header cells z-20
                const isFirstSticky = stickyFirstColumn && visualIdx === 0;

                return (
                  <div
                    key={header.id}
                    draggable={!isLocked}
                    onDragStart={(e) => handleHeaderDragStart(e, visualIdx)}
                    onDragOver={(e) => handleHeaderDragOver(e, visualIdx)}
                    onDrop={(e) => handleHeaderDrop(e, visualIdx)}
                    onDragEnd={handleHeaderDragEnd}
                    onMouseEnter={() => setHoveredColIdx(visualIdx)}
                    onMouseLeave={() => setHoveredColIdx(null)}
                    className={`
                      relative flex items-center px-2.5 py-2 text-left font-medium
                      border-r border-[var(--color-border)]
                      last:border-r-0
                      ${isSorted ? "bg-[var(--color-accent)]/10" : ""}
                      ${draggingIdx === visualIdx ? "opacity-40" : ""}
                      ${dragOverIdx === visualIdx && draggingIdx !== null && draggingIdx !== visualIdx ? "border-l-2 border-l-[var(--color-accent)]" : ""}
                      ${isLocked ? "cursor-default" : "cursor-grab active:cursor-grabbing"}
                    `}
                    style={{
                      ...(isFirstSticky
                        ? {
                            position: "sticky" as const,
                            left: 0,
                            zIndex: 30,
                            backgroundColor: "var(--color-surface-elevated, var(--color-surface))",
                            borderRight: "2px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
                          }
                        : {}),
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
                      <span className="inline-block w-4 text-center select-none">
                        {isSorted ? (
                          <span className="text-[var(--color-accent)]">
                            {isSorted === "asc" ? "↑" : "↓"}
                          </span>
                        ) : header.column.getCanSort() ? (
                          <span className="opacity-0">↑</span>
                        ) : null}
                      </span>
                      {hasActiveFilter && !isSorted && (
                        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                      )}
                    </div>

                    {/* Hover popover */}
                    {isHovered && (
                      <div
                        className="absolute left-0 top-full z-50 mt-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xl"
                        onMouseEnter={() => setHoveredColIdx(visualIdx)}
                        onMouseLeave={() => setHoveredColIdx(null)}
                      >
                        <HeaderFilterPopover
                          column={header.column}
                          isSorted={isSorted}
                          onSort={(dir) => handleSort(colId, dir)}
                          filterValue={getColumnFilter(colId)}
                          onFilterChange={(val) => setColumnFilter(colId, val)}
                        />
                      </div>
                    )}
                  </div>
                );
              }),
            )}
          </div>

          {/* ── VIRTUALIZED BODY ────────────────────────────────────── */}
          <div style={{ position: "relative", height: totalSize }}>
            {virtualItems.map((vRow) => {
              const row = rows[vRow.index];
              return (
                <div
                  key={row.id}
                  data-index={vRow.index}
                  ref={rowVirtualizer.measureElement}
                  className="cursor-pointer border-b border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors duration-100"
                  style={{
                    display: "grid",
                    gridTemplateColumns,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: ROW_HEIGHT,
                    transform: `translateY(${vRow.start}px)`,
                  }}
                  onClick={() => onRowClick?.(row.original)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && onRowClick) {
                      e.preventDefault();
                      onRowClick(row.original);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell, visualIdx) => {
                    const isFirstSticky = stickyFirstColumn && visualIdx === 0;
                    return (
                      <div
                        key={cell.id}
                        className={`
                          flex items-center px-2.5 border-r border-[var(--color-border)]
                          last:border-r-0 overflow-hidden
                        `}
                        style={{
                          ...(isFirstSticky
                            ? {
                                position: "sticky" as const,
                                left: 0,
                                zIndex: 10,
                                backgroundColor: "var(--color-surface-elevated, var(--color-bg))",
                                borderRight: "2px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
                              }
                            : {}),
                        }}
                      >
                        <div className="truncate text-sm">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
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

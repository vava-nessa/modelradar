/**
 * @file DataTable — virtualized sortable/filterable table with hover popovers
 *
 * Virtualization strategy:
 * - Table structure kept for accessibility and sticky header
 * - <tbody> is replaced by a CSS Grid scrollable container
 * - Each row is a Grid row; column widths come from header measurements
 * - Only ~15 visible rows are in the DOM at once
 *
 * Features:
 * - Virtualized rows via @tanstack/react-virtual
 * - Drag & drop column reordering via header cells
 * - Hover-triggered filter/sort popover per header cell
 * - Column visibility, order & presets persisted to localStorage
 * - Locked columns (Model) — pinned, always visible, non-draggable
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
import { useRef, useState, useEffect, useCallback } from "react";
import { useTablePreferences, LOCKED_COLUMN_IDS } from "@/lib/useTablePreferences";
import { TablePreferencesModal, TablePrefsButton } from "@/components/table/TablePreferencesModal";
import { HeaderFilterPopover } from "@/components/table/HeaderFilterPopover";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showPrefs, setShowPrefs] = useState(false);
  const [hoveredColIdx, setHoveredColIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  /* Column widths measured from thead */
  const [colWidths, setColWidths] = useState<number[]>([]);
  const theadRef = useRef<HTMLTableSectionElement>(null);

  const allColumnIds = columns.map((c) => (c as { id?: string }).id ?? "");
  const allColumnLabels = columns.map((c) =>
    typeof c.header === "string" ? c.header : (c as { id?: string }).id ?? "",
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

  /* ── Measure header column widths via ResizeObserver ──────────── */
  useEffect(() => {
    const thead = theadRef.current;
    if (!thead) return;
    const ths = thead.querySelectorAll("th");
    if (!ths || ths.length === 0) return;

    const measure = () => {
      const widths = Array.from(ths).map((th) => th.offsetWidth);
      setColWidths(widths);
    };

    const ro = new ResizeObserver(measure);
    ro.observe(thead);
    measure();

    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderedColumns]);

  /* ── Virtualizer ─────────────────────────────────────────────── */
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  /* ── Grid template string ─────────────────────────────────────── */
  const gridTemplateColumns = colWidths.length > 0
    ? colWidths.map((w) => `${w}px`).join(" ")
    : `repeat(${orderedColumns.length}, minmax(100px, 1fr))`;

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

      {/* Table wrapper */}
      <div
        className="relative overflow-hidden rounded-md border border-[var(--color-border)] shadow-sm"
        style={{ maxHeight: "calc(100vh - 7rem)" }}
      >
        <table className="w-full border-collapse">
          {/* ── THEAD ─────────────────────────────────────────────── */}
          <thead
            ref={theadRef}
            className="sticky top-0 z-30 bg-[var(--color-surface)] text-xs uppercase tracking-wider text-[var(--color-text-muted)] shadow-sm"
          >
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
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
        </table>

        {/* ── VIRTUALIZED BODY (CSS Grid) ────────────────────────── */}
        {/* We use a separate scrollable div with CSS Grid to avoid table+absolute positioning issues */}
        <div
          ref={scrollRef}
          className="overflow-auto"
          style={{ height: "calc(100vh - 7rem - 41px)" }} /* 41px = thead height */
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns,
              width: colWidths.reduce((a, b) => a + b, 0),
              position: "relative",
            }}
          >
            {/* Scroll spacer — establishes total scroll height */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 1,
                height: totalSize,
              }}
            />

            {/* Only render visible rows */}
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
                  {row.getVisibleCells().map((cell, visualIdx) => (
                    <div
                      key={cell.id}
                      className={`
                        flex items-center px-2.5 border-x border-[var(--color-border)]
                        first:border-l-0 last:border-r-0 overflow-hidden
                        ${stickyFirstColumn && visualIdx === 0 ? "sticky left-0 z-10 bg-[var(--color-bg)] border-r" : ""}
                      `}
                    >
                      <div className="truncate text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </div>
                  ))}
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

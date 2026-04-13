/**
 * @file TablePreferencesModal — Column order, visibility & preset management
 *
 * @features
 * - Drag & drop column reordering (+ keyboard arrows)
 * - Toggle column visibility
 * - Quick-apply built-in presets (All / Coding / Benchmarks / Cost)
 * - Save / load / delete custom presets
 * - Visual indicator of active preset
 *
 * @trigger <TablePrefsButton> — renders the button that opens the modal
 */

import { useState, useEffect, useRef } from "react";
import type {
  UseTablePreferencesReturn,
} from "@/lib/useTablePreferences";
import { BUILT_IN_PRESETS } from "@/lib/useTablePreferences";

/* ─── Icons ──────────────────────────────────────────────────────────────── */

function GripIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <circle cx="4" cy="3" r="1.2" />
      <circle cx="10" cy="3" r="1.2" />
      <circle cx="4" cy="7" r="1.2" />
      <circle cx="10" cy="7" r="1.2" />
      <circle cx="4" cy="11" r="1.2" />
      <circle cx="10" cy="11" r="1.2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="2,7 5.5,10.5 12,3.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="4" x2="12" y2="12" />
      <line x1="12" y1="4" x2="4" y2="12" />
    </svg>
  );
}

function StarIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <polygon points="7,1 8.8,5.2 13.5,5.7 10,8.8 11,13.5 7,11 3,13.5 4,8.8 0.5,5.7 5.2,5.2" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="1.5" y1="3" x2="10.5" y2="3" />
      <rect x="2" y="3" width="8" height="7.5" rx="1" />
      <line x1="4.5" y1="3" x2="4.5" y2="10.5" />
      <line x1="7.5" y1="3" x2="7.5" y2="10.5" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11.5 12.5H2.5A1 1 0 0 1 1.5 11.5v-9A1 1 0 0 1 2.5 1.5H9.5L12 4v7.5A1 1 0 0 1 11.5 12.5z" />
      <rect x="4" y="1.5" width="5" height="3.5" rx="0.5" />
      <rect x="4" y="8" width="6" height="4" rx="0.5" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7A5 5 0 1 1 4 10.5" />
      <polyline points="2,4 2,7 5,7" />
    </svg>
  );
}

function ChevronIcon({ dir }: { dir: "up" | "down" }) {
  const d = dir === "up" ? "M3 9l4-4 4 4" : "M3 5l4 4 4-4";
  return (
    <svg width="12" height="12" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/* ─── Preset badge pill ───────────────────────────────────────────────────── */

function ActivePresetBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
      <StarIcon filled />{name}
    </span>
  );
}

/* ─── Column item ─────────────────────────────────────────────────────────── */

interface ColumnItem {
  id: string;
  label: string;
}

/* ─── Drag state ──────────────────────────────────────────────────────────── */

interface DragState {
  index: number;
}

/* ─── Main modal ──────────────────────────────────────────────────────────── */

interface TablePreferencesModalProps {
  prefs: UseTablePreferencesReturn;
  allColumns: ColumnItem[];
  onClose: () => void;
}

export function TablePreferencesModal({ prefs, allColumns, onClose }: TablePreferencesModalProps) {
  const {
    visibility, order, activePreset, presets,
    toggleVisibility, moveColumn,
    savePreset, loadPreset, deletePreset,
    resetToDefault, applyBuiltIn, isBuiltIn,
  } = prefs;

  const [saveName, setSaveName] = useState("");
  const [saveError, setSaveError] = useState("");
  const [drag, setDrag] = useState<DragState | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const sortedColumns = [...allColumns].sort((a, b) => {
    const ai = order.indexOf(a.id);
    const bi = order.indexOf(b.id);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = "move";
    setDrag({ index });
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOver(index);
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    if (drag && drag.index !== toIndex) {
      moveColumn(drag.index, toIndex);
    }
    setDrag(null);
    setDragOver(null);
  };

  const handleDragEnd = () => {
    setDrag(null);
    setDragOver(null);
  };

  const handleSave = () => {
    const name = saveName.trim();
    if (!name) { setSaveError("Name is required"); return; }
    if (name.length > 30) { setSaveError("Max 30 characters"); return; }
    savePreset(name);
    setSaveName("");
    setSaveError("");
  };

  const moveUp = (i: number) => { if (i > 0) moveColumn(i, i - 1); };
  const moveDown = (i: number) => { if (i < sortedColumns.length - 1) moveColumn(i, i + 1); };

  const builtInKeys = (Object.keys(BUILT_IN_PRESETS) as Array<keyof typeof BUILT_IN_PRESETS>).filter((k) => k !== "all");
  const userPresets = presets.filter((p) => !isBuiltIn(p.name) && p.name !== "Default");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
        onClick={onClose}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClose(); }}
        role="button"
        tabIndex={-1}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold">Table Preferences</h2>
            {activePreset && <ActivePresetBadge name={activePreset} />}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Close preferences"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Column list */}
          <div className="w-1/2 border-r border-[var(--color-border)] flex flex-col">
            <div className="border-b border-[var(--color-border)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Columns — drag to reorder
              </p>
            </div>
            <ul ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-0.5 list-none">
              {sortedColumns.map((col, i) => {
                const isVisible = visibility[col.id] !== false;
                const isDragging = drag?.index === i;
                const isDragOver = dragOver === i;

                return (
                  <li
                    key={col.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, i)}
                    onDragOver={(e) => handleDragOver(e, i)}
                    onDrop={(e) => handleDrop(e, i)}
                    onDragEnd={handleDragEnd}
                    aria-label={`${col.label}, ${isVisible ? "visible" : "hidden"}.`}
                    className={`
                      group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-all cursor-move select-none
                      ${isDragging ? "opacity-40 scale-95" : ""}
                      ${isDragOver && !isDragging ? "border-t-2 border-[var(--color-accent)]" : ""}
                      ${isVisible ? "bg-[var(--color-surface)]" : "bg-transparent"}
                    `}
                  >
                    {/* Grip */}
                    <span className="flex-shrink-0 cursor-grab active:cursor-grabbing" aria-hidden="true">
                      <GripIcon />
                    </span>

                    {/* Visibility toggle */}
                    <button
                      type="button"
                      onClick={() => toggleVisibility(col.id)}
                      title={isVisible ? "Hide column" : "Show column"}
                      aria-label={isVisible ? `Hide ${col.label} column` : `Show ${col.label} column`}
                      className={`
                        flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border text-xs transition-colors
                        ${isVisible
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                          : "border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)]"}
                      `}
                    >
                      {isVisible && <CheckIcon />}
                    </button>

                    {/* Label */}
                    <span className={`flex-1 truncate ${!isVisible ? "text-[var(--color-text-muted)]" : ""}`}>
                      {col.label}
                    </span>

                    {/* Move up/down buttons */}
                    <span className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); moveUp(i); }}
                        disabled={i === 0}
                        aria-label={`Move ${col.label} up`}
                        className="rounded p-0.5 hover:bg-[var(--color-border)] disabled:opacity-20"
                      >
                        <ChevronIcon dir="up" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); moveDown(i); }}
                        disabled={i === sortedColumns.length - 1}
                        aria-label={`Move ${col.label} down`}
                        className="rounded p-0.5 hover:bg-[var(--color-border)] disabled:opacity-20"
                      >
                        <ChevronIcon dir="down" />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Reset */}
            <div className="border-t border-[var(--color-border)] p-3">
              <button
                type="button"
                onClick={resetToDefault}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] transition-colors"
              >
                <ResetIcon />
                Reset to Default
              </button>
            </div>
          </div>

          {/* Right: Presets */}
          <div className="w-1/2 flex flex-col overflow-hidden">
            {/* Quick presets */}
            <div className="border-b border-[var(--color-border)] px-4 py-3">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Quick presets
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => applyBuiltIn("all")}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    activePreset === "All columns"
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)]"
                  }`}
                >
                  <StarIcon /> All
                </button>
                {builtInKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => applyBuiltIn(key)}
                    className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      activePreset === BUILT_IN_PRESETS[key]
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)]"
                    }`}
                  >
                    <StarIcon />{BUILT_IN_PRESETS[key].split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom presets */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                My presets
              </p>

              {userPresets.length === 0 ? (
                <p className="text-sm text-[var(--color-text-muted)] italic py-4 text-center">
                  No custom presets yet.<br />Save your current setup below.
                </p>
              ) : (
                <div className="space-y-1.5">
                  {userPresets.map((preset) => (
                    <div
                      key={preset.name}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                        activePreset === preset.name
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                          : "border-[var(--color-border)] bg-[var(--color-surface)]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => loadPreset(preset.name)}
                        className="flex flex-1 items-center gap-2 text-left"
                      >
                        <StarIcon filled={activePreset === preset.name} />
                        <span className={activePreset === preset.name ? "text-[var(--color-accent)]" : ""}>
                          {preset.name}
                        </span>
                        <span className="ml-auto text-xs text-[var(--color-text-muted)]">
                          {Object.values(preset.visibility).filter(Boolean).length} cols
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePreset(preset.name)}
                        aria-label={`Delete ${preset.name} preset`}
                        className="rounded p-1 text-[var(--color-text-muted)] hover:bg-red-500/20 hover:text-red-400 transition-colors"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Save preset */}
            <div className="border-t border-[var(--color-border)] px-4 py-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Save current as preset
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={saveName}
                  onChange={(e) => { setSaveName(e.target.value); setSaveError(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
                  placeholder="Preset name..."
                  maxLength={30}
                  className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 rounded-lg bg-[var(--color-accent)] px-3 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                >
                  <SaveIcon />Save
                </button>
              </div>
              {saveError && <p className="mt-1.5 text-xs text-red-400">{saveError}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Button to open modal ───────────────────────────────────────────────── */

interface TablePrefsButtonProps {
  onClick: () => void;
  activePreset?: string;
}

export function TablePrefsButton({ onClick, activePreset }: TablePrefsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)] transition-all"
      title="Table preferences"
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="3" cy="3" r="1.2" />
        <circle cx="7.5" cy="3" r="1.2" />
        <circle cx="12" cy="3" r="1.2" />
        <circle cx="3" cy="7.5" r="1.2" />
        <circle cx="7.5" cy="7.5" r="1.2" />
        <circle cx="12" cy="7.5" r="1.2" />
        <circle cx="3" cy="12" r="1.2" />
        <circle cx="7.5" cy="12" r="1.2" />
        <circle cx="12" cy="12" r="1.2" />
      </svg>
      <span className="hidden sm:inline">Prefs</span>
      {activePreset && (
        <span className="hidden sm:inline text-xs text-[var(--color-accent)]">· {activePreset}</span>
      )}
    </button>
  );
}

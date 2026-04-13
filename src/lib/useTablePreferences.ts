/**
 * @file Table preferences hook — persists column order, visibility and presets
 * to localStorage so users retrouver their setup across reloads.
 *
 * @features
 * - Column order & visibility persisted to localStorage
 * - Named presets: save / load / delete
 * - Default presets: "All columns", "Coding focus", "Benchmarks only"
 * - "Reset to default" restores the default preset
 *
 * @see TablePreferencesModal
 */

import { useState, useCallback, useEffect } from "react";
import type { Column } from "@tanstack/react-table";

const STORAGE_KEY = "modelradar:table-prefs";

/** 📖 Columns that cannot be moved, hidden, or deleted — Model must always be visible & first */
export const LOCKED_COLUMN_IDS = ["name"] as const;

/** Default visibility: all columns visible */
function defaultVisibility(columns: Column<unknown, unknown>[]) {
  return Object.fromEntries(columns.map((c) => [c.id, true]));
}

/** Default preset — all columns, in original order */
export function buildDefaultPreset(columns: Column<unknown, unknown>[]) {
  return {
    name: "Default",
    visibility: defaultVisibility(columns),
    order: columns.map((c) => c.id),
  };
}

/** Preset shape */
export interface TablePreset {
  name: string;
  visibility: Record<string, boolean>;
  order: string[];
}

/** Preferences shape */
export interface TablePreferences {
  activePreset: string;
  presets: TablePreset[];
  visibility: Record<string, boolean>;
  order: string[];
}

/** Built-in presets — applied on top of raw column ids */
export const BUILT_IN_PRESETS = {
  all: "All columns",
  coding: "Coding focus",
  benchmarks: "Benchmarks only",
  cost: "Cost & context",
} as const;

/** Which column groups belong to which preset */
export const PRESET_COLUMN_IDS: Record<string, string[]> = {
  all: [],
  coding: ["name", "family", "supportedOn", "context_window", "swe_bench", "verified_swe_bench", "humaneval", "mbpp", "bigcodebench", "aider_polyglot", "bfcl", "function_calling", "is_open_source", "arena_elo"],
  benchmarks: ["name", "family", "swe_bench", "verified_swe_bench", "humaneval", "mbpp", "bigcodebench", "aider_polyglot", "bfcl", "mmlu", "gpqa_diamond", "math_500", "gsm8k", "aime_2025", "arena_elo", "livebench", "tier_list", "humanity_last_exam", "tau_bench", "terminal_bench"],
  cost: ["name", "family", "creator", "supportedOn", "context_window", "cost_input", "cost_output", "reasoning"],
};

function generateId() {
  return Math.random().toString(36).slice(2, 8);
}

function loadPrefs(): TablePreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TablePreferences;
  } catch {
    return null;
  }
}

function savePrefs(prefs: TablePreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // storage full or unavailable — ignore
  }
}

export interface UseTablePreferencesOptions {
  allColumnIds: string[];
}

export interface UseTablePreferencesReturn {
  /** Current visibility state (id → visible) */
  visibility: Record<string, boolean>;
  /** Current column order */
  order: string[];
  /** Active preset name */
  activePreset: string;
  /** All presets including built-ins */
  presets: TablePreset[];

  /** Toggle a column's visibility */
  toggleVisibility: (columnId: string) => void;
  /** Move a column from one position to another */
  moveColumn: (fromIndex: number, toIndex: number) => void;
  /** Save current state as a named preset */
  savePreset: (name: string) => void;
  /** Load a preset by name */
  loadPreset: (name: string) => void;
  /** Delete a user preset */
  deletePreset: (name: string) => void;
  /** Reset to the built-in "all" preset */
  resetToDefault: () => void;

  /** Apply a BUILT-IN preset (all / coding / benchmarks / cost) */
  applyBuiltIn: (key: keyof typeof BUILT_IN_PRESETS) => void;

  /** Check if a preset is built-in */
  isBuiltIn: (name: string) => boolean;

  /** Build the ordered+filtered list of column ids */
  getColumnOrder: (allColumns: Column<unknown, unknown>[]) => Column<unknown, unknown>[];
}

export function useTablePreferences({
  allColumnIds,
}: UseTablePreferencesOptions): UseTablePreferencesReturn {
  const buildInitial = useCallback((): TablePreferences => {
    const saved = loadPrefs();
    if (saved) return saved;

    // First visit — build default preset from all column ids
    const defaultPreset: TablePreset = {
      name: "Default",
      visibility: Object.fromEntries(allColumnIds.map((id) => [id, true])),
      order: allColumnIds,
    };

    return {
      activePreset: "Default",
      presets: [defaultPreset],
      visibility: defaultPreset.visibility,
      order: defaultPreset.order,
    };
  }, [allColumnIds]);

  const [prefs, setPrefs] = useState<TablePreferences>(buildInitial);

  // Re-initialize when allColumnIds change (e.g. on route load)
  useEffect(() => {
    setPrefs((prev) => {
      const next = buildInitial();
      // Carry over any user-created presets but use new default for current state
      if (prev.presets.length > 1) {
        const userPresets = prev.presets.filter((p) => p.name !== "Default");
        next.presets = [next.presets[0], ...userPresets];
        next.activePreset = prev.activePreset;
        // Restore visibility/order from previously active preset if it still exists
        const restored = next.presets.find((p) => p.name === prev.activePreset);
        if (restored) {
          next.visibility = restored.visibility;
          next.order = restored.order;
        }
      }
      return next;
    });
  }, [buildInitial]);

  const persist = useCallback((updated: TablePreferences) => {
    setPrefs(updated);
    savePrefs(updated);
  }, []);

  const toggleVisibility = useCallback((columnId: string) => {
    // 📖 Locked columns (e.g. "name") cannot be hidden
    if (LOCKED_COLUMN_IDS.includes(columnId as (typeof LOCKED_COLUMN_IDS)[number])) return;
    setPrefs((prev) => {
      const updated = {
        ...prev,
        activePreset: "", // custom state, no preset active
        visibility: { ...prev.visibility, [columnId]: !prev.visibility[columnId] },
      };
      savePrefs(updated);
      return updated;
    });
  }, []);

  const moveColumn = useCallback((fromIndex: number, toIndex: number) => {
    setPrefs((prev) => {
      const newOrder = [...prev.order];
      const [moved] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, moved);
      const updated = { ...prev, activePreset: "", order: newOrder };
      savePrefs(updated);
      return updated;
    });
  }, []);

  const savePreset = useCallback((name: string) => {
    setPrefs((prev) => {
      const newPreset: TablePreset = {
        name,
        visibility: { ...prev.visibility },
        order: [...prev.order],
      };
      const existing = prev.presets.findIndex((p) => p.name === name);
      const newPresets = existing >= 0
        ? prev.presets.map((p) => (p.name === name ? newPreset : p))
        : [...prev.presets, newPreset];
      const updated = { ...prev, activePreset: name, presets: newPresets };
      savePrefs(updated);
      return updated;
    });
  }, []);

  const loadPreset = useCallback((name: string) => {
    setPrefs((prev) => {
      const preset = prev.presets.find((p) => p.name === name);
      if (!preset) return prev;
      const updated = {
        ...prev,
        activePreset: name,
        visibility: { ...preset.visibility },
        order: [...preset.order],
      };
      savePrefs(updated);
      return updated;
    });
  }, []);

  const deletePreset = useCallback((name: string) => {
    if (name === "Default") return;
    setPrefs((prev) => {
      const newPresets = prev.presets.filter((p) => p.name !== name);
      const updated = {
        ...prev,
        presets: newPresets,
        activePreset: prev.activePreset === name ? "Default" : prev.activePreset,
        visibility: prev.activePreset === name
          ? Object.fromEntries(allColumnIds.map((id) => [id, true]))
          : prev.visibility,
        order: prev.activePreset === name ? [...allColumnIds] : prev.order,
      };
      savePrefs(updated);
      return updated;
    });
  }, [allColumnIds]);

  const resetToDefault = useCallback(() => {
    setPrefs((prev) => {
      const defaultPreset = prev.presets.find((p) => p.name === "Default") ?? {
        name: "Default",
        visibility: Object.fromEntries(allColumnIds.map((id) => [id, true])),
        order: [...allColumnIds],
      };
      const updated = {
        ...prev,
        activePreset: "Default",
        visibility: { ...defaultPreset.visibility },
        order: [...defaultPreset.order],
      };
      savePrefs(updated);
      return updated;
    });
  }, [allColumnIds]);

  const applyBuiltIn = useCallback((key: keyof typeof BUILT_IN_PRESETS) => {
    setPrefs((prev) => {
      const presetName = BUILT_IN_PRESETS[key];
      // Check if we already have a preset with this name
      const existing = prev.presets.find((p) => p.name === presetName);
      if (existing) {
        const updated = {
          ...prev,
          activePreset: presetName,
          visibility: { ...existing.visibility },
          order: [...existing.order],
        };
        savePrefs(updated);
        return updated;
      }

      // Build built-in preset on the fly
      const included = PRESET_COLUMN_IDS[key];
      const visibility = Object.fromEntries(
        allColumnIds.map((id) => [id, included.length === 0 || included.includes(id)]),
      );
      const order = included.length > 0
        ? [...included.filter((id) => allColumnIds.includes(id)), ...allColumnIds.filter((id) => !included.includes(id))]
        : [...allColumnIds];

      const newPreset: TablePreset = { name: presetName, visibility, order };
      const updated = {
        ...prev,
        activePreset: presetName,
        visibility,
        order,
        presets: [...prev.presets, newPreset],
      };
      savePrefs(updated);
      return updated;
    });
  }, [allColumnIds]);

  const isBuiltIn = useCallback((name: string) => {
    return Object.values(BUILT_IN_PRESETS).includes(name as never) || name === "Default";
  }, []);

  const getColumnOrder = useCallback(
    (allColumns: Column<unknown, unknown>[]) => {
      const { order } = prefs;
      // 📖 Build a map for fast lookup, but locked columns always come first
      const orderIndex = Object.fromEntries(order.map((id, i) => [id, i]));
      return [...allColumns].sort((a, b) => {
        const aLocked = LOCKED_COLUMN_IDS.includes(a.id as (typeof LOCKED_COLUMN_IDS)[number]);
        const bLocked = LOCKED_COLUMN_IDS.includes(b.id as (typeof LOCKED_COLUMN_IDS)[number]);
        if (aLocked && !bLocked) return -1;
        if (!aLocked && bLocked) return 1;
        const ai = orderIndex[a.id] ?? 999;
        const bi = orderIndex[b.id] ?? 999;
        return ai - bi;
      });
    },
    [prefs],
  );

  // 📖 Force locked columns to always be visible, regardless of saved state
  const safeVisibility = {
    ...prefs.visibility,
    ...Object.fromEntries(LOCKED_COLUMN_IDS.map((id) => [id, true])),
  };

  return {
    visibility: safeVisibility,
    order: prefs.order,
    activePreset: prefs.activePreset,
    presets: prefs.presets,
    toggleVisibility,
    moveColumn,
    savePreset,
    loadPreset,
    deletePreset,
    resetToDefault,
    applyBuiltIn,
    isBuiltIn,
    getColumnOrder,
  };
}

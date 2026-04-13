/**
 * @file ModelPicker — searchable model selector for comparisons
 * @description Lets users add up to 4 models to compare. Shows selected models as removable chips
 * with a live-search dropdown for adding more.
 * 📖 Max models configurable via prop (default 4).
 * 📖 Search is case-insensitive on model name.
 *
 * @functions
 *   ModelPicker → controlled multi-select with search, chips, and dropdown
 *
 * @exports ModelPicker
 */

import { useState } from "react";
import { allModels } from "@/data";
import type { Model } from "@/data/schema";

interface Props {
  selected: string[]; // model IDs
  onSelect: (ids: string[]) => void;
  maxModels?: number;
}

export function ModelPicker({ selected, onSelect, maxModels = 4 }: Props) {
  const [query, setQuery] = useState("");

  const filtered = query.length > 0
    ? allModels
        .filter(
          (m) =>
            !selected.includes(m.id) &&
            m.name.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 8)
    : [];

  const selectedModels = allModels.filter((m) => selected.includes(m.id));

  const add = (model: Model) => {
    if (selected.length >= maxModels) return;
    onSelect([...selected, model.id]);
    setQuery("");
  };

  const remove = (id: string) => {
    onSelect(selected.filter((s) => s !== id));
  };

  return (
    <div>
      {/* 📖 Selected model chips */}
      {selectedModels.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedModels.map((m) => (
            <span
              key={m.id}
              className="flex items-center gap-1.5 rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-sm font-medium text-[var(--color-accent)]"
            >
              {m.name}
              <button
                type="button"
                onClick={() => remove(m.id)}
                aria-label={`Remove ${m.name}`}
                className="ml-0.5 text-[var(--color-accent)]/70 hover:text-[var(--color-accent)]"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* 📖 Search input — hidden once max models selected */}
      {selected.length < maxModels && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search and add a model…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
          />
          {filtered.length > 0 && (
            <ul className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] shadow-lg">
              {filtered.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => add(m)}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-[var(--color-surface)]"
                  >
                    <span>{m.name}</span>
                    <span className="text-xs text-[var(--color-text-muted)] capitalize">
                      {m.creator} · {m.category}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {selected.length > 0 && selected.length < 2 && (
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">Add at least one more model to compare.</p>
      )}
      {selected.length >= maxModels && (
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">Max {maxModels} models. Remove one to add another.</p>
      )}
    </div>
  );
}

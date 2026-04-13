/**
 * @file CompareRow — single row in the comparison grid
 * @description Renders one comparison attribute across all selected models.
 * 📖 Highlights the "best" value based on the highlight strategy:
 *   - "higher-is-better" → green for max value
 *   - "lower-is-better" → green for min value
 *   - "none" → no highlighting
 *
 * @functions
 *   CompareRow → renders a single labeled comparison row with optional best-value highlighting
 *
 * @exports CompareRow
 */

interface Props {
  label: string;
  values: (string | number | boolean | null | undefined)[];
  /** 📖 "higher-is-better" → green for max, "lower-is-better" → green for min, "none" → no highlight */
  highlight?: "higher-is-better" | "lower-is-better" | "none";
  /** 📖 Format function for display */
  format?: (v: string | number | boolean | null | undefined) => string;
}

const defaultFormat = (v: string | number | boolean | null | undefined): string => {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "✓" : "✗";
  if (typeof v === "number") return v.toString();
  return v;
};

export function CompareRow({ label, values, highlight = "none", format = defaultFormat }: Props) {
  const numericValues = values
    .filter((v): v is number => typeof v === "number");

  const best =
    highlight === "higher-is-better"
      ? numericValues.length > 0 ? Math.max(...numericValues) : null
      : highlight === "lower-is-better"
      ? numericValues.length > 0 ? Math.min(...numericValues) : null
      : null;

  return (
    <tr className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]/50">
      <td className="sticky left-0 z-10 bg-[var(--color-bg)] px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide whitespace-nowrap">
        {label}
      </td>
      {values.map((v, i) => {
        const isBest =
          best !== null &&
          typeof v === "number" &&
          v === best &&
          numericValues.filter((n) => n === best).length < values.length; // don't highlight if all same
        return (
          <td
            // biome-ignore lint/suspicious/noArrayIndexKey: stable column order
            key={i}
            className={`px-4 py-3 text-center text-sm tabular-nums ${
              isBest
                ? "font-semibold text-green-600"
                : typeof v === "boolean" && v
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            {isBest ? (
              <span className="rounded-md bg-green-500/10 px-2 py-0.5">
                {format(v)}
              </span>
            ) : (
              format(v)
            )}
          </td>
        );
      })}
    </tr>
  );
}

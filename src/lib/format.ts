/** Format a token count into a human-readable string */
export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

/** Format a price with 2 decimal places */
export function formatPrice(n: number | null): string {
  if (n === null) return "—";
  return `$${n.toFixed(2)}`;
}

/** Format an ISO date string to short format */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** Format a benchmark score for display */
export function formatBenchmark(score: number, max = 100): string {
  return `${score.toFixed(1)}${max !== 100 ? ` / ${max}` : "%"}`;
}

/** Format a rate limit value for display */
export function formatRateLimit(rpm: number | undefined): string {
  if (rpm === undefined) return "—";
  if (rpm >= 1000) return `${(rpm / 1000).toFixed(0)}K/min`;
  return `${rpm}/min`;
}

/** 📖 Format a monthly cost in dollars — displays in K$ for large values */
export function formatMonthlyCost(n: number): string {
  if (n === 0) return "$0.00/mo";
  if (n >= 10_000) return `$${(n / 1000).toFixed(1)}K/mo`;
  if (n >= 1_000) return `$${(n / 1000).toFixed(2)}K/mo`;
  if (n < 0.01) return "<$0.01/mo";
  return `$${n.toFixed(2)}/mo`;
}

/** 📖 Format a token volume (e.g., 1M, 500K, 1B) */
export function formatTokenVolume(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

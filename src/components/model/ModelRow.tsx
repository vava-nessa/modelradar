import {
  getCheapestInputPrice,
  getCheapestOutputPrice,
  getProviderCount,
} from "@/data";
import type { Model } from "@/data/schema";
import { formatPrice, formatTokens } from "@/lib/format";
import { Link } from "@tanstack/react-router";

interface ModelRowProps {
  model: Model;
}

export function ModelRow({ model }: ModelRowProps) {
  const inputPrice = getCheapestInputPrice(model.id);
  const outputPrice = getCheapestOutputPrice(model.id);
  const providerCount = getProviderCount(model.id);

  return (
    <Link
      to="/models/$modelId"
      params={{ modelId: model.id }}
      className="contents hover:bg-[var(--color-surface)]"
    >
      <div className="px-3 py-2">{model.name}</div>
      <div className="px-3 py-2 capitalize">{model.creator}</div>
      <div className="px-3 py-2 capitalize">{model.category}</div>
      <div className="px-3 py-2">{formatTokens(model.context_window)}</div>
      <div className="px-3 py-2">{formatPrice(inputPrice)}</div>
      <div className="px-3 py-2">{formatPrice(outputPrice)}</div>
      <div className="px-3 py-2">{providerCount}</div>
      <div className="px-3 py-2">{model.is_open_source ? "✓" : "—"}</div>
      <div className="px-3 py-2">
        {new Date(model.release_date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })}
      </div>
    </Link>
  );
}

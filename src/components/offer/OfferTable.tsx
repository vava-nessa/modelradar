import type { ProviderOffer } from "@/data/schema";
import { formatPrice, formatRateLimit } from "@/lib/format";
import { Link } from "@tanstack/react-router";

interface OfferTableProps {
  offers: (ProviderOffer & {
    provider: { id: string; name: string; type: string };
  })[];
}

export function OfferTable({ offers }: OfferTableProps) {
  if (offers.length === 0) {
    return (
      <p className="text-[var(--color-text-muted)]">No offers available.</p>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-[var(--color-border)]">
      <table className="w-full">
        <thead className="bg-[var(--color-surface)] text-xs uppercase text-[var(--color-text-muted)]">
          <tr>
            <th className="px-3 py-2 text-left font-medium">Provider</th>
            <th className="px-3 py-2 text-left font-medium">Type</th>
            <th className="px-3 py-2 text-right font-medium">Input $/Mtok</th>
            <th className="px-3 py-2 text-right font-medium">Output $/Mtok</th>
            <th className="px-3 py-2 text-right font-medium">Rate Limit</th>
            <th className="px-3 py-2 text-center font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {offers.map((offer) => (
            <tr
              key={`${offer.provider_id}-${offer.model_id}`}
              className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface)]"
            >
              <td className="px-3 py-2">
                <Link
                  to="/providers/$providerId"
                  params={{ providerId: offer.provider_id }}
                  className="text-[var(--color-accent)] hover:underline"
                >
                  {offer.provider.name}
                </Link>
              </td>
              <td className="px-3 py-2 capitalize">{offer.provider.type}</td>
              <td className="px-3 py-2 text-right">
                {formatPrice(offer.input_per_mtok)}
              </td>
              <td className="px-3 py-2 text-right">
                {formatPrice(offer.output_per_mtok)}
              </td>
              <td className="px-3 py-2 text-right">
                {formatRateLimit(offer.rate_limit_rpm)}
              </td>
              <td className="px-3 py-2 text-center">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    offer.status === "ga"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : offer.status === "preview"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : offer.status === "beta"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {offer.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

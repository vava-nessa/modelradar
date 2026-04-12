import type { ProviderOffer } from "@/data/schema";
import { formatPrice, formatRateLimit } from "@/lib/format";
import { Link } from "@tanstack/react-router";
import {
  IconCloud,
  IconCreditCard,
  IconReceipt,
  IconDeviceLaptop,
} from "@tabler/icons-react";

interface ProviderWithAccessType {
  id: string;
  name: string;
  type: string;
  provider_access_type: "free" | "api" | "sub" | "local";
}

interface OfferTableProps {
  offers: (ProviderOffer & {
    provider: ProviderWithAccessType;
  })[];
}

const accessTypeConfig: Record<
  string,
  { icon: typeof IconCloud; label: string; color: string; bgColor: string }
> = {
  free: {
    icon: IconCreditCard,
    label: "Free tier available",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  api: {
    icon: IconCloud,
    label: "Pay-per-token API",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  sub: {
    icon: IconReceipt,
    label: "Subscription-based",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  local: {
    icon: IconDeviceLaptop,
    label: "Runs locally",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
};

function AccessTypeIcon({
  type,
}: {
  type: "free" | "api" | "sub" | "local";
}) {
  const config = accessTypeConfig[type] ?? accessTypeConfig.api;
  const Icon = config.icon;
  return (
    <div
      className={`tooltip tooltip-top flex items-center gap-1 rounded px-1.5 py-0.5 text-xs ${config.bgColor} ${config.color}`}
      data-tip={config.label}
    >
      <Icon size={14} stroke={2} />
      <span className="uppercase">{type}</span>
    </div>
  );
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
              <td className="px-3 py-2">
                <AccessTypeIcon type={offer.provider.provider_access_type} />
              </td>
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

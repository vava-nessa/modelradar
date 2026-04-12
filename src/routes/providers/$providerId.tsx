import { Container } from "@/components/layout/Container";
import { getModelsForProvider, getProviderById } from "@/data";
import type { Provider } from "@/data/schema";
import { formatPrice } from "@/lib/format";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/providers/$providerId")({
  component: ProviderPage,
  notFoundComponent: () => {
    throw notFound();
  },
});

function ProviderPage() {
  const provider = getProviderById(Route.useParams().providerId);

  if (!provider) {
    throw notFound();
  }

  const models = getModelsForProvider(provider.id);

  return (
    <Container>
      <div className="py-6">
        <Link
          to="/providers"
          className="mb-4 text-sm text-[var(--color-accent)] hover:underline"
        >
          ← Back to Providers
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{provider.name}</h1>
          <div className="mb-4 flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <span className="capitalize rounded-full bg-[var(--color-surface)] px-3 py-1">
              {provider.type}
            </span>
            {provider.openai_compatible && (
              <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">
                OpenAI Compatible
              </span>
            )}
          </div>
          {provider.url && (
            <a
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline"
            >
              Visit Website →
            </a>
          )}
        </div>

        {provider.regions && provider.regions.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 text-sm font-semibold uppercase text-[var(--color-text-muted)]">
              Regions
            </h2>
            <div className="flex flex-wrap gap-2">
              {provider.regions.map((region) => (
                <span
                  key={region}
                  className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-sm"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>
        )}

        {provider.sdk && provider.sdk.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 text-sm font-semibold uppercase text-[var(--color-text-muted)]">
              SDKs
            </h2>
            <div className="flex flex-wrap gap-2">
              {provider.sdk.map((sdk) => (
                <span
                  key={sdk}
                  className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-sm"
                >
                  {sdk}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="mb-4 text-lg font-semibold">Available Models</h2>
          <div className="overflow-hidden rounded-md border border-[var(--color-border)]">
            <table className="w-full">
              <thead className="bg-[var(--color-surface)] text-xs uppercase text-[var(--color-text-muted)]">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Model</th>
                  <th className="px-3 py-2 text-left font-medium">Creator</th>
                  <th className="px-3 py-2 text-right font-medium">
                    Input $/Mtok
                  </th>
                  <th className="px-3 py-2 text-right font-medium">
                    Output $/Mtok
                  </th>
                  <th className="px-3 py-2 text-center font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {models.map((model) => (
                  <tr
                    key={model.id}
                    className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface)]"
                  >
                    <td className="px-3 py-2">
                      <Link
                        to="/models/$modelId"
                        params={{ modelId: model.id }}
                        className="text-[var(--color-accent)] hover:underline"
                      >
                        {model.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2 capitalize">{model.creator}</td>
                    <td className="px-3 py-2 text-right">
                      {formatPrice(model.offer.input_per_mtok)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {formatPrice(model.offer.output_per_mtok)}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          model.offer.status === "ga"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : model.offer.status === "preview"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : model.offer.status === "beta"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {model.offer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
}

import { Container } from "@/components/layout/Container";
import { OfferTable } from "@/components/offer/OfferTable";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { getModelById, getOffersForModel } from "@/data";
import type { Model } from "@/data/schema";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/models/$modelId")({
  component: ModelPage,
  notFoundComponent: () => {
    throw notFound();
  },
});

function ModelPage() {
  const model = getModelById(Route.useParams().modelId);

  if (!model) {
    throw notFound();
  }

  const offers = getOffersForModel(model.id);

  // 📖 Labels for coding-relevant capabilities displayed on the model detail page
  const capabilityLabels: Record<string, string> = {
    streaming: "Streaming",
    function_calling: "Function Calling",
    json_mode: "JSON Mode",
    json_schema: "JSON Schema",
    system_prompt: "System Prompt",
    vision: "Vision",
    code_execution: "Code Execution",
    web_search: "Web Search",
    mcp: "MCP",
    computer_use: "Computer Use",
    extended_thinking: "Extended Thinking",
    citations: "Citations",
    prompt_caching: "Prompt Caching",
    batch_api: "Batch API",
    fine_tuning: "Fine-Tuning",
  };

  const trueCapabilities = Object.entries(model.capabilities)
    .filter(([, value]) => value === true)
    .map(([key]) => capabilityLabels[key] || key);

  return (
    <Container>
      <div className="py-6">
        <Link
          to="/"
          className="mb-4 text-sm text-[var(--color-accent)] hover:underline"
        >
          ← Back to Models
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{model.name}</h1>
            <FavoriteButton modelId={model.id} />
          </div>
          <div className="mb-4 flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <span className="capitalize">{model.creator}</span>
            <span className="capitalize">{model.category}</span>
            {model.release_date && (
              <span>
                Released{" "}
                {new Date(model.release_date).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
          {model.description && (
            <p className="text-[var(--color-text-muted)]">
              {model.description}
            </p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Capabilities</h2>
          <div className="flex flex-wrap gap-2">
            {trueCapabilities.map((cap) => (
              <span
                key={cap}
                className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-sm"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        {model.benchmarks && Object.keys(model.benchmarks).length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">Benchmarks</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(model.benchmarks)
                .filter(([, value]) => value !== undefined)
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-lg border border-[var(--color-border)] p-4"
                  >
                    <div className="mb-1 text-xs uppercase text-[var(--color-text-muted)]">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div className="text-2xl font-bold">
                      {typeof value === "number" ? value.toFixed(1) : value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="mb-4 text-lg font-semibold">Provider Offers</h2>
          <OfferTable offers={offers} />
          <div className="mt-4">
            <Link
              to="/cost"
              search={{ model: model.id }}
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              Simulate costs for {model.name} →
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

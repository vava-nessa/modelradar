/**
 * @file Cost Simulator page route
 * @description Main page for estimating monthly API costs across models and providers.
 * 📖 Reads ?model= from URL to optionally pre-filter to a specific model.
 * 📖 Uses CostInputPanel for user controls and CostResultsTable for results.
 * 📖 All computation happens client-side via calculateCosts (pure function).
 *
 * @functions
 *   CostPage → /cost route component with live cost computation
 *
 * @exports Route (TanStack Router file route)
 */

import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { CostInputPanel } from "@/components/cost/CostInputPanel";
import { CostResultsTable } from "@/components/cost/CostResultsTable";
import { calculateCosts, type CostInputs } from "@/lib/costCalc";
import { allModels, allOffers, allProviders, getModelById } from "@/data";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/cost")({
  validateSearch: (search: Record<string, unknown>) => ({
    model: typeof search.model === "string" ? search.model : "",
  }),
  component: CostPage,
});

// 📖 Default inputs — 10M tokens/month, 70/30 split, no caching
const DEFAULT_INPUTS: CostInputs = {
  totalTokensPerMonth: 10_000_000,
  inputRatio: 0.7,
  includeCacheRead: false,
  cacheHitRatio: 0.5,
};

function CostPage() {
  const { model: preselectedModelId } = Route.useSearch();
  const [inputs, setInputs] = useState<CostInputs>(DEFAULT_INPUTS);
  const [selectedModelId, setSelectedModelId] = useState(preselectedModelId ?? "");
  const [showAll, setShowAll] = useState(false);

  // 📖 Enrich offers with provider + model data for the calculator
  const enrichedOffers = useMemo(() => {
    return allOffers
      .filter((o) => !selectedModelId || o.model_id === selectedModelId)
      .map((o) => {
        const provider = allProviders.find((p) => p.id === o.provider_id);
        const model = allModels.find((m) => m.id === o.model_id);
        if (!provider || !model) return null;
        return { ...o, provider, model };
      })
      .filter((o): o is NonNullable<typeof o> => o !== null);
  }, [selectedModelId]);

  const results = useMemo(
    () => calculateCosts(inputs, enrichedOffers),
    [inputs, enrichedOffers],
  );

  const preselectedModel = selectedModelId ? getModelById(selectedModelId) : undefined;

  return (
    <Container>
      <div className="py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Cost Simulator</h1>
          <p className="mt-1 text-[var(--color-text-muted)]">
            Estimate your monthly API costs across all models and providers.
            {preselectedModel && (
              <span> Filtered to <strong>{preselectedModel.name}</strong>.</span>
            )}
          </p>
        </div>

        <div className="mb-6">
          <CostInputPanel
            inputs={inputs}
            onChange={setInputs}
            selectedModelId={selectedModelId}
            onModelChange={setSelectedModelId}
          />
        </div>

        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-[var(--color-text-muted)]">
            {results.length} offer{results.length !== 1 ? "s" : ""} found
          </p>
          {results.length > 20 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              {showAll ? "Show less" : `Show all ${results.length}`}
            </button>
          )}
        </div>

        <CostResultsTable results={results} showAll={showAll} />
      </div>
    </Container>
  );
}

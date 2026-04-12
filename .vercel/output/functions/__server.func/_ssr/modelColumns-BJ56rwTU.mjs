import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as FavoriteButton } from "./FavoriteButton-CW_Q0qhB.mjs";
import { r as formatTokens } from "./format-J35ANvIi.mjs";
import { r as createColumnHelper } from "../_libs/@tanstack/react-table+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modelColumns-BJ56rwTU.js
var import_jsx_runtime = require_jsx_runtime();
var columnHelper = createColumnHelper();
/** 📖 Compact benchmark score cell with color coding */
function BenchmarkCell({ score, max = 100 }) {
	const pct = score / max;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: pct >= .9 ? "text-emerald-400 font-semibold" : pct >= .7 ? "text-green-400" : pct >= .5 ? "text-yellow-400" : "text-[var(--color-text-muted)]",
		title: `${score}/${max}`,
		children: score.toFixed(score % 1 === 0 ? 0 : 1)
	});
}
/** 📖 SWE score cell with special styling */
function SweBenchmarkCell({ score }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: score >= 70 ? "text-emerald-400 font-semibold" : score >= 50 ? "text-green-400" : "text-[var(--color-text-muted)]",
		title: `SWE-Bench: ${score}%`,
		children: score.toFixed(1)
	});
}
/** 📖 Arena ELO cell with ranking colors */
function ArenaCell({ score }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: score >= 1400 ? "text-purple-400 font-semibold" : score >= 1300 ? "text-blue-400" : "text-[var(--color-text-muted)]",
		title: `Arena ELO: ${score}`,
		children: score
	});
}
var modelColumns = [
	columnHelper.accessor("name", {
		header: "Model",
		cell: (info) => info.getValue(),
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "includesString"
	}),
	columnHelper.accessor("family", {
		header: "Family",
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "equals"
	}),
	columnHelper.accessor("creator", {
		header: "Creator",
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "equals",
		meta: { filterVariant: "select" }
	}),
	columnHelper.accessor("category", {
		header: "Cat",
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "arrIncludes",
		meta: { filterVariant: "multi-select" }
	}),
	columnHelper.accessor("supportedOn", {
		header: "Access",
		enableSorting: false,
		enableColumnFilter: true,
		filterFn: "arrIncludes",
		meta: { filterVariant: "multi-select" },
		cell: (info) => {
			const types = info.getValue();
			const labels = {
				free: "Free",
				api: "API",
				sub: "Sub",
				local: "Local"
			};
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1",
				children: types.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center rounded bg-[var(--color-accent)]/10 px-1.5 py-0.5 text-xs font-medium text-[var(--color-accent)]",
					children: labels[type] ?? type
				}, type))
			});
		}
	}),
	columnHelper.accessor("context_window", {
		header: "Context",
		cell: (info) => formatTokens(info.getValue()),
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "inNumberRange",
		meta: { filterVariant: "range" }
	}),
	columnHelper.accessor("cost", {
		id: "cost_input",
		header: "In",
		cell: (info) => {
			const cost = info.getValue();
			return cost ? `$${cost.input}` : "—";
		},
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "inNumberRange",
		meta: { filterVariant: "range" }
	}),
	columnHelper.accessor("cost", {
		id: "cost_output",
		header: "Out",
		cell: (info) => {
			const cost = info.getValue();
			return cost ? `$${cost.output}` : "—";
		},
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "inNumberRange",
		meta: { filterVariant: "range" }
	}),
	columnHelper.accessor("reasoning", {
		header: "R",
		cell: (info) => info.getValue() ? "✓" : "—",
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "equals",
		meta: { filterVariant: "boolean" }
	}),
	columnHelper.accessor((row) => row.capabilities.function_calling, {
		id: "function_calling",
		header: "TC",
		cell: (info) => info.getValue() ? "✓" : "—",
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: "equals",
		meta: { filterVariant: "boolean" }
	}),
	columnHelper.accessor("is_open_source", {
		header: "Open",
		cell: (info) => info.getValue() ? "✓" : "—",
		enableColumnFilter: true,
		filterFn: "equals",
		meta: { filterVariant: "boolean" }
	}),
	columnHelper.accessor((row) => row.benchmarks?.swe_bench, {
		id: "swe_bench",
		header: "SWE",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SweBenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.verified_swe_bench, {
		id: "verified_swe_bench",
		header: "SWE✓",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SweBenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.humaneval, {
		id: "humaneval",
		header: "HE",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.mbpp, {
		id: "mbpp",
		header: "MBPP",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.bigcodebench, {
		id: "bigcodebench",
		header: "BCB",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.aider_polyglot, {
		id: "aider_polyglot",
		header: "Aider",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.bfcl, {
		id: "bfcl",
		header: "BFCL",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.mmlu, {
		id: "mmlu",
		header: "MMLU",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.gpqa_diamond, {
		id: "gpqa_diamond",
		header: "GPQA",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.math_500, {
		id: "math_500",
		header: "Math",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.gsm8k, {
		id: "gsm8k",
		header: "GSM8K",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.aime_2025, {
		id: "aime_2025",
		header: "AIME",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.arena_elo, {
		id: "arena_elo",
		header: "Arena",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArenaCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.livebench, {
		id: "livebench",
		header: "Live",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.tier_list, {
		id: "tier_list",
		header: "TIER",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.humanity_last_exam, {
		id: "humanity_last_exam",
		header: "HLE",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.tau_bench, {
		id: "tau_bench",
		header: "TAU",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor((row) => row.benchmarks?.terminal_bench, {
		id: "terminal_bench",
		header: "Term",
		cell: (info) => {
			const score = info.getValue();
			if (score === void 0) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchmarkCell, { score });
		},
		enableSorting: true,
		enableColumnFilter: false
	}),
	columnHelper.accessor("knowledge", {
		header: "Knt",
		cell: (info) => info.getValue() || "—",
		enableSorting: true
	}),
	columnHelper.accessor("release_date", {
		header: "Rel",
		cell: (info) => new Date(info.getValue()).toLocaleDateString("en-US", {
			month: "short",
			year: "numeric"
		}),
		enableSorting: true,
		sortingFn: "datetime"
	}),
	columnHelper.accessor("documentation_url", {
		header: "Docs",
		cell: (info) => {
			const url = info.getValue();
			if (!url) return "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: url,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "text-[var(--color-accent)] hover:underline",
				onClick: (e) => e.stopPropagation(),
				children: "🔗"
			});
		},
		enableSorting: false
	}),
	columnHelper.display({
		id: "favorite",
		header: "★",
		cell: (info) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteButton, { modelId: info.row.original.id })
	})
];
//#endregion
export { modelColumns as t };

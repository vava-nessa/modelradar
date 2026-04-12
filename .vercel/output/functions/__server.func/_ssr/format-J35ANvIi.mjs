//#region node_modules/.nitro/vite/services/ssr/assets/format-J35ANvIi.js
/** Formater un nombre de tokens en format lisible */
function formatTokens(n) {
	if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
	if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
	return n.toString();
}
/** Formater un prix avec 2 décimales */
function formatPrice(n) {
	if (n === null) return "—";
	return `$${n.toFixed(2)}`;
}
/** Formater un taux de limitation (rate limit) */
function formatRateLimit(rpm) {
	if (rpm === void 0) return "—";
	if (rpm >= 1e3) return `${(rpm / 1e3).toFixed(0)}K/min`;
	return `${rpm}/min`;
}
//#endregion
export { formatRateLimit as n, formatTokens as r, formatPrice as t };

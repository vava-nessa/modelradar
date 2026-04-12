import { c as createFileRoute, s as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_modelId-ChAqGGF0.js
var $$splitNotFoundComponentImporter = () => import("./_modelId-CyJl9a3s.mjs");
var $$splitComponentImporter = () => import("./_modelId-C6yhCpIX.mjs");
var Route = createFileRoute("/models/$modelId")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };

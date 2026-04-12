import { c as createFileRoute, s as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_providerId-DSWvpYYQ.js
var $$splitNotFoundComponentImporter = () => import("./_providerId-Bu65uLiW.mjs");
var $$splitComponentImporter = () => import("./_providerId-CNCIJ0h3.mjs");
var Route = createFileRoute("/providers/$providerId")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };

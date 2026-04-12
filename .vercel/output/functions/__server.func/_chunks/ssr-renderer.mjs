import { i as toRequest, n as HTTPError } from "../_libs/h3+rou3+srvx.mjs";
//#region node_modules/.pnpm/nitro@3.0.260311-beta_@vercel+blob@2.3.0_chokidar@4.0.0_dotenv@16.6.1_jiti@2.6.1_lru-ca_1f0370d6af289c13a982854bf06478d4/node_modules/nitro/dist/runtime/vite.mjs
function fetchViteEnv(viteEnvName, input, init) {
	const viteEnv = (globalThis.__nitro_vite_envs__ || {})[viteEnvName];
	if (!viteEnv) throw HTTPError.status(404);
	return Promise.resolve(viteEnv.fetch(toRequest(input, init)));
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260311-beta_@vercel+blob@2.3.0_chokidar@4.0.0_dotenv@16.6.1_jiti@2.6.1_lru-ca_1f0370d6af289c13a982854bf06478d4/node_modules/nitro/dist/runtime/internal/vite/ssr-renderer.mjs
/** @param {{ req: Request }} HTTPEvent */
function ssrRenderer({ req }) {
	return fetchViteEnv("ssr", req);
}
//#endregion
export { ssrRenderer as default };

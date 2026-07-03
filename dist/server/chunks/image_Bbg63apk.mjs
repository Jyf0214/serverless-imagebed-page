import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as resolvePool, t as pick } from "./random_Cwtlmw-u.mjs";
//#region src/pages/api/random/image.ts
var image_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ url }) => {
	const urlPicked = pick(resolvePool(url.searchParams.get("orientation"), url.searchParams.get("source") ?? "all"));
	const res = await fetch(urlPicked);
	const contentType = res.headers.get("content-type") ?? "image/jpeg";
	const body = await res.arrayBuffer();
	return new Response(body, { headers: {
		"content-type": contentType,
		"cache-control": "public, max-age=86400"
	} });
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/random/image@_@ts
var page = () => image_exports;
//#endregion
export { page };

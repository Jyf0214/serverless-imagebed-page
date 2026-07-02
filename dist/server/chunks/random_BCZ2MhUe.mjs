import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as resolvePool, t as pick } from "./random_Cwtlmw-u.mjs";
//#region src/pages/api/random.ts
var random_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ url }) => {
	const orientation = url.searchParams.get("orientation");
	const source = url.searchParams.get("source") ?? "all";
	const urlPicked = pick(resolvePool(orientation, source));
	const mode = url.searchParams.get("mode");
	if (mode === "redirect") return new Response(null, {
		status: 302,
		headers: { Location: urlPicked }
	});
	if (mode === "image") {
		const res = await fetch(urlPicked);
		const contentType = res.headers.get("content-type") ?? "image/jpeg";
		const body = await res.arrayBuffer();
		return new Response(body, { headers: {
			"content-type": contentType,
			"cache-control": "public, max-age=86400"
		} });
	}
	return new Response(JSON.stringify({
		url: urlPicked,
		orientation: orientation ?? "random",
		source
	}), { headers: { "content-type": "application/json" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/random@_@ts
var page = () => random_exports;
//#endregion
export { page };

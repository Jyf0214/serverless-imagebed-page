import { readFileSync } from "fs";
import { join } from "path";
//#region src/lib/random.ts
var IMAGES_DIR = join(process.cwd(), "public", "images");
var LISTS = {
	h: readFileSync(join(IMAGES_DIR, "horizontal.all.txt"), "utf-8").split("\n").map((l) => l.trim()).filter(Boolean),
	v: readFileSync(join(IMAGES_DIR, "vertical.all.txt"), "utf-8").split("\n").map((l) => l.trim()).filter(Boolean)
};
function poolBySource(source) {
	if (source === "all") return LISTS;
	return {
		h: LISTS.h.filter((url) => source === "link" ? !url.startsWith("/images/") : url.startsWith("/images/")),
		v: LISTS.v.filter((url) => source === "link" ? !url.startsWith("/images/") : url.startsWith("/images/"))
	};
}
function resolvePool(orientation, source = "all") {
	const pool = poolBySource(source);
	if (orientation === "h" || orientation === "horizontal") return pool.h;
	if (orientation === "v" || orientation === "vertical") return pool.v;
	return [...pool.h, ...pool.v];
}
function pick(list) {
	return list[Math.floor(Math.random() * list.length)];
}
//#endregion
export { resolvePool as n, pick as t };

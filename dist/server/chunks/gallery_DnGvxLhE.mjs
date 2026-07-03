import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as createComponent, i as renderComponent, m as maybeRenderHead, u as renderTemplate, x as createAstro } from "./server_BRXHdXc1.mjs";
import "./compiler_DAe9J7_G.mjs";
import { n as useLocale, r as getTranslations, t as $$Layout } from "./Layout_DxHJEuAH.mjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { readFileSync } from "fs";
import { join } from "path";
//#region src/components/GalleryClient.tsx
var PER_PAGE = 12;
function GalleryClient({ images, page }) {
	const { t } = useLocale();
	const total = Math.max(1, Math.ceil(images.length / PER_PAGE));
	const start = (page - 1) * PER_PAGE;
	const slice = images.slice(start, start + PER_PAGE);
	return /* @__PURE__ */ jsxs("main", {
		className: "flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20",
		children: [
			/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "flex items-center gap-2 text-zinc-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8",
				children: [/* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-pulse" }), /* @__PURE__ */ jsx("span", { children: t.galleryTitle })]
			}),
			slice.length === 0 ? /* @__PURE__ */ jsx("div", {
				className: "py-32 text-center bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700",
				children: /* @__PURE__ */ jsx("p", {
					className: "text-zinc-400",
					children: "暂无图片"
				})
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4",
				children: slice.map((img, i) => /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: { delay: i * .03 },
					children: /* @__PURE__ */ jsxs("a", {
						href: img.url,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "group block bg-white dark:bg-zinc-800 rounded-3xl border-2 border-zinc-50 dark:border-zinc-700 overflow-hidden transition-all duration-300 hover:border-zinc-900 dark:hover:border-zinc-500 hover:shadow-2xl hover:shadow-zinc-100 dark:hover:shadow-zinc-900",
						children: [/* @__PURE__ */ jsx("div", {
							className: "relative aspect-square overflow-hidden",
							children: /* @__PURE__ */ jsx("img", {
								src: img.url,
								alt: "",
								loading: "lazy",
								className: "absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "px-3 py-2.5",
							children: /* @__PURE__ */ jsxs("span", {
								className: "text-[11px] text-zinc-400 truncate block",
								children: [
									img.orientation === "v" ? "竖图" : "横图",
									" · ",
									img.source
								]
							})
						})]
					})
				}, img.url))
			}),
			total > 1 && /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-center gap-2 mt-10",
				children: [
					/* @__PURE__ */ jsxs("a", {
						href: `/gallery?page=${Math.max(1, page - 1)}`,
						className: `inline-flex items-center justify-center gap-1 px-3 py-1 text-xs font-medium border border-zinc-200 dark:border-zinc-700 rounded-xl transition-all hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 ${page === 1 ? "opacity-50 pointer-events-none" : ""}`,
						children: [/* @__PURE__ */ jsx(ChevronLeft, { size: 14 }), /* @__PURE__ */ jsx("span", {
							className: "hidden sm:inline",
							children: t.prev
						})]
					}),
					Array.from({ length: total }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsx("a", {
						href: `/gallery?page=${p}`,
						className: `inline-flex items-center justify-center w-8 h-8 text-xs font-medium rounded-xl transition-all ${p === page ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/20" : "text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"}`,
						children: p
					}, p)),
					/* @__PURE__ */ jsxs("a", {
						href: `/gallery?page=${Math.min(total, page + 1)}`,
						className: `inline-flex items-center justify-center gap-1 px-3 py-1 text-xs font-medium border border-zinc-200 dark:border-zinc-700 rounded-xl transition-all hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 ${page === total ? "opacity-50 pointer-events-none" : ""}`,
						children: [/* @__PURE__ */ jsx("span", {
							className: "hidden sm:inline",
							children: t.next
						}), /* @__PURE__ */ jsx(ChevronRight, { size: 14 })]
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-6 text-center",
				children: /* @__PURE__ */ jsx("p", {
					className: "text-sm text-zinc-400",
					children: t.page.replace("{cur}", String(page)).replace("{total}", String(total))
				})
			})
		]
	});
}
//#endregion
//#region src/lib/images.ts
var IMAGES_DIR = join(process.cwd(), "public", "images");
function readLines(file) {
	try {
		return readFileSync(join(IMAGES_DIR, file), "utf-8").split("\n").map((l) => l.trim()).filter(Boolean);
	} catch {
		return [];
	}
}
function toItem(url, orientation) {
	return {
		url,
		source: url.startsWith("/images/") ? "file" : "link",
		orientation
	};
}
/** 简易哈希排序，相同输入始终得到相同顺序 */
function hashSort(items) {
	return [...items].sort((a, b) => {
		let ha = 0, hb = 0;
		for (let i = 0; i < a.url.length; i++) ha = (ha << 5) - ha + a.url.charCodeAt(i) | 0;
		for (let i = 0; i < b.url.length; i++) hb = (hb << 5) - hb + b.url.charCodeAt(i) | 0;
		return ha - hb;
	});
}
function getAllImages() {
	const items = [];
	for (const url of readLines("horizontal.all.txt")) items.push(toItem(url, "h"));
	for (const url of readLines("vertical.all.txt")) items.push(toItem(url, "v"));
	return hashSort(items);
}
//#endregion
//#region src/pages/gallery.astro
var gallery_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Gallery,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Gallery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Gallery;
	const locale = Astro.cookies.get("locale")?.value || "zh";
	const t = getTranslations(locale);
	const page = Math.max(1, parseInt(Astro.url.searchParams.get("page") ?? "1", 10) || 1);
	const images = getAllImages();
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "locale": locale }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="min-h-screen bg-white font-[var(--font-nunito)] dark:bg-zinc-950"><a href="/" class="fixed left-5 top-5 z-20 rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800">${t.back}</a>${renderComponent($$result, "GalleryClient", GalleryClient, {
		"images": images,
		"page": page,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "@/components/GalleryClient",
		"client:component-export": "default"
	})}</div>` })}`;
}, "/workspaces/serverless-imagebed-page/src/pages/gallery.astro", void 0);
var $$file = "/workspaces/serverless-imagebed-page/src/pages/gallery.astro";
var $$url = "/gallery";
//#endregion
//#region \0virtual:astro:page:src/pages/gallery@_@astro
var page = () => gallery_exports;
//#endregion
export { page };

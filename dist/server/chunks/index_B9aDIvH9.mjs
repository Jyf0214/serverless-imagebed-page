import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as createComponent, i as renderComponent, u as renderTemplate, x as createAstro } from "./server_BRXHdXc1.mjs";
import "./compiler_DAe9J7_G.mjs";
import { n as useLocale, t as $$Layout } from "./Layout_DxHJEuAH.mjs";
import { useEffect, useState } from "react";
import { FileText, Images } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
//#region src/components/HomeClient.tsx
var DEFAULT_BG = "https://bing.img.run/m.php";
function HomeClient() {
	const { t } = useLocale();
	const [time, setTime] = useState("");
	useEffect(() => {
		const update = () => setTime((/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", {
			hour: "2-digit",
			minute: "2-digit"
		}));
		update();
		const id = setInterval(update, 6e4);
		return () => clearInterval(id);
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative h-screen w-full overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("img", {
				src: DEFAULT_BG,
				alt: "",
				className: "absolute inset-0 w-full h-full object-cover"
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/60" }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex h-full flex-col items-center justify-center px-6",
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
						className: "flex items-center gap-2 text-zinc-400 font-black text-[10px] uppercase tracking-[0.2em] mb-6",
						children: [/* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ jsx("span", { children: t.status })]
					}),
					/* @__PURE__ */ jsx(motion.h1, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .1 },
						className: "text-3xl md:text-5xl font-black tracking-tighter text-white text-center mb-3",
						children: t.title
					}),
					/* @__PURE__ */ jsx(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: { delay: .2 },
						className: "text-zinc-400 text-base text-center",
						children: t.subtitle
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .3 },
						className: "mt-10 flex flex-col gap-3 w-56",
						children: [/* @__PURE__ */ jsxs("a", {
							href: "/gallery",
							className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white border border-white/20 rounded-xl transition-all hover:bg-white/10 hover:border-white/30",
							children: [/* @__PURE__ */ jsx(Images, { size: 16 }), t.viewAll]
						}), /* @__PURE__ */ jsxs("a", {
							href: "/api/docs",
							className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white border border-white/20 rounded-xl transition-all hover:bg-white/10 hover:border-white/30",
							children: [/* @__PURE__ */ jsx(FileText, { size: 16 }), t.apiDocs]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "absolute bottom-8 text-xs text-zinc-500 font-mono",
						children: time
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://astro.build");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "locale": Astro.cookies.get("locale")?.value || "zh" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HomeClient", HomeClient, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "@/components/HomeClient",
		"client:component-export": "default"
	})}` })}`;
}, "/workspaces/serverless-imagebed-page/src/pages/index.astro", void 0);
var $$file = "/workspaces/serverless-imagebed-page/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };

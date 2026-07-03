import { S as createComponent, g as addAttribute, h as renderHead, i as renderComponent, s as renderSlot, u as renderTemplate, x as createAstro } from "./server_BRXHdXc1.mjs";
import "./compiler_DAe9J7_G.mjs";
import { createContext, useContext, useState } from "react";
import { Globe } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var dict = {
	zh: {
		title: "随机图床",
		subtitle: "每次刷新，遇见不一样的风景",
		status: "随机图片站点",
		apiDocs: "随机一图 API 文档",
		viewAll: "查看所有图片",
		galleryTitle: "所有图片",
		page: "第 {cur} / {total} 页",
		prev: "上一页",
		next: "下一页",
		back: "返回首页",
		lang: "EN",
		footer: "由 EdgeOne Makers 驱动",
		apiDesc: "随机返回一张图片"
	},
	en: {
		title: "Random Image Bed",
		subtitle: "Refresh to discover a new view",
		status: "Random Image Site",
		apiDocs: "Random Image API Docs",
		viewAll: "View All Images",
		galleryTitle: "All Images",
		page: "Page {cur} / {total}",
		prev: "Prev",
		next: "Next",
		back: "Back",
		lang: "中文",
		footer: "Powered by EdgeOne Makers",
		apiDesc: "Randomly return an image"
	}
};
function getTranslations(locale) {
	return dict[locale] ?? dict["zh"];
}
//#endregion
//#region src/i18n/useLocale.ts
var LocaleContext = createContext({
	locale: "zh",
	t: {}
});
var useLocale = () => useContext(LocaleContext);
//#endregion
//#region src/i18n/RootProvider.tsx
function RootProvider({ locale: initial, children }) {
	const [locale, setLocale] = useState(initial);
	const toggle = () => {
		const next = locale === "zh" ? "en" : "zh";
		document.cookie = `locale=${next};path=/;max-age=31536000`;
		setLocale(next);
	};
	const t = getTranslations(locale);
	return /* @__PURE__ */ jsxs(LocaleContext.Provider, {
		value: {
			locale,
			t
		},
		children: [/* @__PURE__ */ jsx("button", {
			onClick: toggle,
			className: "fixed right-6 top-6 z-50 w-9 h-9 rounded-full border border-zinc-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-all cursor-pointer shadow-sm",
			title: t.lang,
			children: /* @__PURE__ */ jsx(Globe, { size: 16 })
		}), children]
	});
}
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { locale = "zh" } = Astro.props;
	const t = getTranslations(locale);
	return renderTemplate`<html${addAttribute(locale, "lang")} class="h-full"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${t.title}</title><meta name="description"${addAttribute(t.subtitle, "content")}><link rel="icon" type="image/x-icon" href="/favicon.ico">${renderHead($$result)}</head><body class="min-h-full">${renderComponent($$result, "RootProvider", RootProvider, { "locale": locale }, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}</body></html>`;
}, "/workspaces/serverless-imagebed-page/src/layouts/Layout.astro", void 0);
//#endregion
export { useLocale as n, getTranslations as r, $$Layout as t };

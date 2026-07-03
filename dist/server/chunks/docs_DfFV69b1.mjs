import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as createComponent, i as renderComponent, u as renderTemplate, x as createAstro } from "./server_BRXHdXc1.mjs";
import "./compiler_DAe9J7_G.mjs";
import { t as $$Layout } from "./Layout_DxHJEuAH.mjs";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
//#region src/components/ApiDocsClient.tsx
var API_PATH = "/api/random";
function getOrigin() {
	if (typeof window === "undefined") return "";
	try {
		const o = window.location.origin;
		if (o && !o.includes("localhost")) return o;
	} catch {}
	return "https://example.com";
}
var paramList = [
	{
		name: "orientation",
		values: "h / horizontal · v / vertical · （不传）",
		desc: "横图 / 竖图 / 随机"
	},
	{
		name: "source",
		values: "link · file · all（默认）",
		desc: "txt 链接 / 服务器文件 / 混合"
	},
	{
		name: "mode",
		values: "inline（默认）· redirect · image",
		desc: "JSON / 302 重定向 / 图片二进制"
	}
];
function CopyButton({ text }) {
	const [copied, setCopied] = useState(false);
	const handleCopy = () => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};
	return /* @__PURE__ */ jsx("button", {
		onClick: handleCopy,
		className: "shrink-0 text-zinc-300 hover:text-zinc-500 transition-colors cursor-pointer",
		children: copied ? /* @__PURE__ */ jsx(Check, {
			size: 14,
			className: "text-emerald-500"
		}) : /* @__PURE__ */ jsx(Copy, { size: 14 })
	});
}
function ApiDocsClient() {
	const [origin, setOrigin] = useState("https://example.com");
	useEffect(() => {
		setOrigin(getOrigin());
	}, []);
	const api = `${origin}${API_PATH}`;
	const examples = [
		{
			url: api,
			desc: "随机图片，返回 JSON"
		},
		{
			url: `${api}?orientation=h`,
			desc: "随机横图"
		},
		{
			url: `${api}?orientation=v&mode=redirect`,
			desc: "竖图，302 重定向"
		},
		{
			url: `${api}?source=link`,
			desc: "仅从 txt 链接中随机"
		},
		{
			url: `${api}?source=file`,
			desc: "仅从服务器本地文件中随机"
		},
		{
			url: `${api}?mode=image`,
			desc: "直接返回图片二进制"
		},
		{
			url: `${api}/image`,
			desc: "快捷路径，直接返回图片"
		},
		{
			url: `${api}/image?orientation=v&source=link`,
			desc: "返回 txt 中的随机竖图"
		}
	];
	return /* @__PURE__ */ jsxs("main", {
		className: "flex-1 max-w-3xl mx-auto w-full px-6 py-12 md:py-20 overflow-hidden",
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
				children: [
					/* @__PURE__ */ jsxs("a", {
						href: "/",
						className: "inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-900 transition-colors mb-8",
						children: [/* @__PURE__ */ jsx(ArrowLeft, { size: 14 }), "返回首页"]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 mb-4",
						children: "随机一图 API"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-zinc-500 text-lg mb-12 max-w-xl",
						children: "随机返回一张图片，支持横图 / 竖图筛选，图片来源支持 txt 链接、服务器本地文件或混合。"
					})
				]
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
				transition: { delay: .1 },
				className: "bg-white rounded-2xl border border-zinc-100 p-6 mb-6",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-sm font-semibold text-zinc-900 mb-4",
					children: "接口地址"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 border border-emerald-100",
							children: "GET"
						}),
						/* @__PURE__ */ jsx("code", {
							className: "text-sm text-zinc-600 font-mono break-all",
							children: api
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-zinc-300",
							children: "|"
						}),
						/* @__PURE__ */ jsxs("code", {
							className: "text-sm text-zinc-600 font-mono break-all",
							children: [api, "/image"]
						})
					]
				})]
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
				transition: { delay: .15 },
				className: "bg-white rounded-2xl border border-zinc-100 overflow-hidden mb-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "px-6 py-4 border-b border-zinc-50",
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-zinc-900",
						children: "请求参数"
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm min-w-[480px]",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "text-left text-zinc-400 text-xs uppercase tracking-wider border-b border-zinc-50",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 font-medium",
									children: "参数"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 font-medium",
									children: "可选值"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 font-medium",
									children: "说明"
								})
							]
						}) }), /* @__PURE__ */ jsx("tbody", { children: paramList.map((p) => /* @__PURE__ */ jsxs("tr", {
							className: "border-b border-zinc-50 last:border-0",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-3",
									children: /* @__PURE__ */ jsx("code", {
										className: "rounded-md bg-zinc-50 px-2 py-0.5 text-xs font-mono text-zinc-700",
										children: p.name
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-3 text-zinc-500 text-xs",
									children: p.values
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-3 text-zinc-400 text-xs",
									children: p.desc
								})
							]
						}, p.name)) })]
					})
				})]
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
				transition: { delay: .2 },
				className: "bg-white rounded-2xl border border-zinc-100 overflow-hidden mb-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "px-6 py-4 border-b border-zinc-50",
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-zinc-900",
						children: "调用示例"
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "p-4 space-y-2",
					children: examples.map((e) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-zinc-50",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx("code", {
								className: "text-[13px] text-zinc-700 font-mono break-all leading-relaxed",
								children: e.url
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-zinc-400 break-words",
								children: e.desc
							})]
						}), /* @__PURE__ */ jsx(CopyButton, { text: e.url })]
					}, e.url))
				})]
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
				transition: { delay: .25 },
				className: "bg-white rounded-2xl border border-zinc-100 overflow-hidden mb-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "px-6 py-4 border-b border-zinc-50",
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-zinc-900",
						children: "响应示例"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-6",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-sm text-zinc-500 mb-3",
						children: [
							"当 ",
							/* @__PURE__ */ jsx("code", {
								className: "rounded-md bg-zinc-50 px-2 py-0.5 text-xs font-mono text-zinc-700",
								children: "mode=inline"
							}),
							"（默认）时返回 JSON："
						]
					}), /* @__PURE__ */ jsx("pre", {
						className: "rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-[13px] text-zinc-600 font-mono break-all whitespace-pre-wrap",
						children: `{
  "url": "https://example.com/image.jpg",
  "orientation": "h",
  "source": "all"
}`
					})]
				})]
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
				className: "bg-white rounded-2xl border border-zinc-100 overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", {
					className: "px-6 py-4 border-b border-zinc-50",
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-zinc-900",
						children: "直接图片路径"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-6",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-sm text-zinc-500 mb-3",
						children: [
							/* @__PURE__ */ jsxs("code", {
								className: "rounded-md bg-zinc-50 px-2 py-0.5 text-xs font-mono text-zinc-700",
								children: [api, "/image"]
							}),
							" 可直接用作 ",
							/* @__PURE__ */ jsx("code", {
								className: "rounded-md bg-zinc-50 px-2 py-0.5 text-xs font-mono text-zinc-700",
								children: "<img>"
							}),
							"，无需解析 JSON。"
						]
					}), /* @__PURE__ */ jsx("pre", {
						className: "rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-[13px] text-zinc-600 font-mono break-all whitespace-pre-wrap",
						children: `<img src="${api}/image?orientation=h&source=file" />`
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/api/docs.astro
var docs_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Docs,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Docs = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Docs;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "locale": Astro.cookies.get("locale")?.value || "zh" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ApiDocsClient", ApiDocsClient, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "@/components/ApiDocsClient",
		"client:component-export": "default"
	})}` })}`;
}, "/workspaces/serverless-imagebed-page/src/pages/api/docs.astro", void 0);
var $$file = "/workspaces/serverless-imagebed-page/src/pages/api/docs.astro";
var $$url = "/api/docs";
//#endregion
//#region \0virtual:astro:page:src/pages/api/docs@_@astro
var page = () => docs_exports;
//#endregion
export { page };

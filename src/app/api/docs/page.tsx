"use client";

import Link from "next/link";

const BASE = "/api/random";

const params = [
  { name: "orientation", values: "h / horizontal · v / vertical · （不传）", desc: "横图 / 竖图 / 随机" },
  { name: "source", values: "link · file · all（默认）", desc: "txt 链接 / 服务器文件 / 混合" },
  { name: "mode", values: "inline（默认）· redirect · image", desc: "JSON / 302 重定向 / 图片二进制" },
];

const examples = [
  { url: `${BASE}`, desc: "随机图片，返回 JSON" },
  { url: `${BASE}?orientation=h`, desc: "随机横图" },
  { url: `${BASE}?orientation=v&mode=redirect`, desc: "竖图，302 重定向" },
  { url: `${BASE}?source=link`, desc: "仅从 txt 链接中随机" },
  { url: `${BASE}?source=file`, desc: "仅从服务器本地文件中随机" },
  { url: `${BASE}?mode=image`, desc: "直接返回图片二进制" },
  { url: `${BASE}/image`, desc: "快捷路径，直接返回图片" },
  { url: `${BASE}/image?orientation=v&source=link`, desc: "返回 txt 中的随机竖图" },
];

export default function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-zinc-500 transition-colors hover:text-white"
      >
        ← 返回首页
      </Link>

      <h1 className="text-3xl font-bold tracking-tight">随机一图 API</h1>
      <p className="mt-2 text-zinc-400">
        随机返回一张图片，支持横图 / 竖图筛选，图片来源支持 txt 链接、服务器本地文件或混合。
      </p>

      <div className="mt-8 rounded-xl border border-white/5 bg-zinc-900/50 px-4 py-3">
        <span className="mr-3 rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
          GET
        </span>
        <code className="text-sm text-zinc-300">{BASE}</code>
        <span className="mx-2 text-zinc-600">|</span>
        <code className="text-sm text-zinc-300">{BASE}/image</code>
      </div>

      <h3 className="mb-4 mt-10 text-lg font-semibold">请求参数</h3>
      <div className="overflow-hidden rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-zinc-900/50 text-left text-zinc-400">
              <th className="px-4 py-3 font-medium">参数</th>
              <th className="px-4 py-3 font-medium">可选值</th>
              <th className="px-4 py-3 font-medium">说明</th>
            </tr>
          </thead>
          <tbody>
            {params.map((p) => (
              <tr key={p.name} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3">
                  <code className="rounded bg-white/5 px-1.5 py-0.5 text-zinc-300">
                    {p.name}
                  </code>
                </td>
                <td className="px-4 py-3 text-zinc-400">{p.values}</td>
                <td className="px-4 py-3 text-zinc-500">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-4 mt-10 text-lg font-semibold">调用示例</h3>
      <div className="space-y-2">
        {examples.map((e) => (
          <div
            key={e.url}
            className="rounded-lg border border-white/5 bg-zinc-900/30 px-4 py-3 transition-colors hover:border-white/10"
          >
            <code className="text-[13px] text-zinc-300">{e.url}</code>
            <p className="mt-1 text-xs text-zinc-500">{e.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="mb-4 mt-10 text-lg font-semibold">响应示例</h3>
      <p className="mb-3 text-sm text-zinc-400">
        当 <code className="rounded bg-white/5 px-1.5 py-0.5 text-zinc-300">mode=inline</code>（默认）时返回 JSON：
      </p>
      <pre className="overflow-auto rounded-xl border border-white/5 bg-zinc-900/50 p-4 text-[13px] text-zinc-300">
{`{
  "url": "https://images.unsplash.com/photo-xxx?w=1920&q=80",
  "orientation": "h",
  "source": "all"
}`}
      </pre>

      <h3 className="mb-4 mt-10 text-lg font-semibold">直接图片路径</h3>
      <p className="mb-3 text-sm text-zinc-400">
        <code className="rounded bg-white/5 px-1.5 py-0.5 text-zinc-300">{BASE}/image</code> 可直接用作{" "}
        <code className="rounded bg-white/5 px-1.5 py-0.5 text-zinc-300">&lt;img src=&quot;...&quot;&gt;</code>，无需解析 JSON。
      </p>
      <pre className="overflow-auto rounded-xl border border-white/5 bg-zinc-900/50 p-4 text-[13px] text-zinc-300">
{`<img src="${BASE}/image?orientation=h&source=file" />`}
      </pre>
    </div>
  );
}

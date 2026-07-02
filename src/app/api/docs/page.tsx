"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Copy, Check } from "lucide-react";

const API_PATH = "/api/random";

function getOrigin() {
  if (typeof window === "undefined") return "";
  try {
    const o = window.location.origin;
    if (o && !o.includes("localhost")) return o;
  } catch {}
  return "https://example.com";
}

const paramList = [
  { name: "orientation", values: "h / horizontal · v / vertical · （不传）", desc: "横图 / 竖图 / 随机" },
  { name: "source", values: "link · file · all（默认）", desc: "txt 链接 / 服务器文件 / 混合" },
  { name: "mode", values: "inline（默认）· redirect · image", desc: "JSON / 302 重定向 / 图片二进制" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="shrink-0 text-zinc-300 hover:text-zinc-500 transition-colors cursor-pointer"
    >
      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
    </button>
  );
}

export default function ApiDocsPage() {
  const [origin, setOrigin] = useState("https://example.com");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrigin(getOrigin());
  }, []);

  const api = `${origin}${API_PATH}`;

  const examples = [
    { url: api, desc: "随机图片，返回 JSON" },
    { url: `${api}?orientation=h`, desc: "随机横图" },
    { url: `${api}?orientation=v&mode=redirect`, desc: "竖图，302 重定向" },
    { url: `${api}?source=link`, desc: "仅从 txt 链接中随机" },
    { url: `${api}?source=file`, desc: "仅从服务器本地文件中随机" },
    { url: `${api}?mode=image`, desc: "直接返回图片二进制" },
    { url: `${api}/image`, desc: "快捷路径，直接返回图片" },
    { url: `${api}/image?orientation=v&source=link`, desc: "返回 txt 中的随机竖图" },
  ];

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 md:py-20 overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-900 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          返回首页
        </Link>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 mb-4">
          随机一图 API
        </h1>
        <p className="text-zinc-500 text-lg mb-12 max-w-xl">
          随机返回一张图片，支持横图 / 竖图筛选，图片来源支持 txt 链接、服务器本地文件或混合。
        </p>
      </motion.div>

      {/* 接口地址 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-zinc-100 p-6 mb-6"
      >
        <h2 className="text-sm font-semibold text-zinc-900 mb-4">接口地址</h2>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 border border-emerald-100">
            GET
          </span>
          <code className="text-sm text-zinc-600 font-mono break-all">{api}</code>
          <span className="text-zinc-300">|</span>
          <code className="text-sm text-zinc-600 font-mono break-all">{api}/image</code>
        </div>
      </motion.div>

      {/* 请求参数 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl border border-zinc-100 overflow-hidden mb-6"
      >
        <div className="px-6 py-4 border-b border-zinc-50">
          <h2 className="text-sm font-semibold text-zinc-900">请求参数</h2>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="text-left text-zinc-400 text-xs uppercase tracking-wider border-b border-zinc-50">
              <th className="px-6 py-3 font-medium">参数</th>
              <th className="px-6 py-3 font-medium">可选值</th>
              <th className="px-6 py-3 font-medium">说明</th>
            </tr>
          </thead>
          <tbody>
            {paramList.map((p) => (
              <tr key={p.name} className="border-b border-zinc-50 last:border-0">
                <td className="px-6 py-3">
                  <code className="rounded-md bg-zinc-50 px-2 py-0.5 text-xs font-mono text-zinc-700">
                    {p.name}
                  </code>
                </td>
                <td className="px-6 py-3 text-zinc-500 text-xs">{p.values}</td>
                <td className="px-6 py-3 text-zinc-400 text-xs">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </motion.div>

      {/* 调用示例 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-zinc-100 overflow-hidden mb-6"
      >
        <div className="px-6 py-4 border-b border-zinc-50">
          <h2 className="text-sm font-semibold text-zinc-900">调用示例</h2>
        </div>
        <div className="p-4 space-y-2">
          {examples.map((e) => (
            <div
              key={e.url}
              className="flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-zinc-50"
            >
              <div className="min-w-0 flex-1">
                <code className="text-[13px] text-zinc-700 font-mono break-all leading-relaxed">{e.url}</code>
                <p className="mt-1 text-xs text-zinc-400 break-words">{e.desc}</p>
              </div>
              <CopyButton text={e.url} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* 响应示例 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl border border-zinc-100 overflow-hidden mb-6"
      >
        <div className="px-6 py-4 border-b border-zinc-50">
          <h2 className="text-sm font-semibold text-zinc-900">响应示例</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-zinc-500 mb-3">
            当 <code className="rounded-md bg-zinc-50 px-2 py-0.5 text-xs font-mono text-zinc-700">mode=inline</code>（默认）时返回 JSON：
          </p>
          <pre className="rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-[13px] text-zinc-600 font-mono break-all whitespace-pre-wrap">
{`{
  "url": "https://example.com/image.jpg",
  "orientation": "h",
  "source": "all"
}`}
          </pre>
        </div>
      </motion.div>

      {/* 直接图片路径 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-zinc-100 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-zinc-50">
          <h2 className="text-sm font-semibold text-zinc-900">直接图片路径</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-zinc-500 mb-3">
            <code className="rounded-md bg-zinc-50 px-2 py-0.5 text-xs font-mono text-zinc-700">{api}/image</code> 可直接用作 <code className="rounded-md bg-zinc-50 px-2 py-0.5 text-xs font-mono text-zinc-700">&lt;img&gt;</code>，无需解析 JSON。
          </p>
          <pre className="rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-[13px] text-zinc-600 font-mono break-all whitespace-pre-wrap">
{`<img src="${api}/image?orientation=h&source=file" />`}
          </pre>
        </div>
      </motion.div>
    </main>
  );
}

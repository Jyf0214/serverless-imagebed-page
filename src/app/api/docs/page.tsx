"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Copy } from "lucide-react";

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
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          返回首页
        </Link>

        <h1 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mb-2">
          随机一图 API
        </h1>
        <p className="text-zinc-400 text-sm mb-8">
          随机返回一张图片，支持横图 / 竖图筛选，图片来源支持 txt 链接、服务器本地文件或混合。
        </p>
      </motion.div>

      {/* 接口地址 ProCard */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-zinc-800 rounded-3xl border-2 border-zinc-50 dark:border-zinc-700 overflow-hidden mb-6"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-50 dark:border-zinc-700">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">接口地址</span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              GET
            </span>
            <code className="text-sm text-zinc-600 dark:text-zinc-300 font-mono">{BASE}</code>
            <span className="text-zinc-300 dark:text-zinc-600">|</span>
            <code className="text-sm text-zinc-600 dark:text-zinc-300 font-mono">{BASE}/image</code>
          </div>
        </div>
      </motion.div>

      {/* 请求参数 ProCard */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white dark:bg-zinc-800 rounded-3xl border-2 border-zinc-50 dark:border-zinc-700 overflow-hidden mb-6"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-50 dark:border-zinc-700">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">请求参数</span>
        </div>
        <div className="p-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-400 text-xs uppercase tracking-wider">
                <th className="pb-3 font-medium">参数</th>
                <th className="pb-3 font-medium">可选值</th>
                <th className="pb-3 font-medium">说明</th>
              </tr>
            </thead>
            <tbody>
              {params.map((p) => (
                <tr key={p.name} className="border-t border-zinc-50 dark:border-zinc-700">
                  <td className="py-3 pr-4">
                    <code className="rounded-lg bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                      {p.name}
                    </code>
                  </td>
                  <td className="py-3 pr-4 text-zinc-500 dark:text-zinc-400 text-xs">{p.values}</td>
                  <td className="py-3 text-zinc-400 dark:text-zinc-500 text-xs">{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* 调用示例 ProCard */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-zinc-800 rounded-3xl border-2 border-zinc-50 dark:border-zinc-700 overflow-hidden mb-6"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-50 dark:border-zinc-700">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">调用示例</span>
        </div>
        <div className="p-5 space-y-2">
          {examples.map((e) => (
            <div
              key={e.url}
              className="flex items-start justify-between gap-4 rounded-xl border border-zinc-50 dark:border-zinc-700 px-4 py-3 transition-colors hover:border-zinc-200 dark:hover:border-zinc-600"
            >
              <div className="min-w-0">
                <code className="text-[13px] text-zinc-600 dark:text-zinc-300 font-mono break-all">{e.url}</code>
                <p className="mt-0.5 text-xs text-zinc-400">{e.desc}</p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(e.url)}
                className="shrink-0 text-zinc-300 dark:text-zinc-600 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors cursor-pointer"
              >
                <Copy size={14} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 响应示例 ProCard */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white dark:bg-zinc-800 rounded-3xl border-2 border-zinc-50 dark:border-zinc-700 overflow-hidden mb-6"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-50 dark:border-zinc-700">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">响应示例</span>
        </div>
        <div className="p-5">
          <p className="text-sm text-zinc-400 mb-3">
            当 <code className="rounded-lg bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 text-xs font-mono text-zinc-700 dark:text-zinc-300">mode=inline</code>（默认）时返回 JSON：
          </p>
          <pre className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 text-[13px] text-zinc-600 dark:text-zinc-300 font-mono overflow-auto">
{`{
  "url": "https://example.com/image.jpg",
  "orientation": "h",
  "source": "all"
}`}
          </pre>
        </div>
      </motion.div>
    </main>
  );
}

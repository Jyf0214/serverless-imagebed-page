import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "随机一图 API 文档",
  description: "随机图片 API 接口文档",
};

const BASE = "/api/random";

const PARAMS = [
  {
    name: "orientation",
    values: [
      { val: "h / horizontal", desc: "横图" },
      { val: "v / vertical", desc: "竖图" },
      { val: "（不传）", desc: "随机" },
    ],
  },
  {
    name: "source",
    values: [
      { val: "link", desc: "仅使用 txt 文件中的链接" },
      { val: "file", desc: "仅使用服务器本地图片文件" },
      { val: "all", desc: "链接 + 本地文件混合（默认）" },
    ],
  },
  {
    name: "mode",
    values: [
      { val: "inline", desc: "返回 JSON，默认" },
      { val: "redirect", desc: "302 重定向到图片 URL" },
      { val: "image", desc: "直接返回图片二进制" },
    ],
  },
];

const EXAMPLES = [
  { url: `${BASE}`, desc: "随机图片（全部来源），返回 JSON" },
  { url: `${BASE}?orientation=h`, desc: "随机横图，返回 JSON" },
  { url: `${BASE}?orientation=v&mode=redirect`, desc: "竖图，302 重定向" },
  { url: `${BASE}?source=link`, desc: "仅从 txt 链接中随机" },
  { url: `${BASE}?source=file`, desc: "仅从服务器本地文件中随机" },
  { url: `${BASE}?source=file&orientation=v`, desc: "仅本地竖图" },
  { url: `${BASE}?mode=image`, desc: "随机图片，直接返回图片" },
  { url: `${BASE}/image`, desc: "直接返回随机图片（快捷路径）" },
  { url: `${BASE}/image?orientation=v&source=link`, desc: "直接返回 txt 中的随机竖图" },
];

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm text-rose-600 dark:bg-zinc-800 dark:text-rose-400">
      {children}
    </code>
  );
}

export default function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 font-[var(--font-nunito)]">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        ← 返回首页
      </Link>

      <h1 className="text-4xl font-bold tracking-tight">随机一图 API</h1>
      <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
        随机返回一张图片，支持横图 / 竖图筛选，图片来源支持 txt 链接、服务器本地文件或混合。
      </p>

      {/* 接口地址 */}
      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">接口地址</h2>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <span className="font-medium">GET</span>{" "}
          <CodeBlock>{BASE}</CodeBlock>
          <span className="mx-2 text-zinc-400">|</span>
          <CodeBlock>{BASE}/image</CodeBlock>
        </div>
      </section>

      {/* 图片来源说明 */}
      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">图片来源</h2>
        <div className="space-y-3 text-zinc-600 dark:text-zinc-400">
          <div className="flex gap-3">
            <CodeBlock>link</CodeBlock>
            <span>
              来自 <CodeBlock>horizontal.txt</CodeBlock> /{" "}
              <CodeBlock>vertical.txt</CodeBlock> 中的外部图片 URL，每行一个链接。
            </span>
          </div>
          <div className="flex gap-3">
            <CodeBlock>file</CodeBlock>
            <span>
              服务器本地 <CodeBlock>images/</CodeBlock> 目录下的实际图片文件（jpg、png、webp
              等），系统自动根据图片尺寸判定横竖。
            </span>
          </div>
          <div className="flex gap-3">
            <CodeBlock>all</CodeBlock>
            <span>以上两种来源混合，默认值。</span>
          </div>
        </div>
      </section>

      {/* 请求参数 */}
      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">请求参数</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="pb-2 font-medium">参数</th>
                <th className="pb-2 font-medium">可选值</th>
                <th className="pb-2 font-medium">说明</th>
              </tr>
            </thead>
            <tbody>
              {PARAMS.map((p) =>
                p.values.map((v, i) => (
                  <tr
                    key={`${p.name}-${i}`}
                    className="border-b border-zinc-100 dark:border-zinc-800"
                  >
                    {i === 0 && (
                      <td
                        className="py-2 align-top font-mono font-medium"
                        rowSpan={p.values.length}
                      >
                        {p.name}
                      </td>
                    )}
                    <td className="py-2 align-top">
                      <CodeBlock>{v.val}</CodeBlock>
                    </td>
                    <td className="py-2 align-top text-zinc-600 dark:text-zinc-400">
                      {v.desc}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 调用示例 */}
      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">调用示例</h2>
        <div className="space-y-3">
          {EXAMPLES.map((e) => (
            <div
              key={e.url}
              className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700 sm:flex-row sm:items-center sm:gap-4"
            >
              <CodeBlock>{e.url}</CodeBlock>
              <span className="text-sm text-zinc-500">{e.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 响应示例 */}
      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">响应示例</h2>
        <p className="mb-3 text-sm text-zinc-500">
          当 <CodeBlock>mode=inline</CodeBlock>（默认）时返回 JSON：
        </p>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
{`{
  "url": "https://images.unsplash.com/photo-xxx?w=1920&q=80",
  "orientation": "h",
  "source": "all"
}`}
        </pre>
      </section>

      {/* 直接图片路径 */}
      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">直接图片路径</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          <CodeBlock>{BASE}/image</CodeBlock> 可直接用作{" "}
          <CodeBlock>&lt;img src=&quot;...&quot;&gt;</CodeBlock>，无需解析 JSON。
          支持 <CodeBlock>orientation</CodeBlock> 和{" "}
          <CodeBlock>source</CodeBlock> 参数。
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
{`<img src="${BASE}/image?orientation=h&source=file" />`}
        </pre>
      </section>
    </div>
  );
}

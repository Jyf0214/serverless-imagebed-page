import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

// ── mock next/image ────────────────────────────────────
vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock("next/font/google", () => ({
  Nunito: () => ({ variable: "--font-nunito", className: "" }),
}));

vi.mock("next/headers", () => ({
  headers: async () => ({
    get: (key: string) => (key === "x-locale" ? "zh" : null),
  }),
}));

vi.mock("@/i18n/useLocale", () => ({
  useLocale: () => ({
    locale: "zh",
    t: {
      title: "随机图床",
      subtitle: "每次刷新，遇见不一样的风景",
      status: "随机图片站点",
      apiDocs: "📄 随机一图 API 文档",
      viewAll: "📷 查看所有图片",
      galleryTitle: "所有图片",
      page: "第 {cur} / {total} 页",
      prev: "上一页",
      next: "下一页",
      back: "← 返回首页",
      lang: "EN",
    },
  }),
}));

vi.mock("@/i18n/RootProvider", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.stubGlobal(
  "fetch",
  vi.fn(async () => ({
    headers: { get: () => "image/jpeg" },
    arrayBuffer: async () => new ArrayBuffer(8),
  }))
);

// ── mock lib 模块 ─────────────────────────────────────

const MOCK_H = [
  "https://images.unsplash.com/photo-1?w=800",
  "https://images.unsplash.com/photo-2?w=800",
  "/images/land1.jpg",
];
const MOCK_V = [
  "https://images.unsplash.com/photo-3?w=600",
  "/images/port1.jpg",
];
const ALL = [...MOCK_H, ...MOCK_V];

vi.mock("@/app/api/random/lib", () => ({
  resolvePool: (orientation: string | null, source: string = "all") => {
    let h = MOCK_H, v = MOCK_V;
    if (source === "link") { h = MOCK_H.filter((u) => u.startsWith("http")); v = MOCK_V.filter((u) => u.startsWith("http")); }
    if (source === "file") { h = MOCK_H.filter((u) => u.startsWith("/")); v = MOCK_V.filter((u) => u.startsWith("/")); }
    if (orientation === "h") return h;
    if (orientation === "v") return v;
    return [...h, ...v];
  },
  pick: (list: string[]) => list[0],
}));

vi.mock("@/lib/images", () => ({
  getAllImages: () => [
    ...MOCK_H.map((url) => ({ url, source: url.startsWith("/") ? "file" : "link", orientation: "h" })),
    ...MOCK_V.map((url) => ({ url, source: url.startsWith("/") ? "file" : "link", orientation: "v" })),
  ],
}));

// ====================================================================
// API 测试
// ====================================================================

import { resolvePool, pick } from "@/app/api/random/lib";
import { GET } from "@/app/api/random/route";
import { NextRequest } from "next/server";

function req(path: string) {
  return new NextRequest(new URL(path, "http://localhost"));
}

describe("resolvePool", () => {
  it("默认返回全部", () => expect(resolvePool(null)).toHaveLength(ALL.length));
  it("orientation=h 仅横图", () => expect(resolvePool("h")).toHaveLength(MOCK_H.length));
  it("orientation=v 仅竖图", () => expect(resolvePool("v")).toHaveLength(MOCK_V.length));
  it("source=link 仅外部链接", () => resolvePool(null, "link").forEach((u: string) => expect(u).toMatch(/^https/)));
  it("source=file 仅服务器", () => resolvePool(null, "file").forEach((u: string) => expect(u).toMatch(/^\/images\//)));
  it("orientation+source 组合", () => expect(resolvePool("v", "link")).toEqual(["https://images.unsplash.com/photo-3?w=600"]));
  it("pick 返回元素", () => { for (let i = 0; i < 10; i++) expect(ALL).toContain(pick(ALL)); });
});

describe("GET /api/random", () => {
  it("默认返回 JSON", async () => {
    const res = await GET(req("/api/random"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("url");
  });

  it("mode=redirect 返回 302", async () => {
    const res = await GET(req("/api/random?mode=redirect"));
    expect(res.status).toBe(302);
  });

  it("mode=image 返回图片", async () => {
    const res = await GET(req("/api/random?mode=image"));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("image");
  });

  it("orientation=h 返回横图", async () => {
    const res = await GET(req("/api/random?orientation=h"));
    const { url } = await res.json();
    expect(MOCK_H).toContain(url);
  });

  it("orientation=v 返回竖图", async () => {
    const res = await GET(req("/api/random?orientation=v"));
    const { url } = await res.json();
    expect(MOCK_V).toContain(url);
  });

  it("source=link 仅外部", async () => {
    const { url } = await (await GET(req("/api/random?source=link"))).json();
    expect(url).toMatch(/^https/);
  });

  it("source=file 仅服务器", async () => {
    const { url } = await (await GET(req("/api/random?source=file"))).json();
    expect(url).toMatch(/^\/images\//);
  });
});

// ====================================================================
// 页面渲染测试
// ====================================================================

import Home from "@/app/page";
import GalleryClient from "@/app/gallery/GalleryClient";
import type { ImageItem } from "@/lib/images";

describe("首页渲染", () => {
  it("显示站点标题", () => { render(<Home />); expect(screen.getByText("随机图床")).toBeInTheDocument(); });
  it("显示副标题", () => { render(<Home />); expect(screen.getByText("每次刷新，遇见不一样的风景")).toBeInTheDocument(); });
  it("显示状态标签", () => { render(<Home />); expect(screen.getByText("随机图片站点")).toBeInTheDocument(); });
  it("API 文档链接", () => { render(<Home />); expect(screen.getByRole("link", { name: /随机一图 API 文档/ })).toHaveAttribute("href", "/api/docs"); });
  it("查看所有链接", () => { render(<Home />); expect(screen.getByRole("link", { name: /查看所有图片/ })).toHaveAttribute("href", "/gallery"); });
  it("包含背景图", () => { render(<Home />); expect(document.querySelector('img[alt=""]')).toBeInTheDocument(); });
});

const mockImages: ImageItem[] = Array.from({ length: 25 }, (_, i) => ({
  url: `https://example.com/img${i}.jpg`, source: "link", orientation: i % 3 === 0 ? "v" : "h",
}));

describe("Gallery 客户端", () => {
  it("显示标题", () => { render(<GalleryClient images={mockImages} page={1} />); expect(screen.getByText("所有图片")).toBeInTheDocument(); });

  it("每页 12 张", () => {
    let r = render(<GalleryClient images={mockImages} page={1} />);
    expect(document.querySelectorAll('img[alt=""]').length).toBe(12);
    r.unmount();
    r = render(<GalleryClient images={mockImages} page={2} />);
    expect(document.querySelectorAll('img[alt=""]').length).toBe(12);
    r.unmount();
    r = render(<GalleryClient images={mockImages} page={3} />);
    expect(document.querySelectorAll('img[alt=""]').length).toBe(1);
  });

  it("页码", () => { render(<GalleryClient images={mockImages} page={1} />); expect(screen.getByText("第 1 / 3 页")).toBeInTheDocument(); });
  it("上一页", () => { render(<GalleryClient images={mockImages} page={2} />); expect(screen.getByText("上一页")).toBeInTheDocument(); });
  it("下一页", () => { render(<GalleryClient images={mockImages} page={1} />); expect(screen.getByText("下一页")).toBeInTheDocument(); });
  it("空列表", () => { render(<GalleryClient images={[]} page={1} />); expect(screen.getByText("第 1 / 1 页")).toBeInTheDocument(); });
});

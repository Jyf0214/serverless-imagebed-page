import { readFileSync } from "fs";
import { join } from "path";

const IMAGES_DIR = join(process.cwd(), "public", "images");

// 读取合并文件（外部链接 + 服务器图片，构建时自动生成）
const LISTS: { h: string[]; v: string[] } = {
  h: readFileSync(join(IMAGES_DIR, "horizontal.all.txt"), "utf-8")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean),
  v: readFileSync(join(IMAGES_DIR, "vertical.all.txt"), "utf-8")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean),
};

export type Source = "link" | "file" | "all";

function poolBySource(source: Source): { h: string[]; v: string[] } {
  if (source === "all") return LISTS;

  return {
    h: LISTS.h.filter((url) =>
      source === "link" ? !url.startsWith("/images/") : url.startsWith("/images/")
    ),
    v: LISTS.v.filter((url) =>
      source === "link" ? !url.startsWith("/images/") : url.startsWith("/images/")
    ),
  };
}

export function resolvePool(orientation: string | null, source: Source = "all"): string[] {
  const pool = poolBySource(source);
  if (orientation === "h" || orientation === "horizontal") return pool.h;
  if (orientation === "v" || orientation === "vertical") return pool.v;
  return [...pool.h, ...pool.v];
}

export function pick(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

import { readFileSync } from "fs";
import { join } from "path";

const IMAGES_DIR = join(process.cwd(), "public", "images");

export interface ImageItem {
  url: string;
  source: "link" | "file";
  orientation: "h" | "v";
}

function readLines(file: string): string[] {
  try {
    return readFileSync(join(IMAGES_DIR, file), "utf-8")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function toItem(url: string, orientation: "h" | "v"): ImageItem {
  return {
    url,
    source: url.startsWith("/images/") ? "file" : "link",
    orientation,
  };
}

/** 简易哈希排序，相同输入始终得到相同顺序 */
function hashSort(items: ImageItem[]): ImageItem[] {
  return [...items].sort((a, b) => {
    let ha = 0,
      hb = 0;
    for (let i = 0; i < a.url.length; i++) ha = ((ha << 5) - ha + a.url.charCodeAt(i)) | 0;
    for (let i = 0; i < b.url.length; i++) hb = ((hb << 5) - hb + b.url.charCodeAt(i)) | 0;
    return ha - hb;
  });
}

export function getAllImages(): ImageItem[] {
  const items: ImageItem[] = [];

  for (const url of readLines("horizontal.all.txt")) {
    items.push(toItem(url, "h"));
  }
  for (const url of readLines("vertical.all.txt")) {
    items.push(toItem(url, "v"));
  }

  return hashSort(items);
}

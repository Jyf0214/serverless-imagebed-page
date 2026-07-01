#!/usr/bin/env node

/**
 * 构建时自动生成图片元数据
 *
 * 1. 读取 horizontal.txt / vertical.txt（外部链接）
 * 2. 扫描 images/ 下的服务器图片，通过文件头分析横竖
 * 3. 输出合并后的 horizontal.all.txt / vertical.all.txt 到 public/images/
 * 4. API 和页面统一读取合并文件
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs";
import { join, extname } from "path";

const ROOT = process.cwd();
const SRC = join(ROOT, "images");
const OUT = join(ROOT, "public", "images");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tiff", ".tif"]);

// ── 读取外部链接 ──────────────────────────────────────

function readLines(file) {
  try {
    return readFileSync(join(SRC, file), "utf-8")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

const extH = readLines("horizontal.txt");
const extV = readLines("vertical.txt");

// ── 分析服务器图片方向 ────────────────────────────────

function detectOrientation(filePath) {
  try {
    const fd = readFileSync(filePath);

    // PNG
    if (fd[0] === 0x89 && fd[1] === 0x50) {
      return fd.readUInt32BE(20) > fd.readUInt32BE(16) ? "v" : "h";
    }

    // JPEG — 遍历 SOF 标记
    let i = 2;
    while (i < fd.length - 9) {
      if (fd[i] !== 0xff) break;
      const m = fd[i + 1];
      if (m === 0xc0 || m === 0xc2) {
        return fd.readUInt16BE(i + 5) > fd.readUInt16BE(i + 7) ? "v" : "h";
      }
      i += 2 + fd.readUInt16BE(i + 2);
    }

    // WebP
    if (
      fd.subarray(0, 4).toString() === "RIFF" &&
      fd.subarray(8, 12).toString() === "WEBP"
    ) {
      return fd.readUInt16LE(28) > fd.readUInt16LE(26) ? "v" : "h";
    }

    // TIFF — 字节序标记 0x4949 (LE) / 0x4D4D (BE)
    if (fd[0] === 0x49 && fd[1] === 0x49) {
      const w = fd.readUInt16LE(18);
      const h = fd.readUInt16LE(20);
      return h > w ? "v" : "h";
    }
    if (fd[0] === 0x4d && fd[1] === 0x4d) {
      const w = fd.readUInt16BE(18);
      const h = fd.readUInt16BE(20);
      return h > w ? "v" : "h";
    }
  } catch {
    // 无法读取则默认横图
  }
  return "h";
}

const fileH = [];
const fileV = [];

try {
  for (const name of readdirSync(SRC)) {
    if (!IMAGE_EXTS.has(extname(name).toLowerCase())) continue;
    const orientation = detectOrientation(join(SRC, name));
    const entry = `/images/${name}`;
    if (orientation === "v") {
      fileV.push(entry);
    } else {
      fileH.push(entry);
    }
  }
} catch {
  // images 目录不存在
}

// ── 输出合并文件 ──────────────────────────────────────

mkdirSync(OUT, { recursive: true });

writeFileSync(
  join(OUT, "horizontal.all.txt"),
  [...extH, ...fileH].join("\n") + "\n"
);

writeFileSync(
  join(OUT, "vertical.all.txt"),
  [...extV, ...fileV].join("\n") + "\n"
);

console.log(
  `元数据已生成：横图 ${extH.length} 链接 + ${fileH.length} 服务器 | 竖图 ${extV.length} 链接 + ${fileV.length} 服务器`
);

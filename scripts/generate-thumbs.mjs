#!/usr/bin/env node

/**
 * 自动生成缩略图
 *
 * 从合并后的 horizontal.all.txt / vertical.all.txt 读取服务器图片，
 * 为每个尺寸生成缩略图到 images/thumbs/{orientation}/{W}x{H}/
 */

import { readFileSync, readdirSync, mkdirSync } from "fs";
import { join, extname, basename } from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_DIR = join(ROOT, "images");
const THUMB_DIR = join(SRC_DIR, "thumbs");
const PUBLIC = join(ROOT, "public", "images");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tiff", ".tif"]);

const SIZES = [
  [100, 100], [150, 150], [200, 200],
  [300, 200], [300, 300],
  [400, 300], [400, 400],
  [600, 400], [600, 600],
  [800, 600], [800, 800],
  [1200, 800], [1200, 1200],
];

const QUALITY = 80;

// 从合并文件中提取服务器图片路径
function getServerImages(filename) {
  try {
    return readFileSync(join(PUBLIC, filename), "utf-8")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("/images/") && l.length > 9);
  } catch {
    return [];
  }
}

async function generate() {
  const hImages = getServerImages("horizontal.all.txt");
  const vImages = getServerImages("vertical.all.txt");
  const all = [
    ...hImages.map((p) => ({ path: p, orientation: "h" })),
    ...vImages.map((p) => ({ path: p, orientation: "v" })),
  ];

  if (all.length === 0) {
    console.log("没有找到服务器图片文件，跳过缩略图生成。");
    return;
  }

  console.log(
    `找到 ${hImages.length} 张横图 + ${vImages.length} 张竖图，开始生成 ${SIZES.length} 种尺寸...\n`
  );

  let total = 0;

  for (const { path: imgPath, orientation } of all) {
    const fullPath = join(ROOT, imgPath);
    const ext = extname(imgPath).toLowerCase();
    const name = basename(imgPath, ext);
    const outExt = [".jpg", ".jpeg"].includes(ext) ? ".jpg" : ".webp";

    for (const [w, h] of SIZES) {
      const dir = join(THUMB_DIR, orientation, `${w}x${h}`);
      mkdirSync(dir, { recursive: true });

      const outPath = join(dir, `${name}${outExt}`);

      try {
        await sharp(fullPath)
          .resize(w, h, {
            fit: "contain",
            background: { r: 255, g: 255, b: 255, alpha: 1 },
          })
          .toFormat(outExt === ".jpg" ? "jpeg" : "webp", { quality: QUALITY })
          .toFile(outPath);
        total++;
      } catch (err) {
        console.error(`  ✗ ${imgPath} → ${w}x${h} 失败:`, err.message);
      }
    }

    console.log(`  ✓ [${orientation}] ${imgPath}`);
  }

  console.log(`\n完成！共生成 ${total} 张缩略图。`);
  console.log(`输出：${THUMB_DIR}/{h|v}/{W}x{H}/`);
}

generate();

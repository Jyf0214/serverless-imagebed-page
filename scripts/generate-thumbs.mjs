#!/usr/bin/env node

/**
 * 自动生成缩略图
 *
 * 从合并后的 horizontal.all.txt / vertical.all.txt 读取服务器图片，
 * 为每个尺寸生成缩略图到 images/thumbs/{orientation}/{W}x{H}/
 */

import { readFileSync, mkdirSync } from "fs";
import { join, extname, basename } from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_DIR = join(ROOT, "images");
const THUMB_DIR = join(SRC_DIR, "thumbs");
const PUBLIC = join(ROOT, "public", "images");
const ENABLE_THUMBS = process.env.THUMB_ENABLED === "true";
const CONCURRENCY = parseInt(process.env.THUMB_CONCURRENCY || "8", 10);
const MAX_RETRIES = parseInt(process.env.THUMB_RETRIES || "2", 10);
const RETRY_DELAY_MS = 500;

async function retry(fn, label, maxRetries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      const delay = RETRY_DELAY_MS * attempt;
      console.log(`  ⏳ ${label} 第${attempt}次失败，${delay}ms 后重试...`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

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
  if (!ENABLE_THUMBS) {
    console.log("[thumbs] THUMB_ENABLED 未设为 true，跳过缩略图生成");
    return;
  }

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
    `找到 ${hImages.length} 张横图 + ${vImages.length} 张竖图，开始生成 ${SIZES.length} 种尺寸...`
  );
  console.log(`并发数: ${CONCURRENCY}\n`);

  let total = 0;
  let failed = 0;

  async function processOne({ path: imgPath, orientation }) {
    const fullPath = join(ROOT, imgPath);
    const ext = extname(imgPath).toLowerCase();
    const name = basename(imgPath, ext);
    const outExt = [".jpg", ".jpeg"].includes(ext) ? ".jpg" : ".webp";

    for (const [w, h] of SIZES) {
      const dir = join(THUMB_DIR, orientation, `${w}x${h}`);
      mkdirSync(dir, { recursive: true });

      const outPath = join(dir, `${name}${outExt}`);

      await retry(async () => {
        await sharp(fullPath)
          .resize(w, h, {
            fit: "contain",
            background: { r: 255, g: 255, b: 255, alpha: 1 },
          })
          .toFormat(outExt === ".jpg" ? "jpeg" : "webp", { quality: QUALITY })
          .toFile(outPath);
      }, `${name} ${w}x${h}`);
      total++;
    }

    console.log(`  ✓ [${orientation}] ${imgPath}`);
  }

  // 并发池
  const queue = [...all];
  const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      try {
        await processOne(item);
      } catch (err) {
        failed++;
        console.error(`  ✗ ${item.path} 失败: ${err.message}`);
      }
    }
  });
  await Promise.all(workers);

  console.log(`\n完成！共生成 ${total} 张缩略图，失败 ${failed} 张。`);
  console.log(`输出：${THUMB_DIR}/{h|v}/{W}x{H}/`);
}

generate();

#!/usr/bin/env node

/**
 * 构建前从 WebDAV 同步图片到 images/ 目录
 *
 * 环境变量：
 *   WEBDAV_URL  - WebDAV 服务器地址（必需）
 *   WEBDAV_USER - 用户名（必需）
 *   WEBDAV_PASS - 密码（必需）
 *   WEBDAV_DIR  - 远程图片目录，默认 "/"（可选）
 *
 * 无环境变量时静默跳过，不阻塞本地开发。
 * 增量下载：跳过本地已存在的文件。
 */

import { createClient } from "webdav";
import { readdirSync, createWriteStream } from "fs";
import { join, extname } from "path";
import { pipeline } from "stream/promises";

const ROOT = process.cwd();
const DEST = join(ROOT, "images");
const CONCURRENCY = parseInt(process.env.SYNC_CONCURRENCY || "6", 10);
const MAX_RETRIES = parseInt(process.env.SYNC_RETRIES || "3", 10);
const RETRY_DELAY_MS = 1000;

async function retry(fn, label, maxRetries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      const delay = RETRY_DELAY_MS * attempt;
      console.log(`[sync-webdav] ⏳ ${label} 第${attempt}次失败，${delay}ms 后重试...`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

const IMAGE_EXTS = new Set([
  ".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tiff", ".tif",
]);

// ── 检查环境变量 ──────────────────────────────────────

const url = process.env.WEBDAV_URL;
const user = process.env.WEBDAV_USER;
const pass = process.env.WEBDAV_PASS;
const remoteDir = process.env.WEBDAV_DIR || "/";

if (!url || !user || !pass) {
  console.log("[sync-webdav] 未配置 WEBDAV 环境变量，跳过同步");
  process.exit(0);
}

// ── 获取本地已有文件 ──────────────────────────────────

function getLocalFiles(dir) {
  try {
    return new Set(
      readdirSync(dir).filter((f) => IMAGE_EXTS.has(extname(f).toLowerCase()))
    );
  } catch {
    return new Set();
  }
}

// ── 递归列出 WebDAV 目录 ──────────────────────────────

async function listAllImages(client, dirPath) {
  const items = await client.getDirectoryContents(dirPath);
  const files = [];

  for (const item of items) {
    if (item.type === "directory") {
      const subFiles = await listAllImages(client, item.filename);
      files.push(...subFiles);
    } else if (item.type === "file") {
      const ext = extname(item.basename).toLowerCase();
      if (IMAGE_EXTS.has(ext)) {
        files.push(item);
      }
    }
  }

  return files;
}

// ── 主流程 ────────────────────────────────────────────

async function main() {
  console.log(`[sync-webdav] 连接 ${url}，目录: ${remoteDir}`);

  const client = createClient(url, { username: user, password: pass });

  const remoteFiles = await listAllImages(client, remoteDir);
  console.log(`[sync-webdav] 远程发现 ${remoteFiles.length} 张图片`);

  const localFiles = getLocalFiles(DEST);

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  const toDownload = remoteFiles.filter((file) => {
    if (localFiles.has(file.basename)) {
      skipped++;
      return false;
    }
    return true;
  });

  console.log(`[sync-webdav] 需下载 ${toDownload.length} 张，并发数: ${CONCURRENCY}`);

  async function downloadOne(file) {
    await retry(async () => {
      const readable = await client.createReadStream(file.filename);
      const writable = createWriteStream(join(DEST, file.basename));
      await pipeline(readable, writable);
    }, file.basename);
    downloaded++;
    console.log(`[sync-webdav] ✓ ${file.basename}`);
  }

  // 并发池
  const queue = [...toDownload];
  const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length > 0) {
      const file = queue.shift();
      try {
        await downloadOne(file);
      } catch (err) {
        failed++;
        console.error(`[sync-webdav] ✗ ${file.basename}: ${err.message}`);
      }
    }
  });
  await Promise.all(workers);

  console.log(
    `[sync-webdav] 完成：下载 ${downloaded} 张，跳过 ${skipped} 张，失败 ${failed} 张`
  );
}

main().catch((err) => {
  console.error("[sync-webdav] 同步失败:", err.message);
  process.exit(1);
});

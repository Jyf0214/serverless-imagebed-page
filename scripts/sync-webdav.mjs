#!/usr/bin/env node

/**
 * 构建前从 WebDAV 同步图片到 images/ 目录
 *
 * 环境变量：
 *   WEBDAV_URL  - WebDAV 服务器地址（必需）
 *   WEBDAV_USER - 用户名（必需）
 *   WEBDAV_PASS - 密码（必需）
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

const IMAGE_EXTS = new Set([
  ".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tiff", ".tif",
]);

// ── 检查环境变量 ──────────────────────────────────────

const url = process.env.WEBDAV_URL;
const user = process.env.WEBDAV_USER;
const pass = process.env.WEBDAV_PASS;

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
  console.log(`[sync-webdav] 连接 ${url}`);

  const client = createClient(url, { username: user, password: pass });

  const remoteFiles = await listAllImages(client, "/");
  console.log(`[sync-webdav] 远程发现 ${remoteFiles.length} 张图片`);

  const localFiles = getLocalFiles(DEST);

  let downloaded = 0;
  let skipped = 0;

  for (const file of remoteFiles) {
    const name = file.basename;

    if (localFiles.has(name)) {
      skipped++;
      continue;
    }

    const readable = await client.createReadStream(file.filename);
    const writable = createWriteStream(join(DEST, name));
    await pipeline(readable, writable);
    downloaded++;
    console.log(`[sync-webdav] 下载: ${name}`);
  }

  console.log(
    `[sync-webdav] 完成：下载 ${downloaded} 张，跳过 ${skipped} 张`
  );
}

main().catch((err) => {
  console.error("[sync-webdav] 同步失败:", err.message);
  process.exit(1);
});

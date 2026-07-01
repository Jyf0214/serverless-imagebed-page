import { NextRequest } from "next/server";
import { resolvePool, pick, type Source } from "../lib";

/**
 * GET /api/random/image
 *
 * 直接返回随机图片二进制，可用作 <img src>。
 * 查询参数：
 *   orientation=h|v         横图/竖图，不传则随机
 *   source=link|file|all    图片来源（默认 all）
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const orientation = searchParams.get("orientation");
  const source = (searchParams.get("source") ?? "all") as Source;
  const url = pick(resolvePool(orientation, source));

  const res = await fetch(url);
  const contentType = res.headers.get("content-type") ?? "image/jpeg";
  const body = await res.arrayBuffer();

  return new Response(body, {
    headers: {
      "content-type": contentType,
      "cache-control": "public, max-age=86400",
    },
  });
}

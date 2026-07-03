import { NextRequest, NextResponse } from "next/server";
import { resolvePool, pick, type Source } from "./lib";

/**
 * GET /api/random
 *
 * 查询参数：
 *   orientation=h|v         横图/竖图，不传则随机
 *   source=link|file|all    图片来源：链接/服务器文件/全部（默认 all）
 *   mode=inline|redirect|image
 *     inline    — 返回 JSON（默认）
 *     redirect  — 302 重定向到图片 URL
 *     image     — 直接返回图片二进制
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const orientation = searchParams.get("orientation");
  const source = (searchParams.get("source") ?? "all") as Source;
  const url = pick(resolvePool(orientation, source));

  const mode = searchParams.get("mode");

  if (mode === "redirect" || mode === "image") {
    const origin = request.nextUrl.origin;
    const absoluteUrl = new URL(url, origin).toString();

    if (mode === "redirect") {
      return NextResponse.redirect(absoluteUrl, 302);
    }

    const res = await fetch(absoluteUrl);
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const body = await res.arrayBuffer();
    return new NextResponse(body, {
      headers: { "content-type": contentType, "cache-control": "public, max-age=86400" },
    });
  }

  return NextResponse.json({ url, orientation: orientation ?? "random", source });
}

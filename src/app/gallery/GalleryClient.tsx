"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/useLocale";
import type { ImageItem } from "@/lib/images";

const PER_PAGE = 12;

export default function GalleryClient({
  images,
  page,
}: {
  images: ImageItem[];
  page: number;
}) {
  const { t } = useLocale();
  const total = Math.max(1, Math.ceil(images.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const slice = images.slice(start, start + PER_PAGE);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-8 text-2xl font-bold tracking-tight">
        {t.galleryTitle}
      </h2>

      {slice.length === 0 ? (
        <p className="text-zinc-500">暂无图片</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {slice.map((img) => (
            <a
              key={img.url}
              href={img.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-xl border border-white/5 bg-zinc-900 transition-all hover:border-white/10 hover:shadow-lg hover:shadow-black/20"
            >
              <Image
                src={img.url}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-sm text-zinc-500">
          {t.page.replace("{cur}", String(page)).replace("{total}", String(total))}
        </p>
        <div className="flex gap-2">
          {page > 1 && (
            <a
              href={`/gallery?page=${page - 1}`}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t.prev}
            </a>
          )}
          {page < total && (
            <a
              href={`/gallery?page=${page + 1}`}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t.next}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

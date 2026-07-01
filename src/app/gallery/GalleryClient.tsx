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
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">{t.galleryTitle}</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {slice.map((img) => (
          <div key={img.url} className="group relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={img.url}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="mt-8 flex items-center justify-center gap-4 text-sm">
        <a
          href={`/gallery?page=${Math.max(1, page - 1)}`}
          className={`rounded-full border px-4 py-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${page <= 1 ? "pointer-events-none opacity-30" : ""}`}
        >
          {t.prev}
        </a>
        <span className="text-zinc-500">
          {t.page.replace("{cur}", String(page)).replace("{total}", String(total))}
        </span>
        <a
          href={`/gallery?page=${Math.min(total, page + 1)}`}
          className={`rounded-full border px-4 py-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${page >= total ? "pointer-events-none opacity-30" : ""}`}
        >
          {t.next}
        </a>
      </div>
    </div>
  );
}

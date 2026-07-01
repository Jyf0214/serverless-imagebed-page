"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-zinc-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-pulse" />
        <span>{t.galleryTitle}</span>
      </motion.div>

      {slice.length === 0 ? (
        <div className="py-32 text-center bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700">
          <p className="text-zinc-400">暂无图片</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {slice.map((img, i) => (
            <motion.div
              key={img.url}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <a
                href={img.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white dark:bg-zinc-800 rounded-3xl border-2 border-zinc-50 dark:border-zinc-700 overflow-hidden transition-all duration-300 hover:border-zinc-900 dark:hover:border-zinc-500 hover:shadow-2xl hover:shadow-zinc-100 dark:hover:shadow-zinc-900"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={img.url}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="px-3 py-2.5">
                  <span className="text-[11px] text-zinc-400 truncate block">
                    {img.orientation === "v" ? "竖图" : "横图"} · {img.source}
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      )}

      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <a
            href={`/gallery?page=${Math.max(1, page - 1)}`}
            className={`inline-flex items-center justify-center gap-1 px-3 py-1 text-xs font-medium border border-zinc-200 dark:border-zinc-700 rounded-xl transition-all hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
              page === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">{t.prev}</span>
          </a>
          {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/gallery?page=${p}`}
              className={`inline-flex items-center justify-center w-8 h-8 text-xs font-medium rounded-xl transition-all ${
                p === page
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/20"
                  : "text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
              }`}
            >
              {p}
            </a>
          ))}
          <a
            href={`/gallery?page=${Math.min(total, page + 1)}`}
            className={`inline-flex items-center justify-center gap-1 px-3 py-1 text-xs font-medium border border-zinc-200 dark:border-zinc-700 rounded-xl transition-all hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
              page === total ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <span className="hidden sm:inline">{t.next}</span>
            <ChevronRight size={14} />
          </a>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-zinc-400">
          {t.page.replace("{cur}", String(page)).replace("{total}", String(total))}
        </p>
      </div>
    </main>
  );
}

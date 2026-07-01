import { headers } from "next/headers";
import { getAllImages } from "@/lib/images";
import { type Locale, getTranslations } from "@/i18n/dict";
import Link from "next/link";
import GalleryClient from "./GalleryClient";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const h = await headers();
  const locale = (h.get("x-locale") ?? "zh") as Locale;
  const t = getTranslations(locale);
  const { page: raw } = await searchParams;
  const page = Math.max(1, parseInt(raw ?? "1", 10) || 1);
  const images = getAllImages();

  return (
    <div className="min-h-screen bg-white font-[var(--font-nunito)] dark:bg-zinc-950">
      <Link
        href="/"
        className="fixed left-5 top-5 z-20 rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
      >
        {t.back}
      </Link>
      <GalleryClient images={images} page={page} />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Images, FileText, Globe } from "lucide-react";
import { type Locale, getTranslations } from "@/i18n/dict";
import { LocaleContext } from "@/i18n/useLocale";

export default function RootProvider({
  locale: initial,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initial);

  const toggle = () => {
    const next = locale === "zh" ? "en" : "zh";
    document.cookie = `locale=${next};path=/;max-age=31536000`;
    setLocale(next);
  };

  const t = getTranslations(locale);

  return (
    <LocaleContext.Provider value={{ locale, t }}>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/60 dark:bg-zinc-900/80 dark:border-zinc-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 rounded-xl flex items-center justify-center shadow-sm">
                  <Images size={18} className="text-white dark:text-zinc-900" />
                </div>
                <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100 hidden sm:inline">
                  {t.title}
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-1 ml-8">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 rounded-xl transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Images size={14} />
                  {t.viewAll}
                </Link>
                <Link
                  href="/api/docs"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 rounded-xl transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <FileText size={14} />
                  {t.apiDocs}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={toggle}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 rounded-xl transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border border-zinc-200 dark:border-zinc-700"
              >
                <Globe size={14} />
                {t.lang}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </LocaleContext.Provider>
  );
}

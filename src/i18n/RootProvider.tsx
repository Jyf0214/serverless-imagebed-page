"use client";

import Link from "next/link";
import { useState } from "react";
import { Globe } from "lucide-react";
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
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-zinc-100 dark:bg-zinc-900/60 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
            {t.title}
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/gallery" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              {t.viewAll}
            </Link>
            <Link href="/api/docs" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              {t.apiDocs}
            </Link>
            <button
              onClick={toggle}
              className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all cursor-pointer shadow-sm"
              title={t.lang}
            >
              <Globe size={14} />
            </button>
          </div>
        </div>
      </nav>
      {children}
    </LocaleContext.Provider>
  );
}

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
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/60 dark:bg-zinc-900/60">
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
              className="inline-flex items-center gap-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <Globe size={14} />
              {t.lang}
            </button>
          </div>
        </div>
      </nav>
      {children}
    </LocaleContext.Provider>
  );
}

"use client";

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
      <button
        onClick={toggle}
        className="fixed right-6 top-6 z-50 w-9 h-9 rounded-full border border-zinc-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-all cursor-pointer shadow-sm"
        title={t.lang}
      >
        <Globe size={16} />
      </button>
      {children}
    </LocaleContext.Provider>
  );
}

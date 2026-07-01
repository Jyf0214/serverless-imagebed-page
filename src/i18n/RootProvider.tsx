"use client";

import { useState } from "react";
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

  return (
    <LocaleContext.Provider value={{ locale, t: getTranslations(locale) }}>
      <button
        onClick={toggle}
        className="fixed right-5 top-5 z-20 rounded-full border border-white/30 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/10"
      >
        {getTranslations(locale).lang}
      </button>
      {children}
    </LocaleContext.Provider>
  );
}

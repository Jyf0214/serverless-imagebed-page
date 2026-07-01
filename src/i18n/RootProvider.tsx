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
        className="fixed right-6 top-6 z-50 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[13px] font-medium text-white/60 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white/80 cursor-pointer"
      >
        {getTranslations(locale).lang}
      </button>
      {children}
    </LocaleContext.Provider>
  );
}

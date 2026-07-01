"use client";

import { useState } from "react";
import { ConfigProvider, theme } from "antd";
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
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#1677ff",
            borderRadius: 8,
            fontFamily: "var(--font-nunito), -apple-system, sans-serif",
          },
        }}
      >
        <button
          onClick={toggle}
          style={{
            position: "fixed", right: 24, top: 24, zIndex: 100,
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 20, padding: "6px 14px", cursor: "pointer",
            color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500,
            fontFamily: "var(--font-nunito), sans-serif",
            backdropFilter: "blur(8px)", transition: "all 0.2s",
          }}
        >
          {getTranslations(locale).lang}
        </button>
        {children}
      </ConfigProvider>
    </LocaleContext.Provider>
  );
}

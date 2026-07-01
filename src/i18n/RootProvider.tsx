"use client";

import { useState } from "react";
import { ConfigProvider, Button, theme } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
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
        <Button
          type="text"
          icon={<GlobalOutlined />}
          onClick={toggle}
          style={{
            position: "fixed",
            right: 20,
            top: 20,
            zIndex: 100,
            color: "#fff",
            borderColor: "rgba(255,255,255,0.3)",
          }}
        >
          {getTranslations(locale).lang}
        </Button>
        {children}
      </ConfigProvider>
    </LocaleContext.Provider>
  );
}

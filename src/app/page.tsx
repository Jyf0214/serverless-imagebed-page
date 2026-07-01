"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLocale } from "@/i18n/useLocale";

const DEFAULT_BG = "https://bing.img.run/m.php";

export default function Home() {
  const { t } = useLocale();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%", overflow: "hidden" }}>
      <Image src={DEFAULT_BG} alt="" fill unoptimized style={{ objectFit: "cover" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%)",
      }} />

      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", height: "100%",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        color: "#fff", fontFamily: "var(--font-nunito), sans-serif",
      }}>
        <h1 style={{
          fontSize: 64, fontWeight: 800, margin: 0, letterSpacing: -1,
          textShadow: "0 2px 24px rgba(0,0,0,0.25)",
        }}>
          {t.title}
        </h1>

        <p style={{
          fontSize: 18, marginTop: 12, fontWeight: 300,
          color: "rgba(255,255,255,0.75)", letterSpacing: 3, textTransform: "uppercase",
        }}>
          {t.subtitle}
        </p>

        <div style={{
          marginTop: 48, display: "flex", gap: 32, fontSize: 14, fontWeight: 500,
        }}>
          <a href="/gallery" style={linkStyle}>{t.viewAll}</a>
          <a href="/api/docs" style={linkStyle}>{t.apiDocs}</a>
        </div>

        <div style={{
          position: "absolute", bottom: 40,
          display: "flex", alignItems: "center", gap: 8,
          fontSize: 13, color: "rgba(255,255,255,0.5)",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#52c41a" }} />
          <span>{t.status}</span>
          <span style={{ margin: "0 4px", opacity: 0.4 }}>·</span>
          <span style={{ fontVariantNumeric: "tabular-nums" }}>{time}</span>
        </div>
      </div>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.8)",
  textDecoration: "none",
  borderBottom: "1px solid rgba(255,255,255,0.25)",
  paddingBottom: 2,
  transition: "color 0.2s, border-color 0.2s",
};

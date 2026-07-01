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
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src={DEFAULT_BG}
        alt=""
        fill
        unoptimized
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
        <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-lg sm:text-7xl">
          {t.title}
        </h1>
        <p className="mt-3 text-lg font-light uppercase tracking-[0.25em] text-white/60">
          {t.subtitle}
        </p>

        <div className="mt-12 flex gap-8 text-sm font-medium">
          <a
            href="/gallery"
            className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/40"
          >
            {t.viewAll}
          </a>
          <a
            href="/api/docs"
            className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/40"
          >
            {t.apiDocs}
          </a>
        </div>

        <div className="absolute bottom-10 flex items-center gap-2 text-[13px] text-white/40">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>{t.status}</span>
          <span className="opacity-30">·</span>
          <span className="tabular-nums">{time}</span>
        </div>
      </div>
    </div>
  );
}

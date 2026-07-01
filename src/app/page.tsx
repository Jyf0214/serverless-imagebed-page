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
      <Image src={DEFAULT_BG} alt="" fill unoptimized className="object-cover" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-6xl font-bold tracking-tight drop-shadow-lg">
          {t.title}
        </h1>
        <p className="mt-4 text-xl font-light tracking-wide opacity-90 drop-shadow">
          {t.subtitle}
        </p>
        <div className="mt-8 flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
          <span>{t.status}</span>
          <span className="mx-2 opacity-40">|</span>
          <span className="tabular-nums">{time}</span>
        </div>
        <div className="mt-6 flex gap-3">
          <a
            href="/gallery"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium transition-colors hover:bg-white/10"
          >
            {t.viewAll}
          </a>
          <a
            href="/api/docs"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium transition-colors hover:bg-white/10"
          >
            {t.apiDocs}
          </a>
        </div>
      </div>
    </div>
  );
}

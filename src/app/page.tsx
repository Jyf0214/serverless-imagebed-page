"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Images, FileText } from "lucide-react";
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
        })
      );
    update();
    const id = setInterval(update, 60000);
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-zinc-400 font-black text-[10px] uppercase tracking-[0.2em] mb-6"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.status}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black tracking-tighter text-white text-center mb-3"
        >
          {t.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-base text-center"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col gap-3 w-56"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white border border-white/20 rounded-xl transition-all hover:bg-white/10 hover:border-white/30"
          >
            <Images size={16} />
            {t.viewAll}
          </Link>
          <Link
            href="/api/docs"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white border border-white/20 rounded-xl transition-all hover:bg-white/10 hover:border-white/30"
          >
            <FileText size={16} />
            {t.apiDocs}
          </Link>
        </motion.div>

        <div className="absolute bottom-8 text-xs text-zinc-500 font-mono">
          {time}
        </div>
      </div>
    </div>
  );
}

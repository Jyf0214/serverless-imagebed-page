"use client";

import { useLocale } from "@/i18n/useLocale";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()} {t.title}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          {t.footer}
        </p>
      </div>
    </footer>
  );
}

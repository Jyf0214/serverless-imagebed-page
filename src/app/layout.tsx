import type { Metadata } from "next";
import { headers } from "next/headers";
import { Nunito } from "next/font/google";
import { type Locale } from "@/i18n/dict";
import RootProvider from "@/i18n/RootProvider";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "随机图床",
  description: "一个简洁的随机图片站点",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const locale = (h.get("x-locale") ?? "zh") as Locale;

  return (
    <html lang={locale} className={`${nunito.variable} h-full`}>
      <body className="min-h-full">
        <RootProvider locale={locale}>{children}</RootProvider>
      </body>
    </html>
  );
}

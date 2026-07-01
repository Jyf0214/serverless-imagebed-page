export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";

const dict = {
  zh: {
    title: "随机图床",
    subtitle: "每次刷新，遇见不一样的风景",
    status: "随机图片站点",
    apiDocs: "随机一图 API 文档",
    viewAll: "查看所有图片",
    galleryTitle: "所有图片",
    page: "第 {cur} / {total} 页",
    prev: "上一页",
    next: "下一页",
    back: "返回首页",
    lang: "EN",
    footer: "由 EdgeOne Makers 驱动",
    apiDesc: "随机返回一张图片",
  },
  en: {
    title: "Random Image Bed",
    subtitle: "Refresh to discover a new view",
    status: "Random Image Site",
    apiDocs: "Random Image API Docs",
    viewAll: "View All Images",
    galleryTitle: "All Images",
    page: "Page {cur} / {total}",
    prev: "Prev",
    next: "Next",
    back: "Back",
    lang: "中文",
    footer: "Powered by EdgeOne Makers",
    apiDesc: "Randomly return an image",
  },
} as const;

export type Translations = (typeof dict)[Locale];

export function getTranslations(locale: Locale): Translations {
  return dict[locale] ?? dict[defaultLocale];
}

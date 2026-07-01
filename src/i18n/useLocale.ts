"use client";

import { createContext, useContext } from "react";
import { type Locale, type Translations, defaultLocale } from "./dict";

export const LocaleContext = createContext<{
  locale: Locale;
  t: Translations;
}>({ locale: defaultLocale, t: {} as Translations });

export const useLocale = () => useContext(LocaleContext);

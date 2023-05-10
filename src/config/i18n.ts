import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import es from "./translations/es.json";

export const resources = {
  en: { translation: en },
  es: { translation: es },
} as const;

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "es"],
    // lng: "en",
    debug: true,
    resources,
    interpolation: {
      format: undefined,
    },
  });

export default i18n;

import { useLanguage } from "@/context/LanguageContext";
import es from "@/locales/es";
import en from "@/locales/en";

export function useTranslation() {
  const { lang } = useLanguage();
  return lang === "en" ? en : es;
}

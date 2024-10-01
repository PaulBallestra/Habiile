import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en";
import fr from "./fr";
import { useLocation } from "react-router-dom";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    resources: {
      en: en,
      fr: fr,
    },
  });

export default i18next;

export const getPageUrl = (key?: string | null, code?: string | null): string => {
  // if i get the pathname with useLocation() i get an error
  // error - "React has detected a change in the order of Hooks"
  let pathname = window.location.pathname
  if(pathname[0] === '/') {
    pathname = pathname.slice(1)
  }

  let path = '/'
  path += code || i18next.language
  path += '/'
  path += key !== null ? key : pathname.slice(pathname.split('/')[0].length + 1)
  return path
}

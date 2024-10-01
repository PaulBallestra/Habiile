import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import fr from './fr';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  debug: true,
  fallbackLng: 'en',
  resources: {
    en: en,
    fr: fr,
  },
});

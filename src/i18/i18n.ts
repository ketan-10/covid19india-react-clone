import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // what strategy should be used to get the translations.
  .use(LanguageDetector) // used to detect current language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    keySeparator: false, // char to separate keys. If working with a flat JSON, it's recommended to set this to false.
    returnEmptyString: false, // rejects  empty string as valid translation
    load: 'languageOnly', // strategy to define which language codes to lookup.
    backend: {
      loadPath: '/api/locales/locale_{{lng}}.json', // path where resources get loaded from.
    },
    fallbackLng: 'english',
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

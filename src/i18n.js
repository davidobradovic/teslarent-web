import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import en from './locales/en/translation.json';
import de from './locales/de/translation.json';
import sr from './locales/sr/translation.json';

i18n
    .use(LanguageDetector) // Detect system language
    .use(initReactI18next) // Bind with React
    .init({
        resources: {
            en: { translation: en },
            de: { translation: de },
            sr: { translation: sr },
        },
        fallbackLng: 'en', // Default language
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        detection: {
            order: ['navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage', 'cookie'], // Cache user language
        },
    });

export default i18n;

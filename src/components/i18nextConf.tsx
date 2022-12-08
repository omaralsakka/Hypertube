import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const fallbackLng = ['en'];
const react = { useSuspense: false };

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		// resources,
		fallbackLng,
		react,
		detection: { checkWhiteList: true },
		debug: false,
		interpolation: { escapeValue: false },
	});

export default i18n;

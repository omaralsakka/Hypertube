import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import common_en from '../../translations/en/common.json';
import common_fi from '../../translations/fi/common.json';
import common_cn from '../../translations/cn/common.json';
import { ReactNode } from 'react';

i18next.init({
	interpolation: { escapeValue: false },
	lng: 'en',
	resources: {
		en: {
			common: common_en,
		},
		fi: {
			common: common_fi,
		},
		cn: {
			common: common_cn,
		},
	},
});

const LanguageProvider = ({ children }: { children: ReactNode }) => {
	return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

export default LanguageProvider;

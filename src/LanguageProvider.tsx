import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Store } from './store/types';
import LangContext, { langs } from './langContext';

const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const userStateLanguage = useSelector((state: Store) => state.Language);

	return (
		<LangContext.Provider
			value={langs[userStateLanguage as keyof typeof langs]}
		>
			{children}
		</LangContext.Provider>
	);
};

export default LanguageProvider;

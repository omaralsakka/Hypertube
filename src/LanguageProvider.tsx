import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageState, UserState } from './store/types';
import LangContext, { langs } from './langContext';

interface ReducersSelector {
	languageReducer: string;
	userReducer: string;
}

const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const languageReducer = useSelector(
		(state: ReducersSelector) => state.languageReducer
	);
	return (
		<LangContext.Provider value={langs[languageReducer as keyof typeof langs]}>
			{children}
		</LangContext.Provider>
	);
};

export default LanguageProvider;

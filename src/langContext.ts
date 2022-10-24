import React from 'react';
export const langs = {
	en: { ad: 'we are Hive', text: 'welcome to hypertube' },
	fi: { ad: 'olemme Hive', text: 'tervetuloa hypertubeen' },
};

const LangContext = React.createContext(langs.en);

export default LangContext;

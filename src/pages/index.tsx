import '../components/i18nextConf';
import type { NextPage } from 'next';
import { langs } from '../langContext';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../store/actions';

const Home: NextPage = () => {
	const [lang, setLang] = useState(langs.en);
	const [selectedLanguage, setSelectedLanguage] = useState('en');
	const dispatch = useDispatch();

	useEffect(() => {
		const selectedLang = localStorage.getItem('selectedLanguage');
		const selectedLangObject = localStorage.getItem('selectedLanguageObject');
		if (selectedLang && selectedLangObject) {
			setSelectedLanguage(selectedLang);
			setLang(JSON.parse(selectedLangObject));
		}
		if (selectedLang) dispatch(setLanguage(selectedLang));
	}, []);

	const switchLang = () => {
		setSelectedLanguage(selectedLanguage === 'en' ? 'fi' : 'en');
		lang === langs.en ? setLang(langs.fi) : setLang(langs.en);

		localStorage.setItem(
			'selectedLanguage',
			selectedLanguage === 'en' ? 'fi' : 'en'
		);
		localStorage.setItem(
			'selectedLanguageObject',
			JSON.stringify(lang === langs.en ? langs.fi : langs.en)
		);
		dispatch(setLanguage(selectedLanguage));
	};

	return (
		<div className="app">
			<div className="main">
				{selectedLanguage}
				<div className="language-select">
					<button onClick={switchLang}>Select Language</button>
				</div>
				<div className="example-text">
					<p>
						{lang.ad}
						<br />
						{lang.text}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;

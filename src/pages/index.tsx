import './i18nextConf';
import type { NextPage } from 'next';
import { langs } from '../langContext';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../store/actions';
import { useUser } from '@auth0/nextjs-auth0';

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
		<div className="App">
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
					<Login />
					<Logout />
					<Profile />
				</div>
			</div>
		</div>
	);
};

export const Login = () => {
	return <a href="/api/auth/login">Login</a>;
};

export const Logout = () => {
	return <a href="/api/auth/logout">Logout</a>;
};
export const Profile = () => {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		user && (
			<div>
				<img src={user.picture || ''} alt={user.name || ''} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</div>
		) || null
	);
};
export default Home;

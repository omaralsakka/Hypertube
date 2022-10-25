import './i18nextConf';
import type { NextPage } from 'next';
import LangContext, { langs } from '../langContext';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login: NextPage = () => {
	const [lang, setLang] = useState(langs.en);
	const [selectedLanguage, setSelectedLanguage] = useState('en');

	useEffect(() => {
		const selectedLang = localStorage.getItem('selectedLanguage');
		const selectedLangObject = localStorage.getItem('selectedLanguageObject');
		if (selectedLang && selectedLangObject) {
			setSelectedLanguage(selectedLang);
			setLang(JSON.parse(selectedLangObject));
		} else {
		}
	}, []);

	return (
		<LangContext.Provider value={lang}>
			<div className="App">
				<div className="main">
					Login
					{/* {lang.ad}
					<br />
					{lang.text} */}
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Form.Label>Password</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Button>Submit</Button>
					</Form.Group>
				</div>
			</div>
		</LangContext.Provider>
	);
};

export default Login;

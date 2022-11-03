import '../components/i18nextConf';
import type { NextPage } from 'next';
import { langs } from '../langContext';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../store/actions';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Card, Container, Row, Col, Image, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Link from 'next/link';
export function Component() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	);
}

const ActionButton = ({
	path,
	variant,
	text,
}: {
	path: string;
	variant: string;
	text: string;
}) => {
	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};
	return (
		<>
			<motion.div className="item" variants={item}>
				<Link href={path}>
					<Button variant={variant} className="me-4" size="lg">
						{text}
					</Button>
				</Link>
			</motion.div>
		</>
	);
};

const Home: NextPage = () => {
	const [lang, setLang] = useState(langs.en);
	const [selectedLanguage, setSelectedLanguage] = useState('en');
	const dispatch = useDispatch();
	const logoPng = '/logo-hypertube/logo-no-background.png';

	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};
	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};
	const componentArray = [
		<ActionButton
			key="login-key"
			path="/login"
			variant="warning"
			text="Login"
		/>,
		<ActionButton
			key="signup-key"
			path="/signup"
			variant="primary"
			text="Signup"
		/>,
	];
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

	// return (
	// 	<div className="app">
	// 		<div className="main">
	// 			{/* {selectedLanguage}
	// 			<div className="language-select">
	// 				<button onClick={switchLang}>Select Language</button>
	// 			</div> */}
	// 			{/* <div className="example-text">
	// 				<p>
	// 					{lang.ad}
	// 					<br />
	// 					{lang.text}
	// 				</p>
	// 			</div> */}
	// 			{/* <Component /> */}
	// 		</div>
	// 	</div>
	// );
	return (
		<>
			<Container
				style={{ minHeight: '60vh' }}
				className="d-flex align-items-center justify-content-center"
				fluid
			>
				<Card className="bg-transparent shadow-0 w-50">
					<Card.Body className="d-flex flex-column justify-content-center p-5">
						<Row className="mb-5">
							<Col>
								<motion.div
									initial={{ y: -100, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 1 }}
								>
									<Container className="w-75">
										<Image src={logoPng} fluid />
									</Container>
								</motion.div>
							</Col>
						</Row>
						<Row className="p-3">
							<Col>
								<Container className="d-flex justify-content-center">
									<motion.div
										className="container d-flex justify-content-center"
										variants={container}
										initial="hidden"
										animate="visible"
									>
										{componentArray.map((comp) => comp)}
									</motion.div>
								</Container>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default Home;
